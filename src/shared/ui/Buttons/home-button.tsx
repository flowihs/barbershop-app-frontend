import styles from './home-button.module.css';
interface HomePageButtonProps {
    onClick?: () => void
    text?: string
    variant?: 'primary' | 'secondary' | 'cancel'
}

function HomePageButton({ onClick, text = 'Book Now', variant = 'primary' }: HomePageButtonProps) {
    return (
        <button
            data-variant={variant}
            onClick={onClick}
            className={styles.button}
        >
            {text}
        </button>
    )
}

export default HomePageButton
