let data;
var quote, author;
const projectName = "random-quote-generator";

const fetchQuotes = () => {
  return $.ajax({
    headers: {
      Accept: "application/json"
    },
    url:
      "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json",
    success: function (json) {
      data = JSON.parse(json);
      // console.log(data);
    }
  });
}

const randomQuotes = () => {
  return data.quotes[
    Math.floor(Math.random() * data.quotes.length)
  ];
}

const displayQuotes = () => {
  let random = randomQuotes();
  
  quote = random.quote;
  author = random.author;
  
  $("#tweet-quote").attr(
  "href",
  "twitter.com/intent/tweet");
  
  $("#text").text('"' + quote + '"');
  $("#author").text(author);
  
}

$(document).ready(function () {
  fetchQuotes().then(() => {
    displayQuotes();
  });

  $("#new-quote").on("click", displayQuotes);
});