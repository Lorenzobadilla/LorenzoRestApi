const axios = require("axios");

exports.name = "/tinyurl";
exports.index = async function (req, res, next) {
  try {
    const url = req.query.url;
    if (!url) {
      res.json({ error: "/tinyurl?url=your_link" });
    }

    const response = await axios.get(
      `${global.config.tinyurl}/api-create.php?url=${encodeURIComponent(url)}`,
    );
    const data = response.data;
    return res.json({ success: true, data: data, author: "Eugene Aguilar" });
  } catch (error) {
    res.json({ error: error });
  }
};
