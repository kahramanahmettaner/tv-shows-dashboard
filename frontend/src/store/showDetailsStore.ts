import { create } from 'zustand';
import { getShowDetails } from '../api/showDetailsApi';
import { ICredits, IEpisode, IParentalGuideCategory } from '../types';
import { getCredits, getEpisodes, getShowInfo } from '../api';
import { getParentalGuide } from '../api/parentalGuideApi';

interface ShowDetailsStore {
    imdb_id: string;
    show_name: string;
    seasons_count: number;
    imdb_rating: number;
    actors: string;
    years: string;
    image: string;
    description: string;
    episodes: IEpisode[], 
    credits: ICredits,
    parental_guide: IParentalGuideCategory[],
    loadingShowInfo: boolean;
    loadingShowDetails: boolean;
    loadingEpisodes: boolean,
    loadingCredits: boolean;
    loadingParentalGuide: boolean;
    errorMessageShowInfo: string;
    errorMessageShowDetails: string;
    errorMessageEpisodes: string,
    errorMessageCredits: string;
    errorMessageParentalGuide: string;
    fetchShowData: (imdb_id_input: string) => Promise<void>;
    fetchShowInfo: (imdb_id_input: string) => Promise<void>;
    fetchShowDetails: (imdb_id_input: string) => Promise<void>;
    fetchEpisodes: (imdb_id_input: string) => Promise<void>;
    fetchCredits: (imdb_id_input: string) => Promise<void>;
    fetchParentalGuide: (imdb_id_input: string) => Promise<void>;
    resetState: () => void;
}

export const useShowDetailsStore = create<ShowDetailsStore>((set, get) => ({
    imdb_id: '',
    show_name: '',
    seasons_count: 0,
    imdb_rating: 0,
    actors: '',
    years: '',
    image: '',
    description: '',
    episodes: [],
    credits: { cast: [], writers: [], directors: [] },
    parental_guide: [],
    loadingShowInfo: false,
    loadingShowDetails: false,
    loadingEpisodes: false,
    loadingCredits: false,
    loadingParentalGuide: false,
    errorMessageShowInfo: '',
    errorMessageShowDetails: '',
    errorMessageEpisodes: '',
    errorMessageCredits: '',
    errorMessageParentalGuide: '',
    fetchShowData: async(imdb_id_input: string) => {

        get().resetState();

        try {
            // Await fetchShowInfo as it provides necessary info for other functions
            await get().fetchShowInfo(imdb_id_input);

            // Fetch other data in parallel
            await Promise.all([
                get().fetchShowDetails(imdb_id_input),
                get().fetchEpisodes(imdb_id_input),
                get().fetchCredits(imdb_id_input),
                get().fetchParentalGuide(imdb_id_input)
            ]);
        } catch (error) {
            console.error('Error fetching show data:', error);
            set({ errorMessageShowDetails: 'Error fetching show data' });
        }
    },
    fetchShowInfo: async (imdb_id_input: string) => {
        try {
            // reset all values
            set({ 
                imdb_id: '', show_name: '', seasons_count: 0,
                loadingShowInfo: true, errorMessageShowInfo: '' 
            })

            // fetch data
            const { 
                imdb_id, show_name, seasons_count,
            } = await getShowInfo(imdb_id_input);

            // set values
            set({ 
                imdb_id, show_name, seasons_count,
                loadingShowInfo: false, errorMessageShowInfo: '' 
            })

        } catch (errorMessage) {
            console.error('Error fetching show details:', errorMessage);
            set({ 
                imdb_id: '', show_name: '', seasons_count: 0, loadingShowInfo: false,
                errorMessageShowInfo: typeof errorMessage === 'string' ? errorMessage : 'Unknown error' 
            })
        
        }
    },
    fetchShowDetails: async (imdb_id_input: string) => {
        try {
            // reset all values
            set({ 
                imdb_rating: 0, actors: '', years: '', image: '', description: '',
                loadingShowDetails: true, errorMessageShowDetails: '' 
            })

            // fetch data
            const { 
                imdb_rating, actors, years, image, description
            } = await getShowDetails(imdb_id_input);

            // set values
            set({ 
                imdb_rating, actors, years, image, description, 
                loadingShowDetails: false, errorMessageShowDetails: '' 
            })

        } catch (errorMessage) {
            console.error('Error fetching show information:', errorMessage);
            set({ 
                imdb_rating: 0, actors: '', years: '', image: '', description: '', loadingShowDetails: false,
                errorMessageShowDetails: typeof errorMessage === 'string' ? errorMessage : 'Unknown error' 
            })
        
        }
    },
    fetchEpisodes: async (imdb_id_input: string) => {
        const seasons_count = get().seasons_count;

        // Reset all values
        set({ loadingEpisodes: true, errorMessageEpisodes: '', episodes: [] });

        try {
            // Array to hold all episodes
            const allEpisodes = [];

            // Fetch and set all seasons
            for (let seasonNumber = 1; seasonNumber <= seasons_count; seasonNumber++) {
                // Fetch current season
                const fetched_episodes = await getEpisodes(imdb_id_input, seasonNumber);

                // Set teh first season immediately as it is required in some components seperately
                if (seasonNumber === 1) {
                    set({ episodes: fetched_episodes});
                }


                // Add fetched episodes to the allEpisodes array
                allEpisodes.push(...fetched_episodes);
            }

            // Set state to indicate data is fetched successfully
            set({ episodes: allEpisodes, loadingEpisodes: false, errorMessageEpisodes: '' });

        } catch (error) {
            console.error('Error fetching episodes:', error);
            set({
                loadingEpisodes: false, 
                errorMessageEpisodes: 'Error fetching episodes',
                episodes: []
            });
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
    resetState: () => {
        set({
            imdb_id: '',
            show_name: '',
            seasons_count: 0,
            imdb_rating: 0,
            actors: '',
            years: '',
            image: '',
            description: '',
            episodes: [],
            credits: { cast: [], writers: [], directors: [] },
            parental_guide: [],
            loadingShowInfo: false,
            loadingShowDetails: false,
            loadingEpisodes: false,
            loadingCredits: false,
            loadingParentalGuide: false,
            errorMessageShowInfo: '',
            errorMessageShowDetails: '',
            errorMessageEpisodes: '',
            errorMessageCredits: '',
            errorMessageParentalGuide: '',
        });
    }
}));
