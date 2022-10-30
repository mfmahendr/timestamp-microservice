const dotenv = require('dotenv');
dotenv.config({ path: './.env' });

// index.js
// where your node app starts

// init project
const express = require('express');
const app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
const cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// API ROUTING
app.get("/api/:date?", (req, res) => {
  
  const date_string = req.params.date || null;
  
  let date;
  
  if (date_string == null) {
    date = new Date();                      // Handle empty date parameter (current time)
  } else if (/[^0-9]/.test(date_string)) {
    date = new Date(date_string);           // Handle mm-dd-yyyy or yyyy-mm-dd date
  } else if (!/[^0-9]/.test(date_string)){
    date = new Date(parseInt(date_string)); // Handle date in miliseconds (unix format)
  }
  
  if (date == "Invalid Date"){
    res.status(400).json({ error: "Invalid Date" });
  } else {
    const response = {
      unix: date.getTime(),
      utc: date.toUTCString() 
    }
    res.json(response);
  }
})

// listen for requests
const listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});