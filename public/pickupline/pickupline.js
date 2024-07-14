const path = require("path");
const fs = require("fs");

exports.name = "/api/pickupline";
exports.index = async function (req, res) {
    try {
        const pickupline = JSON.parse(fs.readFileSync('./pickupline.json'));
        const data = pickupline[Math.floor(Math.random() * pickupline.length)];
        return res.json({
            pickupline: data
        });
    } catch (error) {
        res.status(500).json({ error: error.message })
        console.log(error);
    }
};