import PageHeader from '../components/PageHeader';
import { Section, Prose } from '../components/Layout';
import TokenTable from '../components/TokenTable';
import Specimen from '../components/Specimen';
import CodeBlock from '../components/CodeBlock';
import { Eyebrow } from '@/components/atoms';

const SERIF = '"Newsreader", Georgia, serif';
const MONO = '"Space Mono", ui-monospace, monospace';

const FAMILY_COLS = [
  { key: 'name', label: 'Family' },
  { key: 'tw', label: 'Tailwind', mono: true },
  { key: 'stack', label: 'Stack', mono: true },
  { key: 'usage', label: 'Usage', muted: true },
];
const FAMILIES = [
  { name: 'Newsreader', tw: 'font-serif', stack: 'Newsreader, Georgia, serif', usage: 'Headings + editorial body' },
  { name: 'Space Mono', tw: 'font-mono', stack: '"Space Mono", ui-monospace', usage: 'Eyebrows, meta, labels' },
  { name: 'Space Grotesk', tw: 'font-grotesk', stack: '"Space Grotesk", system-ui', usage: 'UI / grotesk directions' },
  { name: 'Bricolage Grotesque', tw: 'font-display', stack: '"Bricolage Grotesque", system-ui', usage: 'Display type (Marquee)' },
  { name: 'Hanken Grotesk', tw: 'font-hanken', stack: '"Hanken Grotesk", system-ui', usage: 'Alt sans' },
];

const SCALE = [
  { px: 76, lh: 0.96, ls: '-.022em', role: 'Display h1', sample: 'Hi, I’m LJ.' },
  { px: 22, lh: 1.4, ls: '0', role: 'Lead quote', sample: 'In their words — a pull quote.' },
  { px: 21, lh: 1.5, ls: '0', role: 'Lede', sample: 'Product designer and PM.' },
  { px: 18, lh: 1.45, ls: '0', role: 'Body', sample: 'Reimagining product education.' },
  { px: 16.5, lh: 1.6, ls: '0', role: 'Body small', sample: 'Now building Syllabind.' },
  { px: 12.5, lh: 1.4, ls: '0', role: 'Nav link', sample: 'Medium · LinkedIn · Email' },
  { px: 11.5, lh: 1.4, ls: '.04em', role: 'Meta (mono)', sample: 'NICK WOODS · POLYCAM', mono: true },
  { px: 11, lh: 1.4, ls: '.16em', role: 'Eyebrow (mono)', sample: 'PRODUCT DESIGNER', mono: true },
];

const SPACING_COLS = [
  { key: 'token', label: 'letter-spacing', mono: true },
  { key: 'where', label: 'Applied to', muted: true },
];
const TRACKING = [
  { token: '-.022em', where: 'Display h1 (tight)' },
  { token: '-.01em', where: 'Wordmark / display headings' },
  { token: '.04em', where: 'Button text, meta lines' },
  { token: '.14em', where: 'PlayTag uppercase labels' },
  { token: '.16em', where: 'Eyebrow uppercase labels' },
];

const SNIPPET = `<h1 style={{
  fontFamily: '"Newsreader", Georgia, serif',
  fontWeight: 500,
  fontSize: 76,
  lineHeight: 0.96,
  letterSpacing: '-.022em',
}}>
  Hi, I’m <span style={{ fontStyle: 'italic' }}>LJ</span>.
</h1>`;

export default function Typography() {
  return (
    <article>
      <PageHeader
        eyebrow="Foundations"
        title="Typography"
        lede="Manuscript is a serif-editorial voice: Newsreader for headings and body, Space Mono for labels and meta. Sizes are set in px inline at the component level; the scale below is the set actually used across the page."
      />

      <Section title="Families">
        <TokenTable columns={FAMILY_COLS} rows={FAMILIES} />
        <Specimen bg="plain" block>
          <div style={{ display: 'grid', gap: 14 }}>
            <div style={{ fontFamily: SERIF, fontSize: 30 }}>Newsreader — editorial serif</div>
            <div style={{ fontFamily: '"Space Grotesk", system-ui', fontSize: 26 }}>Space Grotesk — grotesk sans</div>
            <div style={{ fontFamily: '"Bricolage Grotesque", system-ui', fontSize: 26, fontWeight: 600 }}>Bricolage — display</div>
            <div style={{ fontFamily: '"Hanken Grotesk", system-ui', fontSize: 24 }}>Hanken Grotesk — alt sans</div>
            <div style={{ fontFamily: MONO, fontSize: 18 }}>Space Mono — labels &amp; meta</div>
          </div>
        </Specimen>
      </Section>

      <Section title="Type scale">
        <Prose>Each row is rendered at its real size, line-height, and tracking.</Prose>
        <Specimen bg="plain" block>
          <div>
            {SCALE.map((s) => (
              <div className="ds-type-row" key={s.role}>
                <div className="ds-type-meta">
                  {s.px}px / {s.lh}
                  <br />
                  ls {s.ls}
                  <br />
                  {s.role}
                </div>
                <div
                  className="ds-type-sample"
                  style={{
                    fontFamily: s.mono ? MONO : SERIF,
                    fontSize: s.px,
                    lineHeight: s.lh,
                    letterSpacing: s.ls,
                    textTransform: s.mono ? 'uppercase' : 'none',
                  }}
                >
                  {s.sample}
                </div>
              </div>
            ))}
          </div>
        </Specimen>
      </Section>

      <Section title="Tracking tokens">
        <TokenTable columns={SPACING_COLS} rows={TRACKING} />
      </Section>

      <Section title="The Eyebrow recipe">
        <Prose>
          The most reused type pattern: Space Mono, 11px, <code>.16em</code> tracking, uppercase, in
          label-grey or gold. It is packaged as the <code>Eyebrow</code> atom.
        </Prose>
        <Specimen>
          <div style={{ display: 'grid', gap: 12 }}>
            <Eyebrow>In their words</Eyebrow>
            <Eyebrow gold>Product designer &amp; PM · 7 years</Eyebrow>
          </div>
        </Specimen>
        <CodeBlock code={SNIPPET} />
      </Section>
    </article>
  );
}
