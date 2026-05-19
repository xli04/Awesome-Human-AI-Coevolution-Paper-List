#!/usr/bin/env python3
"""Apply phase classifications to papers.yaml.

Reads phase tags from deep_research/phase_classification.md (lines 159-278 in the
per-index table) and inserts a `phase` field immediately after `envs` in every
papers.yaml entry.
"""
from __future__ import annotations

import re
from pathlib import Path
from typing import Any

import yaml

REPO = Path("/Users/lixu/Awesome-Human-AI-Coevolution-Paper-List")
CLASS_FILE = REPO / "deep_research" / "phase_classification.md"
PAPERS = REPO / "papers.yaml"

VALID_TAGS = {
    "phase-1",
    "emerging-phase-2",
    "phase-2",
    "emerging-phase-3",
    "phase-3",
    "emerging-phase-4",
    "phase-4",
    "framework",
}


class LiteralStr(str):
    pass


def _literal_representer(dumper, data):
    return dumper.represent_scalar("tag:yaml.org,2002:str", data, style="|")


yaml.add_representer(LiteralStr, _literal_representer)


def parse_classifications() -> list[tuple[int, str, str]]:
    """Return list of (index, title_fragment, tag) tuples sorted by index."""
    text = CLASS_FILE.read_text(encoding="utf-8")
    # Match lines like: "- 1 ChatGPT essay writing engagement — **emerging-phase-2**"
    # Title may contain various dashes and punctuation; tag is bold-wrapped.
    pattern = re.compile(r"^- (\d+)\s+(.+?)\s+[—–-]+\s+\*\*([a-z0-9-]+)\*\*\s*$", re.MULTILINE)
    out = []
    for m in pattern.finditer(text):
        idx = int(m.group(1))
        title_frag = m.group(2).strip()
        tag = m.group(3).strip()
        if tag not in VALID_TAGS:
            continue
        out.append((idx, title_frag, tag))
    # Dedupe by index, preserving first occurrence
    seen = set()
    unique = []
    for idx, frag, tag in out:
        if idx in seen:
            continue
        seen.add(idx)
        unique.append((idx, frag, tag))
    unique.sort(key=lambda x: x[0])
    return unique


def load_papers() -> tuple[str, list[dict[str, Any]]]:
    raw = PAPERS.read_text(encoding="utf-8")
    # Preserve header comment lines (lines starting with # at top, plus trailing blank).
    header_lines = []
    for line in raw.splitlines(keepends=True):
        if line.startswith("#") or line.strip() == "":
            header_lines.append(line)
            if line.strip() == "" and any(h.startswith("#") for h in header_lines):
                # Stop at first blank line after the header comments.
                break
        else:
            break
    header = "".join(header_lines)
    data = yaml.safe_load(raw)
    if not isinstance(data, list):
        raise SystemExit("papers.yaml did not parse as a list")
    return header, data


FIELD_ORDER = [
    "title",
    "link",
    "authors",
    "institutions",
    "date",
    "publisher",
    "envs",
    "phase",
    "keywords",
    "tldr",
    "arxiv_id",
    "sources",
    "bibtex",
    "bibtex_confirmed",
]


def reorder_entry(entry: dict[str, Any]) -> dict[str, Any]:
    out: dict[str, Any] = {}
    for key in FIELD_ORDER:
        if key in entry:
            out[key] = entry[key]
    # Append any unknown keys at the end, preserving their original order.
    for key, val in entry.items():
        if key not in out:
            out[key] = val
    return out


def main() -> None:
    classifications = parse_classifications()
    print(f"Parsed {len(classifications)} classification rows")
    indices = [c[0] for c in classifications]
    if indices != list(range(1, 111)):
        missing = set(range(1, 111)) - set(indices)
        extra = set(indices) - set(range(1, 111))
        raise SystemExit(f"Index mismatch: missing={sorted(missing)} extra={sorted(extra)}")

    header, papers = load_papers()
    print(f"Loaded {len(papers)} paper entries; header length={len(header)} chars")
    if len(papers) != len(classifications):
        raise SystemExit(f"Length mismatch: {len(papers)} papers vs {len(classifications)} classifications")

    # Sanity-check titles by printing a brief mapping for review.
    mismatches: list[tuple[int, str, str]] = []
    for (idx, frag, tag), paper in zip(classifications, papers):
        title = str(paper.get("title", "")).lower()
        # Try a simple match: at least one distinctive token from the fragment
        # appears in the YAML title. We only warn — not fail.
        frag_lower = frag.lower()
        tokens = [
            t for t in re.split(r"[^a-z0-9]+", frag_lower) if len(t) >= 4 and t not in {"with", "from", "this", "that", "study", "paper"}
        ]
        if tokens and not any(t in title for t in tokens):
            mismatches.append((idx, frag, str(paper.get("title", ""))))

    if mismatches:
        print("\nPossible title mismatches (review manually):")
        for idx, frag, title in mismatches:
            print(f"  #{idx}: classification='{frag}'  yaml='{title[:80]}'")

    # Apply phase to every entry.
    new_papers = []
    for (idx, frag, tag), paper in zip(classifications, papers):
        paper["phase"] = tag
        new_papers.append(reorder_entry(paper))

    # Convert tldr / bibtex to LiteralStr so YAML emits them in literal block style.
    for p in new_papers:
        if p.get("tldr"):
            p["tldr"] = LiteralStr(str(p["tldr"]))
        if p.get("bibtex"):
            p["bibtex"] = LiteralStr(str(p["bibtex"]))

    body = yaml.dump(
        new_papers,
        sort_keys=False,
        allow_unicode=True,
        width=120,
        default_flow_style=False,
    )

    # Ensure the header (with trailing blank line) precedes the YAML body.
    if not header.endswith("\n"):
        header += "\n"
    if not header.endswith("\n\n"):
        header += "\n"
    PAPERS.write_text(header + body, encoding="utf-8")
    print(f"\nWrote {PAPERS} ({len(new_papers)} entries)")


if __name__ == "__main__":
    main()
