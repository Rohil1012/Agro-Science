const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const cookieParser = require("cookie-parser");
const { requireAuth, checkUSer } = require("./middleware/authMiddleware");
const { result } = require("lodash");
const Comment = require("./model/comment");
const Query = require("./model/Query");


const port = process.env.port || 3000;


const dbConnect = require("./database/db");
dbConnect();


const app = express();

// middleware for public folder
app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// view engine
app.set("view engine", "ejs");



// routes
const server = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

app.get("*", checkUSer);

//homepage
app.get("/", (req, res) => res.render("home"));

//comodity data page
app.get("/data", requireAuth, (req, res) => res.render("data"));

//agriculture videos
app.get("/video", (req, res) => res.render("video"));




//agriculure knowledge
app.get("/agriknowledge", (req, res) => res.render("agriknowledge"));
app.get("/akfruits", (req, res) => res.render("akfruits"));
app.get("/akgrains", (req, res) => res.render("akgrains"));
app.get("/akvegetables", (req, res) => res.render("akvegetables"));
app.get("/akflowers", (req, res) => res.render("akflowers"));
app.get("/akbeans", (req, res) => res.render("akbeans"));
app.get("/akoilseeds", (req, res) => res.render("akoilseeds"));

//Government Schemes
app.get("/map", requireAuth, (req, res) => res.render("map"));
//different states
app.get("/stgujarat", (req, res) => res.render("stgujarat"));
app.get("/strj", (req, res) => res.render("strj"));
app.get("/stmp", (req, res) => res.render("stmp"));
app.get("/stmh", (req, res) => res.render("stmh"));
app.get("/stmg", (req, res) => res.render("stmg"));
//loading
app.get("/loading", (req , res)=>res.render("loading"))
app.use(authRoutes);


app.get("/index", (req, res) => {
  Query.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("index", { queries: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post("/addquery", (req, res) => {
  const query = new Query(req.body);

  query
    .save()
    .then((result) => {
      res.redirect("/index");
    })
    .catch((err) => {
      console.log(err);
    });
});














app.post("/api/comments", (req, res) => {
  const comment = new Comment({
    username: req.body.username,
    comment: req.body.comment,
  });
  comment.save().then((response) => {
    res.send(response);
  });
});

app.get("/api/comments", (req, res) => {
  Comment.find().then(function (comments) {
    res.send(comments);
  });
});




let io = require("socket.io")(server);

io.on("connection", (socket) => {
  console.log(`New connection: ${socket.id}`);
  // Recieve event
  socket.on("comment", (data) => {
    data.time = Date();
    socket.broadcast.emit("comment", data);
  });

  socket.on("typing", (data) => {
    socket.broadcast.emit("typing", data);
  });
});



