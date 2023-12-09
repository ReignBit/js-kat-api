const config = require("../../../config.json");

module.exports = function (req, res, next){
    if (!req.headers.authorization) {
        return res.status(401).json({ 
            data: [],
            msg: "You are unauthorized!",
        });
    }

    const [method, passphrase] = req.headers.authorization.split(" ");

    if (method !== "Basic")
    {
        return res.status(401).json({
            data: [],
            msg: `Unsupported authorization scheme: ${method}`
        })
    }

    for (user of config.authorized_users)
    {
        if (passphrase === user)
        {
            next();
            return;
        }
    }

    return res.status(401).json({
        data: [],
        msg: "You are not authorized to access this endpoint!",
    });
}