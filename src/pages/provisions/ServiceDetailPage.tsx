import ServiceInfo from '../../widgets/service-info/ServiceInfo';
import BookNowButton from '../../shared/ui/BookNowButton/BookNowButton';
import { useLocation } from 'react-router';
import type { Provision } from '../../entities/provision';


function ServiceDetailPage() {

    const { state } = useLocation();
    const provision = state?.provision as Provision;

    return (
        <div className="px-4 pt-4 pb-6 flex flex-col gap-6">
            <ServiceInfo provision={provision}/>
            <BookNowButton />
        </div>
    )
}

export default ServiceDetailPage
