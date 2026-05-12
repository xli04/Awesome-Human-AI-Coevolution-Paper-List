export const SITE_TITLE = 'Human–AI Coevolution Index';
export const SITE_DESCRIPTION =
  'An index of research on how humans must evolve to use AI well as AI advances. Organized by the four-phase framework — Humans Use AI as Tool, Assistant, Executor, Organization.';
export const REPO_OWNER = 'xli04';
export const REPO_NAME = 'Awesome-Human-AI-Coevolution-Paper-List';
export const REPO_URL = `https://github.com/${REPO_OWNER}/${REPO_NAME}`;
export const REPO_RAW_BLOB = `${REPO_URL}/blob/main`;

// ─── Secondary axis: 5 paper-theme categories ─────────────────────

export const ENV_ORDER = [
  'Collaboration & Co-Creation',
  'Mutual Adaptation',
  'Human Feedback Loops',
  'Longitudinal HCI Studies',
  'Position & Survey',
] as const;

/** 2-letter abbreviation per category. */
export const ENV_ABBREV: Record<string, string> = {
  'Collaboration & Co-Creation': 'CC',
  'Mutual Adaptation': 'MA',
  'Human Feedback Loops': 'HF',
  'Longitudinal HCI Studies': 'LH',
  'Position & Survey': 'PS',
};

/** Backwards-compat alias for the marker map. */
export const ENV_EMOJI = ENV_ABBREV;

// ─── Primary axis: the four-phase framework ────────────────────────

export const PHASE_ORDER = [
  'phase-1',
  'emerging-phase-2',
  'phase-2',
  'emerging-phase-3',
  'phase-3',
  'emerging-phase-4',
  'phase-4',
  'framework',
] as const;

export type PhaseTag = typeof PHASE_ORDER[number];

/** Short label for the masthead/filter UI. */
export const PHASE_SHORT: Record<string, string> = {
  'phase-1':          'Phase 1',
  'emerging-phase-2': 'Emerging Phase 2',
  'phase-2':          'Phase 2',
  'emerging-phase-3': 'Emerging Phase 3',
  'phase-3':          'Phase 3',
  'emerging-phase-4': 'Emerging Phase 4',
  'phase-4':          'Phase 4',
  'framework':        'Framework',
};

/** Single-token tag rendered in tables and metadata rows. */
export const PHASE_CODE: Record<string, string> = {
  'phase-1':          'P1',
  'emerging-phase-2': 'EP2',
  'phase-2':          'P2',
  'emerging-phase-3': 'EP3',
  'phase-3':          'P3',
  'emerging-phase-4': 'EP4',
  'phase-4':          'P4',
  'framework':        'FW',
};

/** Full title + role + risked capability. Titles follow the position
 * paper's "Humans Use AI as X" phrasing — keeping humans as the
 * active subject and AI as the tool/role they delegate to. */
export const PHASE_HEADINGS: Record<string, { title: string; role: string; capability: string; blurb: string }> = {
  'phase-1': {
    title: 'Humans Use AI as Tool',
    role: 'Human: High · AI: Low',
    capability: 'Critical thinking',
    blurb: 'Humans use AI to answer questions. To use AI well here, humans must sustain critical thinking — comparing AI outputs against their own reasoning rather than absorbing them passively. The capability erodes through uncritical acceptance, and the user feedback that erosion produces pushes models toward sycophancy.',
  },
  'emerging-phase-2': {
    title: 'Tool → Assistant',
    role: 'Bridge phase',
    capability: 'Reasoning + early evaluation',
    blurb: 'Papers that bridge reasoning-level use with artifact production. Humans use AI to prompt their thinking but begin to produce drafts or ideation material that needs evaluation, not just judgement.',
  },
  'phase-2': {
    title: 'Humans Use AI as Assistant',
    role: 'Human: High · AI: Moderate',
    capability: 'Evaluative expertise',
    blurb: 'Humans use AI to produce bounded artifacts — drafts, code snippets, partial implementations — and verify them. To use AI well here, humans must sustain evaluative expertise: knowing what good work satisfies, including failure modes. The capability erodes when polished output is accepted on surface signals.',
  },
  'emerging-phase-3': {
    title: 'Assistant → Executor',
    role: 'Bridge phase',
    capability: 'Evaluation + early monitoring',
    blurb: 'Papers that bridge artifact-level assistance with end-to-end autonomy. Humans still drive the workflow but begin to delegate sequences of steps, demanding monitoring on top of evaluation.',
  },
  'phase-3': {
    title: 'Humans Use AI as Executor',
    role: 'Human: Moderate · AI: High',
    capability: 'Metacognitive monitoring',
    blurb: 'Humans use AI to complete end-to-end workflows, setting goals and intervening when execution drifts. To use AI well here, humans must practice metacognitive monitoring — selective inspection of where the workflow can fail. The capability erodes through passive supervision, producing scaled errors humans cannot catch in time.',
  },
  'emerging-phase-4': {
    title: 'Executor → Organization',
    role: 'Bridge phase',
    capability: 'Monitoring + early governance',
    blurb: 'Papers that bridge autonomous-agent use with system-level coordination — governance-layer interventions, constitutional / RLAIF systems, ecosystem-level feedback dynamics, and the model-collapse line. They argue toward Phase 4 governance without demonstrating a domain having fully arrived there.',
  },
  'phase-4': {
    title: 'Humans Use AI as Organization',
    role: 'Human: Low · AI: Extremely High',
    capability: 'Systems thinking',
    blurb: 'Humans use AI to coordinate systems of work across many agents. To use AI well here, humans must develop systems thinking — shaping the system that produces actions rather than inspecting each action. The position paper states that no domain has fully entered Phase 4 yet, so this bucket is intentionally empty; the Emerging Phase 4 papers above are the closest existing literature.',
  },
  'framework': {
    title: 'Surveys & Position Papers',
    role: 'Scaffolding',
    capability: 'Spans phases',
    blurb: 'Surveys, position pieces, and theoretical frameworks that span multiple phases — scaffolding for how to think about humans using AI well, rather than grounded evidence for any one phase.',
  },
};
