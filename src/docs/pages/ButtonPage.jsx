import { useState } from 'react';
import PageHeader from '../components/PageHeader';
import { Section, Prose, Note } from '../components/Layout';
import Specimen from '../components/Specimen';
import StatesGrid from '../components/StatesGrid';
import PropsTable from '../components/PropsTable';
import CodeBlock from '../components/CodeBlock';
import { Button } from '@/components/ui/button';

const VARIANTS = ['default', 'outline', 'gold', 'ghost', 'link'];
const SIZES = ['sm', 'default', 'lg'];

// Pinned hover looks — mirror the `hover:` classes in ui/button.jsx so the
// transient state is visible at rest in the matrix.
const HOVER = {
  default: '!bg-indigo !text-paper',
  outline: '!bg-ink !text-paper',
  gold: '!bg-gold !text-paper',
  ghost: '!text-indigo',
  link: '!text-indigo underline',
};

const STATES = [
  { label: 'Default', cond: 'rest', demo: <Button>Button</Button> },
  { label: 'Hover', cond: ':hover', demo: <Button className={HOVER.default}>Button</Button> },
  { label: 'Focus', cond: ':focus-visible', demo: <Button className="ds-force-ring">Button</Button> },
  { label: 'Active', cond: ':active (= hover)', demo: <Button className={HOVER.default}>Button</Button> },
  { label: 'Disabled', cond: 'disabled', demo: <Button disabled>Button</Button> },
];

const PROPS = [
  { prop: 'variant', type: "'default' | 'outline' | 'gold' | 'ghost' | 'link'", def: "'default'", desc: 'Visual style.' },
  { prop: 'size', type: "'sm' | 'default' | 'lg'", def: "'default'", desc: 'Height + horizontal padding.' },
  { prop: 'asChild', type: 'boolean', def: 'false', desc: 'Render via Radix Slot — merge styles onto the child (e.g. an <a>).' },
  { prop: 'className', type: 'string', def: '—', desc: 'Merged onto the variant classes via cn().' },
  { prop: '…props', type: 'button HTML attrs', def: '—', desc: 'onClick, disabled, type, aria-*, etc.' },
];

const SNIPPET = `import { Button } from '@/components/ui/button';

// Standard
<Button variant="default" size="default">Read more</Button>

// As a link (asChild merges styles onto the <a>)
<Button asChild variant="gold" size="sm">
  <a href="https://www.syllabind.com" target="_blank" rel="noreferrer">
    Syllabind ↗
  </a>
</Button>`;

// Interactive specimen — pick a variant / size / disabled.
function LiveControls() {
  const [variant, setVariant] = useState('default');
  const [size, setSize] = useState('default');
  const [disabled, setDisabled] = useState(false);
  return (
    <div>
      <Specimen center>
        <Button variant={variant} size={size} disabled={disabled}>
          Button
        </Button>
      </Specimen>
      <div className="ds-controls">
        <div className="ds-control">
          <span className="ds-control-label">variant</span>
          <div className="ds-seg">
            {VARIANTS.map((v) => (
              <button key={v} className={variant === v ? 'is-on' : ''} onClick={() => setVariant(v)} type="button">
                {v}
              </button>
            ))}
          </div>
        </div>
        <div className="ds-control">
          <span className="ds-control-label">size</span>
          <div className="ds-seg">
            {SIZES.map((s) => (
              <button key={s} className={size === s ? 'is-on' : ''} onClick={() => setSize(s)} type="button">
                {s}
              </button>
            ))}
          </div>
        </div>
        <div className="ds-control">
          <span className="ds-control-label">disabled</span>
          <div className="ds-seg">
            {[false, true].map((d) => (
              <button key={String(d)} className={disabled === d ? 'is-on' : ''} onClick={() => setDisabled(d)} type="button">
                {d ? 'true' : 'false'}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ButtonPage() {
  return (
    <article>
      <PageHeader
        eyebrow="Atoms"
        title="Button"
        lede="The shadcn/ui Button, adapted to brand tokens. Five variants × three sizes, fully rounded, with hover, keyboard-focus, and disabled states baked in. Use asChild to make any element (usually a link) a button."
      />

      <Section title="Playground">
        <LiveControls />
        <Prose>Explore variants and sizes here; the States and Variant × size sections below are static.</Prose>
      </Section>

      <Section title="States">
        <Prose>
          Interaction states for the <code>default</code> variant. Hover and active share one rule
          (there is no separate <code>:active</code> style); focus shows the indigo keyboard ring;
          disabled drops to 50% opacity and ignores pointer events.
        </Prose>
        <StatesGrid states={STATES} />
      </Section>

      <Section title="Variant × size">
        <Prose>Every variant rendered at each size.</Prose>
        <Specimen block>
          {VARIANTS.map((v) => (
            <div key={v} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '10px 0', flexWrap: 'wrap' }}>
              <code style={{ width: 84, fontFamily: '"Space Mono", monospace', fontSize: 12, color: 'var(--label)' }}>{v}</code>
              {SIZES.map((s) => (
                <Button key={s} variant={v} size={s}>
                  Button
                </Button>
              ))}
              <Button variant={v} disabled>
                disabled
              </Button>
            </div>
          ))}
        </Specimen>
        <Note>
          <strong>Focus ring:</strong> all variants share <code>focus-visible:ring-2 ring-indigo
          ring-offset-2</code>. <strong>Disabled:</strong> all variants share{' '}
          <code>disabled:opacity-50 disabled:pointer-events-none</code>.
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
