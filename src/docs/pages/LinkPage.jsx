import PageHeader from '../components/PageHeader';
import { Section, Prose, Note } from '../components/Layout';
import Specimen from '../components/Specimen';
import StatesGrid from '../components/StatesGrid';
import TokenTable from '../components/TokenTable';
import CodeBlock from '../components/CodeBlock';

const link = (props) => (
  <a className="lj-link" style={{ fontFamily: '"Space Mono", monospace', fontSize: 13 }} {...props}>
    Medium
  </a>
);
const pill = (extra) => (
  <span className={`lj-pill${extra ? ' ' + extra : ''}`} style={{ fontFamily: '"Space Mono", monospace', fontSize: 12.5 }}>
    LinkedIn
  </span>
);

const LINK_STATES = [
  { label: 'Link', cond: 'rest · .72 opacity', demo: link() },
  { label: 'Link', cond: ':hover · indigo', demo: <span className="ds-force-hover">{link()}</span> },
];

const PILL_STATES = [
  { label: 'Pill', cond: 'rest', demo: pill() },
  { label: 'Pill', cond: ':hover · ink fill', demo: <span className="ds-force-hover lj-pill" style={{ fontFamily: '"Space Mono", monospace', fontSize: 12.5 }}>LinkedIn</span> },
  { label: 'Pill · gold', cond: 'rest', demo: pill('gold') },
  { label: 'Pill · gold', cond: ':hover · gold fill', demo: <span className="ds-force-hover lj-pill gold" style={{ fontFamily: '"Space Mono", monospace', fontSize: 12.5 }}>Syllabind</span> },
];

const CLASS_COLS = [
  { key: 'cls', label: 'Class', mono: true },
  { key: 'rest', label: 'Rest', muted: true },
  { key: 'hover', label: 'Hover', muted: true },
];
const CLASSES = [
  { cls: '.lj-link', rest: 'ink @ .72 opacity, no underline', hover: 'opacity 1, color indigo' },
  { cls: '.lj-pill', rest: '1.4px ink border, transparent', hover: 'fill ink, text paper' },
  { cls: '.lj-pill.gold', rest: '1.4px gold border, gold text', hover: 'fill gold, text paper' },
];

const SNIPPET = `{/* Inline text link */}
<a className="lj-link" href="https://laijingchu.medium.com">Medium</a>

{/* Outlined pill (and its gold modifier) */}
<a className="lj-pill" href="…">LinkedIn</a>
<a className="lj-pill gold" href="…">Syllabind ↗</a>`;

export default function LinkPage() {
  return (
    <article>
      <PageHeader
        eyebrow="Atoms"
        title="Link & Pill"
        lede="Two CSS-only link treatments from index.css. .lj-link is a quiet inline text link that brightens to indigo on hover; .lj-pill is a bordered chip that inverts its fill on hover, with a gold modifier."
      />

      <Section title="Specimen">
        <Specimen>
          <a className="lj-link" style={{ fontFamily: '"Space Mono", monospace', fontSize: 13 }}>Medium</a>
          <span className="lj-pill" style={{ fontFamily: '"Space Mono", monospace', fontSize: 12.5 }}>LinkedIn</span>
          <span className="lj-pill gold" style={{ fontFamily: '"Space Mono", monospace', fontSize: 12.5 }}>Syllabind ↗</span>
        </Specimen>
        <Prose>Hover any of the above to see the live transition.</Prose>
      </Section>

      <Section title="Link states">
        <StatesGrid states={LINK_STATES} />
      </Section>

      <Section title="Pill states">
        <StatesGrid states={PILL_STATES} />
      </Section>

      <Section title="Classes">
        <TokenTable columns={CLASS_COLS} rows={CLASSES} />
        <Note>
          These are plain classes, not components — apply them to an <code>&lt;a&gt;</code>. For a pill
          that needs to be a real <code>Button</code> (e.g. the Syllabind CTA), prefer{' '}
          <code>&lt;Button asChild variant="gold"&gt;</code> instead.
        </Note>
      </Section>

      <Section title="Code">
        <CodeBlock code={SNIPPET} />
      </Section>
    </article>
  );
}
