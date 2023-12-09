const express = require("express");
const router = express.Router();

const { Guild } = require("../models");


router.get("/", async(req, res) => {
    
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

router.get("/:guildId", async(req, res) => {
    
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

module.exports = router;