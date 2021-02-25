/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png",
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
];
  
const renderTweets = function(tweets) {
  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
  for (const each of tweets) {
    const tweetResults = createTweetElement(each);
    $("#tweet-container").append(tweetResults);
  }
};
  
const createTweetElement = function(tweetObj) {
  /* Your code for creating the tweet element */
  // ...
  let timeStamp = new Date(tweetObj.created_at * 1000);
  timeStamp = timeStamp.getHours();
  const newTweet = `
      <article class="postedTweet">
      <header>
      <img src="${tweetObj.user.avatars}">
      ${tweetObj.user.name}
      ${tweetObj.user.handle}
      </header>
      ${tweetObj.content.text} <hr/>
      <footer> ${timeStamp}h ago </footer>
      </article>
      `;
  return newTweet;
};

const loadTweets = function(){
  $.ajax({
    url: "http://localhost:8080/tweets",
    method: "GET",
  })
  .done(function (data){
    console.log("Tweet found!");
    console.log(data);
  })
  .fail(function (){
    alert("Tweet not found!");
  })
};



$(document).ready(function() {
  loadTweets();
  renderTweets(data);
  console.log("this is firing");
  
  
  $("#submit").on("submit", function(event) { 
    // prevent the default behavior of the form submission
    event.preventDefault();
    console.log('Submit form');
    const tweetContent = $(this).serialize();
  
  $.ajax({
        url: "http://localhost:8080/tweets",
        method: "POST",
    })
    .done(function () {
      console.log(tweetContent);
      console.log(typeof tweetContent)
      console.log("Here's your tweet!!");
    })
    .fail(function () {
      alert("Could not post tweet!");
    })
  });

});