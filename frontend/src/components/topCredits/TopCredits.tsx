import { useState } from "react";
import { useShowDetailsStore } from "../../store/showDetailsStore"
import { ICredits } from "../../types";
import TopBox from "../topBox/TopBox";
import Dropdown from "../dropdown/Dropdown";

const TopCredits = () => {
    
    // Credits Data
    const credits = useShowDetailsStore( state => state.credits )
    const loadingCredits = useShowDetailsStore( state => state.loadingCredits )
    const errorMessageCredits = useShowDetailsStore( state => state.errorMessageCredits )


    // Different Credits Categories and Dropdown
    // List of categories (e.g., ['cast', 'writers', 'directors'])
    const categories = [
        { key: 'cast', title: 'Actors with Most Episodes' },
        { key: 'directors', title: 'Directors with Most Episodes' },
        { key: 'writers', title: 'Writers with Most Episodes' },
    ]

    const [selectedIndex, setSelectedIndex] = useState(0);
    
    const selectedCategory = categories[selectedIndex];

    const items = credits[selectedCategory.key as keyof ICredits];

    items.sort((a, b) => b.episodes_count - a.episodes_count);

    const top10 = items.slice(0, 10);
    
    const top10Modified = top10.map(creditsItem => {
        const episodes_count_text  = `${creditsItem.episodes_count} episodes`
        return { ...creditsItem, episodes_count_text: episodes_count_text };
    })

    // For loading and error states
    const loadingContent = <p>Loading...</p>

    const errorContent = <p>Error: {errorMessageCredits}</p>

    // Return component jsx
    return (
        <>
            {/* Display loading message while loading */}
            {loadingCredits && loadingContent}

            {/* Display error message if there's an error */}
            {errorMessageCredits && errorContent}

            {/* Display fetched shows when there is no error and not loading */}
            {/* Display nothing if there is no show to display */}
            {!loadingCredits && !errorMessageCredits && (
                top10Modified.length == 0 || 
            <>
            <Dropdown 
                dropdownItems={categories.map(category => category.title)}
                selectedIndex={selectedIndex}
                setSelectedIndex={setSelectedIndex}
            />
            <TopBox
                listTitle=""
                items={top10Modified}
                attributeNames={{ image: 'image_link', title: 'character', details: 'name', value: 'episodes_count_text' }}
                titleColor="#FFF"
                valueColor="#BBA"
                detailsColor="#978"
            />
            </>
            )}
        </>
    )
}

export default TopCredits