require('dotenv').config();

const yargs = require('yargs');
const axios = require('axios');

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
const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;

axios.get(geocodeUrl)
  .then(res => {
    if (res.data.status === 'ZERO_RESULTS') {
      throw new Error("Unable to find that address");
    }

    const lat = res.data.results[0].geometry.location.lat;
    const long = res.data.results[0].geometry.location.lng;
    console.log(res.data.results[0].formatted_address);

    const weatherUrl = `https://api.darksky.net/forecast/${process.env.WEATHER_API_SECRET}/${lat},${long}`
    return axios.get(weatherUrl);
  }).then(res => {
    const temp = res.data.currently.temperature;
    const feelsLike = res.data.currently.apparentTemperature;

    console.log(`It's currently ${temp} F, but it feels like ${feelsLike} F`);
  }).catch(err => {
    if (err.code === 'ENOTFOUND') {
      console.log('Unable to connect to API servers');
    } else {
      console.log(err);
    }
  });