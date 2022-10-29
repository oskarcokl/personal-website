import { NextPage } from "next";
import Image from "next/image";
import TitleCard from "../components/titleCard";
import styles from '../styles/Project.module.css';

import projectImage from '../public/project-tmp.jpg';


const Project: NextPage = () => {
    return (
        <section className={styles.container}>
            <TitleCard />

            <div className={styles.content}>
                <div className={styles.flexRow}>
                    <p className={styles.flexItem}>
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sapiente minima pariatur esse totam beatae debitis impedit aliquid voluptas perspiciatis autem. Iusto pariatur odio sit numquam sapiente eligendi fugiat, obcaecati dolorum.
                        Odit id adipisci quibusdam doloremque dignissimos alias repudiandae hic possimus sit. Quos animi nemo soluta possimus, libero quisquam autem perferendis numquam dignissimos ab est dicta voluptatibus repudiandae esse aliquam adipisci!
                        Deleniti voluptatem dolor sapiente nihil? Qui eius sit dolor. Debitis consequatur, ad laboriosam accusantium excepturi sequi accusamus sunt, fuga officiis porro maiores nam aperiam voluptates necessitatibus, et dignissimos. Modi, sit?
                    </p>
                    <div className={styles.projectImage + " " + styles.flexItem}>
                        <Image src={projectImage} alt='Project image'/>
                    </div>
                </div>
                <div className={styles.flexRow + ' ' + styles.reverse}>
                    <p className={styles.flexItem}>
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Necessitatibus omnis reiciendis adipisci. Tempore temporibus iusto consequatur molestiae, incidunt repellat, hic quod perferendis non consequuntur adipisci cum? Corporis similique consequuntur expedita.
                        Natus, harum perferendis rem illo maxime adipisci tempora aperiam inventore voluptate dolores dolore porro iure eius consequatur repellat, quam cumque? Facere aperiam iure reprehenderit a! Necessitatibus nam tempora labore. Molestiae?
                        Quisquam necessitatibus officiis enim dolorum, quos alias similique quo veritatis ipsam, molestias inventore sit iste suscipit reprehenderit asperiores corporis velit ad, eos vero hic totam? At ad atque libero quas.
                    </p>
                    <div className={styles.projectImage + " " + styles.flexItem}>
                        <Image src={projectImage} alt='Project image'/>
                    </div>
                </div>
                <div className={styles.flexRow}>
                    <p className={styles.flexItem}>
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sapiente minima pariatur esse totam beatae debitis impedit aliquid voluptas perspiciatis autem. Iusto pariatur odio sit numquam sapiente eligendi fugiat, obcaecati dolorum.
                        Odit id adipisci quibusdam doloremque dignissimos alias repudiandae hic possimus sit. Quos animi nemo soluta possimus, libero quisquam autem perferendis numquam dignissimos ab est dicta voluptatibus repudiandae esse aliquam adipisci!
                        Deleniti voluptatem dolor sapiente nihil? Qui eius sit dolor. Debitis consequatur, ad laboriosam accusantium excepturi sequi accusamus sunt, fuga officiis porro maiores nam aperiam voluptates necessitatibus, et dignissimos. Modi, sit?
                    </p>
                    <div className={styles.projectImage + " " + styles.flexItem}>
                        <Image src={projectImage} alt='Project image'/>
                    </div>
                </div>
                <div className={styles.flexRow + ' ' + styles.reverse}>
                    <p className={styles.flexItem}>
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Necessitatibus omnis reiciendis adipisci. Tempore temporibus iusto consequatur molestiae, incidunt repellat, hic quod perferendis non consequuntur adipisci cum? Corporis similique consequuntur expedita.
                        Natus, harum perferendis rem illo maxime adipisci tempora aperiam inventore voluptate dolores dolore porro iure eius consequatur repellat, quam cumque? Facere aperiam iure reprehenderit a! Necessitatibus nam tempora labore. Molestiae?
                        Quisquam necessitatibus officiis enim dolorum, quos alias similique quo veritatis ipsam, molestias inventore sit iste suscipit reprehenderit asperiores corporis velit ad, eos vero hic totam? At ad atque libero quas.
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