import { create } from 'zustand';
import { getShowDetails } from '../api/showDetailsApi';


interface ShowDetailsStore {
    imdb_id: string;
    show_name: string;
    seasons_count: number;
    loadingShowDetails: boolean;
    errorMessageShowDetails: string;
    fetchShowDetails: (imdb_id_input: string) => Promise<void>;
}

export const useShowDetailsStore = create<ShowDetailsStore>((set) => ({
    imdb_id: '',
    show_name: '',
    seasons_count: 0,
    loadingShowDetails: false,
    errorMessageShowDetails: '',
    fetchShowDetails: async (imdb_id_input: string) => {
        try {
            // reset all values
            set({ imdb_id: '', show_name: '', seasons_count: 0,
                loadingShowDetails: true, errorMessageShowDetails: '' })

            // fetch data
            const { imdb_id, show_name, seasons_count } = await getShowDetails(imdb_id_input);
            
            // set values
            set({ imdb_id, show_name, seasons_count, loadingShowDetails: false, errorMessageShowDetails: '' })

        } catch (errorMessage) {
            console.error('Error fetching shows:', errorMessage);
            set({ 
                imdb_id: '', show_name: '', seasons_count: 0, loadingShowDetails: false,
                errorMessageShowDetails: typeof errorMessage === 'string' ? errorMessage : 'Unknown error' 
            })
        
        }
    },
}));
