const express = require("express");
const router = express.Router();

const { Guild } = require("../models");

router.use(require("./middleware/auth"));

router.get("/", async(req, res) => {
    
    let a = await Guild.find({});

    res.json(
        {
            data: a,
            msg: "guilds"
        }
        );
});

router.get("/:guildId", async(req, res) => {
    
    let a = await Guild.find({snowflake: req.params.guildId});
    if (a.length)
    {
        return res.json(
            {
                data: a,
                msg: "guild"
            }
        );
    }

    return res.status(404).json({
        data: [],
        msg: `Guild with snowflake '${req.params.guildId}' not found!`
    });
});

module.exports = router;