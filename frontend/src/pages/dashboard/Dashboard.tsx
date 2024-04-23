import TopBox from '../../components/topBox/TopBox'
import styles from './dashboard.module.css'

const Dashboard = () => {
  return (
    <div className={styles.dashboard}>
      <div>
        <TopBox />
      </div>
      <div>Box 2</div>
      <div>Box 3</div>
      <div>
        <TopBox />
      </div>
    </div>
  )
}

export default Dashboard