import { LJ } from '@/data/lj';
import { Eyebrow, Links } from '@/components/atoms';

const SERIF = '"Newsreader", Georgia, serif';

// Manuscript — literary serif editorial. Two-column hero.
export default function ReadRoom() {
  const q0 = LJ.quotes[0];
  return (
    <div style={{ height: '100%', boxSizing: 'border-box', padding: '44px 50px 36px', display: 'grid', gridTemplateColumns: '1.55fr 1fr', gap: 48 }}>
      <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <Eyebrow gold>Product designer &amp; PM · 7 years</Eyebrow>
        <h1 style={{ fontFamily: SERIF, fontWeight: 500, fontSize: 76, lineHeight: 0.96, letterSpacing: '-.022em', margin: '16px 0 0', color: 'var(--ink)' }}>
          Hi, I’m <span style={{ fontStyle: 'italic' }}>LJ</span>.
        </h1>
        <p style={{ fontFamily: SERIF, fontSize: 21, lineHeight: 1.5, maxWidth: '32ch', margin: '24px 0 0', color: '#29263a' }}>{LJ.lede}</p>
        <p style={{ fontFamily: SERIF, fontSize: 16.5, lineHeight: 1.6, maxWidth: '44ch', margin: '16px 0 0', color: 'var(--label)' }}>{LJ.syllabind}</p>
        <div style={{ marginTop: 'auto', paddingTop: 22 }}><Links /></div>
      </div>

      <div style={{ borderLeft: '1.5px solid var(--gold)', paddingLeft: 30, display: 'flex', flexDirection: 'column' }}>
        <Eyebrow>In their words</Eyebrow>
        <blockquote style={{ margin: '16px 0 0', fontFamily: SERIF, fontStyle: 'italic', fontSize: 22, lineHeight: 1.4, color: 'var(--ink)' }}>“{q0[0]}”</blockquote>
        <div style={{ marginTop: 12, fontFamily: '"Space Mono", monospace', fontSize: 11.5, letterSpacing: '.04em', color: 'var(--label)' }}>{q0[1]} · {q0[2]}</div>
        <div style={{ marginTop: 'auto', paddingTop: 22 }}>
          <Eyebrow gold>Now</Eyebrow>
          <p style={{ fontFamily: SERIF, fontSize: 18, lineHeight: 1.45, margin: '8px 0 0', color: 'var(--ink)' }}>{LJ.now}</p>
        </div>
      </div>
    </div>
  );
}
