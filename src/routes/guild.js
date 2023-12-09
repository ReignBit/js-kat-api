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
        res.json(
            {
                data: a,
                msg: "guild"
            }
        );
        return;
    }

    return res.status(404).json({
        data: [],
        msg: `Guild with snowflake '${req.params.guildId}' not found!`
    });
});

function marshalBody(req, res) {
    var clean = {};
    for (var i in req.body) {
        if (req.body[i] !== null) {
            clean[i] = req.body[i];
        }
    }
    return clean;
}

router.post("/:guildId", async(req, res) =>{
    console.log(req.body);
    const clean = marshalBody(req, res);

    let a = await Guild.findOne({snowflake: req.params.guildId});
    if (a) {
        console.log(a);
        return res.json({data: a, msg: "guild updated"});
    }    
    
    try{
        a = new Guild(clean);
        a.save();
        return res.json({data: [a], msg: "guild created"});
    } catch(e) 
    {
        return res.send(500).json({data: [], msg: `Failed to upsert guildid ${req.params.guildId}`});
    }
})

module.exports = router;