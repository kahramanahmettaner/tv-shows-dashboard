import { create } from 'zustand';
import { IShowSearchResult } from '../types';
import { getShows } from '../api/showsApi';

interface SearchShowStore {
    shows: IShowSearchResult[];
    loading: boolean;
    errorMessage: string;
    fetchShows: (showName: string) => Promise<void>;
}

export const useSearchShowStore = create<SearchShowStore>((set) => ({
    shows: [],
    loading: false,
    errorMessage: '',
    fetchShows: async (showName: string) => {
        try {
            set({ shows: [], errorMessage:'', loading: true  })
            const shows = await getShows(showName);
            set({ shows, loading: false, errorMessage: '' })
        } catch (errorMessage) {
            console.error('Error fetching shows:', errorMessage);
            set({ shows: [], loading: false, errorMessage: typeof errorMessage === 'string' ? errorMessage : 'Unknown error' })
        }
    }
}));
