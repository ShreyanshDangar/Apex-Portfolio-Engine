import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef, useState, useCallback, useEffect } from 'react';
const ComparisonSection = () => {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [containerBounds, setContainerBounds] = useState({ top: 0, bottom: 0, left: 0, right: 0 });
  const mouseX = useMotionValue(50);
  const smoothX = useSpring(mouseX, { stiffness: 300, damping: 30, mass: 0.5 });
  const sliderPosition = useTransform(smoothX, (val) => Math.max(5, Math.min(95, val)));
  useEffect(() => {
    const checkTouchDevice = () => {
      setIsTouchDevice(
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        window.matchMedia('(pointer: coarse)').matches
      );
    };
    checkTouchDevice();
  }, []);
  useEffect(() => {
    const updateBounds = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setContainerBounds({
          top: rect.top + window.scrollY,
          bottom: rect.bottom + window.scrollY,
          left: rect.left,
          right: rect.right,
          width: rect.width
        });
      }
    };
    updateBounds();
    window.addEventListener('resize', updateBounds);
    window.addEventListener('scroll', updateBounds);
    return () => {
      window.removeEventListener('resize', updateBounds);
      window.removeEventListener('scroll', updateBounds);
    };
  }, []);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const startTime = Date.now();
          const duration = 1800;
          const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            mouseX.set(50 + eased * 15);
            if (progress < 1) requestAnimationFrame(animate);
          };
          setTimeout(animate, 800);
        }
      },
      { threshold: 0.3 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [mouseX, hasAnimated]);
  useEffect(() => {
    if (isTouchDevice) return;
    const handleGlobalMouseMove = (e) => {
      const scrollY = window.scrollY;
      const mouseY = e.clientY + scrollY;
      if (mouseY >= containerBounds.top && mouseY <= containerBounds.bottom) {
        const percentage = ((e.clientX - containerBounds.left) / containerBounds.width) * 100;
        mouseX.set(Math.max(0, Math.min(100, percentage)));
      }
    };
    window.addEventListener('mousemove', handleGlobalMouseMove);
    return () => window.removeEventListener('mousemove', handleGlobalMouseMove);
  }, [isTouchDevice, containerBounds, mouseX]);
  const handleTouch = useCallback((e) => {
    if (!isTouchDevice || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const touch = e.touches?.[0] || e.changedTouches?.[0];
    if (!touch) return;
    const x = touch.clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    mouseX.set(percentage);
  }, [isTouchDevice, mouseX]);
  const handleArrow = useCallback((direction) => {
    const current = mouseX.get();
    const step = 25;
    const next = direction === 'left' ? Math.max(5, current - step) : Math.min(95, current + step);
    const startVal = current;
    const startTime = Date.now();
    const duration = 400;
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      mouseX.set(startVal + (next - startVal) * eased);
      if (progress < 1) requestAnimationFrame(animate);
    };
    animate();
  }, [mouseX]);
  return (
    <section ref={sectionRef} className="relative py-24 lg:py-32 bg-dark-950 overflow-hidden">
      <div className="absolute inset-0">
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary-500/5 rounded-full blur-[200px]"
        />
        <motion.div
          animate={{ scale: [1.1, 1, 1.1], rotate: [0, 180, 360] }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          className="absolute top-0 right-0 w-[400px] h-[400px] bg-accent-500/5 rounded-full blur-[150px]"
        />
      </div>
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
          className="text-center mb-12 lg:mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary-500/10 to-accent-500/10 border border-primary-500/20 mb-6"
          >
            <motion.span
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              className="w-2 h-2 rounded-full bg-gradient-to-r from-primary-500 to-accent-500"
            />
            <span className="text-sm font-medium text-accent-400 font-mono">AI Magic</span>
          </motion.div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 font-heading">
            <span className="text-skyWhite">See the </span>
            <span className="bg-gradient-to-r from-primary-400 via-accent-400 to-cyan-400 bg-clip-text text-transparent">
              Transformation
            </span>
          </h2>
          <p className="text-lg text-lightSky max-w-2xl mx-auto">
            {isTouchDevice
              ? 'Swipe or tap anywhere to reveal the magic'
              : 'Move your cursor to see the transformation'}
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative max-w-4xl mx-auto"
        >
          {isTouchDevice && (
            <div className="absolute -left-4 -right-4 top-1/2 -translate-y-1/2 flex justify-between z-40 pointer-events-none">
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => handleArrow('left')}
                className="w-12 h-12 rounded-full bg-dark-800/90 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shadow-2xl pointer-events-auto"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => handleArrow('right')}
                className="w-12 h-12 rounded-full bg-dark-800/90 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shadow-2xl pointer-events-auto"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </motion.button>
            </div>
          )}
          <div
            ref={containerRef}
            onTouchStart={handleTouch}
            onTouchMove={handleTouch}
            className="relative rounded-3xl overflow-hidden border border-primary-500/20 shadow-2xl cursor-crosshair"
            style={{ aspectRatio: '16/10' }}
          >
            <div className="absolute -inset-px rounded-3xl bg-gradient-to-r from-primary-500/20 via-accent-500/10 to-primary-500/20 opacity-50" />
            <div className="absolute inset-0 bg-gradient-to-br from-dark-900 via-dark-900 to-dark-800">
              <motion.div
                className="absolute top-4 left-1/2 -translate-x-1/2 z-20"
                style={{ opacity: useTransform(sliderPosition, (v) => v > 50 ? 0 : 1) }}
              >
                <span className="px-4 py-1.5 bg-red-500/20 text-red-400 text-xs font-bold rounded-full border border-red-500/30 font-mono tracking-wider">
                  BEFORE
                </span>
              </motion.div>
              <div className="absolute inset-0 flex items-center justify-center p-8 sm:p-12">
                <div className="w-full max-w-md">
                  <div className="bg-dark-800/80 rounded-xl p-5 sm:p-6 border border-red-500/20 border-dashed backdrop-blur-sm">
                    <pre className="text-[10px] sm:text-xs lg:text-sm text-gray-400 whitespace-pre-wrap font-mono leading-relaxed text-center">
{`john smith software dev at techcorp
work history:
2021-present: senior dev
built apis, databases, backend stuff
used python javascript sql
education: computer science degree 2019
my skills:
python, javascript, sql, git, docker
some aws experience
projects i worked on:
ecommerce platform (backend)
internal dashboard tool
api integrations`}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-dark-800 via-dark-850 to-dark-900"
              style={{ clipPath: useTransform(sliderPosition, (v) => `inset(0 ${100 - v}% 0 0)`) }}
            >
              <motion.div
                className="absolute top-4 left-1/2 -translate-x-1/2 z-20"
                style={{ opacity: useTransform(sliderPosition, (v) => v < 50 ? 0 : 1) }}
              >
                <motion.span
                  animate={{ boxShadow: ['0 0 20px rgba(37, 99, 235, 0.3)', '0 0 40px rgba(37, 99, 235, 0.5)', '0 0 20px rgba(37, 99, 235, 0.3)'] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="px-4 py-1.5 bg-gradient-to-r from-primary-500 to-accent-500 text-white text-xs font-bold rounded-full font-mono tracking-wider"
                >
                  AFTER
                </motion.span>
              </motion.div>
              <div className="absolute inset-0 flex items-center justify-center p-8 sm:p-12">
                <div className="w-full max-w-md">
                  <div className="bg-gradient-to-br from-primary-500/10 via-dark-700/50 to-accent-500/10 rounded-xl p-5 sm:p-6 border border-primary-500/30 backdrop-blur-sm">
                    <div className="text-center space-y-4">
                      <motion.div
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 3, repeat: Infinity }}
                        className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white font-bold text-xl sm:text-2xl shadow-lg shadow-primary-500/30"
                      >
                        JS
                      </motion.div>
                      <div>
                        <h4 className="text-lg sm:text-xl lg:text-2xl font-bold text-skyWhite">John Smith</h4>
                        <p className="text-primary-400 text-sm sm:text-base font-medium">Senior Software Developer</p>
                      </div>
                      <div className="flex flex-wrap justify-center gap-2">
                        {['Python', 'JavaScript', 'SQL', 'AWS', 'Docker'].map((skill, i) => (
                          <motion.span
                            key={skill}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.1 }}
                            whileHover={{ scale: 1.1, y: -2 }}
                            className="px-3 py-1 bg-primary-500/20 text-primary-300 text-xs sm:text-sm rounded-lg font-mono border border-primary-500/30"
                          >
                            {skill}
                          </motion.span>
                        ))}
                      </div>
                      <div className="bg-white/5 rounded-lg p-3 sm:p-4">
                        <div className="text-skyWhite text-sm sm:text-base font-semibold">Senior Software Developer</div>
                        <div className="text-gray-500 text-xs mb-2">TechCorp Inc. • 2021 - Present</div>
                        <div className="space-y-1 text-left">
                          <p className="text-xs text-gray-400 flex items-start gap-2">
                            <span className="text-primary-400 mt-0.5">•</span>
                            <span>Architected scalable APIs handling 50K+ requests/day</span>
                          </p>
                          <p className="text-xs text-gray-400 flex items-start gap-2">
                            <span className="text-primary-400 mt-0.5">•</span>
                            <span>Reduced database query latency by 40%</span>
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
                        <svg className="w-4 h-4 text-accent-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                        </svg>
                        <span className="font-mono">B.S. Computer Science • 2019</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
            <motion.div
              className="absolute top-0 bottom-0 w-1 z-30 pointer-events-none"
              style={{
                left: useTransform(sliderPosition, (v) => `${v}%`),
                x: '-50%',
                background: 'linear-gradient(to bottom, #2563EB, #ffffff, #06B6D4)',
                boxShadow: '0 0 30px rgba(37, 99, 235, 0.6), 0 0 60px rgba(37, 99, 235, 0.3)'
              }}
            >
              <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-dark-900/95 backdrop-blur-md border-2 border-white/80 shadow-2xl flex items-center justify-center"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className="flex items-center gap-1">
                  <motion.svg
                    animate={{ x: [-2, 0, -2] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="w-4 h-4 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </motion.svg>
                  <motion.svg
                    animate={{ x: [2, 0, 2] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="w-4 h-4 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </motion.svg>
                </div>
              </motion.div>
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-8 flex items-center justify-center gap-8"
          >
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-red-500/50" />
              <span className="text-sm text-lightSky/60 font-mono">Plain Text Resume</span>
            </div>
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-primary-400"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </motion.div>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-primary-500 to-accent-500" />
              <span className="text-sm text-lightSky/60 font-mono">Professional Portfolio</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
export default ComparisonSection;
