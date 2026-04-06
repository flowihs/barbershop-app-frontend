import ServiceInfo from '../../widgets/service-info/ServiceInfo';
import BookNowButton from '../../shared/ui/DefaultButton/DefaultButton';
import SlotBanner from '../../widgets/slot-banner/SlotBanner';
import DefaultError from '../../shared/ui/DefaultError/DefaultError';
import { useQuery } from '@tanstack/react-query';
import { provisionService } from '../../entities/provision/api/provisionApi';
import { useParams } from "react-router";
import { useState } from 'react';


function ServiceDetailPage() {

    const { id } = useParams();
    const nId = Number(id);
    const isValid = id !== undefined && !isNaN(nId);
    // Проверка на то, что id не undefained и не по типу 'abc'    

    const [isOpen, setIsOpen] = useState(false);

    const { data: provision, isLoading, error } = useQuery({
        queryKey: ['provisions', id],
        queryFn: () => provisionService.getById(nId),
        enabled: isValid,
        //отправляет запрос только когда id валидный
    });

    if (!isValid) return <DefaultError text="Something went wrong" />

    if (isLoading) {
        return <p className='text-text-secondary text-sm p-4'>Loading...</p>
    }

    if (error || !provision) return <DefaultError text="Failed to load service..." />
    return (
        <div className="px-4 pt-4 pb-6 flex flex-col gap-6">
            <ServiceInfo provision={provision} />
            <BookNowButton onClick={() => setIsOpen(!isOpen)} />
            {isOpen && (
                <SlotBanner 
                    onClose={() => setIsOpen(!isOpen)} 
                    provisionId={nId} 
                />
            )}

        </div>
    )
}

export default ServiceDetailPage
