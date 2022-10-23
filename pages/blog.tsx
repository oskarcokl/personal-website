import type { NextPage } from 'next'
import Header from '../components/Header'
import styles from '../styles/Blog.module.css'

const HomePage: NextPage = () => {
    return (
        <div>
            <Header selected='blog'/>
            <section className={styles.container}>
                <div className={styles.blogTeaser}>
                    <div>
                        <a href=""><h3>Blog title</h3></a>
                    </div>
                    <div>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur varius metus nibh, id convallis enim blandit ut. Etiam ornare, nisi sit amet commodo ornare, mauris risus...</p>
                    </div>
                </div>
                <div className={styles.blogTeaser}>
                    <div>
                        <h3>Blog title</h3>
                    </div>
                    <div>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur varius metus nibh, id convallis enim blandit ut. Etiam ornare, nisi sit amet commodo ornare, mauris risus...</p>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default HomePage