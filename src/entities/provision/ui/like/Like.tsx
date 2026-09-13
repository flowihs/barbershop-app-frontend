import styles from './styles/Like.module.css';
import { Heart } from 'lucide-react';
import { type ReactElement, useState } from 'react';
import { provisionService } from "../../api/provisionApi";

interface LikeProps {
    id: number;
}

export function Like({ id }: LikeProps): ReactElement {

    const [isLiked, setIsLiked] = useState<boolean>(false);
    const [isPending, setIsPeding] = useState<boolean>(false);

    const handleLike = async () => {
        try {
            setIsPeding(true);
            await provisionService.like(id);
        } catch (e: unknown) {
            console.log(e);
        } finally {
            setIsLiked(v => !v);
            setIsPeding(false);
        }
    }

    return (
        <button 
            onClick={handleLike}
            disabled={isPending}
        >
            <Heart 
                size={20} 
                className={`${styles.heart} ${isLiked ? styles.liked : styles.unliked}`}
            />
        </button>
    )

}

