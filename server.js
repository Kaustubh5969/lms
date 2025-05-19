const express = require('express');
require('dotenv').config();
const db = require('./db');
const bodyParser = require('body-parser');
const app = express();
const UserRoute = require('./routes/UserRoute');
const StudentsRoute = require('./routes/StudentsRoute');
const BooksRoute = require('./routes/BooksRoute');
const TransactionsRoute = require('./routes/TransactionsRoute');
const cors = require('cors');

app.use(bodyParser.json());
app.use(cors());


const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log("Server is running on port", PORT);
})


app.use('/user', UserRoute);
app.use('/student', StudentsRoute);
app.use('/book', BooksRoute);
app.use('/transaction', TransactionsRoute);
const path = require("path");

app.use("/IMG", express.static(path.join(__dirname, "public/IMG")));




