import { create } from 'zustand';
import { getShowDetails } from '../api/showDetailsApi';
import { ICredits, IEpisode, IParentalGuideCategory } from '../types';
import { getCredits, getEpisodes } from '../api';
import { getParentalGuide } from '../api/parentalGuideApi';


interface ShowDetailsStore {
    imdb_id: string;
    show_name: string;
    seasons_count: number;
    episodes: IEpisode[], 
    credits: ICredits,
    parental_guide: IParentalGuideCategory[],
    loadingShowDetails: boolean;
    loadingEpisodes: boolean,
    loadingCredits: boolean;
    loadingParentalGuide: boolean;
    errorMessageShowDetails: string;
    errorMessageEpisodes: string,
    errorMessageCredits: string;
    errorMessageParentalGuide: string;
    fetchShowDetails: (imdb_id_input: string) => Promise<void>;
    fetchEpisodes: (imdb_id_input: string, season_number_input: number) => Promise<void>;
    fetchCredits: (imdb_id_input: string) => Promise<void>;
    fetchParentalGuide: (imdb_id_input: string) => Promise<void>;
}

export const useShowDetailsStore = create<ShowDetailsStore>((set) => ({
    imdb_id: '',
    show_name: '',
    seasons_count: 0,
    episodes: [],
    credits: { cast: [], writers: [], directors: [] },
    parental_guide: [],
    loadingShowDetails: false,
    loadingEpisodes: false,
    loadingCredits: false,
    loadingParentalGuide: false,
    errorMessageShowDetails: '',
    errorMessageEpisodes: '',
    errorMessageCredits: '',
    errorMessageParentalGuide: '',
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
            console.error('Error fetching show details:', errorMessage);
            set({ 
                imdb_id: '', show_name: '', seasons_count: 0, loadingShowDetails: false,
                errorMessageShowDetails: typeof errorMessage === 'string' ? errorMessage : 'Unknown error' 
            })
        
        }
    },
    fetchEpisodes: async (imdb_id_input: string, season_number_input: number) => {
    // TODO: this function is suitable to fetch one season data for instance, adjust the logic to fetch multiple seasons
    
        try {
            // reset all values
            set({ loadingEpisodes: true, errorMessageEpisodes: '', episodes: [] })

            // fetch data
            const fetched_episodes = await getEpisodes(imdb_id_input, season_number_input);
            
            // set values
            set({ episodes: fetched_episodes, loadingEpisodes: false, errorMessageEpisodes: '' })

        } catch (errorMessage) {
            console.error('Error fetching episodes:', errorMessage);
            set({
                loadingEpisodes: false, errorMessageEpisodes: typeof errorMessage === 'string' ? errorMessage : 'Unknown error'
            })
        }
    },
    fetchCredits: async (imdb_id_input: string) => {

        try {
            // reset all values
            set({
                credits: { cast: [], writers: [], directors: [] },
                loadingCredits: true, errorMessageCredits: ''
            })

            // fetch data
            const { cast, writers, directors } = await getCredits(imdb_id_input);
            
            // set values
            set({
                credits: { cast, writers, directors },
                loadingCredits: false, errorMessageCredits: ''
            })
        
        } catch (errorMessage) {
            console.error('Error fetching credits:', errorMessage);
            set({
                credits: { cast: [], writers: [], directors: [] },
                loadingCredits: false,
                errorMessageCredits: typeof errorMessage === 'string' ? errorMessage : 'Unknown error' 
            })
        }
    },
    fetchParentalGuide: async (imdb_id_input: string) => {

        try {
            // reset all values
            set({
                parental_guide: [],
                loadingParentalGuide: true, errorMessageParentalGuide: ''
            })

            // fetch data
            const parental_guide: IParentalGuideCategory[] = await getParentalGuide(imdb_id_input)
            
            // set values
            set({
                parental_guide: parental_guide,
                loadingCredits: false, errorMessageCredits: ''
            })
        
        } catch (errorMessage) {
            console.error('Error fetching parental guide:', errorMessage);
            set({
                parental_guide: [],
                loadingCredits: false,
                errorMessageCredits: typeof errorMessage === 'string' ? errorMessage : 'Unknown error' 
            })
        }
    },
}));
