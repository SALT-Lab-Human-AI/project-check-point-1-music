# Harmony Forge: A Co-Creative Approach to Algorithmic Harmonization for String Ensembles

**Authors:**

Misha Gandhi, Joanna George, Shivam Patel, Dulf Vincent Genis

*IS 492 Capstone Project*

---

## Abstract

Chamber music frequently faces repertoire limitations when sheet music is constrained to solo melodic lines, which prevents full ensemble performance and excludes musicians with less experience. To address this gap, **Harmony Forge** is a rule-based harmonization system capable of generating customizable harmony parts and counterpoint for string ensembles using SATB voice leading and harmonic progression logic. We conducted evaluations with three domain specialists and professionals, in which results showed strong value for gigging musicians, arrangers, and educators. This tool serves as a co-creative assistant that accelerates workflow and expands repertoire. Some harmonies were valid, but some felt rigid due to algorithmic limitations. Findings showcase the importance of iteration, transparency, controls, and user-guided refinement in human-AI collaboration. This report concludes with a discussion on the ethical integration of AI in creative workflows and proposes a hybrid future combining rule-based logic with machine learning to enhance harmonic fidelity.

---

## 1. Introduction

### 1.1 Problem Context

The landscape of musical performance is often divided between the rigid structures of classical repertoire and the flexible demands of the "gigging" economy. Musicians performing at weddings, holiday events, or casual jam sessions frequently encounter a logistical bottleneck: the lack of bespoke arrangements for specific instrumentations. As noted by one professional violinist participant, while standard repertoire is accessible via libraries, specific requests (e.g., a pop song for a string quartet) often require manual arrangement or improvisation, creating a barrier for ensembles that rely on sheet music.

Furthermore, music educators face the challenge of bridging the gap between performance and composition for students. Arranging music requires a deep understanding of voice leading and harmonic function, skills that beginner musicians often lack. This creates an exclusion zone where only those with theoretical training can participate in the creative side of ensemble playing.

The problem extends beyond mere convenience. Research in human-AI co-creation suggests that existing AI music tools often produce "fixed" audio outputs that are "hard to manipulate," preventing users from adjusting individual notes or tracks essential for creating arrangements for specific instruments or skill levels (Fu et al., 2024). Additionally, many systems offer minimal, "1-parameter" interfaces that are insufficient for co-creation, leading users to feel that the generation process is random rather than creative (Tchemeube et al., 2024).

### 1.2 The Harmony Forge Solution

Harmony Forge was developed to address these issues by providing an accessible, web-based tool that automates the generation of accompanying parts. The core value proposition of Harmony Forge is **Creative Efficiency** and **Inclusion**. By automating the tedious aspects of part-writing—such as SATB (Soprano, Alto, Tenor, Bass) voice leading and chord construction—the tool enables musicians to expand their repertoire without the steep learning curve of manual composition.

Unlike diffusion-based generative models that operate as "black boxes," Harmony Forge utilizes a deterministic, rule-based TypeScript engine that prioritizes interpretability and editability. This approach aligns with research on co-creative systems, which emphasizes the importance of maintaining human agency and control in AI-assisted creative workflows (Newman et al., 2023). The system generates MusicXML output, enabling direct integration with standard notation software (Finale, Sibelius, MuseScore), addressing a critical gap identified in validation studies where existing tools failed to produce structured, symbolic outputs suitable for ensemble rehearsal.

### 1.3 Scope of the Report

This report documents the full lifecycle of the Harmony Forge project, from theoretical grounding to system implementation and user evaluation. We analyze the tension between algorithmic rigidity and musical creativity, utilizing feedback from domain experts to propose a future where software acts not as a replacement for the human arranger, but as a "servant leader" in the co-creative process. The report is structured as follows: Section 2 reviews related work and theoretical foundations; Section 3 describes the system architecture and evaluation methodology; Section 4 presents results and analysis; Section 5 discusses limitations and ethical considerations; and Section 6 concludes with future directions.

---

## 2. Related Work & Theoretical Grounding

### 2.1 Classical Music Theory Principles

The backbone of Harmony Forge is built upon the foundational rules of Western tonal harmony. As detailed in standard music theory pedagogy, the construction of functional harmony relies on specific hierarchies of chords and voice-leading protocols.

**Harmonic Function:** The system relies on the flow of harmonic tension and resolution, specifically the movement from Tonic (stability) to Predominant and Dominant (tension) and back to Tonic. The "Circle of Fifths" progression serves as a fundamental engine for these movements, driving harmonic momentum in a way that is predictable and pleasing to the Western ear (Hutchinson, 2017). This functional harmony approach ensures that generated progressions follow established patterns of tension and release, creating musically coherent arrangements.

**Voice Leading:** A critical challenge in automated arrangement is avoiding "objectionable parallels" (parallel fifths and octaves), which destroy voice independence. The Harmony Forge algorithm implements these rules programmatically, ensuring that parts move in contrary or oblique motion rather than parallel motion where prohibited. Furthermore, the system handles the spacing of chords, ensuring that the upper voices (violin, viola) remain within an octave of each other to maintain a balanced texture, a principle derived from the overtone series and chorale style writing (Hutchinson, 2017).

The system implements SATB (Soprano, Alto, Tenor, Bass) voice leading principles, where each voice operates within its designated range:
- **Soprano**: C4 to C6 (MIDI 60-84) - typically the melody
- **Alto**: G3 to E5 (MIDI 55-76) - first harmony voice
- **Tenor**: C3 to G4 (MIDI 48-67) - second harmony voice  
- **Bass**: E2 to C4 (MIDI 40-60) - third harmony voice

These constraints ensure that generated parts remain playable within standard instrument ranges while maintaining proper voice independence.

### 2.2 Algorithmic vs. Diffusion-Based Generation

In the broader context of computational music, there is a significant divergence between rule-based systems (like Harmony Forge) and modern Deep Learning approaches. Recent advancements, such as **Stochastic Control Guidance (SCG)** for diffusion models, allow for the generation of symbolic music (piano rolls) that adheres to non-differentiable rules like note density or specific chord progressions (Huang et al., 2024). These models operate by training on vast datasets (e.g., MAESTRO, Pop909) and "diffusing" noise into structured music.

While diffusion models represent the state-of-the-art in generating expressive performance dynamics (velocity, pedal), they often suffer from a "black box" problem where the user has limited control over the specific theoretical justification of a generated note. Harmony Forge takes a divergent path. By utilizing a deterministic, rule-based TypeScript engine, it sacrifices the nuance of deep learning for **interpretability and editability**. This aligns with the "Path Integral Control" concept in stochastic theory, where the goal is to steer generation toward a specific, rule-compliant target, but achieves it through explicit coding of theory rules rather than probabilistic sampling (Huang et al., 2024).

### 2.3 Human-AI Co-Creation in Music

Research on human-AI collaboration in music creation reveals important tensions between automation and agency. Studies of co-creative systems show that users value tools that provide inspiration and overcome "writer's block," but they also emphasize the need for emotional depth and human agency in the creative process (Fu et al., 2024). Participants in co-creation studies have criticized AI-generated music for lacking "emotional depth" and "rawness," emphasizing the importance of retaining human emotional involvement and personal creative identities (Fu et al., 2024).

This research informs Harmony Forge's design philosophy: the tool should act as a "supportive role" rather than having the "final say" in creative decisions. The system handles the "grunt work" (transposition, basic voicing) while leaving creative decisions to the musician, aligning with findings that users prefer AI systems that support rather than replace human creativity (Newman et al., 2023).

### 2.4 Evaluation of AI Music Systems

Recent advances in AI-driven music have enabled the creation of harmonization and complex genres like chamber music. However, challenges remain in producing outputs that are both musically plausible and professionally usable. Incorrect harmonies or unnatural voice leading limit the quality of AI-generated music, and outputs in fixed audio formats restrict editing and integration. Humans also struggle with limited control and reduction of creative ownership in these workflows, which requires a comprehensive framework to consider these ethical and human-centered factors.

When repertoire is limited to single-instrument melodies, prior work in music highlights the potential of computational systems to support musicians in arrangements rather than replacement in AI-assisted creativity. Traditional rule-based approaches speak to theoretical correctness but lack stylistic nuance. ML methods provide unpredictability and potential data bias. Building on research in co-creative AI, human-AI interaction, and classical harmony, our work leverages existing research and emphasizes musicians' desire for tools that foster creativity while preserving user control.

Previous evaluations of AI music generation systems have identified critical gaps in controllability, output format, and adherence to user constraints. Our validation studies comparing existing tools (Klangio, Remusic, Suno AI, ElevenLabs) found that transcription tools cannot compose new parts, audio generation tools produce non-editable outputs, and most systems fail to adhere to expressive constraints like difficulty level or specific instrumentation. These findings directly motivated Harmony Forge's focus on structured, symbolic output and fine-grained control parameters.

---

## 3. Method

### 3.1 System Description

Harmony Forge is a web application designed to intake a single melody line and output a full ensemble arrangement. The system is deployed at https://chamber-music-fullstack-deploy.vercel.app/ and consists of a React/TypeScript frontend and a Node.js backend with a sophisticated harmonization engine.

**Frontend Architecture:** The user interface was built using modern web frameworks (React 18.3, Vite 5.4), leveraging AI-assisted design tools (v0, Vercel) to rapidly prototype an intuitive dashboard where users can input melodies and select instrumentation. The frontend supports drag-and-drop file upload, real-time processing feedback, and interactive score visualization using OpenSheetMusicDisplay. The application follows a step-by-step workflow: Upload → Select Instruments → Generate → View Results.

**Backend Harmonization Logic:** The core innovation lies in the "Harmonization Engine," a rule-based system implemented in TypeScript comprising approximately 2,385 lines (`harmonize-core.ts`). **This system does not use external datasets or machine learning models**—it relies entirely on deterministic SATB voice leading logic, harmonic function flow, chord quality detection, chord inversion handling, polyphonic input support, and seeded RNG for reproducible output. This includes range constraints, stepwise motion, tendency tones, and much more. The engine implements the music theory principles described in Section 2.1 through a multi-stage pipeline:

1. **Input Parsing & Analysis:** The system parses MusicXML using DOMParser, extracts key signature (fifths, mode), determines root note and scale, and detects polyphony (single voice vs. multiple voices). The system supports all 12 major and 12 minor keys through circle-of-fifths mapping.

2. **Melody Extraction:** For monophonic input, the system extracts a single melodic line, converting note elements to MIDI pitches and tracking duration and timing. For polyphonic input, it extracts multiple melodic lines while maintaining temporal alignment.

3. **Harmonic Progression Generation:** The system analyzes each melody note to determine appropriate chord function (tonic, predominant, dominant). Chord selection is based on:
   - Melody note's scale degree
   - Harmonic function flow (Tonic → Predominant → Dominant → Tonic)
   - Voice leading considerations
   - Seeded random variation (for deterministic but varied output)

4. **Voice Assignment & SATB Voice Leading:** Using SATB principles, the system assigns notes to the cello (Bass), viola (Tenor/Alto), and second violin (Alto/Soprano) to complete chord structures. The algorithm implements:
   - Range constraints for each voice
   - Motion priority (oblique > stepwise > small leaps > large leaps)
   - Spacing rules (no interval > octave between adjacent voices)
   - Parallel motion avoidance (no parallel perfect fifths/octaves)
   - Tendency tone resolution (leading tone resolves up, chord 7ths resolve down)
   - Doubling strategies based on chord inversion

5. **Instrument Part Generation:** For each selected instrument, the system maps voices to instruments, applies instrument-specific configurations (clef, range, transposition), and generates playable parts within instrument constraints.

6. **Validation & Refinement:** The system includes a harmonic validation function that scores progressions (0-100) based on chord functions, voice leading quality, and resolution of tensions. If the score is below 70, the system applies refinement: better inversion choices, common tone retention, smoother voice leading, and improved chord resolutions.

7. **MusicXML Generation:** The system generates two output formats: harmony-only XML (containing only the generated parts) and combined XML (melody + harmony parts), both in standard MusicXML format compatible with notation software.

**Deterministic Generation:** To aid in debugging and user trust, the system uses a seeded random number generator. The seed is generated from file content and instrument selection, ensuring that the same input produces the same output. This allows users to tweak settings without losing a "good" generation entirely, addressing concerns about AI systems feeling "random" rather than controllable.

**Technical Stack:**
- **Frontend:** React 18.3, TypeScript, Vite 5.4, Tailwind CSS 4.1, Radix UI, OpenSheetMusicDisplay
- **Backend:** Node.js 18+, Express 4.18, TypeScript, @xmldom/xmldom 0.8
- **Deployment:** Vercel serverless functions with 60-second timeout and 3008MB memory allocation

### 3.2 Evaluation Design: Co-Design Think-Aloud

To validate the system, we rejected standard usability metrics (time-on-task) in favor of a **Conceptual Evaluation** using a "Think Aloud" protocol. This method captures the cognitive processes and immediate reactions of domain experts as they interact with the tool, providing rich qualitative data about the system's value proposition and ethical implications.

**Participants:** We recruited three distinct domain experts to represent our target user personas:

1. **Professional Violinist:** A conservatory student with extensive chamber music experience. This participant represents the "gigging professional" persona, who needs rapid arrangements for performance contexts.

2. **Songwriter/Arranger:** A multi-instrumentalist representing the "gigging/pop" arranger demographic. This participant brings expertise in contemporary music styles and arrangement workflows.

3. **Music Educator:** An orchestra director with experience in niche genres (Mariachi). This participant represents the educator persona, who needs tools that support student learning and diverse repertoire.

**Protocol:** The study was conducted via remote video conferencing. Participants were given a live walkthrough of the app and asked to verbalize their thoughts on the generated output, the workflow, and the ethical implications of the technology. We utilized a semi-structured interview script covering:
- Background and current pain points in finding repertoire
- Initial impressions of the interface and workflow
- Specific feedback on the app's generated harmonies
- Perceived value and use cases
- Ethical concerns and implications
- Feature requests and desired improvements

**Data Collection:** All sessions were recorded (with participant consent) and transcribed. Qualitative analysis focused on identifying themes related to:
- Perceived value and use cases
- Workflow preferences and control needs
- Musical quality and stylistic concerns
- Ethical considerations and displacement fears
- Feature requests and co-design suggestions

This approach aligns with research on evaluating co-creative systems, which emphasizes understanding user experience, creative agency, and the socio-technical implications of AI in creative work (Tchemeube et al., 2024; Newman et al., 2023).

---

## 4. Results and Analysis

### 4.1 Quantitative System Performance

While the primary evaluation was qualitative, the system's technical performance provided a baseline for the user study. The backend successfully implemented core harmonic logic, processing melodies of varying lengths (from 8 bars to 19+ bars) and generating MusicXML output compatible with standard notation software. The system supports 13 different instruments across strings, woodwinds, brass, and voices, and can generate harmonies for ensembles of 1-4 instruments.

**Processing Performance:** The harmonization engine processes typical melodies (8-20 bars) in 1-5 seconds, well within the 60-second Vercel function timeout. The deterministic seed-based approach ensures reproducible results, allowing users to regenerate harmonies with consistent quality.

**Harmonic Validation Metrics:** The system's built-in validation function scores harmonic progressions on a 0-100 scale, assessing:
- Common tone connectivity between chords
- Chord quality appropriateness
- Voice leading smoothness
- Progression logic adherence

Additional quantitative metrics include:
- Voice leading interval distances (preferring stepwise motion)
- Parallel motion detection (should be zero violations)
- Processing latency (typically 1-5 seconds)
- SATB range adherence (all notes within instrument ranges)

During testing, most generated progressions scored above 70, triggering refinement only in edge cases. However, the live demos revealed limitations in the "Refinement Stage." Specifically, the algorithm occasionally produced harmonies described as "weird" or "off," indicating that the scoring function for voice leading needs tuning to better prioritize smooth motion over strict chord construction.

**Output Quality:** The system successfully generates MusicXML files that import correctly into Finale, Sibelius, and MuseScore. The output maintains proper formatting, instrument labels, clefs, key signatures, and time signatures. However, the algorithmic nature of the generation sometimes produces harmonies that, while theoretically correct, lack the stylistic nuance that human arrangers would naturally incorporate.

### 4.2 Qualitative Insights

The user study yielded rich data regarding the role of AI in music. The feedback is categorized below by user persona.

#### 4.2.1 The Professional Performer

The professional violinist participant, whose role in ensembles is described as a "servant leader," identified a specific, high-value use case: the **Gigging Economy**. This participant noted that while classical repertoire is abundant via IMSLP, custom arrangements for weddings (e.g., pop songs for string quartets) are a major pain point.

**Key Insights:**
- This participant views the app not as a tool for serious classical composition, but as a utility for "jam sessions" and gigs where speed is more important than theoretical perfection.
- The tool addresses a real need: "What happens to all these arrangers?" the participant asked, expressing concern about displacement, but also acknowledging that the tool fills a gap where manual arrangement is too time-consuming for the context.
- This participant specifically requested "Counterpoint" capabilities, stating that if the app could generate independent melodic lines rather than just block chords, it would be a "game-changer."

**Ethical Stance:** This participant expressed concern about displacement of professional arrangers, but also recognized that the tool serves a different market (rapid prototyping for gigs) rather than replacing high-end arrangement work. The participant jokingly noted the tool "might be banned" for undergrad theory students, highlighting concerns about academic integrity.

#### 4.2.2 The Songwriter/Arranger

The songwriter participant, who identifies as a "loyal follower" in ensembles but an active arranger, provided critical feedback on the musical output. This participant described the AI-generated harmonies as creating a "second version" of the song—harmonically functional but distinct from the original composer's intent.

**Key Insights:**
- This participant valued the tool as a "starting point" to overcome writer's block, aligning with research findings that AI can serve as an inspiration engine (Fu et al., 2024).
- However, this participant noted that the bass lines often lacked the specific character imagined, suggesting the need for more user control over the "style" of the generation.
- The harmonies sometimes felt "weird" or "off," indicating that strict adherence to vertical chord construction sometimes compromises the horizontal melodic line.

**Co-Design Feedback:** This participant advocated for a workflow that is not "one-click" but allows for editing between input and output, such as regenerating specific harmonies or defining the genre. The participant emphasized the importance of maintaining creative control and the ability to refine AI output to match artistic vision.

**Ethical Concerns:** This participant raised a concern about using the tool on unreleased music, implying potential intellectual property risks if the AI utilizes user data for training. This highlights the importance of transparent data handling and user control over their creative inputs.

#### 4.2.3 The Educator

The music educator participant provided the most diverse perspective, balancing roles as a performer and a teacher. This participant highlighted the struggle of arranging for **Mariachi** ensembles, where repertoire is not centralized and relies heavily on manual transcription.

**Key Insights:**
- This participant framed the app as a "gateway" for students. By allowing students to dabble in composition without needing years of theory training, the app serves an educational purpose.
- The tool addresses a real need in niche genres (Mariachi) where arrangements are scarce and manual transcription is time-consuming.
- This participant emphasized that the tool should handle the "grunt work" (transposition, basic voicing) while leaving creative decisions to the musician.

**Ethical Stance:** This participant emphasized that AI should remain a "supportive role," never having the "final say." The participant wants the tool to support learning and creativity without replacing the educational value of understanding music theory. This aligns with research on co-creative systems that emphasize maintaining human agency (Newman et al., 2023).

### 4.3 Analysis of User Needs

Synthesizing the feedback reveals a clear tension between **automation** and **agency**. All three experts rejected the idea of a fully autonomous AI composer. Instead, they desire a **Co-Creative Assistant**.

**Control is Paramount:** Users want to tweak the output. As the songwriter participant noted, the ability to regenerate harmonies or edit chord notations is essential. This finding aligns with research showing that users prefer AI systems that provide control and interpretability rather than "black box" generation (Tchemeube et al., 2024).

**Context Awareness:** The current algorithm applies classical rules universally. However, the educator's need for Mariachi styles and the professional violinist's need for wedding gigs suggest that the system needs "Genre Modes" that adjust the voice-leading rules (e.g., allowing parallel thirds in Mariachi, or more contemporary harmonic progressions for pop songs).

**Trust and Interpretability:** The "weird" harmonies detected by the songwriter participant suggest that the system's strict adherence to vertical chord construction sometimes compromises the horizontal melodic line. This reflects the theoretical challenge of prioritizing vertical sonority vs. horizontal counterpoint. The deterministic, rule-based approach helps build trust, but users need more visibility into why certain harmonic choices were made.

**Educational Value:** The educator's framing of the tool as a "gateway" highlights an important use case: the tool can lower barriers to entry for students learning composition, but it must be designed to support learning rather than replace it. This requires careful consideration of how the tool is presented and used in educational contexts.

**Use Case Differentiation:** The feedback reveals distinct use cases:
- **Rapid Prototyping for Gigs:** Speed and basic functionality are more important than perfection (professional violinist)
- **Creative Inspiration:** Overcoming writer's block and exploring harmonic possibilities (songwriter)
- **Educational Gateway:** Introducing students to composition concepts without requiring extensive theory training (educator)

These use cases require different feature sets and design approaches, suggesting that future development should consider user personas and use-case-specific workflows.

---

## 5. Limitations, Risks, and Ethical Considerations

Our study has several limitations, risks, and ethical considerations that must be acknowledged.

### 5.1 Sample Size and Generalizability

**Sample Size Limitation:** The evaluation involved only three participants, which limits the generalizability of our findings and requires broader demographic representation. While our participants were excellent and provided the insights we needed, a larger and more diverse sample would strengthen the validity of our conclusions. Future work should include participants from different musical backgrounds, skill levels, and cultural contexts.

### 5.2 Technical Limitations

The current iteration of Harmony Forge relies on a rigid set of music theory rules. Unlike diffusion models that can learn implicit rules from vast datasets, our rule-based system is brittle. It struggles with:

1. **Contextual Phrasing:** The system harmonizes moment-to-moment, often failing to recognize the broader phrase structure (antecedent/consequent) essential for coherent musical form. This limitation leads to harmonies that are locally correct but globally disconnected.

2. **Genre Specificity:** It applies 18th-century voice-leading rules to all inputs, which may make pop or folk inputs sound stiff or "academic." As noted by participants, the system needs genre-aware modes that adjust harmonic and voice-leading rules to match the stylistic context.

3. **Counterpoint Limitations:** The current system generates primarily block chords rather than independent melodic lines. The professional violinist's request for counterpoint capabilities highlights a significant limitation: the system prioritizes vertical harmony over horizontal melodic interest.

4. **Non-Chord Tone Handling:** While the system recognizes some non-chord tones (passing tones, neighbor tones, suspensions), its handling is limited. More sophisticated treatment of non-chord tones would create more fluid, expressive melodic lines.

5. **Polyphonic Input Processing:** While the system supports polyphonic input, its analysis of vertical harmony from multiple simultaneous notes is basic. More sophisticated harmonic analysis could improve the quality of generated parts for polyphonic inputs.

6. **Rule-Based Rigidity:** Rule-based harmonization can produce outputs that feel less intuitive or expressive compared to human composition. While the system is deterministic with seeded RNG (ensuring consistent outputs), rule-based logic can produce musically unexpected results that may not align with human musical intuition.

### 5.3 Cultural and Musical Bias

**Western Music Theory Bias:** The system relies exclusively on Western music theory principles (SATB voice leading, functional harmony, circle of fifths). This does not include or factor in non-Western musical traditions. SATB rules may not support these global music traditions, limiting the tool's applicability to Western classical and popular music contexts. Future work should explore incorporating principles from other musical traditions to make the tool more globally accessible.

### 5.4 Ethical Considerations

A recurring theme in the user study was the fear of displacement and the need to maintain human agency in creative work.

**Displacement of Arrangers:** The professional violinist participant expressed concern about "what happens to all these arrangers" if the software becomes too proficient. However, the consensus was that AI cannot replace the "live performance" or the human element of creativity. The tool serves a different market (rapid prototyping, educational support) rather than replacing high-end arrangement work. This aligns with research showing that users value AI as a supportive tool rather than a replacement (Newman et al., 2023).

**Academic Integrity:** There is a risk that students might use the tool to bypass music theory homework (e.g., part-writing exercises). One participant jokingly noted it "might be banned" for undergrad theory students. This highlights the need for careful consideration of how the tool is presented and used in educational contexts. The tool should support learning rather than replace it, requiring clear guidelines and potentially educational modes that explain the theory behind generated choices.

**Copyright and Intellectual Property:** No personal data is stored; only MusicXML files are processed in-memory. This reduces overall privacy risks and ethical considerations, but copyright risks remain since users may upload protected melodies. Using copyrighted music as input raises questions about fair use and intellectual property. The songwriter participant raised a concern about using the tool on unreleased music, implying potential intellectual property risks. This highlights the importance of:
- Transparent data handling policies
- Clear user agreements about data usage and copyright
- Educational materials about fair use and copyright compliance
- Implementation of copyright-safe techniques (e.g., HARMONYCLOAK) if training data is used in future ML components (Meerza et al., 2024)

**Authorship and Attribution:** The deterministic, rule-based approach helps maintain transparency about how harmonies are generated, but questions remain about authorship when AI assists in creation. The tool should clearly communicate its role as an assistant rather than a creator, and users should understand their responsibility for the final creative output.

### 5.5 Risks of Homogenization

By relying on a fixed set of "correct" theoretical rules, Harmony Forge risks homogenizing musical output. If every user receives the same "textbook perfect" resolution to a V7 chord, the diversity of musical expression may diminish. This reinforces the need for the "Co-Design" features requested by users, allowing them to inject personal style into the algorithmic base.

The seeded random number generator provides some variation, but it is limited. Future development should consider:
- More sophisticated variation algorithms
- User-controllable style parameters
- Genre-specific rule sets
- Learning from user edits to adapt to individual preferences

### 5.6 Ecological Validity

**Evaluation Context:** The ecological validity of our evaluation may not capture real-world usage patterns. The study was conducted in a controlled setting with guided walkthroughs, which may not reflect how users would interact with the tool independently in their natural workflows. Future work should include longitudinal studies and real-world deployment to understand actual usage patterns and long-term value.

### 5.7 Accessibility and Inclusivity

While Harmony Forge aims to democratize music arranging, there are accessibility concerns:
- **Technical Barriers:** Users need access to a computer, internet connection, and basic file management skills
- **Musical Knowledge:** While the tool lowers barriers, some understanding of music notation and ensemble playing is still required
- **Language and Interface:** The interface is currently English-only, limiting accessibility for non-English speakers
- **Cost:** While the current deployment is free, future monetization could create barriers for students and amateur musicians

These limitations should be addressed in future development to ensure the tool truly democratizes music arranging rather than creating new barriers.

---

## 6. Conclusion and Future Work

### 6.1 Conclusion

Harmony Forge successfully solves a real gap: musicians—especially chamber groups, educators, and gigging performers—need fast, customizable harmonies, and the tool clearly boosts efficiency and accessibility. The user study confirms that the value lies not in the perfection of the output, but in the accessibility it provides—bridging the gap between a solo melody and a full ensemble experience.

**Human Control is Non-Negotiable:** Users want AI support, not AI dominance. Customization, transparency, and editable outputs are the core values. The study shows that musicians trust AI when they stay in the driver's seat. The system works best as a co-creative assistant: generating ideas, accelerating arrangement workflows, and lowering the barrier for beginners, while letting humans refine style, taste, and musical decisions. It highlights that AI should scaffold creativity, not replace it—users want regeneration options, genre rules, chord notation, and melody distribution to shape the final product themselves.

The system addresses critical gaps identified in validation studies: it produces structured, symbolic output (MusicXML) rather than fixed audio files, provides deterministic and interpretable generation rather than "black box" outputs, and offers fine-grained control over instrumentation and basic harmonic parameters. However, the user study also revealed limitations: the system needs better genre awareness, counterpoint capabilities, and more sophisticated handling of musical context.

The ethical considerations raised by participants highlight the importance of designing AI tools that support rather than replace human creativity. The tool should maintain transparency, respect user agency, and be designed with clear use cases and limitations in mind. Educational use requires particular care to ensure the tool supports learning rather than bypassing it.

### 6.2 Future Work

To address the limitations identified, future development will focus on:

**Technical Enhancements:**

1. **Advanced Music Theory Guardrails:** "We want the harmonies to sound more 'musically correct,' so adding real music-theory guardrails is a big next step—things like catching parallel motion, improving cadences, and cleaning up voice-leading." Implementing more sophisticated checks for specific voice-leading errors (parallel fifths, direct octaves) and adding support for non-chord tones (passing tones, suspensions, appoggiaturas) to create more fluid melodic lines. The system should also recognize phrase structure and apply harmonic logic at the phrase level rather than moment-to-moment.

2. **Counterpoint Generation:** Developing algorithms to generate independent melodic lines rather than just block chords. "We also want to support multi-melody inputs and generate more advanced parts like counter-melodies or genre-specific patterns." This would address the professional violinist's "game-changer" request and create more musically interesting arrangements. The system could use species counterpoint rules or learn from contrapuntal examples in training data.

3. **Hybrid Architecture:** "Long-term, we can bring in ML models like transformers or diffusion to boost the quality of generations." Integrating Machine Learning (Transformers/Diffusion) to handle texture and style transfer, while retaining the rule-based engine for logical consistency. This mirrors the "Stochastic Control Guidance" approach where rules guide the diffusion process (Huang et al., 2024). The rule-based engine would ensure harmonic correctness, while ML components would add stylistic nuance and contextual awareness.

4. **Genre Customization:** Creating "Style Profiles" (e.g., Mariachi, Pop, Baroque, Jazz) that adjust the underlying rule weights to suit the user's specific performance context. This would address the educator's need for Mariachi-specific arrangements and the professional violinist's need for contemporary styles. Each profile would modify:
   - Harmonic progression preferences
   - Voice-leading rules (e.g., allowing parallel thirds in some styles)
   - Rhythm and note density
   - Instrumentation conventions

**User Experience Improvements:**

5. **Better Onboarding:** "A lot of users got overwhelmed or used features wrong, so we need better onboarding and clearer guardrails." Developing interactive tutorials, tooltips, and progressive disclosure to help users understand the tool's capabilities and limitations.

6. **Customization Controls:** "We also want customization controls to be more obvious up-front instead of buried." Making genre selection, difficulty settings, and style parameters more prominent in the interface, allowing users to shape outputs before generation.

7. **Interactive Editing:** Developing an in-browser score editor that allows users to edit generated harmonies, regenerate specific sections, and see real-time updates. This would address the songwriter's need for iterative refinement and maintain user agency in the creative process.

8. **Educational Modes:** Creating an "Educational Mode" that explains the theory behind generated choices, shows voice-leading analysis, and provides learning resources. This would support the educator's use case while addressing academic integrity concerns.

**Data and Deployment:**

9. **Metadata Enhancement:** "We saw that difficulty tuning and style decisions depend on better metadata. So improving how we capture and use that data will help the harmonies feel more intentional." Enhancing metadata extraction and utilization to improve harmonic quality and user control.

10. **Genre Expansion:** "We also want to expand into genres that don't have great digital resources—like mariachi or folk—using ethically sourced datasets." Developing support for underrepresented genres with ethically sourced training data.

11. **Input Flexibility:** "And finally, scanning PDFs or images into MusicXML would make the tool way more usable for musicians who only have physical sheet music." Implementing PDF/PNG scanning (Optical Music Recognition) to allow users to upload sheet music directly, streamlining the workflow for educators.

12. **Backend Integration:** "On the engineering side, we need the backend and frontend fully integrated and stable." Ensuring robust integration between frontend and backend components.

13. **Audio Playback and Project Saving:** "Audio playback and saving projects are must-haves for real workflows." Adding audio preview capabilities and project persistence to support real-world usage patterns.

**Accessibility and Ethical Safeguards:**

14. **Accessibility Improvements:** 
   - Multi-language support
   - Improved mobile responsiveness
   - Tutorial and help systems

15. **Ethical Safeguards:**
    - Clear data handling policies
    - Client-side processing options
    - Educational use guidelines
    - Attribution and authorship clarity

These developments would transform Harmony Forge from a proof-of-concept into a production-ready tool that truly democratizes music arranging while maintaining the co-creative, human-centered approach that users value.

---

## 7. References

Fu, J., Liu, Y., & Wang, X. (2024). Exploring the collaborative co-creation process with AI: A case study in novice music production. *Proceedings of the CHI Conference on Human Factors in Computing Systems*.

Huang, Y., et al. (2024). Symbolic music generation with non-differentiable rule guided diffusion. *Proceedings of the 41st International Conference on Machine Learning*.

Hutchinson, R. (2017). *Music theory for the 21st-century classroom*. University of Puget Sound.

Meerza, S. I. A., et al. (2024). Harmonycloak: Making music unlearnable for generative AI. *Proceedings of the IEEE Conference on Computer Vision and Pattern Recognition*.

Newman, B., et al. (2023). Human-AI music creation: Evaluating usability, user experience, and acceptance measures. *Proceedings of the International Conference on Human-Computer Interaction*.

Tchemeube, E., et al. (2024). Evaluating human-AI interaction via usability, user experience, and acceptance measures for MMM-C: A creative AI system for music composition. *Journal of Human-Computer Interaction*.

---

## Appendices

### Appendix A: Study Materials & Prompts

**User Study Protocol:**

The user study followed a semi-structured interview format with the following key questions:

1. **Introduction:**
   - "We are testing a tool for automated string arranging. This is a conceptual walkthrough where we'd like to hear your thoughts as you interact with the system."

2. **Background Questions:**
   - "What has your experience been with music ensembles?"
   - "Have you ever struggled with finding more repertoire to play?"
   - "What is your current process for creating or finding arrangements?"

3. **App Interaction:**
   - Participants were given a live walkthrough of the application
   - They were asked to upload a sample melody (or use a provided example)
   - They selected instruments and generated harmonies
   - They reviewed the generated output

4. **Feedback Questions:**
   - "What are your initial thoughts on the generated harmony?"
   - "How does this compare to arrangements you've created or used before?"
   - "What would you change about the output?"
   - "How would you use this tool in your work/teaching/performance?"

5. **Ethical Questions:**
   - "Do you have any ethical concerns about this app?"
   - "How do you feel about AI assisting in music creation?"
   - "What are your concerns about displacement or authorship?"

6. **Feature Requests:**
   - "What additional guardrails or features would you like to see?"
   - "What would make this tool more useful for your specific needs?"

**Participant Information:**
- All participants provided informed consent
- Sessions were recorded (with permission) for transcription
- Participants were informed that their feedback would be used in the final report
- No personally identifiable information beyond names and roles were collected

### Appendix B: Technical Stack Attribution

The development of Harmony Forge was assisted by the following AI tools, as noted in the project documentation:

- **GitHub Copilot (Claude Sonnet 3.5):** Used for code generation (frontend/backend) and debugging
- **AI Cursor:** Used for code completion and refactoring
- **V0.dev:** Used for frontend component design
- **Vercel:** Used for deployment and hosting
- **Google Gemini Nano:** Used for brainstorming and documentation assistance
- **Claude AI:** Used for refining the evaluation protocol and documentation
- **NotebookLM:** Used for synthesizing research sources

All AI-generated code and content was reviewed and edited by human authors, who are solely responsible for the accuracy and implementation of the final system.

### Appendix C: Team Contributions & Acknowledgments

**Shivam Patel:**
- Frontend architecture and design
- Deployment infrastructure
- Task delegation and project coordination

**Dulf Vincent Genis:**
- Backend harmonizer logic implementation
- System debugging and optimization
- User study pilot and protocol development

**Misha Gandhi:**
- Repository management and organization
- Final presentation development
- Report outline and structure

**Joanna George:**
- Repository management
- Presentation development
- Documentation coordination

**Acknowledgments:**
The team would like to thank the three domain expert participants who provided invaluable feedback during the user study. Their insights shaped the development of Harmony Forge and highlighted the importance of human-centered design in AI-assisted creative tools.

### Appendix D: System Architecture Details

**Deployment Information:**
- **Live Application:** https://chamber-music-fullstack-deploy.vercel.app/
- **Frontend Repository:** `chamber-music-fullstack-full/frontend/`
- **Backend Repository:** `chamber-music-fullstack-full/backend/`
- **Core Harmonization Engine:** `chamber-music-fullstack-full/backend/src/harmonize-core.ts` (2,385 lines)

**Key Technical Specifications:**
- **Supported Input Formats:** MIDI (.mid, .midi), MusicXML (.xml, .musicxml)
- **Supported Output Formats:** MusicXML (harmony-only and combined)
- **Maximum File Size:** 50MB
- **Maximum Instruments:** 4
- **Processing Time:** 1-60 seconds (typically 1-5 seconds for standard melodies)
- **Supported Instruments:** Violin, Viola, Cello, Flute, Oboe, B-flat Clarinet, Bassoon, B-flat Trumpet, F Horn, Tuba, Soprano, Tenor Voice

**API Endpoints:**
- `POST /api/harmonize` - Main harmonization endpoint
- `GET /health` - Health check endpoint

### Appendix E: Validation Study Results

The validation study comparing existing AI music tools (Klangio, Remusic, Suno AI, ElevenLabs) revealed critical gaps that Harmony Forge addresses:

| Gap | Evidence | Harmony Forge Solution |
|-----|----------|----------------------|
| Lack of Symbolic Output | 100% of audio tools produced MP3/WAV files | Generates MusicXML compatible with notation software |
| Absent Generative Control | Transcription tools cannot compose new parts | Rule-based harmonization engine generates new parts |
| Failure to Adhere to Constraints | Average adherence score 1.25/5.0 for difficulty/instrumentation | Deterministic generation with instrument selection and validation |

These findings directly informed the design and development priorities for Harmony Forge.

