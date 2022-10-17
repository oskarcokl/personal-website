import { FunctionComponent } from "react"
import styles from '../styles/Header.module.css'

const Header = ({selected}: {selected: string}) => {
    let projectsClasses = styles.headerTitle;
    let blogClasses = styles.headerTitle;

    switch (selected) {
        case 'projects':
            projectsClasses += ' ' + styles.selected;
            break;
        case 'blog':
            blogClasses += ' ' + styles.selected;
            break;
    }

    return (
        <div className={styles.header}>
            <h2 className={projectsClasses}>Projects</h2>
            <h1 className={styles.headerTitle}>Oskar Čokl</h1>
            <h2 className={blogClasses}>Blog</h2>
        </div>
    )
}

export default Header