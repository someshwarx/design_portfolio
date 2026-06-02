'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { syne } from '@/styles/fonts';

// ─── Types ───────────────────────────────────────────────────────────────────

interface Box {
  id: number;
  x: number;
  y: number;
  size: number;
  type: 'normal' | 'gold' | 'cursed';
  spawnedAt: number;
  lifetime: number;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  life: number;
  maxLife: number;
}

interface FloatingText {
  id: number;
  x: number;
  y: number;
  text: string;
  color: string;
}

interface SessionRecord {
  score: number;
  combo: number;
  date: string;
}

// ─── Constants ───────────────────────────────────────────────────────────────

const GAME_DURATION = 30;
const LS_HIGH_SCORE = 'bb_highscore';
const LS_HISTORY = 'bb_history';

// ─── Audio helpers (Web Audio API) ───────────────────────────────────────────

function playHit(ctx: AudioContext, type: 'normal' | 'gold' | 'cursed') {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.type = 'square';
  osc.frequency.setValueAtTime(
    type === 'gold' ? 880 : type === 'cursed' ? 200 : 440,
    ctx.currentTime
  );
  gain.gain.setValueAtTime(0.08, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + 0.12);
}

function playMiss(ctx: AudioContext) {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.type = 'sawtooth';
  osc.frequency.setValueAtTime(150, ctx.currentTime);
  gain.gain.setValueAtTime(0.05, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + 0.15);
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function BoxBusterGame() {
  const arenaRef = useRef<HTMLDivElement>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);

  const [phase, setPhase] = useState<'idle' | 'countdown' | 'playing' | 'result'>('idle');
  const [countdown, setCountdown] = useState(3);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [history, setHistory] = useState<SessionRecord[]>([]);
  const [boxes, setBoxes] = useState<Box[]>([]);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [floats, setFloats] = useState<FloatingText[]>([]);
  const [screenFlash, setScreenFlash] = useState<'red' | 'green' | null>(null);

  const boxIdRef = useRef(0);
  const particleIdRef = useRef(0);
  const floatIdRef = useRef(0);
  const comboRef = useRef(0);
  const maxComboRef = useRef(0);
  const scoreRef = useRef(0);
  const phaseRef = useRef<'idle' | 'countdown' | 'playing' | 'result'>('idle');

  // Keep refs in sync
  useEffect(() => { comboRef.current = combo; }, [combo]);
  useEffect(() => { maxComboRef.current = maxCombo; }, [maxCombo]);
  useEffect(() => { scoreRef.current = score; }, [score]);
  useEffect(() => { phaseRef.current = phase; }, [phase]);

  // Load persisted data
  useEffect(() => {
    const hs = localStorage.getItem(LS_HIGH_SCORE);
    if (hs) setHighScore(parseInt(hs, 10));
    const hist = localStorage.getItem(LS_HISTORY);
    if (hist) setHistory(JSON.parse(hist));
  }, []);

  // ─── Particle engine (rAF loop) ──────────────────────────────────────────
  useEffect(() => {
    let rafId: number;
    const tick = () => {
      setParticles(prev =>
        prev
          .map(p => ({ ...p, x: p.x + p.vx, y: p.y + p.vy, vy: p.vy + 0.3, life: p.life - 1 }))
          .filter(p => p.life > 0)
      );
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  // ─── Spawn particles ─────────────────────────────────────────────────────
  const spawnParticles = useCallback((x: number, y: number, color: string) => {
    const count = 10;
    setParticles(prev => [
      ...prev,
      ...Array.from({ length: count }, (_, i) => ({
        id: particleIdRef.current++,
        x,
        y,
        vx: (Math.random() - 0.5) * 8,
        vy: (Math.random() - 0.5) * 8 - 2,
        color,
        life: 30 + Math.random() * 20,
        maxLife: 50,
      })),
    ]);
  }, []);

  const spawnFloat = useCallback((x: number, y: number, text: string, color: string) => {
    const id = floatIdRef.current++;
    setFloats(prev => [...prev, { id, x, y, text, color }]);
    setTimeout(() => setFloats(prev => prev.filter(f => f.id !== id)), 900);
  }, []);

  // ─── Box spawner ─────────────────────────────────────────────────────────
  const spawnBox = useCallback(() => {
    if (!arenaRef.current || phaseRef.current !== 'playing') return;
    const { width, height } = arenaRef.current.getBoundingClientRect();
    const elapsed = GAME_DURATION - (phaseRef.current === 'playing' ? 0 : GAME_DURATION);
    const progress = 1 - (elapsed / GAME_DURATION);

    // Strictly consistent size across the whole game
    const size = 72;

    const roll = Math.random();
    const type: Box['type'] = roll < 0.08 ? 'gold' : roll < 0.15 ? 'cursed' : 'normal';

    // Lifetime shortens as game progresses: 2400ms → 1000ms
    const lifetime = Math.max(1000, 2400 - progress * 1400);

    const id = boxIdRef.current++;

    setBoxes(prev => {
      let x = 0;
      let y = 0;
      let attempts = 0;
      let overlap = true;

      // Try finding a non-overlapping position
      while (overlap && attempts < 20) {
        x = Math.random() * (width - size);
        y = Math.random() * (height - size);
        overlap = false;

        for (const b of prev) {
          const padding = 10;
          if (
            x < b.x + b.size + padding &&
            x + size + padding > b.x &&
            y < b.y + b.size + padding &&
            y + size + padding > b.y
          ) {
            overlap = true;
            break;
          }
        }
        attempts++;
      }

      const box: Box = {
        id,
        x,
        y,
        size,
        type,
        spawnedAt: Date.now(),
        lifetime,
      };

      return [...prev, box];
    });

    // Auto-remove after lifetime + penalize
    setTimeout(() => {
      setBoxes(prev => {
        const still = prev.find(b => b.id === id);
        if (still && phaseRef.current === 'playing') {
          if (still.type !== 'cursed') {
            // missed a normal/gold box — reset combo
            comboRef.current = 0;
            setCombo(0);
            if (audioCtxRef.current) playMiss(audioCtxRef.current);
            setScreenFlash('red');
            setTimeout(() => setScreenFlash(null), 200);
          }
          // If they correctly ignore a cursed box, they maintain their combo!
        }
        return prev.filter(b => b.id !== id);
      });
    }, lifetime);
  }, []);

  // ─── Game timer ──────────────────────────────────────────────────────────
  useEffect(() => {
    if (phase !== 'playing') return;
    const interval = setInterval(() => {
      setTimeLeft(t => Math.max(0, t - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, [phase]);

  // ─── Box spawn schedule ──────────────────────────────────────────────────
  useEffect(() => {
    if (phase !== 'playing') return;

    // Initial burst
    spawnBox();
    spawnBox();

    // Adaptive interval: starts at 900ms, drops to 450ms
    let delay = 900;
    let timeout: ReturnType<typeof setTimeout>;

    const schedule = () => {
      timeout = setTimeout(() => {
        if (phaseRef.current !== 'playing') return;
        spawnBox();
        delay = Math.max(450, delay - 12);
        schedule();
      }, delay);
    };
    schedule();

    return () => clearTimeout(timeout);
  }, [phase, spawnBox]);

  // ─── Countdown ───────────────────────────────────────────────────────────
  useEffect(() => {
    if (phase !== 'countdown') return;
    setCountdown(3);
    const tick = (n: number) => {
      if (n === 0) {
        setPhase('playing');
        return;
      }
      setCountdown(n);
      setTimeout(() => tick(n - 1), 800);
    };
    setTimeout(() => tick(2), 800);
  }, [phase]);

  // ─── End game ────────────────────────────────────────────────────────────
  const endGame = useCallback(() => {
    setPhase('result');
    setBoxes([]);
    const finalScore = scoreRef.current;
    const finalCombo = maxComboRef.current;

    // Update high score
    const hs = parseInt(localStorage.getItem(LS_HIGH_SCORE) || '0', 10);
    if (finalScore > hs) {
      localStorage.setItem(LS_HIGH_SCORE, String(finalScore));
      setHighScore(finalScore);
    }

    // Update history
    const record: SessionRecord = {
      score: finalScore,
      combo: finalCombo,
      date: new Date().toLocaleTimeString(),
    };
    const hist: SessionRecord[] = JSON.parse(localStorage.getItem(LS_HISTORY) || '[]');
    const updated = [record, ...hist].slice(0, 5);
    localStorage.setItem(LS_HISTORY, JSON.stringify(updated));
    setHistory(updated);
  }, []);

  useEffect(() => {
    if (phase === 'playing' && timeLeft === 0) {
      endGame();
    }
  }, [phase, timeLeft, endGame]);

  // ─── Start game ──────────────────────────────────────────────────────────
  const startGame = () => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new AudioContext();
    }
    setScore(0);
    setCombo(0);
    setMaxCombo(0);
    scoreRef.current = 0;
    comboRef.current = 0;
    maxComboRef.current = 0;
    setTimeLeft(GAME_DURATION);
    setBoxes([]);
    setParticles([]);
    setPhase('countdown');
  };

  // ─── Hit box ─────────────────────────────────────────────────────────────
  const hitBox = useCallback((e: React.MouseEvent, box: Box) => {
    e.stopPropagation();
    if (phaseRef.current !== 'playing') return;

    setBoxes(prev => prev.filter(b => b.id !== box.id));

    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const px = rect.left + rect.width / 2;
    const py = rect.top + rect.height / 2;
    const arenaRect = arenaRef.current?.getBoundingClientRect();
    const ax = arenaRect ? px - arenaRect.left : px;
    const ay = arenaRect ? py - arenaRect.top : py;

    if (box.type === 'cursed') {
      // Cursed box: lose points + reset combo
      const penalty = -3;
      setScore(s => Math.max(0, s + penalty));
      scoreRef.current = Math.max(0, scoreRef.current + penalty);
      comboRef.current = 0;
      setCombo(0);
      spawnParticles(ax, ay, '#7c3aed');
      spawnFloat(ax, ay - 20, '-3', '#7c3aed');
      setScreenFlash('red');
      setTimeout(() => setScreenFlash(null), 200);
      if (audioCtxRef.current) playHit(audioCtxRef.current, 'cursed');
      return;
    }

    // Normal / gold hit
    const newCombo = comboRef.current + 1;
    comboRef.current = newCombo;
    setCombo(newCombo);
    if (newCombo > maxComboRef.current) {
      maxComboRef.current = newCombo;
      setMaxCombo(newCombo);
    }

    const multiplier = newCombo >= 5 ? 3 : newCombo >= 3 ? 2 : 1;
    const basePoints = box.type === 'gold' ? 3 : 1;
    const points = basePoints * multiplier;

    setScore(s => s + points);
    scoreRef.current = scoreRef.current + points;

    const color = box.type === 'gold' ? '#fbbf24' : newCombo >= 3 ? '#f97316' : '#dc2626';
    spawnParticles(ax, ay, color);

    const label =
      multiplier > 1
        ? `+${points} x${multiplier}`
        : box.type === 'gold'
        ? `+${points} ★`
        : `+${points}`;
    spawnFloat(ax, ay - 24, label, color);

    setScreenFlash('green');
    setTimeout(() => setScreenFlash(null), 80);
    if (audioCtxRef.current) playHit(audioCtxRef.current, box.type);
  }, [spawnParticles, spawnFloat]);

  // ─── Timer bar color ─────────────────────────────────────────────────────
  const timerPct = (timeLeft / GAME_DURATION) * 100;
  const timerColor =
    timeLeft <= 5 ? '#dc2626' : timeLeft <= 10 ? '#f97316' : '#22c55e';

  // ─── Render ──────────────────────────────────────────────────────────────
  return (
    <div className="w-full h-full flex flex-col items-center gap-4" data-hide-cursor={phase === 'playing' ? "true" : undefined}>

      {/* ── HUD ─────────────────────────────────────────────────────────── */}
      <div className="w-full max-w-4xl flex items-center justify-between px-1 font-sans text-xs text-neutral-500 uppercase tracking-widest shrink-0">
        <span>All-Time High: <span className="text-yellow-400 font-bold">{highScore}</span></span>
        <span>Session: <span className="text-white font-bold">{score}</span></span>
      </div>

      {/* ── Arena ───────────────────────────────────────────────────────── */}
      <div
        ref={arenaRef}
        id="game-arena"
        className="relative w-full max-w-4xl flex-1 min-h-[300px] overflow-hidden select-none rounded-xl"
        style={{
          background: 'linear-gradient(135deg, #0a0a0a 0%, #111 50%, #0a0a0a 100%)',
          border: '1px solid rgba(255,255,255,0.08)',
          boxShadow: '0 0 60px rgba(220,38,38,0.05) inset',
        }}
      >
        {/* Screen flash */}
        <div
          className="absolute inset-0 z-50 pointer-events-none transition-colors duration-100"
          style={{
            background: screenFlash === 'green'
              ? 'rgba(34,197,94,0.06)'
              : screenFlash === 'red'
              ? 'rgba(220,38,38,0.1)'
              : 'transparent',
          }}
        />

        {/* Grid overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

        {/* ── IDLE ─────────────────────────────────────────────────────── */}
        {phase === 'idle' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-8 z-10">
            <div className="text-center flex flex-col items-center">
              <div className="mt-6 flex gap-6 justify-center font-sans text-xs text-neutral-600">
                <span><span className="text-white">■</span> Normal = +1</span>
                <span><span className="text-yellow-400">■</span> Gold = +3</span>
                <span><span className="text-purple-500">■</span> Cursed = -3</span>
                <span><span className="text-orange-400">x2/x3</span> Combo</span>
              </div>
            </div>

            <button
              id="start-game-btn"
              onClick={startGame}
              className="group relative px-12 py-4 bg-red-600 text-white font-sans text-sm uppercase tracking-widest font-bold hover:bg-white hover:text-black transition-all duration-200"
              style={{ clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))' }}
            >
              START SESSION
            </button>

            {history.length > 0 && (
              <div className="font-sans text-xs text-neutral-600 border border-white/5 px-6 py-4 w-72">
                <p className="text-neutral-400 mb-3 tracking-widest">RECENT SESSIONS</p>
                {history.map((h, i) => (
                  <div key={i} className="flex justify-between py-1 border-b border-white/5">
                    <span className="text-neutral-600">{h.date}</span>
                    <span className="text-white">{h.score} pts</span>
                    <span className="text-red-600">x{h.combo}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── COUNTDOWN ────────────────────────────────────────────────── */}
        {phase === 'countdown' && (
          <div className="absolute inset-0 flex items-center justify-center z-20">
            <span
              key={countdown}
              className={cn('text-[12rem] font-bold text-white leading-none', syne.className)}
              style={{
                fontWeight: 800,
                animation: 'countPop 0.7s ease-out forwards',
              }}
            >
              {countdown === 0 ? 'GO!' : countdown}
            </span>
          </div>
        )}

        {/* ── PLAYING ──────────────────────────────────────────────────── */}
        {phase === 'playing' && (
          <>
            {/* Live stats */}
            <div className="absolute top-4 left-4 z-10 font-sans text-xs text-neutral-500 flex flex-col gap-1">
              {combo >= 2 && (
                <span
                  className="text-orange-400 font-bold"
                  style={{ animation: 'comboFlash 0.3s ease' }}
                >
                  COMBO x{combo}
                </span>
              )}
            </div>
            <div className={cn("absolute top-4 right-4 z-10 text-4xl font-bold text-white", syne.className)}>
              {score}
            </div>

            {/* Boxes */}
            {boxes.map(box => {
              const age = Date.now() - box.spawnedAt;
              const lifePct = Math.min(1, age / box.lifetime);
              const urgency = lifePct > 0.7;

              const boxColor =
                box.type === 'gold'
                  ? '#fbbf24'
                  : box.type === 'cursed'
                  ? '#7c3aed'
                  : '#dc2626';

              return (
                <button
                  key={box.id}
                  id={`box-${box.id}`}
                  onClick={e => hitBox(e, box)}
                  className="absolute transition-none"
                  style={{
                    left: box.x,
                    top: box.y,
                    width: box.size,
                    height: box.size,
                    background: boxColor,
                    border: `2px solid ${urgency ? '#fff' : 'transparent'}`,
                    boxShadow: `0 0 ${urgency ? 20 : 8}px ${boxColor}80`,
                    animation: `boxSpawn 0.15s ease-out`,
                    clipPath: box.type === 'gold'
                      ? 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'
                      : 'none',
                  }}
                />
              );
            })}

            {/* Particles */}
            {particles.map(p => (
              <div
                key={p.id}
                className="absolute pointer-events-none rounded-full"
                style={{
                  left: p.x - 3,
                  top: p.y - 3,
                  width: 6,
                  height: 6,
                  background: p.color,
                  opacity: p.life / p.maxLife,
                }}
              />
            ))}

            {/* Floating score texts */}
            {floats.map(f => (
              <div
                key={f.id}
                className="absolute pointer-events-none font-sans font-bold text-sm"
                style={{
                  left: f.x,
                  top: f.y,
                  color: f.color,
                  animation: 'floatUp 0.9s ease-out forwards',
                  transform: 'translateX(-50%)',
                }}
              >
                {f.text}
              </div>
            ))}
          </>
        )}

        {/* ── RESULT ───────────────────────────────────────────────────── */}
        {phase === 'result' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 z-10">
            <p className="font-sans text-red-600 text-xs tracking-widest uppercase">
              // SESSION OVER //
            </p>
            <h2
              className={cn('text-6xl font-bold text-white', syne.className)}
              style={{ fontWeight: 800 }}
            >
              {score}
              <span className="text-neutral-600 text-2xl ml-2 font-sans">pts</span>
            </h2>

            {score >= highScore && score > 0 && (
              <p className="font-sans text-yellow-400 text-sm tracking-widest animate-pulse">
                ★ NEW HIGH SCORE ★
              </p>
            )}

            <div className="flex gap-8 font-sans text-xs text-neutral-500">
              <div className="text-center">
                <p className="text-neutral-600">MAX COMBO</p>
                <p className="text-white text-2xl font-bold">x{maxCombo}</p>
              </div>
              <div className="text-center">
                <p className="text-neutral-600">ALL-TIME HIGH</p>
                <p className="text-yellow-400 text-2xl font-bold">{highScore}</p>
              </div>
            </div>

            <div className="flex gap-4 mt-2">
              <button
                id="play-again-btn"
                onClick={startGame}
                className="px-10 py-3 bg-red-600 text-white font-sans text-sm uppercase tracking-widest font-bold hover:bg-white hover:text-black transition-all duration-200"
                style={{ clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))' }}
              >
                PLAY AGAIN
              </button>
              <button
                id="back-idle-btn"
                onClick={() => setPhase('idle')}
                className="px-10 py-3 border border-white/20 text-white font-sans text-sm uppercase tracking-widest hover:border-white/60 transition-all duration-200"
              >
                SCORES
              </button>
            </div>
          </div>
        )}

        {/* Timer bar — bottom of arena */}
        {(phase === 'playing' || phase === 'result') && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/5">
            <div
              className="h-full transition-all duration-1000 linear"
              style={{ width: `${timerPct}%`, background: timerColor }}
            />
          </div>
        )}

        {/* Timer pill */}
        {phase === 'playing' && (
          <div
            className="absolute bottom-4 left-1/2 -translate-x-1/2 font-sans text-sm tracking-widest font-bold tabular-nums"
            style={{ color: timerColor }}
          >
            {String(timeLeft).padStart(2, '0')}s
          </div>
        )}
      </div>

      {/* CSS keyframes injected inline */}
      <style>{`
        @keyframes boxSpawn {
          from { transform: scale(0) rotate(-10deg); opacity: 0; }
          to   { transform: scale(1) rotate(0deg);  opacity: 1; }
        }
        @keyframes floatUp {
          0%   { transform: translateX(-50%) translateY(0);   opacity: 1; }
          100% { transform: translateX(-50%) translateY(-50px); opacity: 0; }
        }
        @keyframes countPop {
          0%   { transform: scale(1.4); opacity: 0; }
          40%  { transform: scale(0.9); opacity: 1; }
          70%  { transform: scale(1.05); }
          100% { transform: scale(1); opacity: 0.2; }
        }
        @keyframes comboFlash {
          0%   { transform: scale(1.3); }
          100% { transform: scale(1); }
        }
        [data-hide-cursor="true"], [data-hide-cursor="true"] * {
          cursor: default !important;
        }
        #game-arena, #game-arena * { 
          cursor: crosshair !important; 
        }
        button, a {
          cursor: pointer !important;
        }
      `}</style>
    </div>
  );
}
