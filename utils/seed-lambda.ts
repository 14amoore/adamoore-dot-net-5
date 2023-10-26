const querystring = require('querystring');
const fs = require('fs')

async function getToken() {
  // to run get id and secret from .env file
    const client_id = '';
    const client_secret = '';   
    const redirect_uri = 'http://localhost:3000/music';
    const post_url = `https://accounts.spotify.com/api/token`;
    
    const code = 'AQDlJeelTWpqiCD2z2AGpahOLtjLkB-vfcLlR4-3VKf1DyFmy_Cd5yp94y8XeKua4XljqarcyZlNcsXtM1iT7sYT7HM8N5CbtRWUcw3HMz3qzOnnFrIwxosJt0-9fQpUA00eRPtV3CUuNdFTZlZ7u9cryRL6_TOFmpHHdDMU11e5qB1P8kueYmr7Tp7ASQ'
    
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
      
      console.log(result);
      
      return result;
}

 async function writeData() {
    const tokens = await getToken();
    const jsonString = JSON.stringify(tokens);
    fs.writeFile('tokens.json', jsonString, 'utf8', (err: any) => {
        if(err) {
            console.error('Error writing to file:', err);
        } else {
            console.log('Data written to tokens.json');
            
        }
    })
 }
 
 
writeData()