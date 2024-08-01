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
    fetchShowData: (imdb_id_input: string) => Promise<void>;
    fetchShowDetails: (imdb_id_input: string) => Promise<void>;
    fetchEpisodes: (imdb_id_input: string) => Promise<void>;
    fetchCredits: (imdb_id_input: string) => Promise<void>;
    fetchParentalGuide: (imdb_id_input: string) => Promise<void>;
}

export const useShowDetailsStore = create<ShowDetailsStore>((set, get) => ({
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
    fetchShowData: async(imdb_id_input: string) => {

        try {
            // Await fetchShowDetails as it provides necessary info for other functions
            await get().fetchShowDetails(imdb_id_input);

            // Fetch other data in parallel
            await Promise.all([
                get().fetchEpisodes(imdb_id_input),
                get().fetchCredits(imdb_id_input),
                get().fetchParentalGuide(imdb_id_input)
            ]);
        } catch (error) {
            console.error('Error fetching show data:', error);
            set({ errorMessageShowDetails: 'Error fetching show data' });
        }
    },
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
}));
