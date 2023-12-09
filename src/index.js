const express = require("express");
const mongoose = require("mongoose");

const config = require("../config.json");
const con = mongoose.connect(`mongodb://${config.db.host}:${config.db.port}/${config.db.name}`);

const app = express();

function getErrMsgForStatus(statusCode) {
    const msgs = {
        400: "Bad Request",
        401: "Unauthorized",
        403: "Forbidden",
        404: "Not Found",
        405: "Method Not Allowed",
        
        500: "Internal Server Error",
        501: "Not Implemented",
        503: "Service Unavailable"
    }

    return msgs[statusCode];
}

app.response.json = function(body){
    this.contentType('json').end(JSON.stringify(
        {
            data: body.data,
            msg: body.msg,
            error: getErrMsgForStatus(this.statusCode),
            status: this.statusCode
        }
    ));
}

app.use("/", require("./routes/root"));
app.use("/guilds", require("./routes/guild"));

app.listen(9000, () => {
    console.log("running...");
});
