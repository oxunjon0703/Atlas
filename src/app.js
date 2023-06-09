require("dotenv/config");
const express = require('express');
const [Routes,atlas] = require("./routes");
const app = express();
const cookie = require("cookie-parser");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", process.cwd() + "/src/views");

app.use(cookie());
app.use(Routes);
app.use(atlas);

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
    console.log(PORT);
});