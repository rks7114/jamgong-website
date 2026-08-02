import React, { useState, useEffect } from 'react';
import { X, Play, RefreshCw, Send, CheckCircle2, Shield, Activity, Sparkles, Cpu } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface SystemModalProps {
  systemId: string | null;
  onClose: () => void;
}

export default function SystemModal({ systemId, onClose }: SystemModalProps) {
  const [activeTab, setActiveTab] = useState<'demo' | 'contact'>('demo');
  const [loading, setLoading] = useState(false);
  const [simResults, setSimResults] = useState<string[]>([]);
  const [simProgress, setSimProgress] = useState(0);

  // Form states (Secure B2B license)
  const [corpName, setCorpName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Interactive Target Vector Selection
  const [selectedVector, setSelectedVector] = useState<'cosmic' | 'quant' | 'neural'>('cosmic');

  const getSystemDetails = () => {
    switch (systemId) {
      case 'oracle':
        return {
          title: 'JAMGONG ORACLE™',
          sub: '예측 인텔리전스 엔진 (Predictive Intelligence Engine)',
          accent: 'border-[#00f2fe]/30 text-[#00f2fe]',
          accentBg: 'bg-[#00f2fe]/5',
          glowColor: 'rgba(0, 242, 254, 0.4)',
          btnBg: 'bg-[#00f2fe] text-black hover:bg-white',
          patent: '특허출원 중',
          alertMessage: 'JAMGONG ORACLE™ 기업 간(B2B) 시스템 통합 및 제휴 문의는 보안 포털을 통해 접수됩니다.'
        };
      case 'neutralsync':
        return {
          title: 'JAMGONG NEURALSYNC™',
          sub: '신경망 동기화 플랫폼 (Neural Synchronization Platform)',
          accent: 'border-[#c084fc]/30 text-[#c084fc]',
          accentBg: 'bg-[#c084fc]/5',
          glowColor: 'rgba(192, 132, 252, 0.4)',
          btnBg: 'bg-[#c084fc] text-black hover:bg-white',
          patent: '특허출원 중',
          alertMessage: 'JAMGONG NEURALSYNC™ 기업 간(B2B) 시스템 통합 및 제휴 문의는 보안 포털을 통해 접수됩니다.'
        };
      case 'synergy':
        return {
          title: 'JAMGONGTALK™',
          sub: '시너지 인텔리전스 솔루션 (Synergy Intelligence Solution)',
          accent: 'border-[#10b981]/30 text-[#10b981]',
          accentBg: 'bg-[#10b981]/5',
          glowColor: 'rgba(16, 185, 129, 0.4)',
          btnBg: 'bg-[#10b981] text-black hover:bg-white',
          patent: '10-2026-0141984 (특허출원 중)',
          alertMessage: 'JAMGONGTALK™ 기업 간(B2B) 시스템 통합 및 제휴 문의는 보안 포털을 통해 접수됩니다.'
        };
      case 'holo':
        return {
          title: 'JAMGONG HOLO™',
          sub: '몰입형 공간 인터랙션 엔진 (Immersive Spatial Interaction Engine)',
          accent: 'border-[#38bdf8]/30 text-[#38bdf8]',
          accentBg: 'bg-[#38bdf8]/5',
          glowColor: 'rgba(56, 189, 248, 0.4)',
          btnBg: 'bg-[#38bdf8] text-black hover:bg-white',
          patent: '특허출원 중',
          alertMessage: 'JAMGONG HOLO™ 기업 간(B2B) 시스템 통합 및 제휴 문의는 보안 포털을 통해 접수됩니다.'
        };
      default:
        return {
          title: 'JAMGONG SYSTEM',
          sub: 'Enterprise AI Module',
          accent: 'border-slate-700 text-slate-300',
          accentBg: 'bg-slate-900/30',
          glowColor: 'rgba(255, 255, 255, 0.2)',
          btnBg: 'bg-cyan-500 text-black',
          patent: '특허출원 16건 · 상표출원 1건',
          alertMessage: '기업 간(B2B) 시스템 제휴는 보안 포털을 통해 접수해 주시기 바랍니다.'
        };
    }
  };

  const sys = getSystemDetails();

  const getSystemVectors = () => {
    switch (systemId) {
      case 'oracle':
        return [
          {
            id: 'cosmic' as const,
            name: 'ASTRO_STAT_VEC',
            desc: '천문 통계 예측 벡터',
            weight: 96.8,
            color: '#00f2fe',
            glow: 'shadow-[0_0_20px_rgba(0,242,254,0.18)] border-[#00f2fe] bg-[#00f2fe]/5 text-[#00f2fe]',
            inactiveBorder: 'border-slate-800/80 text-slate-400 hover:border-slate-700 bg-transparent',
          },
          {
            id: 'quant' as const,
            name: 'CHRONO_WEIGHT_IDX',
            desc: '시기별 가중치 지수',
            weight: 98.5,
            color: '#c084fc',
            glow: 'shadow-[0_0_20px_rgba(192,132,252,0.18)] border-[#c084fc] bg-[#c084fc]/5 text-[#c084fc]',
            inactiveBorder: 'border-slate-800/80 text-slate-400 hover:border-slate-700 bg-transparent',
          },
          {
            id: 'neural' as const,
            name: 'LUNAR_PATTERN_COV',
            desc: '고전 음양 공분산',
            weight: 91.3,
            color: '#10b981',
            glow: 'shadow-[0_0_20px_rgba(16,185,129,0.18)] border-[#10b981] bg-[#10b981]/5 text-[#10b981]',
            inactiveBorder: 'border-slate-800/80 text-slate-400 hover:border-slate-700 bg-transparent',
          }
        ];
      case 'neutralsync':
        return [
          {
            id: 'cosmic' as const,
            name: 'SYNC_METRIC_STREAM',
            desc: '실시간 동기화 스트림',
            weight: 97.4,
            color: '#00f2fe',
            glow: 'shadow-[0_0_20px_rgba(0,242,254,0.18)] border-[#00f2fe] bg-[#00f2fe]/5 text-[#00f2fe]',
            inactiveBorder: 'border-slate-800/80 text-slate-400 hover:border-slate-700 bg-transparent',
          },
          {
            id: 'quant' as const,
            name: 'MULTI_SOURCE_WEIGHT',
            desc: '멀티 소스 가중치',
            weight: 94.8,
            color: '#c084fc',
            glow: 'shadow-[0_0_20px_rgba(192,132,252,0.18)] border-[#c084fc] bg-[#c084fc]/5 text-[#c084fc]',
            inactiveBorder: 'border-slate-800/80 text-slate-400 hover:border-slate-700 bg-transparent',
          },
          {
            id: 'neural' as const,
            name: 'TEMPORAL_ALIGN_IDX',
            desc: '시계열 정렬 지수',
            weight: 99.1,
            color: '#10b981',
            glow: 'shadow-[0_0_20px_rgba(16,185,129,0.18)] border-[#10b981] bg-[#10b981]/5 text-[#10b981]',
            inactiveBorder: 'border-slate-800/80 text-slate-400 hover:border-slate-700 bg-transparent',
          }
        ];
      case 'synergy':
        return [
          {
            id: 'cosmic' as const,
            name: 'CANINE_BEHAVIOR_VEC',
            desc: '반려견 행동 패턴 벡터',
            weight: 95.4,
            color: '#00f2fe',
            glow: 'shadow-[0_0_20px_rgba(0,242,254,0.18)] border-[#00f2fe] bg-[#00f2fe]/5 text-[#00f2fe]',
            inactiveBorder: 'border-slate-800/80 text-slate-400 hover:border-slate-700 bg-transparent',
          },
          {
            id: 'quant' as const,
            name: 'EMOTIONAL_CONTEXT_IDX',
            desc: '감정 맥락 분리 지수',
            weight: 99.2,
            color: '#c084fc',
            glow: 'shadow-[0_0_20px_rgba(192,132,252,0.18)] border-[#c084fc] bg-[#c084fc]/5 text-[#c084fc]',
            inactiveBorder: 'border-slate-800/80 text-slate-400 hover:border-slate-700 bg-transparent',
          },
          {
            id: 'neural' as const,
            name: 'MULTI_CHANNEL_WEIGHT',
            desc: '다중 채널 가중치',
            weight: 88.7,
            color: '#10b981',
            glow: 'shadow-[0_0_20px_rgba(16,185,129,0.18)] border-[#10b981] bg-[#10b981]/5 text-[#10b981]',
            inactiveBorder: 'border-slate-800/80 text-slate-400 hover:border-slate-700 bg-transparent',
          }
        ];
      case 'holo':
        return [
          {
            id: 'cosmic' as const,
            name: 'SPATIAL_POINT_VEC',
            desc: '공간 좌표 데이터 벡터',
            weight: 96.2,
            color: '#00f2fe',
            glow: 'shadow-[0_0_20px_rgba(0,242,254,0.18)] border-[#00f2fe] bg-[#00f2fe]/5 text-[#00f2fe]',
            inactiveBorder: 'border-slate-800/80 text-slate-400 hover:border-slate-700 bg-transparent',
          },
          {
            id: 'quant' as const,
            name: 'DEPTH_CONTEXT_IDX',
            desc: '입체 뎁스 맥락 지수',
            weight: 98.9,
            color: '#c084fc',
            glow: 'shadow-[0_0_20px_rgba(192,132,252,0.18)] border-[#c084fc] bg-[#c084fc]/5 text-[#c084fc]',
            inactiveBorder: 'border-slate-800/80 text-slate-400 hover:border-slate-700 bg-transparent',
          },
          {
            id: 'neural' as const,
            name: 'INTERACTION_WEIGHT',
            desc: '실시간 인터랙션 가중치',
            weight: 92.5,
            color: '#10b981',
            glow: 'shadow-[0_0_20px_rgba(16,185,129,0.18)] border-[#10b981] bg-[#10b981]/5 text-[#10b981]',
            inactiveBorder: 'border-slate-800/80 text-slate-400 hover:border-slate-700 bg-transparent',
          }
        ];
      default:
        return [
          {
            id: 'cosmic' as const,
            name: 'CORE_ANALYTICS_VEC',
            desc: '핵심 분석 데이터 벡터',
            weight: 95.0,
            color: '#00f2fe',
            glow: 'shadow-[0_0_20px_rgba(0,242,254,0.18)] border-[#00f2fe] bg-[#00f2fe]/5 text-[#00f2fe]',
            inactiveBorder: 'border-slate-800/80 text-slate-400 hover:border-slate-700 bg-transparent',
          },
          {
            id: 'quant' as const,
            name: 'SYSTEM_STABILITY_IDX',
            desc: '시스템 안정성 지수',
            weight: 98.0,
            color: '#c084fc',
            glow: 'shadow-[0_0_20px_rgba(192,132,252,0.18)] border-[#c084fc] bg-[#c084fc]/5 text-[#c084fc]',
            inactiveBorder: 'border-slate-800/80 text-slate-400 hover:border-slate-700 bg-transparent',
          },
          {
            id: 'neural' as const,
            name: 'MODEL_ACCURACY_WEIGHT',
            desc: '모델 정밀도 가중치',
            weight: 93.5,
            color: '#10b981',
            glow: 'shadow-[0_0_20px_rgba(16,185,129,0.18)] border-[#10b981] bg-[#10b981]/5 text-[#10b981]',
            inactiveBorder: 'border-slate-800/80 text-slate-400 hover:border-slate-700 bg-transparent',
          }
        ];
    }
  };

  const getSystemVectorLabel = () => {
    switch (systemId) {
      case 'oracle':
        return '📡 고전 수리·천문 빅데이터 및 예측 가중치 지표 (Astro-Statistical & Predictive Weight Index)';
      case 'neutralsync':
        return '📡 실시간 시계열 동기화 및 멀티 소스 가중치 지표 (Real-time Sync & Multi-Source Weight Index)';
      case 'synergy':
        return '📡 텍스트·행동 분석 대상 및 가중치 지표 (Text & Behavioral Analysis Target / Weight Index)';
      case 'holo':
        return '📡 3D 공간 좌표 및 인터랙션 맥락 가중치 지표 (Spatial Coordinates & Interaction Context Weight Index)';
      default:
        return '📡 핵심 데이터 분석 대상 및 가중치 지표 (Core Analytics & Target Weight Index)';
    }
  };

  const vectors = getSystemVectors();

  const handleSimulate = () => {
    setLoading(true);
    setSimProgress(0);
    setSimResults([]);

    const chosenVector = vectors.find(v => v.id === selectedVector)?.name || 'DEFAULT_VECTOR';

    let steps: string[] = [];
    if (systemId === 'oracle') {
      steps = [
        `INITIATING PREDICTIVE HANDSHAKE FOR ${sys.title}...`,
        `CONNECTING TO ASTRO-STATISTICAL DATA CLUSTER...`,
        `LOADING TARGET PREDICTION SEED VECTOR: [${chosenVector}]...`,
        `COMPUTING HISTORICAL HUMANITIES & QUANTITATIVE TIME-SERIES...`,
        `RUNNING PROPRIETARY DECISION ENGINE AT HIGH SPEED...`,
        `EXTRACTING INTEGRATED ACCURACY & PREDICTIVE COVARIANCES...`,
        `SYSTEM VALIDATED. OUTPUT PARALLEL PREDICTION TAPE SECURED.`,
        `INFERENCE COMPLETED SUCCESSFULLY WITH ABSOLUTE STRUCTURAL INTEGRITY.`
      ];
    } else if (systemId === 'neutralsync') {
      steps = [
        `INITIATING SYNCHRONIZATION HANDSHAKE FOR ${sys.title}...`,
        `CONNECTING TO MULTI-SOURCE NEURAL STREAM MATRIX...`,
        `LOADING TARGET SYNC SEED VECTOR: [${chosenVector}]...`,
        `ALIGNING REAL-TIME DATA PIPELINES & NOISE FILTERS...`,
        `RUNNING HIGH-FREQUENCY NEURAL SYNC ENGINE AT LOW LATENCY...`,
        `EXTRACTING REAL-TIME METRICS & TEMPORAL STABILITY WEIGHTS...`,
        `SYSTEM VALIDATED. REAL-TIME STREAM PIPELINE SECURED.`,
        `SYNCHRONIZATION COMPLETED SUCCESSFULLY WITH ABSOLUTE STRUCTURAL INTEGRITY.`
      ];
    } else if (systemId === 'synergy') {
      steps = [
        `INITIATING BEHAVIORAL ANALYSIS HANDSHAKE FOR ${sys.title}...`,
        `CONNECTING TO CANINE BEHAVIOR & EMOTIONAL TEXT MATRIX...`,
        `LOADING TARGET ANALYSIS SEED VECTOR: [${chosenVector}]...`,
        `PARSING BEHAVIOR TEXT & SEPARATING EMOTIONAL CHANNELS...`,
        `RUNNING MULTI-CHANNEL CONTEXTUAL RECONSTRUCTION ENGINE...`,
        `EXTRACTING INTEGRATED EMOTIONAL WEIGHTS & BEHAVIORAL PATTERNS...`,
        `SYSTEM VALIDATED. OUTPUT PARALLEL BEHAVIORAL TAPE SECURED.`,
        `INFERENCE COMPLETED SUCCESSFULLY WITH ABSOLUTE STRUCTURAL INTEGRITY.`
      ];
    } else if (systemId === 'holo') {
      steps = [
        `INITIATING SPATIAL INTERACTION HANDSHAKE FOR ${sys.title}...`,
        `CONNECTING TO 3D SPATIAL & IMMERSIVE GRAPHICS MATRIX...`,
        `LOADING TARGET SPATIAL SEED VECTOR: [${chosenVector}]...`,
        `MAPPING DEPTH CONTEXT & REAL-TIME SPATIAL COORDINATES...`,
        `RUNNING IMMERSIVE SPATIAL INTERACTION ENGINE AT 120 FPS...`,
        `EXTRACTING SPATIAL ACCURACY & INTERACTION WEIGHTS...`,
        `SYSTEM VALIDATED. SPATIAL INTERACTION PIPELINE SECURED.`,
        `IMMERSIVE RENDERING COMPLETED SUCCESSFULLY WITH STRUCTURAL INTEGRITY.`
      ];
    } else {
      steps = [
        `INITIATING SYSTEM HANDSHAKE FOR ${sys.title}...`,
        `CONNECTING TO ENTERPRISE AI CLUSTER...`,
        `LOADING TARGET SEED VECTOR: [${chosenVector}]...`,
        `PROCESSING MULTI-DIMENSIONAL TENSORS...`,
        `RUNNING CORE INFERENCE ENGINE...`,
        `EXTRACTING ACCURACY METRICS & WEIGHT COVARIANCES...`,
        `SYSTEM VALIDATED. OUTPUT DATA TAPE SECURED.`,
        `PROCESS COMPLETED SUCCESSFULLY WITH ABSOLUTE STRUCTURAL INTEGRITY.`
      ];
    }

    let currentStepIndex = 0;
    const interval = setInterval(() => {
      if (currentStepIndex < steps.length) {
        setSimProgress(((currentStepIndex + 1) / steps.length) * 100);
        setSimResults((prev) => [...prev, `[system@jamgong-core] ${steps[currentStepIndex]}`]);
        currentStepIndex++;
      } else {
        clearInterval(interval);
        setLoading(false);
      }
    }, 350);
  };

  const handleSubmitContact = (e: React.FormEvent) => {
    e.preventDefault();
    if (!corpName || !email) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setFormSubmitted(true);
    }, 1100);
  };

  // Close with Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl bg-[#030712] border border-[#00f2fe]/25 rounded-none shadow-2xl relative overflow-hidden flex flex-col max-h-[92vh]"
      >
        {/* Absolute faint mathematical background overlay in modal */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0 opacity-[0.03]">
          <div className="absolute top-[10%] left-[5%] font-mono text-[9px] text-[#00f2fe] space-y-1">
            <p>dS_t = μ S_t dt + σ S_t dW_t</p>
            <p>Ψ(x,t) = Ae^(i(kx-ωt))</p>
          </div>
          <div className="absolute bottom-[15%] right-[5%] font-mono text-[9px] text-[#c084fc] space-y-1 text-right">
            <p>f(x) = 1/√(2π) e^(-x²/2)</p>
            <p>V^(l) = η * (W_t - W_t-1)</p>
          </div>
        </div>

        {/* Brand/Nav Header Block */}
        <div className="relative z-10 px-6 py-4 border-b border-[#00f2fe]/15 bg-[#050811] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-[#00f2fe] font-sans text-xs tracking-widest">
              JAMGONG
            </span>
            <span className="hidden sm:inline-block w-px h-3 bg-slate-800" />
            <span className="hidden sm:inline-block text-[9px] font-mono text-[#00f2fe]/70 tracking-widest uppercase font-bold">
              🟢 SUPERCOMPUTING IP &amp; AI RESEARCH HUB
            </span>
          </div>

          <button 
            onClick={onClose}
            className="p-1 px-2.5 border border-[#00f2fe]/20 bg-[#0d1326]/60 text-slate-350 hover:text-[#00f2fe] hover:border-[#00f2fe] transition-all cursor-pointer font-mono text-[10px] uppercase tracking-widest flex items-center gap-1"
          >
            Close <X className="w-3 h-3" />
          </button>
        </div>

        {/* Master System Title Information Panel */}
        <div className="relative z-10 px-6 py-6 bg-[#040813] border-b border-[#00f2fe]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-[10px] font-sans font-extrabold uppercase tracking-widest text-slate-400 mb-1 select-none">
              {sys.sub}
            </div>
            <h3 className="text-2xl sm:text-3xl font-sans font-black tracking-tight text-white select-none flex items-center gap-2">
              {sys.title}
            </h3>
          </div>

          {/* Patent status metadata bar with single unified green/cyan pending */}
          <div className="flex flex-col items-start sm:items-end gap-1.5 justify-center">
            <span className="text-[10px] sm:text-xs font-mono text-slate-400 uppercase tracking-wide">
              특허번호: {sys.patent}
            </span>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#00f2fe] animate-pulse-glow" />
              <span className="text-xs font-sans font-extrabold text-[#00f2fe] tracking-widest">출원 중 (Pending)</span>
            </div>
          </div>
        </div>

        {/* Large Primary Infrastructure Menu (Tabs selector) */}
        <div className="flex border-b border-[#00f2fe]/10 bg-[#050811] relative z-10">
          <button
            onClick={() => setActiveTab('demo')}
            className={`flex-1 py-4 text-xs sm:text-sm font-sans font-black tracking-widest border-b-2 uppercase transition-all cursor-pointer ${
              activeTab === 'demo'
                ? 'border-[#00f2fe] text-[#00f2fe] bg-[#00f2fe]/5'
                : 'border-transparent text-slate-500 hover:text-slate-300'
            }`}
          >
            💻 시뮬레이션 샌드박스 (Simulation Sandbox)
          </button>
          <button
            onClick={() => setActiveTab('contact')}
            className={`flex-1 py-4 text-xs sm:text-sm font-sans font-black tracking-widest border-b-2 uppercase transition-all cursor-pointer ${
              activeTab === 'contact'
                ? 'border-[#00f2fe] text-[#00f2fe] bg-[#00f2fe]/5'
                : 'border-transparent text-slate-500 hover:text-slate-300'
            }`}
          >
            ✉️ 라이선싱 허브 (Licensing Hub)
          </button>
        </div>

        {/* Main interactive compartment content area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#030712] relative z-10 scrollbar-thin">
          {activeTab === 'demo' ? (
            <div className="space-y-6">
              {/* System Statement Section with NO email address */}
              <div className="p-4 rounded-none border border-[#00f2fe]/20 bg-[#00f2fe]/5 text-xs font-sans leading-relaxed text-slate-300 shadow-[0_0_15px_rgba(0,242,254,0.03)]">
                ℹ️ <strong>시스템 선언:</strong> {sys.alertMessage}
              </div>

              {/* Statistical weight vector map */}
              <div className="space-y-3">
                <div className="text-[10px] sm:text-xs font-mono font-bold tracking-widest text-[#00f2fe] uppercase">
                  {getSystemVectorLabel()}
                </div>

                {/* Grid layout of 3 interactive vector targets */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {vectors.map((vec) => {
                    const isSelected = selectedVector === vec.id;
                    return (
                      <button
                        key={vec.id}
                        onClick={() => setSelectedVector(vec.id)}
                        className={`p-4 border transition-all duration-300 text-left select-none cursor-pointer flex flex-col justify-between h-[105px] rounded-none outline-none ${
                          isSelected ? vec.glow : vec.inactiveBorder
                        }`}
                      >
                        <div className="space-y-0.5">
                          <div className="text-xs font-mono font-black tracking-normal">
                            {vec.name}
                          </div>
                          <div className="text-[10px] font-sans text-slate-400 font-medium">
                            {vec.desc}
                          </div>
                        </div>

                        {/* Interactive gauge progress indicator bar */}
                        <div className="space-y-1.5 w-full pt-2">
                          <div className="flex justify-between items-center text-[10px] font-mono">
                            <span className="text-slate-500">Weight</span>
                            <span className="font-extrabold text-white">{vec.weight}%</span>
                          </div>
                          <div className="w-full h-1 bg-slate-900 rounded-none overflow-hidden">
                            <div 
                              className="h-full rounded-none transition-all duration-500"
                              style={{ 
                                width: `${vec.weight}%`,
                                backgroundColor: vec.color,
                                boxShadow: `0 0 8px ${vec.color}`
                              }}
                            />
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Execute Terminal Button - Cyber cyan neon housing casing */}
              <div className="space-y-2">
                <div className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">
                  ⚡ 추론 분석 플랫폼 가동 (EXECUTE INFERENCE PLATFORM)
                </div>
                
                {/* Physical casing styling housing casing */}
                <div className="p-1.5 bg-[#050811] border border-[#00f2fe]/35 shadow-[0_0_15px_rgba(0,242,254,0.15)] rounded-none">
                  <button
                    onClick={handleSimulate}
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-3 py-3.5 bg-[#030712] border border-[#00f2fe]/40 text-[#00f2fe] hover:bg-[#00f2fe] hover:text-black hover:shadow-[0_0_20px_rgba(0,242,254,0.4)] hover:border-[#00f2fe] font-mono font-black tracking-widest text-xs rounded-none transition-all duration-300 disabled:opacity-40"
                  >
                    {loading ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        RUNNING SYSTEM DECK COMPILER MAP...
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4" />
                        jamgong_simulation_terminal_v1.0.sh
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Execution status terminal window panel screen */}
              <div className="relative border border-[#00f2fe]/15 rounded-none bg-[#010307] overflow-hidden font-mono text-[11px] h-48 flex flex-col p-4 shadow-2xl">
                <div className="flex items-center justify-between border-b border-white/5 pb-2 mb-2 text-neutral-400">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#00f2fe]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#c084fc]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#10b981]" />
                    <span className="ml-1.5 text-neutral-400 text-[10px] tracking-wider">jamgong_simulation_terminal_v1.0.sh</span>
                  </div>
                  <span className="text-[9px] text-[#00f2fe] bg-[#00f2fe]/10 px-2 py-0.5 rounded-none">CRT MONITOR</span>
                </div>
                
                <div className="flex-1 overflow-y-auto space-y-1.5 text-neutral-300 scrolling-terminal scrollbar-none">
                  {simResults.length === 0 && !loading && (
                    <div className="text-neutral-500 text-center flex flex-col justify-center h-full items-center">
                      <Activity className="w-9 h-9 mb-2 stroke-1 animate-pulse text-[#00f2fe]/50" />
                      <p className="text-xs text-slate-450 tracking-widest">
                        시스템 대기 중. 추론 트리거 신호 수신 대기.
                      </p>
                      <p className="text-[10px] text-slate-600 mt-1 uppercase tracking-tight">
                        SYSTEM IDLE. AWAITING INFERENCE TRIGGER SIGNAL.
                      </p>
                    </div>
                  )}

                  {simResults.map((line, i) => (
                    <div key={i} className="leading-5">
                      <span className="text-[#00f2fe] font-black">{`>>`}</span> {line}
                    </div>
                  ))}

                  {loading && (
                    <div className="text-[#00f2fe] flex items-center gap-2 py-1 select-none font-bold">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#00f2fe] animate-ping" />
                      COMPUTING PROJECTION CORRELATION TENSORS...
                    </div>
                  )}
                </div>

                {/* Progress bar nested in lower frame */}
                {loading && (
                  <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-white/5">
                    <div 
                      className="bg-gradient-to-r from-[#00f2fe] to-[#c084fc] h-full transition-all duration-300"
                      style={{ width: `${simProgress}%` }}
                    />
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* Secure Licensing Hub Compartment Window */
            <div className="space-y-5">
              {formSubmitted ? (
                <div className="py-12 flex flex-col items-center text-center space-y-5 bg-[#050811] border border-[#00f2fe]/15 p-6 shadow-xl">
                  <div className="p-4 bg-[#00f2fe]/10 border border-[#00f2fe]/30 rounded-none text-[#00f2fe]">
                    <CheckCircle2 className="w-12 h-12" />
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-xl font-sans font-black text-white uppercase tracking-wider">PROPOSAL SUBMITTED SUCCESSFULLY</h4>
                    <p className="text-xs text-slate-400 max-w-md leading-relaxed">
                      Your B2B sandbox authorization query was securely indexed in the enterprise queue.
                      An engineering liaison officer will trace back to your address shortly.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setFormSubmitted(false);
                      setCorpName('');
                      setEmail('');
                      setMessage('');
                    }}
                    className="text-xs font-mono font-bold text-[#00f2fe] tracking-wider hover:underline cursor-pointer"
                  >
                    Submit another inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmitContact} className="space-y-5">
                  <div className="p-4.5 rounded-none border border-dashed border-[#00f2fe]/25 bg-[#050811] flex items-start gap-3.5">
                    <Shield className="w-5 h-5 text-[#00f2fe] flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-sans font-black text-white uppercase tracking-widest mb-1">
                        Encrypted Enterprise Interface
                      </h4>
                      <p className="text-[11px] text-slate-400 leading-relaxed">
                        Submit this system integration proposal to establish licensing parameters with the JAMGONG architecture division.
                        Our multi-tenant secure pipeline guarantees complete corporate and IP confidentiality.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-mono tracking-wider text-slate-400 uppercase">
                        Enterprise Name <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={corpName}
                        onChange={(e) => setCorpName(e.target.value)}
                        placeholder="e.g. Acme Tech"
                        className="w-full bg-[#050811] border border-slate-800 rounded-none px-3.5 py-2.5 text-sm text-white placeholder-slate-650 focus:outline-none focus:border-[#00f2fe]"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-mono tracking-wider text-slate-400 uppercase">
                        Authorized Liaison Email <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="liaison@acme-company.com"
                        className="w-full bg-[#050811] border border-slate-800 rounded-none px-3.5 py-2.5 text-sm text-white placeholder-slate-650 focus:outline-none focus:border-[#00f2fe]"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-mono tracking-wider text-slate-400 uppercase">
                      Integrations Scope &amp; Core Systems Terms Required
                    </label>
                    <textarea
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="e.g. Requesting API sandbox endpoints, customized NeuralSync tensor configurations, or Jamgongtalk white-labeling terms..."
                      className="w-full bg-[#050811] border border-slate-800 rounded-none px-3.5 py-2.5 text-sm text-white placeholder-slate-650 focus:outline-none focus:border-[#00f2fe] resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 bg-gradient-to-r from-[#00f2fe] to-[#c084fc] text-black font-sans font-black text-xs tracking-widest rounded-none flex items-center justify-center gap-2 hover:opacity-90 transition-all cursor-pointer disabled:opacity-50"
                  >
                    {loading ? (
                      <RefreshCw className="w-4 h-4 animate-spin text-black" />
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        TRANSMIT SECURE INQUIRY
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          )}
        </div>

        {/* Dynamic bottom status security certification panel - STRICTLY COMPLIANT */}
        <div className="px-6 py-5 bg-[#050811] border-t border-[#00f2fe]/10 flex flex-col xs:flex-row items-center justify-between gap-3 font-mono text-[10px] text-slate-450 relative z-10">
          <div>PATENT NO: {sys.patent}</div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#10b981]/5 border border-[#10b981]/30 rounded-none text-[9px] text-[#10b981] font-sans font-extrabold uppercase tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse" />
            B2B 포털 활성화 완료 (B2B PORTAL ACTIVATED)
          </div>
        </div>
      </motion.div>
    </div>
  );
}
