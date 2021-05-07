
function dbConnect() {
  // Db connection
  const mongoose = require("mongoose");
  const url = "mongodb://localhost:27017/agroScience";

  mongoose.connect(url, {
    // userNewUrlParser: true,
    useUnifiedTopology: true,
      useFindAndModify: true,
    useNewUrlParser:true,
  });

  const connection = mongoose.connection;
  connection
    .once("open", function () {
      console.log("Database connected");
    })
    .catch(function (err) {
      console.log("Connection failed");
    });
}

module.exports = dbConnect;