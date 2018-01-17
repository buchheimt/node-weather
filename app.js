const request = require('request');
const yargs = require('yargs');

const argv = yargs
  .options({
    a: {
      demand: true,
      alias: 'address',
      describe: 'Address to fetch weather for',
      string: true
    }
  })
  .help()
  .alias('help', 'h')
  .argv;

const encodedAddress = encodeURIComponent(argv.address);

request({
  url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
  json: true
}, (err, res, body) => {
  if (err) {
    console.log("Unable to connect to Google's servers");
  } else if (body.status === 'ZERO_RESULTS') {
    console.log('No results match that address');
  } else if (body.status === 'OK') {
    console.log(`Address: ${body.results[0].formatted_address}`);
    console.log(`LAT: ${body.results[0].geometry.location.lat}`);
    console.log(`LNG: ${body.results[0].geometry.location.lng}`);
  }
});