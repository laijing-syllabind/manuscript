// Color swatches. `swatches`: [{ name, value, cssVar?, usage?, border? }].
// `border` draws a hairline under very light chips so they read on paper.
export default function SwatchGrid({ swatches }) {
  return (
    <div className="ds-swatch-grid">
      {swatches.map((s) => (
        <div className="ds-swatch" key={s.name}>
          <div
            className="ds-swatch-chip"
            style={{
              background: s.value,
              borderBottom: s.border ? '1px solid var(--ds-line)' : undefined,
            }}
          />
          <div className="ds-swatch-meta">
            <div className="ds-swatch-name">{s.name}</div>
            <div className="ds-swatch-val">
              {s.value}
              {s.cssVar ? ` · ${s.cssVar}` : ''}
            </div>
            {s.usage && <div className="ds-swatch-usage">{s.usage}</div>}
          </div>
        </div>
      ))}
    </div>
  );
}
