import Stage from '@/components/Stage';
import ReadRoom from '@/components/ReadRoom';
import { TopLinks, PlayTag } from '@/components/atoms';

const SERIF = '"Newsreader", Georgia, serif';

// Manuscript — serif editorial · 3D flip.
export default function App() {
  const theme = {
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
  return (
    <Stage
      theme={theme}
      transition="flip" // 'flip' | 'iris' | 'cover' | 'dissolve'
      canvasMode="bubble" // 'bubble' (JazzBubble) | 'field' | 'network' | 'wave' | 'grid'
      canvasColors={{ a: '#28289C', b: '#86632C' }}
      wordmark={<span style={{ fontFamily: SERIF, fontSize: 23, letterSpacing: '-.01em', color: 'var(--ink)' }}>Lai‑Jing&nbsp;Chu</span>}
      topRight={<TopLinks />}
      playRoom={<PlayTag />}
      read={<ReadRoom />}
    />
  );
}
