import PageHeader from '../components/PageHeader';
import { Section, Prose, Note } from '../components/Layout';
import SwatchGrid from '../components/SwatchGrid';
import TokenTable from '../components/TokenTable';
import CodeBlock from '../components/CodeBlock';

const BRAND = [
  { name: 'Paper', value: '#FAF6EC', cssVar: '--paper', usage: 'Primary background / light foreground', border: true },
  { name: 'Ink', value: '#15131F', cssVar: '--ink', usage: 'Primary text, borders' },
  { name: 'Indigo', value: '#28289C', cssVar: '--indigo', usage: 'Primary accent, links, focus ring' },
  { name: 'Gold', value: '#86632C', cssVar: '--gold', usage: 'Secondary accent, editorial rules' },
  { name: 'Label', value: '#56566E', cssVar: '--label', usage: 'Muted / meta text' },
  { name: 'Navy', value: '#0B0A1F', cssVar: '--navy', usage: 'Darkest surface (Play room on dark themes)' },
];

const TOKEN_ROWS = [
  { name: 'Paper', cssVar: '--paper', tw: 'bg-paper', value: '#FAF6EC', usage: 'Page + room background' },
  { name: 'Ink', cssVar: '--ink', tw: 'text-ink / border-ink', value: '#15131F', usage: 'Body text, 1.5px borders' },
  { name: 'Indigo', cssVar: '--indigo', tw: 'bg-indigo / ring-indigo', value: '#28289C', usage: 'Accent, hover, focus' },
  { name: 'Gold', cssVar: '--gold', tw: 'text-gold / border-gold', value: '#86632C', usage: 'Secondary accent' },
  { name: 'Label', cssVar: '--label', tw: 'text-label', value: '#56566E', usage: 'Muted text' },
  { name: 'Navy', cssVar: '--navy', tw: 'bg-navy', value: '#0B0A1F', usage: 'Dark Play surface' },
];

const ALIAS_ROWS = [
  { name: 'background', cssVar: '—', tw: 'bg-background', value: '#FAF6EC', usage: 'Aliases paper (shadcn)' },
  { name: 'foreground', cssVar: '—', tw: 'text-foreground', value: '#15131F', usage: 'Aliases ink (shadcn)' },
  { name: 'border', cssVar: '—', tw: 'border-border', value: '#15131F', usage: 'Aliases ink (shadcn)' },
  { name: 'primary', cssVar: '—', tw: 'bg-primary', value: '#28289C', usage: 'fg #FAF6EC' },
  { name: 'secondary', cssVar: '—', tw: 'bg-secondary', value: '#86632C', usage: 'fg #FAF6EC' },
  { name: 'muted', cssVar: '—', tw: 'bg-muted', value: '#EFE9DC', usage: 'fg #56566E' },
];

const SNIPPET = `/* index.css */
:root {
  --paper:  #FAF6EC;
  --ink:    #15131F;
  --indigo: #28289C;
  --gold:   #86632C;
  --label:  #56566E;
  --navy:   #0B0A1F;
}`;

export default function Color() {
  return (
    <article>
      <PageHeader
        eyebrow="Foundations"
        title="Color"
        lede="Six brand values define the entire palette: a warm paper, a near-black ink, an indigo accent, a gold secondary, a muted label grey, and a deep navy. They live as CSS variables in :root and as Tailwind aliases."
      />

      <Section title="Brand palette">
        <SwatchGrid swatches={BRAND} />
      </Section>

      <Section title="Tokens">
        <Prose>Defined once in <code>:root</code> and mirrored into <code>tailwind.config.js</code>.</Prose>
        <TokenTable rows={TOKEN_ROWS} />
      </Section>

      <Section title="shadcn aliases">
        <Prose>
          The <code>Button</code> and <code>Badge</code> primitives speak the shadcn vocabulary, so the
          palette is also exposed under semantic aliases.
        </Prose>
        <TokenTable rows={ALIAS_ROWS} />
      </Section>

      <Section title="Usage">
        <Note>
          <strong>Contrast:</strong> ink on paper and paper on indigo/ink/gold all clear AA for body
          text. Gold (#86632C) is a mid-tone — reserve it for accents and large text, not small body
          copy on paper.
        </Note>
        <CodeBlock lang="css" code={SNIPPET} />
      </Section>
    </article>
  );
}
