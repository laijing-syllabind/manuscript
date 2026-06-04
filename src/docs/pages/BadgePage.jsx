import PageHeader from '../components/PageHeader';
import { Section, Prose, Note } from '../components/Layout';
import Specimen from '../components/Specimen';
import StatesGrid from '../components/StatesGrid';
import PropsTable from '../components/PropsTable';
import CodeBlock from '../components/CodeBlock';
import { Badge } from '@/components/ui/badge';

const VARIANT_STATES = [
  { label: 'Default', cond: 'variant="default"', demo: <Badge>Design systems</Badge> },
  { label: 'Gold', cond: 'variant="gold"', demo: <Badge variant="gold">Research-led</Badge> },
  { label: 'Solid', cond: 'variant="solid"', demo: <Badge variant="solid">Growth</Badge> },
];

const PROPS = [
  { prop: 'variant', type: "'default' | 'gold' | 'solid'", def: "'default'", desc: 'Outlined ink, outlined gold, or solid indigo fill.' },
  { prop: 'className', type: 'string', def: '—', desc: 'Merged onto the variant classes via cn().' },
  { prop: '…props', type: 'div HTML attrs', def: '—', desc: 'Standard div attributes.' },
];

const SNIPPET = `import { Badge } from '@/components/ui/badge';

<Badge>Design systems</Badge>
<Badge variant="gold">Research-led</Badge>
<Badge variant="solid">Growth</Badge>`;

export default function BadgePage() {
  return (
    <article>
      <PageHeader
        eyebrow="Atoms"
        title="Badge"
        lede="A small, pill-shaped, monospace label for tags and categories. Presentational only — no interactive states — in three variants: outlined ink, outlined gold, and solid indigo."
      />

      <Section title="Specimen">
        <Specimen>
          <Badge>Design systems</Badge>
          <Badge variant="gold">Research-led</Badge>
          <Badge variant="solid">Growth</Badge>
        </Specimen>
      </Section>

      <Section title="States / variants">
        <Prose>
          Badge is non-interactive — it has no hover, focus, or disabled states by design (it sets{' '}
          <code>focus:outline-none</code> and only transitions color). Its three variants are its full
          surface area.
        </Prose>
        <StatesGrid states={VARIANT_STATES} />
        <Note>
          The solid variant fills with <code>indigo</code> and paper text; the outlined variants are
          transparent with a <code>1px</code> border. All use <code>font-mono</code>, <code>text-xs</code>,
          and a fully-rounded pill shape.
        </Note>
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
