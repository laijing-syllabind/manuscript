import { useState } from 'react';
import PageHeader from '../components/PageHeader';
import { Section, Prose, Note } from '../components/Layout';
import Anatomy from '../components/Anatomy';
import CodeBlock from '../components/CodeBlock';
import ScaledViewport from '../components/ScaledViewport';
import Toggle from '@/components/Toggle';
import { TopLinks } from '@/components/atoms';

const SERIF = '"Newsreader", Georgia, serif';

const ANATOMY = [
  { label: 'Wordmark', desc: 'Brand mark, left-aligned (serif “Lai-Jing Chu”, 23px, -.01em).' },
  { label: 'Toggle', desc: 'Read / Play segmented control — the room switch.' },
  { label: 'TopLinks', desc: 'Social links + Syllabind CTA, right-aligned.' },
  { label: 'Divider', desc: '1.5px ink bottom border separating the bar from the rooms.' },
];

const SNIPPET = `<header className="lj-top">
  <div className="lj-wordmark">{wordmark}</div>
  <div className="lj-topright">
    <Toggle mode={mode} setMode={setMode} />
    {topRight /* e.g. <TopLinks /> */}
  </div>
</header>`;

export default function TopBarPage() {
  const [mode, setMode] = useState('read');
  return (
    <article>
      <PageHeader
        eyebrow="Organisms"
        title="Top Bar"
        lede="The persistent header inside Stage: wordmark on the left; the Read/Play Toggle and TopLinks on the right; a hairline ink divider below. It is the only chrome that stays put while the rooms swap."
      />

      <Section title="Specimen">
        <Prose>The real bar markup at its true 1280px width, scaled to fit — interactive: the toggle works.</Prose>
        <ScaledViewport width={1280} height={63} interactive label="Top bar">
          <header className="lj-top" style={{ background: 'var(--paper)' }}>
            <div className="lj-wordmark">
              <span style={{ fontFamily: SERIF, fontSize: 23, letterSpacing: '-.01em', color: 'var(--ink)' }}>
                Lai‑Jing&nbsp;Chu
              </span>
            </div>
            <div className="lj-topright">
              <Toggle mode={mode} setMode={setMode} />
              <TopLinks />
            </div>
          </header>
        </ScaledViewport>
      </Section>

      <Section title="Anatomy">
        <Anatomy items={ANATOMY} />
      </Section>

      <Section title="Composition">
        <CodeBlock code={SNIPPET} />
        <Note>
          Assembled by <a className="lj-link" href="#/templates/stage">Stage</a>; the wordmark and
          right-side content are passed in as <code>wordmark</code> and <code>topRight</code> props.
        </Note>
      </Section>
    </article>
  );
}
