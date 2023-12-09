const express = require("express");
const mongoose = require("mongoose");

const config = require("../config.json");
const con = mongoose.connect(`mongodb://${config.db.host}:${config.db.port}/${config.db.name}`);

const app = express();

app.use("/", require("./routes/root"));
app.use("/guilds", require("./routes/guild"));

app.listen(9000, () => {
    console.log("running...");
});
