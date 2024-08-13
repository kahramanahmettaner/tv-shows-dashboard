import { useRef, useState } from 'react';
import styles from './dropdown.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import useClickedOutside from '../../hooks/useClickedOutside';

type Props = {
    dropdownItems: string[];
    selectedIndex: number;
    setSelectedIndex: React.Dispatch<React.SetStateAction<number>>;
}

const Dropdown = ({ dropdownItems, selectedIndex, setSelectedIndex }: Props) => {

    const [isActive, setIsActive] = useState(false);
    const toggleIsActive = () => { setIsActive( prev => !prev ) }

    const dropdownRef = useRef<HTMLDivElement>(null);
    useClickedOutside(dropdownRef, () => setIsActive(false));

    const selectedItem = dropdownItems[selectedIndex];

    return (
        <div 
            ref={dropdownRef}
            className={ isActive
                ? `${styles['dropdown']} ${styles['active']}`
                : styles['dropdown']
            }>
            <button className={styles.link} onClick={toggleIsActive}>
                {selectedItem}
                <FontAwesomeIcon icon={faCaretDown}
                    className={isActive
                        ? `${styles['caret']} ${styles['rotated']}`
                        : styles['caret']
                    }
                />
            </button>
            <div 
                className={ isActive
                    ? `${styles['dropdown-menu']} ${styles['active']}`
                    : styles['dropdown-menu']
                }
            >
                <ul>
                    { dropdownItems.map( (item, index) => (
                        <li
                            className={ selectedIndex === index
                                ? `${styles['item']} ${styles['selected']}`
                                : styles['item']
                            }
                            key={index}
                            onClick={() => setSelectedIndex(index)}
                        >{item}</li>
                    )) 
                    }
                </ul>
            </div>
        </div>
    )
}

export default Dropdown