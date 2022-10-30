import Image from "next/image";
import Link from "next/link";
import styles from '../styles/ProjectTeaser.module.css'

interface IProps {
    url: string,
    // TODO: Maybe string should be imported?
    img: string
}

const ProjectTeaser = ({url, img}: IProps) => {
    return (
        <Link href={url}>
            <div className={styles.projectTeaser}>
                <Image src={img} alt='project image' width={300} height={250}/>
                <h3>Project title</h3>
            </div>
        </Link>
    )
}

export default ProjectTeaser