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
    const tweetContent = $(this).serialize();
    if (tweetContent.length > 145){
      $(".errorMessage").slideDown();
      event.stopPropagation();
    } else if (tweetContent === 'text=' || tweetContent === null ){
      $(".errorMessage").slideDown();
      event.stopPropagation();
    } else {
      $.post( "/tweets", tweetContent )
      .then (() => {
        $(".errorMessage").slideUp();
        $("#tweet-container").empty();
        loadTweets();
      });
    }
  });
});