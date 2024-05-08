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
        <div>
            <h1>{listTitle}</h1>
            <div>
    
                {items.map(item => (
                    <div key={item[attributeNames.title]}>
                        <div>
                            <img src={item[attributeNames.image]} alt='' />
                            <div>
                                <span>
                                    {item[attributeNames.title]}
                                </span>
                                <span>
                                    {item[attributeNames.details]}
                                </span>
                            </div>
                        </div>
                        <span>
                            {item[attributeNames.value]}
                        </span>
                    </div>
                ))}
    
            </div>
        </div>
      )
}

export default TopBox