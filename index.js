var req = require('request');
var scheduler = require('node-schedule');
const http = require("http");

var cur = 65;
var apiKey = '123';
function getData() {
    req('http://data.fixer.io/api/latest?access_key=' + apiKey + '&symbols=USD,RUB', function (error, response, body) {
    if(!error) {
        try{
            var data = JSON.parse(body).rates;
            cur = getUSDCourse(data);
        } catch(e) {
            console.log(e);
        }
    }
  });
}

function getUSDCourse(rates) {
    return rates.RUB/rates.USD;
}

scheduler.scheduleJob('0 36 17 * * *', getData);

http.createServer(function(request, response){
    console.log(request.headers.referer);
    response.end(cur.toString());
}).listen(3000);
