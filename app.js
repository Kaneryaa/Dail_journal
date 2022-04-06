const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");
// const foodRouter = require("./routes/foodRoutes.js");

const app = express();

app.use(express.json());
mongoose.connect("mongodb://127.0.0.1:27017/item")
     // .connect("mongodb://127.0.0.1:27017")

     .then(() => {
       console.log("Connected to Database");
     })
     .catch((err) => {
       console.log("Not Connected to Database ERROR! ", err);
     });

// mongoose.connect('mongodb://localhost:27017/StationaryDB', {useNewUrlParser: true}, (err) => {
// if (!err) {
// console.log('Successfully Established Connection with MongoDB')
// }
// else {
// console.log('Failed to Establish Connection with MongoDB with Error: '+ err)
// }
// });

const productsSchema = new mongoose.Schema({
    ProductId: Number,
    ProductName: String,
    Categoryame: String,
    Categorid: Number,
});

// const Product = new mongoose.model("Product");

// mongoose.connect(
//   "mongodb+srv://madmin:<password>@clustername.mongodb.net/<dbname>?retryWrites=true&w=majority",
//   {
//     useNewUrlParser: true,
//     useFindAndModify: false,
//     useUnifiedTopology: true
//   }
// );

//app.use(foodRouter);

const homeStartingContent = " ";
const aboutContent = "I'm Danish Shaikh";
const contactContent = "";

//const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let posts = [];

app.get("/", function(req, res){
  res.render("home", {
    startingContent: homeStartingContent,
    posts: posts
    });
});

app.get("/about", function(req, res){
  res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", function(req, res){
  res.render("contact", {contactContent: contactContent});
});

app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res){
  const post = {
    title: req.body.postTitle,
    content: req.body.postBody
  };

  posts.push(post);

  res.redirect("/");

});

app.get("/posts/:postName", function(req, res){
  const requestedTitle = _.lowerCase(req.params.postName);

  posts.forEach(function(post){
    const storedTitle = _.lowerCase(post.title);

    if (storedTitle === requestedTitle) {
      res.render("post", {
        title: post.title,
        content: post.content
      });
    }
  });

});

app.listen(4000, function() {
  console.log("Server started on port 3000");
});
