import styles from '../styles/BackButton.module.css'
import Link from 'next/link'

interface IProps {
    url: string
}

const BackButton = ({url}: IProps) => {
    return (
        <div className={styles.backButton}>
 	        <Link href={url}>&larr;</Link>
        </div>
    )
}

export default BackButton