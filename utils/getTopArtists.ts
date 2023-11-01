export const getTopArtists = async(token:string) => {
    const top_artists_url =
  'https://api.spotify.com/v1/me/top/artists?time_range=short_term&limit=5';
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
  
    const response = await fetch(top_artists_url, { headers: headers });
    
    
    
    const artists = await response.json();
   
    
    return artists;
}