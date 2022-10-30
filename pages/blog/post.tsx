import { NextPage } from 'next';
import TitleCard from '../../components/titleCard';
import Image from 'next/image';

import styles from '../../styles/BlogPost.module.css';
import projectImage from '../../public/project-tmp.jpg';

const BlogPost: NextPage = () => {
    return (
        <section className={styles.container}>
            <TitleCard author='Oskar Čokl' title='First blog post' date={new Date('2022, 10, 29')} url='/blog'/>
            <section className={styles.content}>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates vitae modi quisquam alias perspiciatis distinctio. Maxime minus a consequatur animi neque, rerum dolorum alias architecto error, nihil distinctio placeat expedita.
                    Fugit, dignissimos ratione. Reiciendis assumenda impedit aperiam nobis optio soluta ipsum voluptas. Recusandae ipsam voluptatum quo facilis. Architecto fuga, repudiandae, similique iste aliquam, accusamus aperiam placeat pariatur obcaecati rerum dignissimos!
                    Sit iure veritatis accusamus nisi. Molestiae, aliquid non. Quibusdam odit consequuntur enim, quasi hic doloremque alias excepturi nam pariatur sequi itaque inventore, recusandae quis facere, magni accusantium corrupti minima obcaecati!
                    Dolor praesentium blanditiis sint est sunt autem eius. Doloribus enim laborum ratione laboriosam a dolores numquam vel? Cum illum quibusdam culpa dolorum assumenda animi. Nobis, eius dicta! Vel, sapiente cumque.
                    Illo sequi, culpa vero dolorum recusandae obcaecati dicta neque explicabo aliquam magni? Expedita excepturi nihil ipsa saepe velit facilis inventore deleniti fugit aut. Ut, accusamus quaerat ipsa commodi illo quae?
                </p>
                <Image src={projectImage} alt="Project image"></Image>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates vitae modi quisquam alias perspiciatis distinctio. Maxime minus a consequatur animi neque, rerum dolorum alias architecto error, nihil distinctio placeat expedita.
                    Fugit, dignissimos ratione. Reiciendis assumenda impedit aperiam nobis optio soluta ipsum voluptas. Recusandae ipsam voluptatum quo facilis. Architecto fuga, repudiandae, similique iste aliquam, accusamus aperiam placeat pariatur obcaecati rerum dignissimos!
                    Sit iure veritatis accusamus nisi. Molestiae, aliquid non. Quibusdam odit consequuntur enim, quasi hic doloremque alias excepturi nam pariatur sequi itaque inventore, recusandae quis facere, magni accusantium corrupti minima obcaecati!
                    Dolor praesentium blanditiis sint est sunt autem eius. Doloribus enim laborum ratione laboriosam a dolores numquam vel? Cum illum quibusdam culpa dolorum assumenda animi. Nobis, eius dicta! Vel, sapiente cumque.
                    Illo sequi, culpa vero dolorum recusandae obcaecati dicta neque explicabo aliquam magni? Expedita excepturi nihil ipsa saepe velit facilis inventore deleniti fugit aut. Ut, accusamus quaerat ipsa commodi illo quae?
                </p>
                <Image src={projectImage} alt="Project image"></Image>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates vitae modi quisquam alias perspiciatis distinctio. Maxime minus a consequatur animi neque, rerum dolorum alias architecto error, nihil distinctio placeat expedita.
                    Fugit, dignissimos ratione. Reiciendis assumenda impedit aperiam nobis optio soluta ipsum voluptas. Recusandae ipsam voluptatum quo facilis. Architecto fuga, repudiandae, similique iste aliquam, accusamus aperiam placeat pariatur obcaecati rerum dignissimos!
                    Sit iure veritatis accusamus nisi. Molestiae, aliquid non. Quibusdam odit consequuntur enim, quasi hic doloremque alias excepturi nam pariatur sequi itaque inventore, recusandae quis facere, magni accusantium corrupti minima obcaecati!
                    Dolor praesentium blanditiis sint est sunt autem eius. Doloribus enim laborum ratione laboriosam a dolores numquam vel? Cum illum quibusdam culpa dolorum assumenda animi. Nobis, eius dicta! Vel, sapiente cumque.
                    Illo sequi, culpa vero dolorum recusandae obcaecati dicta neque explicabo aliquam magni? Expedita excepturi nihil ipsa saepe velit facilis inventore deleniti fugit aut. Ut, accusamus quaerat ipsa commodi illo quae?
                </p>
                <Image src={projectImage} alt="Project image"></Image>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates vitae modi quisquam alias perspiciatis distinctio. Maxime minus a consequatur animi neque, rerum dolorum alias architecto error, nihil distinctio placeat expedita.
                    Fugit, dignissimos ratione. Reiciendis assumenda impedit aperiam nobis optio soluta ipsum voluptas. Recusandae ipsam voluptatum quo facilis. Architecto fuga, repudiandae, similique iste aliquam, accusamus aperiam placeat pariatur obcaecati rerum dignissimos!
                    Sit iure veritatis accusamus nisi. Molestiae, aliquid non. Quibusdam odit consequuntur enim, quasi hic doloremque alias excepturi nam pariatur sequi itaque inventore, recusandae quis facere, magni accusantium corrupti minima obcaecati!
                    Dolor praesentium blanditiis sint est sunt autem eius. Doloribus enim laborum ratione laboriosam a dolores numquam vel? Cum illum quibusdam culpa dolorum assumenda animi. Nobis, eius dicta! Vel, sapiente cumque.
                    Illo sequi, culpa vero dolorum recusandae obcaecati dicta neque explicabo aliquam magni? Expedita excepturi nihil ipsa saepe velit facilis inventore deleniti fugit aut. Ut, accusamus quaerat ipsa commodi illo quae?
                </p>
                <Image src={projectImage} alt="Project image"></Image>
            </section>
        </section>
    )
}

export default BlogPost