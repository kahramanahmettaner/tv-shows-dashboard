import { useShowDetailsStore } from '../../store/showDetailsStore'
import HorizontalBarChart from '../horizontalBarChart/HorizontalBarChart'
import styles from './parentalGuide.module.css'

const ParentalGuide = () => {
  
    const parental_guide = useShowDetailsStore( state => state.parental_guide)
    
    // convert the severity to value 0-100
    const parental_guide_modified = parental_guide.map(category => {

        let level = 0
        let color = 'rgb(235, 250, 0)'
        switch (category.severity) {
            case 'Severe':
                level = 100
                color = 'rgb(235, 50, 0)'
                break
            case 'Moderate':
                level = 75
                color = 'rgb(235, 150, 0)'
                break
            case 'Mild':
                level = 25
                break
            case 'None':
                level = 0
                break
        }
        return {
            ...category, severityValue: level, color: color
        }
    })

    return (
        <div className={styles.container} style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5em'
        }}>
            <h3>Parents Guide</h3>

            { parental_guide_modified.map( ( category ) => {
            return (
                <HorizontalBarChart 
                    key={category.title}
                    item={category}
                    attributeNames={{ title: 'title', levelText: 'severity', levelValue: 'severityValue', color: 'color' }}
                />
            )}) 
            }

        </div>
    )
}

export default ParentalGuide