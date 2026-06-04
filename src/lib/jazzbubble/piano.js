import { Piano } from '@tonejs/piano';
import * as Tone from 'tone';

// Salvaged verbatim from the "JazzBubble" creative-coding exercise (bubble/piano.js).
// A thin wrapper over @tonejs/piano: sample loading is decoupled from the AudioContext
// so we can fetch samples eagerly and only resume audio on a user gesture.

let piano = null;
let loadingPromise = null;

// Fetch samples without requiring a running AudioContext.
// Call this early (e.g. when the Play room first activates) so samples are
// ready by the first interaction.
export async function preloadSamples({ velocities = 5 } = {}) {
  if (!piano) {
    piano = new Piano({ velocities });
    piano.toDestination();
    loadingPromise = piano.load();
  }
  await loadingPromise;
}

// Resume the AudioContext on first user gesture, then signal ready.
export async function startAudio() {
  if (Tone.getContext().state !== 'running') {
    await Tone.start();
  }
  if (!piano) await preloadSamples();
  piano.pedalUp();
}

export function keyDown(note, { velocity = 0.7 } = {}) {
  if (!piano) return;
  piano.keyDown({ note, velocity });
}

export function keyUp(note) {
  if (!piano) return;
  piano.keyUp({ note });
}

export function isReady() {
  return !!(piano && piano.loaded);
}
