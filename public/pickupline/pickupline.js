const path = require("path");
const fs = require("fs");
const axios = require("axios");

exports.name = "/pickupline";
exports.index = async (req, res) => {
  try {
    const filePath = path.join(__dirname, "data/pickupline.json");
    const data = JSON.parse(fs.readFileSync(filePath));
    const query = req.query.ask.toLowerCase();

    if (data.hasOwnProperty(query)) {
      const randomIndex = Math.floor(Math.random() * data[query].length);
      const responseData = data[query][randomIndex];

      return res.json({ respond: responseData });
    }

    return res.json({
      respond: "I'm sorry im not available now 😞"
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ respond: "Internal Server Error" });
  }
};
