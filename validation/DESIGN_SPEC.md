# Design Specification: Chamber Music AI Harmonizer

**Team Members:** Dulf Vincent Genis, Shivam Patel, Misha Gandhi, Joanna George

---

## Problem Restatement

Based on our proposal and anticipated validation findings, current AI music tools fail to provide controllable, sheet music-compatible ensemble part generation from single melodies. Chamber music ensembles need a tool that can take a solo melodic line and generate harmonized parts for complementary instruments in formats that musicians can actually use for performance.

---

## Core Value Proposition

Our tool addresses three critical gaps in existing AI music generation:

1. **Input Flexibility**: Accept multiple input formats (MIDI, audio, sheet music images/PDFs)
2. **Symbolic Output**: Generate editable notation (MusicXML, MIDI) instead of fixed audio files
3. **Chamber Music Focus**: Specialized controls for string ensemble harmonization with adjustable difficulty levels

---

## User Personas

### Primary: Chamber Ensemble Leader (Sarah)
- **Background**: Violinist leading a community string quartet
- **Pain Point**: Limited repertoire - many pieces only exist as solo violin parts
- **Goal**: Expand playable repertoire by generating complementary parts
- **Technical Comfort**: Moderate - uses notation software but not DAWs

### Secondary: Music Educator (David)  
- **Background**: High school music teacher
- **Pain Point**: Students want to play popular melodies but no ensemble arrangements exist
- **Goal**: Create educational arrangements at appropriate difficulty levels
- **Technical Comfort**: High - comfortable with music technology

### Tertiary: Amateur Musician (Maria)
- **Background**: Adult learner, plays cello recreationally  
- **Pain Point**: Wants to join jam sessions but can't improvise harmonies
- **Goal**: Get sheet music for backing parts to popular melodies
- **Technical Comfort**: Low - prefers simple, intuitive interfaces

---

## User Journeys

### Primary Journey: Solo Melody → Chamber Ensemble Parts

1. **Input Phase**
   - User uploads solo melody (MIDI file, audio recording, or sheet music PDF)
   - System processes and displays recognized melody with measure numbers

2. **Configuration Phase**  
   - Select target instruments (viola, cello, 2nd violin, bass)
   - Choose difficulty level (beginner, intermediate, advanced)
   - Set harmonic style preferences (classical, romantic, jazz-influenced)
   - Adjust generation parameters (note density, rhythmic complexity)

3. **Generation Phase**
   - AI generates harmonized parts for selected instruments
   - Real-time preview with ability to isolate individual parts
   - Visual notation display showing all parts simultaneously

4. **Refinement Phase**
   - Edit specific measures or passages
   - Regenerate individual parts while keeping others
   - Transpose parts for different instruments if needed

5. **Export Phase**
   - Download separate MusicXML files for each instrument
   - Export combined PDF score for conductor
   - Generate MIDI files for digital rehearsal

### Secondary Journey: Quick Jam Session Setup

1. **Rapid Input**: Hum or play melody directly into microphone
2. **Instant Generation**: One-click generation with smart defaults
3. **Immediate Playback**: Audio preview of full ensemble arrangement
4. **Simple Export**: Download chord charts or simple notation

---

## Key Screens & Interactions

### 1. Landing/Upload Screen
```
┌─────────────────────────────────────────┐
│ 🎵 Chamber Music AI Harmonizer          │
├─────────────────────────────────────────┤
│                                         │
│  [📁 Upload MIDI] [🎤 Record Audio]     │
│  [📄 Upload Sheet Music (PDF/Image)]    │
│                                         │
│  Or try with sample: [🎼 "Up" Theme]    │
│                                         │
└─────────────────────────────────────────┘
```

### 2. Configuration Panel
```
┌─────────────────────────────────────────┐
│ Configuration                           │
├─────────────────────────────────────────┤
│ Instruments: ☑️Viola ☑️Cello ☑️2nd Violin│
│                                         │
│ Difficulty:  ●Beginner ○Intermediate ○Advanced│
│                                         │
│ Style: [Classical ▼]                    │
│                                         │
│ Advanced:                               │
│ Note Density:    [████░░] 4/6           │
│ Rhythm Complexity: [██░░░░] 2/6         │
│                                         │
│          [Generate Parts]               │
└─────────────────────────────────────────┘
```

### 3. Generation & Preview Interface
```
┌─────────────────────────────────────────────────────┐
│ Generated Arrangement - "Up" Theme (8 bars)         │
├─────────────────────────────────────────────────────┤
│ [▶️ Play All] [⏸️ Pause] [🔄 Regenerate]           │
│                                                     │
│ Individual Parts:                                   │
│ Violin I  (Original): [▶️] [🔇] [✏️ Edit]         │
│ Violin II (Generated): [▶️] [🔇] [✏️ Edit] [🔄]    │
│ Viola    (Generated): [▶️] [🔇] [✏️ Edit] [🔄]     │
│ Cello    (Generated): [▶️] [🔇] [✏️ Edit] [🔄]     │
│                                                     │
│ ┌─ Musical Notation Display ────────────────────┐   │
│ │ [Visual staff notation for all 4 parts]       │   │
│ │                                                │   │
│ └──────────────────────────────────────────────┘   │
│                                                     │
│              [Export All Parts]                     │
└─────────────────────────────────────────────────────┘
```

### 4. Export Options Screen
```
┌─────────────────────────────────────────┐
│ Export Generated Parts                  │
├─────────────────────────────────────────┤
│ Format:                                 │
│ ☑️ Individual MusicXML files            │
│ ☑️ Combined PDF score                   │
│ ☑️ MIDI files for each part             │
│ ☐ Audio stems (WAV)                     │
│                                         │
│ Individual Parts:                       │
│ ☑️ Violin II  [Download]                │
│ ☑️ Viola      [Download]                │
│ ☑️ Cello      [Download]                │
│                                         │
│ [📧 Email All Parts] [💾 Download ZIP]   │
└─────────────────────────────────────────┘
```

---

## Technical Architecture Overview

### Input Processing Pipeline
1. **Multi-format Input Handler**
   - MIDI parser for symbolic input
   - Audio-to-MIDI transcription (using existing libraries)
   - OCR for sheet music images (integration with OMR systems)

2. **Melody Analysis Engine**  
   - Key detection and harmonic analysis
   - Phrase structure identification
   - Rhythm pattern extraction

### Generation Engine
3. **AI Harmonization Core**
   - Transformer-based multi-track generation (inspired by MMM)
   - Controllable generation parameters
   - Chamber music-specific training data

4. **Post-processing & Refinement**
   - Voice leading optimization
   - Playability validation for each instrument
   - Style consistency checking

### Output Generation
5. **Multi-format Export System**
   - MusicXML generation for notation software compatibility
   - PDF rendering using music notation libraries  
   - MIDI export for digital audio workstations

---

## Unique Features & Differentiators

### 1. Chamber Music Specialization
- **Instrument-specific constraints**: Respects playing ranges and techniques for strings
- **Ensemble balance**: Ensures no single part dominates inappropriately
- **Traditional voice leading**: Follows classical harmony rules while allowing modern flexibility

### 2. Adjustable Difficulty System
- **Technical complexity scaling**: Beginner parts use simpler rhythms and positions
- **Note density control**: Advanced parts can include more ornamental figures
- **Playability validation**: Checks fingering feasibility and bow technique requirements

### 3. Iterative Refinement Workflow
- **Part-specific regeneration**: Regenerate viola part while keeping cello unchanged
- **Measure-level editing**: Modify specific passages without affecting entire arrangement
- **Real-time preview**: Immediate audio feedback for all changes

### 4. Professional Integration Ready
- **MusicXML standard compliance**: Works with Finale, Sibelius, MuseScore
- **Metadata preservation**: Maintains tempo markings, key signatures, time signatures
- **Print-ready output**: Professional formatting for performance use

---

## Success Metrics

### User Experience Metrics
- **Time to first export**: < 3 minutes from upload to downloadable parts
- **User satisfaction**: > 4.0/5.0 rating on generated part quality
- **Completion rate**: > 80% of users complete full generation → export workflow

### Technical Quality Metrics  
- **Harmonic correctness**: < 5% parallel fifths/octaves in generated parts
- **Playability score**: > 85% of generated passages rated as "playable" by musicians
- **Style consistency**: Generated parts match input melody style in > 90% of cases

### Adoption Metrics
- **Return usage**: > 50% of users generate multiple arrangements
- **File format adoption**: > 70% of users download MusicXML (not just MIDI/PDF)
- **Sharing behavior**: > 30% of users share generated parts with ensemble members

---

## Risk Mitigation Strategies

### Technical Risks
- **Generation quality inconsistency**: Implement multiple model checkpoints and ensemble voting
- **Input format compatibility**: Provide clear format requirements and conversion tools
- **Processing time concerns**: Offer both quick (lower quality) and detailed (higher quality) generation modes

### User Experience Risks  
- **Steep learning curve**: Include interactive tutorial and preset configurations
- **Output format confusion**: Provide clear explanations of each export format
- **Limited customization**: Implement progressive disclosure - simple defaults with advanced options available

### Business/Adoption Risks
- **Competition from established tools**: Focus on chamber music niche and notation output quality
- **Copyright concerns**: Use only ethically sourced training data and implement HARMONYCLOAK techniques
- **Platform dependency**: Ensure cross-platform compatibility and offline functionality