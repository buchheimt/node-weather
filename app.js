const request = require('request');

request({
  url: 'https://maps.googleapis.com/maps/api/geocode/json?address=1750%20FM%20423%20Frisco',
  json: true
}, (err, res, body) => {
  console.log(`Address: ${body.results[0].formatted_address}`);
  console.log(`LAT: ${body.results[0].geometry.location.lat}`);
  console.log(`LNG: ${body.results[0].geometry.location.lng}`);
});