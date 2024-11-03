import { useState, useEffect } from 'react';

export const dynamic = 'force-dynamic';

interface ToolTipProps {
  skyColor: string;
}

interface Position {
  top: number;
  left: number;
}

const TOOLTIP_SEEN_KEY: string = 'imageSeen';
const TOOLTIP_SEEN_TIMESTAMP_KEY: string = 'imageSeenTimestamp';
const SPARKLES_SEEN_KEY = 'sparklesSeen';
const TOOLTIP_EXPIRY_DAYS: number = 1;

export default function ToolTip({ skyColor }: ToolTipProps) {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [showSparkles, setShowSparkles] = useState<boolean>(false); // New state for sparkles
  const [touchTimeout, setTouchTimeout] = useState<NodeJS.Timeout | null>(null);
  const [position, setPosition] = useState<Position>({ top: 0, left: 0 });
  const [z, setZ] = useState<number>(-1);
  const [imageData, setImageData] = useState<string | null>(null); // Store image data URL
  const [imageSeen, setImageSeen] = useState<boolean>(false);

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

  // Check local storage for 'imageSeen' status and timestamp
  useEffect(() => {
    const seenStatus = localStorage.getItem(TOOLTIP_SEEN_KEY);
    const seenTimestamp = localStorage.getItem(TOOLTIP_SEEN_TIMESTAMP_KEY);
    const sparklesSeen = localStorage.getItem(SPARKLES_SEEN_KEY);
    // Calculate the expiration date
    const now = new Date();
    const lastSeenDate = seenTimestamp
      ? new Date(parseInt(seenTimestamp, 10))
      : null;
    const daysSinceSeen = lastSeenDate
      ? (now.getTime() - lastSeenDate.getTime()) / (1000 * 60 * 60 * 24)
      : Infinity;
    // Set imageSeen to false if more than TOOLTIP_EXPIRY_DAYS have passed
    if (seenStatus === 'true' && daysSinceSeen <= TOOLTIP_EXPIRY_DAYS) {
      setImageSeen(true);
      setShowSparkles(true);
      localStorage.setItem(SPARKLES_SEEN_KEY, 'true');
    } else {
      setImageSeen(false);
      setShowSparkles(false);
    }
  }, []);

  const showTooltip = () => {
    setTouchTimeout(
      setTimeout(() => {
        setIsVisible(true);
        setZ(50);
      }, 350)
    );
    // Mark tooltip as seen and set the timestamp
    setImageSeen(true);
    localStorage.setItem(TOOLTIP_SEEN_KEY, 'true');
    localStorage.setItem(TOOLTIP_SEEN_TIMESTAMP_KEY, Date.now().toString());
  };

  const hideTooltip = () => {
    if (touchTimeout) clearTimeout(touchTimeout);
    setTouchTimeout(
      setTimeout(() => {
        setIsVisible(false);
        setZ(-1);
        setTimeout(() => setShowSparkles(true), 500);
        // Ensure sparkles persist
      }, 350)
    );
  };

  const toolTipClass = imageSeen
    ? 'relative'
    : 'transition-transform ease-in-out animate-pulse';

  // Updated sparkleClass to apply animation only if sparkles have not been seen
  const sparkleClass =
    showSparkles && !localStorage.getItem(SPARKLES_SEEN_KEY)
      ? 'animate-sparkleFade' // Only animate sparkles on the first view
      : ''; // Static rendering for subsequent views

  return (
    <div className="relative inline-block">
      <span
        onClick={isVisible ? hideTooltip : showTooltip}
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
        aria-expanded={isVisible}
        aria-label="Tooltip with image"
        className={`${toolTipClass} font-black underline cursor-pointer`}
        style={{ color: skyColor }}
      >
        {skyColor}
        {showSparkles && (
          <>
            {/* Sparkles appear only when showSparkles is true */}
            <span
              className={`absolute top-[-12px] right-[-16px] ${sparkleClass}`}
            >
              ✨
            </span>
          </>
        )}
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
        className="fixed w-[80vw] h-[20vh] md:w-[60vw] md:h-[20vh] lg:w-[40vw] lg:h-[20vh] transition-all duration-500 mb-3 p-2 rounded-lg"
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
