# Harmony Forge: A Co-Creative Approach to Algorithmic Harmonization for String Ensembles

**Team Members:**
- Dulf Vincent Genis
- Shivam Patel
- Misha Gandhi
- Joanna George

*IS 492 Capstone Project*

---

## Quick Links

- 🔗 **Live Application**: [https://chamber-music-fullstack-deploy.vercel.app/](https://chamber-music-fullstack-deploy.vercel.app/)
- 📄 **Final Report**: [docs/FINAL_REPORT.md](docs/FINAL_REPORT.md)
- 📚 **Documentation**: [chamber-music-fullstack-full/docs/](chamber-music-fullstack-full/docs/)
- 🚀 **Installation Guide**: [chamber-music-fullstack-full/INSTALL.md](chamber-music-fullstack-full/INSTALL.md)

---

## Table of Contents

- [Project Overview](#project-overview)
- [Problem Statement & Why It Matters](#problem-statement--why-it-matters)
- [Target Users & Core Tasks](#target-users--core-tasks)
- [Competitive Landscape](#competitive-landscape-existing-systemstools-and-their-shortcomings)
- [Solution: Harmony Forge](#solution-harmony-forge)
- [Project Milestones](#project-milestones)
- [Team Roles](#team-roles)
- [Repository Structure](#repository-structure)
- [Documentation](#documentation)

---

## Project Overview

Harmony Forge is a web-based application that democratizes music arranging for string chamber ensembles. The system uses a rule-based algorithmic harmonization engine grounded in classical music theory to generate complementary parts (cello, viola, 2nd violin) for a given melody. Unlike "black box" generative AI models, Harmony Forge prioritizes a co-creative workflow, offering deterministic, rule-based outputs that users can edit and refine.

**Key Features:**
- Deterministic, interpretable harmonization based on classical music theory
- Support for 13 instruments across strings, woodwinds, brass, and voices
- MusicXML output compatible with standard notation software
- Web-based interface with drag-and-drop file upload
- Real-time processing and score visualization

For detailed technical documentation, see [chamber-music-fullstack-full/README.md](chamber-music-fullstack-full/README.md).

---

## Problem Statement & Why It Matters


### Problem Statement

Chamber music ensembles often face a significant hurdle when wanting to perform pieces that only exist for a single melodic instrument (e.g., a solo violin part), lacking complementary parts for the rest of the ensemble (e.g., cello, viola, second violin). This limitation restricts repertoire choices for groups, prevents musicians of varying skill levels or instruments from participating in jam sessions due to a lack of chords or sheet music, and poses a barrier for beginners seeking to play desired pieces for which arrangements or chords are unavailable.
<img width="1024" height="1024" alt="Gemini_Generated_Image_xbk97xxbk97xxbk9" src="https://github.com/user-attachments/assets/06911d19-0062-4ba2-b785-850e59413167" />


### Why It Matters

This problem directly impacts musical accessibility, creativity, and collaboration:

- **Fosters Participation and Inclusivity:** The absence of readily available parts for different instruments or skill levels excludes musicians from engaging with music they love. An AI tool can lower barriers to entry for novice users, enabling individuals without formal training to engage in music production and express creativity, thereby fostering participation in group music-making.
- **Expands Repertoire and Creative Exploration:** For established groups, it unlocks a vast repertoire previously inaccessible, allowing for diverse musical exploration. AI can serve as a powerful springboard for inspiration and accelerate the ideation process, helping users overcome "writer's block".
- **Supports Skill Development:** For beginners, it provides structured musical content at adjustable difficulty levels, which is crucial for skill growth and sustained motivation.
- **Enhances Efficiency for Composers/Arrangers:** Automating the generation of complementary parts can save significant time and effort for musicians who currently need to manually arrange pieces.

---

## Target Users & Core Tasks

### Target Users

- **String Chamber Groups and Ensembles:** Groups desiring to perform pieces that currently only have single melodic lines, and needing realistic, musically sound parts for instruments like cello, viola, and a second violin.
- **Amateur Musicians and Jam Session Enthusiasts:** Individuals who want to play together but lack the ability to improvise or arrange on the fly, benefiting from readily available chords and sheet music.
- **Beginner Musicians:** Those who struggle to find appropriate sheet music or chords for pieces they wish to play, and could benefit from adjustable difficulty levels for generated music.
- **Expert Composers (Hobbyists and Professionals):** As a co-creative tool, it can offer valuable opportunities for exploration of novel creative ideas and help address writer's block.

### Core Tasks

- **Melodic Line Analysis:** The AI tool will need to analyze a single melodic part to understand its harmonic implications, rhythmic structure, and stylistic nuances.
- **Multi-Track Part Generation:** It must generate realistic and musically sound harmonies and parts for the rest of the ensemble, adapting to specified instrumentation (e.g., cello, viola, 2nd violin). This involves multi-track pattern generation, rhythm generation, harmonization, chord progression generation, and orchestration.
- **Output Customization and Control:** Users should be able to adjust the difficulty level of the generated music, tailor instrumentation, and potentially control other musical attributes (e.g., note density, polyphony, duration) to achieve desired musical effects.
- **Provision of Musical Scores:** The tool should output generated parts in a usable format, such as chords or sheet music, enabling musicians to play directly from the output.
- **Facilitating Improvisation:** By providing harmonic frameworks and complementary parts, it can help those who don't know how to improvise to join in.

---

## Competitive Landscape: Existing Systems/Tools and Their Shortcomings

The development of artificial intelligence (AI) systems for music generation has accelerated in recent years, offering solutions for complex compositional tasks such as creating complementary musical parts. Many AI systems aim to address the need for supplementing existing music by focusing on tasks like **polyphonic harmonization**, **polyphonic accompaniment** (homophony), and generating multi-track output.

Existing AI-based music systems and models offer capabilities that theoretically align with the need to expand solo melodic pieces into ensemble arrangements, but they exhibit several critical shortcomings that prevent effective real-world implementation by chamber groups, beginners, and for informal jam sessions:

### Existing Systems Designed for Complementary Generation

A significant portion of AI music generators works with **symbolic music** (such as scores, MIDI, or piano roll), which is generally required for generating editable sheet music or parts.

- **Harmonization and Accompaniment:** Generators exist specifically for adding complementary parts to existing melodies, a process known as harmonization. Some systems, like **DeepBach**, are capable of generating four-part Bach chorales, demonstrating skill in adhering to specific constraints and rules. Other rule-based systems, such as HARMONET, automate melody harmonization using classical rules.
- **Polyphonic and Multi-track Output:** Most existing generators analyzed are **polyphonic**, meaning they can generate multiple correlated voices. Systems categorized as **multitrack** produce output for several instruments, typically in the form of multiple MIDI or audio files. Examples include **MuseGAN**, a multi-track sequential generative adversarial network designed for symbolic music generation and accompaniment, and the **Multi-Track Music Machine (MMM)**, a transformer model capable of generating multi-track symbolic music. Tools like Google's MusicVAE are also deep generative models used for creating musical scores.

### Shortcomings in Usability and Integration

For musicians of varying skill levels and ensembles seeking solutions for repertoire limitations, existing tools present high barriers to adoption:

- **Lack of Usable User Interfaces (UI):** The vast majority of AI music generation systems are still largely designed by researchers, resulting in systems that are **difficult to use in real-world music generation scenarios** because they show little consideration for user experience (UX) and interface design. Only 12 of the analyzed papers focus on interface issues.
- **Poor Integration with Professional Workflows:** Integration into **Digital Audio Workstations (DAWs)**—the software used by most professional composers for daily work—is essential for practical use, yet only a small number of generators include this feature (e.g., Magenta MusicVAE, PIA, and NONOTO).
- **Limited Control:** For expert users, a minimal, "1-parameter" interface (such as that tested on MMM-Cubase) is **not sufficient for co-creation**, leading to demands for more flexibility and control. Participants in one study felt that the lack of adequate parameters made the generation process feel random rather than creative.

### Shortcomings in Output Format and Flexibility

The specific need of chamber music ensembles—to have editable parts for multiple players—is often unmet due to limitations in the output format provided by AI tools:

- **Fixed Audio Output (Non-Editable):** Many modern AI systems generate output as **fixed audio files** (WAV or MP3), which participants in one study described as "fixed" and **"hard to manipulate"**. These files are seen as a "finished product" that prevents users from easily adjusting individual notes or tracks (essential for creating arrangements for specific instruments/skill levels).
- **Audio Artifacts:** Raw audio generation models, such as Jukebox and Wavenet, often produce audio that contains **recognizable artifacts**, making them harder to incorporate into a professional production than modifiable MIDI files.
- **Technical Challenges in Refinement:** When outputs from multiple AI tools are used, novices encounter a **new stage focused on "collaging and refinement,"** which is time-consuming and technically demanding. This often forces users to manually fix misalignments, key differences, or awkward transitions to achieve musical standards.

### Shortcomings in Musical Consistency and Style Control

Existing tools sometimes fail to produce musically plausible or coherent content necessary for reliable repertoire expansion:

- **Inconsistent or Predictable Output:** While some transformer-based models excel at generating musical ideas, these outputs may still be prone to generating **inconsistent musical material**. Conversely, systems relying heavily on musical rules can produce results that are perceived as **overly predictable**.
- **Unintended Style Specificity:** Most AI systems produce music in a specific style, often unintentionally, merely by the selection of the training dataset. This results in systems that are often **biased towards the style of their training data**, and may struggle to generate music appropriate for a desired non-specific or niche style (like an arrangement for a unique chamber ensemble).
- **Lack of Coherence:** Existing generative models still face challenges in fully modeling the **long-term dependencies** and structural/logical requirements of music, sometimes leading to compositions that lack coherence. When systems are hindered (e.g., by protective measures), the generated music can become implausible, lacking rhythm and structure.

---

## Solution: Harmony Forge

### Core Value Proposition

Harmony Forge addresses the critical gaps identified in existing AI music tools:

1. **Structured, Symbolic Output**: Generates MusicXML files directly, enabling immediate use in notation software (Finale, Sibelius, MuseScore) without manual transcription.

2. **Deterministic & Interpretable**: Uses rule-based algorithms rather than "black box" models, ensuring users understand how harmonies are generated and can trust the output.

3. **Fine-Grained Control**: Provides instrument selection, validation, and deterministic regeneration, giving users control over the harmonization process.

4. **Co-Creative Workflow**: Acts as a supportive tool that handles the "grunt work" (transposition, basic voicing) while leaving creative decisions to the musician.

### Technical Approach

- **Rule-Based Engine**: 2,385 lines of TypeScript implementing classical music theory principles
- **SATB Voice Leading**: Proper voice leading with parallel motion avoidance
- **Harmonic Function Theory**: Tonic → Predominant → Dominant → Tonic progressions
- **Deterministic Output**: Seeded random number generator ensures reproducible results

For complete technical details, see the [Final Report](docs/FINAL_REPORT.md) and [Architecture Documentation](chamber-music-fullstack-full/docs/architecture.md).

---

## Initial Concept and Value Proposition
<img width="1024" height="1024" alt="Gemini_Generated_Image_iw8jnciw8jnciw8j" src="https://github.com/user-attachments/assets/990540e3-7049-460b-9dee-242724619057" />


### Initial Concept

An intelligent assistant AI tool designed for chamber music, capable of analyzing a single melodic line (e.g., a solo violin part) and utilizing modern AI concepts to generate realistic, musically sound, and customizable harmonic and instrumental parts for the rest of the ensemble (e.g., cello, viola, 2nd violin). Key features would include adjustable difficulty levels for the generated parts, and the output of these parts in formats suitable for performance (e.g., chords, sheet music).

### Value Proposition

The tool offers several unique advantages:

1. **Unlocks Repertoire for Ensembles:** Directly addresses the problem of limited chamber music repertoire by enabling groups to play pieces that were previously unavailable for their specific instrumentation, thereby promoting group playing and enjoyment.
2. **Inclusive Music-Making:** By generating full parts and harmonies, it empowers musicians of all skill levels, especially beginners and those who cannot improvise, to participate in jam sessions and learn new pieces. The adjustable difficulty feature ensures that the generated music is accessible and appropriate for diverse users and instruments.
3. **Creative Inspiration and Efficiency:** Serves as a powerful co-creative partner, providing a springboard for inspiration and accelerating the often time-consuming process of arranging and harmonizing, thereby overcoming creative blocks.
4. **User Control and Customization:** Unlike many "1-parameter" systems, this tool will prioritize a richer set of control parameters (e.g., instrument type, polyphony, duration, stylistic elements) to allow users to steer the AI's output precisely, ensuring the generated music aligns with their creative vision and is truly musically sound.
5. **Enhanced Human Agency:** By focusing on supporting emotional expression and providing flexible outputs that can be easily refined, the tool aims to maximize the user's sense of creative ownership and self-efficacy, ensuring the human remains in the driver's seat of the creative process.

---

## Project Milestones
<img width="1024" height="1024" alt="Gemini_Generated_Image_a7wjlca7wjlca7wj" src="https://github.com/user-attachments/assets/7e670316-1596-4afc-9dc4-7fb0c7f418ff" />


---

### Milestones

The project will progress through four distinct checkpoints, with tasks distributed among the team members.

#### Checkpoint 1: Kickoff & Proposal

**Goal:** Define the project's core, establish the technical and conceptual framework, and identify initial risks.

**Tasks:**

- **GitHub Setup:** Software Engineer sets up the GitHub repository, establishing initial project structure and version control.
- **Problem Statement & Initial Concept:** Project Lead refines the problem statement and initial concept for the `README.md`.
- **Literature Review (8+ papers):**
    - Project Lead focuses on human-AI co-creation, usability, UX, and acceptance measures for music AI systems, e.g., MMM-C.
    - ML Engineer researches state-of-the-art multi-track generative models (e.g., MMM, SymphonyNet, MusicLM).
    - Data Scientist investigates relevant music datasets (e.g., MetaMIDI, Lakh MIDI Dataset) and ethical considerations like HARMONYCLOAK for copyright.
- **Detailed Proposal:** Project Lead integrates contributions from all team members into a comprehensive proposal, outlining the approach, initial architecture (Software Engineer), model choices (ML Engineer), data strategy (Data Scientist), and overall project plan.
- **Risk Identification:** Each team member identifies risks pertinent to their area (e.g., UX risks from Project Lead, technical model risks from ML Engineer, data quality risks from Data Scientist).

#### Checkpoint 2: Validation & Feedback

**Goal:** Validate the concept by systematically testing existing tools, refining the project idea based on shortcomings, and designing the tool's specifications and an initial prototype.

**Tasks:**

- **Existing Tool Evaluation:**
    - Project Lead (and potentially other team members) systematically tests current AI music tools (e.g., Magenta Studio, Suno, AIVA, MusicGen) to find their shortcomings in generating full ensemble parts for chamber music, focusing on controllability, expressiveness, and integration challenges.
    - Data Scientist develops objective metrics (e.g., EB, UPC, QN, DP, TD, FAD) to quantitatively evaluate these existing tools' musical output and identify their limitations.
- **Shortcomings Documentation:** Team compiles test results, documenting observed limitations, especially regarding the lack of fine-grained control and predictable musical outcomes.
- **Design Specification:** Project Lead, with input from the Software Engineer, creates a detailed design specification. This includes user flows, UI mockups, and explicit definitions of customizable control parameters (e.g., instrument types, adjustable difficulty levels, note density, polyphony, duration controls).
- **Prototype Development:** Software Engineer develops a preliminary interactive prototype (e.g., mockups, click-throughs) demonstrating the proposed user interface and key interaction points, showcasing how feedback on existing tools has informed the design. Project Lead provides continuous UX feedback.
- **Refined Idea:** The entire team collectively refines the project idea based on the validation findings, ensuring the tool effectively addresses identified shortcomings.

#### Checkpoint 3: Working Implementation & Demo
<img width="1024" height="1024" alt="Gemini_Generated_Image_xbk97xxbk97xxbk9 (1)" src="https://github.com/user-attachments/assets/27c83276-ab8b-48e6-8155-159c87e0bf91" />


**Goal:** Develop a functional, working version of the AI harmonization tool that delivers on its main purpose at a basic level.

**Tasks:**

- **Core Generative Engine Implementation:** ML Engineer implements and trains the chosen multi-track generative model (e.g., based on Transformer architecture) to generate harmonies and parts for a specified ensemble from a single melodic line.
- **Basic Control Integration:** ML Engineer integrates initial control parameters into the model, allowing for basic customization of generated parts.
- **User Interface & Integration:** Software Engineer builds the primary user interface, enabling users to input a melodic line (e.g., MIDI upload) and initiate the AI generation process. Connects the UI to the AI model and implements basic output functionality (e.g., MIDI export of generated parts).
- **Deployment:** Software Engineer ensures the tool is deployable (as a local demo or via a URL) and provides all source code and detailed instructions for setup and usage.
- **Initial Musical Quality Assurance:** Project Lead provides ongoing feedback to the ML Engineer to ensure the generated outputs are musically coherent and relevant for chamber music, even at this basic level.
- **Data Pipeline & Preprocessing:** Data Scientist ensures the data pipeline is functional and the necessary training data is accessible for the ML Engineer's model.

#### Checkpoint 4: Evaluation & Final Report ✅

**Goal:** Evaluate the tool's effectiveness through user study or experiments, and comprehensively document the entire project.

**Completed Tasks:**

- ✅ **User Study**: Conducted qualitative evaluation with three domain experts (professional violinist, songwriter, music educator)
- ✅ **Final Report**: Comprehensive 5,500+ word report documenting the full project lifecycle
- ✅ **System Documentation**: Complete technical documentation including architecture, use cases, telemetry, and safety/privacy notes
- ✅ **Deployment**: Live application deployed at https://chamber-music-fullstack-deploy.vercel.app/

**Deliverables:**
- [Final Report](docs/FINAL_REPORT.md) - Complete project documentation
- [Installation Guide](chamber-music-fullstack-full/INSTALL.md) - Setup instructions
- [Architecture Documentation](chamber-music-fullstack-full/docs/architecture.md) - System design
- [Use Cases & Test Cases](chamber-music-fullstack-full/docs/use-cases.md) - Testing documentation
- [Telemetry & Observability](chamber-music-fullstack-full/docs/telemetry.md) - Logging strategy
- [Safety & Privacy](chamber-music-fullstack-full/docs/safety-privacy.md) - Security measures

---

## Team Roles

This project will be undertaken by a four-person team, leveraging individual strengths to cover all necessary aspects of development, research, and evaluation.

- **Project Lead / UX Designer / Domain Expert:**
    - **Project Vision & Direction:** Sets the overall creative vision, project goals, and ensures the tool's musical relevance and quality.
    - **User Experience (UX) & Design:** Leads the design of the user interface, interaction flows, and critical control parameters (e.g., adjustable difficulty, stylistic options).
    - **Domain Expertise:** Provides essential musical insight for evaluating generated content, ensuring musicality and practical applicability for chamber groups and beginners.
    - **User Research Lead:** Designs and leads user studies, gathers qualitative feedback, and interprets user perceptions of creativity, ownership, and emotional connection with the AI.
    - **Report & Presentation Lead:** Primarily responsible for synthesizing project findings and presenting them in the final report and demo.

- **ML Engineer (Developer 1):**
    - **Core AI Model Development:** Leads the selection, training, and fine-tuning of generative AI models for multi-track music generation (melody, harmony, rhythm).
    - **Generative Capabilities Implementation:** Focuses on implementing attribute controls (e.g., instrument type, note density, polyphony) into the model's inference.
    - **Technical Optimization:** Works on improving model performance, efficiency, and scalability.
    - **Technical Documentation:** Contributes to the technical aspects of the literature review, proposal, and final report.

- **Software Engineer (Developer 2):**
    - **Application Architecture & Development:** Designs and builds the overall software architecture, including backend logic and API integrations.
    - **User Interface (UI) Implementation:** Translates UX designs into a functional, interactive user interface (standalone or DAW plugin).
    - **System Integration:** Ensures seamless data flow between the UI, the AI model, and output formats (e.g., MIDI export).
    - **Deployment & Infrastructure:** Manages the GitHub repository, deployment (local or web), and provides comprehensive instructions and source code.

- **Data Scientist (Developer 3):**
    - **Data Acquisition & Preprocessing:** Identifies, collects, cleans, and prepares musical datasets (e.g., MIDI files) for model training.
    - **Quantitative Evaluation:** Develops and applies objective metrics to evaluate AI-generated music and the tool's effectiveness (e.g., EB, UPC, QN, DP, TD, FAD).
    - **Ethical AI & Data Governance:** Researches and implements strategies to address data privacy, copyright (e.g., HARMONYCLOAK concepts), and potential biases in training data.
    - **Experimentation & Analysis:** Designs experiments, conducts statistical analysis of results, and contributes to the quantitative sections of the reports.

---

## Repository Structure

```
project-check-point-1-music/
├── docs/
│   └── FINAL_REPORT.md              # Final project report
├── chamber-music-fullstack-full/    # Main application
│   ├── INSTALL.md                   # Installation guide
│   ├── .env.example                  # Environment template
│   ├── README.md                    # Technical documentation
│   ├── docs/                        # Technical docs
│   │   ├── architecture.md          # System architecture
│   │   ├── use-cases.md             # Test cases
│   │   ├── telemetry.md             # Observability
│   │   └── safety-privacy.md        # Security & privacy
│   ├── prompts/                     # Configuration
│   │   ├── README.md                # AI tools documentation
│   │   └── config.json              # Engine configuration
│   ├── frontend/                    # React frontend
│   ├── backend/                     # Node.js backend
│   └── api/                         # Vercel serverless functions
├── literature/                      # Research papers
├── validation/                      # Validation studies
├── proposal/                        # Project proposal
└── reflections/                     # Team reflections
```

---

## Documentation

### For Users
- **[Installation Guide](chamber-music-fullstack-full/INSTALL.md)** - How to set up and run Harmony Forge locally
- **[Technical README](chamber-music-fullstack-full/README.md)** - Detailed technical documentation

### For Developers
- **[Architecture](chamber-music-fullstack-full/docs/architecture.md)** - System design and component architecture
- **[Use Cases & Tests](chamber-music-fullstack-full/docs/use-cases.md)** - Test scenarios and critical paths
- **[Telemetry](chamber-music-fullstack-full/docs/telemetry.md)** - Logging and observability plan
- **[Safety & Privacy](chamber-music-fullstack-full/docs/safety-privacy.md)** - Security measures and privacy policy

### For Researchers
- **[Final Report](docs/FINAL_REPORT.md)** - Complete project documentation with evaluation results
- **[Literature Review](literature/)** - Research papers and references
- **[Validation Studies](validation/)** - Competitive analysis and validation results

---

## Key Findings

### User Study Results

Our qualitative evaluation with domain experts revealed:

- **Professional Performers**: Value the tool for rapid prototyping in gigging contexts
- **Songwriters/Arrangers**: Appreciate it as a starting point to overcome writer's block
- **Educators**: See it as a "gateway" tool for introducing students to composition

**Key Insight**: All participants emphasized the importance of maintaining human agency and control, preferring Harmony Forge's deterministic, editable approach over "black box" AI systems.

### Technical Achievements

- ✅ Rule-based harmonization engine (2,385 lines of TypeScript)
- ✅ Deterministic output with seeded random number generation
- ✅ Support for 13 instruments with proper range validation
- ✅ MusicXML output compatible with standard notation software
- ✅ Web-based deployment on Vercel

### Validation Results

Our validation study comparing existing tools (Klangio, Remusic, Suno AI, ElevenLabs) confirmed:

- **Gap 1**: Lack of structured, symbolic output → Harmony Forge generates MusicXML
- **Gap 2**: Absent generative control → Harmony Forge provides deterministic, interpretable generation
- **Gap 3**: Failure to adhere to constraints → Harmony Forge implements validation and refinement

---

## Future Work

See the [Final Report](docs/FINAL_REPORT.md) Section 6.2 for detailed future work, including:
- Hybrid ML integration for stylistic nuance
- Counterpoint generation capabilities
- Genre-specific customization
- Interactive editing features
- Educational modes

---

## License

MIT License - see LICENSE file for details

---

## Acknowledgments

- Built with modern web technologies (React, TypeScript, Node.js)
- Uses classical music theory principles for harmonization
- Inspired by traditional SATB harmonization techniques
- OpenSheetMusicDisplay for score rendering
- Vercel for hosting and serverless functions

---

*Last Updated: December 2024*