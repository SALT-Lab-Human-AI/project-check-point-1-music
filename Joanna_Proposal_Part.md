# Your Proposed Approach and Why It Will Improve on Prior Art

This project proposes building an AI-powered assistant tailored specifically for chamber music ensembles, capable of analyzing a single melodic line, such as a solo violin part, and generating musically sound, harmonized parts for complementary instruments including viola, cello, and second violin.

## Key improvements over prior work include:

### Structured, interpretable generative models
Inspired by research like Google’s Chamber Ensemble Generator (CEG), our approach will use transformer-based architectures combined with modular structured models to generate coherent, expressive multi-instrument scores. Unlike many black-box models, structured generative systems allow interpretability and controllability, ensuring realistic harmonization and facilitating debugging and refinement.

### Fine-grained user controls
Our tool will provide adjustable parameters such as instrument selection, difficulty level, note density, polyphony, and stylistic nuances. This contrasts with many existing “1-parameter” AI music tools whose limited controls produce outputs that lack expressiveness or don’t match user needs.

### Output flexibility
The AI will export generated parts in symbolic formats compatible with notation software and DAWs (e.g., MIDI, MusicXML), supporting rehearsal and performance workflows. This enables direct use by musicians without technical barriers common to audio-only AI outputs.

### Ethical and inclusive data use
By leveraging datasets like CocoChorales and applying copyright-safe training techniques (e.g., HARMONYCLOAK), the system will respect intellectual property boundaries while ensuring stylistic variety and inclusivity.

These innovations address core limitations of prior methods by enhancing expressiveness, controllability, practical integration, and ethical compliance, making the tool truly useful for chamber ensembles across skill levels.

---

# Plan for Checkpoint 2 Validation via Prompting

To validate the proposed concept and deepen understanding of gaps in existing AI music tools, a systematic prompt-based evaluation will be conducted using ≥3 state-of-the-art platforms, potentially including Google Magenta Studio, Suno AI, and AIVA.

## Key validation steps:

### Scenario design
Develop prompt scenarios representing typical (standard melody harmonization), edge (complex or sparse melodies, unusual instrument combos), and failure cases (incomplete inputs, contradictory parameters) to comprehensively test tool robustness and usability.

### Structured prompting
Issue carefully crafted prompts requesting multi-instrument part generation with control parameters (e.g., difficulty, instrumentation). Record tool responses, output formats, generation time, and user interface interactions.

### Data collection
Collect sanitized transcripts, MIDI/audio outputs, error messages, and metadata organized by tool and scenario in a `/validation/` folder.

### Quantitative and qualitative analysis
Assess accuracy of harmonization, output reliability, latency, ease of use, output export options, and platform-related issues like cost or content safety filters.

### Gap identification
Summarize where existing tools fail to meet chamber ensemble needs regarding control granularity, expressiveness, output usability, or ethical safeguards.

### Opportunity framing
Detail precise product requirements that address identified gaps, guiding technical development and user experience design.

### Concept refinement
Create a design specification (`DESIGN_SPEC.md`) detailing user journeys, interactions, and control schemas based on validation insights. Develop a lightweight interactive prototype (e.g., Figma or HTML slides) for stakeholder demonstration and feedback.

### Feedback synthesis
Incorporate peer/expert heuristic review to capture constructive critique and iterate the concept in preparation for the working prototype phase at Checkpoint 3.

This structured prompting validation ensures the project’s design is evidence-based, user-driven, and targeted to fill unmet needs in AI-assisted chamber music creation.

---

# Methods – Responsible AI Use Statement

I used the Perplexity Browser Assistant recent model (Perplexity Sonar) on September 18, 2025 to synthesize and paraphrase information to generate a proposal for our project idea. This includes summarizing the problem statement, features, and tools. All AI generated content was critically reviewed and edited for quality assurance by a human author.
