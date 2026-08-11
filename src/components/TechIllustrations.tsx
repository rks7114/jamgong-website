import { useEffect, useState, useRef } from 'react';

// Custom hook to detect when element is visible in viewport
function useInView(options?: IntersectionObserverInit) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.15, ...options }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [options]);

  return { ref, isInView };
}

// ────────────────────────────────────────────────────────
// Illustration 1: Planetary Orbit & Prediction Trajectory for JAMGONG ORACLE™
// "태양 주위를 행성이 공전 + 예측 경로 점선 확장"
// ────────────────────────────────────────────────────────
export function OracleOrbit() {
  const { ref, isInView } = useInView();
  const [time, setTime] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (motionQuery.matches) return;

    let frameId: number;
    let lastStamp = performance.now();

    const animate = (now: number) => {
      const delta = (now - lastStamp) / 1000;
      lastStamp = now;
      setTime((prev) => prev + delta);
      frameId = requestAnimationFrame(animate);
    };

    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [isInView]);

  const cx = 170;
  const cy = 80;

  // Main Oracle Planet on middle orbit (rx: 95, ry: 34)
  const mainAngle = time * 0.9;
  const px = cx + Math.cos(mainAngle) * 95;
  const py = cy + Math.sin(mainAngle) * 34;

  // Prediction trajectory path ahead of main planet
  const trajectoryProgress = (Math.sin(time * 1.5) + 1) / 2; // 0 to 1
  const trajAngleSpan = 0.2 + trajectoryProgress * 1.2; // 0.2 to 1.4 radians

  // Generate SVG path points for expanding prediction arc ahead
  const trajPoints: string[] = [];
  const steps = 24;
  for (let i = 0; i <= steps; i++) {
    const a = mainAngle + (i / steps) * trajAngleSpan;
    const tx = cx + Math.cos(a) * 95;
    const ty = cy + Math.sin(a) * 34;
    trajPoints.push(`${tx.toFixed(1)},${ty.toFixed(1)}`);
  }
  const trajPathD = `M ${trajPoints.join(' L ')}`;

  // Target point of prediction vector
  const endAngle = mainAngle + trajAngleSpan;
  const targetX = cx + Math.cos(endAngle) * 95;
  const targetY = cy + Math.sin(endAngle) * 34;

  // Orbit 1: Inner planet
  const innerAngle = -time * 1.8;
  const ipx = cx + Math.cos(innerAngle) * 55;
  const ipy = cy + Math.sin(innerAngle) * 20;

  // Orbit 3: Outer planet
  const outerAngle = time * 0.4;
  const opx = cx + Math.cos(outerAngle) * 130;
  const opy = cy + Math.sin(outerAngle) * 45;

  return (
    <div ref={ref} className="relative w-full h-44 bg-[#030712] border border-[#00f2fe]/20 overflow-hidden flex items-center justify-center select-none group-hover:border-[#00f2fe]/45 transition-all duration-300">
      {/* Space grid background */}
      <div className="absolute inset-0 bg-grid-space opacity-20" />

      {/* Central Sun Plasma Glow */}
      <div className="absolute w-10 h-10 bg-amber-500/30 rounded-full blur-md animate-pulse" />
      <div className="absolute w-5 h-5 bg-amber-400 rounded-full shadow-[0_0_20px_#f59e0b,0_0_8px_#fbbf24]" />

      <svg className="w-full h-full relative z-10" viewBox="0 0 340 160">
        {/* Orbital Ellipses */}
        <ellipse cx={cx} cy={cy} rx="55" ry="20" fill="none" stroke="rgba(0, 242, 254, 0.15)" strokeWidth="1" />
        <ellipse cx={cx} cy={cy} rx="95" ry="34" fill="none" stroke="rgba(0, 242, 254, 0.22)" strokeWidth="1" />
        <ellipse cx={cx} cy={cy} rx="130" ry="45" fill="none" stroke="rgba(0, 242, 254, 0.12)" strokeWidth="1" strokeDasharray="3 3" />

        {/* Inner Planet */}
        <circle cx={ipx} cy={ipy} r="2.5" fill="#f59e0b" className="shadow-[0_0_6px_#f59e0b]" />

        {/* Outer Planet */}
        <circle cx={opx} cy={opy} r="3" fill="#38bdf8" className="shadow-[0_0_8px_#38bdf8]" />

        {/* Expanding Dashed Prediction Trajectory Path */}
        <path
          d={trajPathD}
          fill="none"
          stroke="#00f2fe"
          strokeWidth="1.8"
          strokeDasharray="4 3"
          className="drop-shadow-[0_0_8px_rgba(0,242,254,0.8)]"
        />

        {/* Target Vector Crosshair */}
        <g transform={`translate(${targetX}, ${targetY})`}>
          <circle cx="0" cy="0" r="6" fill="none" stroke="#00f2fe" strokeWidth="0.8" opacity="0.8" />
          <circle cx="0" cy="0" r="2" fill="#00f2fe" className="animate-ping" />
          <line x1="-8" y1="0" x2="8" y2="0" stroke="rgba(0, 242, 254, 0.6)" strokeWidth="0.6" />
          <line x1="0" y1="-8" x2="0" y2="8" stroke="rgba(0, 242, 254, 0.6)" strokeWidth="0.6" />
        </g>

        {/* Main Orbiting Oracle Planet */}
        <circle cx={px} cy={py} r="4.5" fill="#00f2fe" className="shadow-[0_0_12px_#00f2fe]" />
        <circle cx={px} cy={py} r="2" fill="#ffffff" />

        {/* Orbit Tangent Line */}
        <line
          x1={px}
          y1={py}
          x2={px - Math.sin(mainAngle) * 18}
          y2={py + Math.cos(mainAngle) * 8}
          stroke="rgba(0, 242, 254, 0.5)"
          strokeWidth="1"
          strokeDasharray="2 2"
        />

        {/* Telemetry Labels */}
        <text x="16" y="24" fill="rgba(0, 242, 254, 0.6)" fontSize="7" fontFamily="monospace" letterSpacing="0.05em">
          // ORACLE ASTRONOMY PREDICTION
        </text>
        <text x="16" y="146" fill="rgba(0, 242, 254, 0.5)" fontSize="6.5" fontFamily="monospace">
          VECTOR FIT: {(98.5 + trajectoryProgress * 1.3).toFixed(1)}% | ΔT: +{(trajAngleSpan * 12.4).toFixed(1)}°
        </text>
        <text x="200" y="24" fill="rgba(245, 158, 11, 0.6)" fontSize="6.5" fontFamily="monospace">
          [TARGET T+24h EXPANDED]
        </text>
      </svg>

      {/* Metal Corners */}
      <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#00f2fe]/20" />
      <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#00f2fe]/20" />
      <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#00f2fe]/20" />
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#00f2fe]/20" />
    </div>
  );
}

// ────────────────────────────────────────────────────────
// Illustration 2: Multiphasic Oscilloscope Waves for JAMGONG NEURALSYNC™
// "보라/틸 두 파형이 점차 동기화되며 일치"
// ────────────────────────────────────────────────────────
export function NeuralSyncWaveform() {
  const { ref, isInView } = useInView();
  const [time, setTime] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (motionQuery.matches) return;

    let frameId: number;
    let lastStamp = performance.now();

    const animate = (now: number) => {
      const delta = (now - lastStamp) / 1000;
      lastStamp = now;
      setTime((prev) => prev + delta);
      frameId = requestAnimationFrame(animate);
    };

    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [isInView]);

  // Sync Cycle: 6s total period
  const cyclePeriod = 6.0;
  const cycleTime = time % cyclePeriod;

  let syncFactor = 0;
  if (cycleTime < 3.5) {
    const p = cycleTime / 3.5;
    syncFactor = 0.5 - 0.5 * Math.cos(p * Math.PI);
  } else if (cycleTime < 5.0) {
    syncFactor = 1.0;
  } else {
    const p = (cycleTime - 5.0) / 1.0;
    syncFactor = 0.5 + 0.5 * Math.cos(p * Math.PI);
  }

  const isLocked = syncFactor > 0.95;
  const matchPercent = (38 + syncFactor * 61.9).toFixed(1);

  const width = 340;
  const centerY = 80;
  const points1: string[] = [];
  const points2: string[] = [];

  for (let x = 0; x <= width; x += 3) {
    const envelope = Math.sin((x / width) * Math.PI);

    const freq1 = 0.045;
    const phase1 = time * 3.0;
    const y1 = centerY + Math.sin(x * freq1 + phase1) * 26 * envelope;

    const targetFreq = freq1;
    const initialFreq = 0.065;
    const currentFreq2 = initialFreq + (targetFreq - initialFreq) * syncFactor;

    const initialPhaseShift = Math.PI * 0.85;
    const currentPhaseShift = initialPhaseShift * (1 - syncFactor);

    const initialAmp = 18;
    const targetAmp = 26;
    const currentAmp = initialAmp + (targetAmp - initialAmp) * syncFactor;

    const y2 = centerY + Math.sin(x * currentFreq2 + phase1 + currentPhaseShift) * currentAmp * envelope;

    points1.push(`${x},${y1.toFixed(1)}`);
    points2.push(`${x},${y2.toFixed(1)}`);
  }

  const pathD1 = `M ${points1.join(' L ')}`;
  const pathD2 = `M ${points2.join(' L ')}`;

  return (
    <div ref={ref} className="relative w-full h-44 bg-[#030712] border border-[#c084fc]/20 overflow-hidden flex items-center justify-center select-none group-hover:border-[#c084fc]/45 transition-all duration-300">
      <div className="absolute inset-0 bg-grid-space opacity-20" />

      <svg className="w-full h-full relative z-10" viewBox="0 0 340 160">
        {/* Oscilloscope Grids */}
        <line x1="0" y1="80" x2="340" y2="80" stroke="rgba(192, 132, 252, 0.12)" strokeWidth="1" strokeDasharray="4 4" />
        <line x1="170" y1="0" x2="170" y2="160" stroke="rgba(192, 132, 252, 0.12)" strokeWidth="1" strokeDasharray="4 4" />

        {/* Wave 1: Teal */}
        <path
          d={pathD1}
          fill="none"
          stroke="#00f2fe"
          strokeWidth={isLocked ? "2.2" : "1.8"}
          opacity={isLocked ? "0.9" : "0.75"}
          className="drop-shadow-[0_0_8px_rgba(0,242,254,0.6)]"
        />

        {/* Wave 2: Purple */}
        <path
          d={pathD2}
          fill="none"
          stroke="#c084fc"
          strokeWidth={isLocked ? "2.2" : "1.8"}
          opacity={isLocked ? "0.9" : "0.75"}
          className="drop-shadow-[0_0_8px_rgba(192,132,252,0.6)]"
        />

        {/* Resonance Lock Bar when synchronized */}
        {isLocked && (
          <g>
            <line x1="170" y1="20" x2="170" y2="140" stroke="#00f2fe" strokeWidth="1.5" className="animate-pulse" />
            <circle cx="170" cy="80" r="12" fill="none" stroke="#c084fc" strokeWidth="1" className="animate-ping" />
          </g>
        )}

        {/* Header telemetry text */}
        <text x="16" y="24" fill="rgba(192, 132, 252, 0.7)" fontSize="7" fontFamily="monospace" letterSpacing="0.05em">
          // NEURAL WAVEFORM SYNCHRONIZER
        </text>

        {/* Sync Status Badge */}
        <g transform="translate(225, 14)">
          <rect
            x="0"
            y="0"
            width="100"
            height="18"
            fill={isLocked ? "rgba(0, 242, 254, 0.18)" : "rgba(192, 132, 252, 0.12)"}
            stroke={isLocked ? "#00f2fe" : "rgba(192, 132, 252, 0.4)"}
            strokeWidth="0.8"
            rx="2"
          />
          <text
            x="50"
            y="12"
            textAnchor="middle"
            fill={isLocked ? "#00f2fe" : "#c084fc"}
            fontSize="6.5"
            fontFamily="monospace"
            fontWeight="bold"
          >
            {isLocked ? "SYNC LOCKED" : "SYNCHRONIZING..."}
          </text>
        </g>

        {/* Footer telemetry reading */}
        <text x="16" y="146" fill={isLocked ? "#00f2fe" : "rgba(192, 132, 252, 0.6)"} fontSize="6.5" fontFamily="monospace">
          MATCH: {matchPercent}% | PHASE ERR: {((1 - syncFactor) * 48.2).toFixed(1)}° | FREQ: 256Hz
        </text>
      </svg>

      {/* Metal Corners */}
      <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#c084fc]/20" />
      <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#c084fc]/20" />
      <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#c084fc]/20" />
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#c084fc]/20" />
    </div>
  );
}

// ────────────────────────────────────────────────────────
// Illustration 3: Emotion Node Graph for PUPPY SYNERGY™ / 잼공톡
// "감정 노드 그래프가 순차 연결되며 펄스"
// ────────────────────────────────────────────────────────
export function PuppySynergyNetwork() {
  const { ref, isInView } = useInView();
  const [step, setStep] = useState(0);

  const nodes = [
    { id: 'core', x: 170, y: 80, label: 'EMOTION AI', val: '100%', color: '#10b981' },
    { id: 'joy', x: 80, y: 45, label: 'JOY / 기쁨', val: '96%', color: '#34d399' },
    { id: 'bond', x: 260, y: 50, label: 'BOND / 교감', val: '94%', color: '#10b981' },
    { id: 'trust', x: 240, y: 115, label: 'TRUST / 신뢰', val: '98%', color: '#059669' },
    { id: 'calm', x: 100, y: 120, label: 'CALM / 안침', val: '91%', color: '#34d399' },
  ];

  const edges = [
    { from: 0, to: 1 },
    { from: 1, to: 4 },
    { from: 0, to: 2 },
    { from: 2, to: 3 },
    { from: 4, to: 3 },
  ];

  useEffect(() => {
    if (!isInView) return;

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (motionQuery.matches) return;

    const interval = setInterval(() => {
      setStep((prev) => (prev + 1) % 7);
    }, 750);

    return () => clearInterval(interval);
  }, [isInView]);

  const allConnected = step >= 5;

  return (
    <div ref={ref} className="relative w-full h-44 bg-[#030712] border border-[#10b981]/20 overflow-hidden flex items-center justify-center select-none group-hover:border-[#10b981]/45 transition-all duration-300">
      <div className="absolute inset-0 bg-grid-space opacity-20" />

      <svg className="w-full h-full relative z-10" viewBox="0 0 340 160">
        {/* Edges */}
        {edges.map((edge, idx) => {
          const active = step > idx;
          const n1 = nodes[edge.from];
          const n2 = nodes[edge.to];

          return (
            <g key={idx}>
              <line
                x1={n1.x}
                y1={n1.y}
                x2={n2.x}
                y2={n2.y}
                stroke="rgba(16, 185, 129, 0.12)"
                strokeWidth="1"
              />

              {active && (
                <line
                  x1={n1.x}
                  y1={n1.y}
                  x2={n2.x}
                  y2={n2.y}
                  stroke="#10b981"
                  strokeWidth="1.8"
                  className="drop-shadow-[0_0_8px_rgba(16,185,129,0.8)]"
                />
              )}

              {active && (
                <circle
                  cx={n1.x + (n2.x - n1.x) * 0.5}
                  cy={n1.y + (n2.y - n1.y) * 0.5}
                  r="2"
                  fill="#ffffff"
                  className="animate-ping"
                />
              )}
            </g>
          );
        })}

        {/* Nodes */}
        {nodes.map((node, idx) => {
          const isLit = idx === 0 || step >= idx;

          return (
            <g key={node.id} transform={`translate(${node.x}, ${node.y})`}>
              {isLit && (
                <circle
                  cx="0"
                  cy="0"
                  r={idx === 0 ? "14" : "10"}
                  fill="none"
                  stroke={node.color}
                  strokeWidth="1"
                  className="animate-pulse"
                  opacity="0.6"
                />
              )}

              <circle
                cx="0"
                cy="0"
                r={idx === 0 ? "5" : "3.5"}
                fill={isLit ? node.color : "rgba(16, 185, 129, 0.2)"}
                className={isLit ? "shadow-[0_0_10px_#10b981]" : ""}
              />

              {isLit && <circle cx="0" cy="0" r="1.5" fill="#ffffff" />}

              <text
                x="0"
                y={idx === 0 ? "24" : "-12"}
                textAnchor="middle"
                fill={isLit ? "#10b981" : "rgba(16, 185, 129, 0.4)"}
                fontSize="6.5"
                fontFamily="monospace"
                fontWeight="bold"
              >
                {node.label} {isLit ? node.val : ""}
              </text>
            </g>
          );
        })}

        {/* Global Wave */}
        {allConnected && (
          <rect
            x="0"
            y="0"
            width="340"
            height="160"
            fill="rgba(16, 185, 129, 0.03)"
            className="animate-pulse"
          />
        )}

        {/* Header */}
        <text x="16" y="24" fill="rgba(16, 185, 129, 0.7)" fontSize="7" fontFamily="monospace" letterSpacing="0.05em">
          // EMOTION GRAPH SEQUENTIAL SYNC
        </text>

        {/* Footer */}
        <text x="16" y="146" fill={allConnected ? "#10b981" : "rgba(16, 185, 129, 0.6)"} fontSize="6.5" fontFamily="monospace">
          {allConnected ? "EMOTION SYNERGY LOCKED [100% CONNECTED]" : `CONNECTING GRAPH NODES (${step}/5)...`}
        </text>
      </svg>

      {/* Metal Corners */}
      <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#10b981]/20" />
      <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#10b981]/20" />
      <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#10b981]/20" />
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#10b981]/20" />
    </div>
  );
}

// ────────────────────────────────────────────────────────
// Speedometer Gauge Dial for Pipeline Tracker
// ────────────────────────────────────────────────────────
interface SpeedGaugeProps {
  label: string;
  status: string;
  color: string;
  patent?: string;
  code?: string;
  index?: number;
  gaugeLabel?: string;
}

export function SpeedGauge({ label, status, color, patent, code, index = 0, gaugeLabel }: SpeedGaugeProps) {
  const [displayVal, setDisplayVal] = useState(77.2);
  const targetValRef = useRef(77.2);
  const currentValRef = useRef(77.2);
  const animationFrameRef = useRef<number | null>(null);

  const getGaugeTitle = () => {
    if (gaugeLabel) return gaugeLabel;
    const mod = index % 4;
    if (mod === 0) return "Inference Activity (추론 처리 상태)";
    if (mod === 1) return "Neural Flow (AI 처리 흐름)";
    if (mod === 2) return "Engine Load / Processing Index";
    return "Signal Frequency (연산 주파수)";
  };

  const getBaseValue = () => {
    if (label.includes('자연어') || code === 'CORE AI-01') return 96.8;
    if (label.includes('다중 주기') || code === 'QUANT-01') return 88.4;
    if (label.includes('동적 환경') || code === 'QUANT-02') return 75.9;
    const baseList = [77.2, 78.9, 84.5, 92.1, 71.8, 89.3];
    return baseList[index % baseList.length];
  };

  useEffect(() => {
    const base = getBaseValue();
    targetValRef.current = base;
    currentValRef.current = base;

    const interval = setInterval(() => {
      const flux = (Math.random() - 0.5) * 6;
      targetValRef.current = Math.max(15, Math.min(118, base + flux));
    }, 1200);

    const animate = (now: number) => {
      const lerpFactor = 0.06;
      currentValRef.current += (targetValRef.current - currentValRef.current) * lerpFactor;
      const microJitter = Math.sin(now * 0.008) * 0.25;
      const smoothVal = currentValRef.current + microJitter;

      setDisplayVal(smoothVal);
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      clearInterval(interval);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [index, label, code]);

  const rotationAngle = -90 + (Math.max(0, Math.min(120, displayVal)) / 120) * 180;

  const getColorThemeClass = () => {
    switch (color) {
      case 'cyan':
        return {
          glow: 'shadow-[0_0_22px_rgba(0,242,254,0.22)] border-[#00f2fe]/35',
          hoverGlow: 'hover:border-[#00f2fe] hover:shadow-[0_0_35px_rgba(0,242,254,0.5),0_0_15px_rgba(0,242,254,0.3)]',
          dot: 'bg-[#00f2fe] shadow-[0_0_15px_#00f2fe,0_0_6px_#00f2fe]',
          needle: '#00f2fe',
          accentText: 'text-[#00f2fe]',
          bgBar: 'bg-[#00f2fe]',
        };
      case 'purple':
        return {
          glow: 'shadow-[0_0_22px_rgba(192,132,252,0.22)] border-[#c084fc]/35',
          hoverGlow: 'hover:border-[#c084fc] hover:shadow-[0_0_35px_rgba(192,132,252,0.5),0_0_15px_rgba(192,132,252,0.3)]',
          dot: 'bg-[#c084fc] shadow-[0_0_15px_#c084fc,0_0_6px_#c084fc]',
          needle: '#c084fc',
          accentText: 'text-[#c084fc]',
          bgBar: 'bg-[#c084fc]',
        };
      case 'green':
        return {
          glow: 'shadow-[0_0_22px_rgba(16,185,129,0.22)] border-[#10b981]/35',
          hoverGlow: 'hover:border-[#10b981] hover:shadow-[0_0_35px_rgba(16,185,129,0.5),0_0_15px_rgba(16,185,129,0.3)]',
          dot: 'bg-[#10b981] shadow-[0_0_15px_#10b981,0_0_6px_#10b981]',
          needle: '#10b981',
          accentText: 'text-[#10b981]',
          bgBar: 'bg-[#10b981]',
        };
      default:
        return {
          glow: 'shadow-[0_0_22px_rgba(245,158,11,0.22)] border-[#f59e0b]/35',
          hoverGlow: 'hover:border-[#f59e0b] hover:shadow-[0_0_35px_rgba(245,158,11,0.5),0_0_15px_rgba(245,158,11,0.3)]',
          dot: 'bg-amber-400 shadow-[0_0_15px_#f59e0b,0_0_6px_#f59e0b]',
          needle: '#f59e0b',
          accentText: 'text-amber-400',
          bgBar: 'bg-amber-400',
        };
    }
  };

  const theme = getColorThemeClass();
  const totalArcLength = 125.6;
  const activeArcOffset = totalArcLength - (Math.max(0, Math.min(120, displayVal)) / 120) * totalArcLength;

  return (
    <div className={`relative bg-[#050811] border ${theme.glow} ${theme.hoverGlow} flex flex-col justify-between p-6 px-7 rounded-none min-w-[320px] sm:min-w-[340px] text-left select-none group hover:bg-[#070b1a] transition-all duration-300 hover:scale-[1.02] overflow-hidden`}>
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-slate-900 overflow-hidden">
        <div 
          className={`h-full ${theme.bgBar} transition-all duration-150`}
          style={{ width: `${Math.min(100, (displayVal / 120) * 100)}%` }}
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          {code && (
            <div className="text-[12px] font-mono text-[#c084fc] font-bold uppercase tracking-widest leading-none drop-shadow-[0_0_8px_rgba(192,132,252,0.5)]">
              {code}
            </div>
          )}
          <div className="flex items-center gap-1.5 text-[9px] font-mono font-bold text-slate-400 bg-slate-900/80 px-2 py-0.5 border border-slate-800/80">
            <span className={`w-1.5 h-1.5 rounded-full ${theme.dot} animate-pulse`} />
            <span className="text-slate-300">NODE-{((index % 8) + 1).toString().padStart(2, '0')}</span>
          </div>
        </div>

        <div className="text-[17px] sm:text-[18px] font-sans font-black tracking-tight text-white line-clamp-1">
          {label}
        </div>
        {patent && (
          <div className="text-[14px] sm:text-[15px] font-mono text-slate-100 font-bold bg-slate-900/40 px-2 py-1 border border-slate-800/60 uppercase tracking-wide line-clamp-1 group-hover:border-[#00f2fe]/40 group-hover:animate-pulse transition-all">
            {patent}
          </div>
        )}
        <div className="flex items-center gap-2.5 text-[14px] sm:text-[15px] font-sans font-black text-[#00f2fe] drop-shadow-[0_0_12px_rgba(0,242,254,0.95)] group-hover:animate-pulse group-hover:drop-shadow-[0_0_16px_rgba(0,242,254,1)] transition-all">
          <span className="w-2.5 h-2.5 rounded-full bg-[#00f2fe] shadow-[0_0_12px_#00f2fe,0_0_5px_#00f2fe] animate-pulse" />
          <span>{status || '출원 중'}</span>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2 text-[11px] font-mono tracking-tight">
        <div className="flex items-center gap-1.5 font-bold text-white uppercase drop-shadow-[0_0_6px_rgba(255,255,255,0.3)]">
          <span className={`w-2 h-2 rounded-full ${theme.dot}`} />
          <span>{getGaugeTitle()}</span>
        </div>
        <span className="text-[8.5px] text-slate-400 font-mono font-semibold uppercase bg-slate-900/90 px-1.5 py-0.5 border border-slate-800">
          REAL-TIME
        </span>
      </div>

      <div className="relative w-full h-22 flex flex-col items-center justify-center mt-1">
        <svg className="w-28 h-14 overflow-visible" viewBox="0 0 100 50">
          <path
            d="M 10 50 A 40 40 0 0 1 90 50"
            fill="none"
            stroke="rgba(241, 245, 249, 0.14)"
            strokeWidth="7"
            strokeLinecap="round"
          />

          <path
            d="M 10 50 A 40 40 0 0 1 90 50"
            fill="none"
            stroke={theme.needle}
            strokeWidth="5"
            strokeDasharray={totalArcLength}
            strokeDashoffset={activeArcOffset}
            strokeLinecap="round"
            style={{ filter: `drop-shadow(0 0 6px ${theme.needle})` }}
          />

          <path
            d="M 10 50 A 40 40 0 0 1 90 50"
            fill="none"
            stroke="#ffffff"
            strokeWidth="2"
            strokeDasharray="2 12"
            className="animate-[pulse_1s_infinite]"
            opacity="0.6"
          />

          <line x1="10" y1="50" x2="14" y2="50" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
          <line x1="21.7" y1="21.7" x2="24.5" y2="24.5" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
          <line x1="50" y1="10" x2="50" y2="14" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" />
          <line x1="78.3" y1="21.7" x2="75.5" y2="24.5" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
          <line x1="90" y1="50" x2="86" y2="50" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />

          <circle cx="50" cy="50" r="4.5" fill="#F8FAFC" />
          <circle cx="50" cy="50" r="2.5" fill="#050811" />

          <line
            x1="50"
            y1="50"
            x2="50"
            y2="14"
            stroke={theme.needle}
            strokeWidth="2.8"
            strokeLinecap="round"
            style={{
              transform: `rotate(${rotationAngle}deg)`,
              transformOrigin: '50px 50px',
              filter: `drop-shadow(0 0 6px ${theme.needle})`
            }}
          />
        </svg>

        <div className="flex flex-col items-center mt-1">
          <div className={`text-[15px] sm:text-[16px] font-mono leading-none font-extrabold tracking-wider ${theme.accentText} drop-shadow-[0_0_10px_rgba(0,242,254,0.8)] flex items-baseline gap-1`}>
            <span>{displayVal.toFixed(1)}</span>
            <span className="text-[10px] text-slate-300 font-bold uppercase">Hz</span>
          </div>

          <div className="flex items-center gap-1.5 mt-1.5">
            <span className="inline-flex items-center gap-1">
              <span className={`w-1 h-1 rounded-full ${theme.dot} animate-[ping_1.5s_infinite_100ms]`} />
              <span className={`w-1 h-1 rounded-full ${theme.dot} animate-[ping_1.5s_infinite_400ms]`} />
              <span className={`w-1 h-1 rounded-full ${theme.dot} animate-[ping_1.5s_infinite_700ms]`} />
            </span>
            <span className="text-[8.5px] font-mono text-slate-300 font-bold uppercase tracking-widest">
              FLOW ACTIVE
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────
// Illustration 4: Holographic Interface for JAMGONG HOLO™
// "홀로그램 와이어프레임 실린더 회전 + 스캔 라인"
// ────────────────────────────────────────────────────────
export function HoloProjection() {
  const { ref, isInView } = useInView();
  const [angle, setAngle] = useState(0);
  const [scanY, setScanY] = useState(30);

  useEffect(() => {
    if (!isInView) return;

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (motionQuery.matches) return;

    let frameId: number;
    let lastStamp = performance.now();

    const animate = (now: number) => {
      const delta = (now - lastStamp) / 1000;
      lastStamp = now;

      setAngle((prev) => (prev + delta * 1.2) % (Math.PI * 2));

      const scanCycle = (now / 1200) % (Math.PI * 2);
      const newScanY = 80 + Math.sin(scanCycle) * 42;
      setScanY(newScanY);

      frameId = requestAnimationFrame(animate);
    };

    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [isInView]);

  const cx = 170;
  const radiusX = 55;
  const radiusY = 16;
  const topY = 40;
  const bottomY = 120;
  const numRibs = 8;

  const ribs = [];
  for (let i = 0; i < numRibs; i++) {
    const a = angle + (i / numRibs) * Math.PI * 2;
    const rx = cx + Math.cos(a) * radiusX;
    const z = Math.sin(a);
    const isFront = z > 0;
    ribs.push({ rx, isFront, z });
  }

  return (
    <div ref={ref} className="relative w-full h-44 bg-[#030712] border border-[#38bdf8]/20 overflow-hidden flex items-center justify-center select-none group-hover:border-[#38bdf8]/45 transition-all duration-300">
      <div className="absolute inset-0 bg-grid-space opacity-20" />

      <svg className="w-full h-full relative z-10" viewBox="0 0 340 160">
        {/* Hologram Base Conical Emission Beams */}
        <polygon points="140,152 200,152 225,40 115,40" fill="rgba(0, 242, 254, 0.03)" />
        <line x1="170" y1="152" x2="115" y2="40" stroke="rgba(0, 242, 254, 0.12)" strokeWidth="0.8" strokeDasharray="3 3" />
        <line x1="170" y1="152" x2="225" y2="40" stroke="rgba(0, 242, 254, 0.12)" strokeWidth="0.8" strokeDasharray="3 3" />

        {/* Holo Projector Base */}
        <ellipse cx={cx} cy="152" rx="28" ry="6" fill="#0c192e" stroke="rgba(0, 242, 254, 0.4)" strokeWidth="1" />
        <ellipse cx={cx} cy="152" rx="14" ry="3" fill="#00f2fe" className="animate-pulse" />

        {/* 3D Wireframe Cylinder Rings */}
        <ellipse cx={cx} cy={topY} rx={radiusX} ry={radiusY} fill="none" stroke="#00f2fe" strokeWidth="1.2" opacity="0.8" />
        <ellipse cx={cx} cy="80" rx={radiusX} ry={radiusY} fill="none" stroke="rgba(0, 242, 254, 0.5)" strokeWidth="1" strokeDasharray="4 3" />
        <ellipse cx={cx} cy={bottomY} rx={radiusX} ry={radiusY} fill="none" stroke="#00f2fe" strokeWidth="1.2" opacity="0.8" />

        {/* Rotating Vertical Ribs */}
        {ribs.map((rib, idx) => (
          <line
            key={idx}
            x1={rib.rx}
            y1={topY}
            x2={rib.rx}
            y2={bottomY}
            stroke="#00f2fe"
            strokeWidth={rib.isFront ? "1.2" : "0.6"}
            opacity={rib.isFront ? 0.85 : 0.25}
          />
        ))}

        {/* Scanning Beam Sweep Line */}
        <line
          x1={cx - radiusX - 10}
          y1={scanY}
          x2={cx + radiusX + 10}
          y2={scanY}
          stroke="#00f2fe"
          strokeWidth="1.8"
          className="drop-shadow-[0_0_10px_#00f2fe]"
        />

        {/* Scanning beam highlight dots at rib intersections */}
        {ribs.map((rib, idx) => {
          if (!rib.isFront) return null;
          return (
            <circle
              key={idx}
              cx={rib.rx}
              cy={scanY}
              r="2.5"
              fill="#ffffff"
              className="shadow-[0_0_8px_#ffffff]"
            />
          );
        })}

        {/* Central Hologram Core Eye Node */}
        <circle cx={cx} cy="80" r="10" fill="none" stroke="#00f2fe" strokeWidth="1" opacity="0.7" />
        <circle cx={cx} cy="80" r="3" fill="#00f2fe" className="shadow-[0_0_8px_#00f2fe]" />

        {/* Header Telemetry */}
        <text x="16" y="24" fill="rgba(0, 242, 254, 0.7)" fontSize="7" fontFamily="monospace" letterSpacing="0.05em">
          // 3D HOLOGRAM CYLINDER MATRIX
        </text>

        {/* Footer Telemetry */}
        <text x="16" y="146" fill="rgba(0, 242, 254, 0.6)" fontSize="6.5" fontFamily="monospace">
          ROTATION Y: {((angle * 180) / Math.PI).toFixed(0)}° | SCAN Y: {scanY.toFixed(0)}px | 60 FPS
        </text>
      </svg>

      {/* Metal Corners */}
      <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#38bdf8]/20" />
      <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#38bdf8]/20" />
      <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#38bdf8]/20" />
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#38bdf8]/20" />
    </div>
  );
}

// ────────────────────────────────────────────────────────
// SYSTEM ARCHITECTURE Data Packet Flow Arrows
// "SYSTEM ARCHITECTURE 화살표를 따라 데이터 패킷(빛 점) 이동 애니메이션"
// ────────────────────────────────────────────────────────

export function DataFlowArrowRight({ color = "#00f2fe", speed = "1.6s" }: { color?: string; speed?: string }) {
  const glowId = `glow-r-${color.replace('#', '')}`;
  return (
    <div className="relative w-full h-8 flex items-center justify-center overflow-hidden select-none">
      <svg className="w-full h-8 overflow-visible" viewBox="0 0 100 24" preserveAspectRatio="none">
        <defs>
          <filter id={glowId} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        <line x1="0" y1="12" x2="92" y2="12" stroke={color} strokeWidth="1.5" strokeDasharray="4 3" opacity="0.3" />

        <circle r="3.5" fill={color} filter={`url(#${glowId})`}>
          <animate attributeName="cx" from="0%" to="90%" dur={speed} repeatCount="indefinite" />
          <animate attributeName="cy" values="12;12" dur={speed} repeatCount="indefinite" />
        </circle>

        <circle r="1.8" fill="#ffffff">
          <animate attributeName="cx" from="0%" to="90%" dur={speed} repeatCount="indefinite" />
          <animate attributeName="cy" values="12;12" dur={speed} repeatCount="indefinite" />
        </circle>

        <circle r="2.2" fill={color} opacity="0.75" filter={`url(#${glowId})`}>
          <animate attributeName="cx" from="-25%" to="65%" dur={speed} repeatCount="indefinite" />
          <animate attributeName="cy" values="12;12" dur={speed} repeatCount="indefinite" />
        </circle>

        <polygon points="90,6 100,12 90,18" fill={color} opacity="0.9" />
      </svg>
    </div>
  );
}

export function DataFlowArrowLeft({ color = "#3b82f6", speed = "1.6s" }: { color?: string; speed?: string }) {
  const glowId = `glow-l-${color.replace('#', '')}`;
  return (
    <div className="relative w-full h-8 flex items-center justify-center overflow-hidden select-none">
      <svg className="w-full h-8 overflow-visible" viewBox="0 0 100 24" preserveAspectRatio="none">
        <defs>
          <filter id={glowId} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        <line x1="100" y1="12" x2="8" y2="12" stroke={color} strokeWidth="1.5" strokeDasharray="4 3" opacity="0.3" />

        <circle r="3.5" fill={color} filter={`url(#${glowId})`}>
          <animate attributeName="cx" from="100%" to="10%" dur={speed} repeatCount="indefinite" />
          <animate attributeName="cy" values="12;12" dur={speed} repeatCount="indefinite" />
        </circle>

        <circle r="1.8" fill="#ffffff">
          <animate attributeName="cx" from="100%" to="10%" dur={speed} repeatCount="indefinite" />
          <animate attributeName="cy" values="12;12" dur={speed} repeatCount="indefinite" />
        </circle>

        <circle r="2.2" fill={color} opacity="0.75" filter={`url(#${glowId})`}>
          <animate attributeName="cx" from="125%" to="35%" dur={speed} repeatCount="indefinite" />
          <animate attributeName="cy" values="12;12" dur={speed} repeatCount="indefinite" />
        </circle>

        <polygon points="10,6 0,12 10,18" fill={color} opacity="0.9" />
      </svg>
    </div>
  );
}

export function DataFlowArrowDown({ color = "#c084fc", speed = "1.4s" }: { color?: string; speed?: string }) {
  const glowId = `glow-d-${color.replace('#', '')}`;
  return (
    <div className="relative w-full h-12 flex items-center justify-center overflow-hidden select-none">
      <svg className="h-12 w-8 overflow-visible" viewBox="0 0 32 48" preserveAspectRatio="none">
        <defs>
          <filter id={glowId} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        <line x1="16" y1="0" x2="16" y2="40" stroke={color} strokeWidth="1.5" strokeDasharray="4 3" opacity="0.3" />

        <circle r="3.5" fill={color} filter={`url(#${glowId})`}>
          <animate attributeName="cy" from="0%" to="85%" dur={speed} repeatCount="indefinite" />
          <animate attributeName="cx" values="16;16" dur={speed} repeatCount="indefinite" />
        </circle>

        <circle r="1.8" fill="#ffffff">
          <animate attributeName="cy" from="0%" to="85%" dur={speed} repeatCount="indefinite" />
          <animate attributeName="cx" values="16;16" dur={speed} repeatCount="indefinite" />
        </circle>

        <circle r="2.2" fill={color} opacity="0.75" filter={`url(#${glowId})`}>
          <animate attributeName="cy" from="-25%" to="60%" dur={speed} repeatCount="indefinite" />
          <animate attributeName="cx" values="16;16" dur={speed} repeatCount="indefinite" />
        </circle>

        <polygon points="10,38 16,48 22,38" fill={color} opacity="0.9" />
      </svg>
    </div>
  );
}

