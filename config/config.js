const dotenv = require("dotenv");
const path = require("path");

const envFile = path.resolve(__dirname, `../env/.env.${process.env.NODE_ENV || "dev"}`);

dotenv.config({ path: envFile });

module.exports = {
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: process.env.PORT || 5000,
  MONGO_URI: process.env.MONGO_URI || "mongodb://localhost:27017/liveOdds",
  JWT_SECRET: process.env.JWT_SECRET || "default_secret",
};
