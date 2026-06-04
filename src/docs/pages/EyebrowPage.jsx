import PageHeader from '../components/PageHeader';
import { Section, Prose } from '../components/Layout';
import Specimen from '../components/Specimen';
import StatesGrid from '../components/StatesGrid';
import PropsTable from '../components/PropsTable';
import CodeBlock from '../components/CodeBlock';
import { Eyebrow } from '@/components/atoms';

const STATES = [
  { label: 'Default', cond: 'label grey', demo: <Eyebrow>In their words</Eyebrow> },
  { label: 'Gold', cond: 'gold', demo: <Eyebrow gold>Now</Eyebrow> },
];

const PROPS = [
  { prop: 'children', type: 'ReactNode', def: '—', desc: 'The label text (rendered uppercase).' },
  { prop: 'gold', type: 'boolean', def: 'false', desc: 'Use gold instead of label-grey.' },
];

const SNIPPET = `import { Eyebrow } from '@/components/atoms';

<Eyebrow>In their words</Eyebrow>
<Eyebrow gold>Product designer & PM · 7 years</Eyebrow>`;

export default function EyebrowPage() {
  return (
    <article>
      <PageHeader
        eyebrow="Atoms"
        title="Eyebrow"
        lede="The system's smallest typographic atom: a Space Mono, 11px, .16em-tracked, uppercase kicker that labels sections above headings. Two color states — muted label-grey or gold."
      />

      <Section title="Specimen">
        <Specimen bg="plain">
          <div style={{ display: 'grid', gap: 14 }}>
            <Eyebrow>In their words</Eyebrow>
            <Eyebrow gold>Product designer &amp; PM · 7 years</Eyebrow>
          </div>
        </Specimen>
      </Section>

      <Section title="States">
        <Prose>Color is the only variable — driven by the <code>gold</code> prop.</Prose>
        <StatesGrid states={STATES} />
      </Section>

      <Section title="Props">
        <PropsTable rows={PROPS} />
      </Section>

      <Section title="Code">
        <CodeBlock code={SNIPPET} />
      </Section>
    </article>
  );
}
