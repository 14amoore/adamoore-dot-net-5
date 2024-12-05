import StyledLink from '@/components/StyledLink';

export default function MoreInfo() {
  return (
    <section className="flex flex-col gap-y-2">
      <h1>Feeling a bit curious?</h1>
      <h2>Weather Data:</h2>
      <p>
        To get the data regarding the weather I&apos;m using the API provided by{' '}
        <StyledLink
          route={'https://open-meteo.com'}
          linkType={'external'}
          routeText={'Open-meteo'}
        />
        .
      </p>
      <h2>Sky Color and Skyline Photo:</h2>
      <p>
        I am currently scraping{' '}
        <StyledLink
          route={'https://nskyc.com/'}
          linkType={'external'}
          routeText={'NSKYC'}
        />{' '}
        to get the approximate color of the sky as well as the picture of the
        skyline.
      </p>
      <p>
        For about a month I was scraping a camera that provided an image taken
        from Rosevelt Island. I was then processing the image myself using sharp
        to get the approximate HEX color code. As of now NSKYC is up and running
        again! Truth be told I prefer the image of lower Manhattan. One possible
        next step for this project is to setup some monitoring so that I will be
        notified when NSKYC is down.
      </p>
      <h2>Data Handling and Storage:</h2>
      <p>
        Open-meteo is queried and a new image loaded every hour. This is all
        handled by an AWS Lambda function. The data returned by the Lambda
        function is then stored in an AWS S3 bucket for easy access.
      </p>
      <h2>Spotify Integration:</h2>
      <p>
        The data from{' '}
        <StyledLink
          route={'https://www.spotify.com'}
          linkType={'external'}
          routeText={'Spotify'}
        />{' '}
        is handled in a similar fashion. I use a Lambda function to refresh the
        token that allows me to access Spotify&apos;s API. The token expires
        every hour. The new token is stored in another S3 bucket. The app uses
        the token to query Spotify&apos;s API and retrieves my top five artists.
      </p>
      <h2>Tech Used:</h2>
      <p>
        This app is built using{' '}
        <StyledLink
          route={'https://nextjs.org/'}
          linkType={'external'}
          routeText={'Next.js'}
        />
        ,{' '}
        <StyledLink
          route={'https://www.typescriptlang.org/'}
          linkType={'external'}
          routeText={'Typescript'}
        />
        , and{' '}
        <StyledLink
          route={'https://tailwindcss.com/'}
          linkType={'external'}
          routeText={'Tailwind CSS'}
        />
        .
      </p>
      <p>
        The app itself is hosted by{' '}
        <StyledLink
          route={'https://vercel.com/'}
          linkType={'external'}
          routeText={'Vercel'}
        />
        .
      </p>
      <StyledLink route={'/'} linkType={'Back'} routeText={'<-- Back'} />
    </section>
  );
}
