import React from 'react';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'accent' | 'white';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  isLoading?: boolean;
  fullWidth?: boolean;
  icon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      fullWidth = false,
      icon,
      className = '',
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center font-mono font-medium uppercase tracking-widest transition-all duration-200 select-none disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none focus:ring-1 focus:ring-[#F5F3EE] active:scale-[0.98]';

    const sizeStyles = {
      sm: 'text-[11px] px-3 py-2 gap-2 border',
      md: 'text-xs px-5 py-3.5 gap-2.5 border',
      lg: 'text-xs md:text-sm px-8 py-4 gap-3 border',
      xl: 'text-sm px-10 py-5 gap-3.5 border',
    };

    const variantStyles = {
      primary:
        'bg-[#F5F3EE] text-[#080808] border-[#F5F3EE] hover:bg-white hover:shadow-[0_0_20px_rgba(245,243,238,0.25)]',
      secondary:
        'bg-[#181818] text-[#F5F3EE] border-[#2A2A2A] hover:bg-[#222222] hover:border-[#3E3E3E]',
      outline:
        'bg-transparent text-[#F5F3EE] border-[#333333] hover:border-[#F5F3EE] hover:bg-[#F5F3EE]/5',
      ghost:
        'bg-transparent text-[#A0A0A0] border-transparent hover:text-[#F5F3EE] hover:bg-[#181818]',
      accent:
        'bg-[#9E1B22] text-[#F5F3EE] border-[#9E1B22] hover:bg-[#b52028] hover:shadow-[0_0_20px_rgba(158,27,34,0.4)]',
      white:
        'bg-white text-black border-white hover:bg-neutral-200 hover:border-neutral-200',
    };

    const widthStyle = fullWidth ? 'w-full' : '';

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${widthStyle} ${className}`}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin text-current" />
        ) : (
          icon && <span className="inline-flex shrink-0">{icon}</span>
        )}
        <span>{children}</span>
      </button>
    );
  }
);

Button.displayName = 'Button';

