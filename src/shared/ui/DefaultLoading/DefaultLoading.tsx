import styles from './DefaultLoading.module.css';

export default function DefaultLoading() {
    return (
        <div className={styles.loading}>
                <div className={styles.avatar} />
                <div className={styles.text} />
        </div>
    )
}