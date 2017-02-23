console.log('The bot is starting.');

/*
Dependency checking: this program requires that you have node.js installed,
and two node modules: 1) twit, and 2) fs --> npm install twit; npm instal fs.
*/
const Twit = require('twit');
const fs = require('fs');

// config.js should be in the same directory as this file, and should contain your twitter API keys
// Go to https://dev.twitter.com/  w/ a twitter account + phone no. to obtain your own API keys

const config = require('./config');

// console.log(config);

const T = new Twit(config);

// edit q to search for a phrase;
// edit count to specify how many tweets you want

const params = {
  q: 'trump',
  count: 20,
};

T.get('search/tweets', params, gotData);

function gotData(err, data, response) {
  const tweets = data.statuses;
  const justText = [];
  for (let i = 0; i < tweets.length; i++) { justText[i] = `${tweets[i].text},${tweets[i].coordinates}`; }
  console.log(justText);

  //  const justText = tweets.map(e => `${e.text},${e.coordinates}`)
  // var justText = tweets.map(function(e) { return e.text + ',' + e.coordinates; })

  fs.writeFile('testing.csv', JSON.stringify(justText, null, 4));
  console.log('tweets written to file');
}
