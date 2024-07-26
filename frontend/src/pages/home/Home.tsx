import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import SearchShow from '../../components/searchShow/SearchShow'
import styles from './home.module.css'
import { faChartSimple } from '@fortawesome/free-solid-svg-icons'

const Home = () => {
  return (
    <div className={styles.home}>
        
        <div className={styles.text}>
          <FontAwesomeIcon icon={faChartSimple} fontSize={'3em'} color='#FF8042'/>
          <h1>Visualize TV Show Data</h1>
        </div>
        <SearchShow />
        
    </div>
  )
}

export default Home