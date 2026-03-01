import { motion, useScroll, useTransform, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { useRef, useState, useEffect, useMemo, useCallback } from 'react';
import { useApp } from '../../context/AppContext';
const MagneticButton = ({ children, className, onClick, disabled }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });
  const handleMouseMove = (e) => {
    if (!ref.current || disabled) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * 0.15);
    y.set((e.clientY - centerY) * 0.15);
  };
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };
  return (
    <motion.button
      ref={ref}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      disabled={disabled}
      className={className}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </motion.button>
  );
};
const PremiumGradientMesh = () => {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Animated gradient orbs */}
      <motion.div
        animate={{
          x: [0, 100, 50, 0],
          y: [0, -50, 50, 0],
          scale: [1, 1.2, 0.9, 1]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-gradient-to-br from-primary-500/20 to-transparent blur-[120px]"
      />
      <motion.div
        animate={{
          x: [0, -80, 40, 0],
          y: [0, 80, -40, 0],
          scale: [1, 0.9, 1.1, 1]
        }}
        transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-[20%] right-[-5%] w-[600px] h-[600px] rounded-full bg-gradient-to-bl from-accent-500/15 to-transparent blur-[140px]"
      />
      <motion.div
        animate={{
          x: [0, 60, -30, 0],
          y: [0, -30, 60, 0]
        }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-[10%] left-[20%] w-[400px] h-[400px] rounded-full bg-gradient-to-tr from-cyan-500/10 to-primary-500/10 blur-[100px]"
      />
      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(37, 99, 235, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(37, 99, 235, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }}
      />
      {/* Radial gradient center highlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-gradient-radial from-primary-500/5 via-transparent to-transparent" />
    </div>
  );
};
const FloatingOrbs = () => {
  const orbs = [
    { size: 8, x: '15%', y: '20%', delay: 0, duration: 4 },
    { size: 6, x: '85%', y: '30%', delay: 0.5, duration: 5 },
    { size: 10, x: '70%', y: '70%', delay: 1, duration: 4.5 },
    { size: 5, x: '25%', y: '75%', delay: 1.5, duration: 5.5 },
    { size: 7, x: '50%', y: '15%', delay: 2, duration: 4 },
    { size: 4, x: '90%', y: '85%', delay: 0.8, duration: 6 }
  ];
  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      {orbs.map((orb, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0.2, 0.5, 0.2],
            scale: [1, 1.2, 1],
            y: [0, -20, 0]
          }}
          transition={{
            duration: orb.duration,
            repeat: Infinity,
            delay: orb.delay,
            ease: 'easeInOut'
          }}
          className="absolute rounded-full"
          style={{
            width: orb.size,
            height: orb.size,
            left: orb.x,
            top: orb.y,
            background: `radial-gradient(circle, rgba(37, 99, 235, 0.6) 0%, rgba(6, 182, 212, 0.3) 100%)`,
            boxShadow: `0 0 ${orb.size * 2}px rgba(37, 99, 235, 0.4)`
          }}
        />
      ))}
    </div>
  );
};
const Floating3DCard = ({ className, children, delay = 0, tiltX = 10, tiltY = 10 }) => {
  const cardRef = useRef(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springRotateX = useSpring(rotateX, { stiffness: 100, damping: 20 });
  const springRotateY = useSpring(rotateY, { stiffness: 100, damping: 20 });
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const percentX = (e.clientX - centerX) / (rect.width / 2);
    const percentY = (e.clientY - centerY) / (rect.height / 2);
    rotateX.set(-percentY * tiltX);
    rotateY.set(percentX * tiltY);
  };
  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };
  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`absolute ${className}`}
      style={{
        perspective: 1000,
        rotateX: springRotateX,
        rotateY: springRotateY,
        transformStyle: 'preserve-3d'
      }}
    >
      <motion.div
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};
const GlassCard = ({ variant = 'resume' }) => {
  const isResume = variant === 'resume';
  return (
    <div className={`relative ${isResume ? 'w-40 h-52 sm:w-48 sm:h-60' : 'w-44 h-56 sm:w-52 sm:h-64'}`}>
      <motion.div
        className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-primary-500/40 to-accent-500/40 blur-lg"
        animate={{ opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 3, repeat: Infinity }}
      />
      <div className={`relative h-full rounded-xl bg-gradient-to-br ${isResume ? 'from-dark-800/95 to-dark-900/95' : 'from-dark-700/95 to-dark-800/95'} backdrop-blur-xl border ${isResume ? 'border-primary-500/30' : 'border-accent-500/30'} overflow-hidden shadow-2xl`}>
        {/* Window header */}
        <div className="h-7 border-b border-white/10 flex items-center px-3 gap-1.5 bg-dark-900/50">
          <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }} className="w-2.5 h-2.5 rounded-full bg-red-500" />
          <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity, delay: 0.2 }} className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
          <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity, delay: 0.4 }} className="w-2.5 h-2.5 rounded-full bg-green-500" />
          <span className="ml-2 text-[8px] text-gray-500 font-mono">{isResume ? 'resume.pdf' : 'portfolio.io'}</span>
        </div>
        <div className="p-3">
          {isResume ? (
            <div className="space-y-3">
              {/* Name header */}
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="text-center border-b border-white/10 pb-2"
              >
                <div className="h-3 w-20 mx-auto rounded bg-gradient-to-r from-primary-400 to-accent-400" />
                <div className="h-1.5 w-16 mx-auto rounded bg-white/30 mt-1.5" />
              </motion.div>
              {/* Experience section */}
              <div className="space-y-1.5">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '40%' }}
                  transition={{ delay: 0.5, duration: 0.4 }}
                  className="h-1.5 rounded bg-primary-500/70"
                />
                <div className="space-y-1 pl-2">
                  <motion.div initial={{ width: 0 }} animate={{ width: '90%' }} transition={{ delay: 0.6 }} className="h-1 rounded bg-white/20" />
                  <motion.div initial={{ width: 0 }} animate={{ width: '75%' }} transition={{ delay: 0.7 }} className="h-1 rounded bg-white/15" />
                  <motion.div initial={{ width: 0 }} animate={{ width: '85%' }} transition={{ delay: 0.8 }} className="h-1 rounded bg-white/15" />
                </div>
              </div>
              {/* Skills section */}
              <div className="space-y-1.5">
                <motion.div initial={{ width: 0 }} animate={{ width: '30%' }} transition={{ delay: 0.9 }} className="h-1.5 rounded bg-accent-500/70" />
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="flex flex-wrap gap-1"
                >
                  {['bg-primary-500/40', 'bg-accent-500/40', 'bg-cyan-500/40', 'bg-emerald-500/40'].map((bg, i) => (
                    <span key={i} className={`h-2 w-6 rounded ${bg}`} />
                  ))}
                </motion.div>
              </div>
              {/* Education section */}
              <div className="space-y-1.5">
                <motion.div initial={{ width: 0 }} animate={{ width: '35%' }} transition={{ delay: 1.1 }} className="h-1.5 rounded bg-emerald-500/70" />
                <motion.div initial={{ width: 0 }} animate={{ width: '70%' }} transition={{ delay: 1.2 }} className="h-1 rounded bg-white/20 ml-2" />
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {/* Profile section */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.4, type: 'spring' }}
                className="flex flex-col items-center"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 via-accent-400 to-cyan-400 shadow-lg shadow-primary-500/30 flex items-center justify-center">
                  <span className="text-xs font-bold text-white">JD</span>
                </div>
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <div className="h-2 w-16 mx-auto rounded bg-white/40 mt-2" />
                  <div className="h-1.5 w-12 mx-auto rounded bg-accent-400/50 mt-1" />
                </motion.div>
              </motion.div>
              {/* Skills badges */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="flex flex-wrap justify-center gap-1"
              >
                {[
                  { bg: 'bg-yellow-500/40', text: 'JS' },
                  { bg: 'bg-blue-500/40', text: 'React' },
                  { bg: 'bg-green-500/40', text: 'Node' }
                ].map((skill, i) => (
                  <span key={i} className={`px-1.5 py-0.5 rounded text-[7px] ${skill.bg} text-white/90 font-medium`}>
                    {skill.text}
                  </span>
                ))}
              </motion.div>
              {/* Project cards */}
              <div className="space-y-1.5">
                {[0, 1].map((i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1 + i * 0.2 }}
                    className="flex items-center gap-2 p-1.5 rounded bg-white/5 border border-white/10"
                  >
                    <div className="w-6 h-6 rounded bg-gradient-to-br from-primary-500/50 to-accent-500/50" />
                    <div className="flex-1 space-y-0.5">
                      <div className="h-1.5 w-12 rounded bg-white/30" />
                      <div className="h-1 w-16 rounded bg-white/15" />
                    </div>
                  </motion.div>
                ))}
              </div>
              {/* Contact button */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.4 }}
                className="h-4 w-full rounded bg-gradient-to-r from-primary-500/60 to-accent-500/60 flex items-center justify-center"
              >
                <span className="text-[7px] text-white/80 font-medium">Contact Me</span>
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
const SpotlightCard = ({ children, className }) => {
  const divRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);
  const handleMouseMove = (e) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };
  const handleMouseEnter = () => setOpacity(1);
  const handleMouseLeave = () => setOpacity(0);
  return (
    <motion.div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden ${className}`}
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-500"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(37, 99, 235, 0.15), transparent 40%)`
        }}
      />
      {children}
    </motion.div>
  );
};
const FileUploadCard = ({ onFileSelect, onBrowse, isDragging, setIsDragging, isProcessing }) => {
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0 && files[0].type === 'application/pdf') {
      onFileSelect(files[0]);
    }
  };
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };
  const handleDragLeave = () => setIsDragging(false);
  return (
    <SpotlightCard className="rounded-2xl">
      <motion.div
        whileHover={{ scale: 1.01 }}
        className={`relative rounded-2xl border-2 border-dashed transition-all duration-500 p-8 sm:p-10 ${isDragging ? 'border-primary-500 bg-primary-500/10 scale-[1.02]' : 'border-primary-500/30 bg-dark-900/60'} backdrop-blur-xl`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        {isProcessing ? (
          <div className="flex flex-col items-center justify-center py-4">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              className="w-12 h-12 border-3 border-primary-500 border-t-transparent rounded-full mb-4"
            />
            <span className="text-primary-400 font-medium">Processing your resume...</span>
          </div>
        ) : (
          <div className="flex flex-col items-center text-center">
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="mb-5"
            >
              <svg className="w-14 h-14 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
              </svg>
            </motion.div>
            <h3 className="text-xl font-bold text-skyWhite mb-2">Upload Your Resume</h3>
            <p className="text-lightSky/70 text-sm mb-6 max-w-xs">
              Drag and drop your PDF resume here, or click to browse. We'll automatically extract your information.
            </p>
            <MagneticButton
              onClick={onBrowse}
              className="px-8 py-3 rounded-xl text-base font-semibold bg-gradient-to-r from-primary-500 to-accent-500 text-skyWhite shadow-lg shadow-primary-500/25"
            >
              Choose File
            </MagneticButton>
            <p className="text-gray-500 text-xs mt-4 font-mono">PDF only, max 10MB</p>
          </div>
        )}
      </motion.div>
    </SpotlightCard>
  );
};
const GradientText = ({ children, className }) => (
  <span className={`bg-gradient-to-r from-primary-400 via-accent-400 to-cyan-400 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient-x ${className}`}>
    {children}
  </span>
);
const SessionPopup = ({ onTerminate, onContinue, onClose }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-50 flex items-center justify-center bg-dark-950/90 backdrop-blur-md"
  >
    <motion.div
      initial={{ scale: 0.8, opacity: 0, y: 30 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{ scale: 0.8, opacity: 0, y: 30 }}
      transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      className="relative max-w-md w-full mx-4 p-8 bg-dark-900/95 border border-primary-500/30 rounded-3xl shadow-2xl"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="absolute -inset-px bg-gradient-to-r from-primary-500 to-accent-500 rounded-3xl opacity-20 blur-sm" />
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-gray-400 hover:text-white transition-all"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      <div className="relative">
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary-500/20 to-accent-500/20 flex items-center justify-center"
        >
          <svg className="w-8 h-8 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </motion.div>
        <h3 className="text-xl font-bold text-center text-skyWhite mb-3">Previous Session Found</h3>
        <p className="text-gray-400 text-center mb-8">You have unsaved work from a previous session. Would you like to continue where you left off or start fresh?</p>
        <div className="flex gap-4">
          <MagneticButton onClick={onTerminate} className="flex-1 py-3 px-6 rounded-xl border border-red-500/50 text-red-400 font-semibold hover:bg-red-500/10 transition-all">
            Start Fresh
          </MagneticButton>
          <MagneticButton onClick={onContinue} className="flex-1 py-3 px-6 rounded-xl bg-gradient-to-r from-primary-500 to-accent-500 text-skyWhite font-semibold shadow-lg">
            Continue
          </MagneticButton>
        </div>
      </div>
    </motion.div>
  </motion.div>
);
const HeroSection = () => {
  const { state, dispatch, navigateToBuilder } = useApp();
  const sectionRef = useRef(null);
  const fileInputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start']
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);
  const highlights = useMemo(() => [
    { icon: '⚡', text: 'Instant Generation' },
    { icon: '📄', text: 'Any Resume Format' },
    { icon: '✓', text: 'ATS-Optimized Output' },
  ], []);
  const handleStartBuilding = useCallback(() => navigateToBuilder(), [navigateToBuilder]);
  const handleFileSelect = useCallback((file) => {
    if (file && file.type === 'application/pdf') {
      setIsProcessing(true);
      setTimeout(() => {
        setIsProcessing(false);
        navigateToBuilder();
      }, 1500);
    }
  }, [navigateToBuilder]);
  const handleBrowse = useCallback(() => {
    fileInputRef.current?.click();
  }, []);
  const handleFileInputChange = useCallback((e) => {
    const file = e.target.files?.[0];
    if (file) handleFileSelect(file);
  }, [handleFileSelect]);
  const scrollToSection = useCallback((sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  }, []);
  const handleTerminateSession = useCallback(() => {
    dispatch({ type: 'TERMINATE_SESSION' });
    dispatch({ type: 'NAVIGATE_TO', payload: 'builder' });
  }, [dispatch]);
  const handleContinueSession = useCallback(() => {
    dispatch({ type: 'CONTINUE_SESSION' });
    dispatch({ type: 'NAVIGATE_TO', payload: 'builder' });
  }, [dispatch]);
  const handleClosePopup = useCallback(() => {
    dispatch({ type: 'HIDE_SESSION_POPUP' });
  }, [dispatch]);
  return (
    <section ref={sectionRef} className="relative min-h-screen w-full overflow-hidden bg-dark-950 flex items-center justify-center">
      <AnimatePresence>
        {state.uiState.showSessionPopup && (
          <SessionPopup onTerminate={handleTerminateSession} onContinue={handleContinueSession} onClose={handleClosePopup} />
        )}
      </AnimatePresence>
      {/* Premium gradient mesh background - cleaner than particles */}
      <PremiumGradientMesh />
      <FloatingOrbs />
      <Floating3DCard className="top-24 left-[3%] hidden xl:block" delay={0.6} tiltX={15} tiltY={15}>
        <GlassCard variant="resume" />
      </Floating3DCard>
      <Floating3DCard className="top-20 right-[3%] hidden xl:block" delay={0.8} tiltX={15} tiltY={-15}>
        <GlassCard variant="portfolio" />
      </Floating3DCard>
      <motion.div style={{ y, opacity, scale }} className="relative z-10 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <div className="flex flex-col items-center text-center">
            <motion.div
              initial={{ opacity: 0, y: -30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
              className="mb-8"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full glass border border-primary-500/40 backdrop-blur-xl cursor-default"
              >
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-full w-full bg-green-500" />
                </span>
                <span className="text-sm font-medium text-gray-200 tracking-wide font-mono">AI-Powered Portfolio Builder</span>
              </motion.div>
            </motion.div>
            <h1 className="font-heading font-extrabold leading-[1.05] tracking-tight mb-6">
              <div className="flex flex-col items-center gap-3">
                <div className="flex flex-wrap justify-center gap-3 sm:gap-5">
                  <motion.span
                    initial={{ opacity: 0, y: 50, rotateX: -90 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    transition={{ duration: 0.8, delay: 0.1, ease: [0.34, 1.56, 0.64, 1] }}
                    className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl"
                  >
                    <GradientText>Paste.</GradientText>
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0, y: 50, rotateX: -90 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: [0.34, 1.56, 0.64, 1] }}
                    className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl"
                  >
                    <GradientText>Generate.</GradientText>
                  </motion.span>
                </div>
                <div className="flex flex-wrap justify-center gap-3 sm:gap-5">
                  <motion.span
                    initial={{ opacity: 0, y: 50, rotateX: -90 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    transition={{ duration: 0.8, delay: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
                    className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-outline drop-shadow-2xl"
                  >
                    Land
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0, y: 50, rotateX: -90 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    transition={{ duration: 0.8, delay: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
                    className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-outline drop-shadow-2xl"
                  >
                    Jobs.
                  </motion.span>
                </div>
              </div>
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="max-w-2xl text-base sm:text-lg lg:text-xl text-lightSky mb-10 text-balance leading-relaxed px-4"
            >
              Upload your resume and our AI builds a stunning, <GradientText className="font-semibold">ATS-optimized portfolio</GradientText> in seconds. Zero design skills needed.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.75 }}
              className="w-full max-w-xl mb-6 px-4 sm:px-0"
            >
              <input ref={fileInputRef} type="file" accept=".pdf" onChange={handleFileInputChange} className="hidden" />
              <FileUploadCard
                onFileSelect={handleFileSelect}
                onBrowse={handleBrowse}
                isDragging={isDragging}
                setIsDragging={setIsDragging}
                isProcessing={isProcessing}
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.85 }}
              className="flex flex-wrap items-center justify-center gap-4 mb-10 px-4"
            >
              <MagneticButton
                onClick={handleStartBuilding}
                className="px-8 py-4 rounded-xl text-base font-semibold bg-gradient-to-r from-primary-500 to-accent-500 text-skyWhite shadow-xl shadow-primary-500/25 flex items-center gap-3 group"
              >
                <svg className="w-5 h-5 transition-transform group-hover:rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <span>Build Now Manually</span>
              </MagneticButton>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.95, duration: 0.6 }}
              className="flex flex-wrap justify-center gap-6 lg:gap-10 px-4"
            >
              {highlights.map((item, i) => (
                <motion.div
                  key={item.text}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.05 + i * 0.1, type: 'spring', stiffness: 200 }}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="flex items-center gap-2 text-lightSky cursor-default"
                >
                  <span className="text-lg">{item.icon}</span>
                  <span className="text-sm font-medium font-mono">{item.text}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-10 cursor-pointer group"
        onClick={() => scrollToSection('features')}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-8 h-12 rounded-full border-2 border-primary-500/40 flex items-start justify-center p-2 group-hover:border-primary-500/60 transition-colors"
        >
          <motion.div
            animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="w-1.5 h-3 bg-gradient-to-b from-primary-500 to-accent-500 rounded-full"
          />
        </motion.div>
        <span className="text-xs text-lightSky/50 uppercase tracking-[0.2em] font-mono group-hover:text-lightSky/70 transition-colors">Scroll to explore</span>
      </motion.div>
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-dark-950 to-transparent z-[3] pointer-events-none" />
    </section>
  );
};
export default HeroSection;