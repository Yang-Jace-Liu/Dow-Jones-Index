/* Set up environment variables */
require("dotenv").config();

const app = require("../index");

app.listen(5000, () => {
  console.log("The server has been started");
});
