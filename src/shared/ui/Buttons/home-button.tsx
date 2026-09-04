interface HomePageButtonProps {
    onClick?: () => void
    text?: string
    variant?: 'primary' | 'secondary' | 'cancel'
}

function HomePageButton({ onClick, text = 'Book Now', variant = 'primary' }: HomePageButtonProps) {
    return (
        <button
            onClick={onClick}
            className={`w-full cursor-pointer py-3 bg-accent hover:bg-accent-hover transition-colors duration-200 rounded-xl text-bg-${variant} font-bold text-sm uppercase tracking-wide`}
        >
            {text}
        </button>
    )
}

export default HomePageButton
