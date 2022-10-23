import styles from '../styles/BlogTeaser.module.css'

const BlogTeaser = () => {
    return (
        <div className={styles.blogTeaser}>
            <div>
                <a href=""><h3>Blog title</h3></a>
            </div>
            <div>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur varius metus nibh, id convallis enim blandit ut. Etiam ornare, nisi sit amet commodo ornare, mauris risus...</p>
            </div>
        </div>
    )
}

export default BlogTeaser