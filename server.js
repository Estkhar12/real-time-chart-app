const express = require("express");
const app = express();

app.use(express.static("public"));

//Db connection

const dbConnection = require("./db");

dbConnection();

const Comment = require("./models/connection");

app.use(express.json());

//Routes
app.post("/api/comments", (req, res) => {
  const comment = new Comment({
    username: req.body.username,
    comment: req.body.comment,
  });
  comment
    .save()
    .then((response) => {
      res.send(response);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/api/comments", (req, res) => {
  Comment.find().then((comments) => {
    res.send(comments);
  });
});

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log(`listing on port ${port}`);
});

const io = require("socket.io")(server);

io.on("connection", (socket) => {
  console.log(`New connection: ${socket.id}`);

  //Receive event
  socket.on("comment", (data) => {
    data.time = Date();
    socket.broadcast.emit("comment", data);
  });
  socket.on("typing", (data) => {
    socket.broadcast.emit("typing", data);
  });
});
