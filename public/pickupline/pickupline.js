const axios = require('axios');
const fs = require("fs");

exports.name = "/api/pickupline";
exports.index = async function (req, res) {
    try {
        const response = await fetch('https://rizzapi.vercel.app/random');

        // Check if the fetch was successful
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const pickupline = await response.json();

        // Check if the response data is an array
        if (!Array.isArray(pickupline)) {
            throw new Error('Invalid response data from API');
        }

        const data = pickupline[Math.floor(Math.random() * pickupline.length)];
        return res.json({
            pickupline: data
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};