let express = require('express');
let { google } = require('googleapis');

let app = express();

let port = 8080;
let clientId="856126364713-7dvguacv8iq02928o6b6th6m4q6gf9h5.apps.googleusercontent.com";
let clientSecretKey="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";
let redirctUrl = "http://localhost:3000/oauth2callback";

// OAuth 2 client
let Auth_Client = new google.auth.OAuth2(clientId, clientSecretKey, redirctUrl);

let authorizationUrl = Auth_Client.generateAuthUrl({
  access_type: 'offline'
});

app.get('/', (req, res) => {
  res.redirect(authorizationUrl);
});

app.get('/oauth2callback', async (req, res) => {
  try {
    let { tokens } = await Auth_Client.getToken();
    res.send('Redirection successful');
  }catch (err) {
    res.send('Internal Server Error:', err);
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
