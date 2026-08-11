import { useState, useEffect, useRef, MouseEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, ArrowRight, CheckCircle2, ChevronRight, ChevronDown, ExternalLink, Menu, X, Cpu, Globe, ArrowDown, Activity, Sparkles, Server, Network, Volume2, VolumeX, Search } from 'lucide-react';
import HeroCanvas, { HeroHoverMode } from './components/HeroCanvas';
import SystemModal from './components/SystemModal';
import { OracleOrbit, NeuralSyncWaveform, PuppySynergyNetwork, SpeedGauge, HoloProjection, DataFlowArrowRight, DataFlowArrowLeft, DataFlowArrowDown } from './components/TechIllustrations';
import { BizCardProps } from './types';
import { audioHumEngine } from './utils/audioHum';
import DataInitializationLoader from './components/DataInitializationLoader';
import PatentDetailModal from './components/PatentDetailModal';
import WaitlistModal from './components/WaitlistModal';
import { JamgongLogo } from './components/JamgongLogo';
import ko from './locales/ko.json';
import en from './locales/en.json';
import jp from './locales/jp.json';

export default function App() {
  const [isInitializing, setIsInitializing] = useState(true);
  const [isPatentModalOpen, setIsPatentModalOpen] = useState(false);
  const [isWaitlistModalOpen, setIsWaitlistModalOpen] = useState(false);
  const [waitlistServiceId, setWaitlistServiceId] = useState<'inyeon' | 'talk' | 'oracle' | string>('inyeon');
  const [selectedSystem, setSelectedSystem] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [familyMenuOpen, setFamilyMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [humEnabled, setHumEnabled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const [highlightedElementId, setHighlightedElementId] = useState<string | null>(null);
  const [lang, setLang] = useState<'ko' | 'en' | 'jp'>('ko');
  const [heroHoverMode, setHeroHoverMode] = useState<HeroHoverMode>('default');

  const searchInputRef = useRef<HTMLInputElement | null>(null);

  // Keyboard shortcut '/' to focus search input
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
        e.preventDefault();
        searchInputRef.current?.focus();
        setSearchFocused(true);
      }
    };
    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, []);

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
      keywords: '시계열, 사주, 천문, 통계, 다변수, 오라클, time-series, saju, oracle, astronomy, 命理, 天文, 時系列',
      sectionId: 'business',
    },
    {
      id: 'neutralsync',
      type: 'solution',
      title: t.cards.neutralsync.name,
      titleEn: 'JAMGONG NEURALSYNC™',
      desc: t.cards.neutralsync.desc,
      specs: `${t.cards.neutralsync.spec1}, ${t.cards.neutralsync.spec2}, ${t.cards.neutralsync.spec3}`,
      keywords: '시계열, 뉴럴싱크, 메타학습, 어텐션, XAI, 패턴 분석, time-series, neuralsync, attention, 時系列',
      sectionId: 'business',
    },
    {
      id: 'synergy',
      type: 'solution',
      title: t.cards.synergy.name,
      titleEn: 'JAMGONGTALK™',
      desc: t.cards.synergy.desc,
      specs: `${t.cards.synergy.spec1}, ${t.cards.synergy.spec2}, ${t.cards.synergy.spec3}`,
      keywords: '반려견, 개, 강아지, 행동, 감정, 잼공톡, synergy, talk, puppy, dog, pet, 임베딩, 愛犬, 犬',
      sectionId: 'business',
    },
    {
      id: 'holo',
      type: 'solution',
      title: t.cards.holo.name,
      titleEn: 'JAMGONG HOLO™',
      desc: `${t.cards.holo.descHighlight} ${t.cards.holo.descMain} ${t.cards.holo.descSub}`,
      specs: `${t.cards.holo.spec1}, ${t.cards.holo.spec2}, ${t.cards.holo.spec3}`,
      keywords: '홀로그램, 3D, 캐릭터, 시선, 온디바이스, holo, hologram, 3d, 광학, ホログラム',
      sectionId: 'business',
    },
    {
      id: 'pipeline-ingestion',
      type: 'pipeline',
      title: '고전 빅데이터 수집 레이어',
      titleEn: 'Classic Big-Data Ingestion',
      desc: '수천 년의 인문·천문·수리 역사적 빅데이터 임베딩 토큰',
      specs: '다변량 원형 임베딩 토큰',
      keywords: '수집, 인문, 천문, 수리, 임베딩',
      sectionId: 'tech',
    },
    {
      id: 'pipeline-preprocessing',
      type: 'pipeline',
      title: '데이터 전처리 엔진',
      titleEn: 'Data Pre-processing Engine',
      desc: '수리 및 천문 데이터 정량화, multi-threaded parallel streaming 분산 연산',
      specs: '멀티스레드 병렬 분산 스트리밍',
      keywords: '전처리, 분산연산, 정량화',
      sectionId: 'tech',
    },
    {
      id: 'pipeline-core',
      type: 'pipeline',
      title: '알고리즘 추론 코어',
      titleEn: 'Inference Core',
      desc: '다층 역전파 신경망을 통한 실시간 가중치 최적화 모델',
      specs: '256-depth 신경망 아키텍처',
      keywords: '알고리즘, 추론, 신경망, 가중치',
      sectionId: 'tech',
    },
    {
      id: 'pipeline-output',
      type: 'pipeline',
      title: 'API 게이트웨이 · SDK',
      titleEn: 'Output Gateway',
      desc: '실시간 가중치 갱신 결과값 및 모델 바이너리 배포 채널',
      specs: 'gRPC / OpenAPI 규격 지원',
      keywords: 'API, 게이트웨이, SDK, gRPC, OpenAPI',
      sectionId: 'tech',
    },
    {
      id: 'pipeline-classifier',
      type: 'pipeline',
      title: '멀티 도메인 분류기',
      titleEn: 'Multi-Domain Classifier',
      desc: '개인 성명학, 대기업 신사업, 전동 사금 등 데이터 특성별 타겟 매핑 모듈',
      specs: '다중 도메인 특화 라우팅 알고리즘',
      keywords: '분류기, 도메인, 성명학, 사금',
      sectionId: 'tech',
    },
    {
      id: 'pipeline-optimizer',
      type: 'pipeline',
      title: '뉴럴싱크 최적화',
      titleEn: 'NeuralSync Optimizer',
      desc: '의사결정 패턴과 잼공 알고리즘 오차 최소화 피드백 루프 최적화',
      specs: '경사하강법 기반 역전파 학습 엔진',
      keywords: '최적화, 피드백, 오차, 경사하강법',
      sectionId: 'tech',
    },
    {
      id: 'patent-pending-box',
      type: 'patent',
      title: t.techProof.ipBadgeTitle,
      titleEn: 'Intellectual Property Portfolio',
      desc: t.footer.copyright,
      specs: '14개 특허 출원 완료',
      keywords: '특허, 출원, 지식재산권, patent, IP',
      sectionId: 'tech',
    },
    {
      id: 'patent-coreAi01',
      type: 'patent',
      title: 'CORE AI-01 · ' + t.portfolio.cards.coreAi01,
      titleEn: 'Natural Language Index & Ephemeris Transit Prediction System',
      desc: '자연어 지수 분석 및 천체력 트랜짓 결합 예측 시스템',
      specs: '특허출원 중',
      keywords: '시계열, 천체, 트랜짓, 자연어, 지수, transits',
      sectionId: 'tech',
    },
    {
      id: 'patent-quant01',
      type: 'patent',
      title: 'QUANT-01 · ' + t.portfolio.cards.quant01,
      titleEn: 'Multi-Period Signal Fusion System',
      desc: '다중 주기 신호 융합 및 동적 가중치 산출 조합 예측 시스템',
      specs: '특허출원 중',
      keywords: '신호, 시계열, 다중주기, 조합예측',
      sectionId: 'tech',
    },
    {
      id: 'patent-quant02',
      type: 'patent',
      title: 'QUANT-02 · ' + t.portfolio.cards.quant02,
      titleEn: 'Dynamic Environment Time-Series Pattern Analysis System',
      desc: '동적 환경 시계열 패턴 분석 예측 지능형 시스템',
      specs: '특허출원 중',
      keywords: '시계열, 패턴, 동적환경, 지능형, time-series',
      sectionId: 'tech',
    },
    {
      id: 'patent-coreAi02',
      type: 'patent',
      title: 'CORE AI-02 · ' + t.portfolio.cards.coreAi02,
      titleEn: 'Saju Five-Elements & Cosmic Energy Integration System',
      desc: '사주 오행 상생상극 및 천체 에너지 통합 성명 연산 시스템',
      specs: '특허출원 중',
      keywords: '사주, 오행, 천체, 성명, 에너지, 상생상극, saju',
      sectionId: 'tech',
    },
    {
      id: 'patent-coreAi03',
      type: 'patent',
      title: 'CORE AI-03 · ' + t.portfolio.cards.coreAi03,
      titleEn: 'Multi-Heterogeneous Data Weight Learning Optimization System',
      desc: '다중 이질 데이터 가중치 학습 최적화 의사결정 시스템',
      specs: '특허출원 중',
      keywords: '의사결정, 가중치, 이질 데이터',
      sectionId: 'tech',
    },
    {
      id: 'patent-system01',
      type: 'patent',
      title: 'SYSTEM-01 · ' + t.portfolio.cards.system01,
      titleEn: 'Environmental Energy Flow Optimization System',
      desc: '다차원 환경 에너지 흐름 거주 공간 최적화 분석 시스템',
      specs: '특허출원 중',
      keywords: '공간, 에너지, 다차원, 거주공간',
      sectionId: 'tech',
    },
    {
      id: 'patent-system02',
      type: 'patent',
      title: 'SYSTEM-02 · ' + t.portfolio.cards.system02,
      titleEn: 'Biorhythm-Based Predictive Spatial Control Infrastructure',
      desc: '생체 리듬 기반 예측적 공간 최적화 통합 제어 인프라',
      specs: '특허출원 중',
      keywords: '생체, 리듬, 공간, 제어',
      sectionId: 'tech',
    },
    {
      id: 'patent-coreAi04',
      type: 'patent',
      title: 'CORE AI-04 · ' + t.portfolio.cards.coreAi04,
      titleEn: 'Multi-Modal Bio-Signal Emotion Synchronization Inference System',
      desc: '다중 모달 생체 신호 기반 감성 동기화 지수 추론 시스템',
      specs: '특허출원 중',
      keywords: '생체, 감성, 동기화, 모달',
      sectionId: 'tech',
    },
    {
      id: 'patent-apiBio01',
      type: 'patent',
      title: 'API/BIO-01 · ' + t.portfolio.cards.apiBio01,
      titleEn: 'Real-Time Ephemeris Transit Lifecycle Indicator System',
      desc: '천체력 실시간 트랜짓 연산 라이프 사이클 지표 생성 시스템',
      specs: '특허출원 중',
      keywords: '천체, 트랜짓, 라이프사이클',
      sectionId: 'tech',
    },
    {
      id: 'patent-quant03',
      type: 'patent',
      title: 'QUANT-03 · ' + t.portfolio.cards.quant03,
      titleEn: 'Multi-Bio Environmental Fusion State Prediction System',
      desc: '다중 생체 환경 데이터 융합 개체 상태 예측 처리 시스템',
      specs: '특허출원 중',
      keywords: '생체, 환경, 상태예측',
      sectionId: 'tech',
    },
    {
      id: 'patent-quant04',
      type: 'patent',
      title: 'QUANT-04 · ' + t.portfolio.cards.quant04,
      titleEn: 'External Variable Probabilistic Ranking Optimal Combination System',
      desc: '외부 변수 연동 확률적 순위 예측 최적 조합 산출 시스템',
      specs: '특허출원 중',
      keywords: '확률, 순위, 외부변수',
      sectionId: 'tech',
    },
    {
      id: 'patent-quant05',
      type: 'patent',
      title: 'QUANT-05 · ' + t.portfolio.cards.quant05,
      titleEn: 'Time-Series Pattern Learning Real-Time Visualization System',
      desc: '시계열 패턴 학습 동적 가중치 조정 실시간 시각화 시스템',
      specs: '특허출원 중',
      keywords: '시계열, 패턴, 시각화, 가중치, time-series',
      sectionId: 'tech',
    },
    {
      id: 'patent-system03',
      type: 'patent',
      title: 'SYSTEM-03 · ' + t.portfolio.cards.system03,
      titleEn: 'Electric Drill-Driven Spiral Placer Gold Mining System',
      desc: '전동 드릴 구동형 나선식 사금 채취 시스템',
      specs: '특허출원 중',
      keywords: '사금, 전동드릴, 나선식, 채취',
      sectionId: 'tech',
    },
    {
      id: 'patent-system04',
      type: 'patent',
      title: 'SYSTEM-04 · ' + t.portfolio.cards.system04,
      titleEn: 'Canine Behavior Text Multi-Channel Embedding System',
      desc: '반려견 행동 서술 텍스트 다중 채널 임베딩 추론 시스템',
      specs: '특허출원 중',
      keywords: '반려견, 개, 강아지, 행동, 임베딩, dog, puppy, pet',
      sectionId: 'tech',
    },
    {
      id: 'patent-immersive01',
      type: 'patent',
      title: 'IMMERSIVE-01 · ' + t.portfolio.cards.immersive01,
      titleEn: 'Gaze Tracking Based Hologram Display System',
      desc: '사용자 시선 추적 기반 홀로그램 디스플레이 시스템',
      specs: '특허출원 중',
      keywords: '홀로그램, 시선, 디스플레이, 3D, holo, hologram',
      sectionId: 'tech',
    },
    {
      id: 'patent-synergyRank01',
      type: 'patent',
      title: 'SYNERGY-RANK-01 · ' + t.portfolio.cards.synergyRank01,
      titleEn: 'Five-Elements Directional Synergy Ranking System',
      desc: '오행 기반 방향성 관계행렬과 편차 감쇠형 비가산 시너지 연산 순위화 시스템',
      specs: '특허출원 10-2026-0141984',
      keywords: '오행, 사주, 시너지, 관계행렬',
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
          item.specs.toLowerCase().includes(query) ||
          (item.keywords && item.keywords.toLowerCase().includes(query))
        );
      });

  const handleSearchResultClick = (item: typeof searchableItems[0]) => {
    setSearchQuery('');
    setSearchFocused(false);
    
    const element = document.getElementById(item.id);
    if (element) {
      const headerOffset = 104;
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
          className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:pl-[48px] md:pr-12 transition-all duration-300 bg-[rgba(5,10,20,0.72)] border-b border-[#00f2fe]/20 ${
            scrolled
              ? 'h-[64px] backdrop-blur-[16px] border-[#00f2fe]/35 shadow-[0_12px_32px_rgba(0,0,0,0.70),0_0_28px_rgba(34,211,238,0.12),inset_0_1px_0_rgba(255,255,255,0.08)]'
              : 'h-[80px] backdrop-blur-[12px] shadow-[0_8px_24px_rgba(0,0,0,0.45),0_0_24px_rgba(34,211,238,0.08),inset_0_1px_0_rgba(255,255,255,0.06)]'
          }`}
        >
          {/* Top 2px Cyan -> Purple Gradient Hairline */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#00f2fe] via-[#818cf8] to-[#c084fc] z-10" />

          {/* Logo Area & HQ Caption */}
          <div className="logo-area flex items-center h-full gap-3.5">
            <div 
              className="cursor-pointer inline-flex items-center group select-none"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <JamgongLogo variant="header" />
            </div>
            <div className="hidden sm:flex items-center border-l border-white/15 pl-3.5 h-4.5">
              <span className="font-mono text-[10px] text-white/40 tracking-[0.2em] font-bold uppercase select-none">
                HEADQUARTERS · SEOUL
              </span>
            </div>
          </div>

          {/* Desktop Search bar: 340px width (10% reduced for padding math), shortcut / hint */}
          <div className="hidden md:block relative w-[340px] mx-4">
            <div className={`relative flex items-center h-[42px] bg-[#050a14]/90 border rounded-[4px] px-3.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transition-all duration-200 ${
              searchFocused 
                ? 'border-[#00f2fe]/75 shadow-[0_0_0_1px_rgba(0,242,254,0.18),0_0_12px_rgba(0,242,254,0.12)]' 
                : 'border-[#00f2fe]/25 hover:border-[#00f2fe]/45'
            }`}>
              <Search className="w-4 h-4 text-[#00f2fe]/70 mr-2.5 shrink-0" />
              <input
                ref={searchInputRef}
                type="text"
                placeholder={t.nav.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && filteredSearchItems.length > 0) {
                    handleSearchResultClick(filteredSearchItems[0]);
                  }
                }}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setTimeout(() => setSearchFocused(false), 250)}
                className="w-full text-[13px] font-sans text-slate-100 bg-transparent focus:outline-hidden placeholder-slate-400 font-medium"
              />
              <kbd className="hidden lg:inline-block px-1.5 py-0.5 text-[9px] font-mono text-slate-400 bg-slate-800/80 border border-slate-700/60 rounded select-none ml-1">
                /
              </kbd>
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="p-0.5 ml-1 text-slate-400 hover:text-[#00f2fe] transition-colors"
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
                  className="absolute left-0 right-0 top-12 bg-[#050a14]/96 border border-[#00f2fe]/35 shadow-[0_15px_40px_rgba(0,0,0,0.95)] max-h-[350px] overflow-y-auto rounded-[4px] divide-y divide-slate-800/80 z-50 backdrop-blur-xl"
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
                        className="p-3.5 hover:bg-[#00f2fe]/10 transition-colors duration-150 cursor-pointer text-left space-y-1 block"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-white font-sans">{item.title}</span>
                          <span className="text-[9px] font-mono font-black uppercase tracking-wider bg-[#00f2fe]/10 border border-[#00f2fe]/30 px-1.5 py-0.5 text-[#00f2fe]">
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
          <div className="hidden md:flex items-center gap-6 lg:gap-8 h-full">
            <a
              href="#tech"
              onClick={(e) => handleNavClick(e, 'tech')}
              className="relative group py-2 text-[12px] font-mono font-bold uppercase tracking-[0.2em] text-[#C6D0DE] hover:text-white transition-colors duration-200 cursor-pointer"
            >
              {t.nav.tech}
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 group-hover:w-full h-[2px] bg-[#00f2fe] transition-all duration-200 ease-out" />
            </a>
            <a
              href="#business"
              onClick={(e) => handleNavClick(e, 'business')}
              className="relative group py-2 text-[12px] font-mono font-bold uppercase tracking-[0.2em] text-[#C6D0DE] hover:text-white transition-colors duration-200 cursor-pointer"
            >
              {t.nav.business}
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 group-hover:w-full h-[2px] bg-[#00f2fe] transition-all duration-200 ease-out" />
            </a>

            {/* Segmented Control Language Switcher */}
            <div className="bg-[#050a14]/80 border border-[#00f2fe]/20 rounded-[4px] px-2.5 py-1 flex items-center gap-1.5 text-[11px] font-mono select-none">
              <Globe className="w-3.5 h-3.5 text-[#00f2fe]" />
              <button
                onClick={() => changeLanguage('ko')}
                className={`transition-colors cursor-pointer flex items-center gap-1 ${
                  lang === 'ko' ? 'text-[#00f2fe] font-black drop-shadow-[0_0_6px_rgba(0,242,254,0.5)]' : 'text-[#758198] hover:text-[#E6ECF5]'
                }`}
              >
                {lang === 'ko' && <span className="w-1.5 h-1.5 rounded-full bg-[#00f2fe] shadow-[0_0_6px_#00f2fe]" />}
                KO
              </button>
              <span className="text-slate-700/60 font-light">|</span>
              <button
                onClick={() => changeLanguage('en')}
                className={`transition-colors cursor-pointer flex items-center gap-1 ${
                  lang === 'en' ? 'text-[#00f2fe] font-black drop-shadow-[0_0_6px_rgba(0,242,254,0.5)]' : 'text-[#758198] hover:text-[#E6ECF5]'
                }`}
              >
                {lang === 'en' && <span className="w-1.5 h-1.5 rounded-full bg-[#00f2fe] shadow-[0_0_6px_#00f2fe]" />}
                EN
              </button>
              <span className="text-slate-700/60 font-light">|</span>
              <button
                onClick={() => changeLanguage('jp')}
                className={`transition-colors cursor-pointer flex items-center gap-1 ${
                  lang === 'jp' ? 'text-[#00f2fe] font-black drop-shadow-[0_0_6px_rgba(0,242,254,0.5)]' : 'text-[#758198] hover:text-[#E6ECF5]'
                }`}
              >
                {lang === 'jp' && <span className="w-1.5 h-1.5 rounded-full bg-[#00f2fe] shadow-[0_0_6px_#00f2fe]" />}
                JP
              </button>
            </div>

            {/* FAMILY SITES Dropdown */}
            <div className="relative">
              <button
                onClick={() => setFamilyMenuOpen(!familyMenuOpen)}
                className="h-[38px] px-3 bg-[#050a14]/90 border border-[#00f2fe]/30 hover:border-[#00f2fe] hover:bg-[#00f2fe]/10 text-white font-mono text-[11px] font-bold tracking-widest uppercase flex items-center gap-1.5 transition-all cursor-pointer rounded-[4px] shadow-[0_0_10px_rgba(0,242,254,0.1)]"
              >
                <Globe className="w-3.5 h-3.5 text-[#00f2fe]" />
                <span>FAMILY SITES</span>
                <ChevronDown className={`w-3.5 h-3.5 text-[#00f2fe] transition-transform duration-200 ${familyMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {familyMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-11 w-64 bg-[#050a14]/96 border border-[#00f2fe]/40 rounded-[4px] shadow-[0_12px_35px_rgba(0,0,0,0.9)] backdrop-blur-xl divide-y divide-slate-800/80 z-50 overflow-hidden"
                  >
                    <div className="p-2.5 text-[9px] font-mono text-[#00f2fe] uppercase font-bold tracking-widest bg-[#00f2fe]/5 border-b border-[#00f2fe]/20 flex items-center justify-between">
                      <span>// FAMILY SITES</span>
                      <span className="text-[8px] text-slate-400">HQ NETWORK</span>
                    </div>

                    <a
                      href="https://jamgong.kr"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setFamilyMenuOpen(false)}
                      className="p-3 flex items-center justify-between hover:bg-[#00f2fe]/15 transition-colors group cursor-pointer"
                    >
                      <div className="space-y-0.5">
                        <div className="text-xs font-bold text-white font-sans flex items-center gap-1.5">
                          <span>잼공인연사찰</span>
                          <ExternalLink className="w-3 h-3 text-[#00f2fe] group-hover:translate-x-0.5 transition-transform" />
                        </div>
                        <div className="text-[9px] font-mono text-slate-400">INYEON SACHAL AI</div>
                      </div>
                      <span className="px-1.5 py-0.5 text-[9px] font-mono font-black bg-[#00f2fe]/20 text-[#00f2fe] border border-[#00f2fe]/50 rounded-[2px] tracking-wider animate-pulse whitespace-nowrap">
                        운영 중 ↗
                      </span>
                    </a>

                    <a
                      href="https://jamgong-holo.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 flex items-center justify-between hover:bg-[#00f2fe]/15 transition-colors group cursor-pointer"
                    >
                      <div className="space-y-0.5">
                        <div className="text-xs font-bold text-white font-sans flex items-center gap-1.5">
                          <span>잼공홀로 3D 커머스</span>
                          <ExternalLink className="w-3 h-3 text-[#00f2fe] group-hover:translate-x-0.5 transition-transform" />
                        </div>
                        <div className="text-[9px] font-mono text-slate-400">JAMGONG HOLO 3D COMMERCE</div>
                      </div>
                      <span className="px-1.5 py-0.5 text-[9px] font-mono font-black bg-[#00f2fe]/20 text-[#00f2fe] border border-[#00f2fe]/50 rounded-[2px] tracking-wider animate-pulse whitespace-nowrap">
                        운영 중 ↗
                      </span>
                    </a>

                    <button
                      onClick={() => {
                        setFamilyMenuOpen(false);
                        setWaitlistServiceId('talk');
                        setIsWaitlistModalOpen(true);
                      }}
                      className="w-full p-3 flex items-center justify-between hover:bg-slate-800/60 transition-colors text-left group cursor-pointer"
                    >
                      <div className="space-y-0.5">
                        <div className="text-xs font-bold text-slate-200 font-sans">잼공톡</div>
                        <div className="text-[9px] font-mono text-slate-400">JAMGONGTALK AI</div>
                      </div>
                      <span className="px-1.5 py-0.5 text-[9px] font-mono text-slate-400 bg-slate-800 border border-slate-700 rounded-[2px]">
                        준비 중
                      </span>
                    </button>

                    <button
                      onClick={() => {
                        setFamilyMenuOpen(false);
                        setWaitlistServiceId('oracle');
                        setIsWaitlistModalOpen(true);
                      }}
                      className="w-full p-3 flex items-center justify-between hover:bg-slate-800/60 transition-colors text-left group cursor-pointer"
                    >
                      <div className="space-y-0.5">
                        <div className="text-xs font-bold text-slate-200 font-sans">잼공오라클</div>
                        <div className="text-[9px] font-mono text-slate-400">JAMGONG ORACLE</div>
                      </div>
                      <span className="px-1.5 py-0.5 text-[9px] font-mono text-slate-400 bg-slate-800 border border-slate-700 rounded-[2px]">
                        준비 중
                      </span>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* CONTACT Button: Cyan->Purple gradient border with restrained glow */}
            <a
              href="mailto:8845rks@gmail.com"
              className="relative p-[1px] rounded-[6px] bg-gradient-to-r from-[#00f2fe] via-[#818cf8] to-[#c084fc] shadow-[0_0_12px_rgba(0,242,254,0.12)] hover:shadow-[0_0_18px_rgba(192,132,252,0.3)] hover:-translate-y-[1px] transition-all duration-200 inline-block group shrink-0"
            >
              <div className="w-[136px] h-[38px] rounded-[5px] bg-[#050a14] hover:bg-[#0a1224] transition-colors flex items-center justify-center gap-2 text-[11px] font-mono font-bold tracking-widest text-white select-none">
                <Mail className="w-3.5 h-3.5 text-[#00f2fe] group-hover:text-[#c084fc] transition-colors" />
                <span>CONTACT</span>
              </div>
            </a>
          </div>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-300 hover:text-white transition-colors border border-[#00f2fe]/30 bg-[#050a14]/80 rounded-[4px] cursor-pointer"
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
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && filteredSearchItems.length > 0) {
                        handleSearchResultClick(filteredSearchItems[0]);
                        setMobileMenuOpen(false);
                      }
                    }}
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

              {/* Family Sites Mobile Links */}
              <div className="h-px bg-[#00f2fe]/10 my-0.5" />
              <div className="space-y-2">
                <div className="text-[10px] font-mono text-[#00f2fe] font-bold uppercase tracking-widest">// FAMILY SITES</div>
                <div className="flex flex-col gap-2 pl-1">
                  <a
                    href="https://jamgong.kr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-sans font-bold text-white hover:text-[#00f2fe] flex items-center justify-between group"
                  >
                    <span className="flex items-center gap-1.5">
                      <span>잼공인연사찰</span>
                      <ExternalLink className="w-3 h-3 text-[#00f2fe]" />
                    </span>
                    <span className="text-[9px] font-mono text-[#00f2fe] bg-[#00f2fe]/15 px-1.5 py-0.5 border border-[#00f2fe]/30 font-black rounded-[2px] animate-pulse whitespace-nowrap">운영 중 ↗</span>
                  </a>
                  <a
                    href="https://jamgong-holo.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-sans font-bold text-white hover:text-[#00f2fe] flex items-center justify-between group"
                  >
                    <span className="flex items-center gap-1.5">
                      <span>잼공홀로 3D 커머스</span>
                      <ExternalLink className="w-3 h-3 text-[#00f2fe]" />
                    </span>
                    <span className="text-[9px] font-mono text-[#00f2fe] bg-[#00f2fe]/15 px-1.5 py-0.5 border border-[#00f2fe]/30 font-black rounded-[2px] animate-pulse whitespace-nowrap">운영 중 ↗</span>
                  </a>
                </div>
              </div>
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
          <HeroCanvas activeMode={heroHoverMode} />

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

              {/* Button 2: 잼공인연사찰 → Direct Link */}
              <a
                href="https://jamgong.kr"
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setHeroHoverMode('teal')}
                onMouseLeave={() => setHeroHoverMode('default')}
                className="group relative overflow-hidden w-full sm:w-auto min-w-[190px] h-[52px] rounded-[4px] p-[1px] border border-[#00E5FF]/70 text-white font-bold text-[14px] font-mono uppercase tracking-[1.5px] hover:border-[#00E5FF] shadow-[0_0_12px_rgba(0,229,255,0.4),_0_0_24px_rgba(0,229,255,0.25)] hover:shadow-[0_0_20px_rgba(0,229,255,0.75),_0_0_40px_rgba(0,229,255,0.5)] transition-all duration-300 inline-flex items-center justify-center gap-2 select-none cursor-pointer"
              >
                {/* 4s Rotating Border Beam Light Layer */}
                <span className="border-beam-light pointer-events-none" />

                {/* Inner Button Content Mask Layer */}
                <span className="absolute inset-[1px] rounded-[3px] bg-gradient-to-b from-[#064350] via-[#032b33] to-[#021d23] group-hover:from-[#095768] group-hover:via-[#053a45] group-hover:to-[#032830] transition-colors duration-300 pointer-events-none" />

                {/* Subtle sheen highlight on hover */}
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-[#00E5FF]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                {/* Bottom floor reflection light */}
                <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-2/3 h-2 bg-[#00E5FF]/25 blur-sm rounded-full pointer-events-none group-hover:bg-[#00E5FF]/45 group-hover:w-4/5 group-hover:blur-md transition-all duration-300" />

                <span className="relative z-10 text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">{t.hero.btnInyeon}</span>
                <span className="relative z-10 px-1.5 py-0.5 text-[10px] font-mono bg-[#3a2500]/95 text-amber-300 border border-amber-400 group-hover:border-amber-300 group-hover:bg-[#523400] group-hover:text-amber-100 shadow-[0_0_8px_rgba(251,191,36,0.5)] group-hover:shadow-[0_0_14px_rgba(251,191,36,0.85)] rounded-[3px] font-bold transition-all duration-200 whitespace-nowrap">
                  운영 중 ↗
                </span>
              </a>

              {/* Button 3: 잼공톡 → Green Hue Shift */}
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  setWaitlistServiceId('talk');
                  setIsWaitlistModalOpen(true);
                }}
                onMouseEnter={() => setHeroHoverMode('green')}
                onMouseLeave={() => setHeroHoverMode('default')}
                title={t.hero.oracleTooltip}
                className="group relative overflow-hidden w-full sm:w-auto min-w-[190px] h-[52px] rounded-[4px] px-5 bg-[rgba(7,17,36,0.85)] border border-[rgba(16,185,129,0.4)] text-[#F4F7FC]/90 font-bold text-[14px] font-mono uppercase tracking-[1.5px] hover:border-[#10b981] hover:bg-[rgba(16,185,129,0.18)] hover:text-white hover:-translate-y-[2px] shadow-[0_0_0_rgba(16,185,129,0)] hover:shadow-[0_0_25px_rgba(16,185,129,0.55),_inset_0_0_15px_rgba(16,185,129,0.25)] transition-all duration-300 inline-flex items-center justify-center gap-2 select-none cursor-pointer"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-[#10b981]/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                <span className="relative z-10">{t.hero.btnTalk}</span>
                <span className="relative z-10 px-1.5 py-0.5 text-[10px] font-mono bg-[#10b981]/15 text-[#10b981] border border-[#10b981]/30 group-hover:border-[#10b981] group-hover:bg-[#10b981]/35 group-hover:text-white group-hover:shadow-[0_0_10px_rgba(16,185,129,0.8)] rounded-[3px] font-bold transition-all duration-200">
                  {t.hero.oracleTooltip}
                </span>
              </button>

              {/* Button 4: 잼공오라클 → Purple Hue Shift */}
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  setWaitlistServiceId('oracle');
                  setIsWaitlistModalOpen(true);
                }}
                onMouseEnter={() => setHeroHoverMode('purple')}
                onMouseLeave={() => setHeroHoverMode('default')}
                title={t.hero.oracleTooltip}
                className="group relative overflow-hidden w-full sm:w-auto min-w-[190px] h-[52px] rounded-[4px] px-5 bg-[rgba(7,17,36,0.85)] border border-[rgba(139,92,246,0.4)] text-[#F4F7FC]/90 font-bold text-[14px] font-mono uppercase tracking-[1.5px] hover:border-[#8b5cf6] hover:bg-[rgba(139,92,246,0.18)] hover:text-white hover:-translate-y-[2px] shadow-[0_0_0_rgba(139,92,246,0)] hover:shadow-[0_0_25px_rgba(139,92,246,0.55),_inset_0_0_15px_rgba(139,92,246,0.25)] transition-all duration-300 inline-flex items-center justify-center gap-2 select-none cursor-pointer"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-[#8b5cf6]/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                <span className="relative z-10">{t.hero.btnOracle}</span>
                <span className="relative z-10 px-1.5 py-0.5 text-[10px] font-mono bg-[#8b5cf6]/15 text-[#a855f7] border border-[#8b5cf6]/30 group-hover:border-[#8b5cf6] group-hover:bg-[#8b5cf6]/35 group-hover:text-white group-hover:shadow-[0_0_10px_rgba(139,92,246,0.8)] rounded-[3px] font-bold transition-all duration-200">
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
              {t.nav.tech} <br />
              <span className="not-italic font-light text-slate-400">{t.techProof.subtitle}</span>
            </h2>
          </motion.div>

          {/* Consolidated IP Top Banner Badge */}
          <motion.div
            id="patent-pending-box"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className={`relative flex flex-col md:flex-row items-stretch md:items-center justify-between gap-6 bg-[#050a14]/90 border border-[#00f2fe]/30 rounded-[6px] p-6 sm:p-7 shadow-[0_10px_35px_rgba(0,0,0,0.6)] backdrop-blur-xl transition-all duration-300 group ${
              highlightedElementId === 'patent-pending-box'
                ? 'border-[#00f2fe] ring-2 ring-[#00f2fe]/40 shadow-[0_0_30px_rgba(0,242,254,0.4)] scale-102 z-10'
                : 'hover:border-[#00f2fe]/60 hover:shadow-[0_0_25px_rgba(0,242,254,0.15)]'
            }`}
          >
            {/* Shimmer accent line */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#00f2fe] via-[#818cf8] to-[#c084fc]" />

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              {/* Large Number 17 */}
              <div className="flex items-baseline gap-2 shrink-0">
                <span className="text-xs font-mono font-bold text-[#00f2fe] uppercase tracking-widest self-start pt-1">IP</span>
                <span className="text-4xl sm:text-5xl font-black font-mono text-[#00f2fe] tracking-tighter drop-shadow-[0_0_15px_rgba(0,242,254,0.4)]">
                  17
                </span>
                <span className="text-sm font-bold font-sans text-slate-300">
                  {lang === 'ko' ? '건' : lang === 'jp' ? '件' : 'Cases'}
                </span>
              </div>

              {/* Segment Bar (Patent 16 / Trademark 1) */}
              <div className="space-y-2 w-full sm:w-64">
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-300 font-bold">
                  <span className="flex items-center gap-1.5 text-[#00f2fe]">
                    <span className="w-2 h-2 rounded-full bg-[#00f2fe] animate-pulse" />
                    {lang === 'ko' ? '특허 16' : lang === 'jp' ? '特許 16' : 'Patents 16'}
                  </span>
                  <span className="text-[#c084fc]">
                    {lang === 'ko' ? '상표 1' : lang === 'jp' ? '商標 1' : 'Trademark 1'}
                  </span>
                </div>
                <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden flex p-0.5 border border-slate-800">
                  <div className="h-full bg-gradient-to-r from-[#00f2fe] to-[#38bdf8] rounded-l-full w-[94.1%]" />
                  <div className="h-full bg-[#c084fc] rounded-r-full w-[5.9%] ml-0.5" />
                </div>
              </div>
            </div>

            {/* Status & Detail View Button */}
            <div className="flex items-center gap-3 shrink-0 pt-2 sm:pt-0">
              <div className="px-3.5 py-2 bg-[#00f2fe]/10 border border-[#00f2fe]/30 text-[#00f2fe] font-mono text-xs font-extrabold uppercase tracking-wider flex items-center gap-2 rounded-[4px]">
                <span className="w-2 h-2 rounded-full bg-[#00f2fe] animate-pulse" />
                <span>{t.techProof.pending || (lang === 'ko' ? '특허출원 중' : lang === 'jp' ? '特許出願中' : 'Patent Pending')}</span>
              </div>
              <button
                onClick={() => setIsPatentModalOpen(true)}
                className="px-4 py-2 bg-gradient-to-r from-[#00f2fe]/20 to-[#00f2fe]/30 hover:from-[#00f2fe] hover:to-[#00f2fe] hover:text-black text-[#00f2fe] border border-[#00f2fe]/60 font-mono text-xs font-bold tracking-wider rounded-[4px] transition-all cursor-pointer shadow-[0_0_12px_rgba(0,242,254,0.15)] flex items-center gap-1.5 h-[38px]"
              >
                <span>{t.techProof.viewDetail || (lang === 'ko' ? '상세 보기' : lang === 'jp' ? '詳細表示' : 'Detail View')} →</span>
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

              {/* Arrow 1: Horizontal animated data packet flow */}
              <div className="hidden md:block w-full">
                <DataFlowArrowRight color="#00f2fe" speed="1.6s" />
              </div>
              <div className="md:hidden flex justify-center py-1">
                <DataFlowArrowDown color="#00f2fe" speed="1.4s" />
              </div>

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

              {/* Arrow 2: Horizontal animated data packet flow */}
              <div className="hidden md:block w-full">
                <DataFlowArrowRight color="#10b981" speed="1.6s" />
              </div>
              <div className="md:hidden flex justify-center py-1">
                <DataFlowArrowDown color="#10b981" speed="1.4s" />
              </div>

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

            {/* Connect vertical packet flow between row 1 and row 2 */}
            <div className="hidden md:grid grid-cols-5 gap-3 select-none py-1">
              <div className="col-start-5 flex justify-center">
                <DataFlowArrowDown color="#c084fc" speed="1.4s" />
              </div>
            </div>
            <div className="md:hidden flex justify-center py-1">
              <DataFlowArrowDown color="#c084fc" speed="1.4s" />
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

              {/* Arrow 5: Left animated data packet flow */}
              <div className="hidden md:block w-full">
                <DataFlowArrowLeft color="#ec4899" speed="1.6s" />
              </div>
              <div className="md:hidden flex justify-center py-1">
                <DataFlowArrowDown color="#ec4899" speed="1.4s" />
              </div>

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

              {/* Arrow 4: Left animated data packet flow */}
              <div className="hidden md:block w-full">
                <DataFlowArrowLeft color="#3b82f6" speed="1.6s" />
              </div>
              <div className="md:hidden flex justify-center py-1">
                <DataFlowArrowDown color="#3b82f6" speed="1.4s" />
              </div>

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

              const cardPatentNumbers: Record<string, string> = {
                oracle: '10-2026-0038912',
                neutralsync: '10-2026-0041205',
                synergy: '10-2026-0141984',
                holo: '10-2026-0089143',
              };
              const patentNo = cardPatentNumbers[card.id] || '10-2026-0000000';

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
                      <div className="flex items-center justify-between gap-2 pt-1 font-mono text-xs">
                        <div className="text-[11px] text-slate-400 font-medium tracking-wider">
                          <span className="text-slate-500 font-bold">{lang === 'ko' ? '출원번호' : lang === 'jp' ? '出願番号' : 'Application No.'}</span> <span className="text-slate-200 font-bold">{patentNo}</span>
                        </div>
                        <div className="flex items-center gap-1.5 px-2 py-0.5 bg-[#00f2fe]/10 border border-[#00f2fe]/30 rounded-[3px]">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#00f2fe] animate-pulse" />
                          <span className="text-[10px] font-mono font-bold text-[#00f2fe] uppercase tracking-wider">
                            {card.id === 'holo' ? (lang === 'ko' ? '운영 중' : lang === 'jp' ? '運用中' : 'Active') : (lang === 'ko' ? '특허출원 중' : lang === 'jp' ? '特許出願中' : 'Patent Pending')}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between gap-2 pt-1">
                        <h3 className="text-2xl font-black text-white tracking-tight font-sans">
                          {card.name}
                        </h3>
                        {(card.id === 'oracle' || card.id === 'synergy') && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setWaitlistServiceId(card.id === 'synergy' ? 'talk' : 'oracle');
                              setIsWaitlistModalOpen(true);
                            }}
                            className={`px-2 py-0.5 text-[10px] font-mono font-bold rounded-[3px] select-none border cursor-pointer hover:scale-105 transition-transform ${
                              card.id === 'synergy' 
                                ? 'bg-[#10b981]/15 text-[#10b981] border-[#10b981]/40 hover:bg-[#10b981]/30' 
                                : 'bg-[#00D9F5]/15 text-[#00D9F5] border-[#00D9F5]/30 hover:bg-[#00D9F5]/30'
                            }`}
                          >
                            {lang === 'ko' ? '준비 중 (웨이트리스트)' : lang === 'jp' ? '準備 中' : 'Coming Soon'}
                          </button>
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
                      {card.id === 'holo' && (
                        <div className="p-3 bg-[#00f2fe]/10 border border-[#00f2fe]/40 rounded-none text-xs font-sans font-extrabold text-[#00f2fe] flex items-center justify-between shadow-[0_0_12px_rgba(0,242,254,0.12)]">
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-[#00f2fe] animate-pulse" />
                            <span>{lang === 'ko' ? '3D 커머스 상용 적용 완료' : lang === 'jp' ? '3D コマース商用適用完了' : '3D Commerce Commercial Live'}</span>
                          </div>
                          <span className="text-[10px] font-mono bg-[#00f2fe]/20 px-1.5 py-0.5 border border-[#00f2fe]/40 text-white font-black">
                            LIVE
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

                  {card.id === 'holo' ? (
                    <a
                      href="https://jamgong-holo.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2.5 py-3.5 bg-gradient-to-r from-[#00f2fe]/20 via-[#00f2fe]/35 to-[#c084fc]/25 border border-[#00f2fe]/60 text-white font-mono font-bold text-xs tracking-widest uppercase transition-all duration-200 cursor-pointer hover:bg-[#00f2fe] hover:text-black hover:border-[#00f2fe] shadow-[0_0_14px_rgba(0,242,254,0.2)] group/btn"
                    >
                      <span>{t.nav.appliedCase || (lang === 'ko' ? '적용 사례 (3D 커머스) →' : lang === 'jp' ? '適用事例 (3Dコマース) →' : 'Applied Case (3D Commerce) →')}</span>
                      <ExternalLink className="w-4 h-4 text-[#00f2fe] group-hover/btn:text-black transition-colors" />
                    </a>
                  ) : (
                    <button
                      onClick={() => setSelectedSystem(card.id)}
                      className="w-full flex items-center justify-center gap-2 py-3 border border-[#00f2fe]/20 text-[#00f2fe] font-mono font-bold text-[10px] tracking-widest uppercase transition-all duration-200 cursor-pointer bg-[#050811] hover:bg-white hover:text-black hover:border-white shadow-[0_4px_10px_rgba(0,0,0,0.2)]"
                    >
                      System Enter
                      <ChevronRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                    </button>
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* ── Master Pipeline Tracking Registry (with speedometer gauges!) ── */}
          <div className="border-t border-slate-900 pt-16 space-y-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1.5">
                <span className="text-[#00f2fe] font-mono text-[9px] tracking-[0.25em] font-bold block">// 03 . PATENT PORTFOLIO</span>
                <h3 className="text-2xl font-bold text-white font-display uppercase tracking-wider">
                  {t.portfolio.title}
                </h3>
              </div>
              <div className="flex items-center gap-2 px-3.5 py-1.5 bg-[#00f2fe]/10 border border-[#00f2fe]/30 rounded-[4px] text-[10px] font-mono text-[#00f2fe] font-bold uppercase tracking-wider shadow-[0_0_12px_rgba(0,242,254,0.12)]">
                <span className="w-2 h-2 rounded-full bg-[#00f2fe] animate-pulse" />
                <span>
                  {lang === 'ko' ? '● NODE 16 가동 중 · REAL-TIME' : lang === 'jp' ? '● NODE 16 稼働中 · REAL-TIME' : '● NODE 16 ACTIVE · REAL-TIME'}
                </span>
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
                    { id: "patent-coreAi01", code: "CORE AI-01", label: t.portfolio.cards.coreAi01, patent: "10-2026-0012041", color: "cyan" },
                    { id: "patent-quant01", code: "QUANT-01", label: t.portfolio.cards.quant01, patent: "10-2026-0023190", color: "purple" },
                    { id: "patent-quant02", code: "QUANT-02", label: t.portfolio.cards.quant02, patent: "10-2026-0041205", color: "green" },
                    { id: "patent-coreAi02", code: "CORE AI-02", label: t.portfolio.cards.coreAi02, patent: "10-2026-0058201", color: "cyan" },
                    { id: "patent-coreAi03", code: "CORE AI-03", label: t.portfolio.cards.coreAi03, patent: "10-2026-0067340", color: "purple" },
                    { id: "patent-system01", code: "SYSTEM-01", label: t.portfolio.cards.system01, patent: "10-2026-0071289", color: "green" },
                    { id: "patent-system02", code: "SYSTEM-02", label: t.portfolio.cards.system02, patent: "10-2026-0083920", color: "cyan" },
                    { id: "patent-coreAi04", code: "CORE AI-04", label: t.portfolio.cards.coreAi04, patent: "10-2026-0091048", color: "purple" },
                    { id: "patent-apiBio01", code: "API/BIO-01", label: t.portfolio.cards.apiBio01, patent: "10-2026-0102391", color: "green" },
                    { id: "patent-quant03", code: "QUANT-03", label: t.portfolio.cards.quant03, patent: "10-2026-0118402", color: "cyan" },
                    { id: "patent-quant04", code: "QUANT-04", label: t.portfolio.cards.quant04, patent: "10-2026-0129034", color: "purple" },
                    { id: "patent-quant05", code: "QUANT-05", label: t.portfolio.cards.quant05, patent: "10-2026-0131482", color: "green" },
                    { id: "patent-system03", code: "SYSTEM-03", label: t.portfolio.cards.system03, patent: "10-2026-0138901", color: "cyan" },
                    { id: "patent-system04", code: "SYSTEM-04", label: t.portfolio.cards.system04, patent: "10-2026-0139820", color: "purple" },
                    { id: "patent-immersive01", code: "IMMERSIVE-01", label: t.portfolio.cards.immersive01, patent: "10-2026-0140291", color: "cyan" },
                    { id: "patent-synergyRank01", code: "SYNERGY-RANK-01", label: t.portfolio.cards.synergyRank01, patent: "10-2026-0141984", color: "purple" }
                  ];
                  return nodes.concat(nodes).map((node, index, arr) => (
                    <div 
                      key={index} 
                      id={index < 16 ? node.id : undefined}
                      className={`flex items-center gap-4 flex-shrink-0 transition-all duration-300 ${
                        highlightedElementId === node.id 
                          ? 'scale-110 ring-2 ring-[#00f2fe] bg-[#00f2fe]/10 shadow-[0_0_25px_rgba(0,242,254,0.6)] p-2 z-20' 
                          : ''
                      }`}
                    >
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

      <WaitlistModal
        isOpen={isWaitlistModalOpen}
        serviceId={waitlistServiceId}
        onClose={() => setIsWaitlistModalOpen(false)}
        lang={lang}
      />

      <PatentDetailModal
        isOpen={isPatentModalOpen}
        onClose={() => setIsPatentModalOpen(false)}
      />
      </div>
    </div>
  </>
  );
}
