import { Clock, Scissors, MapPin, Heart } from 'lucide-react';
import type { Provision } from '../../entities/provision';
import { ExpandButton } from '../../shared/ui/ExpandButton/ExpandButton';


function ServiceInfo({ provision }: {provision: Provision}) {

    return (
        <div className="flex flex-col ml-1 gap-4">
            <div className="relative h-[250px] rounded-2xl overflow-hidden">
                <img
                    src={provision.image}
                    alt={provision.title}
                    className="w-full h-full object-cover"
                />
            </div>

            <div className="flex items-start justify-between">
                <h1 className="text-xl font-bold text-text-primary">{provision.title}</h1>
                <span className="text-xl font-bold text-accent">${provision.price}</span>
            </div>
            <ExpandButton>
                <p className="text-sm text-text-secondary leading-relaxed">
                    {provision.description} 
                </p>
            </ExpandButton>
            <div className="flex items-center gap-4 text-text-secondary">
                <div className="flex items-center gap-1.5">
                    <Clock size={16} className="text-accent"/>
                    {/*<span className="text-xs">{provision.time} mins</span>*/}
                    <span className="text-xs">40 mins</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <Scissors size={16} className="text-accent"/>
                    <span className="text-xs">{provision.category.name}</span>
                </div>
            </div>

            <div className="flex items-center justify-between mt-2">
                <div className="flex items-center gap-3">
                    <img
                        src="/public/default-user.png"
                        alt={provision.user.firstName}
                        className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                        <p className="text-sm font-bold text-text-primary">{provision.user.firstName}</p>
                        <p className="text-xs text-text-secondary uppercase">Barber or client</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <button className="text-text-secondary">
                        <MapPin size={20} className="text-accent cursor-pointer"/>
                    </button>
                    <button className="text-text-secondary">
                        <Heart size={20} className="transition-colors duration-300 hover:text-red-500 cursor-pointer"/>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ServiceInfo
