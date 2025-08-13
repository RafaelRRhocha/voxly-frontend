import { create } from "zustand";

import { isMobile } from "@/lib/utils";

interface SidebarState {
  isOpen: boolean;
  isCollapsed: boolean;
}

interface SidebarActions {
  toggle: () => void;
  open: () => void;
  close: () => void;
  collapse: () => void;
  expand: () => void;
}

type SidebarStore = SidebarState & SidebarActions;

const getInitialState = (): SidebarState => {
  const mobile = isMobile();
  return {
    isOpen: !mobile,
    isCollapsed: mobile,
  };
};

export const useSidebarStore = create<SidebarStore>((set, get) => ({
  ...getInitialState(),

  toggle: () => {
    const { isCollapsed } = get();
    if (isCollapsed) {
      set({ isCollapsed: false, isOpen: true });
    } else {
      set((state) => ({ isOpen: !state.isOpen }));
    }
  },

  open: () => {
    set({ isOpen: true, isCollapsed: false });
  },

  close: () => {
    set({ isCollapsed: true, isOpen: false });
  },

  collapse: () => {
    set({ isCollapsed: true, isOpen: false });
  },

  expand: () => {
    set({ isCollapsed: false, isOpen: true });
  },
}));
