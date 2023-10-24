import querystring from 'querystring';

export async function getToken(): Promise<string> {
    const client_id = '9505463e6d324e588e900c9a381c0bf8';
    const client_secret = '600905540e614f0aac143487f2593e0f';   
    const redirect_uri = 'http://localhost:3000/music';
    const post_url = `https://accounts.spotify.com/api/token`;
    
    const code = 'AQDSsCpmcnTu9sJt3x-flMvq7_tfJ5JbD_FtMfgmVqsrM3rurX49KnJ199rCTDFxDxm-3kh0SQSpOm3g0suwYvo2LqoXDtYRmAgi_q63kPqouQTq7FDmdDRJaeBVV3aBtWcxGZ4Injvw8xLxkVxFbKidlQwQmY2ybsjKQ8aHY80FFDoDKL8Xek1GF1ZBeA'
    
    const authString = `Basic ${Buffer.from(
        `${client_id}:${client_secret}`
      ).toString('base64')}`;

    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: authString,
      };

      const body = {
        code: code,
        redirect_uri: redirect_uri,
        grant_type: 'authorization_code',
      };

      const response = await fetch(post_url, {
        method: 'POST',
        body: querystring.stringify(body),
        headers: headers,
      });

      const result = await response.json();
      const access_token = result.access_token; 
      return access_token;
}