import SeeAll from '../../shared/ui/SeeAllLink/SeeAll';
import { ProvisionCard } from '../../entities/provision';
import { useQuery } from '@tanstack/react-query';
import { provisionService } from '../../entities/provision/api/provisionApi';
import ListScroll from '../../shared/ui/ListScroll/ListScroll';

// const MOCK_PROVISIONS: Provision[] = [
//   {
//     id: 1,
//     title: 'Razor Work Fred',
//     description: 'Quality, Trusted Services.',
//     price: 35,
//     image: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=400&h=300&fit=crop',
//     user: { id: 1, firstName: 'Fred', username: 'fred', description: null, email: null, createdAt: '', updatedAt: '' },
//     category: { id: 1, name: 'Barber', provision: [] },
//     slots: [],
//   },
//   {
//     id: 2,
//     title: 'Classic Cuts Joe',
//     description: 'Quality, Trusted Services.',
//     price: 40,
//     image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=400&h=300&fit=crop',
//     user: { id: 2, firstName: 'Joe', username: '@joe', description: null, email: null, createdAt: '', updatedAt: '' },
//     category: { id: 2, name: 'Makeup', provision: [] },
//     slots: [],
//   },
//   {
//     id: 3,
//     title: 'Style Master Tony',
//     description: 'Modern & Traditional Styles.',
//     price: 45,
//     image: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=400&h=300&fit=crop',
//     user: { id: 3, firstName: 'Tony', username: '@tony', description: null, email: null, createdAt: '', updatedAt: '' },
//     category: { id: 3, name: 'Tatoo', provision: [] },
//     slots: [],
//   },
//   {
//     id: 4,
//     title: 'Precision Barber Sam',
//     description: 'Fades, Lineups & More.',
//     price: 30,
//     image: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=400&h=300&fit=crop',
//     user: { id: 4, firstName: 'Sam', username: '@sam', description: null, email: null, createdAt: '', updatedAt: '' },
//     category: { id: 4, name: 'Hair Salon', provision: [] },
//     slots: [],
//   },
// ];

function ProvisionCardList() {

  const { data: provisions, isLoading, error } = useQuery({
    queryKey: ['provisions'],
    queryFn: provisionService.getAll
  });

  if (isLoading) {
    return <p className='text-text-secondary text-sm p-4'>Loading...</p>
  }

  if (error) {
    return <p className='text-red-500 text-sm p-4'>Failed to load provisions</p>
  }

  return (
    <section className="mb-5">
      <SeeAll route="/" />
      <ListScroll>
        {provisions?.map((provision) => (
          <ProvisionCard key={provision.id} provision={provision} />
        ))}
      </ListScroll>
    </section>
  );
}

export default ProvisionCardList;
