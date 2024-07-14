const path = require("path");
const fs = require("fs");

exports.name = "/api/joke";
exports.index = async function (req, res) {
    try {
        const response = await axios.get("https://v2.jokeapi.dev/joke/Any");
        let jokeData;
        if (Array.isArray(response.data)) {
            // If it's an array, pick a random joke
            jokeData = response.data[Math.floor(Math.random() * response.data.length)];
        } else {
            // If it's a single object, use that directly
            jokeData = response.data;
        }
        return res.json({
            joke: jokeData
        });
    } catch (error) {
        res.status(500).json({ error: error.message })
        console.log(error);
    }
};