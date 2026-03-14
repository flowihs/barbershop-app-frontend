interface BarberCardProps {
  name: string
  description: string
  rating: number
  imageUrl: string
}

function BarberCard({ name, description, rating, imageUrl }: BarberCardProps) {
  return (
    <div className="relative min-w-[260px] max-w-[280px] rounded-2xl overflow-hidden bg-bg-card snap-start">
      <div className="relative h-[200px]">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 left-3 flex items-center gap-1 bg-black/60 backdrop-blur-sm rounded-full px-2 py-1">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="#f5c518" stroke="none">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
          <span className="text-xs font-semibold text-white">{rating}</span>
        </div>
        <button className="absolute top-3 right-3 w-7 h-7 flex items-center justify-center bg-black/60 backdrop-blur-sm rounded-full">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
        </button>
      </div>
      <div className="p-3 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-text-primary">{name}</h3>
          <p className="text-xs text-text-secondary mt-0.5">{description}</p>
        </div>
        <button className="w-9 h-9 flex items-center justify-center bg-accent rounded-full shrink-0">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default BarberCard
