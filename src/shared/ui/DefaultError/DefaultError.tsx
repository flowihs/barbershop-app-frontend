import styles from './DefaultError.module.css';
function DefaultError({ text }: {
    text: string
}) {
    return (
      <div className={styles.error}>
        <div>
            <p className={styles.message}>
                {text}
            </p>
        </div>
      </div>
    )
  }

export default DefaultError;