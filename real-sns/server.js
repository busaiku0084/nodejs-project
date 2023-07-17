const express = require("express");
const userRoute = require("./routes/users");

const app = express();
const PORT = 3000;

// ミドルウェア
app.use("/api/users", userRoute);

app.get("/", (req, res) => {
  res.send("Hello Express!")
});

app.listen(PORT, () => {
  console.log("server running!");
});
