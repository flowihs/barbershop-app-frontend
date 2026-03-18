import ServiceInfo from '../../widgets/service-info/ServiceInfo';
import BookNowButton from '../../shared/ui/BookNowButton/BookNowButton';

const MOCK_SERVICE = {
    id: 1,
    imageUrl: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=400&h=300&fit=crop',
    name: 'Royal Beard Groom',
    price: 35.00,
    description: 'Complete beard shaping, line-up with straight razor, and a soothing beard oil treatment to keep your beard looking fresh.',
    durationMinutes: 30,
    cutType: 'Standard Cut',
    barberName: 'Julian Rossi',
    barberRole: 'Master Barber',
    barberAvatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
}

function ServiceDetailPage() {

    return (
        <div className="px-4 pt-4 pb-6 flex flex-col gap-6">
            <ServiceInfo
                imageUrl={MOCK_SERVICE.imageUrl}
                name={MOCK_SERVICE.name}
                price={MOCK_SERVICE.price}
                description={MOCK_SERVICE.description}
                durationMinutes={MOCK_SERVICE.durationMinutes}
                cutType={MOCK_SERVICE.cutType}
                barberName={MOCK_SERVICE.barberName}
                barberRole={MOCK_SERVICE.barberRole}
                barberAvatarUrl={MOCK_SERVICE.barberAvatarUrl}
            />
            <BookNowButton />
        </div>
    )
}

export default ServiceDetailPage
