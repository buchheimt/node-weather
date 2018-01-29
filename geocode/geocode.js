const request = require('request');

const geocodeAddress = (address, callback) => {
  const encodedAddress = encodeURIComponent(address);
  
  request({
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
    json: true
  }, (err, res, body) => {
    if (err) {
      callback("Unable to connect to Google's servers");
    } else if (body.status === 'ZERO_RESULTS') {
      callback('No results match that address');
    } else if (body.status === 'OK') {
      callback(undefined, {
        address: body.results[0].formatted_address,
        lat: body.results[0].geometry.location.lat,
        long: body.results[0].geometry.location.lng
      });
    }
  });
}

module.exports.geocodeAddress = geocodeAddress;