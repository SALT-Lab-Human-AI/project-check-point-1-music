"use client"

import type React from "react"

import { useState } from "react"
import { Upload, Music, Download, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"

interface HarmonizedOutput {
  harmonyOnly: {
    content: string
    filename: string
  }
  combined: {
    content: string
    filename: string
  }
}

const INSTRUMENTS = [
  { id: "Violin", name: "Violin", group: "Strings" },
  { id: "Viola", name: "Viola", group: "Strings" },
  { id: "Cello", name: "Cello", group: "Strings" },
  { id: "Flute", name: "Flute", group: "Woodwinds" },
  { id: "Oboe", name: "Oboe", group: "Woodwinds" },
  { id: "B-flat Clarinet", name: "B♭ Clarinet", group: "Woodwinds" },
  { id: "Bassoon", name: "Bassoon", group: "Woodwinds" },
  { id: "B-flat Trumpet", name: "B♭ Trumpet", group: "Brass" },
  { id: "F Horn", name: "F Horn", group: "Brass" },
  { id: "Tuba", name: "Tuba", group: "Brass" },
  { id: "Soprano", name: "Soprano Voice", group: "Voices" },
  { id: "Tenor Voice", name: "Tenor Voice", group: "Voices" },
]

export default function HarmonizerPage() {
  const [file, setFile] = useState<File | null>(null)
  const [selectedInstruments, setSelectedInstruments] = useState<string[]>(["Violin"])
  const [isProcessing, setIsProcessing] = useState(false)
  const [harmonizedOutput, setHarmonizedOutput] = useState<HarmonizedOutput | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      if (selectedFile.name.endsWith(".musicxml") || selectedFile.name.endsWith(".xml")) {
        setFile(selectedFile)
        setHarmonizedOutput(null)
        toast.success(`File "${selectedFile.name}" loaded successfully`)
      } else {
        toast.error("Please upload a MusicXML file (.musicxml or .xml)")
      }
    }
  }

  const toggleInstrument = (instrumentId: string) => {
    setSelectedInstruments((prev) => {
      if (prev.includes(instrumentId)) {
        return prev.filter((id) => id !== instrumentId)
      } else {
        return [...prev, instrumentId]
      }
    })
  }

  const handleGenerate = async () => {
    if (!file) {
      toast.error("Please upload a MusicXML file first")
      return
    }

    if (selectedInstruments.length === 0) {
      toast.error("Please select at least one instrument")
      return
    }

    setIsProcessing(true)

    try {
      const formData = new FormData()
      formData.append("file", file)
      formData.append("instruments", selectedInstruments.join(","))

      const response = await fetch("/api/harmonize", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || "Harmonization failed")
      }

      const output: HarmonizedOutput = await response.json()
      setHarmonizedOutput(output)
      toast.success("Harmony parts generated successfully!")
    } catch (error) {
      console.error("[v0] Harmonization error:", error)
      toast.error(error instanceof Error ? error.message : "Failed to generate harmony")
    } finally {
      setIsProcessing(false)
    }
  }

  const downloadFile = (content: string, filename: string) => {
    const blob = new Blob([content], { type: "application/vnd.recordare.musicxml+xml" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    toast.success(`${filename} downloaded!`)
  }

  const groupedInstruments = INSTRUMENTS.reduce(
    (acc, inst) => {
      const group = inst.group
      if (!acc[group]) acc[group] = []
      acc[group].push(inst)
      return acc
    },
    {} as Record<string, typeof INSTRUMENTS>,
  )

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <Music className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-foreground">Harmonizer</h1>
              <p className="text-sm text-muted-foreground">Intelligent music harmony generation</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-4xl space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-bold tracking-tight text-foreground">Generate Professional Chord Harmonies</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Upload your melody in MusicXML format and let our intelligent harmonization engine create full chord
              arrangements with sophisticated voice-leading and stochastic control techniques.
            </p>
          </div>

          <Card className="border-2">
            <CardHeader>
              <CardTitle>Harmonization Workflow</CardTitle>
              <CardDescription>Follow these steps to generate your chord harmony parts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Step 1: Upload */}
              <div className="space-y-3">
                <Label htmlFor="file-upload" className="text-base font-semibold">
                  1. Upload Melody
                </Label>
                <div className="flex items-center gap-4">
                  <Button variant="outline" className="relative overflow-hidden bg-transparent" asChild>
                    <label htmlFor="file-upload" className="cursor-pointer">
                      <Upload className="mr-2 h-4 w-4" />
                      Choose MusicXML File
                      <input
                        id="file-upload"
                        type="file"
                        accept=".musicxml,.xml"
                        onChange={handleFileChange}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                      />
                    </label>
                  </Button>
                  {file && (
                    <div className="flex items-center gap-2 text-sm">
                      <div className="flex h-8 w-8 items-center justify-center rounded bg-primary/10">
                        <Music className="h-4 w-4 text-primary" />
                      </div>
                      <span className="font-medium text-foreground">{file.name}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Step 2: Select Instruments */}
              <div className="space-y-3">
                <Label htmlFor="instrument-select" className="text-base font-semibold">
                  2. Select Instruments (choose one or more)
                </Label>
                <p className="text-sm text-muted-foreground">
                  {selectedInstruments.length === 0
                    ? "Select at least one instrument"
                    : selectedInstruments.length === 1
                      ? "Single instrument selected - will generate standard chord harmony"
                      : `Multiple instruments selected - each will have distinct but musically coherent harmony`}
                </p>
                <div className="space-y-2">
                  {Object.entries(groupedInstruments).map(([group, instruments]) => (
                    <div key={group}>
                      <div className="px-3 py-1 text-xs font-semibold text-muted-foreground">{group}</div>
                      <div className="grid grid-cols-2 gap-2 md:grid-cols-3 px-2">
                        {instruments.map((inst) => (
                          <button
                            key={inst.id}
                            onClick={() => toggleInstrument(inst.id)}
                            className={`px-3 py-2 rounded text-sm font-medium transition-colors ${
                              selectedInstruments.includes(inst.id)
                                ? "bg-primary text-primary-foreground"
                                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                            }`}
                          >
                            {inst.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Step 3: Generate */}
              <div className="space-y-3">
                <Label className="text-base font-semibold">3. Generate Chord Harmonies</Label>
                <Button
                  onClick={handleGenerate}
                  disabled={!file || isProcessing || selectedInstruments.length === 0}
                  size="lg"
                  className="w-full"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Music className="mr-2 h-4 w-4" />
                      Generate Chord Harmonies
                    </>
                  )}
                </Button>
              </div>

              {/* Step 4: Download */}
              {harmonizedOutput && (
                <div className="space-y-3 pt-4 border-t">
                  <Label className="text-base font-semibold">4. Download Results</Label>
                  <div className="grid gap-3 md:grid-cols-2">
                    <Button
                      onClick={() =>
                        downloadFile(harmonizedOutput.harmonyOnly.content, harmonizedOutput.harmonyOnly.filename)
                      }
                      variant="default"
                      size="lg"
                      className="w-full"
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Harmony Only
                    </Button>
                    <Button
                      onClick={() =>
                        downloadFile(harmonizedOutput.combined.content, harmonizedOutput.combined.filename)
                      }
                      variant="default"
                      size="lg"
                      className="w-full"
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Full Score
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground text-center">
                    Download the harmony for {selectedInstruments.join(", ")} or get a full score with your melody
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Info Cards */}
          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Multi-Instrument Support</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Supports strings, woodwinds, brass, and vocals with proper clef notation, pitch ranges, and
                  transposition for each instrument
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Voice Leading</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Applies classical voice-leading rules including smooth motion, proper ranges, and avoidance of
                  parallel fifths and octaves
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Stochastic Control</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Uses probabilistic techniques to make musically intelligent decisions about chord selection and voice
                  movement for natural-sounding results
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <footer className="border-t border-border mt-16">
        <div className="container mx-auto px-4 py-8">
          <p className="text-center text-sm text-muted-foreground">
            Built with music theory and intelligent algorithms
          </p>
        </div>
      </footer>
    </div>
  )
}
