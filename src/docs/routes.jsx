// Central registry: one source of truth for both the hash router (ROUTES)
// and the sidebar nav (NAV). Adding a component page? Add it in BOTH the
// import list and the matching NAV group below (see CLAUDE.md).

import Overview from './pages/Overview';
import Color from './pages/Color';
import Typography from './pages/Typography';
import Spacing from './pages/Spacing';
import Motion from './pages/Motion';
import ButtonPage from './pages/ButtonPage';
import BadgePage from './pages/BadgePage';
import EyebrowPage from './pages/EyebrowPage';
import LinkPage from './pages/LinkPage';
import TogglePage from './pages/TogglePage';
import TopLinksPage from './pages/TopLinksPage';
import LinksPage from './pages/LinksPage';
import PlayTagPage from './pages/PlayTagPage';
import TopBarPage from './pages/TopBarPage';
import ReadRoomPage from './pages/ReadRoomPage';
import PlayCanvasPage from './pages/PlayCanvasPage';
import StagePage from './pages/StagePage';
import ManuscriptPage from './pages/ManuscriptPage';

export const NAV = [
  {
    title: 'Overview',
    items: [{ path: '', label: 'Introduction' }],
  },
  {
    title: 'Foundations',
    items: [
      { path: 'foundations/color', label: 'Color' },
      { path: 'foundations/typography', label: 'Typography' },
      { path: 'foundations/spacing', label: 'Spacing & Layout' },
      { path: 'foundations/motion', label: 'Motion' },
    ],
  },
  {
    title: 'Atoms',
    items: [
      { path: 'atoms/button', label: 'Button' },
      { path: 'atoms/badge', label: 'Badge' },
      { path: 'atoms/eyebrow', label: 'Eyebrow' },
      { path: 'atoms/link', label: 'Link & Pill' },
    ],
  },
  {
    title: 'Molecules',
    items: [
      { path: 'molecules/toggle', label: 'Toggle' },
      { path: 'molecules/top-links', label: 'TopLinks' },
      { path: 'molecules/links', label: 'Links' },
      { path: 'molecules/play-tag', label: 'PlayTag' },
    ],
  },
  {
    title: 'Organisms',
    items: [
      { path: 'organisms/top-bar', label: 'Top Bar' },
      { path: 'organisms/read-room', label: 'Read Room' },
      { path: 'organisms/play-canvas', label: 'Play Canvas' },
    ],
  },
  {
    title: 'Templates',
    items: [{ path: 'templates/stage', label: 'Stage' }],
  },
  {
    title: 'Pages',
    items: [{ path: 'pages/manuscript', label: 'Manuscript' }],
  },
];

export const ROUTES = {
  '': Overview,
  'foundations/color': Color,
  'foundations/typography': Typography,
  'foundations/spacing': Spacing,
  'foundations/motion': Motion,
  'atoms/button': ButtonPage,
  'atoms/badge': BadgePage,
  'atoms/eyebrow': EyebrowPage,
  'atoms/link': LinkPage,
  'molecules/toggle': TogglePage,
  'molecules/top-links': TopLinksPage,
  'molecules/links': LinksPage,
  'molecules/play-tag': PlayTagPage,
  'organisms/top-bar': TopBarPage,
  'organisms/read-room': ReadRoomPage,
  'organisms/play-canvas': PlayCanvasPage,
  'templates/stage': StagePage,
  'pages/manuscript': ManuscriptPage,
};
