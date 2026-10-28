import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '../types/product';

export interface ToastNotification {
  id: number;
  message: string;
  type: 'success' | 'info' | 'error';
}

interface UIState {
  isCartOpen: boolean;
  isSearchOpen: boolean;
  isMobileMenuOpen: boolean;
  quickViewProduct: Product | null;
  isSizeGuideOpen: boolean;
  isAnnouncementVisible: boolean;
  isIntroActive: boolean;
  heroTransitionStyle: 'cinematic-lens' | 'shutter-wipe' | 'horizon-rise' | 'light-expansion';
  heroEntranceTriggered: boolean;
  currency: 'USD' | 'EUR' | 'GBP' | 'JPY';
  recentlyViewedIds: string[];
  toasts: ToastNotification[];

  // Actions
  setCartOpen: (open: boolean) => void;
  setSearchOpen: (open: boolean) => void;
  setMobileMenuOpen: (open: boolean) => void;
  setQuickViewProduct: (product: Product | null) => void;
  setSizeGuideOpen: (open: boolean) => void;
  setAnnouncementVisible: (visible: boolean) => void;
  setHeroTransitionStyle: (style: 'cinematic-lens' | 'shutter-wipe' | 'horizon-rise' | 'light-expansion') => void;
  setHeroEntranceTriggered: (val: boolean) => void;
  setCurrency: (currency: 'USD' | 'EUR' | 'GBP' | 'JPY') => void;
  dismissIntro: () => void;
  replayIntro: () => void;
  addRecentlyViewed: (productId: string) => void;
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  removeToast: (id: number) => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set, get) => ({
      isCartOpen: false,
      isSearchOpen: false,
      isMobileMenuOpen: false,
      quickViewProduct: null,
      isSizeGuideOpen: false,
      isAnnouncementVisible: true,
      isIntroActive: typeof window !== 'undefined' ? !sessionStorage.getItem('void_intro_seen') : false,
      heroTransitionStyle: 'cinematic-lens',
      heroEntranceTriggered: false,
      currency: 'USD',
      recentlyViewedIds: [],
      toasts: [],

      setCartOpen: (open) => set({ isCartOpen: open }),
      setSearchOpen: (open) => set({ isSearchOpen: open }),
      setMobileMenuOpen: (open) => set({ isMobileMenuOpen: open }),
      setQuickViewProduct: (product) => set({ quickViewProduct: product }),
      setSizeGuideOpen: (open) => set({ isSizeGuideOpen: open }),
      setAnnouncementVisible: (visible) => set({ isAnnouncementVisible: visible }),
      setHeroTransitionStyle: (style) => set({ heroTransitionStyle: style }),
      setHeroEntranceTriggered: (val) => set({ heroEntranceTriggered: val }),
      setCurrency: (currency) => set({ currency }),
      dismissIntro: () => {
        if (typeof window !== 'undefined') {
          sessionStorage.setItem('void_intro_seen', 'true');
        }
        set({ isIntroActive: false, heroEntranceTriggered: true });
      },
      replayIntro: () => {
        if (typeof window !== 'undefined') {
          sessionStorage.removeItem('void_intro_seen');
        }
        set({ isIntroActive: true, heroEntranceTriggered: false });
      },

      addRecentlyViewed: (productId) => {
        const current = get().recentlyViewedIds;
        const filtered = current.filter((id) => id !== productId);
        set({ recentlyViewedIds: [productId, ...filtered].slice(0, 8) });
      },

      showToast: (message, type = 'success') => {
        const id = Date.now();
        set((state) => ({
          toasts: [...state.toasts, { id, message, type }],
        }));
        setTimeout(() => {
          get().removeToast(id);
        }, 3500);
      },

      removeToast: (id) => {
        set((state) => ({
          toasts: state.toasts.filter((t) => t.id !== id),
        }));
      },
    }),
    {
      name: 'void-archive-ui-storage',
      partialize: (state) => ({
        currency: state.currency,
        recentlyViewedIds: state.recentlyViewedIds,
        isAnnouncementVisible: state.isAnnouncementVisible,
      }),
    }
  )
);

