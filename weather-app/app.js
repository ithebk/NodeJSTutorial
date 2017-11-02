const request = require ('request');
const yargs = require('yargs');

const argv = yargs
            .options({
              a:{
                demand :true,
                alias :'address',
                describe :'Address to fetch weather for',
                string:true
              }
            })
            .help()
            .alias('help','h')
            .argv;
var address = argv.address;
console.log(`Address requested: ${address}`);

request({
  url :`http://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}`,
  json:true
}, (error, response, body) => {
  if(error){
    console.log('Unable to connect to server');
  }
  else if(body.status ==='ZERO_RESULTS'){
    console.log('Unable to find that address');
  }
  else if(body.status ==='OK'){
  console.log(`Address: ${body.results[0].formatted_address}`);
  console.log(`Latitude: ${body.results[0].geometry.location.lat}`);
  console.log(`Longitude: ${body.results[0].geometry.location.lng}`);
  }

});