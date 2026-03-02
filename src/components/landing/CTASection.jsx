import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { useRef, useState, useCallback, useEffect } from 'react';
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
const SpotlightCard = ({ children, className = '' }) => {
  const divRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);
  const handleMouseMove = (e) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };
  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      className={`relative overflow-hidden ${className}`}
    >
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-500"
        style={{
          opacity,
          background: `radial-gradient(800px circle at ${position.x}px ${position.y}px, rgba(37, 99, 235, 0.15), transparent 40%)`
        }}
      />
      {children}
    </div>
  );
};
const MorphingBlob = ({ className, delay = 0 }) => (
  <motion.div
    className={`absolute rounded-full blur-3xl ${className}`}
    animate={{
      scale: [1, 1.2, 0.9, 1.1, 1],
      x: [0, 30, -20, 10, 0],
      y: [0, -20, 30, -10, 0],
      rotate: [0, 45, -30, 15, 0]
    }}
    transition={{
      duration: 20,
      repeat: Infinity,
      delay,
      ease: 'easeInOut'
    }}
  />
);
const OrbitalRing = ({ size, duration, delay, color }) => (
  <motion.div
    className="absolute left-1/2 top-1/2 rounded-full border"
    style={{
      width: size,
      height: size,
      marginLeft: -size / 2,
      marginTop: -size / 2,
      borderColor: color
    }}
    animate={{ rotate: 360 }}
    transition={{ duration, repeat: Infinity, ease: 'linear', delay }}
  />
);
const GlowingOrb = ({ className, color = 'primary', delay = 0 }) => (
  <motion.div
    className={`absolute rounded-full ${className}`}
    initial={{ opacity: 0, scale: 0 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.8 }}
  >
    <motion.div
      className={`w-full h-full rounded-full ${color === 'primary' ? 'bg-primary-500/30' : 'bg-accent-500/30'}`}
      animate={{
        scale: [1, 1.4, 1],
        opacity: [0.3, 0.6, 0.3]
      }}
      transition={{ duration: 3, repeat: Infinity, delay }}
    />
  </motion.div>
);
const FloatingCard = ({ children, className, delay = 0, rotateRange = 5 }) => {
  const cardRef = useRef(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springRotateX = useSpring(rotateX, { stiffness: 100, damping: 15 });
  const springRotateY = useSpring(rotateY, { stiffness: 100, damping: 15 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const x = (e.clientY - centerY) / 8;
    const y = (centerX - e.clientX) / 8;
    rotateX.set(Math.max(-rotateRange, Math.min(rotateRange, x)));
    rotateY.set(Math.max(-rotateRange, Math.min(rotateRange, y)));
  };
  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };
  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.8 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: springRotateX,
        rotateY: springRotateY,
        transformStyle: 'preserve-3d',
        perspective: 1000
      }}
      className={className}
    >
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};
const EnergyWave = ({ delay = 0 }) => (
  <motion.div
    className="absolute inset-0 rounded-3xl"
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{
      opacity: [0, 0.3, 0],
      scale: [0.95, 1.05, 1.15]
    }}
    transition={{
      duration: 3,
      repeat: Infinity,
      delay,
      ease: 'easeOut'
    }}
    style={{
      border: '2px solid rgba(37, 99, 235, 0.3)',
      background: 'transparent'
    }}
  />
);
const ParticleField = () => {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = Math.min(window.devicePixelRatio, 2);
    const resize = () => {
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener('resize', resize);
    const particles = Array.from({ length: 40 }, () => ({
      x: Math.random() * canvas.offsetWidth,
      y: Math.random() * canvas.offsetHeight,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      radius: Math.random() * 2.5 + 0.5,
      hue: Math.random() > 0.5 ? 220 : 185,
      alpha: Math.random() * 0.4 + 0.1
    }));
    let animationId;
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.offsetWidth) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.offsetHeight) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 70%, 60%, ${p.alpha})`;
        ctx.fill();
        particles.slice(i + 1).forEach((p2) => {
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `hsla(210, 70%, 60%, ${0.1 * (1 - dist / 100)})`;
            ctx.stroke();
          }
        });
      });
    };
    animate();
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, []);
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
};
const FloatingIcon = ({ icon, className, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.6, type: 'spring' }}
    className={`absolute ${className}`}
  >
    <motion.div
      animate={{
        y: [0, -15, 0],
        rotate: [0, 10, 0]
      }}
      transition={{ duration: 5, repeat: Infinity, delay }}
      className="w-12 h-12 rounded-xl bg-dark-800/80 border border-primary-500/30 backdrop-blur-sm flex items-center justify-center text-2xl shadow-lg shadow-primary-500/10"
    >
      {icon}
    </motion.div>
  </motion.div>
);
const CTASection = () => {
  const { navigateToBuilder } = useApp();
  const sectionRef = useRef(null);
  const fileInputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  });
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.92, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0.3, 1]);
  const y = useTransform(scrollYProgress, [0, 0.5], [60, 0]);
  const handleStartBuilding = useCallback(() => navigateToBuilder(), [navigateToBuilder]);
  const handleFileSelect = useCallback((e) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setIsProcessing(true);
      setTimeout(() => {
        setIsProcessing(false);
        navigateToBuilder();
      }, 800);
    }
  }, [navigateToBuilder]);
  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0 && files[0].type === 'application/pdf') {
      setIsProcessing(true);
      setTimeout(() => {
        setIsProcessing(false);
        navigateToBuilder();
      }, 800);
    }
  }, [navigateToBuilder]);
  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);
  const handleDragLeave = useCallback(() => setIsDragging(false), []);
  return (
    <section ref={sectionRef} className="relative py-24 lg:py-36 overflow-hidden">
      <ParticleField />
      <div className="absolute inset-0 pointer-events-none">
        <MorphingBlob className="top-0 left-1/4 w-[500px] h-[500px] bg-primary-500/10" delay={0} />
        <MorphingBlob className="bottom-0 right-1/4 w-[600px] h-[600px] bg-accent-500/8" delay={5} />
        <MorphingBlob className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-cyan-500/8" delay={10} />
      </div>
      <div className="absolute inset-0 pointer-events-none hidden lg:block">
        <GlowingOrb className="w-6 h-6 top-20 left-[15%]" color="primary" delay={0} />
        <GlowingOrb className="w-4 h-4 top-32 right-[20%]" color="accent" delay={0.5} />
        <GlowingOrb className="w-8 h-8 bottom-24 left-[10%]" color="accent" delay={1} />
        <GlowingOrb className="w-5 h-5 bottom-32 right-[12%]" color="primary" delay={1.5} />
      </div>
      <FloatingIcon icon="🚀" className="top-20 left-[5%] hidden lg:block" delay={0.2} />
      <FloatingIcon icon="✨" className="top-32 right-[8%] hidden lg:block" delay={0.4} />
      <FloatingIcon icon="📄" className="bottom-24 left-[8%] hidden lg:block" delay={0.6} />
      <FloatingIcon icon="💼" className="bottom-20 right-[5%] hidden lg:block" delay={0.8} />
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.6 }}
        viewport={{ once: true }}
        className="absolute top-16 left-4 w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500/30 to-accent-500/30 border border-primary-500/20 lg:hidden"
        animate={{ y: [0, -10, 0], rotate: [0, 10, 0] }}
        transition={{ duration: 5, repeat: Infinity }}
      />
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.6 }}
        viewport={{ once: true }}
        className="absolute bottom-16 right-4 w-10 h-10 rounded-lg bg-gradient-to-br from-accent-500/30 to-cyan-500/30 border border-accent-500/20 lg:hidden"
        animate={{ y: [0, -12, 0], rotate: [0, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
      />
      <motion.div style={{ scale, opacity, y }} className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <FloatingCard delay={0.1} rotateRange={3}>
          <SpotlightCard className="rounded-3xl">
            <motion.div className="relative">
              <EnergyWave delay={0} />
              <EnergyWave delay={1} />
              <EnergyWave delay={2} />
              <motion.div
                animate={{
                  boxShadow: [
                    '0 0 40px rgba(37, 99, 235, 0.15), 0 0 80px rgba(37, 99, 235, 0.1)',
                    '0 0 60px rgba(37, 99, 235, 0.25), 0 0 120px rgba(37, 99, 235, 0.15)',
                    '0 0 40px rgba(37, 99, 235, 0.15), 0 0 80px rgba(37, 99, 235, 0.1)'
                  ]
                }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -inset-0.5 bg-gradient-to-r from-primary-500/30 via-accent-500/30 to-cyan-500/30 rounded-3xl blur-xl"
              />
              <div className="relative bg-dark-900/95 backdrop-blur-2xl rounded-3xl border border-primary-500/20 p-8 sm:p-12 lg:p-16 overflow-hidden">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <OrbitalRing size={300} duration={25} delay={0} color="rgba(37, 99, 235, 0.1)" />
                  <OrbitalRing size={450} duration={35} delay={2} color="rgba(6, 182, 212, 0.08)" />
                  <OrbitalRing size={600} duration={45} delay={4} color="rgba(139, 92, 246, 0.06)" />
                </div>
                <div className="relative text-center">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="inline-block mb-6"
                  >
                    <motion.div
                      animate={{ rotate: [0, 5, -5, 0] }}
                      transition={{ duration: 6, repeat: Infinity }}
                      className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-primary-500/20 to-accent-500/20 border border-primary-500/30 flex items-center justify-center backdrop-blur-sm"
                    >
                      <motion.span
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="text-4xl"
                      >
                        🎯
                      </motion.span>
                    </motion.div>
                  </motion.div>
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 font-heading"
                  >
                    <span className="bg-gradient-to-r from-primary-400 via-accent-400 to-cyan-400 bg-clip-text text-transparent animate-gradient-x bg-[length:200%_auto]">
                      Ready to Build
                    </span>{' '}
                    <span className="text-skyWhite">Your Portfolio?</span>
                  </motion.h2>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="text-base sm:text-lg text-lightSky max-w-xl mx-auto mb-10"
                  >
                    Upload your resume and watch your portfolio come to life in seconds.
                  </motion.p>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="max-w-md mx-auto mb-8"
                  >
                    <SpotlightCard className="rounded-2xl">
                      <motion.div
                        className={`relative rounded-2xl border-2 border-dashed transition-all duration-500 p-8 ${isDragging ? 'border-primary-500 bg-primary-500/10 scale-[1.02]' : 'border-primary-500/30 bg-dark-800/60'} backdrop-blur-lg`}
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        whileHover={{ borderColor: 'rgba(37, 99, 235, 0.6)' }}
                      >
                        {isProcessing && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="absolute inset-0 bg-dark-900/95 rounded-2xl flex items-center justify-center z-10 backdrop-blur-sm"
                          >
                            <div className="flex flex-col items-center gap-4">
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                                className="w-10 h-10 border-3 border-primary-500 border-t-transparent rounded-full"
                              />
                              <span className="text-primary-400 font-medium">Processing your resume...</span>
                            </div>
                          </motion.div>
                        )}
                        <motion.div
                          animate={{ y: [0, -5, 0] }}
                          transition={{ duration: 3, repeat: Infinity }}
                          className="w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br from-primary-500/20 to-accent-500/20 border border-primary-500/30 flex items-center justify-center"
                        >
                          <svg className="w-8 h-8 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                          </svg>
                        </motion.div>
                        <h3 className="text-xl font-bold text-skyWhite mb-2">Upload Your Resume</h3>
                        <p className="text-lightSky/70 text-sm mb-6 max-w-xs mx-auto">
                          Drag and drop your PDF resume here, or click to browse your files
                        </p>
                        <input ref={fileInputRef} type="file" accept=".pdf" onChange={handleFileSelect} className="hidden" />
                        <MagneticButton
                          onClick={() => fileInputRef.current?.click()}
                          disabled={isProcessing}
                          className="px-8 py-3 rounded-xl text-sm font-semibold bg-gradient-to-r from-primary-500 to-accent-500 text-skyWhite shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40 transition-shadow"
                        >
                          Choose File
                        </MagneticButton>
                        <p className="text-gray-500 text-xs mt-4 font-mono">PDF only, max 10MB</p>
                      </motion.div>
                    </SpotlightCard>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.25 }}
                    className="flex items-center justify-center gap-4 mb-8"
                  >
                    <div className="h-px w-16 bg-gradient-to-r from-transparent to-primary-500/30" />
                    <span className="text-lightSky/50 text-sm">or</span>
                    <div className="h-px w-16 bg-gradient-to-l from-transparent to-primary-500/30" />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                  >
                    <MagneticButton
                      onClick={handleStartBuilding}
                      className="group px-10 py-4 rounded-2xl text-base font-semibold border-2 border-primary-500/30 text-skyWhite hover:border-primary-500/60 transition-all duration-300 bg-dark-800/50 backdrop-blur-sm"
                    >
                      <span className="flex items-center gap-3">
                        <svg className="w-5 h-5 text-primary-400 group-hover:rotate-12 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        Build Now Manually
                        <motion.svg
                          className="w-4 h-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          animate={{ x: [0, 4, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </motion.svg>
                      </span>
                    </MagneticButton>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="flex flex-wrap items-center justify-center gap-6 text-sm text-lightSky font-mono mt-10"
                  >
                    {[
                      { icon: '⚡', text: 'Instant generation' },
                      { icon: '📄', text: 'Any resume format' },
                      { icon: '✅', text: 'ATS-optimized output' },
                    ].map((item, i) => (
                      <motion.div
                        key={item.text}
                        whileHover={{ scale: 1.08, y: -3 }}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-dark-800/50 border border-primary-500/10"
                      >
                        <span>{item.icon}</span>
                        <span>{item.text}</span>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </SpotlightCard>
        </FloatingCard>
      </motion.div>
    </section>
  );
};
export default CTASection;