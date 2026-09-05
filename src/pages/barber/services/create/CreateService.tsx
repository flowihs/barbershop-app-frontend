
import { ServiceForm } from '@/features/manage-service/ui/ServiceForm';
// import { useCreateProvision } from '@/features/manage-service/model/use-create-provision';
import type { SubmitEvent } from 'react';

export default function CreateService() {

    // const createProvision = useCreateProvision();

    const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();

        // const formData = new FormData(event.currentTarget);
        // createProvision.mutate({
        //     title: String(formData.get('title')),
        //     description: String(formData.get('description')),
        //     categoryId: Number(formData.get('categoryId')),
        //     slots: 
        // })
    }

    return (
        <ServiceForm 
            submitText='Создать услугу'
            onSubmit={handleSubmit}
        />
    )
}