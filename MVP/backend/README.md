# 🎶 Backend — Technical Architecture & Deep Dive

This document serves as the comprehensive overview of the Harmonizer backend, which hosts both the user interface and the core harmony-generation API.

**Live Deployable Link:** The UI is live at: **[https://v0-harmonizer.vercel.app/](https://v0-harmonizer.vercel.app/)**

## 💻 Technology Stack & API Details

| Category | Details |
| :--- | :--- |
| **Framework** | Next.js 16 (App Router) |
| **Libraries** | React 19, TypeScript, **Music Theory Logic** (Embedded), **XML Parsers** (`jsdom`, `@xmldom/xmldom`) |
| **Styling** | Tailwind CSS, Shadcn UI, Radix primitives |
| **Package Manager** | pnpm |

### Core API: `/api/harmonize`

The backend's core is a single serverless API endpoint:

| Feature | Description |
| :--- | :--- |
| **API Endpoint** | `POST /api/harmonize` |
| **Request Format** | `multipart/form-data` (Handles file uploads) |
| **Required Inputs** | **`file`** (MusicXML content) and **`instruments`** (comma-separated list, e.g., `Violin,Cello`) |
| **Core Logic** | Server-side MusicXML parsing, key detection, chord selection, four-part voicing, voice-leading rules, and instrument transposition. |
| **Output** | JSON object with two downloadable MusicXML strings: **`harmonyOnly`** and **`combined`**. |

-----

## 🧠 Core Functionality: The Rules-Based Engine

The Harmonizer's logic is built entirely on a three-stage, rule-based engine that simulates classical music composition principles, primarily focusing on Baroque and Classical-era four-part (SATB) harmony.

### I. Input Processing & Context Initialization

1.  **Parsing:** The MusicXML file is read, and either `jsdom` or `@xmldom/xmldom` converts the XML string into a navigable DOM object.
2.  **Key Detection:** Key metadata (`<fifths>` and `<mode>`) is extracted to determine the musical key's root pitch and scale (Major or Minor).
3.  **Note Extraction:** XML note data is converted into a simplified array of `Note` objects (MIDI pitch, duration, offset). The engine handles two modes:
      * **Monophonic:** Extracts a single melodic line (treated as the soprano).
      * **Polyphonic:** Extracts multiple parts/voices from the input to respect existing vertical harmony before adding new parts.

### II. Harmonic Progression & Voicing

This is the composition stage where chords are generated and voiced for each melodic time slice.

| Step | Functionality | Key Rules Applied |
| :--- | :--- | :--- |
| **Chord Selection** | Based on the current melody note and the established key, the algorithm selects a stable chord (I, IV, V, vi, etc.) where the melody note is a chord tone (root, 3rd, or 5th). Strong beats and phrase endings prioritize tonic (I) or dominant (V) function for structural cadence. | **Tonal Stability, Functional Harmony** |
| **Voice Leading** | The chosen chord is assigned pitches for Soprano (Melody), Alto, Tenor, and Bass (SATB). The `voiceChord` function ensures that the inner voices (Alto/Tenor) move the minimum possible distance from the previous chord's voices, which promotes a smooth sound. | **Common Tone Retention, Smallest Voice Movement** |
| **Refinement** | The `avoidParallelMotion` function checks for consecutive perfect fifths or octaves between any two voices (a major error in classical voice leading) and attempts to resolve them by changing one voice's octave or pitch. | **Classical Voice Leading Rules (Parallel Motion)** |

### III. Instrument Generation & Output

1.  **Part Assignment:** The user-selected instruments are mapped to the generated inner voices (Alto, Tenor, Bass).
2.  **Instrument Constraints:** The `generateInstrumentPart` function applies the rules from **`INSTRUMENT_CONFIG`**:
      * **Range Constraint:** Pitches are adjusted (transposed up or down an octave) to fit within the instrument's realistic performance range (`minMidi` and `maxMidi`).
      * **Transposition:** Pitches are transposed for instruments like the B-flat Clarinet (`transposition: 2`) so the written music reflects the correct playable score.
3.  **XML Rendering:** The final set of generated notes is combined with the original MusicXML metadata (key, time signature) and rendered as two separate MusicXML files for output.

-----

## ⚖️ Architectural Rationale: Rule-Based vs. Machine Learning

The Harmonizer utilizes a **rule-based, algorithmic approach** rather than a data-hungry Machine Learning (ML) model (e.g., neural networks trained on a large musical corpus). This choice is crucial and deliberate:

  * **Guaranteed Correctness:** The primary goal is to produce **grammatically correct** harmony (i.e., music that strictly adheres to established theory). A rule-based system explicitly enforces hard constraints (e.g., "always avoid parallel fifths," "always resolve the leading tone"), which ML models struggle to learn and consistently apply without vast, perfectly annotated data.
  * **Lightweight & Cost-Effective:** The logic is fast, requires minimal memory, and is perfectly suited for a serverless Next.js environment (Vercel). ML inference is computationally expensive and resource-intensive by comparison.
  * **Predictability and Auditability:** The output is fully predictable based on the input and the fixed set of rules, making development, debugging, and musical refinement significantly easier than analyzing a black-box ML model's decisions.

-----

## 📂 Project Structure (Trimmed)

The structure reflects a standard Next.js App Router project rooted in the `backend/` directory.

```
backend/
├── app/ # Next.js app-router pages & API
│ ├── page.tsx # Main Harmonizer UI (client component)
│ └── api/
│ └── harmonize/
│ └── route.ts # POST handler: MusicXML parsing & harmonization logic
├── components/ # Shared React components & UI primitives
├── hooks/
├── lib/
│ └── utils.ts # shared helpers
├── public/ # static assets
├── styles/
└── package.json
```

## 🚀 Development & Maintenance Notes

### Quick Local Run

To get the Harmonizer backend running locally:

1.  Navigate to the backend directory:
    ```bash
    cd backend
    ```
2.  Install dependencies:
    ```bash
    pnpm install
    ```
3.  Start the development server:
    ```bash
    pnpm run dev
    ```
    > The development server will default to: **`http://localhost:3000`**

### Technical & Runtime Notes

  * **XML Parsing:** The use of `jsdom` (a server-side implementation of browser DOM APIs) allows code to use familiar browser methods like `querySelector` on the parsed MusicXML document.
  * **Dependency Cleanup:** The legacy `xmldom` dependency is noted as redundant and should be removed.
  * **Typing:** The `Chord.quality` union in the types needs to be updated to include the `"augmented"` quality used in some minor-key contexts, ensuring type safety.

### Potential Next Improvements

  * **Integration Testing:** Implement a small test that POSTs a sample MusicXML file to `/api/harmonize` and asserts the expected JSON response shape and `200` status.
  * **Musical Sophistication:** Add support for secondary chords, particularly the dominant seventh (V7), including its complex voice-leading resolution rules.