import React from 'react';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'accent' | 'outline' | 'subtle' | 'warning';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  className = '',
}) => {
  const base =
    'inline-flex items-center px-2 py-0.5 text-[10px] uppercase font-mono font-semibold tracking-widest border transition-colors';

  const variants = {
    default: 'bg-[#181818] text-[#F5F3EE] border-[#333333]',
    accent: 'bg-[#9E1B22]/15 text-[#F55] border-[#9E1B22]/60',
    outline: 'bg-transparent text-[#A0A0A0] border-[#333333]',
    subtle: 'bg-[#0e0e0e] text-[#888888] border-[#1e1e1e]',
    warning: 'bg-amber-950/20 text-amber-400 border-amber-800/40',
  };

  return <span className={`${base} ${variants[variant]} ${className}`}>{children}</span>;
};

