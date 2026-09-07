const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const dataRoutes = require("./routes/dataRoutes");
const connectDB = require("./config/db");

dotenv.config();

connectDB();

const app = express();

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        status: "success",
        message: "Blackcoffer Strategic Foresight API is running successfully!",
        endpoints: {
            data: "/api/data",
            filters: "/api/data/filters",
            stats: "/api/data/stats",
            analytics: "/api/data/analytics"
        }
    });
});

app.use("/api/data", dataRoutes);

const PORT = process.env.PORT || 8080;

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running on port ${PORT}`);
});
