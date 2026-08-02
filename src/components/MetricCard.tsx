import { useEffect, useState, useRef } from 'react';

interface MetricCardProps {
  label: string;
  target: number;
  decimals: number;
  suffix: string;
  unit: string;
  barWidth: number;
  subMeta?: string;
}

export default function MetricCard({ label, target, decimals, suffix, unit, barWidth, subMeta }: MetricCardProps) {
  const [val, setVal] = useState(0);
  const [barProgress, setBarProgress] = useState(0);
  const elementRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let animationStarted = false;
    let frameId = 0;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !animationStarted) {
          animationStarted = true;
          // Start counting up
          const duration = 2200; // ms
          const startTime = performance.now();

          const animate = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const ease = 1 - Math.pow(1 - progress, 3);
            
            setVal(target * ease);

            if (progress < 1) {
              frameId = requestAnimationFrame(animate);
            } else {
              setVal(target);
            }
          };

          frameId = requestAnimationFrame(animate);

          // Animate the bar slightly delayed
          const timer = setTimeout(() => {
            setBarProgress(barWidth);
          }, 200);

          return () => clearTimeout(timer);
        }
      },
      { threshold: 0.2 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      observer.disconnect();
      if (frameId) {
        cancelAnimationFrame(frameId);
      }
    };
  }, [target, barWidth]);

  return (
    <div
      ref={elementRef}
      className="relative bg-[#0d1326]/70 border border-[#00F0FF]/15 rounded-none p-7 overflow-hidden transition-all duration-300 hover:border-[#00F0FF]/40 hover:-translate-y-0.5 select-none group shadow-[0_4px_20px_rgba(0,0,0,0.3)] hover:shadow-[0_4px_30px_rgba(0,240,255,0.08)]"
    >
      {/* Decorative radial pattern using cyan accent */}
      <div className="absolute inset-0 bg-radial-[circle_at_top_left] from-[#00F0FF]/5 to-transparent pointer-events-none" />
      <div className="absolute top-0 left-0 w-[2px] h-0 bg-[#00F0FF] transition-all duration-500 group-hover:h-full" />
      <div className="absolute bottom-0 right-0 w-0 h-[2px] bg-[#00F0FF] transition-all duration-500 group-hover:w-full" />
      
      <div className="relative z-10">
        <div className="text-[10px] tracking-[0.2em] uppercase text-slate-400 font-mono mb-3">
          {label}
        </div>
        
        <div className="text-3xl sm:text-4xl font-display font-medium tracking-tight text-white mb-1.5 leading-none">
          {decimals > 0 ? val.toFixed(decimals) : Math.round(val).toLocaleString()}
          <span className="text-lg font-sans font-medium not-italic ml-1 text-[#00F0FF]">{suffix}</span>
        </div>
        
        <div className="text-[10px] uppercase tracking-wider text-[#00F0FF]/60 font-mono">
          {unit}
        </div>
        
        {subMeta && (
          <div className="mt-2 text-[11px] font-sans font-medium text-slate-200 tracking-wide select-text leading-relaxed">
            {subMeta}
          </div>
        )}
        
        <div className="mt-4 h-[2px] bg-slate-850 rounded-none overflow-hidden">
          <div
            className="h-full bg-linear-to-r from-[#00F0FF] to-blue-500 transition-all duration-1000 ease-out shadow-[0_0_10px_#00F0FF]"
            style={{ width: `${barProgress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
