import styles from './styles/HomePage.module.css';
import CategoryList from '../../widgets/category-list';
import ProvisionCardList from '../../widgets/provision-list-home/ProvisionCardList';
import { Search, Funnel  } from 'lucide-react';
import { AccountGreet } from '../../entities/account';

function HomePage() {

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <AccountGreet />
      </header>

      <div className={styles.search}>
        <Search className={styles.searchIcon} width={18} height={18} />
        <input
          type="text"
          placeholder="Search for services..."
          className={styles.searchInput}
        />
        <button className={styles.filterButton}>
          <Funnel size={18} />
        </button>
      </div>
      <CategoryList />
      <ProvisionCardList />
    </div>
  )
}

export default HomePage
