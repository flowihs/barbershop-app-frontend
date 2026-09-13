import styles from './styles/SchedulePage.module.css';
import { useNavigate } from 'react-router';

function ShedulePage() {
  const navigate = useNavigate();

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Booking</h1>
      <p className={styles.description}>Select a service and time</p>
      <button
        className={styles.backButton}
        onClick={() => navigate(-1)}
      >
        Go Back
      </button>
    </div>
  )
}

export default ShedulePage;
