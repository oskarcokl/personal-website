import { NextPage } from "next";
import Header from "../../components/Header";
import styles from '../../styles/Projects.module.css'
import ProjectTeaser from "../../components/ProjectTeaser";

const Projects: NextPage = () => {
    return (
        <div>
            <Header selected='projects'/>
            <div className={styles.container}>
                <ProjectTeaser url='/projects/project' img='/project-tmp.jpg'/>
                <ProjectTeaser url='/projects/project' img='/project-tmp.jpg'/>
                <ProjectTeaser url='/projects/project' img='/project-tmp.jpg'/>
                <ProjectTeaser url='/projects/project' img='/project-tmp.jpg'/>
                <ProjectTeaser url='/projects/project' img='/project-tmp.jpg'/>
                <ProjectTeaser url='/projects/project' img='/project-tmp.jpg'/>
            </div>
        </div>
    )
}

export default Projects