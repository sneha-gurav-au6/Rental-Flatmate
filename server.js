var express = require("express");
var PORT = process.env.PORT || 5000;
require("./db");

const userRutes = require("./Routes/userRoutes");

var app = express();
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));

app.get("/", (req, res) => {
    res.send("hello");
});

app.use(userRutes);
app.listen(PORT, () => {
    console.log("server started");
});