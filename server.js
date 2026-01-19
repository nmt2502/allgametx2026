const express = require("express");
const app = express();

require("./sun")(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server By Bi Nhoi Chạy Tại, PORT);
});
