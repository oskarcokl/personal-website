import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from '../styles/Contacts.module.css';

const Contacts = () => {
    return (
        <div className={styles.contacts}>
            <a href="https://github.com/oskarcokl" target={'_blank'} rel="noreferrer"><FontAwesomeIcon icon={faGithub} className={styles.icon}/></a>
            <a href="https://www.linkedin.com/in/oskar-%C4%8Dokl-994b9613b/" target={'_blank'} rel="noreferrer"><FontAwesomeIcon icon={faLinkedin} className={styles.icon}/></a>
            <a href="mailto:oskar.cokl@gmail.com" target={'_blank'} rel="noreferrer"><FontAwesomeIcon icon={faEnvelope} className={styles.icon}/></a>
            <a href="/OskarCoklCV.pdf" target={'_blank'} rel="noreferrer"><FontAwesomeIcon icon={faCircleUser} className={styles.icon}/></a>
        </div>
    )
}

export default Contacts