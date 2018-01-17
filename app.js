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

const address = encodeURIComponent(argv.address);

request({
  url: `https://maps.googleapis.com/maps/api/geocode/json?address=${address}`,
  json: true
}, (err, res, body) => {
  console.log(`Address: ${body.results[0].formatted_address}`);
  console.log(`LAT: ${body.results[0].geometry.location.lat}`);
  console.log(`LNG: ${body.results[0].geometry.location.lng}`);
});