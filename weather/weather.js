const request = require('request');

const getWeather = (lat, long, callback) => {
  request({
    url: `https://api.darksky.net/forecast/${process.env.WEATHER_API_SECRET}/${lat},${long}`,
    json: true
  }, (err, res, body) => {
    if (err || res.statusCode !== 200) {
      callback('Unable to fetch weather');
    } else {
      callback(undefined, {
        temp: body.currently.temperature,
        feelsLike: body.currently.apparentTemperature
      });
    }
  });
}

module.exports.getWeather = getWeather;