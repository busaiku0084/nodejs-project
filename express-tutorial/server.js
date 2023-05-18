const express = require("express");
const app = express();
const userRouter = require("./routes/user");

const PORT = 3000;

// app.use(mylogger);
// app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  // console.log("Hello express!");
  // res.send("こんにちは！");
  // res.sendStatus(500).send("エラーです!");
  // res.sendStatus(500).json({msg: "エラーです!"});
  res.render("index", {text: "NodejsとExpress"});
});

// ルーティング
app.use("/user", userRouter);
// app.use("/auth", authRouter);
// app.use("/customer", customerRouter);

// ミドルウェア
// function mylogger(req, res, next) {
//   console.log(req.originalUrl);
//   next();
// }

// 起動
app.listen(PORT, () => {
  console.log("server running!");
});
