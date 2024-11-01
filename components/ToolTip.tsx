import { useState, useEffect } from 'react';

export const dynamic = 'force-dynamic';

interface ToolTipProps {
  skyColor: string;
}

interface Position {
  top: number;
  left: number;
}

export default function ToolTip({ skyColor }: ToolTipProps) {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [touchTimeout, setTouchTimeout] = useState<NodeJS.Timeout | null>(null);
  const [position, setPosition] = useState<Position>({ top: 0, left: 0 });
  const [z, setZ] = useState<number>(-1);
  const [imageData, setImageData] = useState<string | null>(null); // Store image data URL

  //   Fetch image data when the component mounts
  // Fetch image data from the API route when the component mounts
  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await fetch('/api/get-image');
        const data = await response.json();
        if (data.imageUrl) {
          setImageData(data.imageUrl); // Set image data URL in state
        }
      } catch (error) {
        console.error('Error fetching image:', error);
      }
    };

    fetchImage();
  }, []);

  useEffect(() => {
    return () => {
      if (touchTimeout) clearTimeout(touchTimeout);
    };
  }, [touchTimeout]);

  useEffect(() => {
    const updatePosition = () => {
      const el = document.getElementById('centeredEl');
      if (el) {
        const viewWidth = window.innerWidth;
        const viewHeight = window.innerHeight;
        const scrollX = window.scrollX;
        const scrollY = window.scrollY;
        const elementWidth = el.offsetWidth;
        const elementHeight = el.offsetHeight;

        const left = scrollX + (viewWidth - elementWidth) / 2;
        const top = scrollY + (viewHeight - elementHeight) / 4;
        setPosition({ left, top });
      }
    };
    updatePosition();

    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition);

    return () => {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition);
    };
  }, []);

  const showTooltip = () => {
    setTouchTimeout(
      setTimeout(() => {
        setIsVisible(true);
        setZ(50);
      }, 350)
    );
  };

  const hideTooltip = () => {
    if (touchTimeout) clearTimeout(touchTimeout);
    setTouchTimeout(
      setTimeout(() => {
        setIsVisible(false);
        setZ(-1);
      }, 350)
    );
  };
  return (
    <div className="relative inline-block">
      <span
        onClick={isVisible ? hideTooltip : showTooltip}
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
        className="underline cursor-pointer"
        style={{ color: skyColor }}
      >
        {skyColor}
      </span>
      <div
        id="centeredEl"
        style={{
          background: skyColor,
          opacity: isVisible ? 100 : 0,
          left: `${position.left}px`,
          top: `${position.top}px`,
          zIndex: `${z}`,
        }}
        className="fixed w-72 h-32 transition-all duration-500 mb-3 p-2 rounded-lg"
      >
        {imageData ? (
          <div
            style={{
              backgroundImage: `url(${imageData})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
            className="w-full h-full rounded-lg"
          ></div>
        ) : (
          <p>Loading image...</p>
        )}
      </div>
    </div>
  );
}
