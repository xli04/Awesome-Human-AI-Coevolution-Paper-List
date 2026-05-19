# Blog source script — synced with `index.html`

> **How to use this file.** This mirrors the live text in `index.html`
> block for block. Edit the prose here, keep the `[[labels]]` and section
> headers intact, then ask me to "pull the updates into index.html" and I
> will map each block back to its element. Don't edit the `[[labels]]`
> themselves — they are the sync anchors. You can freely rewrite anything
> under them. Style rule still in force: **no em/en dashes** anywhere
> (use commas, periods, colons, or parentheses).

---

## MASTHEAD

[[eyebrow]]
Position paper companion · 2026 · Plain-language read · 9 min

[[title]]
AI Is Evolving. *Are You?*
*(the italic part "Are You?" renders in clay)*

[[subtitle]]
The more capable AI gets, the more skill it takes to use it well. That skill is yours to keep evolving.

[[intro-1]]
A friend uses ChatGPT to draft an email to her boss. She skims it, hits send, feels efficient. However, the reply comes back confused. She reads her own email, really reads it for the first time, and realizes she doesn't quite agree with what she sent under her own name.

[[intro-2]]
This is the quiet pattern of modern AI use. We ask. We accept. We ship. Each moment feels like a small win. Stack them together, and the muscles we need to use well (judging, verifying, paying attention) get a little weaker each time we skip them.

[[byline]]
A plain-language companion to *our position paper*
"Human Evolution Should Be Treated as a Goal in Human-AI Co-Evolution"

---

## FIGURE 1 (hero diagram labels)

[[fig-eyebrow]]
Our view · Figure 1

[[fig-title]]
Human Evolution as a **goal** of Human-AI Co-Evolution

[[fig-node-ai]]
AI Improves

[[fig-node-human]]
Human Evolution

[[fig-arc-top]]
Better Feedback

[[fig-arrow-middle]]
New Skills Demanded

[[fig-loop-right]]
Better AI Utilization

[[fig-caption]]
Human evolution drives *better AI usage*, and *better AI*.
*("better AI usage" renders clay, "better AI" renders teal)*

---

## SECTION 01 — The conversation we're not having

[[s01-pullquote]]
Human evolution makes us use AI more effectively. Better usage feeds back into better AI.

[[s01-heading]]
The conversation we're not having

[[s01-intro]]
Most of what you hear about AI focuses on one side of the equation: making the AI smarter. **We think this is the wrong place to put all the attention.** Our position paper argues that *human evolution should be treated as a goal within human-AI co-evolution, not just a means to better AI*. As we delegate more work to AI, the skills we need to use increasingly capable AI well don't appear automatically. The same automation that makes us productive often removes our chances to practice them.

[[s01-body-1]]
When you silently accept a polished-but-wrong AI answer, that's not just a personal cost. The signal, *"human approved"*, flows into how the next generation of AI is trained. Models learn that confident, agreeable answers get rewarded. The result is sycophantic AI taught by humans who stopped checking.

[[s01-body-2]]
The uncomfortable question: as AI gets dramatically more capable, can *we* use it well naturally? Or do we need something else?

---

## SECTION 02 — Four phases of using AI

[[s02-heading]]
Four phases of how humans use AI, and where things quietly break

[[s02-intro]]
We mapped four phases of how people actually use AI, based on how much work you hand over. AI brings a new empowerment and a new risk at each phase. Based on this insight, we suggest a skill for humans to practice and an interaction pattern for AI to adapt at that phase.

### Phase 1 card

[[p1-tag]] Phase 1
[[p1-name]] Tool
[[p1-label]] You ask, it answers.
[[p1-scenario]] You: "How do I use the TensorFlow package?" → AI: "To use it, first install it, then ..."
[[p1-breaks]] **Your reasoning gets foggy.** It's so easy to get an answer that you stop forming your own first. You drift toward passive acceptance.
[[p1-practice]] **Critical thinking.** Before asking, predict the answer yourself. Then compare. The AI becomes feedback on your reasoning instead of a substitute for it.
[[p1-aiadapation]] Show uncertainty. Surface the evidence. Ask what *you* already think before answering.
[[p1-stat]] **+18%** — Doctors who trusted AI heavily accepted that many more *misdiagnoses* than doctors who trusted it less. *(cite: Srinivasan et al., 2025)*

### Phase 2 card

[[p2-tag]] Phase 2
[[p2-name]] Assistant
[[p2-label]] You delegate, it produces.
[[p2-scenario]] You: "Implement this function, get_ID." → Copilot: "def get_id(): ..."
[[p2-breaks]] **Verification goes shallow.** Polished output looks right. You check less and start trusting surface signals (length, formatting, confident tone) instead of substance.
[[p2-practice]] **Evaluative expertise.** Decide what tests an output must pass *before* you generate it. Ask for two or three versions, and if they disagree, look harder.
[[p2-aiadapation]] Stop hiding the work behind a polished draft. Show assumptions. Point at where it's most likely wrong. Surface disagreements across attempts.
[[p2-stat]] **40%** — of code written with GitHub Copilot in one study had security vulnerabilities. Developers rated their Copilot work as *more* secure than their solo work. *(cite: Perry et al., 2023; Pearce et al., 2022)*

### Phase 3 card

[[p3-tag]] Phase 3
[[p3-name]] Executor
[[p3-label]] You set a goal, it runs a whole workflow.
[[p3-scenario]] You: "Make an intro page for our product." → Claude Code: "(writes, tests, and revises the page)"
[[p3-breaks]] **Oversight breaks down.** Watching is harder than driving. You miss the intermediate cues you'd catch while operating, and you're slower to intervene when things drift.
[[p3-practice]] **Metacognitive monitoring.** Decide in advance where you'll check in. Find the steps that matter most and concentrate attention there, instead of skimming thinly.
[[p3-aiadapation]] Don't run silently to the finish. Surface progress. Pause at checkpoints. Flag low confidence or risky actions.
[[p3-stat]] **97.4%** — of users in one experiment with browser agents failed to interrupt the agent when it was about to accept a malicious privacy policy on their behalf. They were watching. They weren't really seeing. *(cite: Chen et al., 2025)*

### Phase 4 card

[[p4-tag]] Phase 4 (near future)
[[p4-name]] Organization
[[p4-label]] You set direction; AI coordinates a system of agents.
[[p4-scenario]] You: "Build this database system from scratch." → Meta-agent: "Agent 1: infra. Agent 2: interfaces. ..."
[[p4-breaks]] **Governance becomes opaque.** You see the final output, not how work was divided, rerouted, or redone. When something's off, you can't tell whether one component failed or the whole system was pointed at the wrong target.
[[p4-practice]] **Systems thinking.** Define rules before you deploy: what's forbidden, where the risk thresholds are, what gets escalated. Then audit *samples* of trajectories.
[[p4-aiadapation]] Summarize coordination decisions in plain language. Preserve audit trails linking actions to the original goal. Flag high-risk branches.
[[p4-stat]] Phase 4 is forward-looking. The risk is structural: *outcome-only feedback* can't tell whether a failure came from one weak agent or from bad orchestration, so the coordination layer stays under-improved.

<!-- [[s02-takeaway]]
**The pattern that repeats** — Each phase gives you more leverage and removes a chance to practice the skill that makes the leverage safe. The skill doesn't fall off a cliff. It thins out. Then one day you notice you're trusting an answer because it looks confident, not because you checked. -->

---

## SECTION 03 — Where are you on this framework? (interactive heatmap)

[[s03-heading]]
Where are you in this framework?

[[s03-intro-1]]
Not every job sits in the same phase. A radiologist reading scans with AI lives in Phase 1 or 2. A software engineer running coding agents is deep in Phase 3. A researcher coordinating autonomous research systems brushes against Phase 4.

[[s03-intro-2]]
We classified **341 white-collar occupations** across these phases using two public adoption datasets and an index of underlying AI capability. **Click any cell** to see the occupations in that bucket.

[[s03-heatmap-caption]]
AI integration phases across white-collar occupation groups · N = 341 · "ᴱ" marks *emerging* cohorts where frontier research is starting to push the work into the next phase

[[s03-heatmap-empty]]
Click any cell above to see the occupations in that bucket.

[[s03-body]]
A quick way to locate yourself if your exact role isn't listed: *what's the largest unit of work you currently hand to AI without checking each step?* A sentence? A document? A whole task? A project farmed out across agents? That's your phase, and it's the skill being practiced less every time you hand off another piece.

### Heatmap click-through blurbs (shown when a cell is clicked)

[[blurb-p1]] Phase 1 (Tool, stable) — AI is used as a **tool**: knowledge access, look-ups, explanations. Humans still execute the work.
[[blurb-p2e]] Phase 2 Emerging — Currently Phase 1, but research signals are pushing this work toward AI **assisting in production**.
[[blurb-p2]] Phase 2 (Assistant, stable) — AI is used as an **assistant**: producing drafts, snippets, and partial artifacts that humans verify and ship.
[[blurb-p3e]] Phase 3 Emerging — Currently Phase 2, but frontier systems are pushing this work toward **autonomous workflow execution**.
[[blurb-p3]] Phase 3 (Executor, stable) — AI **runs whole workflows** end-to-end. Humans set goals and supervise, not execute.
[[blurb-p4e]] Phase 4 Emerging — Currently Phase 3, but managed-agent architectures are pushing this work toward **system-level coordination**.

---

## SECTION 04 — Three habits to start practicing this week

[[s04-heading]]
Three habits to start practicing this week

[[s04-intro]]
Three habits, small enough to start today, that map onto the skills above:

[[habit-1-name]] Pre-think
[[habit-1-body]] Before you ask, take thirty seconds to write down what you think the answer is. Then ask. Then compare. This one habit changes AI from "answer machine" to "thinking partner."

[[habit-2-name]] Critique
[[habit-2-body]] Read every AI output once with the assumption that it's wrong somewhere. The flaw is usually in the spot that sounds the most confident.

[[habit-3-name]] Disconnect
[[habit-3-body]] Once a week, do a task you usually delegate, entirely without AI. Not because AI is bad, but because this is how you check whether the underlying skill is still there.

[[s04-takeaway]]
**Why this works** — These aren't anti-AI practices. They're what makes pro-AI use sustainable. Each one carves out a small space where you do work AI would otherwise absorb, so the underlying capability stays alive when AI is wrong or unavailable.

---

## SECTION 05 — The future we're betting on

[[s05-heading]]
The future we're betting on

[[s05-body-1]]
There's a version of the future where AI gets dramatically more capable and humans dramatically less so, where we drift into a world we no longer understand and can't course-correct. It's the natural endpoint of a feedback loop we're already running.

[[s05-body-2]]
There's another version. In it, AI runs fast and humans see far. AI handles volume and humans handle values. Both sides grow into roles that fit together: academia teaches phase-specific skills, industry builds review pipelines and audit trails into how agents are deployed, society sets rules so "human oversight" matches what humans can realistically see.

[[s05-body-3]]
That future doesn't happen by accident. It depends on humans who keep growing, not just the tools they build. The good news: it starts the next time you open a chat window, when you pause for thirty seconds before you ask.

[[s05-pullquote]]
AI runs fast. Humans see far. The future depends on both.

---

## FOOTER

[[footer-1]]
Based on the position paper "Human Evolution Should be Treated as a Goal in Human-AI Co-Evolution."

[[footer-2]]
Read the full paper · Phase distribution: 341 occupations, derived from Anthropic Labor Report (2026), Microsoft AI Applicability (2025), and Eloundou et al. (2024)
