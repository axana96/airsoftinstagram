// zoals steeds "requiren" wat je wil gebruiken
var express = require("express");
var path = require("path");

app.set('port', (process.env.PORT || 5000));
app.listen(app.get('port'), function() { });

// Daarna een Express app maken
var app = express();
const instagramPosts = require('instagram-posts');
// een datafile requiren
var dataFile = require('./data/data.json');

// Express vertellen dat je views zich in een folder views bevinden
app.set("views", path.resolve(__dirname, "views"));

// Express vertellen dat je de EJS templating gaat gebruiken
// We moeten ejs ook installeren. Je doet dit via npm install ejs --save
app.set("view engine", "ejs");

app.get('/', function(req, res) {
  res.render("index", {
    post: dataFile.blogposts
  });
});

app.get("/blog/:postid", function(req, res) {
  var blogpost = dataFile.blogposts[req.params.postid];
    res.render("blog", {
        post: blogpost
    });
});

app.get('/instagram', function(req, res) {
  instagramPosts('rebelaxa').then(afbeeldingen => {
console.log(afbeeldingen);
      res.render("instagram", {
        afbeeldingen: afbeeldingen
      });
  });
});


// https://expressjs.com/en/starter/static-files.html
// Om statische bestanden zoals afbeeldingen, css&js-bestanden te kunnen weergeven gebruiken we de ingebouwde middleware functie express.static
app.use(express.static('public'))

// de server starten op poort 3000
app.listen(3000);
