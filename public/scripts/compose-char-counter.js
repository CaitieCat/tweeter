$(document).ready(function() {
  // --- our code goes here ---
    
  $("#tweet-text").keyup(function() {
    const tweet = $(this).val();
    $(".counter").html(140 - tweet.length);
    console.log(tweet.length);
   
    //checks to see where the counter is and changes the color relative to limits
    if (tweet.length > 140) {
      $(".counter").css("color", "red");
    } else if (tweet.length <= 140) {
      $(".counter").css("color", "#545149");
    }
  });
});