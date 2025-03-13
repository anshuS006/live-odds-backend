const axios = require("axios");

const API_URL = process.env.ODDS_API_URL;
const API_TOKEN = process.env.ODDS_API_TOKEN;

const fetchLiveOdds = async () => {
    try {
        const response = await axios.get(`${API_URL}?token=${API_TOKEN}`);
        
        if (response.data && response.data.status === "ok") {
            const oddsData = response.data.response.live_odds.matchodds;
            
            return {
                match_id: response.data.response.match_info.match_id,
                teama: {
                    back: oddsData.teama.back,
                    lay: oddsData.teama.lay,
                    back_volume: oddsData.teama.back_volume,
                    lay_volume: oddsData.teama.lay_volume,
                },
                teamb: {
                    back: oddsData.teamb.back,
                    lay: oddsData.teamb.lay,
                    back_volume: oddsData.teamb.back_volume,
                    lay_volume: oddsData.teamb.lay_volume,
                },
                createdAt: new Date(),
            };
        } else {
            console.error("Invalid response from API");
            return null;
        }
    } catch (error) {
        console.error("Error fetching live odds:", error.message);
        return null;
    }
};

module.exports = fetchLiveOdds;
