const express = require("express");
const app = express();
const PORT = 3000;
const stripe = require('stripe')('sk_test_51NCTRNHKb8W5LxfzPv96pyBudA4oLYaOEFpqsTyfhZjL157Gixb3SCcqfq4jbolIZS3Jo8qiOQ8hFgAmyw2rQBiw007pqd2gQw');


app.use(express.static("public"));

app.post("/create-checkout-session", async (req, res) => {
  try {
    const prices = await stripe.prices.list();
    // console.log(prices);
    const session = await stripe.checkout.sessions.create({
      
    });

  } catch (err) {
    console.log(err);
  }
});

app.listen(PORT, () => {
  console.log('Running on port 3000!');
});
