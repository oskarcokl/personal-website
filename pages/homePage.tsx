import type { NextPage } from 'next'
import styles from '../styles/HomePage.module.css'

const HomePage: NextPage = () => {
    return (
        <div>
            <div className={styles.header}>
                <h2 className={styles.headerTitle}>Projects</h2>
                <h1 className={styles.headerTitle}>Oskar Čokl</h1>
                <h2 className={styles.headerTitle}>Blog</h2>
            </div>
            <div className={styles.content}>
                <div className={styles.aboutMe}>
                    <h1>About Me</h1>
                </div>
                <div>
                    <p>
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sunt quasi consequuntur eaque nulla quibusdam alias animi consequatur nostrum reprehenderit cum veniam, commodi quod, fugiat dolorum aliquid. Culpa ipsa nesciunt impedit!
                        Similique ea libero beatae? Doloribus, rerum error ratione ullam perspiciatis possimus placeat eveniet exercitationem harum obcaecati fugiat delectus, temporibus beatae reprehenderit aut consequuntur hic iure dolorem sequi, aperiam quae? Numquam.
                        Quia quos doloremque aliquid quod dolorem perferendis, eveniet animi inventore, fugiat vitae exercitationem labore distinctio saepe, corrupti suscipit itaque. Voluptates modi dolores nobis alias minus. Amet ea harum voluptatum nulla?
                    </p>
                    <p>
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sunt quasi consequuntur eaque nulla quibusdam alias animi consequatur nostrum reprehenderit cum veniam, commodi quod, fugiat dolorum aliquid. Culpa ipsa nesciunt impedit!
                        Similique ea libero beatae? Doloribus, rerum error ratione ullam perspiciatis possimus placeat eveniet exercitationem harum obcaecati fugiat delectus, temporibus beatae reprehenderit aut consequuntur hic iure dolorem sequi, aperiam quae? Numquam.
                        Quia quos doloremque aliquid quod dolorem perferendis, eveniet animi inventore, fugiat vitae exercitationem labore distinctio saepe, corrupti suscipit itaque. Voluptates modi dolores nobis alias minus. Amet ea harum voluptatum nulla?
                    </p>
                </div>
            </div>
        </div>
    )
}

export default HomePage