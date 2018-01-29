require('dotenv').config();

const yargs = require('yargs');
const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

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

geocode.geocodeAddress(argv.address, (geoErr, geoRes) => {
  if (geoErr) {
    console.log(geoErr);
  } else {
    weather.getWeather(geoRes.lat, geoRes.long, (weatherErr, weatherRes) => {
      if (weatherErr) {
        console.log(weatherErr);
      } else {
        console.log(`Right now in ${geoRes.address} it is ${weatherRes.temp} F, but it feels like ${weatherRes.feelsLike} F`);
      }
    });
  }
});