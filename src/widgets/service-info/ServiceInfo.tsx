import { Clock, Scissors, MapPin, Heart } from 'lucide-react';

interface ServiceInfoProps {
    imageUrl: string
    name: string
    price: number
    description: string
    durationMinutes: number
    cutType: string
    barberName: string
    barberRole: string
    barberAvatarUrl: string
}

function ServiceInfo({
    imageUrl,
    name,
    price,
    description,
    durationMinutes,
    cutType,
    barberName,
    barberRole,
    barberAvatarUrl,
}: ServiceInfoProps) {
    return (
        <div className="flex flex-col gap-4">
            <div className="relative h-[250px] rounded-2xl overflow-hidden">
                <img
                    src={imageUrl}
                    alt={name}
                    className="w-full h-full object-cover"
                />
            </div>

            <div className="flex items-start justify-between">
                <h1 className="text-xl font-bold text-text-primary">{name}</h1>
                <span className="text-xl font-bold text-accent">${price}</span>
            </div>

            <p className="text-sm text-text-secondary leading-relaxed">
                {description}
            </p>

            <div className="flex items-center gap-4 text-text-secondary">
                <div className="flex items-center gap-1.5">
                    <Clock size={16} />
                    <span className="text-xs">{durationMinutes} mins</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <Scissors size={16} />
                    <span className="text-xs">{cutType}</span>
                </div>
            </div>

            <div className="flex items-center justify-between mt-2">
                <div className="flex items-center gap-3">
                    <img
                        src={barberAvatarUrl}
                        alt={barberName}
                        className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                        <p className="text-sm font-bold text-text-primary">{barberName}</p>
                        <p className="text-xs text-text-secondary uppercase">{barberRole}</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <button className="text-text-secondary">
                        <MapPin size={20} />
                    </button>
                    <button className="text-text-secondary">
                        <Heart size={20} />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ServiceInfo
