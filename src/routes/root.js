const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.json({
        "data": {
            "version": 1.0,
            "uptime": process.uptime()
        },
        "msg": "hello world!",
        "err": null,
        "status": 200
    });
});

module.exports = router;