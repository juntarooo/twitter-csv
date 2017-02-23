// try this app using some hard coded tweets...
function search() {
  const arr = [
    { text: 'Tweet 1', author: 'Johnny', date: '2017-02-18' },
    { text: 'Tweet 2', author: 'Utah', date: '2017-02-17' },
    { text: 'Tweet 3', author: 'Jun', date: '2017-02-16' },
    { text: 'Tweet 4', author: 'Taro', date: '2017-02-15' },
  ];

  displayTweets(arr);
}

function displayTweets(tweets) {
  let newListItem;
  const tweetsList = document.getElementById('tweetsList');

  for (i = 0; i < tweets.length; ++i) {
    const tweet = tweets[i];
    textNode = document.createTextNode(`${tweet.text} by ${tweet.author} on ${tweet.date}`);

    // Create the new list item
    newListItem = document.createElement('li');
    newListItem.appendChild(textNode);

    // Append the new list item to the existing list
    tweetsList.appendChild(newListItem);
  }
}

function test() {
  console.log('The bot is starting.');

  /*
  Dependency checking: this program requires that you have node.js installed,
  and two node modules: 1) twit, and 2) fs --> npm install twit; npm instal fs.
  */
  const Twit = require('twit');

  // api-keys.js should be in the same directory as this file, and should contain your twitter API keys
  // Go to https://dev.twitter.com/  w/ a twitter account + phone no. to obtain your own API keys

  const config = require('./api-keys');

  // console.log(config);

  const T = new Twit(config);

  // edit q to search for a phrase;
  // edit count to specify how many tweets you want

  const params = {
    q: document.getElementById('query').value,
    count: document.getElementById('count').value,
  };

  T.get('search/tweets', params, gotData);
}

function gotData(err, data, response) {
  debugger;
  const tweets = data.statuses;
  const justText = [];
  for (let i = 0; i < tweets.length; i++) {
    justText[i] = `${tweets[i].text},${tweets[i].coordinates}`;
  }
  console.log(justText);

  //  const justText = tweets.map(e => `${e.text},${e.coordinates}`)
  // var justText = tweets.map(function(e) { return e.text + ',' + e.coordinates; })

  // fs.writeFile('testing.csv', JSON.stringify(justText, null, 4));
  displayTweets(justText);
  console.log('tweets written to file');
}

window.onload = function () {
  document.getElementById('search').addEventListener('click', test);
};
