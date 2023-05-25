const express = require("express");
const { engine } = require('express-handlebars');
const fileUpload = require('express-fileupload')
const app = express();
const mysql = require("mysql");

const PORT = 3000;

app.use(fileUpload());
app.use(express.static("upload"));

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

// connection pool
const pool = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "password",
  database: "image-uploader"
});

app.get("/", (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) {
      throw err;
    }
    console.log("Connect Mysql!");

    connection.query("SELECT * FROM image", (err, rows) => {
      connection.release();
      console.log(rows);
      if (!err) {
        res.render("home", {rows});
      }
    });
  });
});

app.post("/", (req, res) => {
  if (!req.files) {
    return res.status(400).send('failed to upload!')
  }

  let imageFile = req.files.imageFile
  let uploadPath = __dirname + "/upload/" + imageFile.name;

  // 画像ファイルの名前を追加して保存
  imageFile.mv(uploadPath, function(err) {
    if (err) {
      return res.status(500).send(err);
    }
  });

  pool.getConnection((err, connection) => {
    // Mysqlに保存
    connection.query(`INSERT INTO image (image_name) VALUES("${imageFile.name}")`, (err, rows) => {
      connection.release();
      if (!err) {
        res.redirect("/");
      } else {
        console.log(err);
      }
    });
  });
});

app.listen(PORT, () => {
  console.log("server running!");
});
