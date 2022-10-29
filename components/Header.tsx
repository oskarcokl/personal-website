import Link from 'next/link';

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
            <Link href='/projects'><h2 className={projectsClasses}>Projects</h2></Link>
            <Link href='/'><h1 className={styles.headerTitle}>Oskar Čokl</h1></Link>
            <Link href='/blog'><h2 className={blogClasses}>Blog</h2></Link>
        </div>
    )
}

export default Header