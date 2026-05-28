import React from 'react';
import { motion } from 'framer-motion';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'purple' | 'secondary' | 'ghost' | 'danger' | 'success' | 'outline';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  loading?: boolean;
  icon?: React.ReactNode;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  icon,
  fullWidth = false,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-300 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus-ring';
  
  const variants = {
    primary: 'bg-gradient-to-r from-sky-500 to-sky-600 text-white hover:from-sky-400 hover:to-sky-500 shadow-[0_4px_14px_rgba(2,132,199,0.2)] hover:shadow-[0_6px_20px_rgba(2,132,199,0.3)] border border-sky-500/20',
    purple: 'bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white hover:from-violet-500 hover:to-fuchsia-500 shadow-[0_4px_14px_rgba(124,58,237,0.2)] hover:shadow-[0_6px_20px_rgba(124,58,237,0.3)] border border-violet-500/20',
    secondary: 'glass-btn',
    ghost: 'glass-btn-secondary hover:shadow-sm',
    danger: 'bg-gradient-to-r from-red-500 to-pink-500 text-white hover:from-red-400 hover:to-pink-400 shadow-[0_4px_12px_rgba(239,68,68,0.15)] border border-red-500/20',
    success: 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:from-emerald-400 hover:to-teal-400 shadow-[0_4px_12px_rgba(16,185,129,0.15)] border border-emerald-500/20',
    outline: 'border border-sky-500/40 text-sky-600 hover:border-sky-600 hover:bg-sky-500/5 transition-all duration-300',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs gap-1.5',
    md: 'px-5 py-2.5 text-sm gap-2',
    lg: 'px-7 py-3 text-base gap-2.5',
    xl: 'px-8 py-4 text-lg gap-3',
  };

  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <motion.button
      whileHover={{ scale: 1.05, y: -1 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 400, damping: 15 }}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${widthClass} ${className}`}
      disabled={disabled || loading}
      {...(props as any)}
    >
      {loading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current flex-shrink-0" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      )}
      {!loading && icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </motion.button>
  );
};
