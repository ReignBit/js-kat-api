const { Long } = require("mongodb");
const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema({
    snowflake: String
});

const permissionSchema = new mongoose.Schema({
    admin: {type: [String], default: []},
    mod: {type: [String], default: []}
});

const guildSchema = new mongoose.Schema({
    snowflake: {type: String, required: true},
    discovered_at: {
        type: Number,
        default: d => Date.now()
    },
    members: [memberSchema],
    prefix: {type: String, default: "!"},
    owner_id: String,
    permission_groups: {type: permissionSchema, default: () => ({})}

});
const Guild = new mongoose.model("guilds", guildSchema);

module.exports = {
    Guild
}