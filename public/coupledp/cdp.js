const path = require("path");
const fs = require("fs");

exports.name = "/api/cdp";
exports.index = async function (req, res) {
    try {
        const data = fs.readFileSync(path.join(__dirname, "data", "cdp.json"), "utf-8");
        const couple = JSON.parse(data); 
        var random = Math.floor(Math.random() * couple.length);

        return res.json({
            avatar: couple[random].avatar,
            character: couple[random].character,
            anime: couple[random].anime
        });
    } catch (error) {
        res.status(500).json({ error: error.message })
        console.log(error);
    }
};