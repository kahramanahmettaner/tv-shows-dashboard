import { useShowDetailsStore } from "../../store/showDetailsStore"

const TopEpisodes = () => {
    const episodes = useShowDetailsStore( state => state.episodes )

    // Slice the array to get only the top 10 episodes
    const top10Episodes = episodes.slice(0, 10);

    // Sort episodes by imdb_rating in descending order
    top10Episodes.sort((a, b) => b.imdb_rating - a.imdb_rating);
    
    // Add episode_title to each episode object using the season_number and episode_number
    const top10EpisodesWithTitle = top10Episodes.map(episode => {
        const episode_title  = `Season ${episode.season_number} Episode ${episode.episode_number} `
        return { ...episode, episode_title: episode_title };
    })

    return (
        <>
            {/* Render episode names here */}
            {top10EpisodesWithTitle.map((episode, index) => (
                <div key={index}>{episode.episode_title} {episode.imdb_rating}</div>
            ))}
        </>
    )
}

export default TopEpisodes