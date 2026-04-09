import SeeAll from '../../shared/ui/SeeAllLink/SeeAll';
import { ProvisionCard } from '../../entities/provision';
import { useQuery } from '@tanstack/react-query';
import { provisionService } from '../../entities/provision/api/provisionApi';
import ListScroll from '../../shared/ui/ListScroll/ListScroll';

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
