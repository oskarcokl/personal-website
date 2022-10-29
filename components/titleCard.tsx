import BackButton from "./BackButton";
import styles from '../styles/TitleCard.module.css';

const TitleCard = () => {
    return (
        <div className={styles.projectTitle}>
            <BackButton/>
            <div className={styles.titleAuthor}>
                <h1>Project title</h1>
                <p>Date, author</p>
            </div>
        </div>
    )
}

export default TitleCard;