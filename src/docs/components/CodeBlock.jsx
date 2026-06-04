import { useState } from 'react';
import { Button } from '@/components/ui/button';

// Snippet with a Copy button — the button is the real brand Button.
export default function CodeBlock({ code, lang = 'jsx' }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    } catch {
      /* clipboard unavailable (e.g. insecure context) — no-op */
    }
  };
  return (
    <div className={`ds-code${lang ? ' has-lang' : ''}`}>
      {lang && <span className="ds-code-lang">{lang}</span>}
      <div className="ds-code-copy">
        <Button variant="gold" size="sm" type="button" onClick={copy}>
          {copied ? 'Copied ✓' : 'Copy'}
        </Button>
      </div>
      <pre>
        <code>{code}</code>
      </pre>
    </div>
  );
}
