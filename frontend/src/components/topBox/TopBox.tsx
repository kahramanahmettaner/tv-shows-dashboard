import styles from './topBox.module.css'

type TAttributNames = {
    image:string;
    title:string;
    details:string;
    value:string;
}

type Props = {
    listTitle: string;
    items: any[];
    attributeNames: TAttributNames;
    titleColor?: string;
    detailsColor?: string;
    valueColor?: string;
}

const TopBox: React.FC<Props> = ({ listTitle, items, attributeNames, titleColor, detailsColor, valueColor }) => {

    return (
        <div className={styles['top-box']}>
            <h3>{listTitle}</h3>
            <div className={styles.list} >
    
                {items.map(item => (
                    <div key={item[attributeNames.title]} className={styles['list-item']} >
                        <div className={styles.item}>
                            <img src={item[attributeNames.image]} alt='' />
                            <div className={styles['item-texts']}>
                                <span className={styles.title} style={{ color: titleColor }}>
                                    {item[attributeNames.title]}
                                </span>
                                <span className={styles.details} style={{ color: detailsColor }}>
                                    {item[attributeNames.details]}
                                </span>
                            </div>
                        </div>
                        <span className={styles.value} style={{ color: valueColor }}>
                            {item[attributeNames.value]}
                        </span>
                    </div>
                ))}
    
            </div>
        </div>
      )
}

export default TopBox