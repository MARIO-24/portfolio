/**
 * useGameAudio — Web Audio API hook para el portfolio 3D
 * - Música ambient generada proceduralmente (sin archivos)
 * - Sonido de pasos (click suave rítmico)
 * - Sonido de interacción (ding al pulsar E)
 * - Mute global + toggle de música independiente (tocadiscos)
 * - Mute persistido en localStorage
 */
import { useRef, useState, useCallback, useEffect } from 'react';

function createCtx() {
  return new (window.AudioContext || window.webkitAudioContext)();
}

/* ── Música ambient: pad de acordes Am–F–C–G–Am–Em, arpeggio + bajo ──
 *
 *  FIX de loop: usa "absoluteStart" como ancla temporal fija y programa
 *  cada ciclo con timing absoluto. Así no hay gap entre repeticiones.
 *  CHORD_DUR = 5.5s × 6 acordes = 33s de loop antes de repetir.
 */
function startAmbient(ctx, outGain) {
  const nodes = [];

  // Reverb simulado con delay en feedback
  const delay    = ctx.createDelay(2.0);
  delay.delayTime.value = 0.35;
  const delayFB  = ctx.createGain();
  delayFB.gain.value = 0.25;
  delay.connect(delayFB);
  delayFB.connect(delay);
  delayFB.connect(outGain);

  const CHORD_DUR = 5.5; // segundos por acorde — loop total = 33s
  const chords = [
    [220,   261.6, 329.6],  // Am
    [174.6, 220,   261.6],  // F
    [261.6, 329.6, 392  ],  // C
    [196,   246.9, 293.7],  // G
    [220,   261.6, 329.6],  // Am (vuelta)
    [164.8, 196,   246.9],  // Em
  ];
  const LOOP = chords.length * CHORD_DUR; // 33s

  function scheduleChord(freqs, t) {
    freqs.forEach(freq => {
      const osc = ctx.createOscillator();
      const g   = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.value = freq;
      g.gain.setValueAtTime(0, t);
      g.gain.linearRampToValueAtTime(0.055, t + 0.6);
      g.gain.setValueAtTime(0.055, t + CHORD_DUR - 0.7);
      g.gain.linearRampToValueAtTime(0, t + CHORD_DUR);
      osc.connect(g); g.connect(outGain); g.connect(delay);
      osc.start(t); osc.stop(t + CHORD_DUR + 0.15);
      nodes.push(osc, g);
    });
  }

  function scheduleBass(freq, t) {
    const osc = ctx.createOscillator();
    const g   = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.value = freq / 2;
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(0.08, t + 0.7);
    g.gain.setValueAtTime(0.08, t + CHORD_DUR - 0.8);
    g.gain.linearRampToValueAtTime(0, t + CHORD_DUR);
    osc.connect(g); g.connect(outGain);
    osc.start(t); osc.stop(t + CHORD_DUR + 0.15);
    nodes.push(osc, g);
  }

  const arpNotes = [220, 261.6, 329.6, 392, 440, 392, 329.6, 261.6];
  const ARP_STEP = 0.28;
  function scheduleArp(t) {
    arpNotes.forEach((freq, i) => {
      const at  = t + i * ARP_STEP;
      const osc = ctx.createOscillator();
      const g   = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.value = freq * 2;
      g.gain.setValueAtTime(0, at);
      g.gain.linearRampToValueAtTime(0.022, at + 0.05);
      g.gain.exponentialRampToValueAtTime(0.001, at + ARP_STEP * 0.85);
      osc.connect(g); g.connect(outGain); g.connect(delay);
      osc.start(at); osc.stop(at + ARP_STEP);
      nodes.push(osc, g);
    });
  }

  // Ancla temporal absoluta — el loop se mide desde aquí, sin drift
  const LOOKAHEAD = 1.5; // segundos de antelación para programar el sig. ciclo
  const absoluteStart = ctx.currentTime + 0.1;
  let cycleIndex = 0;
  let loopTimer  = null;

  function scheduleCycle(ci) {
    const cycleStart = absoluteStart + ci * LOOP;
    chords.forEach((chord, ci2) => {
      const t = cycleStart + ci2 * CHORD_DUR;
      scheduleChord(chord, t);
      scheduleBass(chord[0], t);
    });
    // Arpeggio en acordes 0, 2 y 4
    scheduleArp(cycleStart + CHORD_DUR * 0);
    scheduleArp(cycleStart + CHORD_DUR * 2);
    scheduleArp(cycleStart + CHORD_DUR * 4);

    // Programar el siguiente ciclo LOOKAHEAD segundos antes de que acabe este
    const fireAt = cycleStart + LOOP - LOOKAHEAD;
    const delayMs = Math.max(0, (fireAt - ctx.currentTime) * 1000);
    loopTimer = setTimeout(() => scheduleCycle(ci + 1), delayMs);
  }

  scheduleCycle(cycleIndex);

  return () => {
    if (loopTimer) clearTimeout(loopTimer);
    nodes.forEach(n => { try { n.disconnect(); } catch (_) {} });
  };
}

/* ── Hook principal ── */
export function useGameAudio() {
  const ctxRef        = useRef(null);
  const masterRef     = useRef(null);
  const musicGainRef  = useRef(null); // controla sólo la música (para el tocadiscos)
  const stopAmbient   = useRef(null);
  const musicStarted  = useRef(false);
  const stepTimerRef  = useRef(0);

  const [muted, setMuted] = useState(
    () => localStorage.getItem('soundMuted') === 'true'
  );
  const [musicOn, setMusicOn] = useState(true); // el tocadiscos arranca "encendido"
  const mutedRef   = useRef(muted);
  const musicOnRef = useRef(true);
  mutedRef.current   = muted;
  musicOnRef.current = musicOn;

  // Inicializar AudioContext (requiere gesto del usuario)
  const ensureCtx = useCallback(() => {
    if (!ctxRef.current) {
      ctxRef.current = createCtx();
      masterRef.current = ctxRef.current.createGain();
      masterRef.current.gain.value = mutedRef.current ? 0 : 0.7;
      masterRef.current.connect(ctxRef.current.destination);

      musicGainRef.current = ctxRef.current.createGain();
      musicGainRef.current.gain.value = musicOnRef.current ? 1 : 0;
      musicGainRef.current.connect(masterRef.current);
    }
    if (ctxRef.current.state === 'suspended') ctxRef.current.resume();
    return ctxRef.current;
  }, []);

  // Arrancar música (una sola vez, tras el primer gesto)
  const startMusic = useCallback(() => {
    if (musicStarted.current) return;
    musicStarted.current = true;
    const ctx = ensureCtx();
    // La ambient sale por musicGain → masterGain → destination
    stopAmbient.current = startAmbient(ctx, musicGainRef.current);
  }, [ensureCtx]);

  // Toggle SÓLO la música — via musicGain (tocadiscos)
  const toggleMusic = useCallback(() => {
    setMusicOn(prev => {
      const next = !prev;
      musicOnRef.current = next;
      if (musicGainRef.current && ctxRef.current) {
        musicGainRef.current.gain.setTargetAtTime(
          next ? 1 : 0, ctxRef.current.currentTime, 0.08
        );
      }
      return next;
    });
  }, []);

  // Mute global — afecta al masterGain (silencia todo: música + efectos)
  const toggleMute = useCallback(() => {
    const next = !mutedRef.current;
    mutedRef.current = next;
    setMuted(next);
    localStorage.setItem('soundMuted', next);
    if (masterRef.current && ctxRef.current) {
      masterRef.current.gain.setTargetAtTime(next ? 0 : 0.7, ctxRef.current.currentTime, 0.05);
    }
    // Al des-mutear desde el 3D: arrancar la música si aún no estaba corriendo
    if (!next && !musicStarted.current && ctxRef.current && musicGainRef.current) {
      musicStarted.current = true;
      setMusicOn(true);
      musicOnRef.current = true;
      stopAmbient.current = startAmbient(ctxRef.current, musicGainRef.current);
    }
    // Notificar al padre (2D) si estamos en un iframe
    try { window.parent?.postMessage({ type: 'MUTE_SYNC', muted: next }, '*'); } catch(_) {}
  }, []);

  // Sincronizar gain si el ctx se crea después del primer estado muted
  useEffect(() => {
    if (masterRef.current && ctxRef.current) {
      masterRef.current.gain.value = muted ? 0 : 0.7;
    }
  }, [muted]);

  // Sonido de pasos — click suave cada ~250ms mientras se mueve
  const playFootstep = useCallback(() => {
    if (mutedRef.current) return;
    const now = performance.now();
    if (now - stepTimerRef.current < 240) return;
    stepTimerRef.current = now;

    const ctx = ensureCtx();
    const t   = ctx.currentTime;
    const buf = ctx.createBuffer(1, Math.floor(ctx.sampleRate * 0.06), ctx.sampleRate);
    const d   = buf.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / d.length);
    const src  = ctx.createBufferSource();
    src.buffer = buf;
    const bpf  = ctx.createBiquadFilter();
    bpf.type   = 'bandpass';
    bpf.frequency.value = 280 + Math.random() * 120;
    bpf.Q.value = 0.8;
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.18, t);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.08);
    src.connect(bpf); bpf.connect(gain); gain.connect(masterRef.current);
    src.start(t);
  }, [ensureCtx]);

  // Sonido de interacción — ding suave
  const playInteract = useCallback(() => {
    if (mutedRef.current) return;
    const ctx = ensureCtx();
    const t   = ctx.currentTime;

    [880, 1100].forEach((freq, i) => {
      const osc  = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type   = 'sine';
      osc.frequency.setValueAtTime(freq, t + i * 0.06);
      osc.frequency.exponentialRampToValueAtTime(freq * 0.85, t + i * 0.06 + 0.25);
      gain.gain.setValueAtTime(0.12, t + i * 0.06);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + i * 0.06 + 0.3);
      osc.connect(gain); gain.connect(masterRef.current);
      osc.start(t + i * 0.06);
      osc.stop(t + i * 0.06 + 0.35);
    });
  }, [ensureCtx]);

  // Limpiar al desmontar
  useEffect(() => {
    return () => {
      stopAmbient.current?.();
      ctxRef.current?.close();
    };
  }, []);

  // Avisar al padre (2D) que el iframe está listo
  useEffect(() => {
    try { window.parent?.postMessage({ type: 'IFRAME_READY' }, '*'); } catch(_) {}
  }, []);

  // Escuchar mensajes del padre (2D) — sincronizar mute y ciclo de música
  useEffect(() => {
    function onMessage(e) {
      const { type, muted: newMuted } = e.data || {};

      if (type === 'MUTE_SYNC' && typeof newMuted === 'boolean') {
        setMuted(newMuted);
        mutedRef.current = newMuted;
        if (masterRef.current && ctxRef.current) {
          masterRef.current.gain.setTargetAtTime(newMuted ? 0 : 0.7, ctxRef.current.currentTime, 0.05);
        }
      }

      if (type === 'STOP_MUSIC') {
        stopAmbient.current?.();
        stopAmbient.current = null;
        musicStarted.current = false;
        setMusicOn(false);
        musicOnRef.current = false;
        if (musicGainRef.current && ctxRef.current) {
          musicGainRef.current.gain.setTargetAtTime(0, ctxRef.current.currentTime, 0.05);
        }
      }

      if (type === 'START_MUSIC') {
        setMusicOn(true);
        musicOnRef.current = true;

        // Crear contexto si no existe — el gesto del padre delega activación al iframe
        if (!ctxRef.current) {
          try {
            ctxRef.current = createCtx();
            masterRef.current = ctxRef.current.createGain();
            masterRef.current.gain.value = mutedRef.current ? 0 : 0.7;
            masterRef.current.connect(ctxRef.current.destination);
            musicGainRef.current = ctxRef.current.createGain();
            musicGainRef.current.gain.value = 1;
            musicGainRef.current.connect(masterRef.current);
          } catch(_) {}
        }

        if (ctxRef.current?.state === 'suspended') {
          try { ctxRef.current.resume(); } catch(_) {}
        }

        if (musicGainRef.current && ctxRef.current) {
          musicGainRef.current.gain.setTargetAtTime(1, ctxRef.current.currentTime, 0.08);
        }

        if (!musicStarted.current && ctxRef.current && musicGainRef.current) {
          musicStarted.current = true;
          stopAmbient.current = startAmbient(ctxRef.current, musicGainRef.current);
        }
      }
    }
    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, []);

  return { muted, toggleMute, musicOn, toggleMusic, startMusic, playFootstep, playInteract };
}
