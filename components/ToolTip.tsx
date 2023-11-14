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
        }, 500))
    }

    const hideTooltip = () => {
        if(touchTimeout) clearTimeout(touchTimeout);
        setTouchTimeout(setTimeout(() => {
            setIsVisible(false);
        }, 500)); 
    }
    return (
        <div
        onTouchStart={showTooltip}
        onTouchEnd={hideTooltip} 
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={hideTooltip}
        className="relative inline-block group"
        >
         <span className='underline' style={{color: skyColor}}>{skyColor}</span>
            <div style={{background: skyColor}} className='absolute w-72 h-32 bottom-[100%]  transition-opacity opacity-0 group-hover:opacity-100 duration-500 left-[100%] translate-x-[-50%] mb-3 p-2 z-50 rounded-lg'>
                <div style={{backgroundImage: `url(${skylineUrl})`, backgroundSize: 'cover'}} className='w-full h-full rounded-lg'></div>
            </div>
        </div>
    )
}