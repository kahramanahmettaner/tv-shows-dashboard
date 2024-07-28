import { useShowDetailsStore } from "../../store/showDetailsStore"
import { IEpisode } from "../../types";
import TopBox from "../topBox/TopBox";

const TopEpisodes = () => {
    const episodes = useShowDetailsStore( state => state.episodes )
    const loadingEpisodes = useShowDetailsStore( state => state.loadingEpisodes )
    const errorMessageEpisodes = useShowDetailsStore( state => state.errorMessageEpisodes )

    // Clone episodes data
    let top10Episodes: IEpisode[] = JSON.parse(JSON.stringify(episodes));

    // Sort episodes by imdb_rating in descending order
    top10Episodes.sort((a, b) => b.imdb_rating - a.imdb_rating);
    
    // Slice the array to get only the top 10 episodes
    top10Episodes = top10Episodes.slice(0, 10);

    // Add episode_title to each episode object using the season_number and episode_number
    const top10EpisodesWithTitle = top10Episodes.map(episode => {
        const episode_title  = `Season ${episode.season_number} Episode ${episode.episode_number} `
        return { ...episode, episode_title: episode_title };
    })

    const loadingContent = <p>Loading...</p>

    const errorContent = <p>Error: {errorMessageEpisodes}</p>

    return (
        <>
            {/* Display loading message while loading */}
            {loadingEpisodes && loadingContent}

            {/* Display error message if there's an error */}
            {errorMessageEpisodes && errorContent}

            {/* Display fetched shows when there is no error and not loading */}
            {/* Display nothing if there is no show to display */}
            {!loadingEpisodes && !errorMessageEpisodes && (
                top10EpisodesWithTitle.length == 0 || 
            <TopBox
                listTitle="Top Episodes"
                items={top10EpisodesWithTitle}
                attributeNames={{ image: 'image_link', title: 'episode_title', details: 'episode_name', value: 'imdb_rating' }}
            />
            )}
        </>
    )
}

export default TopEpisodes