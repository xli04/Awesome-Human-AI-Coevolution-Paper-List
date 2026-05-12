/** @jsxImportSource solid-js */
import { onMount, onCleanup, createSignal, For, Show } from 'solid-js';
import * as echarts from 'echarts';
import type { BrowserPaper } from './PaperBrowser';
import { normalizePublisher } from '../lib/venues';

interface Props {
  papers: BrowserPaper[];
  basePath: string;
}

function isDark(): boolean {
  return document.documentElement.classList.contains('dark');
}

// Two themed palettes — earthy warm tones for light, cool muted tones for dark.
// Each theme uses a single hue family per chart for visual quietness.
function paperColors() {
  return isDark()
    ? {
        bg: 'transparent',
        text: '#e9e6df',
        muted: '#9a978d',
        faint: 'rgba(255,255,255,0.04)',
        bar: '#7c9ec9',                 // navy on dark
        barAlt: '#a5bdd4',
        line: '#7c9ec9',
        // Primary axis — five phase bands. We collapse emerging-phase-N
        // into the corresponding main phase for the stacked area / donut
        // so the visual story stays legible.
        phaseColors: {
          'phase-1':   '#7c9ec9',   // navy — Tool
          'phase-2':   '#cdb89f',   // brass — Assistant
          'phase-3':   '#9ab0a0',   // olive — Executor
          'phase-4':   '#b89a78',   // bronze — Organization (currently empty)
          'framework': '#a8a8b8',   // grey — Surveys & Position
        } as Record<string, string>,
        // Secondary axis — five theme categories. Slightly desaturated
        // so they don't compete with the phase palette.
        envColors: {
          'Collaboration & Co-Creation': '#7c9ec9',
          'Mutual Adaptation': '#cdb89f',
          'Human Feedback Loops': '#9ab0a0',
          'Longitudinal HCI Studies': '#b89a78',
          'Position & Survey': '#a8a8b8',
        } as Record<string, string>,
        donut: ['#7c9ec9', '#cdb89f', '#9ab0a0', '#b89a78', '#a8a8b8'],
        treemapTones: ['#283a52', '#2f4258', '#374b5f', '#3f5466', '#475d6d', '#506674', '#586f7a', '#617881'],
        cardBorder: 'rgba(233,230,223,0.08)',
        tooltipBg: '#171b23',
        tooltipBorder: 'rgba(255,255,255,0.08)',
      }
    : {
        bg: 'transparent',
        text: '#2f2d28',
        muted: '#6e6c64',
        faint: 'rgba(0,0,0,0.04)',
        bar: '#1e3a5f',
        barAlt: '#516b85',
        line: '#1e3a5f',
        phaseColors: {                 // navy + brass + olive + bronze family
          'phase-1':   '#1e3a5f',
          'phase-2':   '#a0826d',
          'phase-3':   '#5b7461',
          'phase-4':   '#7d5e47',
          'framework': '#6b6b87',
        } as Record<string, string>,
        envColors: {
          'Collaboration & Co-Creation': '#1e3a5f',
          'Mutual Adaptation': '#a0826d',
          'Human Feedback Loops': '#5b7461',
          'Longitudinal HCI Studies': '#7d5e47',
          'Position & Survey': '#6b6b87',
        } as Record<string, string>,
        donut: ['#1e3a5f', '#a0826d', '#5b7461', '#7d5e47', '#6b6b87'],
        // single-hue navy treemap progression
        treemapTones: ['#1e3a5f', '#2a466b', '#365176', '#425d82', '#4f6a8d', '#5b7799', '#6884a4', '#7591b0'],
        cardBorder: 'rgba(31,29,26,0.08)',
        tooltipBg: '#faf9f5',
        tooltipBorder: 'rgba(31,29,26,0.12)',
      };
}

// Collapse an 8-tag phase value into its 5-tag aggregated form for the
// quarterly trend and donut. Emerging tags fold into their main phase.
function aggregatePhase(tag: string | null | undefined): string | null {
  if (!tag) return null;
  if (tag === 'emerging-phase-2') return 'phase-2';
  if (tag === 'emerging-phase-3') return 'phase-3';
  if (tag === 'emerging-phase-4') return 'phase-4';
  return tag;
}

// Display labels for the 5 aggregated phase keys.
const PHASE_AGG_LABEL: Record<string, string> = {
  'phase-1':   'P1 · Tool',
  'phase-2':   'P2 · Assistant (incl. EP2)',
  'phase-3':   'P3 · Executor (incl. EP3)',
  'phase-4':   'P4 · Organization (incl. EP4)',
  'framework': 'Surveys & Position',
};

const PHASE_AGG_ORDER = ['phase-1', 'phase-2', 'phase-3', 'phase-4', 'framework'];

const SHARED_TEXT = {
  fontFamily: 'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Inter, sans-serif',
};

function tooltipBase(c: ReturnType<typeof paperColors>) {
  return {
    backgroundColor: c.tooltipBg,
    borderColor: c.tooltipBorder,
    borderWidth: 1,
    padding: [8, 12],
    textStyle: {
      color: c.text,
      fontSize: 12,
      ...SHARED_TEXT,
    },
    extraCssText: 'box-shadow: 0 4px 14px rgba(0,0,0,0.06); border-radius: 6px;',
  };
}

function quarterKey(iso: string): string {
  const [y, m] = iso.split('-');
  const q = Math.floor((parseInt(m, 10) - 1) / 3) + 1;
  return `${y} Q${q}`;
}

function buildQuarterlyByPhase(papers: BrowserPaper[]) {
  const phases = PHASE_AGG_ORDER;
  const buckets = new Map<string, Record<string, number>>();
  for (const p of papers) {
    if (!p.dateISO || p.year < 2000) continue;
    const agg = aggregatePhase(p.phase);
    if (!agg) continue;
    const k = quarterKey(p.dateISO);
    if (!buckets.has(k)) {
      const init: Record<string, number> = { Total: 0 };
      for (const ph of phases) init[ph] = 0;
      buckets.set(k, init);
    }
    const row = buckets.get(k)!;
    row.Total += 1;
    if (agg in row) row[agg] += 1;
  }
  const keys = Array.from(buckets.keys()).sort();
  return { keys, phases, buckets };
}

export default function StatsCharts(props: Props) {
  let trendEl!: HTMLDivElement;
  let kwEl!: HTMLDivElement;
  let phaseEl!: HTMLDivElement;
  let themeEl!: HTMLDivElement;
  let instEl!: HTMLDivElement;
  let authorEl!: HTMLDivElement;
  let pubEl!: HTMLDivElement;
  const charts: echarts.ECharts[] = [];

  const [, setTick] = createSignal(0);
  const [longTail, setLongTail] = createSignal<Array<{ k: string; v: number }>>([]);

  function build() {
    for (const c of charts) c.dispose();
    charts.length = 0;
    const c = paperColors();

    // === 1. Quarterly trend — stacked by aggregated phase ===
    // The framework's central distribution claim becomes a chart:
    // when did the literature start populating each phase?
    const { keys, phases, buckets } = buildQuarterlyByPhase(props.papers);
    const phaseLabelOf = (key: string) => PHASE_AGG_LABEL[key] ?? key;
    const trend = echarts.init(trendEl, null, { renderer: 'canvas' });
    trend.setOption({
      backgroundColor: c.bg,
      textStyle: SHARED_TEXT,
      tooltip: {
        ...tooltipBase(c),
        trigger: 'axis',
        axisPointer: { type: 'line', lineStyle: { color: c.muted, type: 'dashed' } },
      },
      legend: {
        data: phases.map(phaseLabelOf),
        textStyle: { color: c.muted, fontSize: 11, ...SHARED_TEXT },
        top: 4,
        left: 'center',
        icon: 'roundRect',
        itemWidth: 10,
        itemHeight: 10,
        itemGap: 14,
      },
      grid: { left: 36, right: 16, top: 56, bottom: 48, containLabel: true },
      xAxis: {
        type: 'category', data: keys, boundaryGap: false,
        axisLabel: { color: c.muted, fontSize: 10, ...SHARED_TEXT, rotate: 45, margin: 12 },
        axisLine: { lineStyle: { color: c.faint } },
        axisTick: { show: false },
      },
      yAxis: {
        type: 'value',
        axisLabel: { color: c.muted, fontSize: 10, ...SHARED_TEXT },
        axisLine: { show: false },
        axisTick: { show: false },
        splitLine: { lineStyle: { color: c.faint, type: 'solid' } },
      },
      series: phases.map((ph) => ({
        name: phaseLabelOf(ph),
        type: 'line' as const,
        stack: 'phase',
        smooth: 0.5,
        symbol: 'none' as const,
        lineStyle: { width: 0, color: c.phaseColors[ph] },
        areaStyle: { color: c.phaseColors[ph], opacity: isDark() ? 0.55 : 0.7 },
        emphasis: { focus: 'series' as const },
        data: keys.map((k) => buckets.get(k)![ph]),
      })),
    });
    charts.push(trend);

    // === 2. Keyword bar — top 12 horizontal stacked, every segment
    //        always labeled. Avoids the treemap "empty tile" problem.
    //        The long tail (next 40) lives below the chart as a chip
    //        cloud rendered in JSX (see render block at the bottom).
    const kwCounter = new Map<string, number>();
    for (const p of props.papers) for (const k of p.keywords) kwCounter.set(k, (kwCounter.get(k) ?? 0) + 1);
    const sortedKw = Array.from(kwCounter.entries()).sort((a, b) => b[1] - a[1]);
    // Top 6 carry ~90% of all keyword mass — wider segments, every
    // segment labelable with name + count.
    const topBarKw = sortedKw.slice(0, 6);
    const maxKw = topBarKw[0]?.[1] ?? 1;
    const totalBar = topBarKw.reduce((s, [, v]) => s + v, 0);
    const kwChart = echarts.init(kwEl, null, { renderer: 'canvas' });
    kwChart.setOption({
      backgroundColor: c.bg,
      textStyle: SHARED_TEXT,
      tooltip: {
        ...tooltipBase(c),
        trigger: 'item',
        formatter: (info: any) => {
          const pct = totalBar ? ((info.value / totalBar) * 100).toFixed(1) : '0';
          return `<span style="font-weight:600">${info.name}</span><br/><span style="color:${c.muted}">${info.value} papers · ${pct}%</span>`;
        },
      },
      grid: { left: 4, right: 4, top: 26, bottom: 8, containLabel: false },
      xAxis: { type: 'value', show: false, max: totalBar },
      yAxis: { type: 'category', show: false, data: ['Keywords'] },
      series: topBarKw.map(([k, v], i) => ({
        name: k,
        type: 'bar',
        stack: 'kw',
        data: [v],
        barWidth: 36,
        itemStyle: {
          color: c.treemapTones[Math.min(c.treemapTones.length - 1, Math.floor((1 - v / maxKw) * (c.treemapTones.length - 1)))],
          borderColor: isDark() ? '#0f1217' : '#f7efdf',
          borderWidth: 2,
        },
        label: {
          show: true, position: 'inside', align: 'left',
          formatter: (info: any) => {
            const pct = info.value / totalBar;
            const name = info.seriesName.length > 18 ? info.seriesName.slice(0, 17) + '…' : info.seriesName;
            // With 6 segments each is ≥ ~8% by construction.
            return pct >= 0.07 ? `{n|${name}}  {v|${info.value}}` : `{n|${name}}`;
          },
          rich: {
            n: { color: '#fbf6ec', fontSize: 11, fontWeight: 600, ...SHARED_TEXT },
            v: { color: 'rgba(251,246,236,0.78)', fontSize: 10, ...SHARED_TEXT },
          },
          padding: [0, 6],
        },
        emphasis: { focus: 'self', itemStyle: { opacity: 0.92 } },
      })),
    });
    kwChart.on('click', (params: any) => {
      if (!params || !params.seriesName) return;
      window.location.href = `${props.basePath}/papers?key=${encodeURIComponent(params.seriesName)}`;
    });
    charts.push(kwChart);
    // Stash the long-tail list for the chip cloud rendered below.
    setLongTail(sortedKw.slice(6, 56).map(([k, v]) => ({ k, v })));

    // === 3. Phase donut — the primary distribution chart. Aggregated to
    //        five bands (P1 / P2+EP2 / P3+EP3 / P4+EP4 / Surveys). ===
    const phaseCounter = new Map<string, number>();
    for (const p of props.papers) {
      const agg = aggregatePhase(p.phase);
      if (!agg) continue;
      phaseCounter.set(agg, (phaseCounter.get(agg) ?? 0) + 1);
    }
    // Maintain a fixed order so colors and legend match the trend chart.
    const phaseEntries: [string, number][] = PHASE_AGG_ORDER
      .map((k): [string, number] => [k, phaseCounter.get(k) ?? 0])
      .filter(([, v]) => v > 0);
    const phaseChart = echarts.init(phaseEl, null, { renderer: 'canvas' });
    phaseChart.setOption({
      backgroundColor: c.bg,
      textStyle: SHARED_TEXT,
      tooltip: {
        ...tooltipBase(c),
        formatter: (p: any) => `<span style="font-weight:600">${PHASE_AGG_LABEL[p.name] ?? p.name}</span><br/><span style="color:${c.muted}">${p.value} papers (${p.percent}%)</span>`,
      },
      legend: {
        bottom: 6, left: 'center',
        textStyle: { color: c.muted, fontSize: 11, ...SHARED_TEXT },
        icon: 'circle', itemWidth: 8, itemHeight: 8, itemGap: 16,
        formatter: (name: string) => PHASE_AGG_LABEL[name] ?? name,
      },
      series: [{
        type: 'pie', radius: ['54%', '78%'], center: ['50%', '42%'],
        avoidLabelOverlap: true,
        itemStyle: {
          borderColor: isDark() ? '#161a21' : '#faf9f5',
          borderWidth: 4,
        },
        label: {
          show: true,
          formatter: (p: any) => `{n|${PHASE_AGG_LABEL[p.name] ?? p.name}}\n{v|${p.value}}`,
          rich: {
            n: { color: c.text, fontSize: 12, fontWeight: 600, ...SHARED_TEXT, lineHeight: 18 },
            v: { color: c.muted, fontSize: 11, ...SHARED_TEXT },
          },
          alignTo: 'edge', edgeDistance: 6,
        },
        labelLine: { lineStyle: { color: c.muted, width: 1 }, length: 10, length2: 10 },
        data: phaseEntries.map(([k, v]) => ({
          name: k, value: v,
          itemStyle: { color: c.phaseColors[k] ?? c.donut[0] },
        })),
      }],
    });
    phaseChart.on('click', (params: any) => {
      // Click a slice → filter the index by that aggregated phase. We
      // use a single ?phase= tag rather than expanding into EP+P, since
      // the user clicked the aggregated band.
      window.location.href = `${props.basePath}/papers?phase=${encodeURIComponent(params.name)}`;
    });
    charts.push(phaseChart);

    // === 3b. Theme split — secondary axis (CC/MA/HF/LH/PS) ===
    // Same structure as the phase donut but visually subordinate.
    const envCounter = new Map<string, number>();
    for (const p of props.papers) for (const e of p.envs) envCounter.set(e, (envCounter.get(e) ?? 0) + 1);
    const envEntries = Array.from(envCounter.entries());
    const themeChart = echarts.init(themeEl, null, { renderer: 'canvas' });
    themeChart.setOption({
      backgroundColor: c.bg,
      textStyle: SHARED_TEXT,
      tooltip: {
        ...tooltipBase(c),
        formatter: (p: any) => `<span style="font-weight:600">${p.name}</span><br/><span style="color:${c.muted}">${p.value} papers (${p.percent}%)</span>`,
      },
      legend: {
        bottom: 6, left: 'center',
        textStyle: { color: c.muted, fontSize: 11, ...SHARED_TEXT },
        icon: 'circle', itemWidth: 8, itemHeight: 8, itemGap: 14,
      },
      series: [{
        type: 'pie', radius: ['48%', '70%'], center: ['50%', '42%'],
        avoidLabelOverlap: true,
        itemStyle: {
          borderColor: isDark() ? '#161a21' : '#faf9f5',
          borderWidth: 3,
        },
        label: { show: false },
        data: envEntries.map(([k, v], i) => ({
          name: k, value: v,
          itemStyle: { color: c.envColors[k] ?? c.donut[i % c.donut.length] },
        })),
      }],
    });
    themeChart.on('click', (params: any) => {
      window.location.href = `${props.basePath}/papers?env=${encodeURIComponent(params.name)}`;
    });
    charts.push(themeChart);

    // === 4. Top institutions — single accent hue, count labels at end of bars ===
    const instCounter = new Map<string, number>();
    for (const p of props.papers) for (const i of p.institutions) instCounter.set(i, (instCounter.get(i) ?? 0) + 1);
    const topInst = Array.from(instCounter.entries()).sort((a, b) => b[1] - a[1]).slice(0, 25).reverse();
    const instChart = echarts.init(instEl, null, { renderer: 'canvas' });
    instChart.setOption({
      backgroundColor: c.bg,
      textStyle: SHARED_TEXT,
      tooltip: {
        ...tooltipBase(c),
        formatter: (p: any) => `<span style="font-weight:600">${p.name}</span><br/><span style="color:${c.muted}">${p.value} papers</span>`,
      },
      grid: { left: 4, right: 36, top: 4, bottom: 8, containLabel: true },
      xAxis: { type: 'value', show: false },
      yAxis: {
        type: 'category', data: topInst.map(([k]) => k),
        axisLabel: { color: c.text, fontSize: 11, ...SHARED_TEXT, margin: 12 },
        axisLine: { show: false }, axisTick: { show: false },
      },
      series: [{
        type: 'bar', data: topInst.map(([, v]) => v),
        barWidth: '60%',
        itemStyle: {
          color: {
            type: 'linear', x: 0, y: 0, x2: 1, y2: 0,
            colorStops: [
              { offset: 0, color: c.bar + (isDark() ? '88' : '40') },
              { offset: 1, color: c.bar },
            ],
          },
          borderRadius: [0, 3, 3, 0],
        },
        label: {
          show: true, position: 'right',
          color: c.muted, fontSize: 10, ...SHARED_TEXT, distance: 6,
        },
        emphasis: { itemStyle: { color: c.bar } },
      }],
    });
    instChart.on('click', (params: any) => {
      window.location.href = `${props.basePath}/papers?inst=${encodeURIComponent(params.name)}`;
    });
    charts.push(instChart);

    // === 5. Top authors ===
    const aCounter = new Map<string, number>();
    for (const p of props.papers) for (const a of p.authors) aCounter.set(a, (aCounter.get(a) ?? 0) + 1);
    const topA = Array.from(aCounter.entries()).sort((a, b) => b[1] - a[1]).slice(0, 25).reverse();
    const aChart = echarts.init(authorEl, null, { renderer: 'canvas' });
    aChart.setOption({
      backgroundColor: c.bg,
      textStyle: SHARED_TEXT,
      tooltip: {
        ...tooltipBase(c),
        formatter: (p: any) => `<span style="font-weight:600">${p.name}</span><br/><span style="color:${c.muted}">${p.value} papers</span>`,
      },
      grid: { left: 4, right: 36, top: 4, bottom: 8, containLabel: true },
      xAxis: { type: 'value', show: false },
      yAxis: {
        type: 'category', data: topA.map(([k]) => k),
        axisLabel: { color: c.text, fontSize: 11, ...SHARED_TEXT, margin: 12 },
        axisLine: { show: false }, axisTick: { show: false },
      },
      series: [{
        type: 'bar', data: topA.map(([, v]) => v),
        barWidth: '60%',
        itemStyle: {
          color: {
            type: 'linear', x: 0, y: 0, x2: 1, y2: 0,
            colorStops: [
              { offset: 0, color: c.bar + (isDark() ? '88' : '40') },
              { offset: 1, color: c.bar },
            ],
          },
          borderRadius: [0, 3, 3, 0],
        },
        label: {
          show: true, position: 'right',
          color: c.muted, fontSize: 10, ...SHARED_TEXT, distance: 6,
        },
      }],
    });
    aChart.on('click', (params: any) => {
      window.location.href = `${props.basePath}/papers?author=${encodeURIComponent(params.name)}`;
    });
    charts.push(aChart);

    // === 6. Publication venues ===
    // Use the maintained venues list to normalize — anything unknown
    // (workshops, sub-tracks, bespoke venues) keeps its own bucket
    // rather than getting accidentally collapsed by a generic regex.
    const pCounter = new Map<string, number>();
    for (const p of props.papers) {
      const v = normalizePublisher(p.publisher);
      if (!v || /^arxiv$/i.test(v)) continue;
      pCounter.set(v, (pCounter.get(v) ?? 0) + 1);
    }
    const topP = Array.from(pCounter.entries()).sort((a, b) => b[1] - a[1]).slice(0, 15).reverse();
    const pChart = echarts.init(pubEl, null, { renderer: 'canvas' });
    pChart.setOption({
      backgroundColor: c.bg,
      textStyle: SHARED_TEXT,
      tooltip: {
        ...tooltipBase(c),
        formatter: (p: any) => `<span style="font-weight:600">${p.name}</span><br/><span style="color:${c.muted}">${p.value} papers</span>`,
      },
      grid: { left: 4, right: 36, top: 4, bottom: 8, containLabel: true },
      xAxis: { type: 'value', show: false },
      yAxis: {
        type: 'category', data: topP.map(([k]) => k),
        axisLabel: { color: c.text, fontSize: 11, ...SHARED_TEXT, margin: 12 },
        axisLine: { show: false }, axisTick: { show: false },
      },
      series: [{
        type: 'bar', data: topP.map(([, v]) => v),
        barWidth: '60%',
        itemStyle: {
          color: {
            type: 'linear', x: 0, y: 0, x2: 1, y2: 0,
            colorStops: [
              { offset: 0, color: c.bar + (isDark() ? '88' : '40') },
              { offset: 1, color: c.bar },
            ],
          },
          borderRadius: [0, 3, 3, 0],
        },
        label: {
          show: true, position: 'right',
          color: c.muted, fontSize: 10, ...SHARED_TEXT, distance: 6,
        },
      }],
    });
    charts.push(pChart);
  }

  function resizeAll() { for (const c of charts) c.resize(); }

  onMount(() => {
    build();
    const ro = new ResizeObserver(() => resizeAll());
    [trendEl, kwEl, phaseEl, themeEl, instEl, authorEl, pubEl].forEach((el) => ro.observe(el));
    const mo = new MutationObserver(() => { build(); setTick((x) => x + 1); });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    onCleanup(() => { ro.disconnect(); mo.disconnect(); for (const c of charts) c.dispose(); });
  });

  return (
    <div class="space-y-16">

      {/* ─── Hero: distribution by phase ─────────────────────────── */}
      <section>
        <div class="flex items-baseline justify-between mb-1 flex-wrap gap-x-4">
          <h2 class="text-base font-semibold text-ink-700 dark:text-ink-50">Distribution by phase</h2>
          <span class="text-xs text-ink-400 dark:text-ink-300">primary axis · aggregated to 5 bands</span>
        </div>
        <p class="text-xs text-ink-400 dark:text-ink-300 mb-4 max-w-[64ch]">
          How papers in the index distribute across the four phases. Emerging-phase entries (EP2 / EP3 / EP4) are folded into the corresponding main phase for legibility — see the full 8-tag breakdown in the per-phase sections of the <a class="a-text" href={`${props.basePath}/`}>landing page</a>.
        </p>
        <div ref={(el) => (phaseEl = el)} class="w-full h-[420px]"></div>
      </section>

      {/* ─── Quarterly trend stacked by phase ─────────────────────── */}
      <section>
        <div class="flex items-baseline justify-between mb-1 flex-wrap gap-x-4">
          <h2 class="text-base font-semibold text-ink-700 dark:text-ink-50">Quarterly publication trend</h2>
          <span class="text-xs text-ink-400 dark:text-ink-300">stacked by phase</span>
        </div>
        <p class="text-xs text-ink-400 dark:text-ink-300 mb-4 max-w-[64ch]">Papers added per calendar quarter from the earliest preprint date, stacked by phase. Tracks when each phase began accumulating empirical evidence.</p>
        <div ref={(el) => (trendEl = el)} class="w-full h-[360px]"></div>
      </section>

      {/* ─── Keyword bar + long tail ─────────────────────────────── */}
      <section>
        <h2 class="text-base font-semibold text-ink-700 dark:text-ink-50 mb-1">Top keywords</h2>
        <p class="text-xs text-ink-400 dark:text-ink-300 mb-4 max-w-[64ch]">Width is paper count, darker is more frequent. Click any segment or chip to filter.</p>
        <div ref={(el) => (kwEl = el)} class="w-full h-[68px]"></div>
        <Show when={longTail().length > 0}>
          <div class="mt-6">
            <div class="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-400 dark:text-ink-300 mb-3">Long tail</div>
            <KeywordCloud items={longTail()} basePath={props.basePath} />
          </div>
        </Show>
      </section>

      {/* ─── Secondary axis: theme split ──────────────────────────── */}
      <section>
        <div class="flex items-baseline justify-between mb-1 flex-wrap gap-x-4">
          <h2 class="text-base font-semibold text-ink-700 dark:text-ink-50">Theme split</h2>
          <span class="text-xs text-ink-400 dark:text-ink-300">secondary axis · CC / MA / HF / LH / PS</span>
        </div>
        <p class="text-xs text-ink-400 dark:text-ink-300 mb-4 max-w-[64ch]">A paper may carry one or more themes. Click a slice to filter.</p>
        <div ref={(el) => (themeEl = el)} class="w-full h-[320px]"></div>
      </section>

      {/* ─── Top institutions / authors ───────────────────────────── */}
      <section class="grid lg:grid-cols-2 gap-10">
        <div class="min-w-0">
          <h2 class="text-base font-semibold text-ink-700 dark:text-ink-50 mb-1">Top 25 institutions</h2>
          <p class="text-xs text-ink-400 dark:text-ink-300 mb-4">Click a name to filter.</p>
          <div ref={(el) => (instEl = el)} class="w-full h-[560px]"></div>
        </div>
        <div class="min-w-0">
          <h2 class="text-base font-semibold text-ink-700 dark:text-ink-50 mb-1">Top 25 authors</h2>
          <p class="text-xs text-ink-400 dark:text-ink-300 mb-4">Click a name to filter.</p>
          <div ref={(el) => (authorEl = el)} class="w-full h-[560px]"></div>
        </div>
      </section>

      {/* ─── Publication venues ──────────────────────────────────── */}
      <section>
        <h2 class="text-base font-semibold text-ink-700 dark:text-ink-50 mb-1">Publication venues</h2>
        <p class="text-xs text-ink-400 dark:text-ink-300 mb-4">Top 15 venues, excluding arXiv-only entries.</p>
        <div ref={(el) => (pubEl = el)} class="w-full h-[400px]"></div>
      </section>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// KeywordCloud — sized chips for the long-tail keywords below the
// horizontal-bar visualization. Font scales sublinearly with count
// so popular tags read large but rare tags still get a visible chip.
// ─────────────────────────────────────────────────────────────────
function KeywordCloud(props: { items: Array<{ k: string; v: number }>; basePath: string }) {
  const max = Math.max(1, ...props.items.map((x) => x.v));
  const min = Math.max(1, Math.min(...props.items.map((x) => x.v)));
  const range = Math.max(1, max - min);
  // Map count → font size 12px–18px and color weight.
  const size = (v: number) => {
    const t = (v - min) / range; // 0..1
    return 12 + t * 6;            // 12..18
  };
  const opacity = (v: number) => 0.65 + ((v - min) / range) * 0.35;
  return (
    <div class="flex flex-wrap items-baseline gap-x-2 gap-y-2">
      <For each={props.items}>
        {(item) => (
          <a
            class="inline-flex items-baseline gap-1 px-2.5 py-1 rounded-full bg-paper-200/60 dark:bg-ink-700/40 hover:bg-paper-200 dark:hover:bg-ink-700/70 border border-paper-300/60 dark:border-ink-600/60 text-ink-700 dark:text-ink-50 transition-colors"
            href={`${props.basePath}/papers?key=${encodeURIComponent(item.k)}`}
            style={{
              'font-size': `${size(item.v)}px`,
              'opacity': opacity(item.v),
            }}
          >
            <span>{item.k}</span>
            <span class="text-[0.78em] text-ink-400 dark:text-ink-300 tabular-nums">{item.v}</span>
          </a>
        )}
      </For>
    </div>
  );
}
