// Tuned configuration for the JazzBubble scene, salvaged from the exercise's
// last-saved defaults (bubble/main.js) and re-themed to the Manuscript brand
// palette (paper / indigo / gold / navy). These are the starting values; the
// Tweakpane "Mixer Controls" (see mixer.js) tunes them live and persists edits
// to localStorage, so what you see may reflect saved tweaks on top of these.

// Brand tokens (mirror of :root in src/index.css)
export const BRAND = {
  paper: '#FAF6EC',
  ink: '#15131F',
  indigo: '#28289C',
  gold: '#86632C',
  label: '#56566E',
  navy: '#0B0A1F',
};

// Animated FlowingGradient background (rendered via shaders/js, used as the
// three.js scene background texture). Re-themed paper → gold → indigo → navy.
export const gradientConfig = {
  colorA: BRAND.paper,
  colorB: '#E2D7BC', // warm gold-tinted paper
  colorC: BRAND.indigo,
  colorD: BRAND.navy,
  colorSpace: 'oklch',
  speed: 1,
  distortion: 0.5,
  seed: 0,
};

// MeshPhysicalMaterial "glass" blob. Physical params kept from the tuned
// exercise; emissive/specular/sheen re-themed to indigo + gold.
export const glassConfig = {
  color: '#ffffff',
  transmission: 1,
  thickness: 0.5,
  roughness: 0.14,
  metalness: 0.42,
  ior: 1.27,
  reflectivity: 0.61,
  envMapIntensity: 2.12,
  clearcoat: 0.55,
  clearcoatRoughness: 0.23,
  iridescence: 0,
  iridescenceIOR: 1.3,
  sheen: 0.59,
  sheenRoughness: 1,
  sheenColor: BRAND.gold,
  attenuationDistance: 1000,
  attenuationColor: '#ffffff',
  specularIntensity: 0.33,
  specularColor: BRAND.navy,
  emissive: BRAND.indigo,
  emissiveIntensity: 0.71,
  waveAmp: 0.071,
  waveFreq: 5.2,
  waveSpeed: 0.49,
};

export const sphereConfig = {
  radius: 0.58,
  widthSegments: 82,
  heightSegments: 70,
  scale: 1.91,
  rollRangeX: 5,
  rollRangeZ: 3,
  ease: 0.05,
  autoRotX: -0.005,
  autoRotY: -0.025,
  autoRotZ: 0,
  wireframe: false,
  visible: true,
  cameraZ: 13.4,
  cameraY: 7.6,
  bounceHeight: 2.6,
};

// Floor grid. center line = indigo, regular lines = gold by default; both can be
// overridden from the Stage `canvasColors` prop (see makeConfig).
export const gridConfig = {
  size: 19.5,
  divisions: 4,
  color1: BRAND.indigo, // center cross
  color2: BRAND.gold, // regular lines
  lineWidth: 1,
  y: -0.74,
  visible: true,
};

// Build fresh config objects, letting the Stage palette ({ a, b }) drive the
// grid colors so the Play room tracks whatever theme the host repo sets.
export function makeConfig(colors) {
  return {
    gradient: { ...gradientConfig },
    glass: { ...glassConfig },
    sphere: { ...sphereConfig },
    grid: {
      ...gridConfig,
      ...(colors?.a ? { color1: colors.a } : {}),
      ...(colors?.b ? { color2: colors.b } : {}),
    },
  };
}
