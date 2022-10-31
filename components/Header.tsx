import Link from 'next/link';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

import styles from '../styles/Header.module.css'

interface IProps {
    selected: string
}

interface IState {
    matchmedia: boolean
    menuShown: boolean
    menuItems: HTMLElement | null
    display: string
}

class Header extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            matchmedia: false,
            menuShown: false,
            menuItems: null,
            display: styles.burgerClosed
        }
    }

    componentDidMount() {
        this.setState({
            matchmedia: matchMedia('(min-width: 600px)').matches
        })

        window.addEventListener('resize', this.handleResize.bind(this))

        this.setState({
            menuItems: document.getElementById('menuItems')
        });
    }

    handleResize() {
        this.setState({
            matchmedia: matchMedia('(min-width: 600px)').matches
        })
    }

    toggleMenu() {
        if (this.state.menuShown) {
            this.setState({
                display: styles.burgerClosed,
                menuShown: false
            })
        } else if (!this.state.menuShown) {
            this.setState({
                display: styles.burgerOpen,
                menuShown: true
            })
        }
    }

    render() {
        let projectsClasses = styles.headerTitle;
        let blogClasses = styles.headerTitle;

        switch (this.props.selected) {
            case 'projects':
                projectsClasses += ' ' + styles.selected;
                break;
            case 'blog':
                blogClasses += ' ' + styles.selected;
                break;
        }

        if (this.state.matchmedia) {
            return (
                <div className={styles.header}>
                    <Link href='/projects'><h2 className={projectsClasses}>Projects</h2></Link>
                    <Link href='/'><h1 className={styles.headerTitle}>Oskar Čokl</h1></Link>
                    <Link href='/blog'><h2 className={blogClasses}>Blog</h2></Link>
                </div>
            )
        } else {
            return (
                <div className={styles.burger + ' ' + this.state.display}>
                    <FontAwesomeIcon icon={faBars} className={styles.burgerIcon} id='burgerIcon' onClick={this.toggleMenu.bind(this)}/>
                    <div className={styles.links} id='menuItems'>
                        <Link href='/'>Oskar Čokl</Link>
                        <Link href='/projects'>Projects</Link>
                        <Link href='/blog'>Blog</Link>
                    </div>
                </div>
            )
        }
    }
}

export default Header