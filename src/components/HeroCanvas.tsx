import { useEffect, useRef } from 'react';

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
  color: string;
  size: number;
  speed: number;
  orbitRadius: number;
  angle: number;
  tiltX: number;
  tiltY: number;
  offsetX: number;
  offsetY: number;
}

interface NeuralColumn {
  x: number;
  y: number;
  speed: number;
  chars: string[];
  opacity: number;
}

export default function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

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

    // 1. Particle Nebula Initializations (3D Coordinates)
    let particles: Particle3D[] = [];
    const particleCount = 450;
    
    // 2. Neural Matrix Data Streams for Sidebar Sides
    let leftSideStreams: NeuralColumn[] = [];
    let rightSideStreams: NeuralColumn[] = [];
    const streamCount = 8; // Columns on each side

    // Dimensions setup
    const resize = () => {
      const parent = canvas.parentElement;
      w = canvas.width = parent ? parent.getBoundingClientRect().width : (canvas.offsetWidth || window.innerWidth);
      h = canvas.height = canvas.parentElement ? parent.getBoundingClientRect().height : (canvas.offsetHeight || 800);
    };

    const initStructures = () => {
      resize();

      // Spark cosmic nebula stars in 3D polar spheres (Reduced count by 25% for readability)
      particles = [];
      const particleCount = 330;
      for (let i = 0; i < particleCount; i++) {
        const angle = Math.random() * Math.PI * 2;
        // Keep particles predominantly in outer atmospheric halo to avoid obstructing central text
        const orbitRadius = Math.random() < 0.25 
          ? Math.random() * 110 + 20 // Light inner disk
          : Math.random() * 380 + 220; // Outer atmospheric halo & perimeter
          
        const tiltX = (Math.random() - 0.5) * 1.5;
        const tiltY = (Math.random() - 0.5) * 1.5;
        
        const isLargeParticle = Math.random() < 0.2;
        // Large particles move slower, small particles move subtly for deep 3D perspective
        const speed = isLargeParticle
          ? (Math.random() * 0.001 + 0.0004) * (Math.random() < 0.5 ? 1 : -1)
          : (Math.random() * 0.0022 + 0.0008) * (Math.random() < 0.5 ? 1 : -1);

        const particleSize = isLargeParticle
          ? Math.random() * 1.2 + 2.0 // Large particle
          : Math.random() * 0.8 + 0.6; // Micro particle

        // Pick distinct Jamgong corporate brand neon colors
        const roll = Math.random();
        let color = '#00f2fe'; // Jamgong Neon Cyan
        if (roll < 0.35) color = '#9a78ff'; // Neon Purple
        else if (roll < 0.65) color = '#10b7b5'; // Secondary Cyan
        else if (roll < 0.85) color = '#ffffff'; // Stardust highlight

        particles.push({
          x: 0,
          y: 0,
          z: 0,
          orbitRadius,
          angle,
          speed,
          tiltX,
          tiltY,
          size: particleSize,
          color,
          offsetX: 0,
          offsetY: 0
        });
      }

      // Initialize left and right sidebar matrix columns
      leftSideStreams = [];
      rightSideStreams = [];
      for (let i = 0; i < streamCount; i++) {
        // Distribute columns evenly within margins
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
        opacity: Math.random() * 0.020 + 0.025 // Clamped between 0.025 and 0.045
      };
    };

    // ────────────────────────────────────────────────────────
    // DRAWING 1: 3D Perspective Grid floor map
    // ────────────────────────────────────────────────────────
    const drawTechnicalPerspectiveFloor = (time: number) => {
      ctx.save();
      
      const horizonY = h * 0.52; // Vanishing horizon lines at upper-middle area
      const bottomY = h;
      const fadeHeight = bottomY - horizonY;
      
      // Subtle precessional sway of the grid center/vanishing point
      const swayX = Math.sin(time * 0.00045) * 35;
      const originX = w / 2 + swayX;

      // Draw Longitudinal rays projecting from horizon (Vanishing center) outwards
      const rayCount = 20;

      for (let i = 0; i <= rayCount; i++) {
        const ratio = i / rayCount;
        // Transform ratio nonlinearly to spread out bottom lanes
        const bottomX = (ratio - 0.5) * w * 2.8 + (w / 2);

        // Draw ray reflecting the sway of originX
        ctx.strokeStyle = 'rgba(0, 217, 245, 0.075)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(originX, horizonY);
        ctx.lineTo(bottomX, bottomY);
        ctx.stroke();
      }

      // Draw Transverse horizontal gridlines separating nonlinearly for deep Z-distance perspective
      const horizontalLineCount = 12;
      const gridYCoords: number[] = [];

      // Use time to offset the grid floor forward smoothly (modulo 1 wraps gracefully)
      const timeOffset = (time * 0.00004) % 1;

      for (let i = 0; i <= horizontalLineCount; i++) {
        // Combine progress indices with fractional scrolling time offset in [0, 1) range
        const progress = ((i / horizontalLineCount) + timeOffset) % 1;
        const mappedY = horizonY + fadeHeight * Math.pow(progress, 2.2);
        gridYCoords.push(mappedY);

        // Fade lines near horizon (0) and near bottom (1) for buttery smooth transition
        const lineAlpha = Math.sin(progress * Math.PI) * 0.11;
        ctx.strokeStyle = `rgba(0, 217, 245, ${lineAlpha})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(0, mappedY);
        ctx.lineTo(w, mappedY);
        ctx.stroke();
      }

      // ────────────────────────────────────────────────────────
      // Sci-fi Intersecting Node lights flickering
      // ────────────────────────────────────────────────────────
      for (let r = 1; r < rayCount; r++) {
        const rayRatio = r / rayCount;
        // Active horizontal grid depths
        for (let t = 2; t < gridYCoords.length; t++) {
          const depthY = gridYCoords[t];
          // Linear interpolation of X coordinate for current grid intersect
          const lineYRatio = (depthY - horizonY) / (fadeHeight || 1);
          const leftBoundX = (rayRatio - 0.5) * w * 2.8 + (w / 2);
          const intersectX = originX + (leftBoundX - originX) * lineYRatio;

          // Restrict to screen viewport constraints
          if (intersectX > 0 && intersectX < w) {
            // Highly optimized micro node coordinates with flickering lights
            const pulse = Math.random();
            const relativeProgress = (depthY - horizonY) / (fadeHeight || 1);
            const fadeAlpha = Math.sin(relativeProgress * Math.PI); // fade out at edges

            if (pulse > 0.88) {
              const nodeGlowAlpha = ((pulse - 0.88) / 0.12 * 0.7) * fadeAlpha;
              ctx.save();
              ctx.globalAlpha = Math.max(0, nodeGlowAlpha * 0.65);
              ctx.fillStyle = '#00f2fe';
              ctx.shadowColor = '#00f2fe';
              ctx.shadowBlur = 6;
              ctx.beginPath();
              ctx.arc(intersectX, depthY, 1.8, 0, Math.PI * 2);
              ctx.fill();
              ctx.restore();
            } else {
              ctx.globalAlpha = Math.max(0.01, 0.16 * fadeAlpha);
              ctx.fillStyle = 'rgba(0, 242, 254, 0.45)';
              ctx.beginPath();
              ctx.arc(intersectX, depthY, 0.85, 0, Math.PI * 2);
              ctx.fill();
            }
          }
        }
      }

      ctx.restore();
    };

    // ────────────────────────────────────────────────────────
    // DRAWING 2: 3D Holographic Orbit Nebula
    // ────────────────────────────────────────────────────────
    const drawCelestialNebula = (time: number) => {
      ctx.save();
      
      // Smooth dynamic drift/sway for the core central projection
      const driftX = Math.sin(time * 0.0003) * 22;
      const driftY = Math.cos(time * 0.0004) * 12;
      const centerX = w / 2 + driftX;
      const centerY = h * 0.46 + driftY;
      const focusLength = 280;

      // Update 3D orbital dynamics over slow running timer
      particles.forEach((p, index) => {
        p.angle += p.speed;

        // Base circular planetary coordinates relative to orbit and tilt
        const orbitX = Math.cos(p.angle) * p.orbitRadius;
        const orbitZ = Math.sin(p.angle) * p.orbitRadius;
        const orbitY = Math.sin(p.angle * 1.5) * (p.orbitRadius * 0.12);

        // Apply X and Y tilting rotations to form realistic planetary orbits
        // Precessional tumble around tilted X axis for subtle rotation drift
        const tiltX_dynamic = p.tiltX + Math.sin(time * 0.00012) * 0.15;
        const cosT1 = Math.cos(tiltX_dynamic);
        const sinT1 = Math.sin(tiltX_dynamic);
        const yRot1 = orbitY * cosT1 - orbitZ * sinT1;
        const zRot1 = orbitY * sinT1 + orbitZ * cosT1;

        // 3D rotation transforms around Y axis (Z is Depth) with subtle dynamic time dilation
        const tiltY_dynamic = p.tiltY + time * 0.00018 + Math.cos(time * 0.00008) * 0.1;
        const cosT2 = Math.cos(tiltY_dynamic);
        const sinT2 = Math.sin(tiltY_dynamic);
        const rot3D_X = orbitX * cosT2 - zRot1 * sinT2;
        const rot3D_Z = orbitX * sinT2 + zRot1 * cosT2;
        const rot3D_Y = yRot1;

        // Standard perspective division with strict coordinate near-plane bounds safety guard
        const zDepth = rot3D_Z + 150;
        const denominator = focusLength + zDepth;
        const safeDenominator = Math.max(15, denominator); // Prevent division by zero or negative coordinate inversion
        const scale = focusLength / safeDenominator;
        const screenX = centerX + rot3D_X * scale;
        const screenY = centerY + rot3D_Y * scale;

        // Apply mouse interaction layer (gently repel)
        p.offsetX *= 0.95; // very smooth, slow easing back to natural orbit
        p.offsetY *= 0.95;

        if (activeMouse && mouseX > 0 && mouseY > 0 && mouseX < w && mouseY < h) {
          const currentX = screenX + p.offsetX;
          const currentY = screenY + p.offsetY;
          const dx = currentX - mouseX;
          const dy = currentY - mouseY;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 180) {
            // Stronger push close to the mouse, vanishing towards 180px
            const force = (180 - dist) / 180;
            // Scale push based on particle scale (closer particles repel slightly more, enhancing 3D effect!)
            const repelStrength = force * 6.5 * scale;
            const angle = Math.atan2(dy, dx);
            p.offsetX += Math.cos(angle) * repelStrength;
            p.offsetY += Math.sin(angle) * repelStrength;
          }
        }

        const finalX = screenX + p.offsetX;
        const finalY = screenY + p.offsetY;

        // Draw particle if bounds match viewport
        if (finalX > 0 && finalX < w && finalY > 0 && finalY < h) {
          // Render stars according to depth transparency
          const depthMultiplier = (focusLength - rot3D_Z) / (focusLength * 1.5);
          const alphaFade = Math.max(0.08, Math.min(1, p.size * depthMultiplier * 0.8));

          // Draw small glow vector
          ctx.globalAlpha = alphaFade;
          ctx.beginPath();
          ctx.arc(finalX, finalY, p.size * scale * 1.3, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.fill();

          // Render micro faint orbital trails or neural links randomly
          if (index < particles.length - 1 && index % 14 === 0) {
            const nextPart = particles[index + 1];
            const nextX = Math.cos(nextPart.angle) * nextPart.orbitRadius;
            
            // Safe denominator check for the link's destination too
            const nextDenominator = focusLength + nextPart.orbitRadius * 0.15 + 150;
            const nextScale = focusLength / Math.max(15, nextDenominator);
            
            // Next screen positions can also include their own dynamic offset!
            const nextScreenX = centerX + nextX * nextScale + (nextPart.offsetX || 0);
            const nextScreenY = (centerY + Math.sin(nextPart.angle) * 20) + (nextPart.offsetY || 0);

            // Draw link thread
            ctx.strokeStyle = p.color;
            ctx.globalAlpha = 0.02 * opacityInterpolation(finalX, finalY, nextScreenX, nextScreenY);
            ctx.lineWidth = 0.55;
            ctx.beginPath();
            ctx.moveTo(finalX, finalY);
            ctx.lineTo(nextScreenX, nextScreenY);
            ctx.stroke();
          }
        }
      });

      ctx.restore();
    };

    // Helper to evaluate proximity for connection rendering
    const opacityInterpolation = (x1: number, y1: number, x2: number, y2: number) => {
      const dx = x2 - x1;
      const dy = y2 - y1;
      const dist = Math.sqrt(dx * dx + dy * dy);
      return Math.max(0.1, 1 - dist / 180);
    };

    // ────────────────────────────────────────────────────────
    // DRAWING 3: Highly polished Matrix Data Stream
    // ────────────────────────────────────────────────────────
    const drawNeuralDataStreams = (streams: NeuralColumn[], speedMultiplier: number) => {
      ctx.save();
      ctx.font = "bold 9.5px 'JetBrains Mono', monospace";

      streams.forEach((col) => {
        col.y += col.speed * speedMultiplier;
        let runningY = col.y;

        // Re-randomize string stream when leaving lower threshold
        if (col.y > h) {
          col.y = -220;
          col.speed = Math.random() * 1.2 + 0.8;
          col.opacity = Math.random() * 0.08 + 0.04;
        }

        col.chars.forEach((char, idx) => {
          // Fade earlier characters upwards in column
          const charOpacity = col.opacity * (idx / col.chars.length);
          ctx.globalAlpha = charOpacity;
          
          // Neon colors corresponding to Jamgong's branding elements
          if (idx % 3 === 0) ctx.fillStyle = '#00f2fe';
          else if (idx % 3 === 1) ctx.fillStyle = '#c084fc';
          else ctx.fillStyle = '#10b981';

          ctx.fillText(char, col.x, runningY);
          runningY += 15; // Vertical spacing for text nodes
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

    // Dynamic Master Loop
    let lastTime = 0;
    const loop = (timestamp: number) => {
      if (!lastTime) lastTime = timestamp;
      const delta = timestamp - lastTime;
      lastTime = timestamp;
      
      const speedMultiplier = delta <= 0 ? 1 : Math.min(3.5, delta / 16.67);
      
      ctx.clearRect(0, 0, w, h);
      
      // 1. Perspective science grid floor at absolute bottom
      drawTechnicalPerspectiveFloor(timestamp);

      // 2. Cosmic astronomy rotating particles in central field
      drawCelestialNebula(timestamp);

      // 3. AI Sidebar technical matrix data streams
      drawNeuralDataStreams(leftSideStreams, speedMultiplier);
      drawNeuralDataStreams(rightSideStreams, speedMultiplier);

      // 4. Fine screen mask for maximum high-contrast text readability
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

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    initStructures();
    animationFrameId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
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
