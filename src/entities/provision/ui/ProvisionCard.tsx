import type { Provision } from '../model/types';
import { Link } from 'react-router';
import { MoveRight, MapPin } from 'lucide-react';


function ProvisionCard({ provision }: { provision: Provision }) {

  return (
    <div className="relative min-w-[260px] max-w-[280px] rounded-2xl overflow-hidden bg-bg-card snap-start">
      <div className="relative h-[200px]">
        <img
          src={provision.image}
          alt={provision.title}
          className="w-full h-full object-cover"
        />
        <button className="absolute top-3 right-3 w-7 h-7 flex items-center justify-center bg-black/60 backdrop-blur-sm rounded-full">
          <MapPin width={17} height={17} color='white'/>
        </button>
      </div>
      <div className="p-3 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-text-primary">{provision.title}</h3>
          <p className="text-xs text-text-secondary mt-0.5">{provision.description}</p>
        </div>
        <Link
          to={`/provisions/${provision.id}`}
          className="w-9 h-9 flex items-center justify-center bg-accent rounded-full shrink-0"
        >
          <MoveRight width={20} height={20} color='#000000'/>
        </Link>
      </div>
    </div>
  );
}

export default ProvisionCard;
