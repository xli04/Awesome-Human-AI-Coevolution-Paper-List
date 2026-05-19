"""
regen.py — canonical regen pipeline for the Human-AI Coevolution paper list.

Reads `papers.yaml` + `adjacent.yaml` (the source of truth), sorts by
date (newest first), and writes them back. Then regenerates the
README and statistics PNGs.

Outputs:

  papers.yaml                                — re-sorted in place
  adjacent.yaml                              — re-sorted in place
  README.md                                  — recent 500 + template
  readme_template/
    statistics/quarterly_trend.png
    statistics/keyword_bar_chart.png

Run from repo root:
  uv run scripts/regen.py
"""

from __future__ import annotations

import calendar
import logging
import re
import sys
from collections import Counter
from pathlib import Path
from typing import Any

import pandas as pd
import yaml


def _detect_repo_root() -> Path:
    cwd = Path.cwd()
    if (cwd / "papers.yaml").exists():
        return cwd
    return Path(__file__).resolve().parents[1]


REPO_ROOT = _detect_repo_root()
READMEDIR = REPO_ROOT / "readme_template"

# ─── Logging ────────────────────────────────────────────────────────
log_dir = READMEDIR / "logs"
log_dir.mkdir(parents=True, exist_ok=True)
logging.basicConfig(
    filename=log_dir / "error.log",
    level=logging.ERROR,
    format="%(asctime)s - %(levelname)s - %(message)s",
)

_warnings: list[str] = []


def warn(msg: str) -> None:
    _warnings.append(msg)
    print(f"  WARNING: {msg}", file=sys.stderr)


# ─── YAML I/O — preserves block style, multi-line strings ───────────

class LiteralStr(str):
    pass


def _literal_representer(dumper, data):
    return dumper.represent_scalar("tag:yaml.org,2002:str", data, style="|")


yaml.add_representer(LiteralStr, _literal_representer)


def load_yaml(path: Path) -> list[dict[str, Any]]:
    if not path.exists():
        return []
    docs = yaml.safe_load(path.read_text(encoding="utf-8")) or []
    if not isinstance(docs, list):
        raise SystemExit(f"{path} did not parse as a list")
    return docs


def write_yaml(path: Path, papers: list[dict[str, Any]], header: str) -> None:
    out: list[dict[str, Any]] = []
    for p in papers:
        cp = dict(p)
        if cp.get("tldr"):
            cp["tldr"] = LiteralStr(str(cp["tldr"]))
        if cp.get("bibtex"):
            cp["bibtex"] = LiteralStr(str(cp["bibtex"]))
        out.append(cp)
    body = yaml.dump(out, sort_keys=False, allow_unicode=True, width=120, default_flow_style=False)
    path.write_text(header + body, encoding="utf-8")


# ─── Date helpers ───────────────────────────────────────────────────

MONTHS_FULL = [
    "january", "february", "march", "april", "may", "june",
    "july", "august", "september", "october", "november", "december",
]


def parse_date_string(raw: str) -> pd.Timestamp:
    s = (raw or "").strip()
    m = re.match(r"^(\d{4})-(\d{1,2})-(\d{1,2})$", s)
    if m:
        return pd.Timestamp(int(m[1]), int(m[2]), int(m[3]))
    m = re.match(r"^(\d{4})-(\d{1,2})$", s)
    if m:
        last = calendar.monthrange(int(m[1]), int(m[2]))[1]
        return pd.Timestamp(int(m[1]), int(m[2]), last)
    m = re.match(r"^([A-Za-z]+)\s+(\d{1,2}),\s*(\d{4})$", s)
    if m:
        idx = MONTHS_FULL.index(m[1].lower())
        return pd.Timestamp(int(m[3]), idx + 1, int(m[2]))
    m = re.match(r"^([A-Za-z]+)\s+(\d{4})$", s)
    if m:
        idx = MONTHS_FULL.index(m[1].lower())
        last = calendar.monthrange(int(m[2]), idx + 1)[1]
        return pd.Timestamp(int(m[2]), idx + 1, last)
    m = re.search(r"\b(20\d{2})\b", s)
    if m:
        return pd.Timestamp(int(m[1]), 12, 31)
    return pd.NaT


def display_date(raw: str, ts: pd.Timestamp) -> str:
    if pd.isna(ts):
        return raw or ""
    s = (raw or "").strip()
    # Year-only: keep as bare "YYYY".
    if re.match(r"^\d{4}$", s):
        return f"{ts.year}"
    # Month-only: keep as "Month YYYY".
    if re.match(r"^(\d{4})-(\d{1,2})$|^[A-Za-z]+\s+\d{4}$", s):
        return f"{ts.strftime('%B')} {ts.year}"
    return ts.strftime("%B %d, %Y")


def date_to_iso(raw: str) -> str:
    """Canonicalize a date string to its narrowest ISO representation,
    preserving the precision of the input.

    Before: year-only inputs ("2026") fell through to the full
    YYYY-MM-DD branch because parse_date_string anchors them to
    Dec 31. That silently rewrote year-only dates to YYYY-12-31 in
    papers.yaml and made them look like real end-of-year dates in
    the UI. Fix: detect year-only inputs explicitly and emit just
    "YYYY".
    """
    ts = parse_date_string(raw)
    if pd.isna(ts):
        return raw or ""
    s = (raw or "").strip()
    # Year-only: preserve as bare "YYYY".
    if re.match(r"^\d{4}$", s):
        return f"{ts.year:04d}"
    # Month-only: "YYYY-MM" or "Month YYYY".
    if re.match(r"^(\d{4})-(\d{1,2})$|^[A-Za-z]+\s+\d{4}$", s):
        return f"{ts.year:04d}-{ts.month:02d}"
    return f"{ts.year:04d}-{ts.month:02d}-{ts.day:02d}"


# ─── Categories (Human-AI coevolution taxonomy) ─────────────────────

CATEGORY_KEYS = [
    "Collaboration & Co-Creation",
    "Mutual Adaptation",
    "Human Feedback Loops",
    "Longitudinal HCI Studies",
    "Position & Survey",
]

CATEGORY_ABBREV = {
    "Collaboration & Co-Creation": "CC",
    "Mutual Adaptation": "MA",
    "Human Feedback Loops": "HF",
    "Longitudinal HCI Studies": "LH",
    "Position & Survey": "PS",
}

# Phased framework — primary organizational axis.
PHASE_ORDER = [
    "phase-1",
    "emerging-phase-2",
    "phase-2",
    "emerging-phase-3",
    "phase-3",
    "emerging-phase-4",
    "phase-4",
    "framework",
]

PHASE_HEADINGS = {
    "phase-1":          ("Phase 1 — Humans Use AI as Tool",
                         "Humans use AI to answer questions. To use AI well here, humans must sustain **critical thinking** — comparing AI outputs against their own reasoning rather than absorbing them passively. The capability erodes through uncritical acceptance, and the feedback that erosion produces pushes models toward sycophancy."),
    "emerging-phase-2": ("Emerging Phase 2 — Tool → Assistant",
                         "Papers that bridge reasoning-level use with artifact production. Humans use AI to prompt their thinking but begin to produce drafts or ideation material that needs evaluation, not just judgement."),
    "phase-2":          ("Phase 2 — Humans Use AI as Assistant",
                         "Humans use AI to produce bounded artifacts (drafts, code snippets, partial implementations) and verify them. To use AI well here, humans must sustain **evaluative expertise** — knowing what good work satisfies, including failure modes. The capability erodes when polished output is accepted on surface signals."),
    "emerging-phase-3": ("Emerging Phase 3 — Assistant → Executor",
                         "Papers that bridge artifact-level assistance with end-to-end autonomy. Humans still drive the workflow but begin to delegate sequences of steps, demanding monitoring on top of evaluation."),
    "phase-3":          ("Phase 3 — Humans Use AI as Executor",
                         "Humans use AI to complete end-to-end workflows, setting goals and intervening when execution drifts. To use AI well here, humans must practice **metacognitive monitoring** — selective inspection of where the workflow can fail. The capability erodes through passive supervision, producing scaled errors humans cannot catch in time."),
    "emerging-phase-4": ("Emerging Phase 4 — Executor → Organization",
                         "Papers that bridge autonomous-agent use with system-level coordination. Includes governance-layer interventions on ecosystem feedback loops, constitutional / RLAIF systems, and the model-collapse line of work — contributions that argue *toward* Phase 4 governance without demonstrating a domain having fully arrived there."),
    "phase-4":          ("Phase 4 — Humans Use AI as Organization",
                         "Humans use AI to coordinate systems of work across many agents. To use AI well here, humans must develop **systems thinking** — shaping the system that produces actions rather than inspecting each action. No domain has officially entered Phase 4 yet, so this section is intentionally empty, and the **Emerging Phase 4** section above lists the papers that argue toward this mode."),
    "framework":        ("Surveys & Position Papers",
                         "Surveys, position pieces, and theoretical frameworks that span multiple phases — scaffolding for how to think about humans using AI well, rather than grounded evidence for any one phase."),
}


# ─── Markdown rendering for the README's recent-papers section ──────

def env_string(envs: list[str]) -> str:
    return ", ".join(f"[{e}]" for e in envs)


def kw_string(keywords: list[str]) -> str:
    return ", ".join(f"[{k}]" for k in keywords)


def md_entry_for_readme(p: dict[str, Any]) -> str:
    cats = p.get("envs", []) or []
    cat_codes = ", ".join(CATEGORY_ABBREV.get(c, c) for c in cats)
    cat_str = f"{cat_codes} ({', '.join(cats)})" if cats else "—"
    return (
        f"- [{p['title']}]({p.get('link', '')})\n"
        f"    - {', '.join(p.get('authors', []) or [])}\n"
        f"    - Institutions: {', '.join(p.get('institutions', []) or []) or '—'}\n"
        f"    - Date: {p.get('display_date', p.get('date', ''))}\n"
        f"    - Venue: {p.get('publisher', '')}\n"
        f"    - Category: {cat_str}\n"
        f"    - Keywords: {', '.join(p.get('keywords', []) or [])}\n"
        f"    - TLDR: {p.get('tldr', '')}\n"
    )


# ─── Main pipeline ──────────────────────────────────────────────────

def normalize_papers(papers: list[dict[str, Any]]) -> list[dict[str, Any]]:
    rows = []
    for p in papers:
        ts = parse_date_string(str(p.get("date", "")))
        p_norm = dict(p)
        p_norm["_ts"] = ts
        p_norm["display_date"] = display_date(str(p.get("date", "")), ts)
        iso = date_to_iso(str(p.get("date", "")))
        if iso:
            p_norm["date"] = iso
        rows.append(p_norm)
    rows.sort(
        key=lambda r: (r.get("_ts") if r.get("_ts") is not None else pd.Timestamp.min, r.get("title", "")),
        reverse=False,
    )
    rows.sort(key=lambda r: r.get("_ts") if r.get("_ts") is not None else pd.Timestamp.min, reverse=True)
    return rows


def emit_yaml(canonical: list[dict[str, Any]], adjacent: list[dict[str, Any]]) -> None:
    canonical_clean = [{k: v for k, v in p.items() if k not in ("_ts", "display_date")} for p in canonical]
    adjacent_clean = [{k: v for k, v in p.items() if k not in ("_ts", "display_date")} for p in adjacent]
    write_yaml(
        REPO_ROOT / "papers.yaml",
        canonical_clean,
        "# papers.yaml — canonical source of truth for the Human-AI Coevolution Paper List.\n"
        "# Edit this file to add or correct papers. `bibtex` is auto-generated;\n"
        "# set `bibtex_confirmed: true` after verifying against the official source.\n\n",
    )
    write_yaml(
        REPO_ROOT / "adjacent.yaml",
        adjacent_clean,
        "# adjacent.yaml — non-canonical entries useful as supporting context.\n\n",
    )


def render_readme(canonical: list[dict[str, Any]]) -> None:
    """Render README organized by phase. Each phase becomes a section
    with its own intro and a list of papers (sorted newest-first
    within the phase). A short colophon and the secondary 5-category
    index follow after the phase sections.
    """
    total = len(canonical)

    # ─── Phase sections ────────────────────────────────────────────
    # Group by phase, keep within-section newest-first ordering
    # (canonical is already sorted).
    by_phase: dict[str, list[dict[str, Any]]] = {tag: [] for tag in PHASE_ORDER}
    for p in canonical:
        tag = (p.get("phase") or "").strip()
        if tag in by_phase:
            by_phase[tag].append(p)
        else:
            # Unknown / missing tag — park in the framework bucket so
            # nothing is silently dropped.
            by_phase["framework"].append(p)

    # ─── Phase summaries ──────────────────────────────────────────
    # We render only the phase summary blurbs (with paper counts), NOT
    # the individual paper entries — the searchable index at the
    # website is the right place to browse. The README is a landing
    # page; papers.yaml is the source of truth.
    phase_sections: list[str] = []
    for tag in PHASE_ORDER:
        papers = by_phase[tag]
        title, blurb = PHASE_HEADINGS[tag]
        if papers or tag == "phase-4":
            phase_sections.append(
                f"### {title}  <sub>({len(papers)} papers)</sub>\n\n"
                f"_{blurb}_"
            )
    paper_list_section = (
        "## Browse the index\n\n"
        f"> Full searchable index: **<https://xli04.github.io/Awesome-Human-AI-Coevolution-Paper-List/>**. "
        f"Structured source of truth: [`papers.yaml`](papers.yaml) ({total} entries). "
        f"Framework definitions: [`deep_research/phased_framework.md`](deep_research/phased_framework.md). "
        f"Each paper is assigned a single phase, with `emerging-phase-X` for clear bridge cases; "
        f"the secondary 5-category axis (CC/MA/HF/LH/PS) is also stored per entry."
        "\n\n"
        + "\n\n".join(phase_sections)
    )

    # Phase counts strip for the masthead. Always show phase-4 even at 0
    # so the "no domain has fully entered Phase 4" framing is visible.
    phase_parts: list[str] = []
    for tag in PHASE_ORDER:
        n = len(by_phase[tag])
        title, _ = PHASE_HEADINGS[tag]
        short = title.split(" — ")[0]
        if n == 0 and tag != "phase-4":
            continue
        phase_parts.append(f"**{short}** ({n})")
    env_groups = " · ".join(phase_parts)

    # Secondary 5-category strip.
    cat_parts: list[str] = []
    for cat in CATEGORY_KEYS:
        count = sum(1 for p in canonical if cat in (p.get("envs") or []))
        cat_parts.append(f"`{CATEGORY_ABBREV[cat]}` **{cat}** ({count})")
    secondary_groups = " · ".join(cat_parts)
    # Append to env_groups under a sub-heading.
    env_groups = (
        env_groups
        + "\n\n### Secondary axis — paper themes\n\n"
        + secondary_groups
    )

    # Top keywords.
    per_line = 5
    kw_counter: Counter[str] = Counter()
    for p in canonical:
        for k in p.get("keywords", []) or []:
            kw_counter[k.strip()] += 1
    predefined = ["benchmark", "dataset", "framework", "survey", "position"]
    pre_pairs = [(kw, kw_counter[kw]) for kw in predefined if kw in kw_counter]
    remaining = [(kw, c) for kw, c in kw_counter.most_common() if kw not in predefined]
    top_remaining = remaining[: 20 - len(predefined)]
    combined = sorted(pre_pairs + top_remaining, key=lambda x: -x[1])
    kw_links = [f"`{k}` ({c})" for k, c in combined]
    kw_lines = [" · ".join(kw_links[i:i+per_line]) for i in range(0, len(kw_links), per_line)]
    kw_groups = "<br>".join(kw_lines)

    # Top authors.
    author_counter: Counter[str] = Counter()
    for p in canonical:
        for a in p.get("authors", []) or []:
            author_counter[a.strip()] += 1
    top_authors = sorted(author_counter.items(), key=lambda x: x[1], reverse=True)[:20]
    author_links = [f"{a} ({c})" for a, c in top_authors]
    author_lines = [" · ".join(author_links[i:i+per_line]) for i in range(0, len(author_links), per_line)]
    author_groups = "<br>".join(author_lines)

    template_path = READMEDIR / "template.md"
    template = template_path.read_text(encoding="utf-8")
    rendered = (template
        .replace("{{insert_paper_count_here}}", str(total))
        .replace("{{insert_env_groups_here}}", env_groups)
        .replace("{{insert_keyword_groups_here}}", kw_groups)
        .replace("{{insert_author_groups_here}}", author_groups)
        .replace("{{insert_paper_list_section_here}}", paper_list_section)
    )
    (REPO_ROOT / "README.md").write_text(rendered.rstrip() + "\n", encoding="utf-8")


def emit_keyword_chart(canonical: list[dict[str, Any]]) -> None:
    try:
        import plotly.graph_objects as go
    except ImportError:
        return

    stats_dir = READMEDIR / "statistics"
    stats_dir.mkdir(parents=True, exist_ok=True)

    kw_counter: Counter[str] = Counter()
    for p in canonical:
        for k in p.get("keywords", []) or []:
            kw_counter[k.strip()] += 1
    top_kw = kw_counter.most_common(25)
    top_kw.reverse()
    kw_labels = [k for k, _ in top_kw]
    kw_values = [v for _, v in top_kw]

    if kw_values:
        fig_kw = go.Figure()
        fig_kw.add_trace(go.Bar(
            y=kw_labels, x=kw_values, orientation="h",
            text=kw_values, textposition="outside",
            textfont=dict(size=12, color="#444"),
            marker=dict(
                color=kw_values,
                colorscale=[[0, "#BFDBFE"], [0.4, "#3B82F6"], [1, "#1E3A8A"]],
                line=dict(width=0), cornerradius=3,
            ),
        ))
        fig_kw.update_layout(
            title=dict(text="Top 25 Research Keywords",
                       font=dict(size=20, color="#1a1a1a"), x=0.5),
            xaxis=dict(
                title=dict(text="Number of papers", font=dict(size=13, color="#666")),
                gridcolor="rgba(0,0,0,0.06)", zeroline=False,
                tickfont=dict(size=11, color="#888"),
                range=[0, max(kw_values) * 1.15],
            ),
            yaxis=dict(tickfont=dict(size=12, color="#444"), showgrid=False),
            plot_bgcolor="white", paper_bgcolor="white", showlegend=False,
            margin=dict(l=160, r=50, t=60, b=50),
            width=900, height=650, bargap=0.25,
        )
        try:
            fig_kw.write_image(stats_dir / "keyword_bar_chart.png", scale=2)
        except Exception:
            pass

    rows = []
    for p in canonical:
        ts = parse_date_string(str(p.get("date", "")))
        if pd.isna(ts) or ts < pd.Timestamp("2018-01-01"):
            continue
        rows.append(ts)
    if not rows:
        return
    trend_df = pd.DataFrame({"ts": rows})
    trend_df["quarter"] = trend_df["ts"].dt.to_period("Q")
    quarterly = trend_df.groupby("quarter").size().reset_index(name="count")
    quarterly["mid_date"] = quarterly["quarter"].apply(
        lambda q: q.start_time + pd.Timedelta(days=45))
    quarterly["label"] = quarterly["quarter"].apply(
        lambda q: f"Q{q.quarter} {q.year}")
    counts = quarterly["count"].values

    fig = go.Figure()
    fig.add_trace(go.Bar(
        x=quarterly["mid_date"], y=counts,
        text=counts, textposition="outside",
        textfont=dict(size=13, color="#333"),
        width=60 * 86400000,
        marker=dict(
            color=counts,
            colorscale=[[0, "#93C5FD"], [0.5, "#3B82F6"], [1, "#1D4ED8"]],
            line=dict(width=0), cornerradius=4,
        ),
        hovertemplate="<b>%{customdata}</b><br>%{y} papers<extra></extra>",
        customdata=quarterly["label"],
    ))
    fig.update_layout(
        title=dict(
            text="Human-AI Coevolution Research: Quarterly Publication Trend",
            font=dict(size=22, color="#1a1a1a"), x=0.5,
        ),
        yaxis=dict(
            title=dict(text="Papers per quarter", font=dict(size=14, color="#666")),
            gridcolor="rgba(0,0,0,0.06)", zeroline=False,
            tickfont=dict(size=11, color="#888"),
            range=[0, max(counts) * 1.22],
        ),
        xaxis=dict(
            tickfont=dict(size=11, color="#666"), showgrid=False,
            tickvals=quarterly["mid_date"], ticktext=quarterly["label"],
            tickangle=0,
        ),
        plot_bgcolor="white", paper_bgcolor="white",
        showlegend=False,
        margin=dict(l=60, r=30, t=70, b=50),
        width=1100, height=480, bargap=0.3,
    )
    try:
        fig.write_image(stats_dir / "quarterly_trend.png", scale=2)
    except Exception:
        pass


def process() -> None:
    canonical_path = REPO_ROOT / "papers.yaml"
    adjacent_path = REPO_ROOT / "adjacent.yaml"
    if not canonical_path.exists():
        raise SystemExit(
            f"papers.yaml not found at {canonical_path}."
        )
    canonical = load_yaml(canonical_path)
    adjacent = load_yaml(adjacent_path)

    canonical = normalize_papers(canonical)
    adjacent = normalize_papers(adjacent)

    print(f"Processed {len(canonical)} canonical and {len(adjacent)} adjacent papers.")

    emit_yaml(canonical, adjacent)
    render_readme(canonical)
    emit_keyword_chart(canonical)

    if _warnings:
        print(f"\n{len(_warnings)} warning(s) — see {log_dir / 'error.log'}")


if __name__ == "__main__":
    process()
