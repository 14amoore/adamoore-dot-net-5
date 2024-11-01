'use client';

import { useState, useEffect } from 'react';
import cloudCover from '@/utils/cloud-cover';
import StyledLink from '@/components/StyledLink';
import DisplayColorElement from '@/components/DisplayColorElement';
import { S3Data } from '@/utils/types';

export const dynamic = 'force-dynamic';

export default function Home() {
  const [weather, setWeather] = useState<S3Data | null>(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await fetch('/api/get-s3-data');
        const data = await response.json();
        setWeather(data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchWeatherData();
  }, []);

  if (!weather) {
    return null;
  }

  if (weather?.type === 'weather') {
    const { sky_color, current_temp, cloudcover_percentage, day_or_night } =
      weather;
    const clouds = cloudCover(cloudcover_percentage);

    return (
      <div className="flex flex-col gap-y-2">
        <h1 className="mb-2">Hi!</h1>
        <h2>My name is Adam Moore</h2>
        <p>
          I&apos;m a Software Engineer and Creative Technologist, with an MFA
          from Parsons School of Design.
        </p>
        <p>
          I&apos;m based in Brooklyn where it is currently {current_temp}{' '}
          degrees Fahrenheit, with {clouds} skies.
        </p>
        <DisplayColorElement isDay={day_or_night} color={sky_color} />
        <h3>
          If you&apos;d like to know more about how this app works please{' '}
          <StyledLink
            route={'/more-info'}
            linkType={'internal'}
            routeText={'click here'}
          />
          .
        </h3>
        <p>
          This is my portfolio website. It is, and most likely always will be, a
          work in progress.
        </p>
        <h3>
          Take a gander at{' '}
          <StyledLink
            route={'/music'}
            linkType={'internal'}
            routeText={'my top five Spotify artists'}
          />
          .
        </h3>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-y-2">
      <h1 className="mb-2">Hi!</h1>
      <h2>My name is Adam Moore</h2>
      <p>
        I&apos;m a Software Engineer and Creative Technologist, with an MFA from
        Parsons School of Design.
      </p>
      <p>I&apos;m based in Beautiful Brooklyn.</p>
      <p>
        This is my portfolio website. It is, and most likely always will be, a
        work in progress.
      </p>
      <h3>
        For now, take a gander at{' '}
        <StyledLink
          route={'/music'}
          linkType={'internal'}
          routeText={'my top five Spotify artists'}
        />
        .
      </h3>
    </div>
  );
}
