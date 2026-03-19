interface BookNowButtonProps {
    onClick?: () => void
}

function BookNowButton({ onClick }: BookNowButtonProps) {
    return (
        <button
            onClick={onClick}
            className="w-full cursor-pointer py-3 bg-accent rounded-xl text-bg-primary font-bold text-sm uppercase tracking-wide"
        >
            Book Now
        </button>
    )
}

export default BookNowButton
