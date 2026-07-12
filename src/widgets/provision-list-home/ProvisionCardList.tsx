import SeeAll from '../../shared/ui/SeeAllLink/SeeAll';
import { ProvisionCard } from '../../entities/provision';
import { useQuery } from '@tanstack/react-query';
import { provisionService } from '../../entities/provision/api/provisionApi';
import ListScroll from '../../shared/ui/ListScroll/ListScroll';
import DefaultError from '../../shared/ui/DefaultError/DefaultError';

function ProvisionCardList() {

  const { data: provisions, isLoading, error } = useQuery({
    queryKey: ['provisions'],
    queryFn: provisionService.getAll
  });

  if (isLoading) {
    return <p className='text-text-secondary text-sm p-4'>Loading...</p>
  }

  const errorMessage = error instanceof Error ? error.message : 'Unknown error';

  if (errorMessage === 'Список категорий пуст') {
    return (
      <p>Noooo</p>
    )
  }
  
  if (error) return <DefaultError text={`Error: ${errorMessage}`} />

  return (
    <section className="mb-10">
      <div className='flex justify-between py-4 px-2'>
        <p className="text-xl text-text-primary">
          Provisions
        </p>
        <div className="mt-1">
          <SeeAll route="/" />
        </div>
      </div>
      <ListScroll>
        {provisions?.map((provision) => (
          <ProvisionCard key={provision.id} provision={provision} />
        ))}
      </ListScroll>
    </section>
  );
}

export default ProvisionCardList;
