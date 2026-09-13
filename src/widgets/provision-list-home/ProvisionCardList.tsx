import styles from './ProvisionCardList.module.css';
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
    return <p className={styles.loading}>Loading...</p>
  }

  const errorMessage = error instanceof Error ? error.message : 'Unknown error';

  if (errorMessage === 'Список категорий пуст') {
    return (
      <p>Noooo</p>
    )
  }
  
  if (error) return <DefaultError text={`Error: ${errorMessage}`} />

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <p className={styles.title}>
          Услуги
        </p>
        <div className={styles.moreLink}>
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
