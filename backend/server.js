const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const dataRoutes = require("./routes/dataRoutes");
const connectDB = require("./config/db");

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
    res.send("api is running..");
});
app.use("/api/data", dataRoutes);

const PORT = process.env.PORT ||8080;

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});


