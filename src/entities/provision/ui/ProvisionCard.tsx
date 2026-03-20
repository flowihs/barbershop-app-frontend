import type { Provision } from '../model/types';
import { MoveRight, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router';

type ProvisionProps = Omit<Provision, "slots">;

function ProvisionCard({ provision }: { provision: ProvisionProps }) {

  const navigate = useNavigate();

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
          <p className="text-xs text-text-secondary mt-0.5">{provision.category.name}</p>
        </div>
        <button
          onClick={() => navigate(`/provisions/${provision.id}`, { state: { provision } })}
          className="w-9 h-9 flex cursor-pointer items-center justify-center bg-accent rounded-full shrink-0"
        >
          <MoveRight width={20} height={20} color='#000000'/>
        </button>
      </div>
    </div>
  );
}

export default ProvisionCard;
