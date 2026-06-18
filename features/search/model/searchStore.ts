import { create } from 'zustand';

interface SearchStore {
    isSearchOpen: boolean;
    setSearchOpen: (open: boolean) => void;
}

export const useSearchStore = create<SearchStore>((set) => ({
    isSearchOpen: false,
    setSearchOpen: (open) => set({ isSearchOpen: open }),
}));
