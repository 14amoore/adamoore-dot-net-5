import { ReactNode, useState, useEffect } from 'react';

interface ToolTipProps {
    children: ReactNode,
    skyColor: string,
    skylineUrl: string,
}

export default function ToolTip({children, skyColor, skylineUrl}: ToolTipProps) {
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
                <div style={{background: skyColor}} className='absolute w-72 h-32 bottom-[100%] left-[10%] mb-3 p-2 z-50 rounded-lg'>
                    <div style={{backgroundImage: `url(${skylineUrl})`, backgroundSize: 'cover'}} className='w-full h-full rounded-lg'></div>
                </div>
            )}
        </div>
    )
}