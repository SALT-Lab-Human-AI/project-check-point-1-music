# Project Proposal – Checkpoint 1

## Problem Statement & Why It Matters

Chamber music ensembles often face a significant hurdle when wanting to perform pieces that only exist for a single melodic instrument (e.g., a solo violin part), lacking complementary parts for the rest of the ensemble (e.g., cello, viola, second violin). This limitation restricts repertoire choices for groups, prevents musicians of varying skill levels or instruments from participating in jam sessions due to a lack of chords or sheet music, and poses a barrier for beginners seeking to play desired pieces for which arrangements or chords are unavailable. Paired with a lack of a robust and user-friendly interface, we seek to leverage AI that can creatively generate harmonies and music sheets for other instruments so musicians across different disciplines can collaborate and play.

---

## Your Proposed Approach and Why It Will Improve on Prior Art

This project proposes building an AI-powered assistant tailored specifically for chamber music ensembles, capable of analyzing a single melodic line, such as a solo violin part, and generating musically sound, harmonized parts for complementary instruments including viola, cello, and second violin.

### Key improvements over prior work include:

#### Structured, interpretable generative models
Inspired by research like Google’s Chamber Ensemble Generator (CEG), our approach will use transformer-based architectures combined with modular structured models to generate coherent, expressive multi-instrument scores. Unlike many black-box models, structured generative systems allow interpretability and controllability, ensuring realistic harmonization and facilitating debugging and refinement.

#### Fine-grained user controls
Our tool will provide adjustable parameters such as instrument selection, difficulty level, note density, polyphony, and stylistic nuances. This contrasts with many existing “1-parameter” AI music tools whose limited controls produce outputs that lack expressiveness or don’t match user needs.

#### Output flexibility
The AI will export generated parts in symbolic formats compatible with notation software and DAWs (e.g., MIDI, MusicXML), supporting rehearsal and performance workflows. This enables direct use by musicians without technical barriers common to audio-only AI outputs.

#### Ethical and inclusive data use
By leveraging datasets like CocoChorales and applying copyright-safe training techniques (e.g., HARMONYCLOAK), the system will respect intellectual property boundaries while ensuring stylistic variety and inclusivity.

These innovations address core limitations of prior methods by enhancing expressiveness, controllability, practical integration, and ethical compliance, making the tool truly useful for chamber ensembles across skill levels.

---

## Plan for Checkpoint 2 Validation via Prompting

To validate the proposed concept and deepen understanding of gaps in existing AI music tools, a systematic prompt-based evaluation will be conducted using ≥3 state-of-the-art platforms, potentially including Google Magenta Studio, Suno AI, and AIVA.

### Key validation steps:

#### Scenario design
Develop prompt scenarios representing typical (standard melody harmonization), edge (complex or sparse melodies, unusual instrument combos), and failure cases (incomplete inputs, contradictory parameters) to comprehensively test tool robustness and usability.

#### Structured prompting
Issue carefully crafted prompts requesting multi-instrument part generation with control parameters (e.g., difficulty, instrumentation). Record tool responses, output formats, generation time, and user interface interactions.

#### Data collection
Collect sanitized transcripts, MIDI/audio outputs, error messages, and metadata organized by tool and scenario in a `/validation/` folder.

#### Quantitative and qualitative analysis
Assess accuracy of harmonization, output reliability, latency, ease of use, output export options, and platform-related issues like cost or content safety filters.

#### Gap identification
Summarize where existing tools fail to meet chamber ensemble needs regarding control granularity, expressiveness, output usability, or ethical safeguards.

#### Opportunity framing
Detail precise product requirements that address identified gaps, guiding technical development and user experience design.

#### Concept refinement
Create a design specification (`DESIGN_SPEC.md`) detailing user journeys, interactions, and control schemas based on validation insights. Develop a lightweight interactive prototype (e.g., Figma or HTML slides) for stakeholder demonstration and feedback.

#### Feedback synthesis
Incorporate peer/expert heuristic review to capture constructive critique and iterate the concept in preparation for the working prototype phase at Checkpoint 3.

This structured prompting validation ensures the project’s design is evidence-based, user-driven, and targeted to fill unmet needs in AI-assisted chamber music creation.

---

## Methods – Responsible AI Use Statement

I used Perplexity Browser Assistant recent model (Perplexity Sonar) on September 18, 2025 to synthesize and paraphrase information to generate a proposal for our project idea. This includes summarizing the problem statement, features, and tools. All AI generated content was critically reviewed and edited for quality assurance by a human author. 

### Exact Prompts Used

Here are the exact prompts I used:

1.  
> For checkpoint one help me write problem and importance and prior systems and gaps (cited). Look at this github repo for context: [https://github.com/SALT-Lab-Human-AI/project-check-point-1-music](https://github.com/SALT-Lab-Human-AI/project-check-point-1-music)

2.  
> Paraphrase it for simpler language

3.  
> For other tools, break it down by tool do not group it all together, only choose two tools

4.  
> Include Suno as well

5.  
> Now show me update proposal

6.  
> Read these guidelines and follow them:  
‼️Responsible Use and Disclosure of AI Tools in Academic Writing ... [summarized content] ... Transparency and accountability are non-negotiable. Disclose, label, and take full responsibility for all AI use in your work ... References: (list of reference links)

7.  
> format it in md

8.  
> Remove figure 1

9.  
> Read this and cite accordingly: [https://libguides.mit.edu/cite-AI-tools](https://libguides.mit.edu/cite-AI-tools)

10.  
> Include exact prompts that were used

---

## Acknowledgments

This proposal was created with the assistance of Perplexity Browser Assistant (September 2025). All content was reviewed and approved by a human author, who is solely responsible for its accuracy and academic integrity.

---

## References

- MIT Libraries. (2024). "Home - Citing AI tools - LibGuides at MIT Libraries." Retrieved from https://libguides.mit.edu/cite-AI-tools
- Perplexity Browser Assistant. (September 2025). [Software]. Used for writing assistance and background synthesis in this report.

## References that Perplexity used

- https://www.metacreation.net/projects/mmm-multi-track-music-machine "MMM: Multi-Track Music Machine — METACREATION, 2025"
- https://arxiv.org/abs/2008.06048 "Dong, Hao-Wen et al. (2020). MMM: Exploring Conditional Multi-Track Music Generation with the Transformer."
- https://arxiv.org/html/2504.14071v1 "Evaluating Human-AI Interaction via Usability, User Experience and Acceptance Measures for MMM-C, 2024"
- https://www.ableton.com/fr/blog/magenta-studio-free-ai-tools-ableton-live/ "Magenta Studio: Free AI tools for Ableton Live, 2016"
- https://aimusic.so/blog-unleashing-the-power-of-music-ai-a-headtohead-comparison-of-magenta-studio-and-pilot-plugins-43088 "A Head-to-Head Comparison of Magenta Studio and Pilot Plugins, 2024"
- https://www.rareformaudio.com/blog/suno-ai-ceo-comments-backlash "Suno AI CEO Sparks Controversy with Comments on Music Creation, 2025"
- https://alliedglobalmarketing.com/knowledge/pages/the-dilemma-of-aigenerated-music "The Dilemma of AI-Generated Music - Allied Global Marketing, 2024"
