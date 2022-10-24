import { NextPage } from "next";
import BackButton from "../components/BackButton";
import styles from '../styles/Project.module.css';


const Project: NextPage = () => {
    return (
        <section className={styles.container}>
            <div className={styles.projectTitle}>
                    <BackButton/>
                    <div className={styles.titleAuthor}>
                        <h1>Project title</h1>
                        <p>Date, author</p>
                    </div>
            </div>

        </section>
    )
}

export default Project