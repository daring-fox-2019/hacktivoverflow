require('dotenv').config();
const express = require("express");
const app = express();
const cors = require('cors');

const mongoose = require('mongoose');
mongoose.connect(process.env.DB_URL, {useNewUrlParser: true});
// mongoose.connect('mongodb://localhost/overflow', {useNewUrlParser: true});

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/", require("./routes"));

const PORT = 3000;
app.listen(PORT, () => { console.log("Server started on port: " + PORT) });