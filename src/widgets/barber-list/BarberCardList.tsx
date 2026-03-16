import SeeAll from '../../shared/ui/SeeAllLink/SeeAll';
import BarberCard from '../../entities/barber/ui/BarberCard';
import ListScroll from '../../shared/ui/ListScroll/ListScroll';

interface Barber {
  id: number
  name: string
  description: string
  rating: number
  imageUrl: string
}

const MOCK_BARBERS: Barber[] = [
  {
    id: 1,
    name: 'Razor Work Fred',
    description: 'Quality, Trusted Services.',
    rating: 5.0,
    imageUrl: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=400&h=300&fit=crop',
  },
  {
    id: 2,
    name: 'Classic Cuts Joe',
    description: 'Quality, Trusted Services.',
    rating: 4.8,
    imageUrl: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=400&h=300&fit=crop',
  },
  {
    id: 3,
    name: 'Style Master Tony',
    description: 'Modern & Traditional Styles.',
    rating: 4.9,
    imageUrl: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=400&h=300&fit=crop',
  },
  {
    id: 4,
    name: 'Precision Barber Sam',
    description: 'Fades, Lineups & More.',
    rating: 4.7,
    imageUrl: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=400&h=300&fit=crop',
  },
]

function BarberCardList() {
  return (
    <section className="mb-5">
      <SeeAll route="/" />
      <ListScroll>
        {MOCK_BARBERS.map((barber) => (
          <BarberCard 
            key={barber.id}
            name={barber.name}
            description={barber.description}
            rating={barber.rating}
            imageUrl={barber.imageUrl}
          />
        ))}
      </ListScroll> 
    </section>
  )
}

export default BarberCardList
