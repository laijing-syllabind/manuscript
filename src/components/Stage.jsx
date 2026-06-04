import { useState } from 'react';
import Toggle from './Toggle';
import PlayCanvas from './PlayCanvas';

/**
 * Stage — the shared "Two Rooms" shell.
 * Top bar (wordmark · Read/Play toggle · links) over two rooms that swap
 * with a CSS transition. All look is driven by the `theme` CSS-var object
 * so each repo restyles the same machine.
 *
 * Props:
 *   theme        — inline CSS-var object (--paper, --ink, --indigo, fonts…)
 *   wordmark     — JSX for the brand mark
 *   topRight     — JSX for the right side of the top bar (links)
 *   transition   — 'flip' | 'iris' | 'cover' | 'dissolve'
 *   canvasMode   — three.js scene mode
 *   canvasColors — { a, b }
 *   playRoom     — JSX overlaid on the canvas (labels)
 *   read         — JSX for the Read room
 *   initialMode  — 'read' | 'play'
 */
export default function Stage({
  theme,
  wordmark,
  topRight,
  transition = 'flip',
  canvasMode = 'field',
  canvasColors,
  playRoom,
  read,
  initialMode = 'read',
}) {
  const [mode, setMode] = useState(initialMode);
  return (
    <div className="lj-stage" style={theme}>
      <header className="lj-top">
        <div className="lj-wordmark">{wordmark}</div>
        <div className="lj-topright">
          <Toggle mode={mode} setMode={setMode} />
          {topRight}
        </div>
      </header>

      <div className="lj-rooms" data-tr={transition} data-mode={mode}>
        <section className="lj-room read">{read}</section>
        <section className="lj-room play">
          <PlayCanvas active={mode === 'play'} mode={canvasMode} colors={canvasColors} />
          {playRoom}
        </section>
      </div>
    </div>
  );
}
