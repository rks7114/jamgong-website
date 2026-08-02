import React from 'react';

interface JamgongLogoProps {
  variant?: 'header' | 'footer' | 'hero' | 'icon-only';
  className?: string;
  onClick?: () => void;
  iconOnly?: boolean;
}

export const JamgongLogo: React.FC<JamgongLogoProps> = ({
  variant = 'header',
  className = '',
  onClick,
  iconOnly = false,
}) => {
  // Height ratios based on variant
  const getDimensions = () => {
    switch (variant) {
      case 'hero':
        return { width: 480, height: 120 };
      case 'footer':
        return { width: 220, height: 55 };
      case 'header':
      default:
        return { width: 350, height: 84 };
    }
  };

  const dims = getDimensions();

  // If icon-only is requested
  if (iconOnly || variant === 'icon-only') {
    return (
      <div 
        className={`inline-flex items-center justify-center cursor-pointer group select-none ${className}`}
        onClick={onClick}
      >
        <svg
          width={42}
          height={42}
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="transition-transform duration-300 group-hover:scale-105"
        >
          <defs>
            <linearGradient id="iconWhite3D" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="50%" stopColor="#E2E8F0" />
              <stop offset="100%" stopColor="#64748B" />
            </linearGradient>

            <linearGradient id="iconCyan3D" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00f2fe" />
              <stop offset="100%" stopColor="#0080ff" />
            </linearGradient>

            <filter id="iconGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Top White Parallel Traces & Stem */}
          <path d="M 24 24 L 46 8 L 46 48" stroke="url(#iconWhite3D)" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <path d="M 24 38 L 46 22" stroke="url(#iconWhite3D)" strokeWidth="4.5" strokeLinecap="round" fill="none" />
          <path d="M 24 52 L 46 36" stroke="url(#iconWhite3D)" strokeWidth="4.5" strokeLinecap="round" fill="none" />

          <circle cx="24" cy="24" r="4.5" fill="#FFFFFF" />
          <circle cx="24" cy="38" r="4.5" fill="#FFFFFF" />
          <circle cx="24" cy="52" r="4.5" fill="#FFFFFF" />
          <circle cx="46" cy="48" r="4.5" fill="#FFFFFF" />

          {/* Bottom Cyan Contour & Branch */}
          <path d="M 24 66 L 24 74 L 46 90 L 68 68 L 68 24" stroke="url(#iconCyan3D)" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none" filter="url(#iconGlow)" />
          <path d="M 24 66 L 38 52" stroke="url(#iconCyan3D)" strokeWidth="4.5" strokeLinecap="round" fill="none" filter="url(#iconGlow)" />

          <circle cx="24" cy="66" r="4.5" fill="#00f2fe" filter="url(#iconGlow)" />
          <circle cx="38" cy="52" r="4.5" fill="#00f2fe" filter="url(#iconGlow)" />
          <circle cx="68" cy="24" r="4" fill="#00f2fe" filter="url(#iconGlow)" />
        </svg>
      </div>
    );
  }

  return (
    <div 
      className={`inline-flex items-center cursor-pointer group select-none ${className}`}
      onClick={onClick}
    >
      <svg
        width={dims.width}
        height={dims.height}
        viewBox="0 0 520 130"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="transition-all duration-300 group-hover:scale-[1.02] filter drop-shadow-[0_0_8px_rgba(0,217,245,0.22)]"
      >
        <defs>
          {/* Metallic 3D Gradients */}
          <linearGradient id="brandWhite3D" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="45%" stopColor="#F1F5F9" />
            <stop offset="70%" stopColor="#CBD5E1" />
            <stop offset="100%" stopColor="#94A3B8" />
          </linearGradient>

          <linearGradient id="brandCyan3D" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#00ffff" />
            <stop offset="50%" stopColor="#00e5ff" />
            <stop offset="100%" stopColor="#0099ff" />
          </linearGradient>

          <linearGradient id="brandCyanText" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00ffff" />
            <stop offset="50%" stopColor="#00e5ff" />
            <stop offset="100%" stopColor="#00b0ff" />
          </linearGradient>

          {/* Glow & 3D Shadow Filters */}
          <filter id="cyanNeonGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="textShadow3D" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="3" stdDeviation="2" floodColor="#000000" floodOpacity="0.8" />
          </filter>
        </defs>

        {/* ── 1. EMBLEM GRAPHIC (100% Exact match to Image 1) ── */}
        <g id="emblem" transform="translate(10, 5)">
          {/* Top White Parallel Traces & Vertical Stem */}
          <path d="M 28 32 L 56 12 L 56 64" stroke="url(#brandWhite3D)" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <path d="M 28 50 L 56 30" stroke="url(#brandWhite3D)" strokeWidth="6" strokeLinecap="round" fill="none" />
          <path d="M 28 68 L 56 48" stroke="url(#brandWhite3D)" strokeWidth="6" strokeLinecap="round" fill="none" />

          {/* White End Node Circles */}
          <circle cx="28" cy="32" r="6" fill="#FFFFFF" />
          <circle cx="28" cy="50" r="6" fill="#FFFFFF" />
          <circle cx="28" cy="68" r="6" fill="#FFFFFF" />
          <circle cx="56" cy="64" r="6" fill="#FFFFFF" />

          {/* Bottom Cyan Shield Contour */}
          <path d="M 28 86 L 28 98 L 56 118 L 84 90 L 84 32" stroke="url(#brandCyan3D)" strokeWidth="7.5" strokeLinecap="round" strokeLinejoin="round" fill="none" filter="url(#cyanNeonGlow)" />
          {/* Branch Line */}
          <path d="M 28 86 L 46 68" stroke="url(#brandCyan3D)" strokeWidth="6" strokeLinecap="round" fill="none" filter="url(#cyanNeonGlow)" />

          {/* Cyan End Node Circles */}
          <circle cx="28" cy="86" r="6" fill="#00ffff" filter="url(#cyanNeonGlow)" />
          <circle cx="46" cy="68" r="6" fill="#00ffff" filter="url(#cyanNeonGlow)" />
          <circle cx="84" cy="32" r="5.5" fill="#00ffff" filter="url(#cyanNeonGlow)" />
        </g>

        {/* ── 2. BRAND LOGO TEXT "J ∧ M G O N G" ── */}
        <g id="brand-title" transform="translate(125, 16)">
          {/* 'J' */}
          <text
            x="0"
            y="58"
            fill="url(#brandWhite3D)"
            fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
            fontWeight="900"
            fontSize="64"
            letterSpacing="0"
            filter="url(#textShadow3D)"
          >
            J
          </text>

          {/* '∧' (Chevron A in Cyan) */}
          <g transform="translate(42, 8) scale(1.18)" filter="url(#cyanNeonGlow)">
            <path
              d="M 19 0 L 38 38 L 29 38 L 19 18 L 9 38 L 0 38 Z"
              fill="url(#brandCyan3D)"
            />
          </g>

          {/* 'MGONG' */}
          <text
            x="98"
            y="58"
            fill="url(#brandWhite3D)"
            fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
            fontWeight="900"
            fontSize="64"
            letterSpacing="3"
            filter="url(#textShadow3D)"
          >
            MGONG
          </text>

          {/* ── 3. SUBTITLE "AI DATA TECHNOLOGY" ── */}
          <text
            x="2"
            y="94"
            fill="url(#brandCyanText)"
            fontFamily="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace"
            fontWeight="900"
            fontSize="22"
            letterSpacing="8.5"
            filter="url(#cyanNeonGlow)"
          >
            AI DATA TECHNOLOGY
          </text>
        </g>
      </svg>
    </div>
  );
};
