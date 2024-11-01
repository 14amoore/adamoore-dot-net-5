'use client';
import ToolTip from './ToolTip';

interface DisplayColorElementProps {
  isDay: boolean;
  color: string;
}

export default function DisplayColorElement({
  isDay,
  color,
}: DisplayColorElementProps) {
  if (isDay) {
    return (
      <div>
        The sky is pretty close to hex color <ToolTip skyColor={color} />.{' '}
      </div>
    );
  }
  return (
    <p>
      It&apos;s night right now. If you come back during the day you&apos;ll see
      the color of the sky here in NY as an approximate hex value.
    </p>
  );
}
