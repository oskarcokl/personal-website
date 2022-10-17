import { NextPage } from "next";
import Image from "next/image";
import Header from "../components/Header";
import styles from '../styles/Projects.module.css'

const Projects: NextPage = () => {
    return (
        <div>
            <Header/>
            <div className={styles.container}>
                <div className={styles.projectTeaser}>
                    <Image src={'/project-tmp.jpg'} alt='project image' width={300} height={250}/>
                    <h3>Project title</h3>
                </div>
                <div className={styles.projectTeaser}>
                    <Image src={'/project-tmp.jpg'} alt='project image' width={300} height={250}/>
                    <h3>Project title</h3>
                </div>
                <div className={styles.projectTeaser}>
                    <Image src={'/project-tmp.jpg'} alt='project image' width={300} height={250}/>
                    <h3>Project title</h3>
                </div>
                <div className={styles.projectTeaser}>
                    <Image src={'/project-tmp.jpg'} alt='project image' width={300} height={250}/>
                    <h3>Project title</h3>
                </div>
                <div className={styles.projectTeaser}>
                    <Image src={'/project-tmp.jpg'} alt='project image' width={300} height={250}/>
                    <h3>Project title</h3>
                </div>
                <div className={styles.projectTeaser}>
                    <Image src={'/project-tmp.jpg'} alt='project image' width={300} height={250}/>
                    <h3>Project title</h3>
                </div>
            </div>
        </div>
    )
}

export default Projects