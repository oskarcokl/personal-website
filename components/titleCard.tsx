import BackButton from "./BackButton";
import styles from '../styles/TitleCard.module.css';

interface IProps {
    title: string,
    author: string,
    date: Date
    url: string
}

const TitleCard = ({title, author, date, url}: IProps) => {
    return (
        <div className={styles.projectTitle}>
            <BackButton url={url}/>
            <div className={styles.titleAuthor}>
                <h1>{title || 'Title'}</h1>
                <p>{author || 'author'}, {date?.toDateString() || 'date'}</p>
            </div>
        </div>
    )
}

export default TitleCard;