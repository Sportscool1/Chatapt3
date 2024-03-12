<script>
  // Define the dictionary
  let dictionary = JSON.parse(localStorage.getItem("dictionary")) || {
    "hello": "Hi there!",
    "how are you": "I'm doing well, thank you for asking.",
    "goodbye": "Goodbye! Have a great day!",
    // Add more key-value pairs as needed
  };

  // Define a function to check for swear words
  function containsSwearWord(input) {
    // List of swear words
    const swearWords = ["swear1", "swear2", "swear3"]; // Add more swear words as needed
    for (let word of swearWords) {
      if (input.includes(word)) {
        return true;
      }
    }
    return false;
  }

  // Function to check if input is a mathematical expression and solve it
  function solveMath(input) {
    try {
      return math.evaluate(input);
    } catch (error) {
      return null;
    }
  }

  $(window).on("load", function () {
    $("#loader").fadeOut(100, function () {
      $("#preloader").fadeOut(200);
      $("body").removeClass("loading");
    });
  });

  $(document).ready(function ($) {
    // For Input Enter key
    $("#data").keyup(function (event) {
      if (event.keyCode === 13) {
        let value = $("#data").val().toLowerCase();
        // Check for swear words
        if (containsSwearWord(value)) {
          alert("Please refrain from using inappropriate language.");
          return;
        }
        let msg =
          '<div class="user-inbox inbox"><div class="wrap"><div class="icon"><img src="assets/img/x2.png" alt="" /></div><div class="msg-header"><p>' +
          value +
          "</p></div></div></div>";
        $(".form").append(msg);
        $("#data").val("");

        let replay;
        if (dictionary[value]) {
          replay =
            '<div class="bot-inbox inbox"><div class="wrap"><div class="icon"><img src="../assets/img/logo_100px.png" alt=""></div><div class="msg-header" id="chat-' +
            value +
            '"><p>' +
            dictionary[value] +
            "</p></div></div>";
        } else {
          const result = solveMath(value);
          if (result !== null) {
            replay =
              '<div class="bot-inbox inbox"><div class="wrap"><div class="icon"><img src="../assets/img/logo_100px.png" alt=""></div><div class="msg-header" id="chat-' +
              value +
              '"><p>' +
              result +
              "</p></div></div>";
          } else {
            replay =
              '<div class="bot-inbox inbox"><div class="wrap"><div class="icon"><img src="../assets/img/logo_100px.png" alt=""></div><div class="msg-header" id="chat-' +
              value +
              '"><p>I\'m sorry, I don\'t understand that. Would you like to provide a response?</p><input type="text" id="response-' +
              value +
              '" placeholder="Type your response here..." /><button type="button" class="save-response-btn" data-key="' +
              value +
             
