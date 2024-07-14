const axios = require('axios');
const fs = require("fs");

exports.name = "/api/pickupline";
exports.index = async function (req, res) {
    try {
        const response = await fetch('https://rizzapi.vercel.app/random');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const pickupline = await response.json();
        const data = pickupline[Math.floor(Math.random() * pickupline.length)];
        return res.json({
            pickupline: data
        });
    } catch (error) {
        res.status(500).json({ error: error.message })
        console.log(error);
    }
};