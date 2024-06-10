const path = require("path");
const fs = require("fs");
const axios = require("axios");

exports.name = "/sim";
exports.index = async (req, res) => {
  try {
    const filePath = path.join(__dirname, "data/sim.json");
    const data = JSON.parse(fs.readFileSync(filePath));
    const query = req.query.ask.toLowerCase();

    if (data.hasOwnProperty(query)) {
      const randomIndex = Math.floor(Math.random() * data[query].length);
      const responseData = data[query][randomIndex];

      return res.json({ respond: responseData });
    }

    return res.json({
      respond: "🚀 | Currently, I have no response for that yet, but you can kindly teach me."
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ respond: "Internal Server Error" });
  }
};
