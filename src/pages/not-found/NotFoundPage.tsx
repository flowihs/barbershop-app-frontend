import { Home } from 'lucide-react';
import { Link } from 'react-router-dom';
import styles from './NotFoundPage.module.css';

function NotFoundPage() {
  return (
    <section className={styles.page} aria-labelledby="not-found-title">
      <div className={styles.content}>
        <p className={styles.code}>404</p>
        <h2 id="not-found-title" className={styles.title}>Страница не найдена</h2>
        <Link to="/" className={styles.primaryAction}>
          <Home size={17} strokeWidth={2} />
          <p>Вернуться на главную</p>
        </Link>
      </div>
    </section>
  );
}

export default NotFoundPage;
