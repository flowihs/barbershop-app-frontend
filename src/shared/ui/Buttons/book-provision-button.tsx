import styles from './styles/book-provision-button.module.css';
interface HomePageButtonProps {
    onClick?: () => void
    type?: 'button' | 'submit' | 'reset'
    disabled?: boolean
    text?: string
    variant?: 'primary' | 'secondary' | 'cancel'
}

function BookProvisionButton({ onClick, text = 'Book Now', variant = 'primary', type, disabled = false }: HomePageButtonProps) {
    return (
        <button
            data-variant={variant}
            type={type}
            disabled={disabled}
            onClick={onClick}
            className={styles.button}
        >
            {text}
        </button>
    )
}

export default BookProvisionButton
