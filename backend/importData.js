const mongoose = require("mongoose");
const dotenv = require("dotenv");

const Data = require("./models/Data");
const data = require("./jsondata.json");

dotenv.config();

const importData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        console.log("MongoDB connected");

        await Data.deleteMany();

        await Data.insertMany(data);

        console.log("Data imported successfully");

        process.exit();
    } catch (error) {
        console.log("Error:", error.message);
        process.exit(1);
    }
};

importData();