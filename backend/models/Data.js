const  mongoose  = require("mongoose");


const  dataSchema = new mongoose.Schema({


end_year: {
      type: String,
      default: '',
      index: true,
    },
    intensity: {
      type: Number,
      default: 0,
      index: true,
    },
    sector: {
      type: String,
      default: '',
      index: true,
    },
    topic: {
      type: String,
      default: '',
      index: true,
    },
    insight: {
      type: String,
      default: '',
    },
    url: {
      type: String,
      default: '',
    },
    region: {
      type: String,
      default: '',
      index: true,
    },
    start_year: {
      type: String,
      default: '',
    },
    impact: {
      type: String,
      default: '',
    },
    added: {
      type: String,
      default: '',
    },
    published: {
      type: String,
      default: '',
    },
    country: {
      type: String,
      default: '',
      index: true,
    },
    relevance: {
      type: Number,
      default: 0,
      index: true,
    },
    pestle: {
      type: String,
      default: '',
      index: true,
    },
    source: {
      type: String,
      default: '',
      index: true,
    },
    title: {
      type: String,
      default: '',
    },
    likelihood: {
      type: Number,
      default: 0,
      index: true,
    },
    city: {
      type: String,
      default: '',
      index: true,
    },
    swot: {
      type: String,
      default: '',
      index: true,
    },
  },
  {
    timestamps: true,
  }
);
dataSchema.index({
  title: "text",
  topic: "text",
  insight: "text",
});

const Data=mongoose.model("Data",dataSchema);

module.exports=Data;