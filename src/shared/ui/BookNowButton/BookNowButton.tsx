interface BookNowButtonProps {
    onClick?: () => void
}

function BookNowButton({ onClick }: BookNowButtonProps) {
    return (
        <button
            onClick={onClick}
            className="w-full py-3 bg-accent rounded-xl text-bg-primary font-bold text-sm uppercase tracking-wide"
        >
            Book Now
        </button>
    )
}

export default BookNowButton
