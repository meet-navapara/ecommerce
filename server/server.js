const express = require("express")
const app = express()
const cors = require("cors")
require("dotenv").config()
const connectDB = require("./config/db")
const path = require('path'); // Make sure this line is at the top with other requires
const PORT = process.env.PORT || 5000

// middlewares
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(express.static("public"));

// connect to the mongodb database
/* connectDB() */

app.use('/api/items', require("./routes/items"))
app.use('/api/payment', cors(), require("./routes/payment"))



// Serve frontend in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder for the React build
  app.use(express.static(path.join(__dirname, '../client/build')));

  // Any requests that are not API routes should be redirected to the React app
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client', 'build', 'index.html'));
  });
}

app.listen(PORT, console.log("Server is running on port ", PORT))