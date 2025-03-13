const mongoose = require("mongoose");

const OddsSchema = new mongoose.Schema(
    {
        match_id: {
            type: Number,
            required: true,
        },
        teama: {
            back: { type: String, required: true },
            lay: { type: String, required: true },
            back_volume: { type: String, required: true },
            lay_volume: { type: String, required: true },
        },
        teamb: {
            back: { type: String, required: true },
            lay: { type: String, required: true },
            back_volume: { type: String, required: true },
            lay_volume: { type: String, required: true },
        },
    },
    { timestamps: true } 
);

module.exports = mongoose.model("Odds", OddsSchema);
