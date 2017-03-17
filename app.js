// http://maps.googleapis.com/maps/api/geocode/json?address=100088
// http://ditu.google.cn/maps/api/geocode/json?address=100088
// https://api.darksky.net/forecast/3214ffaae17c383e9657f7ac9ea74450/37.8267,-122.4233
//3214ffaae17c383e9657f7ac9ea74450
const yargs = require('yargs');
const geocode = require('./geocode/geocode');
const weather = require('./weather/weather.js');
const argv = yargs.options({
  a: {
    demand: true,
    alias: 'address',
    describe: 'This property will be used for fetching weather',
    string: true
  }
}).argv;

geocode.geocodeAddress(argv.address, (errorMessage, succeeding) => {
  if (errorMessage) {
    console.log(errorMessage);
  } else {
    console.log(`Address: ${succeeding.results[0].formatted_address}`);
    var geoInfo = {
      lat: succeeding.results[0].geometry.location.lat,
      lng: succeeding.results[0].geometry.location.lng
    };
    console.log(geoInfo.lat, geoInfo.lng);
    weather.getWeatherInfo(geoInfo, (errorMessage, succeeding) => {
      if (errorMessage) {
        console.log(errorMessage);
      } else {
        console.log(new Date(succeeding.currently.time).getFullYear());
        console.log(succeeding.currently.temperature);
      }
    })
  }
});
