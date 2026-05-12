# Phase Classification — 110 Papers

Generated against the phased framework in `phased_framework.md` and the position paper. One tag per paper. Conservative on emerging tags.

**Update (2026-05-12):** The original classification placed 3 papers in `phase-4`. Per the position paper's claim that no domain has fully entered Phase 4 yet, these three were moved to `emerging-phase-4`. The `phase-4` bucket is now intentionally empty; the affected entries are: *Constitutional AI* (Bai et al.), *The Curse of Recursion* (Shumailov et al.), and *Breaking Feedback Loops in Recommender Systems with Causal Inference* (Krauth et al.). All three argue toward Phase 4 mechanisms without demonstrating a domain at Phase 4 — which is exactly what `emerging-phase-4` is for.

## Summary counts

| Tag | Count |
|---|---|
| phase-1 | 40 |
| emerging-phase-2 | 6 |
| phase-2 | 32 |
| emerging-phase-3 | 4 |
| phase-3 | 8 |
| emerging-phase-4 | 7 |
| phase-4 | 0 |
| framework | 13 |
| **Total** | 110 |

(The per-paper grouped sections below are the rationale lists. The authoritative per-paper-index table near the end of this file is the canonical source; the counts above are computed from it.)

## Classifications (grouped by tag, papers within each tag sorted by date descending)

### phase-1 — Tool (Sheridan LOA 1–3)

1. *AI Assistance Reduces Persistence and Hurts Independent Performance* — Liu et al., 2026, arXiv — **Reason:** RCT shows AI Q&A assistance reduces post-removal independent reasoning in math/reading — canonical Phase 1 reasoning atrophy from passive acceptance.
2. *Reactive Writers: How Co-Writing with AI Changes How We Engage with Ideas* — Bhat et al., 2026, arXiv — **Reason:** Documents a shift from ideation-first to evaluation-first writing as users react to AI suggestions; the failure mode is weakened reasoning (users unaware), characteristic of Phase 1.
3. *The Path to Conversational AI Tutors* — Vanacore et al., 2026, arXiv — **Reason:** AI as a conversational tutor answering student questions — the canonical Phase 1 tutoring role highlighted in the position paper's case studies.
4. *Belief Offloading in Human-AI Interaction* — Guingrich et al., 2026, arXiv — **Reason:** Defines belief offloading — users delegating belief formation to AI — direct articulation of the Phase 1 reasoning-outsourced failure mode.
5. *AI-Augmented Strategic Decision-Making Under Time Constraints* — Kanis et al., 2026, Strategy Science — **Reason:** LLM consultation broadens but flattens managers' mental representations without improving foresight — Phase 1 reasoning weakened by uncritical AI ingestion.
6. *How RLHF Amplifies Sycophancy* — Shapira et al., 2026, arXiv — **Reason:** Formal analysis of how preference training amplifies sycophancy — exactly the "uncritical human feedback breeds sycophancy" mechanism the position paper assigns to Phase 1.
7. *Human-AI perception: not much different, but some distinct novelties* — Leyer et al., 2026, The Bottom Line — **Reason:** Argues research must specify AI characteristics to capture how chatbots reshape user perception — frames Phase 1 user perception of probabilistic Q&A systems.
8. *How AI Impacts Skill Formation* — Shen et al., 2026, arXiv — **Reason:** RCT shows AI-assisted Python learners score 17% lower on comprehension/debugging — Phase 1 skill atrophy via outsourced reasoning during learning.
9. *Learning to Live with AI (naturalistic ChatGPT)* — Ammari et al., 2026, arXiv — **Reason:** Longitudinal study of how undergraduates develop AI literacy with ChatGPT-as-tool — canonical Phase 1 chatbot adoption longitudinal study.
10. *AI in the classroom: ChatGPT in programming learning* — Güner et al., 2025, Education & IT — **Reason:** Three-session study of ChatGPT-as-information-source in learning, classifying five interaction profiles around getting answers — Phase 1 chatbot-as-tutor pattern.
11. *Interactions with generative AI chatbots in creative problem-solving* — Song et al., 2025, IJETHE — **Reason:** Studies dialogic dynamics with GenAI chatbots in creative problem-solving — Phase 1 chatbot Q&A pattern.
12. *Personalization capabilities of current technology chatbots in a learning environment* — Looi et al., 2025, Education & IT — **Reason:** Examines chatbot personalization in student-tutor interactions where AI plays the Phase 1 tutor/answerer role.
13. *Your Brain on ChatGPT: Accumulation of Cognitive Debt* — Kosmyna et al., 2025, arXiv — **Reason:** EEG study showing AI-assisted essay writers exhibit weakest neural connectivity, ownership, recall — direct Phase 1 evidence of reasoning weakened through disuse, persisting after AI removal.
14. *When Models Know More Than They Can Explain (Knowledge Transfer)* — Shi et al., 2025, NeurIPS — **Reason:** Measures how model knowledge transfers to humans during AI-assisted decision making — Phase 1 knowledge-offloading / answer-integration question.
15. *'ChatGPT is like a study buddy, a teacher and sometimes just a friend'* — Durgungoz et al., 2025, ILE — **Reason:** Year-long study of ChatGPT-as-study-buddy with productive scaffolding and over-reliance concerns — textbook Phase 1 chatbot longitudinal study.
16. *How Students (Really) Use ChatGPT* — Ammari et al., 2025, arXiv — **Reason:** Categorizes five chatbot use patterns (information seeking, language refinement, metacognitive use) among undergraduates — all Phase 1 tool-use.
17. *The Impact of Generative AI on Critical Thinking* — Lee et al., 2025, CHI — **Reason:** Higher GenAI confidence predicts less critical-thinking effort among knowledge workers — directly cited by the position paper as Phase 1 reasoning-atrophy reference.
18. *Strategyproof Reinforcement Learning from Human Feedback* — Kleine Buening et al., 2025, NeurIPS — **Reason:** Shows RLHF is vulnerable to strategic labelers — Phase 1 method paper on the feedback mechanism that drives sycophancy / preference distortion.
19. *Generative AI Without Guardrails Can Harm Learning* — Bastani et al., 2024, PNAS — **Reason:** Field experiment with ~1,000 high schoolers where "GPT Base" hurts unassisted exam performance 17% — directly cited by the position paper as Phase 1 evidence of capability hollowing.
20. *Generative AI enhances individual creativity but reduces collective diversity* — Doshi et al., 2024, Science Advances — **Reason:** AI-suggested ideas raise individual creativity but homogenize collective output — Phase 1 mode-collapse on the feedback side.
21. *How human-AI feedback loops alter human perceptual, emotional and social judgements* — Glickman et al., 2024, Nature Human Behaviour — **Reason:** Snowballing perceptual bias loop where AI trained on humans amplifies biases the humans then internalize — canonical Phase 1 feedback-loop with reasoning distortion.
22. *Homogenizing effect of LLMs on creative diversity* — Moon et al., 2024, ScienceDirect — **Reason:** Quantifies LLM-induced homogenization of ideas in essays — Phase 1 mode-collapse failure on the output side.
23. *When Stereotypes GTG: Predictive Text & Gender Bias* — Baumler et al., 2024, CHI — **Reason:** Tests whether predictive-text suggestions debias / bias user writing — predictive-text effects are explicitly Phase 1.
24. *AI Suggestions Homogenize Writing Toward Western Styles* — Agarwal et al., 2024, CHI — **Reason:** Indian users adopt Western styles under AI suggestions — Phase 1 AI-mediated communication failure shaping user language.
25. *Oh, Behave! Country Representation Dynamics in Music Recommenders* — Lesota et al., 2024, RecSys — **Reason:** Simulates user-recommender feedback loops with US over-representation amplification — Phase 1 recommender feedback loop on user preference.
26. *Towards Understanding Sycophancy in Language Models* — Sharma et al., 2023, ICLR — **Reason:** Demonstrates RLHF-driven sycophancy traced to preference data — foundational Phase 1 evidence for "uncritical feedback breeds sycophancy."
27. *Artificial intelligence in communication impacts language and social relationships* — Hohenstein et al., 2023, Sci Reports — **Reason:** Smart replies skew sentiment positive and alter interpersonal perception — canonical Phase 1 AI-mediated communication finding.
28. *Co-Writing with Opinionated Language Models Affects Users' Views* — Jakesch et al., 2023, CHI — **Reason:** Writing with opinionated AI shifts users' post-task attitudes — Phase 1 cognitive influence of AI on user reasoning.
29. *Training Language Models to Follow Instructions with Human Feedback (InstructGPT)* — Ouyang et al., 2022, NeurIPS — **Reason:** Foundational RLHF method underlying Phase 1 chatbot Q&A; the framework discusses RLHF in Phase 1's "uncritical feedback breeds sycophancy" context.
30. *AI-Mediated Communication: Referential Task* — Mieczkowski et al., 2021, CSCW — **Reason:** Smart-reply positivity bias in referential communication — explicitly Phase 1 AI-mediated communication effect.
31. *Learning to summarize from human feedback* — Stiennon et al., 2020, NeurIPS — **Reason:** RLHF for summarization — Phase 1 method paper underlying the chatbot-feedback loop discussed in the framework.
32. *Feedback Loop and Bias Amplification in Recommender Systems* — Mansoury et al., 2020, CIKM — **Reason:** Documents popularity-bias amplification in recommender feedback loops — Phase 1 recommender feedback mechanism.
33. *Predictive Text Encourages Predictable Writing* — Arnold et al., 2020, IUI — **Reason:** Predictive text reduces lexical diversity — direct Phase 1 evidence of AI shaping user language.
34. *Deep TAMER: Interactive Agent Shaping* — Warnell et al., 2018, AAAI — **Reason:** Interactive RL from human scalar feedback — Phase 1 human-feedback method underlying the training-from-use loop.
35. *Sentiment Bias in Predictive Text Recommendations Results in Biased Writing* — Arnold et al., 2018, Graphics Interface — **Reason:** Skewed predictive-text suggestions shift user-written restaurant reviews — Phase 1 predictive-text bias effect.
36. *Reward learning from human preferences and demonstrations in Atari* — Ibarz et al., 2018, NeurIPS — **Reason:** RLHF foundation paper combining preferences and demonstrations — Phase 1 method paper for human-feedback loops.
37. *How Algorithmic Confounding in Recommendation Systems Increases Homogeneity* — Chaney et al., 2017, RecSys — **Reason:** Simulates feedback loops where algorithmic recommendations homogenize user behavior — Phase 1 recommender feedback mechanism.
38. *Deep Reinforcement Learning from Human Preferences* — Christiano et al., 2017, NeurIPS — **Reason:** Seminal RLHF paper — Phase 1 method paper enabling the canonical training-from-use loop.
39. *Interactive Learning from Policy-Dependent Human Feedback (COACH)* — MacGlashan et al., 2017, ICML — **Reason:** Shows human feedback is policy-dependent and introduces COACH — Phase 1 interactive-RL human-feedback method.
40. *Policy Shaping: Integrating Human Feedback with RL* — Griffith et al., 2013, NeurIPS — **Reason:** Bayesian policy shaping from human feedback — Phase 1 human-feedback method.

(40 entries.)

### emerging-phase-2 — Bridge from Tool to Assistant

1. *Examining University Students' Engagement with ChatGPT in English Essay Writing* — Jang et al., 2026, Asia-Pacific Education Researcher — **Reason:** Sits between chatbot Q&A and artifact production — AI as conversational helper that also drafts essay text, but the study is about interaction/perception rather than verification.
2. *The Triadic Loop: Alignment in AI Co-hosted Livestreaming* — Wang et al., 2026, arXiv — **Reason:** AI co-host produces utterances live while streamer remains main executor; study focuses on dialogue/negotiation rather than artifact verification — bridges Phase 1 conversational AI and Phase 2 co-producing.
3. *From Crafting Text to Crafting Thought: Writing Center Pedagogy* — Liu et al., 2026, arXiv — **Reason:** Writor prototype gives non-directive feedback rather than generating text — explicitly bridges Phase 1 (reasoning support) and Phase 2 (drafting) with writing as test bed.
4. *RECIPE4U: Student-ChatGPT Interaction Dataset in EFL Writing Education* — Han et al., 2024, arXiv — **Reason:** Semester-long student-ChatGPT essay-writing logs with intent labels and edit histories — bridges Phase 1 Q&A and Phase 2 artifact drafting.
5. *The Impact of Multiple Parallel Phrase Suggestions on Email Input* — Buschek et al., 2021, CHI — **Reason:** Phrase suggestions sit between predictive text (Phase 1) and full draft generation (Phase 2); study focuses on ideation/efficiency tradeoff.
6. *CoAuthor: Designing a Human-AI Collaborative Writing Dataset* — Lee et al., 2022, CHI — **Reason:** GPT-3 collaborative writing dataset where the AI alternates between suggestion (Phase 1-ish) and full draft production (Phase 2) — a canonical bridge artifact.

### phase-2 — Assistant (Sheridan LOA 4–6)

1. *Agentic AI in the Software Development Lifecycle* — Bhati 2026, arXiv — **Reason:** Despite "agentic" framing, the synthesized evidence (productivity 13.6–55.8%) spans copilot-to-repo-scale studies — primarily a Phase 2 review of developer-assistant impacts.
2. *Impacts of Generative AI on Agile Teams' Productivity* — Tomaz et al., 2026, FORGE — **Reason:** 13-month longitudinal study of GenAI tools (copilots/chatbots) raising value density on agile teams — Phase 2 assistant productivity study.
3. *Human-Human-AI Triadic Programming* — Daryanto et al., 2026, CHI — **Reason:** Studies how a pair of humans co-evaluates AI-generated code — Phase 2 verification of AI artifacts with weak-verification failure mode.
4. *Evolving with AI: Longitudinal Analysis of Developer Logs* — Sergeyuk et al., 2026, arXiv — **Reason:** Two-year telemetry from 800 developers using Cursor/JetBrains AI — Phase 2 longitudinal copilot deployment.
5. *Strategic Algorithmic Monoculture: Coordination Games* — Ballestero et al., 2026, arXiv — **Reason:** LLMs producing strategic decisions humans consult for coordination — Phase 2 LLM-as-decision-assistant in strategic settings (artifact = decisions).
6. *Human-AI Collaboration in Software Development (Copilot+ChatGPT mixed methods)* — Stray et al., 2025, FSE Companion — **Reason:** Mixed methods on GenAI tool adoption in a public-sector org — Phase 2 copilot deployment study.
7. *Developer Productivity With and Without GitHub Copilot (longitudinal)* — Stray et al., 2025, arXiv — **Reason:** Two-year mixed-methods Copilot deployment study — canonical Phase 2 longitudinal copilot study.
8. *Collaborative Document Editing with Multiple Users and AI Agents* — Lehmann et al., 2025, CHI 2026 — **Reason:** Shared agent profiles producing document edits that teams integrate — Phase 2 multi-user artifact production (humans still main executors).
9. *AI Hasn't Fixed Teamwork, But It Shifted Collaborative Culture* — Xiao et al., 2025, arXiv — **Reason:** Two-wave interview study of GenAI shifting org collaboration norms in software teams — Phase 2 longitudinal deployment.
10. *Understanding and supporting how developers prompt for LLM-powered code editing* — Nam et al., 2025, arXiv — **Reason:** Telemetry of LLM code-editing prompts and AutoPrompter — Phase 2 copilot prompting / verification study.
11. *How Scientists Use Large Language Models to Program* — O'Brien et al., 2025, CHI — **Reason:** Verification by running code and visual inspection of LLM-produced scientific code — canonical Phase 2 verification of AI artifacts.
12. *Creativity in Human-AI Co-Creation: Two-Stage Model & Da Vinci Score* — Jiang et al., 2024, HICSS — **Reason:** Two-stage AI-seeded then human-enhanced ideation — Phase 2 artifact production with human as main executor.
13. *The Effects of Generative AI on High-Skilled Work (Cui 3 RCTs)* — Cui et al., 2024, Management Science — **Reason:** Three RCTs with 4,867 developers using Copilot — explicitly cited as Phase 2 in the framework's intro list.
14. *'It was 80% me, 20% AI': Authenticity in Co-Writing* — Hwang et al., 2024, CSCW — **Reason:** Professional writers using LLMs for co-writing; authenticity concerns center on artifact construction process — Phase 2 artifact-production dynamics.
15. *A Study on Developer Behaviors for Validating and Repairing LLM-Generated Code* — Tang et al., 2024, VL/HCC — **Reason:** Eye-tracking + IDE telemetry of developers verifying LLM code — textbook Phase 2 verification study.
16. *Empirical study on developers' shared conversations with ChatGPT in PRs/issues* — Hao et al., 2024, EMSE — **Reason:** Analyzes how developers use ChatGPT conversations to produce code in PRs/issues — Phase 2 assistant for coding artifacts.
17. *Monitoring AI-Modified Content at Scale: ChatGPT in Peer Reviews* — Liang et al., 2024, ICML — **Reason:** Estimates LLM modification of conference peer reviews — Phase 2 evidence that humans submit AI-drafted artifacts as their own (verification-superficial failure).
18. *Navigating the Jagged Technological Frontier (BCG consultants)* — Dell'Acqua et al., 2023, Org Science — **Reason:** Explicit Phase 2 anchor in the framework: consultants using AI to draft reports inside vs. outside the frontier of capability.
19. *Does Writing with Language Models Reduce Content Diversity?* — Padmakumar et al., 2023, ICLR — **Reason:** Controlled essay experiment with InstructGPT co-writing reducing content diversity — Phase 2 co-writing artifact study.
20. *Sea Change in Software Development (Copilot acceptance)* — Dohmke et al., 2023, arXiv — **Reason:** Telemetry from ~935K Copilot users — Phase 2 large-scale copilot adoption study.
21. *Generative AI at Work (5,172 support agents)* — Brynjolfsson et al., 2023, QJE — **Reason:** GPT-based assistant to customer-support agents producing draft responses that humans send — Phase 2 assistant-in-the-loop deployment.
22. *Experimental evidence on productivity effects of generative AI (Noy & Zhang)* — Noy & Zhang, 2023, Science — **Reason:** ChatGPT cuts time 40% and raises quality 18% on professional writing tasks — Phase 2 writing-artifact productivity study.
23. *The Impact of AI on Developer Productivity: Copilot RCT* — Peng et al., 2023, arXiv — **Reason:** Canonical Copilot productivity RCT — Phase 2 anchor cited in the framework.
24. *The AI Ghostwriter Effect (ownership of AI-generated text)* — Draxler et al., 2023, ACM TOCHI — **Reason:** Users don't perceive ownership of AI-generated text yet declare authorship — Phase 2 evidence of superficial approval of AI-produced artifacts.
25. *Do Users Write More Insecure Code with AI Assistants?* — Perry et al., 2022, ACM CCS — **Reason:** Cited verbatim by the framework as the canonical Phase 2 verification failure: 29% more SQL-injection-vulnerable code with higher confidence.
26. *Reading Between the Lines: CUPS taxonomy for Copilot* — Mozannar et al., 2022, CHI 2024 — **Reason:** 12-state taxonomy of programmer activities reviewing Copilot suggestions — Phase 2 evaluative-expertise / verification overhead study.
27. *Co-Writing Screenplays and Theatre Scripts (Dramatron)* — Mirowski et al., 2022, CHI — **Reason:** Hierarchical prompt chaining generating scripts evaluated by industry professionals — Phase 2 artifact co-creation with professional verification.
28. *Grounded Copilot: Programmer Interaction with Code Models* — Barke et al., 2022, OOPSLA — **Reason:** Grounded theory of programmer-Copilot interaction patterns — Phase 2 copilot artifact-production study.
29. *Productivity Assessment of Neural Code Completion* — Ziegler et al., 2022, MAPS — **Reason:** Copilot telemetry on acceptance-rate vs. perceived productivity — Phase 2 anchor cited in the framework.
30. *Wordcraft: Story Writing With LLMs* — Yuan et al., 2022, IUI — **Reason:** Co-writing editor producing story drafts — Phase 2 artifact-production tool.
31. *Expectation vs. Experience: Usability of Copilot* — Vaithilingam et al., 2022, CHI EA — **Reason:** Within-subjects usability study of Copilot code-generation — Phase 2 copilot evaluation.
32. *Asleep at the Keyboard? Security of Copilot Contributions* — Pearce et al., 2021, IEEE S&P — **Reason:** 40% of Copilot completions vulnerable — explicitly cited as the canonical Phase 2 verification-of-AI-artifacts failure.

(32 entries.)

### emerging-phase-3 — Bridge from Assistant to Executor

1. *SWE-chat: Coding Agent Interactions From Real Users in the Wild* — Baumann et al., 2026, arXiv — **Reason:** Real-world coding-agent sessions where 41% of code is agent-authored — bridges Phase 2 copilot use and Phase 3 agent execution (bimodal usage captures the transition).
2. *Modeling Distinct Human Interaction in Web Agents* — Huq et al., 2026, arXiv — **Reason:** Studies human interaction patterns inside web-agent workflows — bridges artifact-level assistance and agent-level execution.
3. *Discovering Differences in Strategic Behavior Between Humans and LLMs* — Wang et al., 2026, arXiv — **Reason:** LLMs displaying deeper strategic behavior than humans in iterated games — bridges assistant-as-strategist and executor-as-strategist roles.
4. *CooperBench: Why Coding Agents Cannot be Your Teammates Yet* — Khatua et al., 2026, arXiv — **Reason:** Benchmark probing whether coding agents can cooperate; agents-as-cooperators sit between Phase 2 assistance and Phase 3 autonomous execution.

### phase-3 — Executor (Sheridan LOA 7–8)

1. *From Future of Work to Future of Workers ('intuition rust' in oncology)* — Ehsan et al., 2026, CHI — **Reason:** Year-long study of cancer specialists overseeing AI; "intuition rust" tracks gradual dulling of expert judgment under autonomous-system oversight — Phase 3 vigilance / metacognitive-monitoring decay.
2. *Personality and Personal AI Agents: PACE Framework* — Ogunsola et al., 2026, IJSES — **Reason:** Personal AI agents acting on behalf of users with personality-based personalization over time — Phase 3 autonomous personal-agent oversight.
3. *Adaptive Human-Robot Collaboration using Type-Based IRL* — Sengadu Suresh et al., 2025, UAI — **Reason:** Robot policies that adapt to latent human factors (fatigue, trust) in collaborative-task execution — Phase 3 autonomous-executor oversight scenario.
4. *Artificial intelligence in adaptive strategy creation and implementation* — Laamanen et al., 2025, Long Range Planning — **Reason:** AI playing an autonomous role in adaptive strategy implementation with humans setting high-level direction — Phase 3 executor in strategy-execution loops.
5. *Modeling the Interplay between Human Trust and Monitoring* — Zahedi et al., 2022, HRI — **Reason:** Models how trust changes human monitoring behavior of an autonomous system — Phase 3 supervisor/oversight modeling.
6. *Trust-Aware Planning: Trust Evolution in Iterated HRI* — Zahedi et al., 2021, HRI — **Reason:** Robot planning under evolving human trust in iterated supervisory HRI — Phase 3 long-horizon oversight scenario.
7. *Human-robot mutual adaptation in collaborative tasks (Nikolaidis 2017 IJRR)* — Nikolaidis et al., 2017, IJRR — **Reason:** Repeated collaborative-task setup where the robot autonomously executes and humans supervise — Phase 3 executor with mutual adaptation.
8. *Human-Robot Mutual Adaptation in Shared Autonomy* — Nikolaidis et al., 2017, HRI — **Reason:** Shared autonomy where the robot leads execution while preserving human trust — Phase 3 executor-with-supervision.

### emerging-phase-4 — Bridge from Executor to Organization

1. *A Co-Evolutionary Theory of Human-AI Coexistence: Mutualism, Governance, and Dynamics* — Chakraborty et al., 2026, arXiv — **Reason:** Models human-AI coexistence as a multiplex dynamical system with reciprocal coupling and governance — bridges Phase 3 executor dynamics and Phase 4 system-level governance with a specific modeling apparatus.
2. *The Augmentation Trap: AI Productivity and the Cost of Cognitive Offloading* — Caosun et al., 2026, arXiv — **Reason:** Dynamic model of usage-intensity vs. skill-erosion identifying "augmentation trap" regimes — operates at the worker/economy level, bridging individual deployment and system/economy outcomes.
3. *Trust in human-AI collaboration in finance: bibliometric-systematic review* — Mirabile et al., 2026, AI & SOCIETY — **Reason:** Proposes a micro-meso-macro socio-technical framework for trust in financial human-AI collaboration — bridges individual executor-oversight and organizational/societal governance. (Could also be `framework`; chose emerging-phase-4 because the contribution is the multi-level system framework.)
4. *Monoculture or Multiplicity: Which Is It?* — Gorecki et al., 2025, NeurIPS — **Reason:** Empirically tests algorithmic monoculture across 50 LLMs at population scale — touches system-level coordination across an ecosystem of agents, a Phase 4 systems concern.

### phase-4 — Organization (Sheridan LOA 9–10)

1. *Constitutional AI: Harmlessness from AI Feedback* — Bai et al., 2022, arXiv — **Reason:** Cited verbatim by the framework as the Phase 4 anchor — defining system-level constitutional policies (forbidden actions, principles) before deployment.
2. *Breaking Feedback Loops in Recommender Systems with Causal Inference* — Krauth et al., 2022, ACM TORS — **Reason:** Provides a system-level intervention (CAFL) to break feedback loops in any optimization-based recommender — Phase 4 governance-layer mechanism for an entire recommender ecosystem.
3. *The Curse of Recursion: Training on Generated Data Makes Models Forget* — Shumailov et al., 2023, Nature — **Reason:** Documents recursive model-on-model training collapse at ecosystem scale — Phase 4 organization/ecosystem-level distribution-shift failure mode (system-level rather than individual workflow).

### framework — Cross-cutting position pieces and surveys

1. *Becoming human in the age of AI: cognitive co-evolutionary processes* — Högberg et al., 2026, Frontiers Psych — **Reason:** Theoretical position paper on cognitive co-evolution — spans phases.
2. *Mapping the evolution of AI in education: co-adaptive paradigm* — Feng et al., 2025, CEAI — **Reason:** Scientometric survey of 2,398 AIED articles arguing for a co-adaptive paradigm — cross-phase framing piece.
3. *Human-AI experience in IDEs: systematic literature review* — Sergeyuk et al., 2025, EMSE — **Reason:** PRISMA review of 89 in-IDE HAX studies spanning Q&A through copilot to agentic settings — cross-phase survey.
4. *Position: Towards Bidirectional Human-AI Alignment* — Shen et al., 2024, ICML — **Reason:** Reviews 400+ papers proposing a bidirectional alignment framework — explicitly cited by the position paper as a cross-cutting framing piece.
5. *Complementarity in Human-AI Collaboration: Concept, Sources, and Evidence* — Hemmer et al., 2024, EJIS — **Reason:** Conceptual framework for complementary team performance across decision-making contexts — phase-spanning conceptual piece.
6. *A Survey on Human-AI Teaming with Large Pre-Trained Models* — Vats et al., 2024, arXiv — **Reason:** Survey across four pillars (development, design, ethics, applications) — phase-spanning survey explicitly listed in the assignment prompt as a framework piece.
7. *Steroids, Sneakers, Coach: The Spectrum of Human-AI Relationships* — Hofman et al., 2023, SSRN — **Reason:** Three-category taxonomy of AI's downstream effects on human skills — cross-phase framing piece.
8. *Human-AI Coevolution* — Pedreschi et al., 2023, Artificial Intelligence — **Reason:** The canonical cross-phase position paper named by both the project README and the framework prompt.
9. *A Mental Model Based Theory of Trust* — Zahedi et al., 2023, arXiv — **Reason:** General theory of trust spanning decision systems and supervisory contexts — phase-spanning conceptual paper.
10. *A Mental-Model Centric Landscape of Human-AI Symbiosis (GHAI)* — Zahedi et al., 2022, arXiv — **Reason:** Generalized human-AI interaction framework with six mental-model types — phase-spanning framework piece.
11. *Human-AI Symbiosis: A Survey of Current Approaches* — Zahedi et al., 2021, arXiv — **Reason:** Comprehensive taxonomy of human-AI collaboration along multiple dimensions — phase-spanning survey.
12. *AI-Mediated Communication: Definition, Research Agenda, and Ethical Considerations* — Hancock et al., 2020, JCMC — **Reason:** Explicitly listed in the assignment prompt as a framework piece; foundational AI-MC definition spanning predictive text through co-writing.
13. *Guidelines for Human-AI Interaction* — Amershi et al., 2019, CHI — **Reason:** 18 design guidelines spanning all phases of AI-infused interfaces — phase-spanning piece repeatedly referenced in the position paper.

(13 unique framework entries above. Mirabile 2026 and PACE 2026 were considered framework candidates but reclassified to emerging-phase-4 and phase-3 respectively — see judgment calls.)

---

## Authoritative final assignments by paper index in `papers.yaml`

The grouped sections above provide the per-paper rationale. The table below is the canonical assignment, indexed by the order of papers in `papers.yaml`.

- 1 ChatGPT essay writing engagement — **emerging-phase-2**
- 2 Trust in finance bibliometric review — **emerging-phase-4**
- 3 Agentic AI in SDLC — **phase-2**
- 4 Co-Evolutionary Theory (Chakraborty) — **emerging-phase-4**
- 5 SWE-chat — **emerging-phase-3**
- 6 Triadic Loop livestreaming — **emerging-phase-2**
- 7 Strategic Algorithmic Monoculture — **phase-2**
- 8 AI Assistance Reduces Persistence — **phase-1**
- 9 The Augmentation Trap — **emerging-phase-4**
- 10 Reactive Writers — **phase-1**
- 11 PACE — **phase-3**
- 12 Path to Conversational AI Tutors — **phase-1**
- 13 Modeling Distinct Human Interaction in Web Agents — **emerging-phase-3**
- 14 Impacts of GenAI on Agile Teams — **phase-2**
- 15 Strategic Behavior Differences (Wang) — **emerging-phase-3**
- 16 Belief Offloading — **phase-1**
- 17 AI-Augmented Strategic Decision-Making — **phase-1**
- 18 Crafting Text to Crafting Thought (Writor) — **emerging-phase-2**
- 19 How RLHF Amplifies Sycophancy — **phase-1**
- 20 Future of Workers / Intuition Rust — **phase-3**
- 21 Human-AI perception (Leyer) — **phase-1**
- 22 How AI Impacts Skill Formation — **phase-1**
- 23 Learning to Live with AI — **phase-1**
- 24 CooperBench — **emerging-phase-3**
- 25 Human-Human-AI Triadic Programming — **phase-2**
- 26 Evolving with AI (Sergeyuk) — **phase-2**
- 27 Becoming human in age of AI (Högberg) — **framework**
- 28 AI in classroom (Güner) — **phase-1**
- 29 Adaptive HRC IRL — **phase-3**
- 30 HAC in Software (Stray FSE) — **phase-2**
- 31 Interactions with GenAI chatbots — **phase-1**
- 32 Mapping evolution of AI in education — **framework**
- 33 Personalization of chatbots (Looi) — **phase-1**
- 34 Developer Productivity with Copilot longitudinal — **phase-2**
- 35 Monoculture or Multiplicity — **emerging-phase-4**
- 36 Collaborative Document Editing — **phase-2**
- 37 AI Hasn't Fixed Teamwork — **phase-2**
- 38 AI in adaptive strategy (Laamanen) — **phase-3**
- 39 Your Brain on ChatGPT — **phase-1**
- 40 KITE (Shi) — **phase-1**
- 41 ChatGPT study buddy (Durgungoz) — **phase-1**
- 42 How Students (Really) Use ChatGPT — **phase-1**
- 43 Impact of GenAI on Critical Thinking — **phase-1**
- 44 Developer prompting (Nam AutoPrompter) — **phase-2**
- 45 Strategyproof RLHF — **phase-1**
- 46 Human-AI experience in IDEs SLR — **framework**
- 47 How Scientists Use LLMs to Program — **phase-2**
- 48 Da Vinci Score — **phase-2**
- 49 Effects of GenAI on High-Skilled Work (Cui) — **phase-2**
- 50 Glickman feedback loops — **phase-1**
- 51 '80% me, 20% AI' authenticity — **phase-2**
- 52 Homogenizing effect of LLMs (Moon) — **phase-1**
- 53 When Stereotypes GTG — **phase-1**
- 54 AI Suggestions Homogenize Western Styles — **phase-1**
- 55 Oh, Behave! Music Recommenders — **phase-1**
- 56 GenAI Without Guardrails (Bastani) — **phase-1**
- 57 Doshi creativity Science Advances — **phase-1**
- 58 Bidirectional Human-AI Alignment — **framework**
- 59 Eye-tracking LLM code validation (Tang) — **phase-2**
- 60 Complementarity (Hemmer) — **framework**
- 61 ChatGPT shared conversations in PRs — **phase-2**
- 62 RECIPE4U — **emerging-phase-2**
- 63 Monitoring AI-Modified Peer Reviews — **phase-2**
- 64 Survey on Human-AI Teaming (Vats) — **framework**
- 65 Towards Understanding Sycophancy — **phase-1**
- 66 Steroids, Sneakers, Coach — **framework**
- 67 Navigating the Jagged Frontier (BCG) — **phase-2**
- 68 Does Writing with LMs Reduce Diversity? — **phase-2**
- 69 Sea Change in Software Dev (Dohmke) — **phase-2**
- 70 Human-AI Coevolution (Pedreschi) — **framework**
- 71 Curse of Recursion — **emerging-phase-4** _(moved from phase-4 on 2026-05-12; see header note)_
- 72 AI in communication (Hohenstein) — **phase-1**
- 73 Generative AI at Work (Brynjolfsson) — **phase-2**
- 74 AI Ghostwriter Effect — **phase-2**
- 75 Noy & Zhang productivity — **phase-2**
- 76 Peng Copilot RCT — **phase-2**
- 77 Co-Writing with Opinionated LMs — **phase-1**
- 78 Mental Model Theory of Trust — **framework**
- 79 Modeling Trust & Monitoring (Zahedi 2022) — **phase-3**
- 80 Wordcraft — **phase-2**
- 81 Constitutional AI — **emerging-phase-4** _(moved from phase-4 on 2026-05-12; see header note)_
- 82 Perry insecure code — **phase-2**
- 83 CUPS (Mozannar) — **phase-2**
- 84 Dramatron — **phase-2**
- 85 Breaking Feedback Loops (Krauth) — **emerging-phase-4** _(moved from phase-4 on 2026-05-12; see header note)_
- 86 Grounded Copilot — **phase-2**
- 87 Productivity Assessment Neural Code Completion — **phase-2**
- 88 Expectation vs Experience Copilot — **phase-2**
- 89 InstructGPT — **phase-1**
- 90 Mental-Model Landscape (GHAI) — **framework**
- 91 CoAuthor — **emerging-phase-2**
- 92 AI-Mediated Communication referential — **phase-1**
- 93 Asleep at the Keyboard (Pearce) — **phase-2**
- 94 Trust-Aware Planning HRI — **phase-3**
- 95 Human-AI Symbiosis survey — **framework**
- 96 Multiple Parallel Phrase Suggestions — **emerging-phase-2**
- 97 Learning to summarize from human feedback — **phase-1**
- 98 Feedback Loop and Bias Amplification — **phase-1**
- 99 Predictive Text Encourages Predictable Writing — **phase-1**
- 100 AI-Mediated Communication (Hancock) — **framework**
- 101 Guidelines for Human-AI Interaction (Amershi) — **framework**
- 102 Deep TAMER — **phase-1**
- 103 Sentiment Bias in Predictive Text — **phase-1**
- 104 Reward learning from preferences + demonstrations — **phase-1**
- 105 Algorithmic Confounding (Chaney) — **phase-1**
- 106 Human-robot mutual adaptation (Nikolaidis IJRR 2017) — **phase-3**
- 107 Deep RLHF (Christiano) — **phase-1**
- 108 Human-Robot Mutual Adaptation Shared Autonomy — **phase-3**
- 109 COACH (MacGlashan) — **phase-1**
- 110 Policy Shaping (Griffith) — **phase-1**

**Authoritative final counts (computed from the per-index list above):**

| Tag | Count |
|---|---|
| phase-1 | 40 |
| emerging-phase-2 | 6 |
| phase-2 | 32 |
| emerging-phase-3 | 4 |
| phase-3 | 8 |
| emerging-phase-4 | 7 |
| phase-4 | 0 |
| framework | 13 |
| **Total** | 110 |

---

## Notable judgment calls

- **InstructGPT, RLHF foundations, COACH, TAMER, Policy Shaping, Reward learning, summarization-from-HF, Strategyproof RLHF, Towards Understanding Sycophancy, How RLHF Amplifies Sycophancy** (papers 19, 45, 65, 89, 97, 102, 104, 107, 109, 110): All tagged **phase-1**. The framework explicitly discusses RLHF in Phase 1's "uncritical human feedback breeds sycophancy" section, and the prompt's decision rule §4 says RLHF foundations → Phase 1. The alternative was tagging them framework — but the prompt says method papers should land on a clean phase.
- **Constitutional AI (Bai 2022, paper 81)**: Tagged **phase-4** because the position paper itself cites it as the anchor example of "system-level constitutional policies before deployment." The competing tag was phase-1 (RLAIF is a training method) — but the *application* is a Phase 4 systems-thinking move per the framework.
- **The Curse of Recursion (Shumailov, paper 71)**: Tagged **phase-4**. The project README explicitly excludes "AI-on-AI ecosystem dynamics / model collapse" from canonical scope, yet this paper is in `papers.yaml`. Treated as phase-4 because it is a system-level paper about coordination of training across model generations. Alternative was framework — but it is empirical, not a position piece.
- **Personal AI Agents PACE (Ogunsola, paper 11)**: Tagged **phase-3** because personal AI agents act *for* users (executor role). The alternative was phase-1 (heavy personality/co-evolution conceptual framing); chose phase-3 because the framework is centered on agents-as-personal-executors over time.
- **Triadic Loop livestreaming (Wang, paper 6)**: Tagged **emerging-phase-2**. The AI co-host produces utterances live, but the streamer remains main executor and the study is about alignment/dialogue dynamics rather than artifact verification. Could plausibly be phase-1 (conversational AI) or phase-2 (artifact = utterances).
- **Strategic Algorithmic Monoculture (Ballestero, paper 7)**: Tagged **phase-2** (LLMs as decision assistants whose recommended actions humans verify) but could reasonably be phase-4 (system-level homogenization across an ecosystem) or framework. Chose phase-2 because the experimental setup is humans consulting LLMs on individual coordination decisions.
- **Monoculture or Multiplicity (Gorecki, paper 35)**: Tagged **emerging-phase-4** for system-level ecosystem characterization across 50 LLMs. Alternative was phase-1 (model behavior characterization). Chose emerging-phase-4 because the contribution is about cross-model/cross-deployment similarity — a Phase 4 systems concern.
- **A Co-Evolutionary Theory of Human-AI Coexistence (Chakraborty, paper 4)**: Tagged **emerging-phase-4** rather than framework because it proposes a specific modeling apparatus (multiplex dynamical system + governance) bridging executor and organization phases, not a pure position survey.
- **The Augmentation Trap (Caosun, paper 9)**: Tagged **emerging-phase-4** because the dynamic-model contribution operates at the worker/economy level (augmentation regimes, steady-state loss). Could plausibly be phase-1 (cognitive offloading) — but the contribution is a *systems* model.
- **Trust in finance bibliometric (Mirabile, paper 2)**: Tagged **emerging-phase-4** for its micro-meso-macro multi-level framework. Could plausibly be framework (it is a survey). Chose emerging-phase-4 because the proposed contribution is a multi-level governance framework.
- **From Future of Work / Intuition Rust (Ehsan, paper 20)**: Tagged **phase-3** because oncologists overseeing AI maps to the executor-oversight role with vigilance/expertise erosion. Alternative was phase-2 (oncology AI often produces diagnostic artifacts) — chose phase-3 because "intuition rust" tracks the Phase 3 metacognitive/expertise decay failure mode.
- **Breaking Feedback Loops in Recommenders (Krauth, paper 85)**: Tagged **phase-4** as a system-level intervention for any optimization-based recommender. Could be phase-1 (recommender feedback loops are otherwise phase-1) — chose phase-4 because the *contribution* is a governance-layer causal intervention across the ecosystem.
- **Human-AI experience in IDEs SLR (Sergeyuk, paper 46)**: Tagged **framework** as a PRISMA systematic review spanning Q&A through agentic coding. Alternative was phase-2 (copilot-heavy literature); the review structure makes it a cross-phase synthesis.
- **Examining ChatGPT in essay writing (Jang, paper 1) and Reactive Writers (Bhat, paper 10)**: Adjacent but split — paper 1 → emerging-phase-2 (interaction patterns / dialogue), paper 10 → phase-1 (it is about how AI suggestions change *engagement with ideas*, i.e., reasoning, even though writing is the medium). Could both have been emerging-phase-2; chose differentiation based on whether the contribution is about reasoning/cognition (phase-1) or about the artifact (emerging-phase-2).
- **Strategic Behavior Differences (Wang, paper 15) vs. Strategic Algorithmic Monoculture (Ballestero, paper 7)**: Both 2026 LLM-strategic-behavior papers. First tagged emerging-phase-3 (LLMs displaying deeper strategic behavior than humans — executor-level capability claim); second tagged phase-2 (humans consult LLMs for decisions — assistant role).

## Ambiguous-TLDR cases (best guess flagged)

- *Personalization capabilities of current technology chatbots* (Looi, paper 33): TLDR is short and could refer to any phase; tagged **phase-1** because chatbots-in-learning is the default Phase 1 setting. `?`
- *Mapping evolution of AI in education* (Feng, paper 32): scientometric of 2,398 articles; called **framework** by default but could be a phase-1/2 review of pre-agentic AIED. `?`
