import { type NextRequest, NextResponse } from "next/server"
import { JSDOM } from "jsdom"

// Major scale intervals (in semitones from root)
const MAJOR_SCALE = [0, 2, 4, 5, 7, 9, 11]
const MINOR_SCALE = [0, 2, 3, 5, 7, 8, 10]

interface Note {
  pitch: number
  duration: number
  offset: number
}

interface Chord {
  root: number // MIDI pitch
  quality: "major" | "minor" | "diminished" | "augmented"
  inversion: 0 | 1 | 2 // 0 = root position, 1 = first inversion, 2 = second inversion
  voices: number[] // MIDI pitches for each voice [soprano, alto, tenor, bass]
}

interface VoiceLeadingContext {
  previousChord: Chord | null
  previousMelody: number | null
  measurePosition: number
  phrasePosition: number
  instrumentVariation: number
}

interface InstrumentConfig {
  clefSign: "G" | "F" | "C"
  clefLine: 2 | 4 | 3
  minMidi: number
  maxMidi: number
  transposition: number // Semitones up for written pitch
}

interface HarmonicAnalysis {
  score: number
  warnings: string[]
  suggestions: string[]
}

const INSTRUMENT_CONFIG: Record<string, InstrumentConfig> = {
  // --- Treble Clef (G), Concert Pitch, High Range ---
  Violin: { clefSign: "G", clefLine: 2, minMidi: 55, maxMidi: 96, transposition: 0 },
  Flute: { clefSign: "G", clefLine: 2, minMidi: 60, maxMidi: 99, transposition: 0 },
  Oboe: { clefSign: "G", clefLine: 2, minMidi: 58, maxMidi: 94, transposition: 0 },

  // --- Bass Clef (F), Concert Pitch, Low Range ---
  Cello: { clefSign: "F", clefLine: 4, minMidi: 36, maxMidi: 80, transposition: 0 },
  Tuba: { clefSign: "F", clefLine: 4, minMidi: 21, maxMidi: 53, transposition: 0 },
  Bassoon: { clefSign: "F", clefLine: 4, minMidi: 34, maxMidi: 74, transposition: 0 },

  // --- Alto Clef (C), Concert Pitch, Mid-Range ---
  Viola: { clefSign: "C", clefLine: 3, minMidi: 48, maxMidi: 77, transposition: 0 },

  // --- Treble Clef (G), Transposing Instruments ---
  "B-flat Clarinet": { clefSign: "G", clefLine: 2, minMidi: 53, maxMidi: 98, transposition: 2 },
  "B-flat Trumpet": { clefSign: "G", clefLine: 2, minMidi: 53, maxMidi: 86, transposition: 2 },
  "F Horn": { clefSign: "G", clefLine: 2, minMidi: 41, maxMidi: 84, transposition: 7 },

  // --- Voices ---
  Soprano: { clefSign: "G", clefLine: 2, minMidi: 60, maxMidi: 84, transposition: 0 },
  "Tenor Voice": { clefSign: "G", clefLine: 2, minMidi: 48, maxMidi: 67, transposition: 12 },

  // --- Default ---
  Other: { clefSign: "G", clefLine: 2, minMidi: 40, maxMidi: 84, transposition: 0 },
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File
    const instrumentsStr = (formData.get("instruments") as string) || "Violin"
    const instruments = instrumentsStr.split(",").map((i) => i.trim())

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    const xmlContent = await file.text()
    console.log("[v0] Processing MusicXML for instruments:", instruments)

    const { harmonyOnlyXML, combinedXML } = await harmonizeMelody(xmlContent, instruments)

    return NextResponse.json({
      harmonyOnly: {
        content: harmonyOnlyXML,
        filename: file.name.replace(/\.(musicxml|xml)$/, "_harmony.musicxml"),
      },
      combined: {
        content: combinedXML,
        filename: file.name.replace(/\.(musicxml|xml)$/, "_combined.musicxml"),
      },
    })
  } catch (error) {
    console.error("[v0] Harmonization error:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Harmonization failed" },
      { status: 500 },
    )
  }
}

async function harmonizeMelody(
  xmlContent: string,
  instruments: string[],
): Promise<{ harmonyOnlyXML: string; combinedXML: string }> {
  // Use jsdom to parse XML on the server so querySelector/querySelectorAll are available
  const dom = new JSDOM(xmlContent, { contentType: "text/xml" })
  const xmlDoc = dom.window.document

  const fifths = xmlDoc.querySelector("fifths")?.textContent || "0"
  const mode = xmlDoc.querySelector("mode")?.textContent || "major"
  const keyFifths = Number.parseInt(fifths)

  const { root, scale } = getKeyInfo(keyFifths, mode)

  console.log("[v0] Key signature:", { fifths: keyFifths, mode, scale: getScaleNotes(root, scale) })
  console.log("[v0] Target instruments:", instruments)

  const isPolyphonic = detectPolyphony(xmlDoc)
  console.log("[v0] Input type:", isPolyphonic ? "Polyphonic (multiple voices)" : "Monophonic (single voice)")

  if (isPolyphonic) {
    // Handle polyphonic input - generate harmonies from multiple melodic lines
    return harmonizePolyphonic(xmlDoc, instruments, root, scale, mode, fifths)
  } else {
    // Handle monophonic input - existing logic
    return harmonizeMonophonic(xmlDoc, instruments, root, scale, mode, fifths)
  }
}

function detectPolyphony(xmlDoc: Document): boolean {
  const parts = xmlDoc.querySelectorAll("score-part")

  // If there are multiple parts defined, it's polyphonic
  if (parts.length > 1) {
    console.log("[v0] Detected", parts.length, "parts in score")
    return true
  }

  // Check if single part has multiple voices
  const voices = new Set<string>()
  const noteElements = xmlDoc.querySelectorAll("note")

  noteElements.forEach((noteEl) => {
    const voice = noteEl.querySelector("voice")?.textContent
    if (voice) {
      voices.add(voice)
    }
  })

  if (voices.size > 1) {
    console.log("[v0] Detected", voices.size, "voices in single part")
    return true
  }

  return false
}

async function harmonizeMonophonic(
  xmlDoc: Document,
  instruments: string[],
  root: number,
  scale: number[],
  mode: string,
  fifths: string,
): Promise<{ harmonyOnlyXML: string; combinedXML: string }> {
  const melodyNotes = extractNotes(xmlDoc)
  console.log("[v0] Found", melodyNotes.length, "melody notes")

  let harmonicProgression = generateHarmonicProgression(melodyNotes, root, scale, mode, instruments.length > 1)
  console.log("[v0] Generated", harmonicProgression.length, "chords")

  const analysis = validateHarmonicProgression(harmonicProgression, melodyNotes, root, scale, mode === "major")
  console.log("[v0] Harmonic validation score:", analysis.score)
  if (analysis.warnings.length > 0) {
    console.log("[v0] Validation warnings:", analysis.warnings.slice(0, 5).join("; "))
  }

  if (analysis.score < 70) {
    console.log("[v0] Refinement: Applying harmonic improvements...")
    harmonicProgression = refineHarmonicProgression(harmonicProgression, melodyNotes, root, scale, mode === "major")
  }

  const instrumentVoiceMappings: Record<string, 1 | 2 | 3> = {}
  const voiceOrder: (1 | 2 | 3)[] = [1, 3, 2]
  instruments.forEach((instrument, index) => {
    instrumentVoiceMappings[instrument] = voiceOrder[index % 3]
  })

  const harmoniesByInstrument: Record<string, Note[]> = {}

  for (const instrument of instruments) {
    const assignedVoice = instrumentVoiceMappings[instrument]
    const instrumentConfig = INSTRUMENT_CONFIG[instrument] || INSTRUMENT_CONFIG["Other"]
    console.log(`[v0] Generating ${instrument} as voice ${assignedVoice}...`)

    const instrumentNotes = generateInstrumentPart(harmonicProgression, assignedVoice, instrumentConfig, melodyNotes)
    harmoniesByInstrument[instrument] = instrumentNotes
  }

  const harmonyOnlyXML = createMultiInstrumentHarmonyXML(xmlDoc, harmoniesByInstrument)
  const combinedXML = createCombinedMultiInstrumentXML(xmlDoc, melodyNotes, harmoniesByInstrument)

  return { harmonyOnlyXML, combinedXML }
}

async function harmonizePolyphonic(
  xmlDoc: Document,
  instruments: string[],
  root: number,
  scale: number[],
  mode: string,
  fifths: string,
): Promise<{ harmonyOnlyXML: string; combinedXML: string }> {
  // Extract multiple melodic lines
  const melodicLines = extractNotesPolyphonic(xmlDoc)
  console.log("[v0] Extracted", melodicLines.length, "melodic lines with", melodicLines[0]?.length || 0, "time slices")

  // Generate harmonic progression considering all voices
  let harmonicProgression = generateHarmonicProgressionPolyphonic(
    melodicLines,
    root,
    scale,
    mode,
    instruments.length > 1,
  )
  console.log("[v0] Generated", harmonicProgression.length, "polyphonic chords")

  const maxLength = Math.max(...melodicLines.map((line) => line.length))
  const alignedMelodyNotes: Note[] = []

  for (let i = 0; i < maxLength; i++) {
    // Use the first melodic line as reference, or create a rest if it doesn't exist
    if (i < melodicLines[0].length) {
      alignedMelodyNotes.push(melodicLines[0][i])
    } else {
      // Pad with rests if this line is shorter
      const lastNote = melodicLines[0][melodicLines[0].length - 1]
      alignedMelodyNotes.push({
        pitch: -1,
        duration: lastNote?.duration || 1,
        offset: lastNote ? lastNote.offset + lastNote.duration : i,
      })
    }
  }

  // Validate considering all input voices
  const analysis = validateHarmonicProgression(harmonicProgression, alignedMelodyNotes, root, scale, mode === "major")
  console.log("[v0] Polyphonic harmonic validation score:", analysis.score)

  if (analysis.score < 70) {
    console.log("[v0] Refinement: Applying polyphonic harmonic improvements...")
    harmonicProgression = refineHarmonicProgression(
      harmonicProgression,
      alignedMelodyNotes,
      root,
      scale,
      mode === "major",
    )
  }

  // Map instruments to voices
  const instrumentVoiceMappings: Record<string, 1 | 2 | 3> = {}
  const voiceOrder: (1 | 2 | 3)[] = [1, 3, 2]
  instruments.forEach((instrument, index) => {
    instrumentVoiceMappings[instrument] = voiceOrder[index % 3]
  })

  const harmoniesByInstrument: Record<string, Note[]> = {}

  for (const instrument of instruments) {
    const assignedVoice = instrumentVoiceMappings[instrument]
    const instrumentConfig = INSTRUMENT_CONFIG[instrument] || INSTRUMENT_CONFIG["Other"]
    console.log(`[v0] Generating polyphonic ${instrument} as voice ${assignedVoice}...`)

    const instrumentNotes = generateInstrumentPart(
      harmonicProgression,
      assignedVoice,
      instrumentConfig,
      alignedMelodyNotes,
    )
    harmoniesByInstrument[instrument] = instrumentNotes
  }

  const harmonyOnlyXML = createMultiInstrumentHarmonyXML(xmlDoc, harmoniesByInstrument)
  const combinedXML = createCombinedPolyphonicXML(xmlDoc, melodicLines, harmoniesByInstrument, fifths, mode)

  return { harmonyOnlyXML, combinedXML }
}

function extractNotesPolyphonic(xmlDoc: Document): Note[][] {
  const parts = xmlDoc.querySelectorAll("part")

  if (parts.length > 1) {
    // Multiple parts - extract each separately
    const melodicLines: Note[][] = []

    parts.forEach((part) => {
      const notes: Note[] = []
      const measures = part.querySelectorAll("measure")
      let currentOffset = 0

      measures.forEach((measure) => {
        const noteElements = measure.querySelectorAll("note")

        noteElements.forEach((noteEl) => {
          const isRest = noteEl.querySelector("rest") !== null
          const duration = Number.parseFloat(noteEl.querySelector("duration")?.textContent || "1")

          if (isRest) {
            notes.push({ pitch: -1, duration, offset: currentOffset })
          } else {
            const step = noteEl.querySelector("step")?.textContent || "C"
            const octave = Number.parseInt(noteEl.querySelector("octave")?.textContent || "4")
            const alter = Number.parseInt(noteEl.querySelector("alter")?.textContent || "0")

            const pitch = stepToMidi(step, octave, alter)
            notes.push({ pitch, duration, offset: currentOffset })
          }

          currentOffset += duration
        })
      })

      melodicLines.push(notes)
    })

    return melodicLines
  } else {
    // Single part with multiple voices
    const voiceMap = new Map<string, Note[]>()
    const measures = xmlDoc.querySelectorAll("measure")
    const voiceOffsets = new Map<string, number>()

    measures.forEach((measure) => {
      const noteElements = measure.querySelectorAll("note")

      noteElements.forEach((noteEl) => {
        const voiceNum = noteEl.querySelector("voice")?.textContent || "1"

        if (!voiceMap.has(voiceNum)) {
          voiceMap.set(voiceNum, [])
          voiceOffsets.set(voiceNum, 0)
        }

        const isRest = noteEl.querySelector("rest") !== null
        const duration = Number.parseFloat(noteEl.querySelector("duration")?.textContent || "1")
        const currentOffset = voiceOffsets.get(voiceNum) || 0

        if (isRest) {
          voiceMap.get(voiceNum)!.push({ pitch: -1, duration, offset: currentOffset })
        } else {
          const step = noteEl.querySelector("step")?.textContent || "C"
          const octave = Number.parseInt(noteEl.querySelector("octave")?.textContent || "4")
          const alter = Number.parseInt(noteEl.querySelector("alter")?.textContent || "0")

          const pitch = stepToMidi(step, octave, alter)
          voiceMap.get(voiceNum)!.push({ pitch, duration, offset: currentOffset })
        }

        voiceOffsets.set(voiceNum, currentOffset + duration)
      })
    })

    return Array.from(voiceMap.values())
  }
}

function generateHarmonicProgressionPolyphonic(
  melodicLines: Note[][],
  root: number,
  scale: number[],
  mode: string,
  enableVariation: boolean,
): Chord[] {
  const scalePitches = scale.map((interval) => (root + interval) % 12)
  const chords: Chord[] = []

  // Find the maximum length to align all voices
  const maxLength = Math.max(...melodicLines.map((line) => line.length))

  const context: VoiceLeadingContext = {
    previousChord: null,
    previousMelody: null,
    measurePosition: 0,
    phrasePosition: 0,
    instrumentVariation: enableVariation ? Math.random() : 0,
  }

  for (let i = 0; i < maxLength; i++) {
    // Collect all simultaneous notes at this time slice
    const simultaneousNotes: number[] = []

    for (const line of melodicLines) {
      if (i < line.length && line[i].pitch !== -1) {
        simultaneousNotes.push(line[i].pitch)
      }
    }

    // If all voices are resting, create a rest chord
    if (simultaneousNotes.length === 0) {
      chords.push({
        root: 0,
        quality: "major",
        inversion: 0,
        voices: [-1, -1, -1, -1],
      })
      context.measurePosition = (context.measurePosition + 1) % 4
      context.phrasePosition++
      continue
    }

    // Analyze the vertical harmony (all simultaneous notes)
    const chord = analyzeVerticalHarmony(
      simultaneousNotes,
      scalePitches,
      root,
      scale,
      context,
      melodicLines,
      i,
      enableVariation,
    )

    chords.push(chord)
    context.previousChord = chord
    context.previousMelody = simultaneousNotes[0] // Use highest voice as reference
    context.measurePosition = (context.measurePosition + 1) % 4
    context.phrasePosition++
  }

  return chords
}

function analyzeVerticalHarmony(
  simultaneousNotes: number[],
  scalePitches: number[],
  keyRoot: number,
  scale: number[],
  context: VoiceLeadingContext,
  allMelodicLines: Note[][],
  currentIndex: number,
  enableVariation = false,
): Chord {
  // Convert all notes to pitch classes
  const pitchClasses = simultaneousNotes.map((n) => n % 12)

  // Find the most likely chord root by analyzing the pitch classes
  const chordCandidates: Array<{ root: number; quality: "major" | "minor" | "diminished"; score: number }> = []

  // Try each scale degree as a potential root
  for (let degree = 0; degree < 7; degree++) {
    const potentialRoot = (keyRoot + scale[degree]) % 12
    const quality = getChordQuality(degree, scale === MAJOR_SCALE)

    // Calculate chord tones for this candidate
    const third = quality === "major" ? 4 : 3
    const fifth = quality === "diminished" ? 6 : 7
    const chordTones = new Set([potentialRoot, (potentialRoot + third) % 12, (potentialRoot + fifth) % 12])

    // Score based on how many input notes match chord tones
    let score = 0
    for (const pc of pitchClasses) {
      if (chordTones.has(pc)) {
        score += 2 // Strong match
      } else if (scalePitches.includes(pc)) {
        score += 0.5 // Passing tone or suspension
      }
    }

    // Bonus for root in bass
    if (pitchClasses[pitchClasses.length - 1] === potentialRoot) {
      score += 1
    }

    chordCandidates.push({ root: potentialRoot, quality, score })
  }

  // Sort by score and select best candidate
  chordCandidates.sort((a, b) => b.score - a.score)
  const bestChord = chordCandidates[0]

  // Determine inversion based on bass note
  const bassNote = simultaneousNotes[simultaneousNotes.length - 1] % 12
  const chordThird = (bestChord.root + (bestChord.quality === "major" ? 4 : 3)) % 12
  const chordFifth = (bestChord.root + (bestChord.quality === "diminished" ? 6 : 7)) % 12

  let inversion: 0 | 1 | 2 = 0
  if (bassNote === chordThird) {
    inversion = 1
  } else if (bassNote === chordFifth) {
    inversion = 2
  }

  // Use the highest input note as the soprano (melody)
  const sopranoNote = simultaneousNotes[0]

  // Voice the chord considering the polyphonic context
  const voices = voiceChordPolyphonic(
    sopranoNote,
    bestChord.root,
    chordThird,
    chordFifth,
    inversion,
    context,
    simultaneousNotes,
  )

  return {
    root: bestChord.root,
    quality: bestChord.quality,
    inversion,
    voices,
  }
}

function voiceChordPolyphonic(
  melodyPitch: number,
  chordRoot: number,
  chordThird: number,
  chordFifth: number,
  inversion: 0 | 1 | 2,
  context: VoiceLeadingContext,
  inputNotes: number[],
): number[] {
  const soprano = melodyPitch
  const sopranoOctave = Math.floor(soprano / 12)

  const altoMin = 55
  const altoMax = 76
  const tenorMin = 48
  const tenorMax = 67
  const bassMin = 40
  const bassMax = 60

  let altoTone: number, tenorTone: number, bassTone: number

  // Try to avoid doubling notes that are already in the input
  const inputPitchClasses = new Set(inputNotes.map((n) => n % 12))
  const chordTones = [chordRoot, chordThird, chordFifth]

  // Prefer chord tones not already present in input
  const availableTones = chordTones.filter((tone) => !inputPitchClasses.has(tone))
  const tonesToUse = availableTones.length > 0 ? availableTones : chordTones

  if (inversion === 0) {
    bassTone = findClosestPitch(chordRoot, sopranoOctave - 2, bassMin, bassMax)
    altoTone = findClosestPitch(tonesToUse[0] || chordThird, sopranoOctave - 1, altoMin, altoMax)
    tenorTone = findClosestPitch(tonesToUse[1] || chordFifth, sopranoOctave - 1, tenorMin, tenorMax)
  } else if (inversion === 1) {
    bassTone = findClosestPitch(chordThird, sopranoOctave - 2, bassMin, bassMax)
    altoTone = findClosestPitch(tonesToUse[0] || chordFifth, sopranoOctave - 1, altoMin, altoMax)
    tenorTone = findClosestPitch(tonesToUse[1] || chordRoot, sopranoOctave - 1, tenorMin, tenorMax)
  } else {
    bassTone = findClosestPitch(chordFifth, sopranoOctave - 2, bassMin, bassMax)
    altoTone = findClosestPitch(tonesToUse[0] || chordRoot, sopranoOctave - 1, altoMin, altoMax)
    tenorTone = findClosestPitch(tonesToUse[1] || chordThird, sopranoOctave - 1, tenorMin, tenorMax)
  }

  if (context.previousChord) {
    const prevVoices = context.previousChord.voices

    altoTone = applyVoiceLeadingToVoice(altoTone, prevVoices[1], chordRoot, chordThird, chordFifth, altoMin, altoMax)
    tenorTone = applyVoiceLeadingToVoice(
      tenorTone,
      prevVoices[2],
      chordRoot,
      chordThird,
      chordFifth,
      tenorMin,
      tenorMax,
    )
    bassTone = applyVoiceLeadingToVoice(
      bassTone,
      prevVoices[3],
      chordRoot,
      chordThird,
      chordFifth,
      bassMin,
      bassMax,
      true,
    )

    const adjustedVoices = avoidParallelMotion([soprano, altoTone, tenorTone, bassTone], prevVoices, [
      chordRoot,
      chordThird,
      chordFifth,
    ])
    altoTone = adjustedVoices[1]
    tenorTone = adjustedVoices[2]
    bassTone = adjustedVoices[3]
  }

  return [soprano, altoTone, tenorTone, bassTone]
}

function createCombinedPolyphonicXML(
  originalDoc: Document,
  melodicLines: Note[][],
  harmoniesByInstrument: Record<string, Note[]>,
  fifths: string,
  mode: string,
): string {
  const beats = originalDoc.querySelector("beats")?.textContent || "4"
  const beatType = originalDoc.querySelector("beat-type")?.textContent || "4"
  const divisions = originalDoc.querySelector("divisions")?.textContent || "1"

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE score-partwise PUBLIC "-//Recordare//DTD MusicXML 3.1 Partwise//EN" "http://www.musicxml.org/dtds/partwise.dtd">
<score-partwise version="3.1">
  <part-list>`

  // Add original melodic lines
  for (let i = 0; i < melodicLines.length; i++) {
    xml += `
    <score-part id="P${i + 1}">
      <part-name>Original Voice ${i + 1}</part-name>
    </score-part>`
  }

  // Add harmony instruments
  let partId = melodicLines.length + 1
  for (const instrument of Object.keys(harmoniesByInstrument)) {
    xml += `
    <score-part id="P${partId}">
      <part-name>${instrument} (Harmony)</part-name>
    </score-part>`
    partId++
  }

  xml += `
  </part-list>`

  // Add original melodic lines as parts
  for (let i = 0; i < melodicLines.length; i++) {
    xml += createPartXML(
      `P${i + 1}`,
      melodicLines[i],
      fifths,
      mode,
      beats,
      beatType,
      divisions,
      INSTRUMENT_CONFIG["Soprano"],
    )
  }

  // Add harmony parts
  partId = melodicLines.length + 1
  for (const [instrument, notes] of Object.entries(harmoniesByInstrument)) {
    const instrumentConfig = INSTRUMENT_CONFIG[instrument] || INSTRUMENT_CONFIG["Other"]
    xml += createPartXML(`P${partId}`, notes, fifths, mode, beats, beatType, divisions, instrumentConfig)
    partId++
  }

  xml += `
</score-partwise>`

  return xml
}

function generateHarmonicProgression(
  melodyNotes: Note[],
  root: number,
  scale: number[],
  mode: string,
  enableVariation: boolean,
): Chord[] {
  const scalePitches = scale.map((interval) => (root + interval) % 12)
  const chords: Chord[] = []

  const context: VoiceLeadingContext = {
    previousChord: null,
    previousMelody: null,
    measurePosition: 0,
    phrasePosition: 0,
    instrumentVariation: enableVariation ? Math.random() : 0,
  }

  melodyNotes.forEach((note, index) => {
    if (note.pitch === -1) {
      chords.push({
        root: 0,
        quality: "major",
        inversion: 0,
        voices: [-1, -1, -1, -1], // Mark as rest
      })
      context.measurePosition = (context.measurePosition + 1) % 4
      context.phrasePosition++
      return
    }

    const chord = analyzeAndBuildChord(
      note.pitch,
      scalePitches,
      root,
      scale,
      context,
      melodyNotes,
      index,
      enableVariation,
    )

    chords.push(chord)
    context.previousChord = chord
    context.previousMelody = note.pitch
    context.measurePosition = (context.measurePosition + 1) % 4
    context.phrasePosition++
  })

  return chords
}

function generateInstrumentPart(
  harmonicProgression: Chord[],
  assignedVoiceIndex: 1 | 2 | 3,
  instrumentConfig: InstrumentConfig,
  melodyNotes: Note[],
): Note[] {
  const instrumentNotes: Note[] = []
  let previousVoicePitch: number | null = null

  harmonicProgression.forEach((chord, index) => {
    const melodyNote = melodyNotes[index]

    if (!melodyNote) {
      console.log(`[v0] Warning: No melody note at index ${index}, skipping`)
      return
    }

    if (chord.voices[0] === -1) {
      instrumentNotes.push({
        pitch: -1,
        duration: melodyNote.duration,
        offset: melodyNote.offset,
      })
      previousVoicePitch = null
      return
    }

    let voicePitch = chord.voices[assignedVoiceIndex]

    voicePitch = constrainToInstrumentRange(
      voicePitch,
      instrumentConfig.minMidi,
      instrumentConfig.maxMidi,
      previousVoicePitch,
    )

    instrumentNotes.push({
      pitch: voicePitch,
      duration: melodyNote.duration,
      offset: melodyNote.offset,
    })

    previousVoicePitch = voicePitch
  })

  return instrumentNotes
}

function constrainToInstrumentRange(
  pitch: number,
  minMidi: number,
  maxMidi: number,
  previousPitch: number | null,
): number {
  let adjustedPitch = pitch

  // First, transpose to fit in range
  while (adjustedPitch < minMidi) adjustedPitch += 12
  while (adjustedPitch > maxMidi) adjustedPitch -= 12

  // If we have a previous pitch, apply voice leading
  if (previousPitch !== null) {
    const interval = Math.abs(adjustedPitch - previousPitch)

    // If leap is too large, find closer octave
    if (interval > 8) {
      const pitchClass = pitch % 12
      const previousOctave = Math.floor(previousPitch / 12)

      let bestPitch = adjustedPitch
      let bestDistance = interval

      // Try adjacent octaves
      for (let octave = previousOctave - 1; octave <= previousOctave + 1; octave++) {
        const candidate = octave * 12 + pitchClass
        if (candidate >= minMidi && candidate <= maxMidi) {
          const distance = Math.abs(candidate - previousPitch)
          if (distance < bestDistance) {
            bestDistance = distance
            bestPitch = candidate
          }
        }
      }

      adjustedPitch = bestPitch
    }
  }

  return adjustedPitch
}

function getScaleNotes(root: number, scale: number[]): string[] {
  const noteNames = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"]
  return scale.map((interval) => noteNames[(root + interval) % 12])
}

function getKeyInfo(fifths: number, mode: string): { root: number; scale: number[] } {
  const majorRoots = [0, 7, 2, 9, 4, 11, 6, 1, 8, 3, 10, 5]
  let root: number
  if (fifths >= 0) {
    root = majorRoots[fifths % 12]
  } else {
    root = majorRoots[(12 + fifths) % 12]
  }

  const scale = mode === "minor" ? MINOR_SCALE : MAJOR_SCALE

  return { root, scale }
}

function extractNotes(xmlDoc: Document): Note[] {
  const notes: Note[] = []
  const measures = xmlDoc.querySelectorAll("measure")
  let currentOffset = 0

  measures.forEach((measure) => {
    const noteElements = measure.querySelectorAll("note")

    noteElements.forEach((noteEl) => {
      const isRest = noteEl.querySelector("rest") !== null
      const duration = Number.parseFloat(noteEl.querySelector("duration")?.textContent || "1")

      if (isRest) {
        notes.push({ pitch: -1, duration, offset: currentOffset })
      } else {
        const step = noteEl.querySelector("step")?.textContent || "C"
        const octave = Number.parseInt(noteEl.querySelector("octave")?.textContent || "4")
        const alter = Number.parseInt(noteEl.querySelector("alter")?.textContent || "0")

        const pitch = stepToMidi(step, octave, alter)
        notes.push({ pitch, duration, offset: currentOffset })
      }

      currentOffset += duration
    })
  })

  return notes
}

function stepToMidi(step: string, octave: number, alter: number): number {
  const stepValues: Record<string, number> = {
    C: 0,
    D: 2,
    E: 4,
    F: 5,
    G: 7,
    A: 9,
    B: 11,
  }
  return (octave + 1) * 12 + (stepValues[step] || 0) + alter
}

function midiToStep(midi: number): { step: string; octave: number; alter: number } {
  const octave = Math.floor(midi / 12) - 1
  const pitchClass = midi % 12

  const steps = [
    { step: "C", alter: 0 },
    { step: "C", alter: 1 },
    { step: "D", alter: 0 },
    { step: "E", alter: -1 },
    { step: "E", alter: 0 },
    { step: "F", alter: 0 },
    { step: "F", alter: 1 },
    { step: "G", alter: 0 },
    { step: "G", alter: 1 },
    { step: "A", alter: 0 },
    { step: "B", alter: -1 },
    { step: "B", alter: 0 },
  ]

  return { ...steps[pitchClass], octave }
}

function analyzeAndBuildChord(
  melodyPitch: number,
  scalePitches: number[],
  keyRoot: number,
  scale: number[],
  context: VoiceLeadingContext,
  allMelodyNotes: Note[],
  currentIndex: number,
  enableVariation = false,
): Chord {
  const melodyPitchClass = melodyPitch % 12
  const scaleIndex = scalePitches.indexOf(melodyPitchClass)

  let chordScaleDegree: number
  let chordQuality: "major" | "minor" | "diminished" | "augmented"

  if (scaleIndex === -1) {
    chordScaleDegree = 6
    chordQuality = "diminished"
  } else {
    const isStrongBeat = context.measurePosition % 2 === 0
    const isEndOfPhrase = currentIndex === allMelodyNotes.length - 1 || currentIndex % 8 === 7

    chordScaleDegree = selectChordDegree(
      scaleIndex,
      isStrongBeat,
      isEndOfPhrase,
      context,
      enableVariation ? context.instrumentVariation : 0,
    )
    chordQuality = getChordQuality(chordScaleDegree, scale === MAJOR_SCALE)
  }

  const chordRoot = (keyRoot + scale[chordScaleDegree]) % 12
  const chordThird = (chordRoot + (chordQuality === "major" ? 4 : chordQuality === "minor" ? 3 : 3)) % 12
  const chordFifth = (chordRoot + (chordQuality === "diminished" ? 6 : 7)) % 12

  let inversion: 0 | 1 | 2 = 0
  if (melodyPitchClass === chordThird) {
    inversion = 1
  } else if (melodyPitchClass === chordFifth) {
    inversion = 2
  }

  const voices = voiceChord(melodyPitch, chordRoot, chordThird, chordFifth, inversion, context)

  return {
    root: chordRoot,
    quality: chordQuality,
    inversion,
    voices,
  }
}

function selectChordDegree(
  melodyScaleDegree: number,
  isStrongBeat: boolean,
  isEndOfPhrase: boolean,
  context: VoiceLeadingContext,
  variation = 0,
): number {
  if (isEndOfPhrase) {
    if (melodyScaleDegree === 0) return 0
    if (melodyScaleDegree === 4) return 4
    if (melodyScaleDegree === 6) return 4
  }

  if (isStrongBeat) {
    const stableChords = [0, 3, 4]
    for (const degree of stableChords) {
      if (
        degree === melodyScaleDegree ||
        (degree + 2) % 7 === melodyScaleDegree ||
        (degree + 4) % 7 === melodyScaleDegree
      ) {
        return degree
      }
    }
  }

  const possibleChords: number[] = []

  for (let degree = 0; degree < 7; degree++) {
    const chordTones = [degree, (degree + 2) % 7, (degree + 4) % 7]
    if (chordTones.includes(melodyScaleDegree)) {
      possibleChords.push(degree)
    }
  }

  if (possibleChords.length === 0) {
    return melodyScaleDegree
  }

  const weights = possibleChords.map((degree) => {
    let baseWeight = 1.0
    if (degree === 0) baseWeight = 3.0
    if (degree === 4) baseWeight = 2.5
    if (degree === 3) baseWeight = 2.0
    if (degree === 1 || degree === 5) baseWeight = 1.5

    return baseWeight + variation * (Math.random() - 0.5) * 0.5
  })

  const totalWeight = weights.reduce((sum, w) => sum + w, 0)
  let random = Math.random() * totalWeight

  for (let i = 0; i < possibleChords.length; i++) {
    random -= weights[i]
    if (random <= 0) {
      return possibleChords[i]
    }
  }

  return possibleChords[0]
}

function getChordQuality(scaleDegree: number, isMajorKey: boolean): "major" | "minor" | "diminished" | "augmented" {
  if (isMajorKey) {
    if (scaleDegree === 0 || scaleDegree === 3 || scaleDegree === 4) return "major"
    if (scaleDegree === 6) return "diminished"
    return "minor"
  } else {
    if (scaleDegree === 0 || scaleDegree === 3) return "minor"
    if (scaleDegree === 2 || scaleDegree === 5 || scaleDegree === 6) return "major"
    if (scaleDegree === 1) return "diminished"
    if (scaleDegree === 4) return "major"
    return "minor"
  }
}

function voiceChord(
  melodyPitch: number,
  chordRoot: number,
  chordThird: number,
  chordFifth: number,
  inversion: 0 | 1 | 2,
  context: VoiceLeadingContext,
): number[] {
  const soprano = melodyPitch
  const sopranoOctave = Math.floor(soprano / 12)

  const altoMin = 55
  const altoMax = 76
  const tenorMin = 48
  const tenorMax = 67
  const bassMin = 40
  const bassMax = 60

  let altoTone: number, tenorTone: number, bassTone: number

  if (inversion === 0) {
    bassTone = findClosestPitch(chordRoot, sopranoOctave - 2, bassMin, bassMax)
    altoTone = findClosestPitch(chordThird, sopranoOctave - 1, altoMin, altoMax)
    tenorTone = findClosestPitch(chordFifth, sopranoOctave - 1, tenorMin, tenorMax)
  } else if (inversion === 1) {
    bassTone = findClosestPitch(chordThird, sopranoOctave - 2, bassMin, bassMax)
    altoTone = findClosestPitch(chordFifth, sopranoOctave - 1, altoMin, altoMax)
    tenorTone = findClosestPitch(chordRoot, sopranoOctave - 1, tenorMin, tenorMax)
  } else {
    bassTone = findClosestPitch(chordFifth, sopranoOctave - 2, bassMin, bassMax)
    altoTone = findClosestPitch(chordRoot, sopranoOctave - 1, altoMin, altoMax)
    tenorTone = findClosestPitch(chordThird, sopranoOctave - 1, tenorMin, tenorMax)
  }

  if (context.previousChord) {
    const prevVoices = context.previousChord.voices

    altoTone = applyVoiceLeadingToVoice(altoTone, prevVoices[1], chordRoot, chordThird, chordFifth, altoMin, altoMax)
    tenorTone = applyVoiceLeadingToVoice(
      tenorTone,
      prevVoices[2],
      chordRoot,
      chordThird,
      chordFifth,
      tenorMin,
      tenorMax,
    )
    bassTone = applyVoiceLeadingToVoice(
      bassTone,
      prevVoices[3],
      chordRoot,
      chordThird,
      chordFifth,
      bassMin,
      bassMax,
      true,
    )

    const adjustedVoices = avoidParallelMotion([soprano, altoTone, tenorTone, bassTone], prevVoices, [
      chordRoot,
      chordThird,
      chordFifth,
    ])
    altoTone = adjustedVoices[1]
    tenorTone = adjustedVoices[2]
    bassTone = adjustedVoices[3]
  }

  return [soprano, altoTone, tenorTone, bassTone]
}

function findClosestPitch(pitchClass: number, targetOctave: number, minMidi: number, maxMidi: number): number {
  let pitch = targetOctave * 12 + pitchClass

  while (pitch < minMidi) pitch += 12
  while (pitch > maxMidi) pitch -= 12

  return pitch
}

function applyVoiceLeadingToVoice(
  currentPitch: number,
  previousPitch: number,
  chordRoot: number,
  chordThird: number,
  chordFifth: number,
  minRange: number,
  maxRange: number,
  allowLeaps = false,
): number {
  const interval = Math.abs(currentPitch - previousPitch)

  if (interval > (allowLeaps ? 12 : 7)) {
    const chordTones = [chordRoot, chordThird, chordFifth]
    const previousOctave = Math.floor(previousPitch / 12)

    let bestPitch = currentPitch
    let bestDistance = interval

    for (const tone of chordTones) {
      for (let octave = previousOctave - 1; octave <= previousOctave + 1; octave++) {
        const candidate = octave * 12 + tone
        if (candidate >= minRange && candidate <= maxRange) {
          const distance = Math.abs(candidate - previousPitch)
          if (distance < bestDistance) {
            bestDistance = distance
            bestPitch = candidate
          }
        }
      }
    }

    currentPitch = bestPitch
  }

  while (currentPitch < minRange) currentPitch += 12
  while (currentPitch > maxRange) currentPitch -= 12

  return currentPitch
}

function avoidParallelMotion(currentVoices: number[], previousVoices: number[], chordTones: number[]): number[] {
  const adjusted = [...currentVoices]

  for (let i = 0; i < currentVoices.length; i++) {
    for (let j = i + 1; j < currentVoices.length; j++) {
      const currentInterval = Math.abs(currentVoices[i] - currentVoices[j]) % 12
      const previousInterval = Math.abs(previousVoices[i] - previousVoices[j]) % 12

      if ((currentInterval === 7 || currentInterval === 0) && currentInterval === previousInterval) {
        const currentMotion = currentVoices[i] - previousVoices[i]
        const otherMotion = currentVoices[j] - previousVoices[j]

        if ((currentMotion > 0 && otherMotion > 0) || (currentMotion < 0 && otherMotion < 0)) {
          const lowerVoiceOctave = Math.floor(adjusted[j] / 12)

          for (const tone of chordTones) {
            const candidate = lowerVoiceOctave * 12 + tone
            const newInterval = Math.abs(adjusted[i] - candidate) % 12

            if (newInterval !== currentInterval) {
              adjusted[j] = candidate
              console.log(
                `[v0] Avoided parallel ${currentInterval === 7 ? "fifth" : "octave"} between voices ${i} and ${j}`,
              )
              break
            }
          }
        }
      }
    }
  }

  return adjusted
}

function createMultiInstrumentHarmonyXML(originalDoc: Document, harmoniesByInstrument: Record<string, Note[]>): string {
  const fifths = originalDoc.querySelector("fifths")?.textContent || "0"
  const mode = originalDoc.querySelector("mode")?.textContent || "major"
  const beats = originalDoc.querySelector("beats")?.textContent || "4"
  const beatType = originalDoc.querySelector("beat-type")?.textContent || "4"
  const divisions = originalDoc.querySelector("divisions")?.textContent || "1"

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE score-partwise PUBLIC "-//Recordare//DTD MusicXML 3.1 Partwise//EN" "http://www.musicxml.org/dtds/partwise.dtd">
<score-partwise version="3.1">
  <part-list>`

  let partId = 1
  for (const instrument of Object.keys(harmoniesByInstrument)) {
    xml += `
    <score-part id="P${partId}">
      <part-name>${instrument}</part-name>
    </score-part>`
    partId++
  }

  xml += `
  </part-list>`

  partId = 1
  for (const [instrument, notes] of Object.entries(harmoniesByInstrument)) {
    const instrumentConfig = INSTRUMENT_CONFIG[instrument] || INSTRUMENT_CONFIG["Other"]
    xml += createPartXML(`P${partId}`, notes, fifths, mode, beats, beatType, divisions, instrumentConfig)
    partId++
  }

  xml += `
</score-partwise>`

  return xml
}

function createCombinedMultiInstrumentXML(
  originalDoc: Document,
  melodyNotes: Note[],
  harmoniesByInstrument: Record<string, Note[]>,
): string {
  const fifths = originalDoc.querySelector("fifths")?.textContent || "0"
  const mode = originalDoc.querySelector("mode")?.textContent || "major"
  const beats = originalDoc.querySelector("beats")?.textContent || "4"
  const beatType = originalDoc.querySelector("beat-type")?.textContent || "4"
  const divisions = originalDoc.querySelector("divisions")?.textContent || "1"

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE score-partwise PUBLIC "-//Recordare//DTD MusicXML 3.1 Partwise//EN" "http://www.musicxml.org/dtds/partwise.dtd">
<score-partwise version="3.1">
  <part-list>
    <score-part id="P1">
      <part-name>Soprano (Melody)</part-name>
    </score-part>`

  let partId = 2
  for (const instrument of Object.keys(harmoniesByInstrument)) {
    xml += `
    <score-part id="P${partId}">
      <part-name>${instrument}</part-name>
    </score-part>`
    partId++
  }

  xml += `
  </part-list>`

  xml += createPartXML("P1", melodyNotes, fifths, mode, beats, beatType, divisions, INSTRUMENT_CONFIG["Soprano"])

  partId = 2
  for (const [instrument, notes] of Object.entries(harmoniesByInstrument)) {
    const instrumentConfig = INSTRUMENT_CONFIG[instrument] || INSTRUMENT_CONFIG["Other"]
    xml += createPartXML(`P${partId}`, notes, fifths, mode, beats, beatType, divisions, instrumentConfig)
    partId++
  }

  xml += `
</score-partwise>`

  return xml
}

function createPartXML(
  partId: string,
  notes: Note[],
  fifths: string,
  mode: string,
  beats: string,
  beatType: string,
  divisions: string,
  instrumentConfig: InstrumentConfig,
): string {
  let xml = `
  <part id="${partId}">
    <measure number="1">
      <attributes>
        <divisions>${divisions}</divisions>
        <key>
          <fifths>${fifths}</fifths>
          <mode>${mode}</mode>
        </key>
        <time>
          <beats>${beats}</beats>
          <beat-type>${beatType}</beat-type>
        </time>
        <clef>
          <sign>${instrumentConfig.clefSign}</sign>
          <line>${instrumentConfig.clefLine}</line>
        </clef>
      </attributes>`

  let currentMeasure = 1
  let measureDuration = 0
  const maxMeasureDuration = Number.parseInt(divisions) * Number.parseInt(beats)

  notes.forEach((note, index) => {
    if (measureDuration >= maxMeasureDuration && index < notes.length) {
      xml += `
    </measure>
    <measure number="${++currentMeasure}">`
      measureDuration = 0
    }

    if (note.pitch === -1) {
      xml += `
      <note>
        <rest/>
        <duration>${note.duration}</duration>
      </note>`
    } else {
      const transposedPitch = note.pitch + instrumentConfig.transposition
      const { step, octave, alter } = midiToStep(transposedPitch)
      xml += `
      <note>
        <pitch>
          <step>${step}</step>${
            alter !== 0
              ? `
          <alter>${alter}</alter>`
              : ""
          }
          <octave>${octave}</octave>
        </pitch>
        <duration>${note.duration}</duration>
      </note>`
    }

    measureDuration += note.duration
  })

  xml += `
    </measure>
  </part>`

  return xml
}

function validateHarmonicProgression(
  chords: Chord[],
  melodyNotes: Note[],
  keyRoot: number,
  scale: number[],
  isMajor: boolean,
): HarmonicAnalysis {
  const warnings: string[] = []
  let score = 100

  // Check 1: Common tone connectivity
  let commonToneCount = 0
  for (let i = 1; i < chords.length; i++) {
    if (chords[i].voices[0] === -1 || chords[i - 1].voices[0] === -1) continue

    const currentTones = new Set(chords[i].voices.map((v) => v % 12))
    const previousTones = new Set(chords[i - 1].voices.map((v) => v % 12))

    const hasCommonTone = Array.from(currentTones).some((tone) => previousTones.has(tone))
    if (hasCommonTone) {
      commonToneCount++
    } else {
      warnings.push(`No common tones between chords ${i} and ${i + 1}`)
      score -= 2
    }
  }

  // Check 2: Chord quality appropriateness
  let appropriateChords = 0
  for (let i = 0; i < chords.length; i++) {
    if (chords[i].voices[0] === -1) continue

    const melodyClass = melodyNotes[i].pitch % 12
    const chordTones = new Set([chords[i].root, (chords[i].root + 4) % 12, (chords[i].root + 7) % 12])

    if (chordTones.has(melodyClass) || (chords[i].quality === "minor" && chordTones.has((chords[i].root + 3) % 12))) {
      appropriateChords++
    } else {
      warnings.push(`Melody note ${i} not well supported by chord quality`)
      score -= 1
    }
  }

  // Check 3: Voice leading smoothness
  let smoothTransitions = 0
  for (let voice = 1; voice < 4; voice++) {
    for (let i = 1; i < chords.length; i++) {
      if (chords[i].voices[voice] === -1 || chords[i - 1].voices[voice] === -1) continue

      const interval = Math.abs(chords[i].voices[voice] - chords[i - 1].voices[voice])
      if (interval <= 5) {
        smoothTransitions++
      } else {
        score -= 0.5
      }
    }
  }

  // Check 4: Chord progression logic
  let progressionScore = 0
  for (let i = 1; i < chords.length; i++) {
    if (chords[i].voices[0] === -1 || chords[i - 1].voices[0] === -1) continue

    const prev = chords[i - 1].root % 12
    const curr = chords[i].root % 12
    const interval = (curr - prev + 12) % 12

    // Strong progressions: IV→I, V→I, ii→V, etc.
    if ([5, 7].includes(interval) || (interval === 1 && isMajor)) {
      progressionScore += 2
    } else if ([2, 3, 4, 8, 9, 10].includes(interval)) {
      progressionScore += 1
    }
  }

  score = Math.max(0, Math.min(100, score + Math.min(progressionScore, 10)))

  return {
    score: Math.round(score),
    warnings,
    suggestions: [],
  }
}

function refineHarmonicProgression(
  chords: Chord[],
  melodyNotes: Note[],
  keyRoot: number,
  scale: number[],
  isMajor: boolean,
): Chord[] {
  const refined: Chord[] = []

  for (let i = 0; i < chords.length; i++) {
    let chord = { ...chords[i], voices: [...chords[i].voices] }

    if (chord.voices[0] === -1) {
      refined.push(chord)
      continue
    }

    // Apply common tone retention
    if (i > 0 && chords[i - 1].voices[0] !== -1) {
      const previousTones = new Set(refined[i - 1].voices.map((v) => v % 12))
      const currentTones = new Set([chord.root % 12, (chord.root + 4) % 12, (chord.root + 7) % 12])

      const commonTones = Array.from(currentTones).filter((t) => previousTones.has(t))

      if (commonTones.length === 0) {
        // Try voice leading inversion to retain common tone
        const bestInversion = findBestInversionForCommonTone(chord, refined[i - 1], keyRoot, scale, isMajor)
        if (bestInversion) {
          chord = bestInversion
        }
      }
    }

    // Ensure voices are within bounds and smooth
    if (i > 0 && refined[i - 1].voices[0] !== -1) {
      chord = smoothVoiceLeading(chord, refined[i - 1])
    }

    refined.push(chord)
  }

  return refined
}

function findBestInversionForCommonTone(
  currentChord: Chord,
  previousChord: Chord,
  keyRoot: number,
  scale: number[],
  isMajor: boolean,
): Chord | null {
  const chordThird = (currentChord.root + (currentChord.quality === "major" ? 4 : 3)) % 12
  const chordFifth = (currentChord.root + (currentChord.quality === "diminished" ? 6 : 7)) % 12
  const previousTones = new Set(previousChord.voices.map((v) => v % 12))

  const candidates = [
    { inversion: 0, bass: currentChord.root, commonTone: previousTones.has(currentChord.root % 12) },
    { inversion: 1, bass: chordThird, commonTone: previousTones.has(chordThird) },
    { inversion: 2, bass: chordFifth, commonTone: previousTones.has(chordFifth) },
  ]

  const best = candidates.find((c) => c.commonTone)
  if (best && best.inversion !== currentChord.inversion) {
    return {
      ...currentChord,
      inversion: best.inversion as 0 | 1 | 2,
      voices: voiceChord(
        previousChord.voices[0],
        currentChord.root,
        chordThird,
        chordFifth,
        best.inversion as 0 | 1 | 2,
        { previousChord, previousMelody: null, measurePosition: 0, phrasePosition: 0, instrumentVariation: 0 },
      ),
    }
  }

  return null
}

function smoothVoiceLeading(currentChord: Chord, previousChord: Chord): Chord {
  const smoothed = { ...currentChord, voices: [...currentChord.voices] }

  for (let voice = 1; voice < 4; voice++) {
    if (currentChord.voices[voice] === -1 || previousChord.voices[voice] === -1) continue

    const interval = currentChord.voices[voice] - previousChord.voices[voice]

    // If leap is large, try to reduce it
    if (Math.abs(interval) > 8) {
      const pitchClass = currentChord.voices[voice] % 12
      const targetOctave = Math.floor(previousChord.voices[voice] / 12)

      let bestPitch = currentChord.voices[voice]
      let bestInterval = Math.abs(interval)

      for (let octave = targetOctave - 1; octave <= targetOctave + 1; octave++) {
        const candidate = octave * 12 + pitchClass
        const candidateInterval = Math.abs(candidate - previousChord.voices[voice])

        if (candidateInterval < bestInterval) {
          bestInterval = candidateInterval
          bestPitch = candidate
        }
      }

      smoothed.voices[voice] = bestPitch
    }
  }

  return smoothed
}
