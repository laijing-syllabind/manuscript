import { useEffect, useState } from 'react';
import { LJ } from '@/data/lj';
import { Eyebrow, Links } from '@/components/atoms';

const SERIF = '"Newsreader", Georgia, serif';

const HOLD_MS = 6000; // how long each quote rests fully visible
const FADE_MS = 700; // fade out / fade in duration

// Manuscript — literary serif editorial. Two-column hero.
export default function ReadRoom() {
  const quotes = LJ.quotes;
  const [idx, setIdx] = useState(0);
  const [visible, setVisible] = useState(true);

  // Circulate the "In their words" quotes: fade the current one out, swap it
  // while invisible, then fade the next one in. Honors reduced-motion by
  // resting on the first quote.
  useEffect(() => {
    if (quotes.length < 2) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let swapTimer;
    const loop = setInterval(() => {
      setVisible(false);
      swapTimer = setTimeout(() => {
        setIdx((i) => (i + 1) % quotes.length);
        setVisible(true);
      }, FADE_MS);
    }, HOLD_MS + FADE_MS);

    return () => { clearInterval(loop); clearTimeout(swapTimer); };
  }, [quotes.length]);

  const q = quotes[idx];
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
        <div style={{ opacity: visible ? 1 : 0, transition: `opacity ${FADE_MS}ms ease-in-out` }}>
          <blockquote style={{ margin: '16px 0 0', fontFamily: SERIF, fontStyle: 'italic', fontSize: 22, lineHeight: 1.4, color: 'var(--ink)' }}>“{q[0]}”</blockquote>
          <div style={{ marginTop: 12, fontFamily: '"Space Mono", monospace', fontSize: 11.5, letterSpacing: '.04em', color: 'var(--label)' }}>{q[1]} · {q[2]}</div>
        </div>
        <div style={{ marginTop: 'auto', paddingTop: 22 }}>
          <Eyebrow gold>Now</Eyebrow>
          <p style={{ fontFamily: SERIF, fontSize: 18, lineHeight: 1.45, margin: '8px 0 0', color: 'var(--ink)' }}>{LJ.now}</p>
        </div>
      </div>
    </div>
  );
}
