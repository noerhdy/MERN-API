const express = require("express");

const app = express();

app.use(() => {
  console.log("hello server...");
  console.log("hello server22...");
});

app.listen(4000);
