
import DefaultError from "../../shared/ui/DefaultError/DefaultError";
import DefaultLoading from "../../shared/ui/DefaultLoading/DefaultLoading";
import { useQuery } from "@tanstack/react-query";
import { provisionService } from "../../entities/provision/api/provisionApi";
import { ErrorHandlingMassage } from "../../shared/lib/api-error/apiErrorHandling";
import { ProvisionTicket } from "../../entities/provision/ui/profile/ProvisionTicket";

function ProvisionTicketList() {
    
    const { data: provisions, isLoading, error } = useQuery({
        queryKey: ['provision', 'all'],
        queryFn: provisionService.getAll
    })

    if (isLoading) return <DefaultLoading />

    if (error) return <DefaultError text={ErrorHandlingMassage(error)} />

    const price = 40;
    const time = '40';

    return (
        <div>
            {provisions?.map((provision, index) => (
                <ProvisionTicket key={index} title={provision.title} time={time} price={price} />
            ))}
        </div>
    )
}

export { ProvisionTicketList }