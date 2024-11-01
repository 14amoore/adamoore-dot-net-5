'use client';

import { useState, useEffect } from 'react';
import StyledLink from '@/components/StyledLink';

interface TopArtist {
  id: string;
  name: string;
  uri: string;
}

export const dynamic = 'force-dynamic';

export default function Spotify() {
  const [topArtists, setTopArtists] = useState<TopArtist[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTopArtists = async () => {
      try {
        const response = await fetch('/api/get-top-artists');
        if (!response.ok) {
          throw new Error('Failed to fetch top artists');
        }

        const artists = await response.json();
        setTopArtists(artists);
      } catch (err) {
        console.error('Error fetching top artists:', err);
        setError('Failed to load top artists');
      }
    };

    fetchTopArtists();
  }, []);

  if (error) {
    return <section>{error}</section>;
  }

  if (!topArtists) {
    return <section>Loading...</section>;
  }

  const topArtistItems = topArtists.map((artist) => (
    <li className="mb-1" key={artist.id}>
      <StyledLink
        route={artist.uri}
        linkType={'external'}
        routeText={artist.name}
      />
    </li>
  ));

  return (
    <section className="z-10 max-w-5xl w-full font-mono text-lg">
      <h1 className="mb-3">These are my top five Spotify artists:</h1>
      <ul>{topArtistItems}</ul>
      <StyledLink route={'/'} linkType={'Back'} routeText={'<-- Back'} />
    </section>
  );
}
