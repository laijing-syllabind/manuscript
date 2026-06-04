import { useLayoutEffect, useRef, useState } from 'react';

/**
 * Renders children at a true design viewport (width × height) and scales the
 * whole thing down to fit the available column width — a realistic miniature
 * of a full-screen specimen, instead of cramming it into a small box.
 *
 * Inert by default (pointer-events:none) so static state frames capture cleanly
 * into Figma; pass `interactive` to let the miniature be a live specimen.
 *
 * Props:
 *   width, height — the design viewport in px (e.g. 1280 × 800)
 *   label         — optional caption shown under the frame
 *   interactive   — allow pointer events (live specimen) instead of inert
 */
export default function ScaledViewport({ width = 1280, height = 800, label, interactive, children }) {
  const ref = useRef(null);
  const [scale, setScale] = useState(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => setScale(el.clientWidth / width);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [width]);

  const s = scale ?? 0;

  return (
    <div className="ds-frame">
      <div
        ref={ref}
        className={`ds-viewport${interactive ? ' is-interactive' : ''}`}
        style={{ height: scale == null ? height : height * s }}
      >
        <div
          className="ds-viewport-inner"
          style={{ width, height, transform: `scale(${s})`, visibility: scale == null ? 'hidden' : 'visible' }}
        >
          {children}
        </div>
      </div>
      {label && (
        <div className="ds-frame-cap">
          <span>{label}</span>
          <code>1280 × {height} → {(s * 100).toFixed(0)}%</code>
        </div>
      )}
    </div>
  );
}
