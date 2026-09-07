const express = require("express");

const {
    getData,
    getFilters,
    getStats,
    getAnalytics
} = require("../controllers/dataController");

const router = express.Router();

router.get("/", getData);
router.get("/filters", getFilters);
router.get("/stats", getStats);
router.get("/analytics", getAnalytics);

module.exports = router;