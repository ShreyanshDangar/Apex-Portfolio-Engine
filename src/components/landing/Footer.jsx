import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
const MorphingBlob = ({ className, colors, size, duration = 10, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.5 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 1 }}
    className={`absolute ${className}`}
  >
    <motion.div
      animate={{
        borderRadius: ['60% 40% 30% 70%/60% 30% 70% 40%', '30% 60% 70% 40%/50% 60% 30% 60%', '60% 40% 30% 70%/60% 30% 70% 40%'],
        rotate: [0, 180, 360],
        scale: [1, 1.1, 1]
      }}
      transition={{ duration, repeat: Infinity, ease: 'easeInOut' }}
      className={`${size} ${colors} opacity-30 blur-3xl`}
    />
  </motion.div>
);
const GlowingLine = ({ className, direction = 'horizontal' }) => {
  const isHorizontal = direction === 'horizontal';
  return (
    <div className={`absolute ${className} overflow-hidden ${isHorizontal ? 'h-px w-full' : 'w-px h-full'}`}>
      <motion.div
        animate={{ x: isHorizontal ? ['-100%', '100%'] : 0, y: isHorizontal ? 0 : ['-100%', '100%'] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        className={`${isHorizontal ? 'h-full w-1/3' : 'w-full h-1/3'} bg-gradient-to-r from-transparent via-primary-500/50 to-transparent`}
      />
    </div>
  );
};
const FloatingIcon = ({ children, className, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.6 }}
    className={`absolute ${className}`}
  >
    <motion.div
      animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
      transition={{ duration: 4 + delay, repeat: Infinity, ease: 'easeInOut' }}
      className="p-3 rounded-xl bg-dark-800/80 border border-primary-500/20 backdrop-blur-sm shadow-xl"
    >
      {children}
    </motion.div>
  </motion.div>
);
const MagneticLink = ({ children, onClick, className }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });
  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * 0.1);
    y.set((e.clientY - centerY) * 0.1);
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
      className={className}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.button>
  );
};
const AnimatedInput = ({ value, onChange, placeholder }) => {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <div className="relative flex-1">
      <motion.div
        animate={{ opacity: isFocused ? 1 : 0 }}
        className="absolute -inset-px rounded-xl bg-gradient-to-r from-primary-500 to-accent-500 blur-sm"
      />
      <input
        type="email"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="relative w-full px-4 py-3 bg-dark-900/90 border border-primary-500/20 rounded-xl text-skyWhite placeholder-gray-500 focus:outline-none focus:border-primary-500/50 transition-all font-mono text-sm"
      />
    </div>
  );
};
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
    const particles = Array.from({ length: 30 }, () => ({
      x: Math.random() * canvas.offsetWidth,
      y: Math.random() * canvas.offsetHeight,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      radius: Math.random() * 2 + 1,
      hue: Math.random() > 0.5 ? 220 : 185,
      alpha: Math.random() * 0.3 + 0.1
    }));
    let animationId;
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.offsetWidth) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.offsetHeight) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 70%, 60%, ${p.alpha})`;
        ctx.fill();
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
const Footer = () => {
  const { navigateToBuilder } = useApp();
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const footerLinks = {
    product: [
      { label: 'Features', action: () => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' }) },
      { label: 'Templates', action: () => document.getElementById('showcase')?.scrollIntoView({ behavior: 'smooth' }) },
      { label: 'How It Works', action: () => document.getElementById('process')?.scrollIntoView({ behavior: 'smooth' }) },
      { label: 'Get Started', action: navigateToBuilder }
    ],
    resources: [
      { label: 'FAQ', action: () => document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' }) },
      { label: 'AI Features', action: () => {} },
      { label: 'Templates Guide', action: () => {} }
    ],
    legal: [
      { label: 'Privacy Policy', action: () => {} },
      { label: 'Terms of Service', action: () => {} }
    ]
  };
  const socialLinks = [
    {
      name: 'Twitter',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      )
    },
    {
      name: 'GitHub',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
        </svg>
      )
    }
  ];
  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };
  return (
    <footer className="relative bg-dark-950 border-t border-primary-500/10 overflow-hidden">
      <div className="relative mx-4 lg:mx-8 my-8 sm:my-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative rounded-3xl border border-primary-500/20 overflow-hidden"
        >
          <ParticleField />
          <MorphingBlob className="top-0 left-0" colors="bg-gradient-to-br from-primary-500 to-accent-500" size="w-64 h-64" duration={12} />
          <MorphingBlob className="bottom-0 right-0" colors="bg-gradient-to-br from-accent-500 to-cyan-500" size="w-48 h-48" duration={15} delay={0.5} />
          <GlowingLine className="top-0 left-0 right-0" direction="horizontal" />
          <GlowingLine className="bottom-0 left-0 right-0" direction="horizontal" />
          <FloatingIcon className="top-8 right-[15%] hidden lg:block" delay={0.2}>
            <svg className="w-6 h-6 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </FloatingIcon>
          <FloatingIcon className="top-12 right-[30%] hidden xl:block" delay={0.4}>
            <svg className="w-5 h-5 text-accent-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
            </svg>
          </FloatingIcon>
          <FloatingIcon className="bottom-8 right-[20%] hidden lg:block" delay={0.6}>
            <svg className="w-5 h-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" />
            </svg>
          </FloatingIcon>
          <div className="relative z-10 p-8 sm:p-10 lg:p-14">
            <div className="max-w-lg">
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="inline-block text-xs uppercase tracking-widest text-primary-400 font-mono mb-3"
              >
                Stay up to date
              </motion.span>
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-2xl sm:text-3xl lg:text-4xl font-bold text-skyWhite mb-6 font-heading"
              >
                Get our{' '}
                <span className="bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent">
                  newsletter
                </span>
              </motion.h3>
              <motion.form
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                onSubmit={handleSubscribe}
                className="flex gap-3"
              >
                <AnimatedInput
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                />
                <MagneticLink
                  onClick={handleSubscribe}
                  className="px-5 py-3 bg-gradient-to-r from-primary-500 to-accent-500 rounded-xl text-skyWhite font-semibold shadow-lg shadow-primary-500/25 flex items-center gap-2"
                >
                  <span className="hidden sm:inline">Subscribe</span>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </MagneticLink>
              </motion.form>
              {isSubscribed && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-green-400 text-sm mt-4 font-mono flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  Thanks for subscribing!
                </motion.p>
              )}
            </div>
          </div>
        </motion.div>
      </div>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-0 left-1/4 w-[500px] h-[250px] bg-primary-500/5 rounded-full blur-[150px]"
        />
        <motion.div
          animate={{ x: [0, -50, 0], y: [0, -30, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-0 right-1/4 w-[400px] h-[200px] bg-accent-500/5 rounded-full blur-[120px]"
        />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12 lg:py-16">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="col-span-2"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="inline-block text-2xl sm:text-3xl font-bold bg-gradient-to-r from-primary-400 via-accent-400 to-cyan-400 bg-clip-text text-transparent mb-4 font-heading cursor-default"
              >
                APEX
              </motion.div>
              <p className="text-lightSky text-sm leading-relaxed max-w-xs mb-6">
                AI-powered portfolio builder. Paste your resume, get a stunning portfolio in seconds.
              </p>
              <div className="flex items-center gap-3">
                {socialLinks.map((social, i) => (
                  <MagneticLink
                    key={social.name}
                    onClick={() => {}}
                    className="w-10 h-10 rounded-xl bg-dark-800/80 border border-primary-500/20 flex items-center justify-center text-lightSky hover:text-skyWhite hover:bg-primary-500/10 hover:border-primary-500/40 transition-all duration-300 backdrop-blur-sm"
                  >
                    {social.icon}
                  </MagneticLink>
                ))}
              </div>
            </motion.div>
            {Object.entries(footerLinks).map(([category, links], categoryIndex) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * (categoryIndex + 1) }}
              >
                <h3 className="text-sm font-semibold text-skyWhite uppercase tracking-wider mb-4 font-mono">
                  {category}
                </h3>
                <ul className="space-y-3">
                  {links.map((link, linkIndex) => (
                    <motion.li
                      key={link.label}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.05 * linkIndex }}
                    >
                      <motion.button
                        onClick={link.action}
                        whileHover={{ x: 4, color: '#F0F9FF' }}
                        className="text-sm text-lightSky transition-colors duration-300 text-left"
                      >
                        {link.label}
                      </motion.button>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="py-6 border-t border-primary-500/10"
        >
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <motion.p
              animate={{ opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="text-sm text-lightSky/60 font-mono"
            >
              APEX Portfolio Builder
            </motion.p>
            <MagneticLink
              onClick={navigateToBuilder}
              className="px-6 py-2.5 text-sm font-semibold text-skyWhite bg-gradient-to-r from-primary-500 to-accent-500 rounded-xl shadow-lg shadow-primary-500/20 flex items-center gap-2 group"
            >
              <span>Create Your Portfolio</span>
              <motion.svg
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </motion.svg>
            </MagneticLink>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};
export default Footer;