import type { Provision } from '../../model/types';
import { MoveRight, MapPin, Star } from 'lucide-react';
import { useNavigate } from 'react-router';

function ProvisionCard({ provision }: { provision: Provision }) {

  const navigate = useNavigate();

  return (
    <div className="relative min-w-[260px] max-w-[280px]">
      <div className="relative h-card overflow-hidden rounded-4xl bg-bg-card"  >
        <img
          // src={provision.image}
          alt={provision.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-x-4 top-4 items-center flex flex-row-reverse justify-between">
          <button className="p-2 bg-black/30 backdrop-blur-sm rounded-full">
            <MapPin size={15} color='white'/>
          </button>
          <div className="p-1 px-2 flex justify-between items-center gap-2 bg-black/30 backdrop-blur-sm rounded-2xl">
            <Star size={15} className="text-accent" />
            {/* <p>{provision.reviews.rating}</p> */}
            <p className="text-text-primary text-[13px]">5.0</p>
          </div>
        </div>

        <div className="absolute inset-x-4 bottom-3">
          <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-bg-primary/70 p-4 backdrop-blur-md">
            <div className="min-w-0 flex-col">
              <h3 className="text-sm line-clamp-1 font-bold text-text-primary">
                {provision.title}
              </h3>
              <p className="mt-1 text-xs text-text-secondary">
                {provision.provisionCategory.name}
              </p>
            </div>

            <button
              onClick={() => navigate(`/provisions/${provision.id}`)}
              className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-2xl bg-accent text-black transition-colors hover:bg-accent-hover"
            >
              <MoveRight width={20} height={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProvisionCard;
