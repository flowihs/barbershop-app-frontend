import styles from './styles/Logo.module.css';

function Logo() {
    
    return (
        <div className={styles.logo}>
            <img src="/images/icons/logo.svg" alt="logo" />
        </div>
    );
}

export default Logo

