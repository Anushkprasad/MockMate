import React from 'react';
import { motion } from 'framer-motion';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  hoverable?: boolean;
  glowColor?: 'purple' | 'cyan' | 'emerald' | 'pink' | 'blue' | 'none';
  size?: 'sm' | 'md' | 'lg';
  variant?: 'glass' | 'elevated' | 'flat' | 'outline';
  interactive?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  hoverable = false,
  glowColor = 'none',
  size = 'md',
  variant = 'glass',
  interactive = false,
  className = '',
  ...props
}) => {
  const glowClasses = {
    purple: 'hover:border-violet-500/50 hover:shadow-glow-md hover:shadow-glow-purple',
    cyan: 'hover:border-cyan-500/50 hover:shadow-glow-md hover:shadow-glow-cyan',
    emerald: 'hover:border-emerald-500/50 hover:shadow-[0_8px_32px_0_rgba(16,185,129,0.2)]',
    pink: 'hover:border-fuchsia-500/50 hover:shadow-glow-md hover:shadow-glow-pink',
    blue: 'hover:border-blue-500/50 hover:shadow-[0_8px_32px_0_rgba(59,130,246,0.2)]',
    none: '',
  };

  const sizeClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  const variantClasses = {
    glass: 'glass-panel',
    elevated: 'bg-white/85 rounded-2xl border border-slate-200/60 shadow-md backdrop-blur-md',
    flat: 'bg-slate-50/50 rounded-2xl border border-transparent',
    outline: 'bg-transparent rounded-2xl border border-violet-200 hover:border-violet-400/60',
  };

  const interactiveClass = interactive 
    ? 'cursor-pointer transition-all duration-300 hover-lift hover-glow' 
    : '';

  const motionProps: any = {};
  if (interactive || hoverable) {
    motionProps.whileHover = { y: -6, scale: 1.01 };
    motionProps.transition = { type: 'spring', stiffness: 350, damping: 18 };
  }

  return (
    <motion.div
      className={`${variantClasses[variant]} ${sizeClasses[size]} rounded-2xl ${hoverable || interactive ? 'transition-all duration-300' : ''} ${
        glowColor !== 'none' ? glowClasses[glowColor] : ''
      } ${interactiveClass} ${className}`}
      {...motionProps}
      {...(props as any)}
    >
      {children}
    </motion.div>
  );
};
