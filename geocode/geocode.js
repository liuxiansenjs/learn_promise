const request = require('request');

var geocodeAddress = (address, callback) => {
  var encodedAddress = encodeURIComponent(address);
  request({
    url: `http://ditu.google.cn/maps/api/geocode/json?address=${encodedAddress}`,
    json: true
  }, (error,response, body) => {
    if (error) {
      callback('Unable to connect to Google servers.', undefined);
    } else {
      try {
        callback(undefined, body);
      } catch(e) {
        callback('Unable to find the result', undefined);
      }
    }
  })
};

module.exports = {
  geocodeAddress
}
