/**
 * Toggle — the Read / Play segmented control with a sliding thumb.
 * Themed entirely through CSS vars (see index.css .lj-seg).
 */
export default function Toggle({ mode, setMode }) {
  return (
    <div className="lj-seg" data-mode={mode} role="tablist" aria-label="Read or Play">
      <span className="lj-thumb" aria-hidden="true" />
      <button className="read" role="tab" aria-selected={mode === 'read'} onClick={() => setMode('read')}>
        Read
      </button>
      <button className="play" role="tab" aria-selected={mode === 'play'} onClick={() => setMode('play')}>
        Play
      </button>
    </div>
  );
}
