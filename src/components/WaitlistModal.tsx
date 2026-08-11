import React, { useState, useEffect, useRef } from 'react';
import { X, CheckCircle2, Sparkles, Send, Shield, Zap, Lock, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface WaitlistModalProps {
  isOpen: boolean;
  serviceId: 'inyeon' | 'talk' | 'oracle' | string;
  onClose: () => void;
  lang?: 'ko' | 'en' | 'jp';
}

// ─────────────────────────────────────────────────────────────
// Canvas Component: Inyeon Connection Particle Teaser
// Renders two distinct particle clusters connecting via glowing energy threads & packets
// ─────────────────────────────────────────────────────────────
function InyeonConnectionCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth || 500);
    let height = (canvas.height = canvas.offsetHeight || 220);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth || 500;
      height = canvas.height = canvas.offsetHeight || 220;
    };
    window.addEventListener('resize', handleResize);

    // Cluster A (Left Cyan) center and Cluster B (Right Magenta) center
    const clusterA = { x: width * 0.28, y: height * 0.5 };
    const clusterB = { x: width * 0.72, y: height * 0.5 };

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      alpha: number;
      cluster: 'A' | 'B';
    }

    const particles: Particle[] = [];
    const particleCountPerCluster = 22;

    // Initialize particles
    for (let i = 0; i < particleCountPerCluster; i++) {
      particles.push({
        x: clusterA.x + (Math.random() - 0.5) * 70,
        y: clusterA.y + (Math.random() - 0.5) * 70,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        size: Math.random() * 2.5 + 1.2,
        alpha: Math.random() * 0.7 + 0.3,
        cluster: 'A',
      });
      particles.push({
        x: clusterB.x + (Math.random() - 0.5) * 70,
        y: clusterB.y + (Math.random() - 0.5) * 70,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        size: Math.random() * 2.5 + 1.2,
        alpha: Math.random() * 0.7 + 0.3,
        cluster: 'B',
      });
    }

    // Energy packet traveling along bezier connecting line
    let packetProgress1 = 0;
    let packetProgress2 = 0.5;

    const render = (time: number) => {
      ctx.clearRect(0, 0, width, height);

      // 1. Draw subtle background grid
      ctx.strokeStyle = 'rgba(0, 242, 254, 0.05)';
      ctx.lineWidth = 1;
      const gridSize = 25;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Update Cluster centers slight float
      const cA_x = clusterA.x + Math.sin(time * 0.0015) * 8;
      const cA_y = clusterA.y + Math.cos(time * 0.0012) * 8;
      const cB_x = clusterB.x + Math.sin(time * 0.0018 + 1) * 8;
      const cB_y = clusterB.y + Math.cos(time * 0.0014 + 1) * 8;

      // 2. Draw Connection Beams & Energy Threads (Inyeon Connection)
      // Main central energetic beam
      const cpY1 = height * 0.25 + Math.sin(time * 0.002) * 20;
      const cpY2 = height * 0.75 - Math.sin(time * 0.002) * 20;

      // Outer glow beam 1
      ctx.beginPath();
      ctx.moveTo(cA_x, cA_y);
      ctx.bezierCurveTo(width * 0.45, cpY1, width * 0.55, cpY1, cB_x, cB_y);
      ctx.strokeStyle = 'rgba(0, 242, 254, 0.35)';
      ctx.lineWidth = 3;
      ctx.shadowColor = '#00f2fe';
      ctx.shadowBlur = 12;
      ctx.stroke();

      // Outer glow beam 2
      ctx.beginPath();
      ctx.moveTo(cA_x, cA_y);
      ctx.bezierCurveTo(width * 0.45, cpY2, width * 0.55, cpY2, cB_x, cB_y);
      ctx.strokeStyle = 'rgba(192, 132, 252, 0.35)';
      ctx.lineWidth = 3;
      ctx.shadowColor = '#c084fc';
      ctx.shadowBlur = 12;
      ctx.stroke();

      // Core bright center line
      ctx.beginPath();
      ctx.moveTo(cA_x, cA_y);
      ctx.lineTo(cB_x, cB_y);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
      ctx.lineWidth = 1;
      ctx.shadowBlur = 8;
      ctx.stroke();

      // reset shadow
      ctx.shadowBlur = 0;

      // 3. Draw Energy Packets traveling between Cluster A & B
      packetProgress1 = (packetProgress1 + 0.008) % 1;
      packetProgress2 = (packetProgress2 + 0.008) % 1;

      const getBezierPt = (p: number, yOffset: number) => {
        const t = p;
        const u = 1 - t;
        const tt = t * t;
        const uu = u * u;
        const uuu = uu * u;
        const ttt = tt * t;

        const p0 = { x: cA_x, y: cA_y };
        const p1 = { x: width * 0.45, y: yOffset };
        const p2 = { x: width * 0.55, y: yOffset };
        const p3 = { x: cB_x, y: cB_y };

        const x = uuu * p0.x + 3 * uu * t * p1.x + 3 * u * tt * p2.x + ttt * p3.x;
        const y = uuu * p0.y + 3 * uu * t * p1.y + 3 * u * tt * p2.y + ttt * p3.y;
        return { x, y };
      };

      const pkt1 = getBezierPt(packetProgress1, cpY1);
      const pkt2 = getBezierPt(packetProgress2, cpY2);

      // Packet 1 (Cyan)
      ctx.beginPath();
      ctx.arc(pkt1.x, pkt1.y, 4.5, 0, Math.PI * 2);
      ctx.fillStyle = '#00f2fe';
      ctx.shadowColor = '#00f2fe';
      ctx.shadowBlur = 15;
      ctx.fill();

      // Packet 2 (Magenta)
      ctx.beginPath();
      ctx.arc(pkt2.x, pkt2.y, 4.5, 0, Math.PI * 2);
      ctx.fillStyle = '#c084fc';
      ctx.shadowColor = '#c084fc';
      ctx.shadowBlur = 15;
      ctx.fill();

      ctx.shadowBlur = 0;

      // 4. Update & Draw Particles in Cluster A & B
      particles.forEach((p) => {
        const center = p.cluster === 'A' ? { x: cA_x, y: cA_y } : { x: cB_x, y: cB_y };

        p.x += p.vx;
        p.y += p.vy;

        // Pull towards cluster center
        const dx = center.x - p.x;
        const dy = center.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist > 45) {
          p.vx += (dx / dist) * 0.05;
          p.vy += (dy / dist) * 0.05;
        }

        // Damping
        p.vx *= 0.98;
        p.vy *= 0.98;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        const color = p.cluster === 'A' ? '0, 242, 254' : '192, 132, 252';
        ctx.fillStyle = `rgba(${color}, ${p.alpha})`;
        ctx.shadowColor = `rgb(${color})`;
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // 5. Draw Cluster Node Core Rings
      // Cluster A Core
      ctx.beginPath();
      ctx.arc(cA_x, cA_y, 18, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(0, 242, 254, 0.6)';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(cA_x, cA_y, 6, 0, Math.PI * 2);
      ctx.fillStyle = '#00f2fe';
      ctx.shadowColor = '#00f2fe';
      ctx.shadowBlur = 12;
      ctx.fill();
      ctx.shadowBlur = 0;

      // Cluster B Core
      ctx.beginPath();
      ctx.arc(cB_x, cB_y, 18, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(192, 132, 252, 0.6)';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(cB_x, cB_y, 6, 0, Math.PI * 2);
      ctx.fillStyle = '#c084fc';
      ctx.shadowColor = '#c084fc';
      ctx.shadowBlur = 12;
      ctx.fill();
      ctx.shadowBlur = 0;

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="relative w-full h-[180px] sm:h-[200px] bg-[#02050e] border border-[#00f2fe]/20 rounded-none overflow-hidden my-2 shadow-[inset_0_0_20px_rgba(0,0,0,0.8)]">
      <canvas ref={canvasRef} className="w-full h-full block" />

      {/* Floating HUD Labels over canvas */}
      <div className="absolute top-2.5 left-3 flex items-center gap-1.5 text-[9px] font-mono font-bold text-[#00f2fe] bg-[#030712]/80 border border-[#00f2fe]/30 px-2 py-0.5 select-none">
        <span className="w-1.5 h-1.5 rounded-full bg-[#00f2fe] animate-ping" />
        NODE A: ENTITY SAJU VECTOR
      </div>

      <div className="absolute top-2.5 right-3 flex items-center gap-1.5 text-[9px] font-mono font-bold text-[#c084fc] bg-[#030712]/80 border border-[#c084fc]/30 px-2 py-0.5 select-none">
        <span className="w-1.5 h-1.5 rounded-full bg-[#c084fc] animate-ping" />
        NODE B: PARTNER MATRIX VECTOR
      </div>

      <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 flex items-center gap-2 text-[10px] font-mono font-black text-white bg-[#030712]/90 border border-[#00f2fe]/40 px-3 py-1 shadow-[0_0_12px_rgba(0,242,254,0.3)] select-none">
        <Zap className="w-3 h-3 text-[#00f2fe] animate-bounce" />
        <span className="text-[#00f2fe]">INYEON SYNERGY WAVE:</span>
        <span className="text-white">98.4% MATCH COVARIANCE</span>
      </div>
    </div>
  );
}

export default function WaitlistModal({ isOpen, serviceId, onClose, lang = 'ko' }: WaitlistModalProps) {
  const [email, setEmail] = useState('');
  const [note, setNote] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [queueNo, setQueueNo] = useState<string>('');
  const [loading, setLoading] = useState(false);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const getServiceInfo = () => {
    switch (serviceId) {
      case 'inyeon':
        return {
          title: lang === 'ko' ? '잼공인연사찰™' : lang === 'jp' ? 'ジャムゴン縁査察™' : 'JAMGONG INYEON SACHAL™',
          subTitle: lang === 'ko' ? '사주·천문·시계열 데이터 기반 AI 인연 분석' : lang === 'jp' ? '四柱・天体・時系列データ基盤AI縁分析' : 'AI Affinity Analysis based on Saju & Astronomical Time-Series',
          badgeText: lang === 'ko' ? '분석 리포트 준비 중' : lang === 'jp' ? '分析レポート準備中' : 'Analysis Report Coming Soon',
          color: '#00f2fe',
          desc: lang === 'ko' 
            ? '두 사람의 생년월시·천문 트랜짓·시계열 오행 파동을 잼공 오라클 신경망으로 교차 분석하는 \'인연 분석 리포트\'가 정식 출시 준비 중입니다.\n이메일을 사전 등록하시면 오픈 즉시 1:1 맞춤형 리포트 무료 이용권을 가장 먼저 발송해 드립니다.'
            : lang === 'jp'
            ? '二人の生年月日・天体トランジット・五行波動をAIで交差分析する「縁分析レポート」が準備中です。メールアドレスをご登録いただくと、オープン時に無料利用券を優先的にお送りします。'
            : 'The "Inyeon Affinity Report", which cross-analyzes two individuals\' birth data, ephemeris transits, and five-elements time-series via Jamgong Oracle neural network, is preparing for launch. Register your email to receive priority access.'
        };
      case 'talk':
        return {
          title: lang === 'ko' ? '잼공톡™' : lang === 'jp' ? 'ジャムゴントーク™' : 'JAMGONGTALK™',
          subTitle: lang === 'ko' ? '반려견 행동 서술 텍스트 감정·시너지 추론 AI' : lang === 'jp' ? '愛犬行動記述テキスト感情・シナジー推論AI' : 'Canine Behavioral & Emotional Context Inference AI',
          badgeText: lang === 'ko' ? '서비스 출시 준비 중' : lang === 'jp' ? 'サービス準備中' : 'Service Launch Coming Soon',
          color: '#10b981',
          desc: lang === 'ko'
            ? '반려견의 행동을 텍스트로 서술하면 견종별 특성과 감정을 분석하여 이해하기 쉬운 케어 리포트를 제공하는 서비스입니다. 이메일을 사전 등록하시면 웨이트리스트 혜택을 제공합니다.'
            : lang === 'jp'
            ? '愛犬の行動テキストから感情や最適なケア方法を分析するサービスです。事前登録で優先案内をお送りします。'
            : 'Describe your pet\'s behavior in text to receive emotional and behavioral insights. Register your email for early waitlist access.'
        };
      case 'oracle':
      default:
        return {
          title: lang === 'ko' ? '잼공오라클™' : lang === 'jp' ? 'ジャムゴンオラクル™' : 'JAMGONG ORACLE™',
          subTitle: lang === 'ko' ? '수리·천문·통계 빅데이터 의사결정 지원 엔진' : lang === 'jp' ? '数理・天体・統計ビッグデータ意思決定支援エンジン' : 'Mathematical & Astronomical Big-Data Inference Engine',
          badgeText: lang === 'ko' ? '엔터프라이즈 API 준비 중' : lang === 'jp' ? 'エンタープライズAPI準備中' : 'Enterprise API Coming Soon',
          color: '#c084fc',
          desc: lang === 'ko'
            ? '다변수 시계열 예측과 고전 통계 빅데이터를 결합한 전략적 의사결정 지원 엔진입니다. 웨이트리스트 등록 시 베타 API 액세스 권한을 안내해 드립니다.'
            : lang === 'jp'
            ? '多変数時系列予測と統計データを結合した意思決定支援エンジンです。事前登録でベータAPIアクセスをご案内します。'
            : 'Strategic decision support engine combining multivariate time-series forecasting and classical big data. Register for beta API access.'
        };
    }
  };

  const info = getServiceInfo();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;

    setLoading(true);

    setTimeout(() => {
      // Save to localStorage & Log to console as requested
      try {
        const storageKey = 'jamgong_waitlist';
        const existingData = localStorage.getItem(storageKey);
        const waitlistArray = existingData ? JSON.parse(existingData) : [];

        const newRegistration = {
          id: `WL-${Math.floor(100000 + Math.random() * 900000)}`,
          service: info.title,
          serviceId,
          email,
          note: note.trim(),
          registeredAt: new Date().toISOString(),
          language: lang,
        };

        waitlistArray.push(newRegistration);
        localStorage.setItem(storageKey, JSON.stringify(waitlistArray));

        // Requirement 3: Console log temporary storage
        console.log('✅ [JAMGONG WAITLIST REGISTRATION SUCCESS]', {
          service: info.title,
          email,
          note,
          entryCount: waitlistArray.length,
          record: newRegistration,
          timestamp: new Date().toISOString(),
        });

        const formattedQueue = `WAITLIST QUEUE #${waitlistArray.length.toString().padStart(4, '0')}`;
        setQueueNo(formattedQueue);
      } catch (err) {
        console.error('Failed saving waitlist to localStorage:', err);
        setQueueNo(`WAITLIST QUEUE #${Math.floor(100 + Math.random() * 900)}`);
      }

      setLoading(false);
      setSubmitted(true);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-[250] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 10 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-xl bg-[#030712] border border-[#00f2fe]/30 rounded-none shadow-[0_0_50px_rgba(0,242,254,0.15)] relative overflow-hidden flex flex-col max-h-[92vh]"
      >
        {/* Top Header Bar */}
        <div className="px-6 py-4 bg-[#050811] border-b border-[#00f2fe]/20 flex items-center justify-between relative z-10">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00f2fe] animate-pulse" />
            <span className="font-extrabold text-[#00f2fe] font-sans text-xs tracking-widest uppercase">
              JAMGONG · WAITLIST PORTAL
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1 px-2.5 border border-[#00f2fe]/20 bg-[#0d1326]/60 text-slate-300 hover:text-[#00f2fe] hover:border-[#00f2fe] transition-all cursor-pointer font-mono text-[10px] uppercase tracking-widest flex items-center gap-1"
          >
            CLOSE <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Modal Body Container */}
        <div className="p-6 overflow-y-auto space-y-5 scrollbar-thin relative z-10">
          {/* Main Title & Notice Badge */}
          <div className="space-y-2">
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <span className="text-[10px] font-mono font-bold tracking-widest text-slate-400 uppercase">
                {info.subTitle}
              </span>

              {/* Requirement 1: "분석 리포트 준비 중" notice badge */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#00f2fe]/10 border border-[#00f2fe]/40 text-[#00f2fe] text-[11px] font-mono font-extrabold uppercase tracking-wider rounded-none shadow-[0_0_12px_rgba(0,242,254,0.2)] animate-[pulse_2s_infinite]">
                <Sparkles className="w-3.5 h-3.5 text-[#00f2fe] animate-spin" style={{ animationDuration: '4s' }} />
                <span>{info.badgeText}</span>
              </div>
            </div>

            <h3 className="text-2xl sm:text-3xl font-sans font-black text-white tracking-tight">
              {info.title}
            </h3>
          </div>

          {/* Requirement 1: 'Inyeon Connection' Teaser Animation Canvas */}
          {serviceId === 'inyeon' ? (
            <div className="space-y-1">
              <div className="flex items-center justify-between text-[10px] font-mono text-[#00f2fe] tracking-wider uppercase font-bold px-0.5">
                <span>⚡ INYEON CONNECTION TEASER PREVIEW</span>
                <span className="text-slate-400">DUAL-CLUSTER SYNERGY ENGINE</span>
              </div>
              <InyeonConnectionCanvas />
            </div>
          ) : (
            <div className="p-4 bg-[#050811] border border-[#00f2fe]/20 text-xs text-slate-300 space-y-1">
              <div className="font-mono text-[10px] text-[#00f2fe] font-bold uppercase">// ENGINE STATUS: PRE-RELEASE</div>
              <p>{info.subTitle}</p>
            </div>
          )}

          {/* Description Text */}
          <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed whitespace-pre-line bg-[#050811]/60 p-4 border border-slate-800/80">
            {info.desc}
          </p>

          {/* Form or Completion State */}
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 bg-[#050811] border border-[#00f2fe]/40 text-center space-y-4 shadow-[0_0_30px_rgba(0,242,254,0.15)]"
            >
              <div className="w-12 h-12 mx-auto bg-[#00f2fe]/10 border border-[#00f2fe]/40 flex items-center justify-center text-[#00f2fe]">
                <CheckCircle2 className="w-7 h-7" />
              </div>

              <div className="space-y-1.5">
                <span className="inline-block px-3 py-0.5 bg-[#00f2fe]/15 border border-[#00f2fe]/40 text-[11px] font-mono text-[#00f2fe] font-extrabold tracking-widest">
                  {queueNo}
                </span>
                <h4 className="text-lg font-bold text-white font-sans">
                  {lang === 'ko' ? '웨이트리스트 사전 등록 완료!' : lang === 'jp' ? 'ウェイティングリスト事前登録完了！' : 'Waitlist Registration Complete!'}
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed max-w-md mx-auto">
                  {lang === 'ko'
                    ? `입력하신 (${email}) 주소로 정식 서비스 오픈 시 가장 먼저 무료 리포트 이용권과 접속 링크를 발송해 드리겠습니다.`
                    : lang === 'jp'
                    ? `ご登録いただいた (${email}) 宛に、オープン時に無料利用券とアクセスリンクを優先的にお送りします。`
                    : `We will send your priority access pass and report token to (${email}) immediately upon launch.`}
                </p>
              </div>

              <div className="pt-2 flex justify-center gap-3">
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 bg-[#00f2fe] text-black font-sans font-black text-xs uppercase tracking-widest hover:bg-white transition-colors cursor-pointer"
                >
                  확인 (CLOSE)
                </button>
              </div>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="block text-[11px] font-mono tracking-wider text-slate-300 uppercase font-bold flex items-center justify-between">
                  <span>이메일 주소 (Email Address) <span className="text-[#00f2fe]">*</span></span>
                  <span className="text-[9px] text-slate-500 font-normal">오픈 즉시 리포트 발송</span>
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#00f2fe]/60 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="example@domain.com"
                    className="w-full bg-[#050811] border border-[#00f2fe]/30 rounded-none pl-10 pr-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-[#00f2fe] focus:ring-1 focus:ring-[#00f2fe] transition-all font-sans"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-[11px] font-mono tracking-wider text-slate-400 uppercase">
                  남기실 말씀 / 희망 분석 유형 (선택사항)
                </label>
                <input
                  type="text"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="예: 궁합/인연 분석, 사주 오행 리포트, 잼공톡 반려견 케어"
                  className="w-full bg-[#050811] border border-slate-800 rounded-none px-3.5 py-2.5 text-xs text-white placeholder-slate-650 focus:outline-none focus:border-[#00f2fe] transition-all font-sans"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-gradient-to-r from-[#00f2fe] via-[#00c2ff] to-[#3b82f6] text-black font-sans font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:opacity-90 transition-all cursor-pointer shadow-[0_0_20px_rgba(0,242,254,0.3)] disabled:opacity-50"
              >
                {loading ? (
                  <span className="inline-flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full border-2 border-black border-t-transparent animate-spin" />
                    웨이트리스트 수집 중...
                  </span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>이메일 웨이트리스트 사전 신청 (SUBMIT WAITLIST)</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>

        {/* Footer info bar */}
        <div className="px-6 py-3.5 bg-[#050811] border-t border-[#00f2fe]/10 flex items-center justify-between text-[10px] font-mono text-slate-400 relative z-10">
          <div className="flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5 text-[#00f2fe]" />
            <span>수신된 이메일은 서비스 안내 목적으로만 보호됩니다.</span>
          </div>
          <div className="hidden sm:block text-[#00f2fe]/80 font-bold">
            JAMGONG RESEARCH LABS
          </div>
        </div>
      </motion.div>
    </div>
  );
}
