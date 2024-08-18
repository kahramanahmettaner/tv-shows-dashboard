import { useState } from "react";
import { useShowDetailsStore } from "../../store/showDetailsStore"
import { ICredits } from "../../types";
import TopBox from "../../componentsReusable/topBox/TopBox";
import Dropdown from "../../componentsReusable/dropdown/Dropdown";

const TopCredits = () => {
    
    // Credits Data
    const credits = useShowDetailsStore( state => state.credits )
    const loadingCredits = useShowDetailsStore( state => state.loadingCredits )
    const errorMessageCredits = useShowDetailsStore( state => state.errorMessageCredits )

    // Clone credits data
    let creditsCloned: ICredits = JSON.parse(JSON.stringify(credits));


    // Different Credits Categories and Dropdown
    // List of categories (e.g., ['cast', 'writers', 'directors'])
    const categories = [
        { key: 'cast', title: 'Actors with Most Episodes' },
        { key: 'directors', title: 'Directors with Most Episodes' },
        { key: 'writers', title: 'Writers with Most Episodes' },
    ]

    const [selectedIndex, setSelectedIndex] = useState(0);
    
    const selectedCategory = categories[selectedIndex];

    const items = creditsCloned[selectedCategory.key as keyof ICredits];

    items.sort((a, b) => b.episodes_count - a.episodes_count);

    const top10 = items.slice(0, 10);
    
    const top10Modified = top10.map((creditsItem: any) => {
        const episodes_count_text  = `${creditsItem.episodes_count} episodes`

        if (creditsItem.image_link === undefined) {
            creditsItem.image_link = '/blank_person.jpg'
        }

        return { ...creditsItem, episodes_count_text: episodes_count_text };
    })

    // Adjust attribute names according to the selected category
    const attributeNames: any = { image: 'image_link', value: 'episodes_count_text' }
    if (selectedCategory.key === 'cast') {
        attributeNames.title = 'character'
        attributeNames.details = 'name'
    } else {
        attributeNames.title = 'name'
        attributeNames.details = 'character'
    }

    // const top10Modified = top10.map(creditsItem => {
    //     const episodes_count_text  = `${creditsItem.episodes_count} episodes`;
    //     let modified: any = { ...creditsItem, episodes_count_text: episodes_count_text };

    //     // If there is no image data than show a default image
    //     if (modified.image_link === undefined) {
    //         modified.image_link = '/blank_person.jpg'
    //     }

    //     if (selectedCategory.key === 'cast') {
    //         return modified;
    //     }
        
    //     // TODO: Find a better way to do this:
    //     // Assign name attribute of directors and witers to character property to display them properly in TopBox  
    //     if (selectedCategory.key === 'directors') {
    //         modified = {
    //             ...modified, character: modified.name, name: ''
    //         }
    //     }
    //     else if (selectedCategory.key === 'writers') {
    //         modified = {
    //             ...modified, character: modified.name, name: ''
    //         }
    //     }

    //     return modified;
    // })

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
                attributeNames={attributeNames}
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