import BackButton from "./BackButton";
import styles from '../styles/TitleCard.module.css';

interface IProps {
    title: string,
    author: string,
    date: Date
}

const TitleCard = ({title, author, date}: IProps) => {
    return (
        <div className={styles.projectTitle}>
            <BackButton/>
            <div className={styles.titleAuthor}>
                <h1>{title || 'Title'}</h1>
                <p>{author || 'author'}, {date?.toDateString() || 'date'}</p>
            </div>
        </div>
    )
}

export default TitleCard;