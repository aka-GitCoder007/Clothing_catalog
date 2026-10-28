import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '4xl' | 'full';
  zIndex?: string;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  maxWidth = 'lg',
  zIndex = 'z-50',
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const widthClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    '2xl': 'max-w-5xl',
    '4xl': 'max-w-6xl',
    full: 'max-w-7xl',
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className={`fixed inset-0 ${zIndex} flex items-center justify-center p-4 sm:p-6 overflow-y-auto`}>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#080808]/85 backdrop-blur-md"
          />

          {/* Modal Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className={`relative w-full ${widthClasses[maxWidth]} bg-[#121212] border border-[#2e2e2e] shadow-2xl z-10 overflow-hidden my-auto`}
          >
            {/* Header */}
            {(title || subtitle) && (
              <div className="flex items-center justify-between p-6 border-b border-[#222222]">
                <div>
                  {title && (
                    <h3 className="text-lg font-bold font-mono tracking-wider uppercase text-[#F5F3EE]">
                      {title}
                    </h3>
                  )}
                  {subtitle && (
                    <p className="text-xs text-[#A0A0A0] font-mono tracking-wide mt-0.5">
                      {subtitle}
                    </p>
                  )}
                </div>
                <button
                  onClick={onClose}
                  aria-label="Close modal"
                  className="p-2 text-[#A0A0A0] hover:text-[#F5F3EE] hover:bg-[#1a1a1a] transition-colors border border-transparent hover:border-[#333333]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            )}

            {!title && (
              <button
                onClick={onClose}
                aria-label="Close modal"
                className="absolute top-4 right-4 z-20 p-2 text-[#A0A0A0] hover:text-[#F5F3EE] bg-[#080808]/70 hover:bg-[#1a1a1a] transition-colors border border-[#222222]"
              >
                <X className="w-5 h-5" />
              </button>
            )}

            {/* Content */}
            <div className="p-6 sm:p-8 max-h-[85vh] overflow-y-auto">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

