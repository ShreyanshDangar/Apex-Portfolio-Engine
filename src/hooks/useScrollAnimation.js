import { useEffect, useRef } from 'react';
export function useScrollAnimation(threshold = 0.1, rootMargin = '0px 0px -100px 0px') {
  const elementRef = useRef(null);
  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            element.classList.add('animate-in');
            observer.unobserve(element);
          }
        });
      },
      { threshold, rootMargin }
    );
    observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, [threshold, rootMargin]);

  return elementRef;
}
export function useStaggerChildren(delay = 100) {
  const containerRef = useRef(null);
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const children = container.querySelectorAll('[data-stagger]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            children.forEach((child, index) => {
              setTimeout(() => {
                child.classList.add('animate-in');
              }, index * delay);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    observer.observe(container);

    return () => {
      if (container) observer.unobserve(container);
    };
  }, [delay]);
  return containerRef;
}