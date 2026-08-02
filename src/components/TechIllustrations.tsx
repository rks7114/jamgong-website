import { useEffect, useState, useRef } from 'react';

// Illustration 1: Planetary Orbit for JAMGONG ORACLE™
export function OracleOrbit() {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    let frameId: number;
    const animate = () => {
      setRotation((prev) => (prev + 0.15) % 360);
      frameId = requestAnimationFrame(animate);
    };
    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, []);

  return (
    <div className="relative w-full h-44 bg-[#030712] border border-[#00f2fe]/20 overflow-hidden flex items-center justify-center select-none group-hover:border-[#00f2fe]/45 transition-all duration-300">
      {/* Space grid background */}
      <div className="absolute inset-0 bg-grid-space opacity-20" />
      
      {/* Central Star Glow */}
      <div className="absolute w-7 h-7 bg-amber-500 rounded-full blur-[6px] opacity-70 animate-pulse-glow-cyan" />
      <div className="absolute w-4 h-4 bg-amber-400 rounded-full shadow-[0_0_15px_#f59e0b]" />

      <svg className="w-full h-full relative z-10" viewBox="0 0 340 160">
        {/* Orbital paths */}
        <ellipse cx="170" cy="80" rx="110" ry="40" fill="none" stroke="rgba(0, 242, 254, 0.18)" strokeWidth="1" strokeDasharray="4 3" />
        <ellipse cx="170" cy="80" rx="80" ry="28" fill="none" stroke="rgba(245, 158, 11, 0.25)" strokeWidth="1" />
        <ellipse cx="170" cy="80" rx="50" ry="18" fill="none" stroke="rgba(0, 242, 254, 0.15)" strokeWidth="1" />

        {/* Orbiting planet 1 */}
        <g style={{ transform: `rotate(${rotation}deg)`, transformOrigin: '170px 80px', transition: 'transform 0.1s linear' }}>
          <circle cx="280" cy="80" r="3.5" fill="#00f2fe" className="shadow-[0_0_8px_#00f2fe]" />
          <line x1="280" y1="80" x2="260" y2="105" stroke="rgba(0, 242, 254, 0.3)" strokeWidth="0.7" strokeDasharray="2 2" />
          <text x="215" y="118" fill="rgba(0, 242, 254, 0.6)" fontSize="7" fontFamily="monospace" letterSpacing="0.05em">Transit energy</text>
        </g>

        {/* Orbiting planet 2 */}
        <g style={{ transform: `rotate(${-rotation * 1.5}deg)`, transformOrigin: '170px 80px', transition: 'transform 0.1s linear' }}>
          <circle cx="220" cy="80" r="2.5" fill="#f59e0b" className="shadow-[0_0_8px_#f59e0b]" />
        </g>

        {/* Labels & Coordinates */}
        <text x="20" y="30" fill="rgba(241, 245, 249, 0.4)" fontSize="7" fontFamily="monospace" letterSpacing="0.05em">
          // Orbital astrometry
        </text>
        
        {/* Pointer lines to solar core */}
        <line x1="170" y1="80" x2="225" y2="40" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="0.8" />
        <circle cx="225" cy="40" r="1.5" fill="rgba(241, 245, 249, 0.6)" />
        <text x="232" y="42" fill="rgba(241, 245, 249, 0.4)" fontSize="7" fontFamily="monospace">Orbital mechanics</text>
      </svg>

      {/* Decorative metal corner brackets */}
      <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#00f2fe]/20" />
      <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#00f2fe]/20" />
      <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#00f2fe]/20" />
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#00f2fe]/20" />
    </div>
  );
}

// Illustration 2: Multiphasic Oscilloscope Waves for JAMGONG NEURALSYNC™
export function NeuralSyncWaveform() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    let frameId: number;
    const animate = () => {
      setPhase((prev) => prev + 0.05);
      frameId = requestAnimationFrame(animate);
    };
    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, []);

  const createWavePath = (amplitude: number, freq: number, phaseShift: number, offset: number) => {
    let points = [];
    const width = 340;
    const centerY = 80;
    for (let x = 0; x <= width; x += 3) {
      // Create a nice envelope that tapers at both ends
      const envelope = Math.sin((x / width) * Math.PI);
      const y = centerY + Math.sin(x * freq + phase + phaseShift) * amplitude * envelope;
      points.push(`${x},${y}`);
    }
    return `M ${points.join(' L ')}`;
  };

  return (
    <div className="relative w-full h-44 bg-[#030712] border border-[#c084fc]/15 overflow-hidden flex items-center justify-center select-none group-hover:border-[#c084fc]/35 transition-all duration-300">
      <div className="absolute inset-0 bg-grid-space opacity-20" />

      <svg className="w-full h-full relative z-10" viewBox="0 0 340 160">
        {/* Oscilloscope grids */}
        <line x1="0" y1="80" x2="340" y2="80" stroke="rgba(192, 132, 252, 0.1)" strokeWidth="1" strokeDasharray="3 3" />
        <line x1="170" y1="0" x2="170" y2="160" stroke="rgba(192, 132, 252, 0.1)" strokeWidth="1" strokeDasharray="3 3" />

        {/* Wave 1: Cyan */}
        <path
          d={createWavePath(26, 0.05, 0, 80)}
          fill="none"
          stroke="rgba(0, 242, 254, 0.65)"
          strokeWidth="1.8"
          className="drop-shadow-[0_0_6px_rgba(0,242,254,0.4)]"
        />

        {/* Wave 2: Magenta / Purple */}
        <path
          d={createWavePath(18, 0.08, Math.PI / 3, 80)}
          fill="none"
          stroke="rgba(168, 85, 247, 0.75)"
          strokeWidth="1.5"
          className="drop-shadow-[0_0_6px_rgba(168,85,247,0.4)]"
        />

        {/* Wave 3: Slate purple background */}
        <path
          d={createWavePath(12, 0.03, Math.PI, 80)}
          fill="none"
          stroke="rgba(139, 92, 246, 0.35)"
          strokeWidth="1"
        />

        {/* Labels & Signals */}
        <text x="20" y="30" fill="rgba(192, 132, 252, 0.5)" fontSize="7" fontFamily="monospace" letterSpacing="0.05em">
          // Multi-Layer Frequency
        </text>
        <text x="260" y="145" fill="rgba(192, 132, 252, 0.5)" fontSize="7" fontFamily="monospace">
          256-depth Sync
        </text>

        {/* Dynamic coordinate point on wave */}
        {(() => {
          const width = 340;
          const x = 110;
          const env = Math.sin((x / width) * Math.PI);
          const y = 80 + Math.sin(x * 0.05 + phase) * 26 * env;
          return (
            <g>
              <circle cx={x} cy={y} r="3" fill="#00f2fe" className="shadow-[0_0_8px_#00f2fe]" />
              <line x1={x} y1={y} x2={x} y2="125" stroke="rgba(0, 242, 254, 0.3)" strokeWidth="0.8" strokeDasharray="2 1" />
              <text x={x - 30} y="135" fill="rgba(0, 242, 254, 0.6)" fontSize="6.5" fontFamily="monospace">Phase Locker</text>
            </g>
          );
        })()}
      </svg>

      {/* Decorative metal corner brackets */}
      <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#c084fc]/20" />
      <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#c084fc]/20" />
      <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#c084fc]/20" />
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#c084fc]/20" />
    </div>
  );
}

// Illustration 3: Constellation Node Network for PUPPY SYNERGY™
export function PuppySynergyNetwork() {
  const [pulseScale, setPulseScale] = useState(1);

  useEffect(() => {
    let interval = setInterval(() => {
      setPulseScale((p) => (p === 1 ? 1.2 : 1));
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-44 bg-[#030712] border border-[#10b981]/15 overflow-hidden flex items-center justify-center select-none group-hover:border-[#10b981]/35 transition-all duration-300">
      <div className="absolute inset-0 bg-grid-space opacity-20" />

      {/* Human Frame & Puppy Frame stylized diagram */}
      <svg className="w-full h-full relative z-10" viewBox="0 0 340 160">
        {/* Matrix network lines */}
        <line x1="80" y1="80" x2="160" y2="45" stroke="rgba(16, 185, 129, 0.18)" strokeWidth="0.8" />
        <line x1="160" y1="45" x2="230" y2="70" stroke="rgba(16, 185, 129, 0.13)" strokeWidth="0.8" />
        <line x1="160" y1="45" x2="190" y2="105" stroke="rgba(16, 185, 129, 0.15)" strokeWidth="0.8" />
        <line x1="80" y1="80" x2="110" y2="125" stroke="rgba(16, 185, 129, 0.15)" strokeWidth="0.8" />
        <line x1="190" y1="105" x2="260" y2="95" stroke="rgba(16, 185, 129, 0.18)" strokeWidth="0.8" />

        {/* Human mesh frame silhouette preview */}
        <g transform="translate(145, 25) scale(0.6)">
          {/* Head */}
          <circle cx="25" cy="15" r="5" fill="none" stroke="#10b981" strokeWidth="1" />
          {/* Spine */}
          <line x1="25" y1="20" x2="25" y2="45" stroke="#10b981" strokeWidth="1" />
          {/* Arms */}
          <line x1="10" y1="25" x2="40" y2="25" stroke="#10b981" strokeWidth="0.8" />
          {/* Legs */}
          <line x1="25" y1="45" x2="15" y2="65" stroke="#10b981" strokeWidth="0.8" />
          <line x1="25" y1="45" x2="35" y2="65" stroke="#10b981" strokeWidth="0.8" />
          <circle cx="25" cy="45" r="1.5" fill="#10b981" />
        </g>

        {/* Puppy nodes & lines */}
        <g transform="translate(70, 75) scale(0.55)">
          {/* Custom puppy geometric dots vector */}
          <circle cx="20" cy="10" r="3" fill="none" stroke="#10b981" strokeWidth="1" />
          <line x1="20" y1="10" x2="10" y2="15" stroke="#10b981" strokeWidth="0.8" />
          {/* Body line */}
          <line x1="10" y1="15" x2="-10" y2="15" stroke="#10b981" strokeWidth="0.8" />
          {/* Legs */}
          <line x1="10" y1="15" x2="12" y2="28" stroke="#10b981" strokeWidth="0.8" />
          <line x1="-10" y1="15" x2="-8" y2="28" stroke="#10b981" strokeWidth="0.8" />
          {/* Tail */}
          <line x1="-10" y1="15" x2="-18" y2="5" stroke="#10b981" strokeWidth="0.8" />
        </g>

        <g transform="translate(245, 80) scale(0.5)">
          {/* Puppy 2 */}
          <circle cx="20" cy="10" r="3" fill="none" stroke="#10b981" strokeWidth="1" />
          <line x1="20" y1="10" x2="10" y2="15" stroke="#10b981" strokeWidth="0.8" />
          <line x1="10" y1="15" x2="-10" y2="15" stroke="#10b981" strokeWidth="0.8" />
          <line x1="10" y1="15" x2="12" y2="28" stroke="#10b981" strokeWidth="0.8" />
          <line x1="-10" y1="15" x2="-8" y2="28" stroke="#10b981" strokeWidth="0.8" />
        </g>

        {/* Glowing constellation target circle points */}
        <circle cx="160" cy="45" r="5" fill="none" stroke="#10b981" strokeWidth="1" />
        <circle cx="160" cy="45" r="9" fill="none" stroke="rgba(16, 185, 129, 0.4)" strokeWidth="0.6" style={{ transform: `scale(${pulseScale})`, transformOrigin: '160px 45px', transition: 'transform 0.5s ease-out' }} />

        <circle cx="80" cy="80" r="4.5" fill="#10b981" className="shadow-[0_0_8px_#10b981]" />
        <circle cx="190" cy="105" r="4" fill="none" stroke="#10b981" strokeWidth="1" />
        <circle cx="260" cy="95" r="5" fill="#10b981" className="shadow-[0_0_8px_rgba(16, 185, 129, 0.6)]" />

        {/* Dynamic captions */}
        <text x="20" y="30" fill="rgba(16, 185, 129, 0.48)" fontSize="7" fontFamily="monospace" letterSpacing="0.05em">
          // Bio-energy grid
        </text>
        <text x="18" y="145" fill="rgba(16, 185, 129, 0.45)" fontSize="7" fontFamily="monospace">
          Synchronization telemetry
        </text>
      </svg>

      {/* Decorative metal corner brackets */}
      <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#10b981]/20" />
      <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#10b981]/20" />
      <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#10b981]/20" />
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#10b981]/20" />
    </div>
  );
}

// Interactive Speedometer Gauge for the Pipeline tracking registry
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

  // 1. Determine explicit gauge label for visitor clarity
  const getGaugeTitle = () => {
    if (gaugeLabel) return gaugeLabel;
    
    // Explicit requested labels
    const mod = index % 4;
    if (mod === 0) return "Inference Activity (추론 처리 상태)";
    if (mod === 1) return "Neural Flow (AI 처리 흐름)";
    if (mod === 2) return "Engine Load / Processing Index";
    return "Signal Frequency (연산 주파수)";
  };

  // Base frequency setting per card
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

    // Periodically update target value for smooth fluctuation
    const interval = setInterval(() => {
      const flux = (Math.random() - 0.5) * 6;
      targetValRef.current = Math.max(15, Math.min(118, base + flux));
    }, 1200);

    // Smooth real-time animation loop using requestAnimationFrame
    const animate = (now: number) => {
      // Lerp interpolation towards target
      const lerpFactor = 0.06;
      currentValRef.current += (targetValRef.current - currentValRef.current) * lerpFactor;
      
      // Add realistic micro-fluctuation jitter
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

  // Map values (-90deg to 90deg)
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

  // Active arc stroke length calculation
  const totalArcLength = 125.6;
  const activeArcOffset = totalArcLength - (Math.max(0, Math.min(120, displayVal)) / 120) * totalArcLength;

  return (
    <div className={`relative bg-[#050811] border ${theme.glow} ${theme.hoverGlow} flex flex-col justify-between p-6 px-7 rounded-none min-w-[320px] sm:min-w-[340px] text-left select-none group hover:bg-[#070b1a] transition-all duration-300 hover:scale-[1.02] overflow-hidden`}>
      {/* Dynamic Data Node Ticker Line at Top */}
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
          {/* Realtime Node Identifier Badge */}
          <div className="flex items-center gap-1.5 text-[9px] font-mono font-bold text-slate-400 bg-slate-900/80 px-2 py-0.5 border border-slate-800/80">
            <span className={`w-1.5 h-1.5 rounded-full ${theme.dot} animate-pulse`} />
            <span className="text-slate-300">NODE-{((index % 8) + 1).toString().padStart(2, '0')}</span>
          </div>
        </div>

        <div className="text-[17px] sm:text-[18px] font-sans font-black tracking-tight text-white line-clamp-1">
          {label}
        </div>
        {patent && (
          <div className="text-[14px] sm:text-[15px] font-mono text-slate-100 font-bold bg-slate-900/40 px-2 py-1 border border-slate-800/60 uppercase tracking-wide line-clamp-1">
            {patent}
          </div>
        )}
        <div className="flex items-center gap-2.5 text-[14px] sm:text-[15px] font-sans font-black text-[#00f2fe] drop-shadow-[0_0_12px_rgba(0,242,254,0.95)]">
          <span className="w-2.5 h-2.5 rounded-full bg-[#00f2fe] shadow-[0_0_12px_#00f2fe,0_0_5px_#00f2fe] animate-pulse" />
          {status || '출원 중'}
        </div>
      </div>

      {/* ── GAUGE HEADER LABEL (게이지 바로 위 명확한 서브타이틀) ── */}
      <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2 text-[11px] font-mono tracking-tight">
        <div className="flex items-center gap-1.5 font-bold text-white uppercase drop-shadow-[0_0_6px_rgba(255,255,255,0.3)]">
          <span className={`w-2 h-2 rounded-full ${theme.dot}`} />
          <span>{getGaugeTitle()}</span>
        </div>
        <span className="text-[8.5px] text-slate-400 font-mono font-semibold uppercase bg-slate-900/90 px-1.5 py-0.5 border border-slate-800">
          REAL-TIME
        </span>
      </div>

      {/* Speedometer Gauge Dial with Realtime Smooth Needle & Node Flow Visuals */}
      <div className="relative w-full h-22 flex flex-col items-center justify-center mt-1">
        <svg className="w-28 h-14 overflow-visible" viewBox="0 0 100 50">
          {/* Base Gauge Arc path */}
          <path
            d="M 10 50 A 40 40 0 0 1 90 50"
            fill="none"
            stroke="rgba(241, 245, 249, 0.14)"
            strokeWidth="7"
            strokeLinecap="round"
          />

          {/* Active Level Arc path with glowing filter */}
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

          {/* Animated Node Flow Particles along Gauge */}
          <path
            d="M 10 50 A 40 40 0 0 1 90 50"
            fill="none"
            stroke="#ffffff"
            strokeWidth="2"
            strokeDasharray="2 12"
            className="animate-[pulse_1s_infinite]"
            opacity="0.6"
          />

          {/* Tick Marks */}
          <line x1="10" y1="50" x2="14" y2="50" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
          <line x1="21.7" y1="21.7" x2="24.5" y2="24.5" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
          <line x1="50" y1="10" x2="50" y2="14" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" />
          <line x1="78.3" y1="21.7" x2="75.5" y2="24.5" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
          <line x1="90" y1="50" x2="86" y2="50" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />

          {/* Needle pivot */}
          <circle cx="50" cy="50" r="4.5" fill="#F8FAFC" />
          <circle cx="50" cy="50" r="2.5" fill="#050811" />

          {/* Rotatable Needle line with Smooth Realtime Angle */}
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

        {/* Smooth Numerical Value & Unit Display */}
        <div className="flex flex-col items-center mt-1">
          <div className={`text-[15px] sm:text-[16px] font-mono leading-none font-extrabold tracking-wider ${theme.accentText} drop-shadow-[0_0_10px_rgba(0,242,254,0.8)] flex items-baseline gap-1`}>
            <span>{displayVal.toFixed(1)}</span>
            <span className="text-[10px] text-slate-300 font-bold uppercase">Hz</span>
          </div>

          {/* Node Flow Stream Status Animation */}
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

// Illustration 4: Holographic Interface for JAMGONG HOLO™
export function HoloProjection() {
  const [pulse, setPulse] = useState(1);
  const [sweep, setSweep] = useState(0);

  useEffect(() => {
    let frameId: number;
    let start = Date.now();
    const animate = () => {
      const elapsed = (Date.now() - start) / 1000;
      setPulse(1 + Math.sin(elapsed * 4) * 0.08);
      setSweep((elapsed * 50) % 90);
      frameId = requestAnimationFrame(animate);
    };
    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, []);

  return (
    <div className="relative w-full h-44 bg-[#030712] border border-[#00f2fe]/15 overflow-hidden flex items-center justify-center select-none group-hover:border-[#00f2fe]/35 transition-all duration-300">
      <div className="absolute inset-0 bg-grid-space opacity-20" />
      
      <svg className="w-full h-full relative z-10" viewBox="0 0 340 160">
        {/* Hologram projection lines */}
        <line x1="170" y1="150" x2="110" y2="60" stroke="rgba(0, 242, 254, 0.15)" strokeWidth="0.8" strokeDasharray="3 3" />
        <line x1="170" y1="150" x2="230" y2="60" stroke="rgba(0, 242, 254, 0.15)" strokeWidth="0.8" strokeDasharray="3 3" />
        <line x1="170" y1="150" x2="170" y2="40" stroke="rgba(0, 242, 254, 0.2)" strokeWidth="0.8" strokeDasharray="3 3" />

        {/* Holo Projector Base */}
        <path d="M 140 150 L 200 150 L 190 158 L 150 158 Z" fill="#0c192e" stroke="rgba(0, 242, 254, 0.4)" strokeWidth="1" />
        <ellipse cx="170" cy="150" rx="20" ry="4" fill="#00f2fe" className="animate-pulse" />

        {/* Cylindrical Hologram Grid */}
        <g style={{ transform: `scale(${pulse})`, transformOrigin: '170px 85px' }}>
          {/* Hologram rings */}
          <ellipse cx="170" cy="50" rx="55" ry="14" fill="none" stroke="rgba(0, 242, 254, 0.2)" strokeWidth="1" />
          <ellipse cx="170" cy="85" rx="55" ry="14" fill="none" stroke="rgba(0, 242, 254, 0.15)" strokeWidth="0.8" />
          <ellipse cx="170" cy="120" rx="55" ry="14" fill="none" stroke="rgba(0, 242, 254, 0.2)" strokeWidth="1" />
          
          {/* Vertical cylinder lines */}
          <line x1="115" y1="50" x2="115" y2="120" stroke="rgba(0, 242, 254, 0.1)" strokeWidth="0.8" />
          <line x1="225" y1="50" x2="225" y2="120" stroke="rgba(0, 242, 254, 0.1)" strokeWidth="0.8" />
          <line x1="170" y1="36" x2="170" y2="134" stroke="rgba(0, 242, 254, 0.12)" strokeWidth="0.8" />

          {/* Core Eye / Character Node */}
          <circle cx="170" cy="85" r="16" fill="none" stroke="#00f2fe" strokeWidth="1.2" className="drop-shadow-[0_0_8px_rgba(0,242,254,0.6)]" />
          <circle cx="170" cy="85" r="7" fill="none" stroke="#00f2fe" strokeWidth="1" />
          <circle cx="170" cy="85" r="2.5" fill="#00f2fe" />
          
          {/* Eye pupil horizontal line */}
          <line x1="150" y1="85" x2="190" y2="85" stroke="rgba(0, 242, 254, 0.35)" strokeWidth="1" />
          
          {/* Scanning lines */}
          <line x1="110" y1={45 + sweep} x2="230" y2={45 + sweep} stroke="rgba(0, 242, 254, 0.5)" strokeWidth="1.2" className="drop-shadow-[0_0_4px_#00f2fe]" />
        </g>

        {/* Labels */}
        <text x="20" y="30" fill="rgba(0, 242, 254, 0.5)" fontSize="7" fontFamily="monospace" letterSpacing="0.05em">
          // Holo projection
        </text>
        <text x="260" y="145" fill="rgba(0, 242, 254, 0.5)" fontSize="7" fontFamily="monospace">
          Interactive Eye
        </text>
      </svg>

      {/* Decorative metal corner brackets */}
      <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#00f2fe]/20" />
      <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#00f2fe]/20" />
      <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#00f2fe]/20" />
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#00f2fe]/20" />
    </div>
  );
}

