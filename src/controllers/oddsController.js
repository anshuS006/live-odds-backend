const Odds = require("../models/Odds");

const getOdds = async (req, res) => {
    try {
        const latestOdds = await Odds.find().sort({ createdAt: -1 }).limit(1);
        if (!latestOdds.length) {
            return res.status(404).json({ message: "No odds data found" });
        }
        res.status(200).json(latestOdds[0]);
    } catch (error) {
        console.error("Error fetching odds:", error);
        res.status(500).json({ message: "Server Error" });
    }
};
module.exports = { getOdds };
