import type { NextPage } from 'next'
import Header from '../components/Header'
import BlogTeaser from '../components/BlogTeaser'
import styles from '../styles/Blog.module.css'

const HomePage: NextPage = () => {
    return (
        <div>
            <Header selected='blog'/>
            <section className={styles.container}>
                <BlogTeaser/>
                <BlogTeaser/>
                <BlogTeaser/>
                <BlogTeaser/>
                <BlogTeaser/>
            </section>
        </div>
    )
}

export default HomePage