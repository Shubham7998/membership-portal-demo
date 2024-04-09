import create from 'zustand';

import { persist } from 'zustand/middleware';

interface AppStoreState {
  dOpen: boolean;
  updateOpen: (newDOpen: boolean) => void;
}

const appStore = (set: (state: AppStoreState) => void): AppStoreState => ({
  dOpen: true,
  updateOpen: (newDOpen: boolean) => set({ ...appStore(set), dOpen: newDOpen }),
});

const persistedAppStore = persist<AppStoreState>(appStore, { name: 'my_app' });

export const useAppStore = create(persistedAppStore);