import { useNavigate } from 'react-router';
import { Star, MapPin, ArrowRight } from 'lucide-react';

interface BarberCardProps {
  id: number
  name: string
  description: string
  rating: number
  imageUrl: string
}

function BarberCard({ id, name, description, rating, imageUrl }: BarberCardProps) {
  const navigate = useNavigate();

  return (
    <div className="relative min-w-[260px] max-w-[280px] rounded-2xl overflow-hidden bg-bg-card snap-start">
      <div className="relative h-[200px]">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 left-3 flex items-center gap-1 bg-black/60 backdrop-blur-sm rounded-full px-2 py-1">
          <Star width={14} height={14} fill="#f5c518" stroke="none" />
          <span className="text-xs font-semibold text-white">{rating}</span>
        </div>
        <button className="absolute top-3 right-3 w-7 h-7 flex items-center justify-center bg-black/60 backdrop-blur-sm rounded-full">
          <MapPin width={14} height={14} color="white" />
        </button>
      </div>
      <div className="p-3 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-text-primary">{name}</h3>
          <p className="text-xs text-text-secondary mt-0.5">{description}</p>
        </div>
        <button
          onClick={() => navigate(`/provisions/${id}`)}
          className="w-9 h-9 flex items-center justify-center bg-accent rounded-full shrink-0"
        >
          <ArrowRight width={16} height={16} color="#1a1a1a" strokeWidth={2.5} />
        </button>
      </div>
    </div>
  )
}

export default BarberCard
