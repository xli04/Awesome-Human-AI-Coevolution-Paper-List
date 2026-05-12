# Awesome Human-AI Coevolution Paper List

A curated index of **{{insert_paper_count_here}}** research papers on **human-AI coevolution**, organized by the four-phase framework — _Tool · Assistant · Executor · Organization_ — for how humans use AI in their work. Each paper is grounded evidence for one phase, illustrating either the human capability empowered or the failure mode that emerges when human evolution lags AI's.

> **Why phases.** As AI advances, the way humans use it shifts from full execution to oversight to governance, and each phase brings distinct impacts on human ability: weakened reasoning, missed flaws, undetected drift, lost goal traceability. The list curates research that **documents these effects or argues about how they should be addressed** — that is, the bidirectional human-AI coevolution literature, viewed through the phased lens.

The structured store [`papers.yaml`](papers.yaml) is the source of truth — the README, statistics, and the website are auto-generated from it. See [`CLAUDE.md`](CLAUDE.md) for the schema and contribution workflow.

![Quarterly publication trend](readme_template/statistics/quarterly_trend.png)

![Top 25 research keywords](readme_template/statistics/keyword_bar_chart.png)

## Index by Phase
{{insert_env_groups_here}}

## Top Keywords
{{insert_keyword_groups_here}}

## Top Contributing Authors
{{insert_author_groups_here}}

## Contributing

We welcome contributions from the community!

- **Missing a paper?** Open an issue with the paper title, link, and any relevant details — we'll add it.
- **Want to add papers yourself?** Edit [`papers.yaml`](papers.yaml), run `bash scripts/update_repo.sh`, then submit the regenerated diff. See [`CLAUDE.md`](CLAUDE.md) for the YAML schema.
- **Spotted an error?** Open an issue or PR to correct any paper metadata (authors, dates, institutions, etc.).

{{insert_paper_list_section_here}}

---

Some of the design and scaffolding here is adapted from [OSU-NLP-Group/GUI-Agents-Paper-List](https://github.com/OSU-NLP-Group/GUI-Agents-Paper-List). Thanks for their awesome work!

