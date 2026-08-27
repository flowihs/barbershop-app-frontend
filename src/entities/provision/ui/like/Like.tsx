import { Heart } from 'lucide-react';
import { type ReactElement, useState } from 'react';
import { provisionService } from "../../api/provisionApi";
import { useQuery } from '@tanstack/react-query';


export function Like(): ReactElement {

    const [isLiked, setIsLiked] = useState<boolean>(false);

    const { data: account, error } = useQuery({
		queryKey: ['account', 'me'],
		queryFn: provisionService.like,
	});

    if (error) {
        console.log(error);
    }

    if (account) {
        setIsLiked(true);
    }

    return (
        <button className="text-text-secondary">
            <Heart 
                size={20} 
                className="transition-colors duration-300 hover:text-red-500 cursor-pointer"
                color={isLiked ? '#fb2c36' : ''}
            />
        </button>
    )

}

