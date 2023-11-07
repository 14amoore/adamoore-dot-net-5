import { ReactNode, useState, useEffect } from 'react';

interface ToolTipProps {
    children: ReactNode,
    skyColor: string
}

export default function ToolTip({children, skyColor}: ToolTipProps) {
    const [isVisible, setIsVisible] = useState(false);
    const [touchTimeout, setTouchTimeout] = useState<NodeJS.Timeout | number | null>(null);

    useEffect(() => {
        return () => {
            if(touchTimeout) clearTimeout(touchTimeout);
        }
    }, [touchTimeout]);
    
    const showTooltip = () => {
        setTouchTimeout(setTimeout(() => {
            setIsVisible(true);
        }, 500))
    }

    const hideTooltip = () => {
        if(touchTimeout) clearTimeout(touchTimeout);
        setIsVisible(false);
    }
    return (
        <div
        onTouchStart={showTooltip}
        onTouchEnd={hideTooltip} 
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        className="relative inline-block"
        >
            {children}
            {isVisible && (
                <div style={{background: skyColor}} className='absolute w-20 h-20 bottom-[100%] left-[50%] mb-3 p-1 whitespace-nowrap z-50  rounded-lg'>
                </div>
            )}
        </div>
    )
}