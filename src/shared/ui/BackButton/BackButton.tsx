import { useNavigate } from "react-router";
import { MoveLeft } from 'lucide-react';

function BackButton() {

    const navigate = useNavigate();

    return (
        <div className="">
            <button
                onClick={() => navigate(-1)}
                className="w-8 h-8 flex cursor-pointer items-center justify-center rounded-full bg-white/1 backdrop-blur-md"
            >
                <MoveLeft width={20} height={20} className="text-icon-primary"/>
            </button>
        </div>
    )
}

export default BackButton;