import PageHeader from '../components/PageHeader';
import { Section, Prose, Note, H3 } from '../components/Layout';
import Table from '../components/Table';

const MAP_COLS = [
  { key: 'layer', label: 'Layer' },
  { key: 'source', label: 'Source in repo', mono: true },
  { key: 'pages', label: 'Documented as', muted: true },
];

const MAP_ROWS = [
  { layer: 'Foundations', source: 'index.css · tailwind.config.js', pages: 'Color, Typography, Spacing, Motion' },
  { layer: 'Atoms', source: 'ui/button · ui/badge · atoms.jsx', pages: 'Button, Badge, Eyebrow, Link & Pill' },
  { layer: 'Molecules', source: 'Toggle.jsx · atoms.jsx', pages: 'Toggle, TopLinks, Links, PlayTag' },
  { layer: 'Organisms', source: 'Stage top bar · ReadRoom · PlayCanvas', pages: 'Top Bar, Read Room, Play Canvas' },
  { layer: 'Templates', source: 'Stage.jsx', pages: 'Stage — the "Two Rooms" shell' },
  { layer: 'Pages', source: 'App.jsx', pages: 'Manuscript — the realized composition' },
];

export default function Overview() {
  return (
    <article>
      <PageHeader
        eyebrow="Design system · Manuscript"
        title="A small system, fully documented."
        lede="Manuscript is the serif-editorial direction of the LJ landing page. This site documents its foundations and components the way Material and Carbon do — organized by Atomic Design, with every specimen rendered from the real source so the docs can never drift."
      />

      <Section title="The “Two Rooms” idea">
        <Prose>
          The whole page is one shell — the <code>Stage</code> — holding two rooms that swap with a
          single animated transition: a <strong>Read</strong> room (structured editorial content) and a{' '}
          <strong>Play</strong> room (a three.js canvas). A segmented <code>Toggle</code> flips between
          them. Everything else in this system exists to fill, frame, or theme those two rooms.
        </Prose>
      </Section>

      <Section title="Atomic design, mapped to the code">
        <Prose>
          Each layer below points at the exact files it documents. Components are imported live into
          their specimens, so what you see here is what ships.
        </Prose>
        <Table columns={MAP_COLS} rows={MAP_ROWS} />
      </Section>

      <Section title="One machine, four themes">
        <Prose>
          The brand tokens and the stage machine live once in <code>index.css</code>. Manuscript is the
          theme you see here (serif type, indigo thumb, 3D-flip transition); the sibling repos —{' '}
          <code>index</code>, <code>marquee</code>, <code>switchboard</code> — re-skin the same machine
          through a CSS-variable <code>theme</code> object in <code>App.jsx</code>.
        </Prose>
        <Note>
          <strong>Keeping this honest:</strong> token tables, prop tables, and states matrices are
          authored by hand. When you change a token or a component, update its page in the same change —
          see <code>CLAUDE.md</code> at the repo root for the source-of-truth → doc-page map.
        </Note>
      </Section>

      <Section title="How to read a component page">
        <Prose>
          Every component page follows the same order: a live <strong>specimen</strong>, an{' '}
          <strong>anatomy</strong> or variant overview, a <strong>states matrix</strong> (default,
          hover, focus, active, disabled — pinned so transient looks are visible), a{' '}
          <strong>props</strong> table, and a copy-paste <strong>code</strong> snippet.
        </Prose>
        <H3>Source of truth</H3>
        <Prose>
          Tokens come from <code>src/index.css</code> (<code>:root</code>) and{' '}
          <code>tailwind.config.js</code>. Components come from <code>src/components/</code>. Content
          comes from <code>src/data/lj.js</code>.
        </Prose>
      </Section>
    </article>
  );
}
