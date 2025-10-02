## Prompting Protocol for AI Music Tool Validation (Joanna and Dulf)

### **Project Goal**

To validate the necessity of a structured, controllable, MusicXML-outputting AI assistant by demonstrating where existing tools fail to meet the needs of chamber music ensembles.

### **Input Materials (Final Specification)**

| File | Description | Bar Count | Use Case |
| :--- | :--- | :--- | :--- |
| **Melody X (Simple.midi/audio)** | "Married Life" (Up Theme) excerpt. Clean, single-line melody. | **8 Bars** | Used for **Controllability** and **Generative Failure** (short-form testing). |
| **Melody Y (Complex.midi/audio)** | "Married Life" (Up Theme) excerpt continued melody. | **19 Bars** | Used for **Complexity** and **Robustness** (testing structural integrity/length). |

---

## Unified Validation Scenarios (Klangio, Remusic, Suno AI, ElevenLabs)

The core test is whether the tool can take a solo piano input and use the prompt to **compose new parts** for a trio, and if the output is **usable symbolic data**.

| Scenario | Core Objective (The Test) | Input Strategy & Fixed Prompt | Expected Failure (Gap Validation) |
| :--- | :--- | :--- | :--- |
| **S1: Typical Case (Generative)** | **Test Core Generative/Compositional Ability.** (Using the short, clean Melody X) | **Input:** Melody X (8-Bar Simple) - Uploaded/Referenced. **Prompt:** "Please generate a new viola and cello part to harmonize with this melody. The output must be a trio arrangement." |  |
| **S2: Edge Case (Difficulty Control)** | **Test Fine-Grained Controllability.** (Difficulty constraint on the short piece) | **Input:** Melody X (8-Bar Simple) - Uploaded/Referenced. **Prompt:** (S1 Prompt) **+** *Constraint:* "...The generated parts must be simple enough for a **beginner ensemble** to play." |  |
| **S3: Edge Case (Instrumentation)** | **Test Structural Interpretation/Exclusion.** (Specific ensemble constraint on the long piece) | **Input:** Melody Y (19-Bar Complex) - Uploaded/Referenced. **Prompt:** (S1 Prompt) **+** *Constraint:* "...Ensure the final arrangement is for only **Piano, Viola, and Cello**." |  |
| **S4: Failure Case (Complexity & Robustness)** | **Test System Limits.** (Complex input, contradictory control, and long length) | **Input:** Melody Y (19-Bar Complex) - Uploaded/Referenced. **Prompt:** "Generate a four-part accompaniment that is **both extremely fast and uses only whole notes**." |  |

---

### **Analyst Delegation**

* **Dulf Vincent Genis:** Klangio and Remusic
* **Joanna George:** Suno AI and ElevenLabs