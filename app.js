// const yargs = require('yargs');
// const geocode = require('./geocode/geocode');

// const argv = yargs
//   .options({
//     a: {
//       demand: true,
//       alias: 'address',
//       describe: 'Address to fetch weather for',
//       string: true
//     }
//   })
//   .help()
//   .alias('help', 'h')
//   .argv;

// geocode.geocodeAddress(argv.address, (err, results) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(JSON.stringify(results, undefined, 2));
//   }
// });

const request = require('request');

request({
  url: `https://api.darksky.net/forecast/API_SECRET/33.1506744,-96.82361159999999`,
  json: true
}, (err, res, body) => {
  if (err || res.statusCode !== 200) {
    console.log('Unable to fetch weather');
  } else {
    console.log(body.currently.temperature);
  }
});

