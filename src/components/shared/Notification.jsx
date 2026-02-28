import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircleIcon, XCircleIcon, ExclamationTriangleIcon, InformationCircleIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useApp } from '../../context/AppContext';
const NOTIFICATION_DURATION = 3000;
export default function Notification() {
  const { state, dispatch } = useApp();
  const timersRef = useRef({});
  useEffect(() => {
    state.uiState.notifications.forEach((notification) => {
      if (!timersRef.current[notification.id]) {
        timersRef.current[notification.id] = setTimeout(() => {
          dispatch({ type: 'CLEAR_NOTIFICATION', payload: notification.id });
          delete timersRef.current[notification.id];
        }, NOTIFICATION_DURATION);
      }
    });
    return () => {
      Object.keys(timersRef.current).forEach((id) => {
        if (!state.uiState.notifications.find(n => n.id === id)) {
          clearTimeout(timersRef.current[id]);
          delete timersRef.current[id];
        }
      });
    };
  }, [state.uiState.notifications, dispatch]);
  const getIcon = (type) => {
    switch (type) {
      case 'success':
        return <CheckCircleIcon className="w-6 h-6 text-emerald-500" />;
      case 'error':
        return <XCircleIcon className="w-6 h-6 text-red-500" />;
      case 'warning':
        return <ExclamationTriangleIcon className="w-6 h-6 text-amber-500" />;
      default:
        return <InformationCircleIcon className="w-6 h-6 text-blue-500" />;
    }
  };
  const getStyles = (type) => {
    switch (type) {
      case 'success':
        return 'border-emerald-500/20 bg-emerald-500/10';
      case 'error':
        return 'border-red-500/20 bg-red-500/10';
      case 'warning':
        return 'border-amber-500/20 bg-amber-500/10';
      default:
        return 'border-blue-500/20 bg-blue-500/10';
    }
  };
  const getProgressColor = (type) => {
    switch (type) {
      case 'success':
        return 'bg-emerald-500';
      case 'error':
        return 'bg-red-500';
      case 'warning':
        return 'bg-amber-500';
      default:
        return 'bg-blue-500';
    }
  };
  const handleDismiss = (id) => {
    if (timersRef.current[id]) {
      clearTimeout(timersRef.current[id]);
      delete timersRef.current[id];
    }
    dispatch({ type: 'CLEAR_NOTIFICATION', payload: id });
  };
  return (
    <div className="fixed top-20 right-4 z-[10000] flex flex-col gap-2 max-w-sm sm:max-w-md">
      <AnimatePresence>
        {state.uiState.notifications.map((notification) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, x: 100, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 100, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            className={`relative flex items-start gap-3 p-4 rounded-xl border backdrop-blur-lg overflow-hidden ${getStyles(notification.type)}`}
          >
            <div className="flex-shrink-0">
              {getIcon(notification.type)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white break-words">{notification.message}</p>
            </div>
            <button
              onClick={() => handleDismiss(notification.id)}
              className="flex-shrink-0 text-white/60 hover:text-white transition-colors"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>
            {/* Animated progress line that moves from left to right */}
            <motion.div
              className={`absolute bottom-0 left-0 h-1 ${getProgressColor(notification.type)}`}
              initial={{ width: '100%' }}
              animate={{ width: '0%' }}
              transition={{ duration: NOTIFICATION_DURATION / 1000, ease: 'linear' }}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}