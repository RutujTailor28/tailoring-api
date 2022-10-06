const NodeGeoCoder = require('node-geocoder')

const options = {

    provider: "mapquest",
    httpAdapter: 'https',
    apiKey: "0Q17FaCplXIa00AIYJJSZHA0hkz7Tjwb",
    formatter:null
}
// console.log("options: ",options)

const geocoder = NodeGeoCoder(options);

module.exports = geocoder;