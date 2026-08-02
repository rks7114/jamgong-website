import { useState, useEffect, MouseEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, ArrowRight, CheckCircle2, ChevronRight, Menu, X, Cpu, Globe, ArrowDown, Activity, Sparkles, Server, Network, Volume2, VolumeX, Search } from 'lucide-react';
import HeroCanvas from './components/HeroCanvas';
import SystemModal from './components/SystemModal';
import { OracleOrbit, NeuralSyncWaveform, PuppySynergyNetwork, SpeedGauge, HoloProjection } from './components/TechIllustrations';
import { BizCardProps } from './types';
import { audioHumEngine } from './utils/audioHum';
import DataInitializationLoader from './components/DataInitializationLoader';
import PatentDetailModal from './components/PatentDetailModal';
import { JamgongLogo } from './components/JamgongLogo';
import ko from './locales/ko.json';
import en from './locales/en.json';
import jp from './locales/jp.json';

export default function App() {
  const [isInitializing, setIsInitializing] = useState(true);
  const [isPatentModalOpen, setIsPatentModalOpen] = useState(false);
  const [selectedSystem, setSelectedSystem] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [humEnabled, setHumEnabled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const [highlightedElementId, setHighlightedElementId] = useState<string | null>(null);
  const [lang, setLang] = useState<'ko' | 'en' | 'jp'>('ko');

  useEffect(() => {
    const handlePathAndDetectLanguage = () => {
      const path = window.location.pathname;
      if (path.startsWith('/en')) {
        setLang('en');
      } else if (path.startsWith('/jp')) {
        setLang('jp');
      } else {
        setLang('ko');
      }
    };

    handlePathAndDetectLanguage();
    window.addEventListener('popstate', handlePathAndDetectLanguage);
    return () => window.removeEventListener('popstate', handlePathAndDetectLanguage);
  }, []);

  useEffect(() => {
    document.title = 'JAMGONG - AI 기반 데이터 분석 기술 기업';

    const metaDescription = document.querySelector('meta[name="description"]');
    const ogTitle = document.querySelector('meta[property="og:title"]');
    const ogDescription = document.querySelector('meta[property="og:description"]');
    const ogLocale = document.querySelector('meta[property="og:locale"]');
    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    const twitterDescription = document.querySelector('meta[name="twitter:description"]');

    if (lang === 'en') {
      const desc = 'JAMGONG - AI Data Analytics Technology Company. Reconstructing thousands of years of humanities and mathematical data into proprietary predictive algorithms.';
      if (metaDescription) metaDescription.setAttribute('content', desc);
      if (ogTitle) ogTitle.setAttribute('content', 'JAMGONG - AI Data Analytics Technology Company');
      if (ogDescription) ogDescription.setAttribute('content', desc);
      if (ogLocale) ogLocale.setAttribute('content', 'en_US');
      if (twitterTitle) twitterTitle.setAttribute('content', 'JAMGONG - AI Data Analytics Technology Company');
      if (twitterDescription) twitterDescription.setAttribute('content', desc);
    } else if (lang === 'jp') {
      const desc = 'JAMGONG(ジャムゴン) - AIデータ分析技術企業。数千年の人文・数理データを定量化し、 proprietary予測アルゴリズムエンジンとして再構成します。';
      if (metaDescription) metaDescription.setAttribute('content', desc);
      if (ogTitle) ogTitle.setAttribute('content', 'JAMGONG - AIデータ分析技術企業');
      if (ogDescription) ogDescription.setAttribute('content', desc);
      if (ogLocale) ogLocale.setAttribute('content', 'ja_JP');
      if (twitterTitle) twitterTitle.setAttribute('content', 'JAMGONG - AIデータ分析技術企業');
      if (twitterDescription) twitterDescription.setAttribute('content', desc);
    } else {
      // ko
      const desc = 'JAMGONG(잼공) - AI 기반 데이터 분석 기술 기업. 수천 년의 인문·수리 데이터를 정량화하여 독자적인 예측 알고리즘 엔진으로 재구성합니다.';
      if (metaDescription) metaDescription.setAttribute('content', desc);
      if (ogTitle) ogTitle.setAttribute('content', 'JAMGONG - AI 기반 데이터 분석 기술 기업');
      if (ogDescription) ogDescription.setAttribute('content', desc);
      if (ogLocale) ogLocale.setAttribute('content', 'ko_KR');
      if (twitterTitle) twitterTitle.setAttribute('content', 'JAMGONG - AI 기반 데이터 분석 기술 기업');
      if (twitterDescription) twitterDescription.setAttribute('content', desc);
    }
  }, [lang]);

  const changeLanguage = (newLang: 'ko' | 'en' | 'jp') => {
    setLang(newLang);
    const newPath = newLang === 'ko' ? '/' : `/${newLang}`;
    window.history.pushState({}, '', newPath);
  };

  const t = lang === 'en' ? en : lang === 'jp' ? jp : ko;

  const searchableItems = [
    {
      id: 'oracle',
      type: 'solution',
      title: t.cards.oracle.name,
      titleEn: 'JAMGONG ORACLE™',
      desc: t.cards.oracle.desc,
      specs: `${t.cards.oracle.spec1}, ${t.cards.oracle.spec2}, ${t.cards.oracle.spec3}`,
      sectionId: 'business',
    },
    {
      id: 'neutralsync',
      type: 'solution',
      title: t.cards.neutralsync.name,
      titleEn: 'JAMGONG NEURALSYNC™',
      desc: t.cards.neutralsync.desc,
      specs: `${t.cards.neutralsync.spec1}, ${t.cards.neutralsync.spec2}, ${t.cards.neutralsync.spec3}`,
      sectionId: 'business',
    },
    {
      id: 'synergy',
      type: 'solution',
      title: t.cards.synergy.name,
      titleEn: 'JAMGONGTALK™',
      desc: t.cards.synergy.desc,
      specs: `${t.cards.synergy.spec1}, ${t.cards.synergy.spec2}, ${t.cards.synergy.spec3}`,
      sectionId: 'business',
    },
    {
      id: 'holo',
      type: 'solution',
      title: t.cards.holo.name,
      titleEn: 'JAMGONG HOLO™',
      desc: `${t.cards.holo.descHighlight} ${t.cards.holo.descMain} ${t.cards.holo.descSub}`,
      specs: `${t.cards.holo.spec1}, ${t.cards.holo.spec2}, ${t.cards.holo.spec3}`,
      sectionId: 'business',
    },
    {
      id: 'pipeline-ingestion',
      type: 'pipeline',
      title: '고전 빅데이터 수집 레이어',
      titleEn: 'Classic Big-Data Ingestion',
      desc: '수천 년의 인문·천문·수리 역사적 빅데이터 임베딩 토큰',
      specs: '다변량 원형 임베딩 토큰',
      sectionId: 'tech',
    },
    {
      id: 'pipeline-preprocessing',
      type: 'pipeline',
      title: '데이터 전처리 엔진',
      titleEn: 'Data Pre-processing Engine',
      desc: '수리 및 천문 데이터 정량화, multi-threaded parallel streaming 분산 연산',
      specs: '멀티스레드 병렬 분산 스트리밍',
      sectionId: 'tech',
    },
    {
      id: 'pipeline-core',
      type: 'pipeline',
      title: '알고리즘 추론 코어',
      titleEn: 'Inference Core',
      desc: '다층 역전파 신경망을 통한 실시간 가중치 최적화 모델',
      specs: '256-depth 신경망 아키텍처',
      sectionId: 'tech',
    },
    {
      id: 'pipeline-output',
      type: 'pipeline',
      title: 'API 게이트웨이 · SDK',
      titleEn: 'Output Gateway',
      desc: '실시간 가중치 갱신 결과값 및 모델 바이너리 배포 채널',
      specs: 'gRPC / OpenAPI 규격 지원',
      sectionId: 'tech',
    },
    {
      id: 'pipeline-classifier',
      type: 'pipeline',
      title: '멀티 도메인 분류기',
      titleEn: 'Multi-Domain Classifier',
      desc: '개인 성명학, 대기업 신사업, 전동 사금 등 데이터 특성별 타겟 매핑 모듈',
      specs: '다중 도메인 특화 라우팅 알고리즘',
      sectionId: 'tech',
    },
    {
      id: 'pipeline-optimizer',
      type: 'pipeline',
      title: '뉴럴싱크 최적화',
      titleEn: 'NeuralSync Optimizer',
      desc: '의사결정 패턴과 잼공 알고리즘 오차 최소화 피드백 루프 최적화',
      specs: '경사하강법 기반 역전파 학습 엔진',
      sectionId: 'tech',
    },
    {
      id: 'patent-pending-box',
      type: 'patent',
      title: t.techProof.ipBadgeTitle,
      titleEn: 'Intellectual Property Portfolio',
      desc: t.footer.copyright,
      specs: '',
      sectionId: 'tech',
    },
  ];

  const filteredSearchItems = searchQuery.trim() === ''
    ? []
    : searchableItems.filter(item => {
        const query = searchQuery.toLowerCase();
        return (
          item.title.toLowerCase().includes(query) ||
          item.titleEn.toLowerCase().includes(query) ||
          item.desc.toLowerCase().includes(query) ||
          item.specs.toLowerCase().includes(query)
        );
      });

  const handleSearchResultClick = (item: typeof searchableItems[0]) => {
    setSearchQuery('');
    setSearchFocused(false);
    
    if (item.type === 'solution') {
      setSelectedSystem(item.id);
    } else {
      const element = document.getElementById(item.id);
      if (element) {
        const headerOffset = 100;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
        setHighlightedElementId(item.id);
        setTimeout(() => {
          setHighlightedElementId(null);
        }, 4000);
      }
    }
  };

  // Audio hum control handler
  const toggleHum = () => {
    if (humEnabled) {
      audioHumEngine.stop();
      setHumEnabled(false);
    } else {
      audioHumEngine.start();
      setHumEnabled(true);
    }
  };

  // Scroll visibility triggers and header sticky behaviour
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-play ambient hum on first user click action to comply with browser autoplay policies
  useEffect(() => {
    const handleFirstClick = () => {
      audioHumEngine.start();
      setHumEnabled(true);
      window.removeEventListener('click', handleFirstClick);
    };
    window.addEventListener('click', handleFirstClick);
    return () => window.removeEventListener('click', handleFirstClick);
  }, []);

  // Lock body scroll during initialization
  useEffect(() => {
    if (isInitializing) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isInitializing]);

  const businessCards: BizCardProps[] = [
    {
      id: 'oracle',
      tag: 'Predictive Intelligence',
      name: t.cards.oracle.name,
      nameEn: 'JAMGONG ORACLE™',
      desc: t.cards.oracle.desc,
      specs: [t.cards.oracle.spec1, t.cards.oracle.spec2, t.cards.oracle.spec3],
      accentColor: 'shadow-[#00f2fe]/10 border-[#00f2fe]/25 text-[#00f2fe] hover:border-[#00f2fe]/60 hover:shadow-[#00f2fe]/25 bg-[#030712]/90',
    },
    {
      id: 'neutralsync',
      tag: 'Neural Synchronization',
      name: t.cards.neutralsync.name,
      nameEn: 'JAMGONG NEURALSYNC™',
      desc: t.cards.neutralsync.desc,
      specs: [t.cards.neutralsync.spec1, t.cards.neutralsync.spec2, t.cards.neutralsync.spec3],
      accentColor: 'shadow-[#c084fc]/10 border-[#c084fc]/25 text-[#c084fc] hover:border-[#c084fc]/60 hover:shadow-[#c084fc]/25 bg-[#030712]/90',
    },
    {
      id: 'synergy',
      tag: 'Synergy Intelligence',
      name: t.cards.synergy.name,
      nameEn: 'JAMGONGTALK™',
      desc: t.cards.synergy.desc,
      specs: [t.cards.synergy.spec1, t.cards.synergy.spec2, t.cards.synergy.spec3],
      accentColor: 'shadow-[#10b981]/10 border-[#10b981]/25 text-[#10b981] hover:border-[#10b981]/60 hover:shadow-[#10b981]/25 bg-[#030712]/90',
    },
    {
      id: 'holo',
      tag: 'Immersive Interaction',
      name: t.cards.holo.name,
      nameEn: 'JAMGONG HOLO™',
      desc: `${t.cards.holo.descHighlight} ${t.cards.holo.descMain} ${t.cards.holo.descSub}`,
      specs: [t.cards.holo.spec1, t.cards.holo.spec2, t.cards.holo.spec3],
      accentColor: 'shadow-[#38bdf8]/10 border-[#38bdf8]/25 text-[#38bdf8] hover:border-[#38bdf8]/60 hover:shadow-[#38bdf8]/25 bg-[#030712]/90',
    },
  ];

  const handleNavClick = (e: MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      const headerOffset = 64;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
    setMobileMenuOpen(false);
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {isInitializing && (
          <motion.div
            key="initial-loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[100]"
          >
            <DataInitializationLoader onComplete={() => setIsInitializing(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="min-h-screen bg-transparent text-slate-100 overflow-x-hidden selection:bg-[#00f2fe] selection:text-black p-3 sm:p-4 md:p-5 relative">
      {/* 3D 과학·천문·AI 통합 공간 배경 엔진 */}
      <div className="space-bg-container">
        <div className="science-grid" />
        <div className="astronomy-cosmic" />
        <div className="ai-matrix-stream" />
      </div>

      <div className="min-h-screen bg-[#030712]/60 border border-slate-900 relative flex flex-col justify-between overflow-x-hidden">
        {/* Faint mathematical formulas background overlay */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0 opacity-[0.03] sm:opacity-[0.05]">
          <div className="absolute top-[18%] left-[8%] font-mono text-[10px] sm:text-xs text-[#00f2fe] space-y-1">
            <p>dS_t = μ S_t dt + σ S_t dW_t</p>
            <p>iℏ ∂/∂t Ψ(x,t) = [ -ℏ²/2m ∂²/∂x² + V(x) ] Ψ(x,t)</p>
          </div>
          <div className="absolute top-[32%] right-[5%] font-mono text-[10px] sm:text-xs text-[#c084fc] space-y-1 text-right">
            <p>W^(l+1)_ij = W^(l)_ij - η ∂E/∂W_ij</p>
            <p>f(x|μ,σ²) = 1/√(2πσ²) * exp(-(x-μ)²/(2σ²))</p>
          </div>
          <div className="absolute bottom-[35%] left-[6%] font-mono text-[10px] sm:text-xs text-[#10b981] space-y-1">
            <p>∇ × B = μ_0 J + μ_0 ε_0 ∂E/∂t</p>
            <p>H_t = σ(W_hh h_t-1 + W_xh x_t + b_h)</p>
          </div>
          <div className="absolute bottom-[12%] right-[10%] font-mono text-[10px] sm:text-xs text-[#00f2fe] space-y-1 text-right">
            <p>lim (n→∞) (1 + 1/n)^n = e</p>
            <p>R_μν - 1/2 R g_μν + Λ g_μν = 8πG/c⁴ T_μν</p>
          </div>
        </div>

        {/* ── NAV HEADER ── */}
        <nav
          className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:pl-[48px] md:pr-12 h-[76px] md:h-[104px] transition-all duration-300 bg-[rgba(2,8,23,0.94)] backdrop-blur-[18px] border-b border-[rgba(0,217,245,0.22)] shadow-[0_4px_30px_rgba(0,0,0,0.8)] ${
            scrolled ? 'bg-[rgba(2,8,23,0.98)] border-[rgba(0,217,245,0.35)] shadow-[0_8px_35px_rgba(0,0,0,0.95)]' : ''
          }`}
        >
          {/* Logo Area: Seamless connection to header background without box frame */}
          <div className="logo-area flex items-center h-full">
            <div 
              className="cursor-pointer inline-flex items-center group select-none"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <JamgongLogo variant="header" />
            </div>
          </div>

          {/* Desktop Search bar: 390px width, 44px height */}
          <div className="hidden md:block relative w-[390px] mx-6">
            <div className={`relative flex items-center h-[44px] bg-[rgba(3,12,28,0.86)] border rounded-[4px] px-3.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transition-all duration-200 ${
              searchFocused 
                ? 'border-[rgba(0,217,245,0.75)] shadow-[0_0_0_1px_rgba(0,217,245,0.18),0_0_18px_rgba(0,217,245,0.12)]' 
                : 'border-[rgba(0,217,245,0.25)] hover:border-[rgba(0,217,245,0.45)]'
            }`}>
              <Search className="w-4 h-4 text-[#00D9F5]/70 mr-2.5 shrink-0" />
              <input
                type="text"
                placeholder={t.nav.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setTimeout(() => setSearchFocused(false), 250)}
                className="w-full text-[14px] font-sans text-slate-100 bg-transparent focus:outline-hidden placeholder-slate-400 font-medium"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="p-0.5 text-slate-400 hover:text-[#00D9F5] transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Dropdown Results for Search */}
            <AnimatePresence>
              {searchFocused && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.15 }}
                  className="absolute left-0 right-0 top-13 bg-[rgba(3,12,28,0.96)] border border-[rgba(0,217,245,0.35)] shadow-[0_15px_40px_rgba(0,0,0,0.95)] max-h-[350px] overflow-y-auto rounded-[4px] divide-y divide-slate-800/80 z-50 backdrop-blur-xl"
                >
                  {searchQuery.trim() === '' ? (
                    <div className="p-4 text-center text-[11px] font-mono text-slate-400 tracking-wider">
                      {t.nav.searchRecommend}
                    </div>
                  ) : filteredSearchItems.length > 0 ? (
                    filteredSearchItems.map((item) => (
                      <div
                        key={item.id}
                        onMouseDown={() => handleSearchResultClick(item)}
                        className="p-3.5 hover:bg-[rgba(0,217,245,0.1)] transition-colors duration-150 cursor-pointer text-left space-y-1 block"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-white font-sans">{item.title}</span>
                          <span className="text-[9px] font-mono font-black uppercase tracking-wider bg-[#00D9F5]/10 border border-[#00D9F5]/30 px-1.5 py-0.5 text-[#00D9F5]">
                            {item.type === 'solution' ? 'SOLUTION' : item.type === 'patent' ? 'PATENT' : 'PIPELINE'}
                          </span>
                        </div>
                        <div className="text-[10px] font-mono text-slate-400 font-semibold leading-none">{item.titleEn}</div>
                        <div className="text-[11px] font-sans text-slate-300 leading-normal line-clamp-1">{item.desc}</div>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-center text-xs text-slate-400 font-sans">
                      {t.nav.noResults}
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
 
          {/* Desktop Links & Right Controls */}
          <div className="hidden md:flex items-center gap-[42px] h-full">
            <a
              href="#tech"
              onClick={(e) => handleNavClick(e, 'tech')}
              className="relative group py-2 text-[13px] font-mono font-bold uppercase tracking-[0.22em] text-[#C6D0DE] hover:text-white transition-colors duration-200 cursor-pointer"
            >
              {t.nav.tech}
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 group-hover:w-full h-[2px] bg-[#00D9F5] transition-all duration-200 ease-out" />
            </a>
            <a
              href="#business"
              onClick={(e) => handleNavClick(e, 'business')}
              className="relative group py-2 text-[13px] font-mono font-bold uppercase tracking-[0.22em] text-[#C6D0DE] hover:text-white transition-colors duration-200 cursor-pointer"
            >
              {t.nav.business}
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 group-hover:w-full h-[2px] bg-[#00D9F5] transition-all duration-200 ease-out" />
            </a>

            {/* Segmented Control Language Switcher */}
            <div className="bg-[rgba(3,12,28,0.7)] border border-[rgba(0,217,245,0.20)] rounded-[4px] px-3 py-1.5 flex items-center gap-2 text-[12px] font-mono select-none">
              <Globe className="w-3.5 h-3.5 text-[#00D9F5]" />
              <button
                onClick={() => changeLanguage('ko')}
                className={`transition-colors cursor-pointer flex items-center gap-1 ${
                  lang === 'ko' ? 'text-[#00D9F5] font-black drop-shadow-[0_0_6px_rgba(0,217,245,0.5)]' : 'text-[#758198] hover:text-[#E6ECF5]'
                }`}
              >
                {lang === 'ko' && <span className="w-1.5 h-1.5 rounded-full bg-[#00D9F5] shadow-[0_0_6px_#00D9F5]" />}
                KO
              </button>
              <span className="text-slate-700/60 font-light">|</span>
              <button
                onClick={() => changeLanguage('en')}
                className={`transition-colors cursor-pointer flex items-center gap-1 ${
                  lang === 'en' ? 'text-[#00D9F5] font-black drop-shadow-[0_0_6px_rgba(0,217,245,0.5)]' : 'text-[#758198] hover:text-[#E6ECF5]'
                }`}
              >
                {lang === 'en' && <span className="w-1.5 h-1.5 rounded-full bg-[#00D9F5] shadow-[0_0_6px_#00D9F5]" />}
                EN
              </button>
              <span className="text-slate-700/60 font-light">|</span>
              <button
                onClick={() => changeLanguage('jp')}
                className={`transition-colors cursor-pointer flex items-center gap-1 ${
                  lang === 'jp' ? 'text-[#00D9F5] font-black drop-shadow-[0_0_6px_rgba(0,217,245,0.5)]' : 'text-[#758198] hover:text-[#E6ECF5]'
                }`}
              >
                {lang === 'jp' && <span className="w-1.5 h-1.5 rounded-full bg-[#00D9F5] shadow-[0_0_6px_#00D9F5]" />}
                JP
              </button>
            </div>

            {/* CONTACT Button: 148px width, 42px height */}
            <a
              href="mailto:8845rks@gmail.com"
              className="w-[148px] h-[42px] rounded-[6px] bg-transparent border border-[rgba(0,217,245,0.35)] hover:border-[#00D9F5] hover:bg-[rgba(0,217,245,0.10)] hover:-translate-y-[2px] hover:shadow-[0_0_18px_rgba(0,217,245,0.14)] transition-all duration-200 inline-flex items-center justify-center gap-[10px] text-[12px] font-mono font-bold tracking-widest text-[#00D9F5] select-none"
            >
              <Mail className="w-3.5 h-3.5 text-[#00D9F5]" />
              <span>CONTACT</span>
            </a>
          </div>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-300 hover:text-white transition-colors border border-[rgba(0,217,245,0.3)] bg-[rgba(3,12,28,0.8)] rounded-[4px] cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </nav>

        {/* Mobile Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-x-0 top-16 z-40 bg-[#030712]/95 border-b border-[#00f2fe]/20 backdrop-blur-xl px-6 py-6 md:hidden flex flex-col gap-5 text-slate-200 shadow-xl"
            >
              {/* Mobile Search Input */}
              <div className="relative">
                <div className="relative flex items-center bg-[#050811]/90 border border-[#00f2fe]/20 rounded-none px-3.5 py-2">
                  <Search className="w-3.5 h-3.5 text-[#00f2fe]/60 mr-2 shrink-0" />
                  <input
                    type="text"
                    placeholder={t.nav.mobileSearchPlaceholder}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full text-xs font-sans text-slate-100 bg-transparent focus:outline-hidden placeholder-slate-500 font-semibold text-left"
                  />
                  {searchQuery && (
                    <button 
                      onClick={() => setSearchQuery('')}
                      className="p-0.5 text-slate-500 hover:text-[#00f2fe] transition-colors"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
                
                {/* Mobile results */}
                {searchQuery.trim() !== '' && (
                  <div className="mt-2 bg-[#050811]/95 border border-[#00f2fe]/20 rounded-none max-h-[180px] overflow-y-auto divide-y divide-slate-800/80">
                    {filteredSearchItems.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => {
                          handleSearchResultClick(item);
                          setMobileMenuOpen(false);
                        }}
                        className="p-3 hover:bg-[#00f2fe]/10 transition-colors cursor-pointer text-left space-y-0.5"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-white font-sans">{item.title}</span>
                          <span className="text-[7px] font-mono font-bold uppercase tracking-wider bg-[#00f2fe]/10 border border-[#00f2fe]/25 px-1.5 py-0.2 text-[#00f2fe]">
                            {item.type === 'solution' ? 'SOLUTION' : item.type === 'patent' ? 'PATENT' : 'PIPELINE'}
                          </span>
                        </div>
                        <div className="text-[9px] font-mono text-slate-400">{item.titleEn}</div>
                      </div>
                    ))}
                    {filteredSearchItems.length === 0 && (
                      <div className="p-3 text-xs text-slate-400 text-center font-sans">
                        {t.nav.noResults}
                      </div>
                    )}
                  </div>
                )}
              </div>

              <a
                href="#tech"
                onClick={(e) => handleNavClick(e, 'tech')}
                className="text-xs font-mono font-bold uppercase tracking-widest text-[#00f2fe] hover:text-white"
              >
                // {t.nav.tech} (Tech Proof)
              </a>
              <a
                href="#business"
                onClick={(e) => handleNavClick(e, 'business')}
                className="text-xs font-mono font-bold uppercase tracking-widest text-[#c084fc] hover:text-white"
              >
                // {t.nav.business} (Business Units)
              </a>
              <div className="h-px bg-[#00f2fe]/10 my-1" />
              {/* Mobile Language Switcher */}
              <div className="flex items-center justify-center gap-4 text-[11px] font-mono font-bold tracking-wider text-slate-400 py-1">
                <Globe className="w-4 h-4 text-[#00f2fe]" />
                <button
                  onClick={() => { changeLanguage('ko'); setMobileMenuOpen(false); }}
                  className={`px-2 py-1 transition-colors cursor-pointer ${lang === 'ko' ? 'text-[#00f2fe] font-black underline underline-offset-4 decoration-[#00f2fe]/50' : 'hover:text-white'}`}
                >
                  KO
                </button>
                <span className="text-slate-700">|</span>
                <button
                  onClick={() => { changeLanguage('en'); setMobileMenuOpen(false); }}
                  className={`px-2 py-1 transition-colors cursor-pointer ${lang === 'en' ? 'text-[#00f2fe] font-black underline underline-offset-4 decoration-[#00f2fe]/50' : 'hover:text-white'}`}
                >
                  EN
                </button>
                <span className="text-slate-700">|</span>
                <button
                  onClick={() => { changeLanguage('jp'); setMobileMenuOpen(false); }}
                  className={`px-2 py-1 transition-colors cursor-pointer ${lang === 'jp' ? 'text-[#00f2fe] font-black underline underline-offset-4 decoration-[#00f2fe]/50' : 'hover:text-white'}`}
                >
                  JP
                </button>
              </div>
              <div className="h-px bg-[#00f2fe]/10 my-1" />
              <a
                href="mailto:8845rks@gmail.com"
                className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-black bg-[#00f2fe] border border-cyan-400 py-2.5 rounded-none justify-center hover:bg-cyan-400/90 transition-colors"
              >
                <Mail className="w-4 h-4" />
                Contact: 8845rks@gmail.com
              </a>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── HERO SECTION ── */}
        <section
          id="hero"
          className="relative min-h-[92vh] md:min-h-screen flex flex-col items-center justify-center overflow-hidden pt-28 sm:pt-36 pb-16 px-6 scanline-effect"
        >
          <HeroCanvas />

          {/* Multi-layer Composite Lighting behind title */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[480px] bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(0,217,245,0.14)_0%,transparent_70%)] pointer-events-none -z-10" />
          <div className="absolute top-1/3 right-[10%] w-[520px] h-[420px] bg-[radial-gradient(circle_at_center,rgba(154,120,255,0.11)_0%,transparent_70%)] pointer-events-none -z-10" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[320px] bg-[radial-gradient(ellipse_80%_50%_at_50%_100%,rgba(47,128,255,0.10)_0%,transparent_70%)] pointer-events-none -z-10" />

          <div className="relative z-10 text-center max-w-5xl mx-auto space-y-7 md:space-y-8">
            {/* Top Micro-Label Badge Box: 36px height, px-20px */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="relative inline-flex items-center gap-2.5 h-[36px] px-[20px] bg-[rgba(4,16,34,0.76)] border border-[rgba(0,217,245,0.30)] rounded-[4px] select-none overflow-hidden backdrop-blur-md shadow-[0_0_15px_rgba(0,217,245,0.10)]"
            >
              {/* Shimmer light beam along top border */}
              <div className="absolute top-0 left-[-100%] w-[50%] h-[1px] bg-gradient-to-r from-transparent via-[#00D9F5] to-transparent animate-[shimmer_6s_infinite]" />

              <span className="w-2 h-2 rounded-full bg-[#00D9F5] animate-pulse" />
              <span className="text-[12px] font-mono tracking-[2.2px] text-[#00D9F5] uppercase font-bold">
                JAMGONG · DECENTRALIZED ANALYTICS CORE · 2026
              </span>
            </motion.div>

            {/* Main Title Slogan */}
            <div className="space-y-3 md:space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.15 }}
                className="text-[clamp(36px,5.2vw,88px)] font-extrabold leading-[1.05] md:leading-[0.98] tracking-[-1px] md:tracking-[-3px] text-center select-none"
              >
                {/* Line 1 */}
                <span className="block text-slate-100 font-extrabold tracking-tight drop-shadow-[0_8px_30px_rgba(0,0,0,0.42)]">
                  {t.hero.titleLine1}
                </span>

                {/* Line 2 with strict non-wrapping constraint on '기술기업' */}
                <span className="block mt-2 md:mt-3 font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#18E6F4] via-[#54A8FF] to-[#A379FF] drop-shadow-[0_8px_30px_rgba(0,0,0,0.42)] [text-shadow:0_0_24px_rgba(49,164,255,0.08)]">
                  {t.hero.titleLine2.includes("기술기업") ? (
                    <>
                      {t.hero.titleLine2.replace("기술기업", "")}
                      <span className="inline-block whitespace-nowrap">기술기업</span>
                    </>
                  ) : (
                    t.hero.titleLine2
                  )}
                </span>
              </motion.h1>
            </div>
 
            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-[15px] sm:text-[17px] leading-[1.7] text-[#8D9BB0] max-w-[720px] mx-auto mt-[34px] mb-[36px] font-medium"
            >
              {t.hero.subtitle}
            </motion.p>
 
            {/* Action Row - 4 Action Buttons with Height 52px, Min-width 205px */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45 }}
              className="flex flex-col sm:flex-row gap-[14px] justify-center items-center pb-6 flex-wrap"
            >
              {/* Button 1: 기술 검증 보기 (Primary Cyan CTA) */}
              <a
                href="#tech"
                onClick={(e) => handleNavClick(e, 'tech')}
                className="w-full sm:w-auto min-w-[205px] h-[52px] rounded-[4px] px-6 bg-gradient-to-r from-[#00D9F5] via-[#00C2FF] to-[#0099FF] text-[#020817] font-bold text-[14px] font-mono uppercase tracking-[1.5px] hover:-translate-y-[2px] shadow-[0_0_20px_rgba(0,217,245,0.25)] hover:shadow-[0_0_30px_rgba(0,217,245,0.45)] transition-all duration-200 inline-flex items-center justify-center gap-2 select-none"
              >
                <span>{t.hero.btnTech}</span>
                <ChevronRight className="w-4 h-4 text-[#020817]" />
              </a>

              {/* Button 2: 잼공인연사찰 → (준비 중 with Hover Lighting Glow) */}
              <button
                type="button"
                onClick={(e) => e.preventDefault()}
                title={t.hero.oracleTooltip}
                className="group relative overflow-hidden w-full sm:w-auto min-w-[190px] h-[52px] rounded-[4px] px-5 bg-[rgba(7,17,36,0.85)] border border-[rgba(0,217,245,0.35)] text-[#F4F7FC]/90 font-bold text-[14px] font-mono uppercase tracking-[1.5px] hover:border-[#00D9F5] hover:bg-[rgba(0,217,245,0.18)] hover:text-white hover:-translate-y-[2px] shadow-[0_0_0_rgba(0,217,245,0)] hover:shadow-[0_0_25px_rgba(0,217,245,0.55),_inset_0_0_15px_rgba(0,217,245,0.25)] transition-all duration-300 inline-flex items-center justify-center gap-2 select-none cursor-pointer"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-[#00D9F5]/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                <span className="relative z-10">{t.hero.btnInyeon}</span>
                <span className="relative z-10 px-1.5 py-0.5 text-[10px] font-mono bg-[#00D9F5]/15 text-[#00D9F5] border border-[#00D9F5]/30 group-hover:border-[#00D9F5] group-hover:bg-[#00D9F5]/35 group-hover:text-white group-hover:shadow-[0_0_10px_rgba(0,217,245,0.8)] rounded-[3px] font-bold transition-all duration-200">
                  {t.hero.oracleTooltip}
                </span>
              </button>

              {/* Button 3: 잼공톡 → (준비 중 with Hover Lighting Glow) */}
              <button
                type="button"
                onClick={(e) => e.preventDefault()}
                title={t.hero.oracleTooltip}
                className="group relative overflow-hidden w-full sm:w-auto min-w-[190px] h-[52px] rounded-[4px] px-5 bg-[rgba(7,17,36,0.85)] border border-[rgba(16,185,129,0.4)] text-[#F4F7FC]/90 font-bold text-[14px] font-mono uppercase tracking-[1.5px] hover:border-[#10b981] hover:bg-[rgba(16,185,129,0.18)] hover:text-white hover:-translate-y-[2px] shadow-[0_0_0_rgba(16,185,129,0)] hover:shadow-[0_0_25px_rgba(16,185,129,0.55),_inset_0_0_15px_rgba(16,185,129,0.25)] transition-all duration-300 inline-flex items-center justify-center gap-2 select-none cursor-pointer"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-[#10b981]/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                <span className="relative z-10">{t.hero.btnTalk}</span>
                <span className="relative z-10 px-1.5 py-0.5 text-[10px] font-mono bg-[#10b981]/15 text-[#10b981] border border-[#10b981]/30 group-hover:border-[#10b981] group-hover:bg-[#10b981]/35 group-hover:text-white group-hover:shadow-[0_0_10px_rgba(16,185,129,0.8)] rounded-[3px] font-bold transition-all duration-200">
                  {t.hero.oracleTooltip}
                </span>
              </button>

              {/* Button 4: 잼공오라클 → (준비 중 with Hover Lighting Glow) */}
              <button
                type="button"
                onClick={(e) => e.preventDefault()}
                title={t.hero.oracleTooltip}
                className="group relative overflow-hidden w-full sm:w-auto min-w-[190px] h-[52px] rounded-[4px] px-5 bg-[rgba(7,17,36,0.85)] border border-[rgba(0,217,245,0.35)] text-[#F4F7FC]/90 font-bold text-[14px] font-mono uppercase tracking-[1.5px] hover:border-[#00D9F5] hover:bg-[rgba(0,217,245,0.18)] hover:text-white hover:-translate-y-[2px] shadow-[0_0_0_rgba(0,217,245,0)] hover:shadow-[0_0_25px_rgba(0,217,245,0.55),_inset_0_0_15px_rgba(0,217,245,0.25)] transition-all duration-300 inline-flex items-center justify-center gap-2 select-none cursor-pointer"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-[#00D9F5]/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                <span className="relative z-10">{t.hero.btnOracle}</span>
                <span className="relative z-10 px-1.5 py-0.5 text-[10px] font-mono bg-[#00D9F5]/15 text-[#00D9F5] border border-[#00D9F5]/30 group-hover:border-[#00D9F5] group-hover:bg-[#00D9F5]/35 group-hover:text-white group-hover:shadow-[0_0_10px_rgba(0,217,245,0.8)] rounded-[3px] font-bold transition-all duration-200">
                  {t.hero.oracleTooltip}
                </span>
              </button>

              {/* Button 4: 사업 영역 탐색 */}
              <a
                href="#business"
                onClick={(e) => handleNavClick(e, 'business')}
                className="w-full sm:w-auto min-w-[205px] h-[52px] rounded-[4px] px-6 bg-[rgba(7,17,36,0.8)] border border-[rgba(154,120,255,0.5)] text-[#F4F7FC] font-bold text-[14px] font-mono uppercase tracking-[1.5px] hover:border-[#9A78FF] hover:bg-[rgba(154,120,255,0.12)] hover:-translate-y-[2px] hover:shadow-[0_0_20px_rgba(154,120,255,0.25)] transition-all duration-200 inline-flex items-center justify-center gap-2 select-none"
              >
                <span>{t.hero.btnBusiness}</span>
              </a>
            </motion.div>
          </div>

          {/* Scroll Hint */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-[#00D9F5]/60 text-[9px] tracking-[0.25em] font-mono select-none">
            <motion.div 
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
              className="w-px h-10 bg-gradient-to-b from-[#00f0ff] to-transparent"
            />
            SCROLL
          </div>
        </section>

      {/* ── SECTION 2: TECHNOLOGY VALIDATION ── */}
      <section id="tech" className="relative px-6 md:px-12 py-24 md:py-32 bg-[#090d19]/40 border-t border-b border-[#00f0ff]/10">
        <div className="max-w-6xl mx-auto space-y-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-4"
          >
            <div className="text-[#00f0ff] font-mono text-[9px] tracking-[0.25em] uppercase font-bold">
              // 01 . TECHNOLOGY VALIDATION
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold tracking-tight text-white select-none leading-tight">
              {lang === 'ko' ? '4대 핵심 기술' : t.business.title} <br />
              <span className="not-italic font-light text-slate-400">{t.techProof.subtitle}</span>
            </h2>
          </motion.div>

          {/* Patent Counter Badge representing 14 patent cores in futuristic neon styling */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="flex justify-start pt-1 pb-3"
          >
            <div className="patent-counter-badge animate-pulse-glow flex-wrap sm:flex-nowrap gap-x-4 gap-y-2">
              <span className="badge-dot" />
              <span className="badge-text">{t.techProof.ipBadgeTitle}</span>
              <span className="badge-number">{t.techProof.ipBadgeCount}</span>
              <span className="text-slate-300 font-sans font-light tracking-wider text-xs sm:text-sm whitespace-nowrap">
                {t.techProof.ipBadgeSub}
              </span>
            </div>
          </motion.div>

          {/* Patent Certificate Block */}
          <motion.div
            id="patent-pending-box"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className={`relative flex flex-col md:flex-row items-start md:items-center justify-between gap-6 bg-[#0d1326]/80 rounded-none p-8 md:px-9 md:py-8 overflow-hidden transition-all duration-300 group ${
              highlightedElementId === 'patent-pending-box'
                ? 'border-[#00f2fe] ring-2 ring-[#00f2fe]/45 shadow-[0_0_30px_rgba(0,242,254,0.5)] scale-102 z-10'
                : 'border border-[#00f2fe]/20 hover:border-[#00f2fe]/40 shadow-[0_0_20px_rgba(0,242,254,0.05)]'
            }`}
          >
            {/* Fine accent line */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-linear-to-r from-[#00f2fe] to-blue-500" />
            
            <div className="flex items-center gap-5">
              <div className="w-12 h-12 bg-[#050811] border border-[#00f2fe]/20 rounded-none flex items-center justify-center text-xl shadow-xs transition-transform duration-350 group-hover:scale-105">
                📜
              </div>
              <div>
                <div className="text-[9px] font-mono tracking-widest text-[#00f2fe]/65 uppercase mb-1">
                  지식재산권 출원 현황 · Intellectual Property Portfolio
                </div>
                <div className="text-xl sm:text-2xl font-bold font-sans text-white tracking-normal">
                  {t.techProof.certTitle}
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
              <div className="inline-flex items-center justify-center gap-2.5 bg-[#00f2fe]/10 border border-[#00f2fe]/30 rounded-none px-5 py-3 font-mono text-xs text-[#00f2fe] uppercase tracking-widest animate-pulse-glow shadow-[0_0_15px_rgba(0,242,254,0.1)] h-[44px]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#00f2fe] animate-pulse-glow" />
                <span className="font-sans font-extrabold text-xs sm:text-sm">{t.techProof.pending}</span>
              </div>
              
              <button
                onClick={() => setIsPatentModalOpen(true)}
                className="px-5 py-3 bg-transparent hover:bg-[#00f2fe]/10 text-[#00f2fe] border border-[#00f2fe]/45 hover:border-[#00f2fe] font-sans font-extrabold text-xs sm:text-sm tracking-widest transition-all duration-250 cursor-pointer select-none text-center h-[44px] flex items-center justify-center uppercase min-w-[100px]"
              >
                {t.techProof.viewDetail}
              </button>
            </div>
          </motion.div>

          {/* Flow Architecture Overview Diagram */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="bg-[#0b1021]/80 rounded-none p-7 md:p-9 space-y-6 big-box-glow"
          >
            <div className="text-[9px] font-mono text-[#00f0ff] tracking-[0.22em] uppercase font-bold">
              // SYSTEM ARCHITECTURE OVERVIEW
            </div>

            {/* Row 1 pipeline flow */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-3 items-center">
              {/* Box 1: Ingestion - Cyan */}
              <motion.div 
                id="pipeline-ingestion"
                whileHover={{ 
                  y: -8, 
                  scale: 1.04, 
                  boxShadow: "0 15px 30px rgba(0, 242, 254, 0.45), 0 0 15px rgba(0, 242, 254, 0.2)",
                  borderColor: "#00f2fe"
                }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                className={`bg-[#050811] rounded-none p-4.5 text-center space-y-1 transition-all duration-300 group border cursor-pointer ${
                  highlightedElementId === 'pipeline-ingestion'
                    ? 'border-[#00f2fe] ring-2 ring-[#00f2fe]/40 shadow-[0_0_25px_rgba(0,242,254,0.6)] scale-103 z-10'
                    : 'border-[#00f2fe]/25 shadow-[0_0_12px_rgba(0,242,254,0.08)]'
                }`}
              >
                <div className="text-xs font-bold font-sans text-slate-100 group-hover:text-[#00f2fe] group-hover:drop-shadow-[0_0_8px_rgba(0,242,254,0.5)] transition-colors">고전 빅데이터 수집 레이어</div>
                <div className="text-[10px] font-mono text-[#00f2fe]/60 group-hover:text-[#00f2fe]/90 transition-colors">Classic Big-Data Ingestion</div>
              </motion.div>

              {/* Arrow 1 */}
              <div className="text-center text-[#00f2fe]/40 hidden md:block select-none text-lg font-bold animate-pulse">→</div>

              {/* Box 2: Preprocessing - Emerald */}
              <motion.div 
                id="pipeline-preprocessing"
                whileHover={{ 
                  y: -8, 
                  scale: 1.04, 
                  boxShadow: "0 15px 30px rgba(16, 185, 129, 0.45), 0 0 15px rgba(16, 185, 129, 0.2)",
                  borderColor: "#10b981"
                }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                className={`bg-[#050811] rounded-none p-4.5 text-center space-y-1 transition-all duration-300 group border cursor-pointer ${
                  highlightedElementId === 'pipeline-preprocessing'
                    ? 'border-[#10b981] ring-2 ring-[#10b981]/40 shadow-[0_0_25px_rgba(16,185,129,0.6)] scale-103 z-10'
                    : 'border-[#10b981]/25 shadow-[0_0_12px_rgba(16,185,129,0.08)]'
                }`}
              >
                <div className="text-xs font-bold font-sans text-slate-100 group-hover:text-[#10b981] group-hover:drop-shadow-[0_0_8px_rgba(16,185,129,0.5)] transition-colors">데이터 전처리 엔진</div>
                <div className="text-[10px] font-mono text-[#10b981]/60 group-hover:text-[#10b981]/90 transition-colors">Data Pre-processing Engine</div>
              </motion.div>

              {/* Arrow 2 */}
              <div className="text-center text-[#10b981]/40 hidden md:block select-none text-lg font-bold animate-pulse">→</div>

              {/* Box 3: Inference Core - Purple */}
              <motion.div 
                id="pipeline-core"
                whileHover={{ 
                  y: -8, 
                  scale: 1.04, 
                  boxShadow: "0 15px 30px rgba(192, 132, 252, 0.45), 0 0 15px rgba(192, 132, 252, 0.2)",
                  borderColor: "#c084fc"
                }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                className={`bg-[#050811] rounded-none p-4.5 text-center space-y-1 transition-all duration-300 group border cursor-pointer ${
                  highlightedElementId === 'pipeline-core'
                    ? 'border-[#c084fc] ring-2 ring-[#c084fc]/40 shadow-[0_0_25px_rgba(192,132,252,0.6)] scale-103 z-10'
                    : 'border-[#c084fc]/30 shadow-[0_0_12px_rgba(192,132,252,0.08)]'
                }`}
              >
                <div className="text-xs font-bold font-sans text-[#c084fc] group-hover:text-[#d8b4fe] group-hover:drop-shadow-[0_0_8px_rgba(192,132,252,0.5)] transition-colors">알고리즘 추론 코어</div>
                <div className="text-[10px] font-mono text-[#c084fc]/60 group-hover:text-[#c084fc]/90 transition-colors">Inference Core</div>
              </motion.div>
            </div>

            {/* Connect line for md screens */}
            <div className="hidden md:grid grid-cols-5 gap-3 select-none py-1">
              <div className="col-start-5 flex justify-center">
                <motion.div
                  animate={{ 
                    y: [-3, 5, -3],
                    opacity: [0.65, 1, 0.65],
                    scale: [0.95, 1.25, 0.95]
                  }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 1.3, 
                    ease: "easeInOut" 
                  }}
                  className="text-[#c084fc]/80 text-3xl font-black leading-none select-none drop-shadow-[0_0_15px_rgba(192,132,252,0.5)] pointer-events-none"
                >
                  ↓
                </motion.div>
              </div>
            </div>

            {/* Row 2 pipeline flow */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-3 items-center">
              {/* Box 6: NeuralSync Optimizer - Rose */}
              <motion.div 
                id="pipeline-optimizer"
                whileHover={{ 
                  y: -8, 
                  scale: 1.04, 
                  boxShadow: "0 15px 30px rgba(236, 72, 153, 0.45), 0 0 15px rgba(236, 72, 153, 0.2)",
                  borderColor: "#ec4899"
                }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                className={`bg-[#050811] rounded-none p-4.5 text-center space-y-1 transition-all duration-300 group border cursor-pointer ${
                  highlightedElementId === 'pipeline-optimizer'
                    ? 'border-[#ec4899] ring-2 ring-[#ec4899]/40 shadow-[0_0_25px_rgba(236,72,153,0.6)] scale-103 z-10'
                    : 'border-[#ec4899]/30 shadow-[0_0_12px_rgba(236,72,153,0.08)]'
                }`}
              >
                <div className="text-xs font-bold font-sans text-[#ec4899] group-hover:text-[#f472b6] group-hover:drop-shadow-[0_0_8px_rgba(236,72,153,0.5)] transition-colors">뉴럴싱크 최적화</div>
                <div className="text-[10px] font-mono text-[#ec4899]/60 group-hover:text-[#ec4899]/90 transition-colors">NeuralSync Optimizer</div>
              </motion.div>

              {/* Arrow 5 */}
              <div className="text-center text-[#ec4899]/40 hidden md:block select-none text-lg font-bold animate-pulse">←</div>

              {/* Box 5: Multi-Domain Classifier - Blue */}
              <motion.div 
                id="pipeline-classifier"
                whileHover={{ 
                  y: -8, 
                  scale: 1.04, 
                  boxShadow: "0 15px 30px rgba(59, 130, 246, 0.45), 0 0 15px rgba(59, 130, 246, 0.2)",
                  borderColor: "#3b82f6"
                }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                className={`bg-[#050811] rounded-none p-4.5 text-center space-y-1 transition-all duration-300 group border cursor-pointer ${
                  highlightedElementId === 'pipeline-classifier'
                    ? 'border-[#3b82f6] ring-2 ring-[#3b82f6]/40 shadow-[0_0_25px_rgba(59,130,246,0.6)] scale-103 z-10'
                    : 'border-[#3b82f6]/25 shadow-[0_0_12px_rgba(59,130,246,0.08)]'
                }`}
              >
                <div className="text-xs font-bold font-sans text-slate-100 group-hover:text-[#3b82f6] group-hover:drop-shadow-[0_0_8px_rgba(59,130,246,0.5)] transition-colors">멀티 도메인 분류기</div>
                <div className="text-[10px] font-mono text-[#3b82f6]/60 group-hover:text-[#3b82f6]/90 transition-colors">Multi-Domain Classifier</div>
              </motion.div>

              {/* Arrow 4 */}
              <div className="text-center text-[#3b82f6]/40 hidden md:block select-none text-lg font-bold animate-pulse">←</div>

              {/* Box 4: Output Gateway - Amber */}
              <motion.div 
                id="pipeline-output"
                whileHover={{ 
                  y: -8, 
                  scale: 1.04, 
                  boxShadow: "0 15px 30px rgba(245, 158, 11, 0.45), 0 0 15px rgba(245, 158, 11, 0.2)",
                  borderColor: "#f59e0b"
                }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                className={`bg-[#050811] rounded-none p-4.5 text-center space-y-1 transition-all duration-300 group border cursor-pointer ${
                  highlightedElementId === 'pipeline-output'
                    ? 'border-[#f59e0b] ring-2 ring-[#f59e0b]/40 shadow-[0_0_25px_rgba(245,158,11,0.6)] scale-103 z-10'
                    : 'border-[#f59e0b]/25 shadow-[0_0_12px_rgba(245,158,11,0.08)]'
                }`}
              >
                <div className="text-xs font-bold font-sans text-slate-100 group-hover:text-[#f59e0b] group-hover:drop-shadow-[0_0_8px_rgba(245,158,11,0.5)] transition-colors">API 게이트웨이 · SDK</div>
                <div className="text-[10px] font-mono text-[#f59e0b]/60 group-hover:text-[#f59e0b]/90 transition-colors">Output Gateway</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── SECTION 3: BUSINESS 영역 (CORE PROPRIETARY TECHS) ── */}
      <section id="business" className="relative px-6 md:px-12 py-24 md:py-36 bg-[#060913] border-b border-[#00f0ff]/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(192,132,252,0.035)_0%,transparent_50%)] pointer-events-none" />
        <div className="max-w-6xl mx-auto space-y-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-4"
          >
            <div className="text-[#00f0ff] font-mono text-[9px] tracking-[0.25em] uppercase font-bold">
              // 02 . CORE PROPRIETARY TECHNOLOGIES
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold tracking-tight text-white select-none leading-tight">
              {t.business.title} <br />
              <span className="not-italic font-light text-slate-400">{t.business.subtitle}</span>
            </h2>
          </motion.div>

          {/* Grid Cards of technologies */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {businessCards.map((card, idx) => {
              const borderAccent =
                card.id === 'oracle'
                  ? 'before:bg-[#00f2fe] shadow-[0_0_30px_rgba(0,242,254,0.06)] hover:border-[#00f2fe]/50 hover:shadow-[0_0_35px_rgba(0,242,254,0.18)]'
                  : card.id === 'neutralsync'
                  ? 'before:bg-[#c084fc] shadow-[0_0_30px_rgba(192,132,252,0.06)] hover:border-[#c084fc]/50 hover:shadow-[0_0_35px_rgba(192,132,252,0.18)]'
                  : card.id === 'synergy'
                  ? 'before:bg-[#10b981] shadow-[0_0_30px_rgba(16,185,129,0.06)] hover:border-[#10b981]/50 hover:shadow-[0_0_35px_rgba(16,185,129,0.18)]'
                  : 'before:bg-[#38bdf8] shadow-[0_0_30px_rgba(56,189,248,0.06)] hover:border-[#38bdf8]/50 hover:shadow-[0_0_35px_rgba(56,189,248,0.18)]';

              const indicatorDot = 'bg-[#00f2fe] animate-pulse-glow-cyan';

              const cardPatentNo = 
                card.id === 'synergy'
                  ? '10-2026-0141984 (특허출원 중)'
                  : (lang === 'ko' ? '특허출원 중' : lang === 'jp' ? '特許出願中' : 'Patent Pending');

              const matches = 
                searchQuery.trim() === '' || 
                card.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                card.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
                card.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
                card.tag.toLowerCase().includes(searchQuery.toLowerCase()) ||
                card.specs.some(spec => spec.toLowerCase().includes(searchQuery.toLowerCase()));

              const isSearching = searchQuery.trim() !== '';

              return (
                <motion.div
                  key={card.id}
                  id={card.id}
                  initial={{ opacity: 0, y: 35 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.7, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
                  className={`relative bg-[#050811]/90 rounded-none p-8 md:p-9 flex flex-col justify-between overflow-hidden transition-all duration-300 before:content-[""] before:absolute before:top-0 before:left-0 before:right-0 before:h-[3px] ${borderAccent} group ${
                    isSearching 
                      ? matches 
                        ? 'scale-102 border-[#00f2fe] shadow-[0_0_35px_rgba(0,242,254,0.3)] opacity-100 ring-1 ring-[#00f2fe]' 
                        : 'opacity-20 grayscale scale-95'
                      : highlightedElementId === card.id 
                        ? 'scale-105 border-[#00f2fe] shadow-[0_0_45px_rgba(0,242,254,0.45)] ring-2 ring-[#00f2fe] z-10' 
                        : 'border border-[#00f2fe]/10 hover:-translate-y-1.5'
                  }`}
                >
                  <div className="space-y-6">
                    {/* Tag label */}
                    <div className="text-[9px] font-mono tracking-[0.21em] text-slate-400 uppercase flex items-center gap-3 font-bold">
                      <span className="w-4 h-[1px] bg-slate-700" />
                      {card.tag}
                    </div>

                    {/* Integrated custom tech illustration */}
                    <div className="relative pt-1 rounded-none overflow-hidden">
                      {card.id === 'oracle' && <OracleOrbit />}
                      {card.id === 'neutralsync' && <NeuralSyncWaveform />}
                      {card.id === 'synergy' && <PuppySynergyNetwork />}
                      {card.id === 'holo' && <HoloProjection />}
                    </div>

                    <div className="space-y-2">
                      <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider flex items-center justify-between">
                        <span>{lang === 'ko' ? '특허출원' : lang === 'jp' ? '特許出願' : 'Patent Pending'} {cardPatentNo}</span>
                      </div>
                      <div className="flex items-center gap-2 pt-1">
                        <span className="w-2 h-2 rounded-full bg-[#00f2fe] animate-pulse-glow" />
                        <span className="text-xs font-sans font-extrabold text-[#00f2fe] uppercase tracking-wide">{t.techProof.pending}</span>
                      </div>
                      
                      <div className="flex items-center justify-between gap-2 pt-1">
                        <h3 className="text-2xl font-black text-white tracking-tight font-sans">
                          {card.name}
                        </h3>
                        {(card.id === 'oracle' || card.id === 'synergy') && (
                          <span className={`px-2 py-0.5 text-[10px] font-mono font-bold rounded-[3px] select-none border ${
                            card.id === 'synergy' 
                              ? 'bg-[#10b981]/15 text-[#10b981] border-[#10b981]/40' 
                              : 'bg-[#00D9F5]/15 text-[#00D9F5] border-[#00D9F5]/30'
                          }`}>
                            {lang === 'ko' ? '준비 중' : lang === 'jp' ? '準備 中' : 'Coming Soon'}
                          </span>
                        )}
                      </div>
                      <div className="text-xs font-mono text-slate-400 font-semibold tracking-wider">
                        {card.nameEn}
                      </div>
                    </div>

                    <div className="h-px bg-slate-800/60" />

                    {/* Highly highlighted NeuralSync signature or standard description with high-contrast text */}
                    <div className="space-y-4">
                      {card.id === 'holo' ? (
                        <div className="space-y-3 font-sans">
                          <p className="text-sm text-[#00f2fe] font-black leading-relaxed tracking-tight">
                            {t.cards.holo.descHighlight}
                          </p>
                          <p className="text-xs text-slate-300 font-bold leading-relaxed tracking-normal">
                            {t.cards.holo.descMain}
                          </p>
                          <p className="text-xs text-slate-400 font-semibold leading-relaxed tracking-normal">
                            {t.cards.holo.descSub}
                          </p>
                        </div>
                      ) : (
                        <p className="text-sm text-slate-100 font-extrabold leading-relaxed tracking-tight">
                          {card.desc}
                        </p>
                      )}
                      {card.id === 'neutralsync' && (
                        <div className="p-4 bg-[#c084fc]/10 border border-[#c084fc]/45 rounded-none text-xs font-sans font-black leading-relaxed text-white shadow-[0_0_15px_rgba(192,132,252,0.15)]">
                          ★ <span className="text-[#c084fc] drop-shadow-[0_0_8px_rgba(192,132,252,0.7)]">{t.cards.neutralsync.signature}</span>
                        </div>
                      )}
                      {card.id === 'synergy' && (
                        <div className="p-3.5 bg-[#10b981]/10 border border-[#10b981]/45 rounded-[4px] text-xs font-sans font-black leading-relaxed text-white flex items-center justify-between shadow-[0_0_15px_rgba(16,185,129,0.15)]">
                          <div className="flex items-center gap-2">
                            <span className="text-[#10b981] drop-shadow-[0_0_6px_rgba(16,185,129,0.8)]">★</span>
                            <span className="text-slate-100 font-bold">
                              {lang === 'ko' ? '반려견 행동 의미·감정 추정 AI 서비스' : lang === 'jp' ? '愛犬行動意味·感情推定AIサービス' : 'Canine Behavior & Emotion AI Service'}
                            </span>
                          </div>
                          <span className="px-2 py-0.5 text-[10px] font-mono bg-[#10b981]/20 text-[#10b981] border border-[#10b981]/40 rounded-[3px] font-bold shrink-0">
                            {lang === 'ko' ? '준비 중' : lang === 'jp' ? '準備 中' : 'Coming Soon'}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Specifications specs list with high-luminance neon cyan-blue styling */}
                    <div className="space-y-2 pb-4">
                      {card.specs.map((spec, specIdx) => (
                        <div key={specIdx} className="flex items-center gap-3 font-sans text-xs text-[#00f2fe] font-black tracking-normal uppercase bg-[#00f2fe]/5 border border-[#00f2fe]/20 px-4 py-3 rounded-none shadow-[0_0_12px_rgba(0,242,254,0.12)]">
                          <span className="text-[#00f2fe] drop-shadow-[0_0_6px_#00f2fe] animate-[pulse_1.2s_infinite]">▶</span>
                          {spec}
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedSystem(card.id)}
                    className="w-full flex items-center justify-center gap-2 py-3 border border-[#00f2fe]/20 text-[#00f2fe] font-mono font-bold text-[10px] tracking-widest uppercase transition-all duration-200 cursor-pointer bg-[#050811] hover:bg-white hover:text-black hover:border-white shadow-[0_4px_10px_rgba(0,0,0,0.2)]"
                  >
                    System Enter
                    <ChevronRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                  </button>
                </motion.div>
              );
            })}
          </div>

          {/* ── Master Pipeline Tracking Registry (with speedometer gauges!) ── */}
          <div className="border-t border-slate-900 pt-16 space-y-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1.5">
                <span className="text-[#00f2fe] font-mono text-[8px] tracking-[0.25em] font-bold block">// 03 . SOLUTION PORTFOLIO</span>
                <h3 className="text-xl font-bold text-white font-display uppercase tracking-wider">
                  {t.portfolio.title}
                </h3>
              </div>
              <div className="flex items-center gap-2 px-3 py-1 bg-[#00f2fe]/5 border border-[#00f2fe]/25 rounded-none text-[8.5px] font-mono text-[#00f2fe] uppercase tracking-widest">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00f2fe] animate-pulse" />
                {t.portfolio.badge}
              </div>
            </div>

            {/* Infinite Marquee Stream with dual-copy seamless loop and hover pause */}
            <div className="relative overflow-hidden w-full py-4 bg-[#050811]/30 border border-slate-900">
              {/* Soft gradient edge fade covers for high-end look */}
              <div className="absolute top-0 bottom-0 left-0 w-24 bg-gradient-to-r from-[#030712] via-[#030712]/50 to-transparent pointer-events-none z-10" />
              <div className="absolute top-0 bottom-0 right-0 w-24 bg-gradient-to-l from-[#030712] via-[#030712]/50 to-transparent pointer-events-none z-10" />

              <div className="animate-marquee-stream flex items-center gap-4">
                {(() => {
                  const nodes = [
                    { code: "CORE AI-01", label: t.portfolio.cards.coreAi01, patent: t.portfolio.patentNoLabel, color: "cyan" },
                    { code: "QUANT-01", label: t.portfolio.cards.quant01, patent: t.portfolio.patentNoLabel, color: "purple" },
                    { code: "QUANT-02", label: t.portfolio.cards.quant02, patent: t.portfolio.patentNoLabel, color: "green" },
                    { code: "CORE AI-02", label: t.portfolio.cards.coreAi02, patent: t.portfolio.patentNoLabel, color: "cyan" },
                    { code: "CORE AI-03", label: t.portfolio.cards.coreAi03, patent: t.portfolio.patentNoLabel, color: "purple" },
                    { code: "SYSTEM-01", label: t.portfolio.cards.system01, patent: t.portfolio.patentNoLabel, color: "green" },
                    { code: "SYSTEM-02", label: t.portfolio.cards.system02, patent: t.portfolio.patentNoLabel, color: "cyan" },
                    { code: "CORE AI-04", label: t.portfolio.cards.coreAi04, patent: t.portfolio.patentNoLabel, color: "purple" },
                    { code: "API/BIO-01", label: t.portfolio.cards.apiBio01, patent: t.portfolio.patentNoLabel, color: "green" },
                    { code: "QUANT-03", label: t.portfolio.cards.quant03, patent: t.portfolio.patentNoLabel, color: "cyan" },
                    { code: "QUANT-04", label: t.portfolio.cards.quant04, patent: t.portfolio.patentNoLabel, color: "purple" },
                    { code: "QUANT-05", label: t.portfolio.cards.quant05, patent: t.portfolio.patentNoLabel, color: "green" },
                    { code: "SYSTEM-03", label: t.portfolio.cards.system03, patent: t.portfolio.patentNoLabel, color: "cyan" },
                    { code: "SYSTEM-04", label: t.portfolio.cards.system04, patent: t.portfolio.patentNoLabel, color: "purple" },
                    { code: "IMMERSIVE-01", label: t.portfolio.cards.immersive01, patent: t.portfolio.patentNoLabel, color: "cyan" },
                    { code: "SYNERGY-RANK-01", label: t.portfolio.cards.synergyRank01, patent: "10-2026-0141984 (특허출원 중)", color: "purple" }
                  ];
                  return nodes.concat(nodes).map((node, index, arr) => (
                    <div key={index} className="flex items-center gap-4 flex-shrink-0">
                      <SpeedGauge code={node.code} label={node.label} patent={node.patent} status={t.portfolio.pending} color={node.color} index={index} />
                      {index < arr.length - 1 && (
                        <div className="flex items-center text-[#00f2fe] font-mono text-[24px] font-black select-none px-4 animate-[pulse_1.6s_infinite] drop-shadow-[0_0_12px_rgba(0,242,254,0.9)]">&gt;&gt;</div>
                      )}
                    </div>
                  ));
                })()}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="system-footer border-t border-[#00f2fe]/20 bg-[#050811] px-6 md:px-12 py-10 md:py-14 relative z-10">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8 w-full">
          <div className="footer-left flex flex-col items-center lg:items-start space-y-2 font-sans">
            <div 
              className="brand-logo !text-2xl font-black text-white cursor-pointer select-none tracking-tight hover:text-[#00f2fe] transition-colors"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              JAMGONG
            </div>
            <div className="text-xs font-bold text-slate-200 tracking-wide pt-1">{t.footer.companyInfo}</div>
            <div className="text-xs text-slate-300 font-medium">{t.footer.researchInst}</div>
            <div className="text-xs text-slate-400 font-normal">{t.footer.researchScope}</div>
            <div className="text-[11px] text-slate-500 font-medium pt-2">{t.footer.copyright}</div>
          </div>

          <div className="audio-control flex-shrink-0">
            <button
              onClick={toggleHum}
              className={`flex items-center gap-3 px-5 py-3 border text-xs font-mono font-black tracking-wider uppercase transition-all duration-350 select-none cursor-pointer rounded-md ${
                humEnabled
                  ? 'bg-[#00f2fe]/10 border-[#00f2fe]/60 text-[#00f2fe] shadow-[0_0_18px_rgba(0,242,254,0.35)]'
                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white hover:border-slate-600'
              }`}
            >
              <div className="relative flex h-2.5 w-2.5">
                {humEnabled && (
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00f2fe] opacity-75"></span>
                )}
                <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${humEnabled ? 'bg-[#00f2fe]' : 'bg-slate-600'}`}></span>
              </div>
              <span className="hum-status">
                SUPERCOMPUTING HUM: {humEnabled ? "ACTIVE" : "MUTED"}
              </span>
              {humEnabled ? (
                <Volume2 className="w-4 h-4 text-[#00f2fe] animate-[pulse_1s_infinite]" />
              ) : (
                <VolumeX className="w-4 h-4 text-slate-500" />
              )}
            </button>
          </div>
        </div>
      </footer>

      {/* ── MODALS ── */}
      <AnimatePresence>
        {selectedSystem && (
          <SystemModal
            systemId={selectedSystem}
            onClose={() => setSelectedSystem(null)}
          />
        )}
      </AnimatePresence>

      <PatentDetailModal
        isOpen={isPatentModalOpen}
        onClose={() => setIsPatentModalOpen(false)}
      />
      </div>
    </div>
  </>
  );
}
