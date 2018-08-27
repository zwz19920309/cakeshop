var request = require('request');

let api = {};
// Set the headers
var headers = {
  'User-Agent': 'Super Agent/0.0.1',
  'Content-Type': 'application/json'
};

api.http = function (options) {
  return new Promise((resolve, reject) => {
    // Start the request
    request(options, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        // Print out the response body
        // console.log(body)
        resolve(body);
      } else {
        reject(error);
      }
    });
  });
};

api.sendRequest = function (url, data) {
  // Configure the request
  var options = {
    url: url,
    method: 'POST',
    headers: headers,
    json: true,
    body: data
  };
  return new Promise((resolve, reject) => {
    // Start the request
    request(options, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        // Print out the response body
        // console.log(body)
        resolve(body);
      } else {
        reject(error);
      }
    });
  });
};

module.exports = api;
