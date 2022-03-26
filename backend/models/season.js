const mongoose = require ("mongoose");

const seasonSchema = new mongoose.Schema({
    season : { type: String, requried: true, unique: true, trime: true},
    show: { type: Boolean, default: true }
});

const Season = mongoose.model("Season", seasonSchema);

exports.Season = Season;