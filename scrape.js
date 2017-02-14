//type node scrape.js (or whatever this file is named).js in terminal or cmd prompt to start program
console.log('The bot is starting.');

/*
Dependency checking: this program requires that you have node.js installed,
and two node modules: 1) twit, and 2) fs --> npm install twit; npm instal fs.
*/
var Twit = require('twit');
var fs = require('fs');
//config.js should be in the same directory as this file, and should contain your twitter API keys
//Go to https://dev.twitter.com/  w/ a twitter account + phone no. to obtain your own API keys
var config = require('./config');
// console.log(config);

var T = new Twit(config);

//edit q to search for a phrase;
//edit count to specify how many tweets you want
var params = {
    q: 'javascript',
    count: 10
};

T.get('search/tweets', params, gotData);

function gotData(err, data, response) {
  var tweets = data.statuses;
  var justText = [];
  for (var i = 0; i < tweets.length; i++)
    justText[i] = tweets[i].text + ',' + tweets[i].coordinates;
  console.log(justText);

  fs.writeFile('testing.csv', JSON.stringify(justText, null, 4));
  console.log('tweets written to file');
}
