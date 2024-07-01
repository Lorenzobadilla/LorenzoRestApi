const path = require("path");
const fs = require("fs");

exports.name = "/api/joke";
exports.index = async function (req, res) {
    try {
        const joke = JSON.parse(fs.readFileSync('joke.json'));
        const data = joke[Math.floor(Math.random() * joke.length)];
        return res.json({
            joke: data
        });
    } catch (error) {
        res.status(500).json({ error: error.message })
        console.log(error);
    }
};