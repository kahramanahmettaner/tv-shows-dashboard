import TopBox from '../../components/topBox/TopBox'
import styles from './dashboard.module.css'

const Dashboard = () => {
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