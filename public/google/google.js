const axios = require("axios");

exports.name = '/api/google/search'; exports.index =  async (req, res) => {
    const q = req.query.search;
    if (!q) {
        return res.status(400).json({ error: "exp: /api/google/search?search=your_query" });
    }

    const myHeaders = {
        'apikey': '9alo4KELNeoXwFG1mGUnKTa7NDkj32P0'
    };

    try {
        const response = await axios.get(`https://api.apilayer.com/google_search?q=${encodeURIComponent(q)}`, {
            headers: myHeaders
        });

        res.json(response.data);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: error.message });
    }
};