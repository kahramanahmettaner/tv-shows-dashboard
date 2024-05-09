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
}

const TopBox: React.FC<Props> = ({ listTitle, items, attributeNames }) => {

    return (
        <div className={styles['top-box']}>
            <h1>{listTitle}</h1>
            <div className={styles.list} >
    
                {items.map(item => (
                    <div key={item[attributeNames.title]} className={styles['list-item']} >
                        <div className={styles.item}>
                            <img src={item[attributeNames.image]} alt='' />
                            <div className={styles['item-texts']}>
                                <span className={styles.title}>
                                    {item[attributeNames.title]}
                                </span>
                                <span className={styles.details}>
                                    {item[attributeNames.details]}
                                </span>
                            </div>
                        </div>
                        <span className={styles.value}>
                            {item[attributeNames.value]}
                        </span>
                    </div>
                ))}
    
            </div>
        </div>
      )
}

export default TopBox