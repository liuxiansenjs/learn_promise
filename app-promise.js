const yargs = require('yargs');
const request = require('request');

const argv = yargs.options({
  a: {
    demand: true,
    alias: 'address',
    describe: 'This property will be used for fetching weather',
    string: true
  }
}).argv;

var getGeoInfo = (address) => {
  return new Promise((resolved, rejected) => {
    var encodedAddress = encodeURIComponent(address);
    request({
      url: `http://ditu.google.cn/maps/api/geocode/json?address=${encodedAddress}`,
      json: true
    }, (error,response, body) => {
      if (error) {
        rejected('Unable to connect to Google servers.');
      } else {
        try {
          resolved(body);
        } catch(e) {
          rejected('Unable to find the result');
        }
      }
    })
  })
}

var getWeatherInfo = (geoInfo) => {
  return new Promise((resolved, rejected) => {
    var queryStr = {
      lat: encodeURIComponent(geoInfo.lat),
      lng: encodeURIComponent(geoInfo.lng)
    }
    request({
      url: `https://api.darksky.net/forecast/3214ffaae17c383e9657f7ac9ea74450/${queryStr.lat},${queryStr.lng}`,
      json: true
    }, (error, response, body) => {
      if (error) {
        rejected('Unable to connect to servers.');
      } else {
        try {
          resolved(body)
        } catch(e) {
          rejected('Unable to find result');
        }
      }
    })
  })
}

getGeoInfo(argv.address).then((response) => {
  var geoInfo = {
    lat: response.results[0].geometry.location.lat,
    lng: response.results[0].geometry.location.lng
  };
  console.log(geoInfo.lat, geoInfo.lng);
  return getWeatherInfo(geoInfo)
}, (message) => {
  console.log(message);
}).then((res) => {
  console.log(new Date(res.currently.time).getFullYear());
  console.log(res.currently.temperature);
}, (msg) => {
  console.log(msg);
});

// getWeatherInfo({
//   lat: 37,
//   lng: 116
// }).then((res) => {
//   console.log(res);
// }, (msg) => {
//   console.log(msg);
// })
