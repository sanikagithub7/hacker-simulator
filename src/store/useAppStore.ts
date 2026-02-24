import { create } from 'zustand';

interface AppState {
    muted: boolean;
    toggleMute: () => void;
    escActive: boolean;
    setEscActive: (v: boolean) => void;
    accessFlash: boolean;
    setAccessFlash: (v: boolean) => void;
    glitchActive: boolean;
    setGlitchActive: (v: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
    muted: false,
    toggleMute: () => set((s) => ({ muted: !s.muted })),
    escActive: false,
    setEscActive: (v) => set({ escActive: v }),
    accessFlash: false,
    setAccessFlash: (v) => set({ accessFlash: v }),
    glitchActive: false,
    setGlitchActive: (v) => set({ glitchActive: v }),
}));
