var twitterAPI = require('twitter');
import _ from 'lodash';

var twitter = new twitterAPI({
  consumer_key: 'syrkIXRaJ4vx2eKGatihkD7cl',
  consumer_secret: 'DayPwyKgGlssmaIsoU4Ur2H996zkqhoIGlS7BOfh48JAUsiXOO',
  access_token_key: '18587521-WFW5L8gklunEh2mvQro0LG94OFBd5DDMwhdXocDBQ',
  access_token_secret: '7E5b3HKXTmhGIt4kZr1rnWEaChbYAqs2CZFZccUNljgvm'
});

export const getUser      = (screen_name)       => returnPromise('users/show', { screen_name: screen_name}, 'location');
export const getTweets    = (user_id, count)    => returnPromise('statuses/user_timeline', { user_id, count });
export const getTweet     = (id)                => returnPromise('statuses/show', { id });
export const getRetweets  = (id, count)         => returnPromise('statuses/retweets', { id, count });
export const searchTweets = (queryParams)       => returnPromise("search/tweets", Object.assign({result_type: 'recent'}, queryParams), 'statuses');


const returnPromise = (endpoint, parameters, resultPath = null) => {
  return new Promise((resolve, reject) => {
    twitter.get(
      endpoint,
      parameters,
      (error, result) => {
        if (error) {
          reject(error);
        }
        else {
          resolve( resultPath !== null ? _.get(result, resultPath) : result );
        }
      }
    )
  });
};
