$(document).ready(function() {
  // --- our code goes here ---
  console.log("hi I'm not here!");
    
  $("#tweet-text").keyup(function() {
    const tweet = $(this).val();
    $(".counter").html(140 - tweet.length);
  });
});