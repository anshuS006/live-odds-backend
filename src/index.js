require("dotenv").config();
const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const connectDB = require("../config/db");
const oddsRoutes = require("../src/routes/oddsRoutes");
const fetchLiveOdds = require("../src/services/fetchOdds");
const Odds = require("../src/models/Odds");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});

app.use(express.json());
app.use(cors());

connectDB();


app.use("/api/odds", oddsRoutes);

app.get("/", (req, res) => {
    res.send("Welcome to the Live Odds API");
});

io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);

    const sendLatestOdds = async () => {
        const latestOdds = await Odds.findOne().sort({ createdAt: -1 });
        if (latestOdds) {
            socket.emit("odds_update", latestOdds);
        }
    };

    sendLatestOdds();

    socket.on("disconnect", () => {
        console.log("Client disconnected:", socket.id);
    });
});
setInterval(async () => {
    const newOdds = await fetchLiveOdds();
    if (newOdds) {
        console.log("New Odds Saved:", newOdds);
        await Odds.create(newOdds);
        io.emit("odds_update", newOdds);
    }
}, 5000);
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
