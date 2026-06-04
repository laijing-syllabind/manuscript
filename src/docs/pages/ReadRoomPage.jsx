import PageHeader from '../components/PageHeader';
import { Section, Prose, Note } from '../components/Layout';
import Anatomy from '../components/Anatomy';
import CodeBlock from '../components/CodeBlock';
import ScaledViewport from '../components/ScaledViewport';
import ReadRoom from '@/components/ReadRoom';

const ANATOMY = [
  { label: 'Eyebrow (gold)', desc: 'Role + tenure kicker above the headline.' },
  { label: 'Display headline', desc: '76px Newsreader, italic accent on the name.' },
  { label: 'Lede + sub', desc: 'Two serif paragraphs at 32ch / 44ch measures.' },
  { label: 'Links', desc: 'Pill button group, pinned to the column bottom.' },
  { label: 'Testimonial rail', desc: 'Right column behind a gold left border: pull-quote + “Now” block.' },
];

const SNIPPET = `import ReadRoom from '@/components/ReadRoom';

// Passed into Stage's read slot
<Stage read={<ReadRoom />} … />`;

export default function ReadRoomPage() {
  return (
    <article>
      <PageHeader
        eyebrow="Organisms"
        title="Read Room"
        lede="The Manuscript Read room: an asymmetric two-column editorial hero. A wide content column (eyebrow → headline → lede → links) and a narrow testimonial rail divided by a gold rule. All copy comes from LJ data."
      />

      <Section title="Specimen">
        <Prose>Rendered at the room's true 1280×720 size and scaled to fit, so the 76px headline keeps its real proportion.</Prose>
        <ScaledViewport width={1280} height={720} label="Read room">
          <ReadRoom />
        </ScaledViewport>
      </Section>

      <Section title="Anatomy">
        <Anatomy items={ANATOMY} />
      </Section>

      <Section title="States">
        <Note>
          The Read room itself is static — its “state” is positional: it is the <code>z-index:1</code>{' '}
          background room that the Play room reveals or covers during a transition. See{' '}
          <a className="lj-link" href="#/foundations/motion">Motion</a> and{' '}
          <a className="lj-link" href="#/templates/stage">Stage</a>.
        </Note>
      </Section>

      <Section title="Composition">
        <Prose>
          Built from the <a className="lj-link" href="#/atoms/eyebrow">Eyebrow</a> and{' '}
          <a className="lj-link" href="#/molecules/links">Links</a> atoms over serif type and the{' '}
          <code>1.55fr 1fr</code> hero grid.
        </Prose>
        <CodeBlock code={SNIPPET} />
      </Section>
    </article>
  );
}
