import styles from './horizontalBarChart.module.css'

type TAttributNames = {
    title: string;
    levelText: string;
    levelValue: string;
    color: string;
}
type Props = {
    item: any;
    attributeNames: TAttributNames;
}

const HorizontalBarChartReusable: React.FC<Props> = ({ item, attributeNames }) => { 
    
    return (
        <div className={styles['container']}>
            <div className={styles.text}>
                <p>{item[attributeNames.title]}</p>
                <p>{item[attributeNames.levelText]}</p>
            </div>
            <div className={styles['horizontal-chart']}>
                <div className={styles['filled']} style={{
                    height: "100%",
                    width: `${item[attributeNames.levelValue]}%`,
                    backgroundColor: `${item[attributeNames.color]}`,
                    transition: 'width 0.5s'
                }}>

                </div>

            </div>

        </div>
    )
}

export default HorizontalBarChartReusable