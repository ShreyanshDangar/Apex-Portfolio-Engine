import { motion } from 'framer-motion';
const Button = ({
  children,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  icon = null,
  iconPosition = 'right',
  onClick,
  type = 'button',
  ariaLabel,
  className = '',
  ...props
}) => {
  const baseClasses = 'relative inline-flex items-center justify-center gap-2 font-semibold rounded-full transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden';
  const variantClasses = {
    primary: 'bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow-high hover:shadow-glow-primary',
    secondary: 'bg-transparent backdrop-blur-sm border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/50',
    ghost: 'bg-transparent text-gray-300 hover:bg-white/5',
    danger: 'bg-red-500 text-white hover:bg-red-600',
  };
  const sizeClasses = {
    small: 'px-4 py-2 text-sm',
    medium: 'px-6 py-3 text-base',
    large: 'px-8 py-4 text-lg',
  };
  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;
  return (
    <motion.button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled || loading}
      aria-label={ariaLabel}
      whileHover={{ scale: disabled || loading ? 1 : 1.05, y: disabled || loading ? 0 : -2 }}
      whileTap={{ scale: disabled || loading ? 1 : 0.95 }}
      {...props}
    >
      {loading && (
        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
        </svg>
      )}
      {icon && iconPosition === 'left' && !loading && (
        <span className="w-5 h-5">{icon}</span>
      )}
      <span className="relative z-10">{children}</span>
      {icon && iconPosition === 'right' && !loading && (
        <span className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1">{icon}</span>
      )}
      {variant === 'primary' && !disabled && (
        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transition-opacity duration-600 group-hover:animate-shimmer" />
      )}
    </motion.button>
  );
};
export default Button;