import ServiceInfo from '../../widgets/service-info/ServiceInfo';
import BookNowButton from '../../shared/ui/DefaultButton/DefaultButton';
import { useQuery } from '@tanstack/react-query';
import { provisionService } from '../../entities/provision/api/provisionApi';
import { useParams } from "react-router";


function ServiceDetailPage() {

    const { id } = useParams();

    const { data: provision, isLoading, error } = useQuery({
        queryKey: ['provisions', id],
        queryFn: () => provisionService.getById(Number(id))
    });

    if (!isLoading) {
        return <p className='text-text-secondary text-sm p-4'>Loading...</p>
    }

    if (error || !provision) {
        return <p className='text-red-500 text-sm p-4'>Failed to load service...</p>
    }

    return (
        <div className="px-4 pt-4 pb-6 flex flex-col gap-6">
            <ServiceInfo provision={provision}/>
            <BookNowButton />
        </div>
    )
}

export default ServiceDetailPage
