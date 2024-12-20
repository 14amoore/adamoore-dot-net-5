'use client';

import { useState, useEffect } from 'react';
import cloudCover from '@/utils/cloud-cover';
import tempColors from '@/utils/temp-color';
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
    const {
      current_temp,
      cloudcover_percentage,
      day_or_night,
      nyc_skyline_url,
      sky_hex_color,
    } = weather;
    const clouds = cloudCover(cloudcover_percentage);
    const tempColor = tempColors(current_temp);

    return (
      <div className="flex flex-col gap-y-2">
        <h1 className="mb-2">Hi!</h1>
        <h2>My name is Adam Moore</h2>
        <p>
          I&apos;m a Software Engineer and Creative Technologist, with an MFA
          from Parsons School of Design.
        </p>
        <p>
          <span>I&apos;m based in Brooklyn where it is currently</span>
          <span className="font-black" style={{ color: tempColor }}>
            {' '}
            {current_temp} degrees
          </span>
          <span> Fahrenheit, with</span>
          <span className="font-black" style={{ color: clouds[1] }}>
            {' '}
            {clouds[0]} skies
          </span>
          <span>.</span>
        </p>
        <DisplayColorElement
          isDay={day_or_night}
          color={sky_hex_color}
          imageUrl={nyc_skyline_url}
        />
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
