const express = require("express");
const mongoose = require("mongoose");

const config = require("./config.json");
const con = mongoose.connect(`mongodb://${config.db.host}:${config.db.port}/${config.db.name}`);

const { Guild } = require("./models");

const app = express();

app.use((req, res, next) => {
    res.set("Server", "Kat-Api");

    console.log("req", req.path);
    next();
})


app.get("/", (req, res) => {
    res.json({"msg": "hello world!"});
})

app.get("/guilds", async(req, res) => {
    
    let a = await Guild.find({});

    res.json(
        {
            data: a,
            msg: "guilds",
            error: null,
            status: 200
        }
        );
});

app.get("/guilds/:guildId", async(req, res) => {
    
    let a = await Guild.find({snowflake: req.params.guildId});

    res.json(
        {
            data: a,
            msg: "guild",
            error: null,
            status: 200
        }
        );
});

app.listen(9000, () => {
    console.log("running...");



});
