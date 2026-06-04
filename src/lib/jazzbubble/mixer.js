import { Pane } from 'tweakpane';

// Tweakpane "Mixer Controls" — ported from the exercise's setupUI()/persistence
// (bubble/main.js). Bindings mutate the SAME config objects the scene reads each
// frame, so edits apply live; gradient edits also push fresh uniforms to the
// shader via onGradientChange. Settings persist to localStorage.

const STORAGE_KEY = 'jazzbubble-settings';

export function loadSettings(config) {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const saved = JSON.parse(raw);
    if (saved.gradient) Object.assign(config.gradient, saved.gradient);
    if (saved.glass) Object.assign(config.glass, saved.glass);
    if (saved.sphere) Object.assign(config.sphere, saved.sphere);
    if (saved.grid) {
      // divisions drives the note grid / cell math — never restore it.
      const { divisions: _drop, ...rest } = saved.grid;
      Object.assign(config.grid, rest);
    }
  } catch (e) {
    console.warn('JazzBubble: failed to load saved mixer settings', e);
  }
}

export function saveSettings(config) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      gradient: config.gradient,
      glass: config.glass,
      sphere: config.sphere,
      grid: config.grid,
    }));
  } catch (e) {
    console.warn('JazzBubble: failed to save mixer settings', e);
  }
}

function buildExportSnippet(config) {
  const j = (obj) => JSON.stringify(obj, null, 2);
  return `import { createShader } from 'shaders/js';
import { initThreeScene } from './scene.js';

const gradientConfig = ${j(config.gradient)};

const glassConfig = ${j(config.glass)};

const sphereConfig = ${j(config.sphere)};

const gridConfig = ${j({ ...config.grid, divisions: config.grid.divisions })};

const shader = await createShader(shaderCanvas, {
  components: [{ type: 'FlowingGradient', id: 'bg_gradient', props: gradientConfig }]
});

initThreeScene({ threeCanvas, shaderCanvas, container,
  config: { gradient: gradientConfig, glass: glassConfig, sphere: sphereConfig, grid: gridConfig } });`;
}

/**
 * Mount the mixer.
 * @param {object} opts
 * @param {object} opts.config   live config — { gradient, glass, sphere, grid }
 * @param {object} opts.defaults pristine defaults for the Reset buttons
 * @param {() => void} opts.onGradientChange push gradient props to the shader
 * @param {() => void} [opts.onReloadDefaults] clear persistence + reset to defaults
 * @param {HTMLElement} [opts.container] positioned ancestor to mount into. When
 *        given, the pane is scoped to it (absolute) instead of fixed to the
 *        viewport — keeps the mixer inside bounded hosts like the docs specimen.
 * @returns {{ element: HTMLElement, dispose(): void }}
 */
export function setupMixer({ config, defaults, onGradientChange, onReloadDefaults, container }) {
  const { gradient, glass, sphere, grid } = config;
  // Collapsed by default — tucked into the corner as a "Mixer Controls" title
  // bar; click to expand for live tuning so the blob stays the star.
  const pane = new Pane({ title: 'Mixer Controls', expanded: false, container });

  const tab = pane.addTab({
    pages: [
      { title: 'Gradient' },
      { title: 'Glass' },
      { title: 'Sphere' },
      { title: 'Grid' },
      { title: 'Scene' },
    ],
  });

  const update = onGradientChange;

  // --- GRADIENT ---
  const gradientPage = tab.pages[0];
  const gradientColors = gradientPage.addFolder({ title: 'Colors' });
  gradientColors.addBinding(gradient, 'colorA', { label: 'Color A' }).on('change', update);
  gradientColors.addBinding(gradient, 'colorB', { label: 'Color B' }).on('change', update);
  gradientColors.addBinding(gradient, 'colorC', { label: 'Color C' }).on('change', update);
  gradientColors.addBinding(gradient, 'colorD', { label: 'Color D' }).on('change', update);
  gradientColors.addBinding(gradient, 'colorSpace', {
    options: { oklch: 'oklch', linear: 'linear', oklab: 'oklab', hsl: 'hsl', hsv: 'hsv', lch: 'lch' },
  }).on('change', update);
  const gradientAnim = gradientPage.addFolder({ title: 'Animation' });
  gradientAnim.addBinding(gradient, 'speed', { min: 0, max: 5 }).on('change', update);
  gradientAnim.addBinding(gradient, 'distortion', { min: 0, max: 1, step: 0.01 }).on('change', update);
  gradientAnim.addBinding(gradient, 'seed', { min: 0, max: 100, step: 1 }).on('change', update);
  gradientPage.addButton({ title: 'Reset' }).on('click', () => {
    Object.assign(gradient, defaults.gradient); update(); pane.refresh(); saveSettings(config);
  });

  // --- GLASS ---
  const glassPage = tab.pages[1];
  const baseFolder = glassPage.addFolder({ title: 'Base' });
  baseFolder.addBinding(glass, 'color');
  baseFolder.addBinding(glass, 'transmission', { min: 0, max: 1, step: 0.01 });
  baseFolder.addBinding(glass, 'thickness', { min: 0, max: 5, step: 0.01 });
  baseFolder.addBinding(glass, 'roughness', { min: 0, max: 1, step: 0.01 });
  baseFolder.addBinding(glass, 'metalness', { min: 0, max: 1, step: 0.01 });
  baseFolder.addBinding(glass, 'ior', { min: 1, max: 2.33, step: 0.01 });
  baseFolder.addBinding(glass, 'reflectivity', { min: 0, max: 1, step: 0.01 });
  baseFolder.addBinding(glass, 'envMapIntensity', { label: 'envMap', min: 0, max: 3, step: 0.01 });

  const ccFolder = glassPage.addFolder({ title: 'Clearcoat' });
  ccFolder.addBinding(glass, 'clearcoat', { min: 0, max: 1, step: 0.01 });
  ccFolder.addBinding(glass, 'clearcoatRoughness', { label: 'roughness', min: 0, max: 1, step: 0.01 });

  const irFolder = glassPage.addFolder({ title: 'Iridescence' });
  irFolder.addBinding(glass, 'iridescence', { min: 0, max: 1, step: 0.01 });
  irFolder.addBinding(glass, 'iridescenceIOR', { label: 'IOR', min: 1, max: 2.33, step: 0.01 });

  const sheenFolder = glassPage.addFolder({ title: 'Sheen' });
  sheenFolder.addBinding(glass, 'sheen', { min: 0, max: 1, step: 0.01 });
  sheenFolder.addBinding(glass, 'sheenRoughness', { label: 'roughness', min: 0, max: 1, step: 0.01 });
  sheenFolder.addBinding(glass, 'sheenColor', { label: 'color' });

  const attFolder = glassPage.addFolder({ title: 'Attenuation' });
  attFolder.addBinding(glass, 'attenuationDistance', { label: 'distance', min: 0.1, max: 1000, step: 0.1 });
  attFolder.addBinding(glass, 'attenuationColor', { label: 'color' });

  const specFolder = glassPage.addFolder({ title: 'Specular' });
  specFolder.addBinding(glass, 'specularIntensity', { label: 'intensity', min: 0, max: 1, step: 0.01 });
  specFolder.addBinding(glass, 'specularColor', { label: 'color' });

  const emFolder = glassPage.addFolder({ title: 'Emissive' });
  emFolder.addBinding(glass, 'emissive', { label: 'color' });
  emFolder.addBinding(glass, 'emissiveIntensity', { label: 'intensity', min: 0, max: 5, step: 0.01 });

  const waveFolder = glassPage.addFolder({ title: 'Wave Distortion' });
  waveFolder.addBinding(glass, 'waveAmp', { label: 'amplitude', min: 0, max: 0.5, step: 0.001 });
  waveFolder.addBinding(glass, 'waveFreq', { label: 'frequency', min: 0, max: 20, step: 0.1 });
  waveFolder.addBinding(glass, 'waveSpeed', { label: 'speed', min: 0, max: 5, step: 0.01 });
  glassPage.addButton({ title: 'Reset' }).on('click', () => {
    Object.assign(glass, defaults.glass); pane.refresh(); saveSettings(config);
  });

  // --- SPHERE ---
  const spherePage = tab.pages[2];
  const sizeFolder = spherePage.addFolder({ title: 'Size' });
  sizeFolder.addBinding(sphere, 'radius', { min: 0.1, max: 5, step: 0.01 });
  sizeFolder.addBinding(sphere, 'widthSegments', { label: 'width segs', min: 3, max: 128, step: 1 });
  sizeFolder.addBinding(sphere, 'heightSegments', { label: 'height segs', min: 2, max: 128, step: 1 });
  sizeFolder.addBinding(sphere, 'scale', { min: 0.1, max: 5, step: 0.01 });

  const rollFolder = spherePage.addFolder({ title: 'Mouse Roll' });
  rollFolder.addBinding(sphere, 'rollRangeX', { label: 'Range X', min: 0, max: 10, step: 0.1 });
  rollFolder.addBinding(sphere, 'rollRangeZ', { label: 'Range Z', min: 0, max: 10, step: 0.1 });
  rollFolder.addBinding(sphere, 'ease', { label: 'Ease', min: 0.01, max: 1, step: 0.01 });

  const autoFolder = spherePage.addFolder({ title: 'Auto Rotation' });
  autoFolder.addBinding(sphere, 'autoRotX', { label: 'Speed X', min: -0.05, max: 0.05, step: 0.001 });
  autoFolder.addBinding(sphere, 'autoRotY', { label: 'Speed Y', min: -0.05, max: 0.05, step: 0.001 });
  autoFolder.addBinding(sphere, 'autoRotZ', { label: 'Speed Z', min: -0.05, max: 0.05, step: 0.001 });

  const bounceFolder = spherePage.addFolder({ title: 'Bounce' });
  bounceFolder.addBinding(sphere, 'bounceHeight', { label: 'height', min: 0.5, max: 10, step: 0.1 });
  spherePage.addButton({ title: 'Reset' }).on('click', () => {
    const keys = ['radius', 'widthSegments', 'heightSegments', 'scale', 'rollRangeX', 'rollRangeZ', 'ease', 'autoRotX', 'autoRotY', 'autoRotZ', 'bounceHeight'];
    keys.forEach((k) => { sphere[k] = defaults.sphere[k]; });
    pane.refresh(); saveSettings(config);
  });

  // --- GRID ---
  const gridPage = tab.pages[3];
  gridPage.addBinding(grid, 'visible', { label: 'visible' });
  gridPage.addBinding(grid, 'size', { label: 'size', min: 1, max: 100, step: 0.5 });
  gridPage.addBinding(grid, 'y', { label: 'Y', min: -10, max: 5, step: 0.01 });
  gridPage.addBinding(grid, 'lineWidth', { label: 'thickness', min: 0.5, max: 10, step: 0.5 });
  gridPage.addBinding(grid, 'color1', { label: 'center color' });
  gridPage.addBinding(grid, 'color2', { label: 'line color' });
  gridPage.addButton({ title: 'Reset' }).on('click', () => {
    const { divisions: _drop, ...gridDefaults } = defaults.grid;
    Object.assign(grid, gridDefaults); pane.refresh(); saveSettings(config);
  });

  // --- SCENE ---
  const scenePage = tab.pages[4];
  scenePage.addBinding(sphere, 'cameraY', { label: 'Camera Y', min: -5, max: 10, step: 0.1 });
  scenePage.addBinding(sphere, 'cameraZ', { label: 'Camera Z', min: 1, max: 20, step: 0.1 });
  scenePage.addBinding(sphere, 'wireframe');
  scenePage.addBinding(sphere, 'visible');
  scenePage.addButton({ title: 'Reset' }).on('click', () => {
    ['cameraY', 'cameraZ', 'wireframe', 'visible'].forEach((k) => { sphere[k] = defaults.sphere[k]; });
    pane.refresh(); saveSettings(config);
  });

  // --- Export / Reset all ---
  const exportBtn = pane.addButton({ title: 'Export Code' });
  exportBtn.on('click', () => {
    navigator.clipboard?.writeText(buildExportSnippet(config)).then(() => {
      exportBtn.title = 'Copied!';
      setTimeout(() => { exportBtn.title = 'Export Code'; }, 1600);
    }).catch(() => {});
  });
  pane.addButton({ title: 'Reset Settings' }).on('click', () => {
    try { localStorage.removeItem(STORAGE_KEY); } catch { /* ignore */ }
    Object.assign(gradient, defaults.gradient);
    Object.assign(glass, defaults.glass);
    Object.assign(sphere, defaults.sphere);
    const { divisions: _d, ...gridDefaults } = defaults.grid;
    Object.assign(grid, gridDefaults);
    update();
    pane.refresh();
    onReloadDefaults?.();
  });

  // Persist any change anywhere in the pane.
  pane.on('change', () => saveSettings(config));

  // Position the panel in the top-right corner. With the default (body) mount
  // Tweakpane wraps the pane in a fixed `.tp-dfwv` element that sits at the
  // viewport corner, so drop it below the Stage header nav. With a `container`
  // it appends pane.element directly, and the host already sits below the header
  // — anchor it absolutely with a small inset and cap its height so the expanded
  // panel scrolls within the room rather than overflowing it.
  const wrapper = pane.element.closest('.tp-dfwv') || pane.element;
  if (wrapper.classList.contains('tp-dfwv')) {
    wrapper.style.top = '84px';
    wrapper.style.right = '24px';
  } else {
    wrapper.style.position = 'absolute';
    wrapper.style.top = '16px';
    wrapper.style.right = '16px';
    wrapper.style.width = '256px';
    wrapper.style.maxHeight = 'calc(100% - 32px)';
    wrapper.style.overflowY = 'auto';
    wrapper.style.zIndex = '5';
  }

  return { element: wrapper, dispose: () => pane.dispose() };
}
