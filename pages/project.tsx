import { NextPage } from "next";
import BackButton from "../components/BackButton";
import styles from '../styles/Project.module.css';


const Project: NextPage = () => {
    return (
        <section>
            <div className={styles.projectTitle}>
                <BackButton/>
                <h1>Project title</h1>
                <div>Date, author</div>
            </div>

        </section>
    )
}

export default Project