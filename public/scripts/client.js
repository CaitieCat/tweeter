/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */



$(document).ready(function() {
    const data = [
        {
          "user": {
            "name": "Newton",
            "avatars": "https://i.imgur.com/73hZDYK.png"
            ,
            "handle": "@SirIsaac"
          },
          "content": {
            "text": "If I have seen further it is by standing on the shoulders of giants"
          },
          "created_at": 1461116232227
        },
        {
          "user": {
            "name": "Descartes",
            "avatars": "https://i.imgur.com/nlhLi3I.png",
            "handle": "@rd" },
          "content": {
            "text": "Je pense , donc je suis"
          },
          "created_at": 1461113959088
        }
      ]
    
    const renderTweets = function(tweets) {
      // loops through tweets
      // calls createTweetElement for each tweet
      // takes return value and appends it to the tweets container
      for (const each of tweets){
      const tweetResults = createTweetElement(each);
      $("#tweet-container").append(tweetResults);
      }
    }
    
    const createTweetElement = function(tweetObj) {
      /* Your code for creating the tweet element */
      // ...
      console.log(tweetObj);
      const newTweet = `
        <article class="postedTweet">
        <header>
        <img src="${tweetObj.user.avatars}">
        ${tweetObj.user.name}
        ${tweetObj.user.handle}
        </header>
        ${tweetObj.content.text} <hr/>
        <footer> ${tweetObj.content.created_at} </footer>
        </article>
        `;
      return newTweet;
    };
    renderTweets(data);
    console.log("this is firing");
});