const mongoose = require("mongoose");

const app = require("./app");

const DB_HOST =
  "mongodb+srv://Lupushor:L123456@cluster0.wx2sxml.mongodb.net/db-contacts?retryWrites=true&w=majority";

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(3000, () => {
      console.log("Database connection successful");
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
