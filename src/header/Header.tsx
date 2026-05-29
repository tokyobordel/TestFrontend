import styles from './Header.module.css'

import { IoHomeOutline } from "react-icons/io5";
import { useEffect } from 'react';

function Header() {


    const MenuNodes = () => {

        
        return (
            <>
                <li>
                    <a className={styles.selectedPage}  href=''>
                        <IoHomeOutline/> <span className={styles.menu_text}>Журнал</span>
                    </a>
                </li>
            </>
        )
    }

    return (
        <>
            <header id={styles.header}>
                <nav>
                    <ul>
                        <MenuNodes/>
                    </ul>
                </nav>
            </header>
        </>
    )
}

export default Header
