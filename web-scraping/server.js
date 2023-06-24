const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio')
const PORT = 3000;

const app = express();

const URL = "https://search.rakuten.co.jp/search/mall/keyboard/";
const data = [];

axios(URL).then((response) => {
  const htmlParser = response.data;
  const $ = cheerio.load(htmlParser);

  $(".searchresultitem", htmlParser).each(function() {
    const title = $(this).find(".title-link--3Ho6z").text();
    const price = $(this).find(".price--OX_YW").text();
    data.push({title, price});
  });
}).catch((e) => console.log(e));

app.listen(PORT, () => {
  console.log('server running!')
});
