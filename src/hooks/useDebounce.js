import { useState, useEffect } from 'react';
export function useDebounce(value, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return debouncedValue;
}
export function useThrottle(callback, delay = 300) {
  const [ready, setReady] = useState(true);
  const throttledCallback = (...args) => {
    if (!ready) return;
    callback(...args);
    setReady(false);
    setTimeout(() => {
      setReady(true);
    }, delay);
  };
  return throttledCallback;
}