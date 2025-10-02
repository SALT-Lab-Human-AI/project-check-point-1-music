This protocol is structured to validate the core gaps of your project: **Controllability, Output Flexibility (Symbolic vs. Audio), and Generative Capacity.**

-----

## Prompting Protocol for AI Music Tool Validation

### **Project Goal**

To validate the necessity of a structured, controllable, MusicXML-outputting AI assistant by systematically demonstrating where existing state-of-the-art tools fail to meet the needs of chamber music ensembles.

### **Input Materials (Pre-Prepared)**

  * **Melody X (Simple.midi):** An 8-bar, 4/4 solo melody in C Major, quarter notes. (Used for typical, simple control, and generative failure tests.)
  * **Melody Y (Complex.midi):** An 8-bar, 4/4 melody including a few **sparse double stops** and **triplets**. (Used for complexity/robustness tests.)

-----

## **Part 1: Symbolic Output Tools (Klangio & Remusic)**

**Focus:** — Testing Transcription Accuracy, Symbolic Output Fidelity, and **Generative Failure** (i.e., proving they only transcribe, not compose).

| Scenario | Input Type & File | Prompt Text (If Applicable) | Target Gap(s) | Expected Outcome & Rationale |
| :--- | :--- | :--- | :--- | :--- |
| **S1: Typical Case (Transcription)** | Melody X (Simple.midi) - Uploaded | *(None needed)* | **Quality/Fidelity Gap** | **Expected:** Accurate transcription to sheet music/MusicXML. **Goal:** Verify baseline functionality and note any quantization/rhythmic errors. |
| **S2: Edge Case (Complexity)** | Melody Y (Complex.midi) - Uploaded | *(None needed)* | **Usability Gap** | **Expected:** Errors in transcribing polyphony (double stops) or complex rhythms (triplets). **Goal:** Document quality degradation with slightly complex music. |
| **S3: Failure Case (The Generative Wall)** | Melody X (Simple.midi) - Uploaded | "Please **generate** a new viola and cello part to harmonize with this violin melody. The output must be a **string trio arrangement**." | **Generative Gap (CRITICAL)** | **Expected:** Tool refuses the prompt, ignores the request, or simply transcribes the original melody without generating new material. **Goal:** Prove the tool's core limitation to *compose*. |
| **S4: Edge Case (Output Fidelity)** | Output from S1 - Exported | *(Export MusicXML)* | **Output Gap** | **Expected:** MusicXML or MIDI output will contain generic track names (e.g., "Track 1," "Piano") and may fail to import cleanly into professional notation software. **Goal:** Document lack of ensemble-ready metadata. |

-----

## **Part 2: Generative/Audio Tools (Suno AI & ElevenLabs)**

**Focus:** — Testing Limited Control, Stylistic Compliance, and **Audio-Only Output**.

| Scenario | Input Type & Prompt | Target Gap(s) | Expected Outcome & Rationale |
| :--- | :--- | :--- | :--- |
| **S1: Typical Case** | "An 8-bar, 4/4 melody played by a **solo violin**. Create a simple, classic **string quartet accompaniment** in C major." | **Output Gap** | **Expected:** Audio output with a generic classical feel. **Goal:** Document the requirement for manual transcription, validating the need for MusicXML output. |
| **S2: Edge Case (Difficulty)** | "A solo violin plays an 8-bar melody. Compose a four-part string arrangement that is **simple enough for a beginner ensemble to play.**" | **Controllability Gap** | **Expected:** The AI ignores the "beginner" constraint and generates music with fast rhythms, complex harmonies, or wide ranges. **Goal:** Prove the inability to enforce expressive constraints like difficulty. |
| **S3: Edge Case (Instrumentation)** | "An arrangement of a solo melody using ONLY **viola, cello, and second violin**." | **Interpretability Gap** | **Expected:** The AI will likely ignore the explicit exclusion, generating an arrangement for a standard string quartet or using non-string sounds. **Goal:** Show failure to handle specific, non-standard ensemble demands. |
| **S4: Failure Case** | "Generate a quartet accompaniment for a very fast melody using only half notes. The style must be both Baroque and Jazz." | **Robustness Gap** | **Expected:** Tool generates a chaotic mess, a content safety error, or defaults to a single, confused style. **Goal:** Document failure when presented with contradictory or complex compositional instructions. |