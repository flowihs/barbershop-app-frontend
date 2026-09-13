import styles from './styles/SeeAll.module.css';
import { Link } from "react-router"

interface SeeAllProps {
  route: string
}

function SeeAll({route}: SeeAllProps) {
  return (
    <div className={styles.container}>
      <Link
        className={styles.link}
        to={route}
      >
        See All
      </Link>
    </div>
  )
}

export default SeeAll
