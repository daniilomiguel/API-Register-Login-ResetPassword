const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config();

const PORT = 5000;

mongoose.connect(process.env.MONGO_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log("Database connection Sucess.");
})
.catch((err) => {
    console.log("Mongo Connection Error", err);
});

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/ping", (req, res) => {
    return res.send({
        error: false,
        message: "server is healthy",
    });
});

app.use("/users", require("./routes/users"));

app.listen(PORT, () => {
    console.log("Server started listening on PORT : " + PORT);
});