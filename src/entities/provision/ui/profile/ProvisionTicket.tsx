
import { SquareArrowOutUpRight } from 'lucide-react';
import { Clock } from 'lucide-react';

function ProvisionTicket({ 
    title,
    price,
    time 
}: {
    title: string,
    price: number,
    time: string 
}) {

    return (
        <div>
            <div className='grid grid-cols-2 gap-10' >
                <div>
                    {title}
                </div>
                <div className='space-x-5'>
                    <span className='text-bg-textholder-area text-md font-bold'>
                        {price}
                    </span>
                    <span>
                        <SquareArrowOutUpRight size={10} className='text-text-muted'/>
                    </span>
                </div>
                <div className='col-span-2 space-x-5'>
                    <span>
                        <Clock size={6} className='text-text-muted' />
                    </span>
                    <span className='text-text-muted text-sm font-semibold'>{time} min</span>
                </div>
            </div>
        </div>
    )
}

export { ProvisionTicket }