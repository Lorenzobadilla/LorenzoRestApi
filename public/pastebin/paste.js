const PastebinAPI = require('pastebin-js');
const path = require('path');
const fs = require('fs');

const pastebin = new PastebinAPI({
  api_dev_key: 'aeGtA7rxefvTnR3AKmYwG-jxMo598whT'
});

exports.name = '/pastebin'; exports.index =  async function (req, res) {
  const content = req.query.code;

  if (!content) {
    return res.status(400).json({ error: "Missing 'text' parameter" });
  }

  try {
    const response = await pastebin.createPaste(content, 'Untitled', null, 0);

    const pasteId = response.split('/').pop();
    const rawUrl = `https://pastebin.com/raw/${pasteId}`;

  
  let filePath = path.join(__dirname, "data", "paste.json");

  if (!fs.existsSync(filePath)) fs.writeFileSync(filePath, JSON.stringify({}));

  let data = JSON.parse(fs.readFileSync(filePath));

  if (!data["paste"]) data["paste"] = [];

  data["paste"].push(rawUrl);

  fs.writeFileSync(filePath, JSON.stringify(data, null, 4));

console.log({success: rawUrl}) 


    res.json({ success: true, url: rawUrl });
  } catch (error) {
    console.error("Error uploading code:", error);
    res.status(500).json({ error: "Error uploading code" });
  }
};