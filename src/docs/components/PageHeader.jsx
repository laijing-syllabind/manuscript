import { Eyebrow } from '@/components/atoms';

// Page masthead — reuses the real Eyebrow atom so the docs stay on-brand.
export default function PageHeader({ eyebrow, title, lede }) {
  return (
    <header className="ds-page-header">
      {eyebrow && <Eyebrow gold>{eyebrow}</Eyebrow>}
      <h1 className="ds-page-title">{title}</h1>
      {lede && <p className="ds-page-lede">{lede}</p>}
    </header>
  );
}
