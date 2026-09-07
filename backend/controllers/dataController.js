const Data = require("../models/Data");

const getData = async (req, res) => {
    try {
        const {
            end_year,
            topic,
            sector,
            region,
            country,
            pestle,
            source,
            city,
            swot,
            search,
            min_intensity,
            max_intensity,
            min_likelihood,
            max_likelihood,
            min_relevance,
            max_relevance,
            limit
        } = req.query;

        const filter = {};

        if (end_year) filter.end_year = end_year;
        if (topic) filter.topic = topic;
        if (sector) filter.sector = sector;
        if (region) filter.region = region;
        if (country) filter.country = country;
        if (pestle) filter.pestle = pestle;
        if (source) filter.source = source;
        if (city) filter.city = city;
        if (swot) filter.swot = swot;

        // Numerical range filters
        if (min_intensity || max_intensity) {
            filter.intensity = {};
            if (min_intensity) filter.intensity.$gte = Number(min_intensity);
            if (max_intensity) filter.intensity.$lte = Number(max_intensity);
        }

        if (min_likelihood || max_likelihood) {
            filter.likelihood = {};
            if (min_likelihood) filter.likelihood.$gte = Number(min_likelihood);
            if (max_likelihood) filter.likelihood.$lte = Number(max_likelihood);
        }

        if (min_relevance || max_relevance) {
            filter.relevance = {};
            if (min_relevance) filter.relevance.$gte = Number(min_relevance);
            if (max_relevance) filter.relevance.$lte = Number(max_relevance);
        }

        // Keyword search in title, insight, or topic
        if (search && search.trim() !== "") {
            const regex = new RegExp(search.trim(), "i");
            filter.$or = [
                { title: regex },
                { insight: regex },
                { topic: regex }
            ];
        }

        let query = Data.find(filter).sort({ published: -1, _id: -1 });
        if (limit) {
            query = query.limit(Number(limit));
        }

        const data = await query;
        res.json(data);

    } catch (error) {
        res.status(500).json({
            message: "Error fetching data",
            error: error.message
        });
    }
};

const getFilters = async (req, res) => {
    try {
        const cleanDistinct = async (field) => {
            const raw = await Data.distinct(field);
            return raw
                .filter(val => val !== null && val !== undefined && String(val).trim() !== "")
                .sort((a, b) => {
                    if (!isNaN(a) && !isNaN(b)) return Number(a) - Number(b);
                    return String(a).localeCompare(String(b));
                });
        };

        const filters = {
            end_year: await cleanDistinct("end_year"),
            topic: await cleanDistinct("topic"),
            sector: await cleanDistinct("sector"),
            region: await cleanDistinct("region"),
            country: await cleanDistinct("country"),
            pestle: await cleanDistinct("pestle"),
            source: await cleanDistinct("source"),
            city: await cleanDistinct("city"),
            swot: await cleanDistinct("swot")
        };

        res.json(filters);

    } catch (error) {
        res.status(500).json({
            message: "Error fetching filters",
            error: error.message
        });
    }
};

const getStats = async (req, res) => {
    try {
        const totalRecords = await Data.countDocuments();

        const result = await Data.aggregate([
            {
                $group: {
                    _id: null,
                    averageIntensity: { $avg: "$intensity" },
                    maxIntensity: { $max: "$intensity" },
                    averageRelevance: { $avg: "$relevance" },
                    averageLikelihood: { $avg: "$likelihood" }
                }
            }
        ]);

        const stats = result[0] || {};

        res.json({
            totalRecords,
            averageIntensity: Math.round((stats.averageIntensity || 0) * 10) / 10,
            maxIntensity: stats.maxIntensity || 0,
            averageRelevance: Math.round((stats.averageRelevance || 0) * 10) / 10,
            averageLikelihood: Math.round((stats.averageLikelihood || 0) * 10) / 10
        });

    } catch (error) {
        res.status(500).json({
            message: "Error fetching statistics",
            error: error.message
        });
    }
};

const getAnalytics = async (req, res) => {
    try {
        // Sector distribution with averages
        const sectorData = await Data.aggregate([
            { $match: { sector: { $ne: "" } } },
            {
                $group: {
                    _id: "$sector",
                    count: { $sum: 1 },
                    avgIntensity: { $avg: "$intensity" },
                    avgLikelihood: { $avg: "$likelihood" },
                    avgRelevance: { $avg: "$relevance" }
                }
            },
            { $sort: { count: -1 } }
        ]);

        // Region distribution
        const regionData = await Data.aggregate([
            { $match: { region: { $ne: "" } } },
            {
                $group: {
                    _id: "$region",
                    count: { $sum: 1 },
                    avgIntensity: { $avg: "$intensity" }
                }
            },
            { $sort: { count: -1 } }
        ]);

        // PESTLE distribution
        const pestleData = await Data.aggregate([
            { $match: { pestle: { $ne: "" } } },
            {
                $group: {
                    _id: "$pestle",
                    count: { $sum: 1 },
                    avgIntensity: { $avg: "$intensity" }
                }
            },
            { $sort: { count: -1 } }
        ]);

        // Year trends
        const yearData = await Data.aggregate([
            { $match: { end_year: { $ne: "" } } },
            {
                $group: {
                    _id: "$end_year",
                    count: { $sum: 1 },
                    avgIntensity: { $avg: "$intensity" },
                    avgLikelihood: { $avg: "$likelihood" },
                    avgRelevance: { $avg: "$relevance" }
                }
            },
            { $sort: { _id: 1 } }
        ]);

        // Top Topics
        const topicData = await Data.aggregate([
            { $match: { topic: { $ne: "" } } },
            {
                $group: {
                    _id: "$topic",
                    count: { $sum: 1 },
                    avgIntensity: { $avg: "$intensity" }
                }
            },
            { $sort: { count: -1 } },
            { $limit: 15 }
        ]);

        // Top Sources
        const sourceData = await Data.aggregate([
            { $match: { source: { $ne: "" } } },
            {
                $group: {
                    _id: "$source",
                    count: { $sum: 1 }
                }
            },
            { $sort: { count: -1 } },
            { $limit: 10 }
        ]);

        res.json({
            sectors: sectorData,
            regions: regionData,
            pestles: pestleData,
            years: yearData,
            topics: topicData,
            sources: sourceData
        });

    } catch (error) {
        res.status(500).json({
            message: "Error fetching analytics",
            error: error.message
        });
    }
};

module.exports = {
    getData,
    getFilters,
    getStats,
    getAnalytics
};