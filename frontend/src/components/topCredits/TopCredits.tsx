import { useShowDetailsStore } from "../../store/showDetailsStore"
import TopBox from "../topBox/TopBox";

const TopCredits = () => {
    const credits = useShowDetailsStore( state => state.credits )

    // Slice the array to get only the top 10 of cast members
    const top10CastMembers = credits.cast.slice(0, 10);

    // Sort episodes by imdb_rating in descending order
    top10CastMembers.sort((a, b) => b.episodes_count - a.episodes_count);
    
    // Add episode_title to each episode object using the season_number and episode_number
    const top10CastMembersDisplay = top10CastMembers.map(castMember => {
        const episodes_count_text  = `${castMember.episodes_count} episodes`
        return { ...castMember, episodes_count_text: episodes_count_text };
    })

    return (
        <>
            <TopBox
                listTitle="Actors with Most Episodes"
                items={top10CastMembersDisplay}
                attributeNames={{ image: 'image_link', title: 'character', details: 'name', value: 'episodes_count_text' }}
            />
        </>
    )
}

export default TopCredits