const mongoose = require("mongoose");
const config = require("../config/config");

const connectDB = async () => {
  try {
    if (!config.MONGO_URI) {
      console.error("MONGO_URI is not defined in the environment variables!");
      process.exit(1);
    }

    const conn = await mongoose.connect(config.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
    process.exit(1);
  }
};

// Handle MongoDB connection events
mongoose.connection.on("disconnected", () => {
  console.warn("MongoDB disconnected!");
});

mongoose.connection.on("error", (err) => {
  console.error("MongoDB Connection Error:", err);
});

module.exports = connectDB;
