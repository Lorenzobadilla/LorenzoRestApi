const path = require("path");
const fs = require("fs");

exports.name = "/api/pickupline";
exports.index = async function (req, res) {
    try {
        const data = fs.readFileSync(path.join(__dirname, "data", "pickupline.json"), "utf-8");
        const pickupline = JSON.parse(data); 
        var random = Math.floor(Math.random() * couple.length);
        return res.json({
        pickupline: pickupline[random]
        });
    } catch (error) {
        res.status(500).json({ error: error.message })
        console.log(error);
    }
};