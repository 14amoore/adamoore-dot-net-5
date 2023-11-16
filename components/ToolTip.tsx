import { ReactNode, useState, useEffect } from 'react';

interface ToolTipProps {
    skyColor: string,
    skylineUrl: string,
}

export default function ToolTip({skyColor, skylineUrl}: ToolTipProps) {
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [touchTimeout, setTouchTimeout] = useState<NodeJS.Timeout | number | null>(null);

    useEffect(() => {
        return () => {
            if(touchTimeout) clearTimeout(touchTimeout);
        }
    }, [touchTimeout]);
    
    const showTooltip = () => {
        setTouchTimeout(setTimeout(() => {
            setIsVisible(true);
        }, 350))
    }

    const hideTooltip = () => {
        if(touchTimeout) clearTimeout(touchTimeout);
        setTouchTimeout(setTimeout(() => {
            setIsVisible(false);
        }, 350)); 
    }
    return (
        <div className="relative inline-block">
         <span  
            onClick={isVisible ? hideTooltip : showTooltip}
            onMouseEnter={showTooltip}
            onMouseLeave={hideTooltip} className='underline cursor-pointer' style={{color: skyColor}}>{skyColor}</span>
            <div style={{background: skyColor, opacity: isVisible ? 100 : 0}} className='absolute w-72 h-32 bottom-[100%]  transition-opacity duration-500 left-[100%] translate-x-[-50%] mb-3 p-2 z-50 rounded-lg'>
                <div style={{backgroundImage: `url(${skylineUrl})`, backgroundSize: 'cover'}} className='w-full h-full rounded-lg'></div>
            </div>
        </div>
    )
}