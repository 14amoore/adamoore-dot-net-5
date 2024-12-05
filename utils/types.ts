export interface WeatherData {
    type: 'weather';
    current_time: string;
    current_temp: number;
    day_or_night: boolean;
    cloudcover_percentage: number;
    nyc_skyline_url: string;
    sky_hex_color: string;
  }
  
  export interface SpotifyData {
    type: 'spotify';
    access_token: string;
    refresh_token: string;
  }
  
  export type S3Data = WeatherData | SpotifyData;
  