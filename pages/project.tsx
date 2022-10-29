import { NextPage } from "next";
import BackButton from "../components/BackButton";
import Image from "next/image";
import styles from '../styles/Project.module.css';

import projectImage from '../public/project-tmp.jpg';


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

            <div className={styles.content}>
                <div className={styles.flexRow}>
                    <p className={styles.flexItem}>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fuga iure cupiditate ab quasi minus distinctio! Vitae animi veniam qui nulla corporis recusandae explicabo optio libero, consequuntur quas dignissimos officiis cumque!
                        Corporis rem voluptates natus, ut ad et sed ducimus nam repudiandae reprehenderit totam illo provident alias esse ab quidem soluta sit, consequatur quibusdam neque autem, voluptate assumenda odio! Totam, ducimus!
                    </p>
                    <div className={styles.projectImage + " " + styles.flexItem}>
                        <Image src={projectImage} alt='Project image'/>
                    </div>
                </div>
                <div className={styles.flexRow + ' ' + styles.reverse}>
                    <p className={styles.flexItem}>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fuga iure cupiditate ab quasi minus distinctio! Vitae animi veniam qui nulla corporis recusandae explicabo optio libero, consequuntur quas dignissimos officiis cumque!
                        Corporis rem voluptates natus, ut ad et sed ducimus nam repudiandae reprehenderit totam illo provident alias esse ab quidem soluta sit, consequatur quibusdam neque autem, voluptate assumenda odio! Totam, ducimus!
                    </p>
                    <div className={styles.projectImage + " " + styles.flexItem}>
                        <Image src={projectImage} alt='Project image'/>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Project