import { useParams } from 'react-router-dom'
import TopBox from '../../components/topBox/TopBox'
import styles from './dashboard.module.css'
import { useEffect } from 'react'

const Dashboard = () => {

  const { imdb_id } = useParams()

  // Check if imdb_id exists
  if (!imdb_id) {
    return (
      <div>
        <h1> Dashboard </h1>
        <p> No IMDb ID provided! </p>
      </div>
    );
  }
  
  useEffect( () => {
    console.log(imdb_id)
  }, [imdb_id])

  return (
    <div className={styles.dashboard}>

      <div className={`${styles.box} ${styles.box1}`}>
        <TopBox />
      </div>
      <div className={`${styles.box} ${styles.box2}`}>Box 2</div>
      <div className={`${styles.box} ${styles.box3}`}>Box 3</div>
      <div className={`${styles.box} ${styles.box4}`}>
        <TopBox />
      </div>
      
    </div>
  )
}

export default Dashboard