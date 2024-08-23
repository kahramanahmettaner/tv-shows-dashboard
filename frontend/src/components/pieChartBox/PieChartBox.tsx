import styles from './pieChartBox.module.css'
import { useState } from "react";
import Dropdown from "../../componentsReusable/dropdown/Dropdown";
import PieChartReusable from "../../componentsReusable/pieChartReusable/PieChartReusable"
import { useShowDetailsStore } from "../../store/showDetailsStore"
import { ICredits } from "../../types";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const PieChartBox = () => {

    const { 
        credits, loadingCredits, errorMessageCredits
    } = useShowDetailsStore( state => state )

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

    const creditsItems = creditsCloned[selectedCategory.key as keyof ICredits];

    const creditsSliced = creditsItems.slice(0, 5)
    const creditsForPieChart = creditsSliced.map( (item: any) => {
        if (selectedCategory.key === 'cast') {
            return { 
                name: `${item.character} (${item.name})`,
                value: item.episodes_count
              }
        }
        return { 
            name: item.name,
            value: item.episodes_count
        }
    })

    
    const chartLabelTitle = selectedCategory.key === 'cast' 
        ? 'Role' 
        : selectedCategory.key === 'directors' 
            ? 'Director'
            : 'Writer'
        
    
    const chartDescriptionTitle = selectedCategory.key === 'cast' 
        ? 'Number of Episodes Acted' 
        : selectedCategory.key === 'directors' 
            ? 'Number of Episodes Directed'
            : 'Number of Episodes Written'

    const pieChartBoxData = {
        chartData: creditsForPieChart,
        color: "#FF8042",
        labelTitle: chartLabelTitle,
        descriptionTitle: chartDescriptionTitle
    };

    

  return (
    <div className={styles.box}>
        { errorMessageCredits !== ''
            ? <p>{errorMessageCredits}</p>
            
            : loadingCredits === true
            ?   <>
                    <Dropdown
                        dropdownItems={categories.map(category => category.title)}
                        selectedIndex={selectedIndex}
                        setSelectedIndex={setSelectedIndex}
                    />
                    <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <FontAwesomeIcon icon={faSpinner} spin style={{ fontSize: '2rem' }}/>
                    </div>
                </>

            :   <>
                    <Dropdown
                        dropdownItems={categories.map(category => category.title)}
                        selectedIndex={selectedIndex}
                        setSelectedIndex={setSelectedIndex}
                    />
                    <PieChartReusable {...pieChartBoxData} /> 
                </>

        }

    </div>
  )
}

export default PieChartBox