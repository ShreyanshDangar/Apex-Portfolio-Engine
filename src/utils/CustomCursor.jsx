import { useEffect, useRef, useState } from 'react';
export default function CustomCursor() {
  const cursorDotRef = useRef(null);
  const cursorOutlineRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const cursorPos = useRef({ x: 0, y: 0 });
  const mousePos = useRef({ x: 0, y: 0 });
  useEffect(() => {
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;
    const handleMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };
    const handleMouseEnter = (e) => {
      if (e.target instanceof Element && e.target.closest('a, button, [data-magnetic], input, textarea')) {
        setIsHovering(true);
      }
    };
    const handleMouseLeave = (e) => {
      if (!e.relatedTarget || !(e.relatedTarget instanceof Element) || !e.relatedTarget.closest('a, button, [data-magnetic], input, textarea')) {
        setIsHovering(false);
      }
    };
    const animate = () => {
      cursorPos.current.x += (mousePos.current.x - cursorPos.current.x) * 0.25;
      cursorPos.current.y += (mousePos.current.y - cursorPos.current.y) * 0.25;

      if (cursorDotRef.current && cursorOutlineRef.current) {
        cursorDotRef.current.style.transform = `translate(${cursorPos.current.x}px, ${cursorPos.current.y}px)`;
        cursorOutlineRef.current.style.transform = `translate(${cursorPos.current.x}px, ${cursorPos.current.y}px)`;
      }
      requestAnimationFrame(animate);
    };
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter, true);
    document.addEventListener('mouseleave', handleMouseLeave, true);
    animate();
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter, true);
      document.removeEventListener('mouseleave', handleMouseLeave, true);
    };
  }, []);
  return (
    <div className="custom-cursor hidden lg:block">
      <div
        ref={cursorDotRef}
        className={`fixed top-0 left-0 pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 transition-all duration-150 ${
          isHovering ? 'w-3 h-3' : 'w-2 h-2'
        }`}
      >
        <div className="w-full h-full bg-white rounded-full" />
      </div>
      <div
        ref={cursorOutlineRef}
        className={`fixed top-0 left-0 pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 transition-all duration-200 ${
          isHovering ? 'w-16 h-16' : 'w-10 h-10'
        }`}
      >
        <div className="w-full h-full border-2 border-white/50 rounded-full" />
      </div>
    </div>
  );
}