# Reflection: Literature Review Summaries (Shivam Patel)

---

## 1. A systematic review of artificial intelligence-based music generation  
Civit, Miguel, et al. “A Systematic Review of Artificial Intelligence-Based Music Generation: Scope, Applications, and Future Trends.” Expert Systems with Applications, vol. 209, no. 1, Dec. 2022, p. 118190, www.sciencedirect.com/science/article/pii/S0957417422013537. Accessed 18 Sept. 2025.
[Link to article](https://www.sciencedirect.com/science/article/pii/S0957417422013537)

**Summary:**  
This review examines developments in AI-driven music generation, evolving from symbolic models to state-of-the-art deep learning methods. The authors categorize the research into symbolic, audio, and hybrid music generation, highlighting how the most common generator models were polyphonic models. These models use architectures such as RNNs, GANs, and Transformers that shape the quality of the output and provide different creative possibilities. The paper also expresses the challenges in availability of the dataset, encoding music, and evaluating effectiveness. 

**Insights:**  
1. The transition from the Markov model paired with a neural network to transformer based deep learning network marks great success in musical consistency, composition diversity, and output length.
2. The incorporation of symbolic (MIDI, sheet music) and audio (waveform, spectrogram) models allows a combination of compositional logic with realistic instrumentation.
3. Symbolic models lack user friendly interface that allows musicians to produce music in faster in real time for live performance scenarios while not compromising musical coherence and structure. 

**Implications:**  
- AI-generated music is starting to become indistinguishable from regular human compositions, especially in genres with dense pieces (pop, classical).
- The model/genre/data entanglement points to the future need for culturally diverse datasets and cross-cultural benchmarking.
- Polyphonic generators does not specify specific instrument assigned to a melody or assume that output will be produced by a polyphonic instrument.

**Limitations:**  
- Training data is non-western which limits creativity of output and limits latest model technology for other populations to generate music.
- There are numerous future applications of these models which are only starting to get discovered. A use case can look include musical composition for visual media. 

**Project Application:**  
Establish a user friendly interface that evaluates music following music theory by utilizing a two prong approach (symbolic and audio models) to create an initial prototype ready for user feedback cycles. Stress testing the system and analyzing outliers will help improve the model's capability. 

---

## Features, Models, and Applications of Deep Learning in Music Composition  
Chen Yanjun. “Features, Models, and Applications of Deep Learning in Music Composition.” American Journal of Information Science and Technology, vol. 9, no. 3, 15 July 2025, pp. 155–162, https://doi.org/10.11648/j.ajist.20250903.11. Accessed 19 Sept. 2025.
[Link to article](https://www.sciencepublishinggroup.com/article/10.11648/j.ajist.20250903.11)

**Summary:**  
This article provides an overview of deep learning practices for music generation. It Models such as RNNs, LSTMs, Transformers, GANs, CNNs, and diffusion models are observed. These model architectures handle the temporal dependencies and structural complexity inherent to music quite well. The research evaluates computational strength of transformers and slow generation speed of diffusion models. Potential applications in potential applications in music education, therapy, and entertainment are explored to develop guidance  for future music creation applications. The research concludes by explaining how it is advantageous to combine different model strengths to reveal new artistic expressions, originiality, and diversity in composition.

**Insights:**  
1. CNNs are efficient for capturing local features and and waveform audio generation but are not able to do well with long-range musical dependencies.
2. RNNs and LSTMs are strong at sequential data processing for smaller coherent and complex pieces.
3. Transformers capture sequential data using the self-attention mechanism which allows them utilize multiple models to consider audio acoustics and semantic information that is relevant with textual description. 
4. Diffusion models produce high quality audio content using a two staged cascaded model by encoding textual descriptions at higher computational costs with lower speed. 

2. **Implications:**  
- AI generated composition is adapting for music therapy, educational and learning tools, interactive entertainment systems, and artistic creation and performance.
- Combining transformer and diffusion audio models can be constructed for a more efficient and consistent hybrid model that uses less resources and gives more creative agency in music generation.


**Limitations/Risks:**  
- Transformers and diffusion models are powerful however, they demand high computational resources which can limit accessibility for smaller practitioners or real-time use.
- Slower generational speed (especially for diffusion models) can hinder output quality and decreases efficiency (uses more resources).
- Distinguising between original audio pieces and AI generated music will continue to be an issue as transformer models continue to produce higher quality, more realistic audio.

**Project Application:**  
Leverage transformed level architectures along with diffusion model for creating high-fidelity audio pieces based on text descriptions. Transformer models can help generate audio descriptions which will be useful for converting to sheet music. Exploring this text to music workflow using this hybrid model allows users to guide the model in a way that is expressive of their artistic creativity and intention with AI assistance. LSTM models can also be explored to add weights to the hybrid model so that it pre-trains on music theory rules for accurate and relevant results.

---
