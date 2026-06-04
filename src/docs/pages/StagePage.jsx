import PageHeader from '../components/PageHeader';
import { Section, Prose, Note } from '../components/Layout';
import PropsTable from '../components/PropsTable';
import Anatomy from '../components/Anatomy';
import CodeBlock from '../components/CodeBlock';
import ScaledViewport from '../components/ScaledViewport';
import Stage from '@/components/Stage';
import ReadRoom from '@/components/ReadRoom';
import { TopLinks, PlayTag } from '@/components/atoms';

const SERIF = '"Newsreader", Georgia, serif';

const ANATOMY = [
  { label: 'Top bar', desc: 'Wordmark · Toggle · topRight — the only persistent chrome.' },
  { label: 'Read room', desc: 'z-index 1 background room; receives the `read` prop.' },
  { label: 'Play room', desc: 'z-index 2 foreground room; PlayCanvas + the `playRoom` overlay.' },
  { label: 'Transition engine', desc: 'data-tr + data-mode on .lj-rooms drive flip / iris / cover / dissolve.' },
];

const PROPS = [
  { prop: 'theme', type: 'CSS-var object', def: '—', desc: 'Inline --paper/--ink/--indigo… + fontFamily; restyles the whole machine.' },
  { prop: 'wordmark', type: 'ReactNode', def: '—', desc: 'Brand mark for the top-left.' },
  { prop: 'topRight', type: 'ReactNode', def: '—', desc: 'Right side of the top bar (e.g. <TopLinks />).' },
  { prop: 'transition', type: "'flip' | 'iris' | 'cover' | 'dissolve'", def: "'flip'", desc: 'Room transition.' },
  { prop: 'canvasMode', type: 'string', def: "'field'", desc: 'PlayCanvas scene mode.' },
  { prop: 'canvasColors', type: '{ a, b }', def: '—', desc: 'Point-cloud colors.' },
  { prop: 'playRoom', type: 'ReactNode', def: '—', desc: 'Overlay on the canvas (e.g. <PlayTag />).' },
  { prop: 'read', type: 'ReactNode', def: '—', desc: 'The Read room content.' },
  { prop: 'initialMode', type: "'read' | 'play'", def: "'read'", desc: 'Which room shows first.' },
];

const THEME = {
  '--paper': '#FAF6EC',
  '--ink': '#15131F',
  '--indigo': '#28289C',
  '--gold': '#86632C',
  '--label': '#56566E',
  '--seg-thumb': '#28289C',
  '--seg-on': '#FAF6EC',
  '--play-bg': '#FAF6EC',
  fontFamily: SERIF,
};

const SNIPPET = `<Stage
  theme={theme}
  transition="flip"                 // 'flip' | 'iris' | 'cover' | 'dissolve'
  canvasMode="lines"
  canvasColors={{ a: '#28289C', b: '#86632C' }}
  wordmark={<span>Lai‑Jing Chu</span>}
  topRight={<TopLinks />}
  playRoom={<PlayTag />}
  read={<ReadRoom />}
/>`;

export default function StagePage() {
  return (
    <article>
      <PageHeader
        eyebrow="Templates"
        title="Stage — the “Two Rooms” shell"
        lede="The template that composes the whole page: a persistent top bar over two stacked rooms that swap with one CSS transition. Stage owns the read/play mode state and is restyled entirely through a theme CSS-var object — the same machine the other three directions re-skin."
      />

      <Section title="Live template">
        <Prose>
          The real <code>Stage</code>, themed for Manuscript and rendered at its true 1280×800 viewport,
          scaled to fit — interactive: toggle Read / Play to run the flip.
        </Prose>
        <ScaledViewport width={1280} height={800} interactive label="Interactive">
          <Stage
            theme={THEME}
            transition="flip"
            canvasMode="lines"
            canvasColors={{ a: '#28289C', b: '#86632C' }}
            wordmark={<span style={{ fontFamily: SERIF, fontSize: 23, letterSpacing: '-.01em', color: 'var(--ink)' }}>Lai‑Jing&nbsp;Chu</span>}
            topRight={<TopLinks />}
            playRoom={<PlayTag />}
            read={<ReadRoom />}
          />
        </ScaledViewport>
      </Section>

      <Section title="States · both rooms">
        <Prose>The two room states, rendered statically for reference and capture.</Prose>
        <div className="ds-frame-grid">
          {['read', 'play'].map((m) => (
            <ScaledViewport key={m} width={1280} height={800} label={m === 'read' ? 'Read room' : 'Play room'}>
              <Stage
                initialMode={m}
                theme={THEME}
                transition="flip"
                canvasMode="lines"
                canvasColors={{ a: '#28289C', b: '#86632C' }}
                wordmark={<span style={{ fontFamily: SERIF, fontSize: 23, letterSpacing: '-.01em', color: 'var(--ink)' }}>Lai‑Jing&nbsp;Chu</span>}
                topRight={<TopLinks />}
                playRoom={<PlayTag />}
                read={<ReadRoom />}
              />
            </ScaledViewport>
          ))}
        </div>
      </Section>

      <Section title="Anatomy">
        <Anatomy items={ANATOMY} />
      </Section>

      <Section title="Props">
        <PropsTable rows={PROPS} />
        <Note>
          Swapping <code>transition</code> changes the gesture; swapping the <code>theme</code> object
          changes the entire look. See the four transitions on{' '}
          <a className="lj-link" href="#/foundations/motion">Motion</a>.
        </Note>
      </Section>

      <Section title="Code">
        <CodeBlock code={SNIPPET} />
      </Section>
    </article>
  );
}
