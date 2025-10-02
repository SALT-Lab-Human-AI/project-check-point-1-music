## Prompting Protocol for AI Music Tool Validation

### **Project Goal**

To validate the necessity of a structured, controllable, MusicXML-outputting AI assistant by systematically demonstrating where existing tools fail to meet the needs of chamber music ensembles across four critical testing areas.

### **Input Materials (Pre-Prepared)**

| File | Description | Use Case |
| :--- | :--- | :--- |
| **Melody X (Simple.midi/audio)** | 8-bar excerpt of "Married Life" (Up Theme). Clean, single-line melody. | Used for **Controllability** and **Generative Failure** tests. |
| **Melody Y (Complex.midi/audio)** | A more rhythmically complex 8-bar excerpt, potentially including tempo changes or complex rhythmic figures. | Used for **Complexity** and **Robustness** tests. |

---

## Unified Validation Scenarios (Klangio, Remusic, Suno AI, ElevenLabs)

The core test is whether the tool can take a solo violin input and use the prompt to **compose new parts** for a string trio, and if the output is **usable symbolic data**.

| Scenario | Core Objective (The Test) | Input Strategy & Fixed Prompt | Expected Failure (Gap Validation) |
| :--- | :--- | :--- | :--- |
| **S1: Typical Case (Generative)** | **Test Core Generative/Compositional Ability.** (Minimal interference) | **Input:** Melody X (Simple) - Uploaded/Referenced. **Prompt:** "Please generate a new viola and cello part to harmonize with this violin melody. The output must be a string trio arrangement." | **Trans. Tools (Klangio/Remusic):** Fails Generative Test. Outputs transcription of the input melody ONLY. **Audio Tools (Suno/ElevenLabs):** Fails Output Test. Output is **audio-only**, requiring manual transcription. |
| **S2: Edge Case (Difficulty Control)** | **Test Fine-Grained Controllability.** (Difficulty constraint) | **Input:** Melody X (Simple) - Uploaded/Referenced. **Prompt:** (S1 Prompt) **+** *Constraint:* "...The generated parts must be simple enough for a **beginner ensemble** to play." | **All Tools:** Fails Controllability Test. Ignores the "beginner" constraint and generates music that is too rhythmically or harmonically complex. |
| **S3: Edge Case (Instrumentation)** | **Test Structural Interpretation/Exclusion.** (Specific ensemble constraint) | **Input:** Melody X (Simple) - Uploaded/Referenced. **Prompt:** (S1 Prompt) **+** *Constraint:* "...Ensure the final arrangement is for only **Viola, Cello, and Second Violin**." | **All Tools:** Fails Structural Test. Ignores the specific instrument requirement, defaulting to a standard quartet or using generic/inappropriate sounds. |
| **S4: Failure Case (Complexity & Robustness)** | **Test System Limits.** (Complex input, contradictory control) | **Input:** Melody Y (Complex) - Uploaded/Referenced. **Prompt:** "Generate a four-part string quartet accompaniment that is **both extremely fast and uses only whole notes**." | **Trans. Tools (Klangio/Remusic):** Fails Quality Test. Output contains transcription errors on complex rhythms (Melody Y). **Audio Tools (Suno/ElevenLabs):** Fails Robustness Test. Output is musically nonsensical or results in an immediate content filter/error. |

---

### **Analyst Delegation**

* **Dulf Vincent Genis:** Klangio and Remusic
* **Joanna George:** Suno AI and ElevenLabs