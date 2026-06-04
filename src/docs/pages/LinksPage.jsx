import PageHeader from '../components/PageHeader';
import { Section, Prose, Note } from '../components/Layout';
import Specimen from '../components/Specimen';
import StatesGrid from '../components/StatesGrid';
import CodeBlock from '../components/CodeBlock';
import { Links } from '@/components/atoms';
import { Button } from '@/components/ui/button';

// States are inherited from Button (outline / gold). Shown here on the
// representative outline pill so the molecule's interaction is legible.
const STATES = [
  { label: 'Outline', cond: 'rest', demo: <Button variant="outline" size="sm">Medium</Button> },
  { label: 'Outline', cond: ':hover · ink fill', demo: <Button variant="outline" size="sm" className="!bg-ink !text-paper">Medium</Button> },
  { label: 'Outline', cond: ':focus-visible', demo: <Button variant="outline" size="sm" className="ds-force-ring">Medium</Button> },
  { label: 'Gold CTA', cond: ':hover · gold fill', demo: <Button variant="gold" size="sm" className="!bg-gold !text-paper">Syllabind ↗</Button> },
];

const SNIPPET = `import { Links } from '@/components/atoms';

// Renders every entry in LJ.links as a pill button —
// outline for the three socials, gold for the Syllabind CTA.
<Links />`;

export default function LinksPage() {
  return (
    <article>
      <PageHeader
        eyebrow="Molecules"
        title="Links"
        lede="The footer link group used inside the Read room: every entry in LJ.links rendered as a small pill Button — outline for socials, gold for the Syllabind CTA — wrapping responsively."
      />

      <Section title="Specimen">
        <Specimen>
          <Links />
        </Specimen>
      </Section>

      <Section title="States">
        <Prose>
          Each pill is a <a className="lj-link" href="#/atoms/button">Button</a>, so its states are the
          Button's: outline pills invert to an ink fill on hover, the gold CTA fills gold, and all share
          the indigo focus ring.
        </Prose>
        <StatesGrid states={STATES} />
        <Note>The group <code>flex-wrap</code>s with an 8px gap, so it reflows on narrow widths.</Note>
      </Section>

      <Section title="Code">
        <CodeBlock code={SNIPPET} />
      </Section>
    </article>
  );
}
