import { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * PlayCanvas — a three.js generative scaffold for the "Play room".
 * This is an honest placeholder for your real creative-coding exercise:
 * a drifting point-field (optionally wired into a network / wave / lattice),
 * tinted from the brand palette. Swap the scene body for whatever you build.
 *
 * Props:
 *   active  — run the animation loop only when the Play room is showing
 *   mode    — 'field' | 'network' | 'wave' | 'grid'
 *   colors  — { a, b }  two hex colors for the points
 */
export default function PlayCanvas({ active = true, mode = 'field', colors = { a: '#28289c', b: '#86632c' } }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(58, 1, 0.1, 200);
    camera.position.z = 16;

    // WebGL can be unavailable or blocked (hardware accel off, GPU blocklisted,
    // headless/CI, restricted webviews). Creating the renderer THROWS in that case,
    // and an uncaught error here would unmount the whole app and blank the page —
    // so a decorative scaffold must never be fatal. Bail gracefully instead.
    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    } catch (err) {
      console.warn('PlayCanvas: WebGL unavailable, skipping the 3D scene.', err);
      return;
    }
    renderer.setPixelRatio(Math.min(2, window.devicePixelRatio || 1));
    renderer.domElement.style.cssText = 'width:100%;height:100%;display:block';
    el.appendChild(renderer.domElement);

    const COUNT = mode === 'grid' ? 729 : 460;
    const positions = new Float32Array(COUNT * 3);
    const colorAttr = new Float32Array(COUNT * 3);
    const cA = new THREE.Color(colors.a);
    const cB = new THREE.Color(colors.b);
    const span = 24;

    if (mode === 'grid') {
      const n = Math.round(Math.cbrt(COUNT)); // 9
      let i = 0;
      for (let x = 0; x < n; x++)
        for (let y = 0; y < n; y++)
          for (let z = 0; z < n; z++) {
            positions[i * 3] = (x / (n - 1) - 0.5) * span;
            positions[i * 3 + 1] = (y / (n - 1) - 0.5) * span * 0.62;
            positions[i * 3 + 2] = (z / (n - 1) - 0.5) * span * 0.5;
            const c = (x + y + z) % 5 === 0 ? cB : cA;
            colorAttr[i * 3] = c.r; colorAttr[i * 3 + 1] = c.g; colorAttr[i * 3 + 2] = c.b;
            i++;
          }
    } else {
      for (let i = 0; i < COUNT; i++) {
        positions[i * 3] = (Math.random() - 0.5) * span;
        positions[i * 3 + 1] = (Math.random() - 0.5) * span * 0.6;
        positions[i * 3 + 2] = (Math.random() - 0.5) * span * 0.5;
        const c = Math.random() < 0.2 ? cB : cA;
        colorAttr[i * 3] = c.r; colorAttr[i * 3 + 1] = c.g; colorAttr[i * 3 + 2] = c.b;
      }
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(colorAttr, 3));
    const mat = new THREE.PointsMaterial({ size: 0.18, vertexColors: true, transparent: true, opacity: 0.92, sizeAttenuation: true });
    const points = new THREE.Points(geo, mat);
    scene.add(points);

    // optional: thin links between nearby points (network mode)
    let lines = null;
    if (mode === 'network') {
      const segs = [];
      for (let i = 0; i < COUNT; i += 4) {
        for (let j = i + 4; j < COUNT; j += 4) {
          const dx = positions[i * 3] - positions[j * 3];
          const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
          const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
          if (dx * dx + dy * dy + dz * dz < 9) {
            segs.push(positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2]);
            segs.push(positions[j * 3], positions[j * 3 + 1], positions[j * 3 + 2]);
          }
        }
      }
      const lgeo = new THREE.BufferGeometry();
      lgeo.setAttribute('position', new THREE.Float32BufferAttribute(segs, 3));
      const lmat = new THREE.LineBasicMaterial({ color: new THREE.Color(colors.a), transparent: true, opacity: 0.22 });
      lines = new THREE.LineSegments(lgeo, lmat);
      points.add(lines);
    }

    const base = positions.slice();

    function resize() {
      const r = el.getBoundingClientRect();
      const w = Math.max(1, r.width), h = Math.max(1, r.height);
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    }
    const ro = new ResizeObserver(resize);
    ro.observe(el);
    resize();

    let raf = 0;
    let t = 0;
    function frame() {
      t += 0.006;
      if (mode === 'wave') {
        for (let i = 0; i < COUNT; i++) {
          positions[i * 3 + 1] = base[i * 3 + 1] + Math.sin(t * 1.6 + base[i * 3] * 0.45) * 1.3;
        }
        geo.attributes.position.needsUpdate = true;
      }
      points.rotation.y = t * 0.22;
      points.rotation.x = Math.sin(t * 0.3) * 0.12;
      renderer.render(scene, camera);
      raf = requestAnimationFrame(frame);
    }

    renderer.render(scene, camera); // first paint (also covers reduced-motion / inactive)
    if (active && !reduce) frame();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      geo.dispose();
      mat.dispose();
      if (lines) { lines.geometry.dispose(); lines.material.dispose(); }
      renderer.dispose();
      if (renderer.domElement.parentNode === el) el.removeChild(renderer.domElement);
    };
  }, [active, mode, colors.a, colors.b]);

  return <div ref={mountRef} style={{ width: '100%', height: '100%' }} />;
}
