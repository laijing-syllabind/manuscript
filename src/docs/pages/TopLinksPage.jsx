import PageHeader from '../components/PageHeader';
import { Section, Prose, Note } from '../components/Layout';
import Specimen from '../components/Specimen';
import StatesGrid from '../components/StatesGrid';
import PropsTable from '../components/PropsTable';
import CodeBlock from '../components/CodeBlock';
import { TopLinks } from '@/components/atoms';

const STATES = [
  { label: 'Default', cond: 'on paper', demo: <TopLinks /> },
  { label: 'Light', cond: 'light · on dark', demo: <TopLinks light />, dark: true },
];

const PROPS = [
  { prop: 'font', type: 'string', def: 'Space Mono', desc: 'Font family for the link labels.' },
  { prop: 'light', type: 'boolean', def: 'false', desc: 'Tint plain links paper-translucent for dark backgrounds.' },
];

const SNIPPET = `import { TopLinks } from '@/components/atoms';

// In the Stage top bar
<Stage topRight={<TopLinks />} … />

// Over a dark play room
<TopLinks light />`;

export default function TopLinksPage() {
  return (
    <article>
      <PageHeader
        eyebrow="Molecules"
        title="TopLinks"
        lede="The header link cluster: Medium, LinkedIn, and Email as quiet .lj-link text links, followed by the Syllabind call-to-action as a gold Button. Reads off the shared LJ.links data."
      />

      <Section title="Specimen">
        <Specimen>
          <TopLinks />
        </Specimen>
      </Section>

      <Section title="States">
        <Prose>
          The <code>light</code> prop tints the three plain links to translucent paper so they hold up
          over a dark Play room. The gold CTA Button is unchanged.
        </Prose>
        <StatesGrid states={STATES} wide />
      </Section>

      <Section title="Props">
        <PropsTable rows={PROPS} />
        <Note>
          Composes the <a className="lj-link" href="#/atoms/button">Button</a> (gold, sm, asChild) and{' '}
          <a className="lj-link" href="#/atoms/link">.lj-link</a> atoms.
        </Note>
      </Section>

      <Section title="Code">
        <CodeBlock code={SNIPPET} />
      </Section>
    </article>
  );
}
