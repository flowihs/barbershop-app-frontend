import { ChevronDown } from "lucide-react";
import { useState } from "react";


function ExpandButton({ children }: { children: React.ReactNode }) {
    
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div>
            <div className={`transition-all duration-300 ${!isExpanded ? `line-clamp-3` : ``}`}>
                {children}
            </div>
            <button onClick={() => setIsExpanded(!isExpanded)}>
                <ChevronDown width={20} height={20} className="text-icon-primary"/>
            </button>
        </div>
    )
}

export { ExpandButton }