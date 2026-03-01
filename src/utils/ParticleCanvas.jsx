import { useEffect, useRef, useCallback } from 'react';
const CONFIG = {
  desktop: { count: 60, maxDistance: 100, speed: 0.2 },
  mobile: { count: 25, maxDistance: 80, speed: 0.15 }
};
export default function ParticleCanvas() {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const particlesRef = useRef([]);
  const animationRef = useRef(null);
  const dimensionsRef = useRef({ width: 0, height: 0 });
  const createParticle = useCallback((width, height, config) => ({
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * config.speed,
    vy: (Math.random() - 0.5) * config.speed,
    radius: Math.random() * 1.5 + 0.5,
    opacity: Math.random() * 0.25 + 0.08,
    hue: Math.random() > 0.5 ? 250 : 185
  }), []);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    contextRef.current = ctx;
    const isMobile = window.innerWidth < 768;
    const config = isMobile ? CONFIG.mobile : CONFIG.desktop;
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      const width = window.innerWidth;
      const height = window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.scale(dpr, dpr);
      dimensionsRef.current = { width, height };
    };
    resize();
    particlesRef.current = Array.from({ length: config.count }, () =>
      createParticle(dimensionsRef.current.width, dimensionsRef.current.height, config)
    );
    const handleResize = () => {
      resize();
      particlesRef.current.forEach(p => {
        if (p.x > dimensionsRef.current.width) p.x = Math.random() * dimensionsRef.current.width;
        if (p.y > dimensionsRef.current.height) p.y = Math.random() * dimensionsRef.current.height;
      });
    };
    window.addEventListener('resize', handleResize, { passive: true });
    let lastTime = 0;
    const targetFPS = 60;
    const frameInterval = 1000 / targetFPS;
    const animate = (currentTime) => {
      animationRef.current = requestAnimationFrame(animate);
      const delta = currentTime - lastTime;
      if (delta < frameInterval) return;
      lastTime = currentTime - (delta % frameInterval);
      const { width, height } = dimensionsRef.current;
      const particles = particlesRef.current;
      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) { p.x = 0; p.vx *= -1; }
        if (p.x > width) { p.x = width; p.vx *= -1; }
        if (p.y < 0) { p.y = 0; p.vy *= -1; }
        if (p.y > height) { p.y = height; p.vy *= -1; }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 80%, 65%, ${p.opacity})`;
        ctx.fill();
      }
      ctx.lineWidth = 0.5;
      const maxDist = config.maxDistance;
      const maxDistSq = maxDist * maxDist;
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distSq = dx * dx + dy * dy;
          if (distSq < maxDistSq) {
            const opacity = (1 - distSq / maxDistSq) * 0.12;
            const gradient = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
            gradient.addColorStop(0, `hsla(${p1.hue}, 80%, 65%, ${opacity})`);
            gradient.addColorStop(1, `hsla(${p2.hue}, 80%, 65%, ${opacity})`);
            ctx.strokeStyle = gradient;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }
    };
    animationRef.current = requestAnimationFrame(animate);
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [createParticle]);
  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0"
      style={{ pointerEvents: 'none' }}
      aria-hidden="true"
    />
  );
}