// src/data/sampleData.js
import rawData from "./sampleData.json";

const sampleData = rawData.reduce((acc, item) => {
  acc[item.question.toLowerCase()] = item.response;
  return acc;
}, {});

// Add default response
sampleData["default"] = "Sorry, Did not understand your query!";

export default sampleData;
