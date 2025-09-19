# Reflection: Literature Review Summaries (Dulf Vincent Genis)

---


## Source 1
**Citation:**  
Tchemeube, R. B., Ens, J., Plut, C., Pasquier, P., Safi, M., Grabit, Y., & Rolland, J. B. (2025). Evaluating human-AI interaction via usability, user experience and acceptance measures for MMM-c: A creative AI system for music composition. [arXiv:2504.14071](https://arxiv.org/abs/2504.14071)

**Summary:**
This paper addresses the problem of understanding user adoption and experience with AI-driven co-creative music composition systems, particularly for expert composers, where prior research often focused solely on generative models rather than practical interfaces. The authors evaluated the Multi-Track Music Machine (MMM), a generative transformer model, integrated into Cubase as a simplified "1-parameter" plugin called MMM-Cubase (MMM-C), to enable human-AI co-composition. Their mixed-methods study measured usability, user experience, and technology acceptance among hobbyist and professional expert composers using various tasks like arrangement and original composition. Findings showed positive usability and acceptance scores, with users appreciating the novelty and ease of use. However, a critical limitation emerged: users struggled significantly with controllability and predictability due to the single "temperature" parameter, expressing a strong desire for more flexibility and additional controls to steer the AI's output effectively.

**Insights:**
1. Controllability is paramount for satisfying human-AI co-creation, especially for experts. While MMM-C was easy to use, the single "temperature" parameter was deemed insufficient for expert composers to predictably steer the AI, leading to frustration and a feeling that the process was "more random than creative". This highlights that a basic interface, despite powerful underlying AI, significantly limits creative control.
2. Expressiveness is a key challenge for AI-generated music. "Expressiveness" was identified as the least performing metric in the study, directly correlated with users' inability to control or steer the system with limited parameters. This reinforces that simply generating "musically sound" notes isn't enough; the output needs to convey desired emotional and stylistic nuances which requires more user control.
3. AI can be a valuable source of novelty, surprise, and enjoyment, even with limitations. Despite the challenges in control, participants reported positive experiences of novelty, surprise, and enjoyment from using MMM-C, with some explicitly stating it helped them overcome "writer's block" and rediscover the joy of composing. This suggests AI's strong potential as an inspiration engine and creative springboard.

**Limitations/Risks:**
1. Limited controllability of the "1-parameter" interface. The core limitation of the MMM-C system was its intentional design with only a single "temperature" parameter for control. This severely restricted users' ability to achieve desired musical outcomes and explicitly led to low expressiveness scores and a perception of unpredictability, hindering deeper co-creation.
2. Potential for overwhelm/decision paralysis with more controls. While the study highlights the need for more controls, an implicit risk for future iterations (and our project) is the complexity of designing these additional parameters to be intuitive and not overwhelm the user. The challenge lies in providing sufficient control without leading to "decision paralysis" or making the system too complex, especially if catering to novices as well.

**Concrete Idea for the Project:**
- Prioritize a comprehensive and intuitive parameter design for our AI chamber music tool beyond just a "difficulty level." Specifically, expose multiple "attribute controls" like instrument-specific note density, polyphony range, duration controls, and perhaps stylistic controls directly within the user interface. This would allow users (from beginners to experts) to have granular control over the generated parts, fostering expressiveness and predictability, and enhancing their sense of creative ownership.

---


## Source 2
**Citation:**  
Fu, Y., Newman, M., Going, L., Feng, Q., & Lee, J. H. (2025, July). Exploring the Collaborative Co-Creation Process with AI: A Case Study in Novice Music Production. In Proceedings of the 2025 ACM Designing Interactive Systems Conference (pp. 1298-1312). [https://dl.acm.org/doi/full/10.1145/3715336.3735829](https://dl.acm.org/doi/full/10.1145/3715336.3735829)

**Summary:**
This paper explores the underexplored co-creative processes of human-AI collaboration, particularly in group settings with novice users creating music over extended periods. The authors conducted a 10-week case study where nine undergraduate novice students, organized into teams, used various AI tools to create three original music tracks from ideation to release on Spotify. Their mixed-methods approach involved reviewing team artifacts (e.g., process logs, published songs) and conducting in-depth interviews. Findings indicate that AI significantly accelerates ideation, but compresses the traditional preparation stage, leading to challenges in idea selection and validation due to an overload of AI-generated options and limited domain knowledge. A novel "collaging and refinement" stage emerged, where users painstakingly combined diverse, often inflexible, AI outputs with human-created elements into cohesive works. The study also revealed that AI mediates social dynamics, boosts self-efficacy, yet can constrain emotional expression and artistic exploration, leading to a desire for more human agency and control.

**Insights:**
1. The "Collaging and Refinement" stage is a significant bottleneck. A new and challenging stage emerged where users had to integrate diverse AI-generated outputs (melodies, chords, vocals from different tools) with human-created elements. This process was described as time-consuming and technically challenging because AI audio outputs are often "fixed" (WAV/MP3) and hard to manipulate, making it difficult to adjust individual notes or tracks. This highlights a crucial area for design improvement: making AI outputs more flexible and editable.
2. Novices struggle with idea selection and validation due to overload and lack of domain knowledge. AI rapidly generates a plethora of ideas, but novice users, lacking deep domain expertise, feel overwhelmed by the sheer number of options and struggle to effectively validate them. This often leads to decision paralysis or reliance on subjective gut feelings ("it sounds good") rather than informed choices. Our project needs to provide scaffolding for idea evaluation.
3. Human emotional expression and agency remain paramount. Participants strongly criticized AI-generated music for lacking "emotional depth" and "rawness". They emphasized the importance of retaining human emotional involvement and personal creative identities to avoid AI overpowering human contribution. This underscores that our AI tool should support, rather than replace, human emotional input and provide means for users to maintain a strong sense of artistic ownership.

**Limitations/Risks:**
1. AI's inflexible audio output impedes integration. Many AI tools only provide fixed audio outputs (WAV/MP3 files), making it hard to manipulate individual notes or tracks. This inflexibility makes the collaging and refinement stage arduous and leads to promising ideas being abandoned simply because they cannot be made to "fit".
2. Risk of idea fixation and reduced artistic exploration. While AI acts as a powerful springboard for inspiration, its ability to deliver near-final or highly refined outputs can lead to over-reliance or idea fixation, causing creators to throw away ideas that could have been good if they had just developed them. For novices, impressive AI outputs can sometimes stifle the creative instincts.

**Concrete Idea for the Project:**
- Design the AI tool to produce flexible and easily editable outputs, specifically in formats that facilitate detailed adjustments for chamber music. Prioritize separate MIDI tracks and clearly defined audio layers for each generated instrument (cello, viola, 2nd violin, etc.). This will enable users to seamlessly integrate, refine, and edit the AI-generated parts within their DAWs or music notation software, streamlining the collaging and refinement stage and enhancing creative control and ownership.

---


## Source 3
**Citation:**  
Meerza, S. I. A., Sun, L., & Liu, J. (2025, May). Harmonycloak: Making music unlearnable for generative ai. In 2025 IEEE Symposium on Security and Privacy (SP) (pp. 430-448). IEEE. [https://ieeexplore.ieee.org/abstract/document/11023354](https://ieeexplore.ieee.org/abstract/document/11023354)

**Summary:**
This paper addresses the growing concern of unauthorized exploitation of musicians' copyrighted music by generative AI models, which can undermine artists' livelihoods and creative rights. The authors introduce HARMONYCLOAK, the first defensive mechanism designed to make instrumental music "unlearnable" for generative AI models. The method involves strategically embedding imperceptible error-minimizing noise into music data, tricking AI models into believing there is nothing significant to learn, thereby disrupting their ability to replicate musical structures and styles without compromising the music's perceptual quality for human listeners. Extensive experiments using objective metrics (e.g., training loss, FAD, Tonal Distance) and a subjective user study on state-of-the-art models like MuseGAN, SymphonyNet, and MusicLM validated HARMONYCLOAK's effectiveness. The findings consistently showed that models trained with unlearnable music produced significantly lower quality, less harmonic, and implausible outputs, while the original "cloaked" music remained perceptually identical to humans.

**Insights:**
1. Critical ethical and copyright concerns in generative AI. The rise of music-generative AI presents a significant threat regarding the unauthorized exploitation of musicians' copyrighted music. This includes the risk of AI inadvertently generating compositions similar to existing works, which can have severe consequences for artists' financial and creative rights. This underscores the importance of ethical considerations in AI music generation.
2. Feasibility of imperceptible "unlearnable" music. It is technically possible to apply imperceptible, error-minimizing noise to instrumental music, rendering it unlearnable for generative AI models without affecting human listening quality. This is achieved by leveraging psychoacoustic principles (frequency and temporal masking) and dynamic musical characteristics to conceal the noise within the music.
3. Measurable impact of unlearnability on AI output quality. HARMONYCLOAK effectively degrades the learning capability of generative AI models, leading to demonstrably poorer quality music outputs. Models trained on unlearnable music produced significantly lower scores across objective metrics (e.g., higher Empty Bars, higher Used Pitch Classes, higher Tonal Distance, lower Drum Pattern scores, higher FAD) and received significantly lower subjective user ratings for harmony, plausibility, and overall quality. This confirms that the defense works as intended by disrupting the AI's ability to learn meaningful musical patterns.

**Limitations/Risks:**
1. Limited scope for vocal-instrumental compositions. HARMONYCLOAK's current implementation primarily addresses instrumental music, acknowledging that vocals introduce additional layers of complexity (intricate harmonic structures, varying timbres, dynamic temporal characteristics) that may not be fully covered by the current approach. This implies that protecting vocal music from AI exploitation would require further specialized development.
2. Challenge of long-term effectiveness against evolving AI. A key challenge for HARMONYCLOAK (and similar defenses) is maintaining its long-term effectiveness against rapidly evolving AI technologies and new attack strategies. As AI models become more sophisticated, existing cloaking techniques may become less effective, necessitating continuous adaptation and research into robust perturbations.

**Concrete Idea for the Project:**
- Proactively address ethical considerations regarding training data and intellectual property (IP) for both the input melodies and generated outputs. Implement a transparent data sourcing policy for our AI model's training data, potentially prioritizing ethically sourced, licensed, or public-domain music. Explore providing a feature or guideline that allows users to "cloak" their own original melodic inputs or the AI-generated full ensemble parts from our tool before public distribution, empowering users to protect their creative work from being inadvertently learned and replicated by other future generative AI models.