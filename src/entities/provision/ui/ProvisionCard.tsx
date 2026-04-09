import type { Provision } from '../model/types';
import { MoveRight, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router';

function ProvisionCard({ provision }: { provision: Provision }) {

  const navigate = useNavigate();

  return (
    <div className="relative min-w-[260px] max-w-[280px] rounded-2xl overflow-hidden bg-bg-card snap-start">
      <div className="relative h-[200px]">
        <img
          src={provision.image}
          alt={provision.title}
          className="w-full h-full object-cover"
        />
        <button className="absolute top-3 right-3 w-7 h-7 flex items-center justify-center bg-black/40 backdrop-blur-sm rounded-full">
          <MapPin width={17} height={17} color='white'/>
        </button>
      </div>
      <div className="
        flex items-center justify-between"
      >
        <div className='p-6 px-10 py-5 flex bg-bg-primary/80 border border-border/10 rounded-xl'>
          <div>
            <h3 className="text-sm font-bold text-text-primary">{provision.title}</h3>
            <p className="text-xs text-text-secondary mt-0.5">{provision.category.name}</p>
          </div>
          <button
            onClick={() => navigate(`/provisions/${provision.id}`)}
            className="w-9 h-9 flex cursor-pointer items-center justify-center bg-accent rounded-xl shrink-0"
          >
            <MoveRight width={20} height={20} color='#000000'/>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProvisionCard;
