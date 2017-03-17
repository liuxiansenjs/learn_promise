const request = require('request');

var getWeatherInfo = (geoInfo, callback) => {
  var queryStr = {
    lat: encodeURIComponent(geoInfo.lat),
    lng: encodeURIComponent(geoInfo.lng)
  }
  request({
    url: `https://api.darksky.net/forecast/3214ffaae17c383e9657f7ac9ea74450/${queryStr.lat},${queryStr.lng}`,
    json: true
  }, (error, response, body) => {
    if (error) {
      callback('Unable to connect to servers.', undefined);
    } else {
      try {
        callback(undefined, body);
      } catch(e) {
        callback('Unable to find result', undefined);
      }
    }
  })
}

module.exports = {
  getWeatherInfo
}
