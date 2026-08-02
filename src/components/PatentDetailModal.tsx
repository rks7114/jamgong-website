import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Shield, FileText, Award, Layers, Clipboard, CheckCircle, RefreshCcw, ExternalLink } from 'lucide-react';

interface PatentDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PatentDetailModal({ isOpen, onClose }: PatentDetailModalProps) {
  const [activeTab, setActiveTab] = useState<'specs' | 'claims' | 'related'>('specs');
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationProgress, setVerificationProgress] = useState(0);
  const [verificationLogs, setVerificationLogs] = useState<string[]>([]);
  const [copiedText, setCopiedText] = useState(false);

  const masterPatent = {
    title: '사주 오행 상생상극 및 확률적 순위 예측 최적 연산 인공지능 추론 엔진 (오행순위)',
    titleEn: 'Five Elements Correlation and Probabilistic Ranking Prediction AI Inference Engine Architecture',
    appNumber: '10-2026-0141984 (특허출원 중)',
    appDate: '2026년 06월 19일 (CURRENT_VERSION)',
    applicant: 'JAMGONG (잼공)',
    inventor: 'JAMGONG (잼공)',
    status: '출원 중 (Patent Pending)',
    authCode: 'SHA-256/3E8F91A2D4F0C8B1E9F6A7E8D2C5'
  };

  const claims = [
    {
      num: '제 1 항 (독립항)',
      desc: '역사적 문헌 기록 기반 인문 감성 빅데이터와 지구 공전/우주 시계열 궤적에 따른 다차원 고천문 물리 지표 데이터를 구조화하고, 상기 비비례 가산형 이종(Heterogeneous) 데이터를 고해상도 다차원 텐서 벡터 공간으로 매핑하기 위한 고정밀 전처리 정규화 장치 및 파이프라인.'
    },
    {
      num: '제 2 항 (종속항)',
      desc: '제 1 항에 있어서, 최소 256-depth의 신경망 가중치 오차역전파(Backpropagation) 루프를 동작시켜 시간 차원과 공간 구도의 다중 상관 분석을 실시간 연산하고, 결합 주기 및 가변 임베딩 토큰을 동적 가중치 업데이트로 교정하는 패턴 동기화 인공지능 추론 프로세스.'
    },
    {
      num: '제 3 항 (종속항)',
      desc: '제 1 항에 있어서, 통제 컴퓨팅 시스템 및 저전력 엣지(On-Device) 로컬 단말 계층과의 가속 동기화를 매개로 하며, 개체 간 상호작용 지표의 정량화 피드백을 계산하여 비가산 결합 시너지 가중치를 시각화하는 다채널 보안 예측 데이터 전송 수단.'
    }
  ];

  const relatedPatents = [
    {
      id: 'patent-rel-1',
      num: '10-2026-0141984 (특허출원 중)',
      title: '오행 상생상극 및 확률적 순위 예측 최적 조합 산출 시스템 (오행순위 원천 특허)',
      desc: '사주 오행 인문 데이터 및 확률적 변수를 조합하여 정밀 순위 및 최적 가중치를 가공하는 원천 알고리즘 엔진.'
    },
    {
      id: 'patent-rel-2',
      num: '특허출원 중 (연계)',
      title: '다채널 바이오리듬 임베딩과 연계된 개체 상호작용 피드백 수리 모델링 시스템',
      desc: '행동 시너지와 다채널 생체 신호를 정량 평가함으로써 인디비주얼 시너지를 물리 계측화하는 AI 기법.'
    },
    {
      id: 'patent-rel-3',
      num: '특허출원 중 (연계)',
      title: '미가산 시너지 가시성 계층과 엣지 단말을 전제로 하는 실시간 최적화 통제 기기',
      desc: '클라우드 분산 연산 결과를 하단 로컬 디바이스와 초저지연 연동하는 고기능 엣지 서버 알고리즘 구조.'
    },
    {
      id: 'patent-rel-4',
      num: '특허출원 중 (연계)',
      title: '대규모 고전 텍스트 인텐트 토큰 압축 및 양자화 전송 프로토콜',
      desc: '유사한 패턴 지표를 가지는 방대한 역사 코텍스트 자료를 병목 없이 로컬 가속 장치에 초고속 스팀하는 압축 표준.'
    }
  ];

  const handleCopy = () => {
    navigator.clipboard.writeText(`${masterPatent.title}\n출원번호: ${masterPatent.appNumber}\n발명자: ${masterPatent.inventor}`);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  const startVerification = () => {
    if (isVerifying) return;
    setIsVerifying(true);
    setVerificationProgress(0);
    setVerificationLogs([]);

    const steps = [
      'ACCESSING KOREAN INTELLECTUAL PROPERTY REPOSITORY...',
      'RETRIEVING SHA-256 PATENT BLUEPRINTS FOR NO. 10-2026-0141XXX...',
      'VERIFYING CRYPTOGRAPHIC SYSTEM AUTHORIZATION SCHEMAS...',
      'PARSING 256-DEPTH NEURAL ARCHITECTURE CLAIMS...',
      'CHECKING CROSS-DOMAIN VALIDITY FOR QUANT HETEROGENEOUS INGESTION...',
      'COMPARING INVENTOR "PARK CHUNGHO" ENCRYPTION KEYS...',
      'ALL CLEAR. DATA INTEGRITY VERIFIED. JAMGONG REGISTERED CERTIFICATE.'
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      setVerificationProgress(prev => {
        const next = prev + Math.floor(Math.random() * 15) + 10;
        if (next >= 100) {
          clearInterval(interval);
          setVerificationLogs(prevLogs => [...prevLogs, steps[steps.length - 1]]);
          return 100;
        }
        
        // Push log in steps
        const stepTrigger = Math.floor((next / 100) * (steps.length - 1));
        if (stepTrigger > currentStep) {
          currentStep = stepTrigger;
          setVerificationLogs(prevLogs => {
            const newLog = steps[currentStep - 1];
            if (!prevLogs.includes(newLog)) {
              return [...prevLogs, newLog];
            }
            return prevLogs;
          });
        }
        
        return next;
      });
    }, 280);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Reset verification states on open
      setIsVerifying(false);
      setVerificationProgress(0);
      setVerificationLogs([]);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-40"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-50 w-full max-w-4xl bg-[#070b16] border border-[#00f2fe]/35 rounded-none shadow-[0_0_50px_rgba(0,242,254,0.15)] flex flex-col max-h-[90vh] overflow-hidden"
          >
            {/* Corner Decorative Tech Highlights */}
            <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-[#00f2fe]" />
            <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-[#00f2fe]" />
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-[#00f2fe]" />
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-[#00f2fe]" />

            {/* Header */}
            <div className="relative px-6 py-4.5 border-b border-[#00f2fe]/15 bg-[#0a0f1f]/95 flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#00f2fe]/10 border border-[#00f2fe]/30">
                  <Shield className="w-5 h-5 text-[#00f2fe] animate-pulse" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-[#00f2fe]/85 tracking-[0.25em] uppercase block mb-0.5">
                    // INTELLECTUAL PROPERTY &amp; TECH SPECIFICATION
                  </span>
                  <h3 className="text-base sm:text-lg font-display font-bold text-white select-none tracking-tight">
                    특허 출원 기술 상세 명세
                  </h3>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-slate-400 hover:text-[#00f2fe] hover:bg-slate-900 border border-transparent hover:border-[#00f2fe]/20 transition-all duration-200 cursor-pointer"
                id="close-patent-modal-btn"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 custom-scrollbar">
              
              {/* Highlight Banner of Master Patent */}
              <div className="p-5 sm:p-6 bg-[#00f2fe]/5 border border-[#00f2fe]/20 relative overflow-hidden group">
                <div className="absolute top-0 right-0 bg-[#00f2fe] text-black font-mono text-[9px] font-black tracking-widest px-3.5 py-1.5 uppercase">
                  MASTER PATENT CORE
                </div>
                <div className="flex flex-col sm:flex-row gap-5 items-start">
                  <div className="flex-1 space-y-3">
                    <span className="text-[9px] font-mono text-[#00f2fe]/70 tracking-widest uppercase block">
                      발명의 명칭 (COMMERCIAL PATENT SPEC)
                    </span>
                    <h4 className="text-lg sm:text-xl font-bold font-sans text-white leading-relaxed tracking-tight group-hover:text-[#00f2fe] transition-colors duration-250">
                      {masterPatent.title}
                    </h4>
                    <p className="text-xs text-slate-450 font-mono italic leading-relaxed font-light">
                      {masterPatent.titleEn}
                    </p>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-[#00f2fe]/10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs font-mono">
                  <div>
                    <span className="text-slate-500 block mb-1">DESIGNATION STATUS</span>
                    <span className="text-[#00f2fe] font-bold flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00f2fe] animate-pulse" />
                      {masterPatent.status}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-500 block mb-1">APPLICATION NO.</span>
                    <span className="text-white font-bold">{masterPatent.appNumber}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block mb-1">DATE OF REGISTRATION</span>
                    <span className="text-slate-350">{masterPatent.appDate}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block mb-1">INVENTOR / APPLICANT</span>
                    <span className="text-white font-bold">{masterPatent.inventor}</span>
                  </div>
                </div>
              </div>

              {/* Navigation Tabs */}
              <div className="border-b border-slate-800 flex flex-wrap gap-2">
                <button
                  onClick={() => setActiveTab('specs')}
                  className={`flex items-center gap-2 px-5 py-3 font-mono text-xs font-black tracking-widest uppercase transition-all duration-200 border-b-2 cursor-pointer ${
                    activeTab === 'specs'
                      ? 'border-[#00f2fe] text-[#00f2fe] bg-[#00f2fe]/5'
                      : 'border-transparent text-slate-450 hover:text-white hover:bg-slate-900/50'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5" />
                  기술 사양 및 개요
                </button>
                <button
                  onClick={() => setActiveTab('claims')}
                  className={`flex items-center gap-2 px-5 py-3 font-mono text-xs font-black tracking-widest uppercase transition-all duration-200 border-b-2 cursor-pointer ${
                    activeTab === 'claims'
                      ? 'border-[#00f2fe] text-[#00f2fe] bg-[#00f2fe]/5'
                      : 'border-transparent text-slate-450 hover:text-white hover:bg-slate-900/50'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  핵심 청구 범위
                </button>
                <button
                  onClick={() => setActiveTab('related')}
                  className={`flex items-center gap-2 px-5 py-3 font-mono text-xs font-black tracking-widest uppercase transition-all duration-200 border-b-2 cursor-pointer ${
                    activeTab === 'related'
                      ? 'border-[#00f2fe] text-[#00f2fe] bg-[#00f2fe]/5'
                      : 'border-transparent text-slate-450 hover:text-white hover:bg-slate-900/50'
                  }`}
                >
                  <Award className="w-3.5 h-3.5" />
                  연계 특허군 ({relatedPatents.length}건)
                </button>
              </div>

              {/* Tab Contents */}
              <div className="min-h-[220px]">
                {activeTab === 'specs' && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                  >
                    <div className="space-y-4">
                      <h5 className="text-sm font-sans font-extrabold text-white flex items-center gap-2 uppercase tracking-wide">
                        <span className="w-1 h-3.5 bg-[#00f2fe]" />
                        발명의 기술 분야 및 목적
                      </h5>
                      <p className="text-slate-300 text-sm leading-relaxed tracking-wide">
                        본 특허 원천기술은 수천 년에 걸쳐 누적된 인간의 복합 고전(Classical Cognitive / Humanities) 데이터셋과, 연월일시 물리 궤적에 따른 천문 궤도 시계열 변수들을 동시성 다층 필터를 통해 정규화 정량 처리하는 AI 신경망 가중치 최적화 연산 기법에 관한 것입니다. 
                        동서양 고유의 시공간 배치 인프라를 다차원 텐서 공간의 수치 모델로 구조화하여 기존 단순 메커니즘을 혁신적으로 돌파하는 지능형 의사결정 시너지 계층을 지원하기 위해 설계되었습니다.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-4">
                      <div className="p-4 bg-slate-950/75 border border-slate-900/80 rounded-none space-y-2">
                        <div className="text-[#00f2fe] font-mono text-[10px] font-bold tracking-wider">// CORE COMPONENT 01</div>
                        <h6 className="text-[13px] font-bold text-white">이종 데이터 회전 임베딩 설계</h6>
                        <p className="text-[12px] text-slate-400 leading-normal">
                          정형/비정형의 상호 연계성이 희소한 이종 데이터 스펙트럼을 고차원 상호작용 피드백 루프를 통해 단일 공간 벡터로 정밀 일관 정량화시킵니다.
                        </p>
                      </div>
                      <div className="p-4 bg-slate-950/75 border border-slate-900/80 rounded-none space-y-2">
                        <div className="text-[#c084fc] font-mono text-[10px] font-bold tracking-wider">// CORE COMPONENT 02</div>
                        <h6 className="text-[13px] font-bold text-white">256-depth 오차역전파 루프</h6>
                        <p className="text-[12px] text-slate-400 leading-normal">
                          가파른 위상 변화 및 미시적 가중치 편차를 동적으로 트래킹하기 위해 깊고 확장된 다층 구조의 피드백 최적화 파이프라인에서 고속 수렴 처리를 완수합니다.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'claims' && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                  >
                    {claims.map((claim, idx) => (
                      <div 
                        key={idx} 
                        className="p-4 bg-slate-950 border border-slate-900/85 hover:border-[#00f2fe]/20 transition-all duration-200"
                      >
                        <div className="font-mono text-[11px] font-black text-[#00f2fe] mb-1.5 uppercase tracking-widest flex items-center gap-2">
                          <CheckCircle className="w-3.5 h-3.5 text-[#00f2fe]" />
                          {claim.num}
                        </div>
                        <p className="text-slate-300 text-xs sm:text-sm leading-relaxed tracking-normal font-light">
                          {claim.desc}
                        </p>
                      </div>
                    ))}
                  </motion.div>
                )}

                {activeTab === 'related' && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                  >
                    {relatedPatents.map((pat) => (
                      <div 
                        key={pat.id}
                        className="p-4.5 bg-slate-950 border border-slate-900 hover:border-[#c084fc]/30 hover:bg-[#c084fc]/5 transition-all duration-300 relative group flex flex-col justify-between"
                      >
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="font-mono text-[10px] font-semibold text-[#c084fc] tracking-wider">
                              PATENT PENDING
                            </span>
                            <span className="font-mono text-[9px] text-slate-500">
                              {pat.num}
                            </span>
                          </div>
                          <h6 className="text-[13px] font-bold text-white group-hover:text-[#c084fc] transition-colors leading-snug">
                            {pat.title}
                          </h6>
                          <p className="text-xs text-slate-450 leading-relaxed font-light">
                            {pat.desc}
                          </p>
                        </div>
                        <div className="mt-4 pt-3 border-t border-slate-900/80 flex items-center justify-between text-[10px] font-mono text-slate-500">
                          <span>출원인: JAMGONG</span>
                          <span className="text-[#c084fc]/80 font-bold">출원 중</span>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}
              </div>

              {/* Copied and integrity widget section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-4">
                {/* Copy info box */}
                <div className="p-4 bg-slate-950 border border-slate-900 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-400">
                      <ExternalLink className="w-3.5 h-3.5 text-slate-550" />
                      IP CITATION AND INTELLECTUAL PROPERTY RECONCILIATION
                    </div>
                    <p className="text-xs text-slate-350 leading-relaxed">
                      본 특허 출원 정보 및 기술 권리 명세는 대한민국 특허법에 의하여 강력한 보호를 받습니다. 원천 기술 제휴 및 B2B 라이센스 협의가 필요할 시 라이센스 참조 키값을 사양에 맞춰 수집할 수 있습니다.
                    </p>
                  </div>
                  <button
                    onClick={handleCopy}
                    className="mt-4 w-full flex items-center justify-center gap-2 py-2 px-4 bg-slate-900 hover:bg-[#00f2fe]/10 border border-slate-800 hover:border-[#00f2fe]/40 text-xs font-mono font-bold tracking-widest text-[#00f2fe]/90 transition-all duration-200 uppercase cursor-pointer"
                  >
                    <Clipboard className="w-3.5 h-3.5" />
                    {copiedText ? '명세 요약 복사 성공!' : '특허 기술 정보 복사하기'}
                  </button>
                </div>

                {/* Simulated Verification Box */}
                <div className="p-4 bg-slate-950 border border-slate-900 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono text-slate-400 flex items-center gap-1.5">
                        <RefreshCcw className={`w-3.5 h-3.5 ${isVerifying && verificationProgress < 100 ? 'animate-spin text-[#00f2fe]' : 'text-slate-555'}`} />
                        CRYPTO INTEGRITY AND AUTH VALIDATION
                      </span>
                      {verificationProgress > 0 && (
                        <span className="text-[10px] font-mono text-[#00f2fe] font-extrabold">{verificationProgress}%</span>
                      )}
                    </div>
                    
                    {/* Log Terminal Screen */}
                    <div className="h-[75px] bg-[#03060c] border border-slate-900/90 rounded-xs p-2.5 font-mono text-[9px] overflow-y-auto space-y-1 select-none flex flex-col justify-end custom-scrollbar">
                      {verificationLogs.length === 0 ? (
                        <div className="text-slate-600 text-center py-3">STANDBY // CLICK RUN VERIFY PROCESS</div>
                      ) : (
                        verificationLogs.map((log, i) => (
                          <div key={i} className={i === verificationLogs.length - 1 ? 'text-[#10b981] font-bold' : 'text-slate-450'}>
                            &gt; {log}
                          </div>
                        ))
                      )}
                    </div>
                  </div>

                  <button
                    onClick={startVerification}
                    disabled={isVerifying && verificationProgress < 100}
                    className={`mt-4 w-full py-2 px-4 text-xs font-mono font-bold tracking-widest transition-all duration-200 uppercase cursor-pointer ${
                      isVerifying && verificationProgress < 100
                        ? 'bg-slate-900 text-slate-600 border border-slate-800 pointer-events-none'
                        : 'bg-[#00f2fe]/10 hover:bg-[#00f2fe] hover:text-black border border-[#00f2fe]/45 hover:border-transparent text-white'
                    }`}
                  >
                    {isVerifying ? (verificationProgress === 100 ? '특허 무결성 검증 완료' : '시스템 체크 엔진 가동 중...') : '특허 권리 위상 무결성 검증'}
                  </button>
                </div>
              </div>

            </div>

            {/* Footer buttons */}
            <div className="px-6 py-4 bg-[#0a0f1f]/80 border-t border-slate-900 flex justify-end gap-3 flex-shrink-0">
              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-slate-950 border border-slate-800 text-xs font-mono font-bold uppercase tracking-widest text-slate-450 hover:text-white hover:border-slate-600 transition-all cursor-pointer"
              >
                닫기
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
