/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {
  
const renderTweets = function(tweets) {
  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
  for (const each of tweets) {
    const tweetResults = createTweetElement(each);
    $("#tweet-container").prepend(tweetResults);
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
      <div class="name">${tweetObj.user.name}</div>
      <div class="handle">${tweetObj.user.handle}</div>
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
    renderTweets(data);
    console.log("Tweet found!");
    console.log(data);
  })
  .fail(function (){
    alert("Tweet not found!");
  })
};




  loadTweets();
  console.log("this is firing");
  
  
  $("#submit").on("submit", function(event) { 
    // prevent the default behavior of the form submission
    event.preventDefault();
    console.log('Submit form');
    const tweetContent = $(this).serialize();
    console.log(tweetContent);
    console.log(tweetContent.text);
    if (tweetContent.length > 145){
      alert("Tweet is too long!");
      event.stopPropagation();
    } else if (tweetContent === 'text=' || tweetContent === null ){
      alert("Please enter a tweet before submitting");
      event.stopPropagation();
    } else {
      $.post( "/tweets", tweetContent )
      .then(console.log(tweetContent))
      .then (() => {
        console.log("hello");
        $("#tweet-container").empty();
        loadTweets();
      });
      /*$.ajax({
        url: "/tweets",
        method: "POST",
      })
      .done(function () {
        console.log(tweetContent);
        console.log(typeof tweetContent)
        console.log("Here's your tweet!!");
      })
      .fail(function () {
        alert("Could not post tweet!");
      })*/
    }
  });
});