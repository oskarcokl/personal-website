import { FunctionComponent } from "react"
import styles from '../styles/Header.module.css'

const Header: FunctionComponent = () => {
    return (
        <div className={styles.header}>
            <h2 className={styles.headerTitle + ' ' + styles.selected}>Projects</h2>
            <h1 className={styles.headerTitle}>Oskar Čokl</h1>
            <h2 className={styles.headerTitle}>Blog</h2>
        </div>
    )
}

export default Header