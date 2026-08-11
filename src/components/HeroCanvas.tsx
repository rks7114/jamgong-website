import { useEffect, useRef } from 'react';

export type HeroHoverMode = 'default' | 'teal' | 'green' | 'purple';

interface HeroCanvasProps {
  activeMode?: HeroHoverMode;
}

// Sci-fi control symbols and Jamgong technical snippets
const FLOATING_DATABITS = [
  '010110', 'CORE AI-01', 'QUANT-01', 'QUANT-02', 'SYSTEM-01', 'SYSTEM-02',
  '96.8 Hz', '88.4 Hz', '75.9 Hz', '72.4 Hz', 'ACTIVE_IP', 'IP-10-2026',
  'f(x)=Σαᵢφᵢ', '∂V/∂t+½σ²', 'H_t=σ(W)', 'P(A|B)', '1011101', 'HZ_FREQ_60'
];

interface Particle3D {
  x: number;
  y: number;
  z: number;
  size: number;
  speed: number;
  orbitRadius: number;
  angle: number;
  tiltX: number;
  tiltY: number;
  offsetX: number;
  offsetY: number;
  vx: number;
  vy: number;
  zFactor: number;
  // RGB state for smooth 60fps hue transitions
  baseR: number;
  baseG: number;
  baseB: number;
  currentR: number;
  currentG: number;
  currentB: number;
  roll: number;
}

interface ProjectedParticle {
  x: number;
  y: number;
  size: number;
  color: string;
  glowColor: string;
  alpha: number;
  zDepth: number;
  scale: number;
  currentR: number;
  currentG: number;
  currentB: number;
}

interface NeuralColumn {
  x: number;
  y: number;
  speed: number;
  chars: string[];
  opacity: number;
}

export default function HeroCanvas({ activeMode = 'default' }: HeroCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const activeModeRef = useRef<HeroHoverMode>(activeMode);

  useEffect(() => {
    activeModeRef.current = activeMode;
  }, [activeMode]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let animationFrameId = 0;
    let mouseX = -1000;
    let mouseY = -1000;
    let activeMouse = false;
    let scrollY = window.scrollY || 0;

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let isReducedMotion = motionQuery.matches;

    let particles: Particle3D[] = [];
    let leftSideStreams: NeuralColumn[] = [];
    let rightSideStreams: NeuralColumn[] = [];
    const streamCount = 8;

    const resize = () => {
      const parent = canvas.parentElement;
      w = canvas.width = parent ? parent.getBoundingClientRect().width : (canvas.offsetWidth || window.innerWidth);
      h = canvas.height = canvas.parentElement ? parent.getBoundingClientRect().height : (canvas.offsetHeight || 800);
    };

    const initStructures = () => {
      resize();

      particles = [];
      const particleCount = 260;
      for (let i = 0; i < particleCount; i++) {
        const angle = Math.random() * Math.PI * 2;
        const orbitRadius = Math.random() < 0.2 
          ? Math.random() * 120 + 30 
          : Math.random() * 400 + 200;
          
        const tiltX = (Math.random() - 0.5) * 1.4;
        const tiltY = (Math.random() - 0.5) * 1.4;
        
        const isLargeParticle = Math.random() < 0.25;
        const speed = isLargeParticle
          ? (Math.random() * 0.0009 + 0.0003) * (Math.random() < 0.5 ? 1 : -1)
          : (Math.random() * 0.002 + 0.0006) * (Math.random() < 0.5 ? 1 : -1);

        const particleSize = isLargeParticle
          ? Math.random() * 1.4 + 2.2
          : Math.random() * 0.9 + 0.8;

        const roll = Math.random();
        let baseR = 34, baseG = 211, baseB = 238; // Cyan default

        if (roll < 0.45) {
          baseR = 139; baseG = 92; baseB = 246; // Purple
        } else if (roll < 0.75) {
          baseR = 0; baseG = 242; baseB = 254; // High Cyan
        } else if (roll < 0.90) {
          baseR = 154; baseG = 120; baseB = 255; // Neon Purple
        } else {
          baseR = 255; baseG = 255; baseB = 255; // White highlight
        }

        const zVal = (Math.random() - 0.5) * 200;
        const zFactor = 0.08 + ((zVal + 100) / 200) * 0.18;

        particles.push({
          x: 0,
          y: 0,
          z: zVal,
          orbitRadius,
          angle,
          speed,
          tiltX,
          tiltY,
          size: particleSize,
          baseR,
          baseG,
          baseB,
          currentR: baseR,
          currentG: baseG,
          currentB: baseB,
          roll,
          offsetX: 0,
          offsetY: 0,
          vx: 0,
          vy: 0,
          zFactor,
        });
      }

      leftSideStreams = [];
      rightSideStreams = [];
      for (let i = 0; i < streamCount; i++) {
        const leftX = (i * (w * 0.20)) / streamCount + 20;
        const rightX = w - ((i * (w * 0.20)) / streamCount + 40);
        leftSideStreams.push(createStreamCol(leftX, h));
        rightSideStreams.push(createStreamCol(rightX, h));
      }
    };

    const createStreamCol = (posX: number, boundH: number): NeuralColumn => {
      const charCount = Math.floor(Math.random() * 12) + 6;
      const chars: string[] = [];
      for (let k = 0; k < charCount; k++) {
        chars.push(FLOATING_DATABITS[Math.floor(Math.random() * FLOATING_DATABITS.length)]);
      }
      return {
        x: posX,
        y: Math.random() * -boundH,
        speed: Math.random() * 1.2 + 0.8,
        chars,
        opacity: Math.random() * 0.020 + 0.025
      };
    };

    // ────────────────────────────────────────────────────────
    // DRAWING 1: 3D Perspective Grid floor
    // ────────────────────────────────────────────────────────
    const drawTechnicalPerspectiveFloor = (time: number) => {
      ctx.save();
      const horizonY = h * 0.52;
      const bottomY = h;
      const fadeHeight = bottomY - horizonY;
      const swayX = Math.sin(time * 0.00045) * 35;
      const originX = w / 2 + swayX;
      const rayCount = 20;

      for (let i = 0; i <= rayCount; i++) {
        const ratio = i / rayCount;
        const bottomX = (ratio - 0.5) * w * 2.8 + (w / 2);
        ctx.strokeStyle = 'rgba(0, 217, 245, 0.075)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(originX, horizonY);
        ctx.lineTo(bottomX, bottomY);
        ctx.stroke();
      }

      const horizontalLineCount = 12;
      const timeOffset = (time * 0.00004) % 1;

      for (let i = 0; i <= horizontalLineCount; i++) {
        const progress = ((i / horizontalLineCount) + timeOffset) % 1;
        const mappedY = horizonY + fadeHeight * Math.pow(progress, 2.2);
        const lineAlpha = Math.sin(progress * Math.PI) * 0.11;
        ctx.strokeStyle = `rgba(0, 217, 245, ${lineAlpha})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(0, mappedY);
        ctx.lineTo(w, mappedY);
        ctx.stroke();
      }

      ctx.restore();
    };

    // ────────────────────────────────────────────────────────
    // DRAWING 2: Central Celestial Orbital Rings (Jamgong Oracle Astronomy Tracks)
    // ────────────────────────────────────────────────────────
    const drawCelestialOrbitalRings = (time: number, centerX: number, centerY: number) => {
      ctx.save();
      const mode = activeModeRef.current;
      
      let ringRGB = '0, 217, 245'; // default cyan
      if (mode === 'teal') ringRGB = '0, 242, 254';
      else if (mode === 'green') ringRGB = '16, 185, 129';
      else if (mode === 'purple') ringRGB = '139, 92, 246';

      const scaleFactor = Math.min(1.2, Math.max(0.6, w / 1100));

      const rings = [
        { rx: 240 * scaleFactor, ry: 65 * scaleFactor, tilt: -0.25 + Math.sin(time * 0.0001) * 0.03, speed: 0.0005, dash: [6, 12], alpha: 0.22 },
        { rx: 370 * scaleFactor, ry: 100 * scaleFactor, tilt: 0.38 + Math.cos(time * 0.00012) * 0.04, speed: -0.00035, dash: [8, 16], alpha: 0.18 },
        { rx: 520 * scaleFactor, ry: 145 * scaleFactor, tilt: -0.12 + Math.sin(time * 0.00008) * 0.02, speed: 0.00025, dash: [4, 20], alpha: 0.14 },
      ];

      rings.forEach((ring, index) => {
        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(ring.tilt);

        // Orbital Ring Path
        ctx.beginPath();
        ctx.ellipse(0, 0, ring.rx, ring.ry, 0, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${ringRGB}, ${ring.alpha})`;
        ctx.lineWidth = 1;
        ctx.setLineDash(ring.dash);
        ctx.stroke();

        // Celestial Tracking Node riding along orbit
        const nodeAngle = time * ring.speed + index * 2.1;
        const nx = ring.rx * Math.cos(nodeAngle);
        const ny = ring.ry * Math.sin(nodeAngle);

        // Orbital node halo
        ctx.setLineDash([]);
        ctx.fillStyle = `rgba(${ringRGB}, ${ring.alpha * 2.5})`;
        ctx.beginPath();
        ctx.arc(nx, ny, 3.5, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = `rgba(255, 255, 255, 0.95)`;
        ctx.beginPath();
        ctx.arc(nx, ny, 1.5, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      });

      // Central Astronomical Observatory Crosshair Target Ticks
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.strokeStyle = `rgba(${ringRGB}, 0.22)`;
      ctx.lineWidth = 1;
      const tickLen = 8;
      const innerGap = 18;

      ctx.beginPath();
      ctx.moveTo(innerGap, 0); ctx.lineTo(innerGap + tickLen, 0);
      ctx.moveTo(-innerGap, 0); ctx.lineTo(-innerGap - tickLen, 0);
      ctx.moveTo(0, innerGap); ctx.lineTo(0, innerGap + tickLen);
      ctx.moveTo(0, -innerGap); ctx.lineTo(0, -innerGap - tickLen);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(0, 0, 5, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(${ringRGB}, 0.15)`;
      ctx.stroke();

      ctx.restore();
      ctx.restore();
    };

    // ────────────────────────────────────────────────────────
    // DRAWING 3: Plexus Network ("INYEON / CORRELATION ANALYTICS")
    // ────────────────────────────────────────────────────────
    const drawPlexusNebula = (time: number) => {
      ctx.save();
      
      const mode = activeModeRef.current;
      const driftX = Math.sin(time * 0.0003) * 22;
      const driftY = Math.cos(time * 0.0004) * 12;
      const centerX = w / 2 + driftX;
      const centerY = h * 0.46 + driftY;
      const focusLength = 280;

      // First draw celestial orbital rings in center background
      drawCelestialOrbitalRings(time, centerX, centerY);

      const projected: ProjectedParticle[] = [];

      // 1. Calculate projected positions, physics & hue shift lerp
      particles.forEach((p) => {
        p.angle += p.speed;

        let targetR = p.baseR;
        let targetG = p.baseG;
        let targetB = p.baseB;

        if (mode === 'teal') {
          if (p.roll < 0.5) { targetR = 0; targetG = 242; targetB = 254; }
          else { targetR = 6; targetG = 182; targetB = 212; }
        } else if (mode === 'green') {
          if (p.roll < 0.5) { targetR = 16; targetG = 185; targetB = 129; }
          else { targetR = 52; targetG = 211; targetB = 153; }
        } else if (mode === 'purple') {
          if (p.roll < 0.5) { targetR = 139; targetG = 92; targetB = 246; }
          else { targetR = 192; targetG = 132; targetB = 252; }
        }

        p.currentR += (targetR - p.currentR) * 0.08;
        p.currentG += (targetG - p.currentG) * 0.08;
        p.currentB += (targetB - p.currentB) * 0.08;

        const curR = Math.round(p.currentR);
        const curG = Math.round(p.currentG);
        const curB = Math.round(p.currentB);

        const colorStr = `rgb(${curR}, ${curG}, ${curB})`;
        const glowStr = `rgba(${curR}, ${curG}, ${curB}, 0.6)`;

        const orbitX = Math.cos(p.angle) * p.orbitRadius;
        const orbitZ = Math.sin(p.angle) * p.orbitRadius;
        const orbitY = Math.sin(p.angle * 1.5) * (p.orbitRadius * 0.12);

        const tiltX_dynamic = p.tiltX + Math.sin(time * 0.00012) * 0.15;
        const cosT1 = Math.cos(tiltX_dynamic);
        const sinT1 = Math.sin(tiltX_dynamic);
        const yRot1 = orbitY * cosT1 - orbitZ * sinT1;
        const zRot1 = orbitY * sinT1 + orbitZ * cosT1;

        const tiltY_dynamic = p.tiltY + time * 0.00018 + Math.cos(time * 0.00008) * 0.1;
        const cosT2 = Math.cos(tiltY_dynamic);
        const sinT2 = Math.sin(tiltY_dynamic);
        const rot3D_X = orbitX * cosT2 - zRot1 * sinT2;
        const rot3D_Z = orbitX * sinT2 + zRot1 * cosT2;
        const rot3D_Y = yRot1;

        const zDepth = rot3D_Z + p.z + 150;
        const denominator = focusLength + zDepth;
        const safeDenominator = Math.max(15, denominator);
        const scale = focusLength / safeDenominator;
        
        const rawScreenX = centerX + rot3D_X * scale;
        const rawScreenY = centerY + rot3D_Y * scale;

        // Repulsion physics calculation from mouse
        if (activeMouse && mouseX > 0 && mouseY > 0 && mouseX < w && mouseY < h) {
          const currentX = rawScreenX + p.offsetX;
          const currentY = rawScreenY + p.offsetY;
          const dx = currentX - mouseX;
          const dy = currentY - mouseY;
          const dist = Math.sqrt(dx * dx + dy * dy);

          const maxRepelDist = 170;
          if (dist < maxRepelDist && dist > 0.1) {
            const force = Math.pow((maxRepelDist - dist) / maxRepelDist, 1.6) * 7.0 * scale;
            const angle = Math.atan2(dy, dx);
            p.vx += Math.cos(angle) * force * 0.35;
            p.vy += Math.sin(angle) * force * 0.35;
          }
        }

        p.offsetX += p.vx;
        p.offsetY += p.vy;
        p.vx *= 0.86;
        p.vy *= 0.86;
        p.offsetX *= 0.93;
        p.offsetY *= 0.93;

        const scrollParallaxY = scrollY * p.zFactor;

        const finalX = rawScreenX + p.offsetX;
        const finalY = rawScreenY + p.offsetY - scrollParallaxY;

        const depthMultiplier = (focusLength - rot3D_Z) / (focusLength * 1.5);
        const alphaFade = Math.max(0.08, Math.min(1, p.size * depthMultiplier * 0.8));

        projected.push({
          x: finalX,
          y: finalY,
          size: p.size * scale,
          color: colorStr,
          glowColor: glowStr,
          alpha: alphaFade,
          zDepth,
          scale,
          currentR: curR,
          currentG: curG,
          currentB: curB,
        });
      });

      // 2. Draw Plexus Network Links ("Inyeon / Correlation Analytics")
      const maxConnectDist = Math.min(145, w * 0.14);
      const projLen = projected.length;

      for (let i = 0; i < projLen; i++) {
        const p1 = projected[i];
        if (p1.x < -50 || p1.x > w + 50 || p1.y < -50 || p1.y > h + 50) continue;

        for (let j = i + 1; j < projLen; j++) {
          const p2 = projected[j];
          if (p2.x < -50 || p2.x > w + 50 || p2.y < -50 || p2.y > h + 50) continue;

          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxConnectDist) {
            const lineAlpha = (1 - dist / maxConnectDist) * 0.28 * Math.min(p1.alpha, p2.alpha);
            if (lineAlpha < 0.01) continue;

            const strokeGrad = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
            strokeGrad.addColorStop(0, p1.color);
            strokeGrad.addColorStop(1, p2.color);

            ctx.globalAlpha = lineAlpha;
            ctx.strokeStyle = strokeGrad;
            ctx.lineWidth = 0.75 * Math.min(1.5, (p1.scale + p2.scale) * 0.5);
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();

            // Animated correlation packet pulse traveling along network links
            if ((i + j) % 11 === 0) {
              const pulsePos = ((time * 0.0012) + (i * 0.3)) % 1;
              const px = p1.x + (p2.x - p1.x) * pulsePos;
              const py = p1.y + (p2.y - p1.y) * pulsePos;
              ctx.globalAlpha = lineAlpha * 2.8;
              ctx.fillStyle = `rgb(${p1.currentR}, ${p1.currentG}, ${p1.currentB})`;
              ctx.beginPath();
              ctx.arc(px, py, 1.3, 0, Math.PI * 2);
              ctx.fill();
            }
          }
        }
      }

      // 3. Draw Particle Nodes
      for (let i = 0; i < projLen; i++) {
        const p = projected[i];
        if (p.x < -20 || p.x > w + 20 || p.y < -20 || p.y > h + 20) continue;

        ctx.globalAlpha = p.alpha;
        
        ctx.fillStyle = p.glowColor;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 1.6, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    };

    // Matrix Data Streams
    const drawNeuralDataStreams = (streams: NeuralColumn[], speedMultiplier: number) => {
      ctx.save();
      ctx.font = "bold 9.5px 'JetBrains Mono', monospace";

      const mode = activeModeRef.current;

      streams.forEach((col) => {
        col.y += col.speed * speedMultiplier;
        let runningY = col.y;

        if (col.y > h) {
          col.y = -220;
          col.speed = Math.random() * 1.2 + 0.8;
          col.opacity = Math.random() * 0.08 + 0.04;
        }

        col.chars.forEach((char, idx) => {
          const charOpacity = col.opacity * (idx / col.chars.length);
          ctx.globalAlpha = charOpacity;
          
          if (mode === 'teal') {
            ctx.fillStyle = idx % 2 === 0 ? '#00f2fe' : '#06b6d4';
          } else if (mode === 'green') {
            ctx.fillStyle = idx % 2 === 0 ? '#10b981' : '#34d399';
          } else if (mode === 'purple') {
            ctx.fillStyle = idx % 2 === 0 ? '#8b5cf6' : '#c084fc';
          } else {
            if (idx % 3 === 0) ctx.fillStyle = '#22d3ee';
            else if (idx % 3 === 1) ctx.fillStyle = '#8b5cf6';
            else ctx.fillStyle = '#10b981';
          }

          ctx.fillText(char, col.x, runningY);
          runningY += 15;
        });
      });

      ctx.restore();
    };

    const drawVignetteMask = () => {
      const g = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, Math.max(w, h) * 0.72);
      g.addColorStop(0, 'rgba(3, 7, 18, 0)');
      g.addColorStop(0.5, 'rgba(3, 7, 18, 0.45)');
      g.addColorStop(1, 'rgba(3, 7, 18, 0.96)');
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);
    };

    const renderFrame = (timestamp: number) => {
      ctx.clearRect(0, 0, w, h);
      drawTechnicalPerspectiveFloor(timestamp);
      drawPlexusNebula(timestamp);
      drawNeuralDataStreams(leftSideStreams, 1);
      drawNeuralDataStreams(rightSideStreams, 1);
      drawVignetteMask();
    };

    let lastTime = 0;
    const loop = (timestamp: number) => {
      if (isReducedMotion) {
        renderFrame(0);
        return;
      }

      if (!lastTime) lastTime = timestamp;
      const delta = timestamp - lastTime;
      lastTime = timestamp;
      
      const speedMultiplier = delta <= 0 ? 1 : Math.min(3.5, delta / 16.67);
      
      ctx.clearRect(0, 0, w, h);
      
      drawTechnicalPerspectiveFloor(timestamp);
      drawPlexusNebula(timestamp);
      drawNeuralDataStreams(leftSideStreams, speedMultiplier);
      drawNeuralDataStreams(rightSideStreams, speedMultiplier);
      drawVignetteMask();

      animationFrameId = requestAnimationFrame(loop);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
      activeMouse = true;
    };

    const handleMouseLeave = () => {
      mouseX = -1000;
      mouseY = -1000;
      activeMouse = false;
    };

    const handleScroll = () => {
      scrollY = window.scrollY || 0;
    };

    const handleMotionChange = (e: MediaQueryListEvent) => {
      isReducedMotion = e.matches;
      if (isReducedMotion) {
        cancelAnimationFrame(animationFrameId);
        renderFrame(0);
      } else {
        animationFrameId = requestAnimationFrame(loop);
      }
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    if (motionQuery.addEventListener) {
      motionQuery.addEventListener('change', handleMotionChange);
    }

    initStructures();

    if (isReducedMotion) {
      renderFrame(0);
    } else {
      animationFrameId = requestAnimationFrame(loop);
    }

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('scroll', handleScroll);
      if (motionQuery.removeEventListener) {
        motionQuery.removeEventListener('change', handleMotionChange);
      }
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      id="hero-canvas"
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none select-none z-0 animate-gpu-layer"
      style={{
        willChange: 'transform, opacity',
        transform: 'translate3d(0, 0, 0)',
        backfaceVisibility: 'hidden',
        WebkitBackfaceVisibility: 'hidden',
        perspective: 1000,
      }}
    />
  );
}
