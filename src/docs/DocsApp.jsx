import { useEffect, useState } from 'react';
import Sidebar from './components/Sidebar';
import { ROUTES } from './routes';

// Manuscript theme — mirrors App.jsx so component specimens (Toggle thumb,
// play-room bg, etc.) render with the real direction tokens.
const THEME = {
  '--paper': '#FAF6EC',
  '--ink': '#15131F',
  '--indigo': '#28289C',
  '--gold': '#86632C',
  '--label': '#56566E',
  '--navy': '#0B0A1F',
  '--seg-thumb': '#28289C',
  '--seg-on': '#FAF6EC',
  '--play-bg': '#FAF6EC',
};

function parseHash() {
  return window.location.hash.replace(/^#\/?/, '');
}

export default function DocsApp() {
  const [route, setRoute] = useState(parseHash());

  useEffect(() => {
    const onHash = () => {
      setRoute(parseHash());
      window.scrollTo(0, 0);
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const known = route in ROUTES ? route : '';
  const Page = ROUTES[known];

  return (
    <div className="ds-app" style={THEME}>
      <Sidebar current={known} />
      <main className="ds-main">
        <div className="ds-content">
          <Page />
        </div>
      </main>
    </div>
  );
}
