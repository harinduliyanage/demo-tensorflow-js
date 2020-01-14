//Install express server
const express = require('express');
const https = require('https');
const path = require('path');
const fs = require('fs');

const app = express();

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/demo-tensorflowjs'));

app.get('/*', function(req,res) {
  res.sendFile(path.join(__dirname+'/dist/demo-tensorflowjs/index.html'));
});
// ssl
var privateKey = fs.readFileSync( 'privatekey.pem' );
var certificate = fs.readFileSync( 'certificate.pem' );

https.createServer({
  key: privateKey,
  cert: certificate
}, app).listen(process.env.PORT || 8080);
// Start the app by listening on the default Heroku port
//app.listen(process.env.PORT || 8080);