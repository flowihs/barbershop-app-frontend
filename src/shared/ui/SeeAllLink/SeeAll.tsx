import { Link } from "react-router"

interface SeeAllProps {
  route: string
}

function SeeAll({route}: SeeAllProps) {
  return (
    <div className="flex items-center justify-between mb-5 pl-4">
      <Link
        className="text-sm font-medium text-accent"
        to={route}
      >
        See All
      </Link>
    </div>
  )
}

export default SeeAll
