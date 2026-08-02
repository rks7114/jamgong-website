import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Cpu, Server, Shield, Brain } from 'lucide-react';

interface DataInitializationLoaderProps {
  onComplete: () => void;
}

export default function DataInitializationLoader({ onComplete }: DataInitializationLoaderProps) {
  const [progress, setProgress] = useState(0);
  const [stageIndex, setStageIndex] = useState(0);
  const [hexCodes, setHexCodes] = useState('0x0000');

  const stages = [
    { label: 'INGESTING CLASSIC COGNITIVE BIG-DATA TOKENS', color: '#00f2fe' },
    { label: 'CALIBRATING MULTIPHASIC QUANT WAVEFORMS', color: '#c084fc' },
    { label: 'OPTIMIZING 256-DEPTH NEURAL NETWORK WEIGHTS', color: '#10b981' },
    { label: 'COMPUTING REAL-TIME TRANSIT ALGORITHMS', color: '#00f2fe' },
    { label: 'DECENTRALIZED CORE INITIALIZATION COMPLETE', color: '#10b981' },
  ];

  // Progress counter simulation
  useEffect(() => {
    let currentProgress = 0;
    const interval = setInterval(() => {
      // Fluid state leaps
      const increment = Math.floor(Math.random() * 6) + 3;
      currentProgress = Math.min(100, currentProgress + increment);
      setProgress(currentProgress);

      const stageCount = stages.length;
      const targetStage = Math.min(
        stageCount - 1,
        Math.floor((currentProgress / 100) * stageCount)
      );
      setStageIndex(targetStage);

      if (currentProgress >= 100) {
        clearInterval(interval);
        // Exquisite exit transition delay
        const timeout = setTimeout(() => {
          onComplete();
        }, 600);
        return () => clearTimeout(timeout);
      }
    }, 80);

    return () => clearInterval(interval);
  }, [onComplete]);

  // Updating hexadecimal noise
  useEffect(() => {
    const hexInterval = setInterval(() => {
      const value = Math.floor(Math.random() * 65535).toString(16).toUpperCase().padStart(4, '0');
      setHexCodes(`0x${value}`);
    }, 150);
    return () => clearInterval(hexInterval);
  }, []);

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#030712] overflow-hidden">
      {/* Background Matrix/Grid Aesthetic */}
      <div className="absolute inset-0 z-0 opacity-15 pointer-events-none">
        <div 
          className="w-full h-full" 
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(0, 242, 254, 0.1) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(0, 242, 254, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '30px 30px'
          }}
        />
      </div>

      {/* Elegant sweeping laser/scanner effect */}
      <div 
        className="absolute left-0 right-0 h-[2px] bg-cyan-450 opacity-40 shadow-[0_0_15px_#00f2fe]"
        style={{
          animation: 'scanner-sweep 3s ease-in-out infinite',
          background: 'linear-gradient(90deg, transparent 10%, #00f2fe 50%, transparent 90%)'
        }}
      />

      <style>{`
        @keyframes scanner-sweep {
          0% { top: 0%; opacity: 0.1; }
          40% { opacity: 0.6; }
          50% { top: 100%; opacity: 0.1; }
          90% { opacity: 0.6; }
          100% { top: 0%; opacity: 0.1; }
        }
      `}</style>

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-md px-6 flex flex-col items-center text-center">
        {/* Brand Label */}
        <h2 className="font-display text-2xl font-black text-white tracking-[0.25em] uppercase mb-1">
          JAMGONG
        </h2>

        <p className="font-mono text-[9px] text-[#00f2fe]/70 tracking-widest mb-8 uppercase font-bold">
          DECISION MATRIX INITIALIZATION ENGINE
        </p>

        {/* Percentage Marker */}
        <div className="font-mono text-3xl font-bold text-white mb-3">
          {progress}<span className="text-[#00f2fe]/80 text-xl font-medium">%</span>
        </div>

        {/* High-tech Progress bar container */}
        <div className="w-full h-[6px] bg-slate-900/80 rounded-full border border-[#00f2fe]/15 overflow-hidden mb-5 p-[1px] relative shadow-[inset_0_1px_3px_rgba(0,0,0,0.8)]">
          <motion.div 
            className="h-full rounded-full" 
            style={{ 
              width: `${progress}%`,
              background: `linear-gradient(90deg, #00f2fe 0%, ${stages[stageIndex]?.color || '#00f2fe'} 100%)`,
              boxShadow: '0 0 8px rgba(0, 242, 254, 0.6)'
            }}
            layoutId="loading-progress-bar"
          />
        </div>

        {/* Output scan logs */}
        <div className="w-full flex justify-between items-center font-mono text-[9px] text-slate-400 mb-1 px-1">
          <span className="uppercase text-slate-500 flex items-center gap-1.5">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse" />
            CORE ACTIVE
          </span>
          <span className="text-[#00f2fe]/80">{hexCodes} : SYNC_READY</span>
        </div>

        <div className="w-full p-3 rounded bg-slate-950/80 border border-slate-900 font-mono text-[10px] min-h-[44px] flex items-center justify-center tracking-wide leading-relaxed shadow-lg">
          <AnimatePresence mode="wait">
            <motion.p
              key={stageIndex}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.15 }}
              style={{ color: stages[stageIndex]?.color || '#00f2fe' }}
              className="font-semibold"
            >
              &gt;&gt; {stages[stageIndex]?.label}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
