$(document).ready(function() {
  // --- our code goes here ---
  console.log("hi I'm not here!");
    
  $("#tweet-text").keyup(function() {
    const tweet = $(this).val();
    $(".counter").html(140 - tweet.length);
  });

  $("#tweet-text").change(function(event) {
    event.preventDefault();
    console.log("default prevented!");
    const enter = $(this).serialize();
    console.log(enter);
  });
});