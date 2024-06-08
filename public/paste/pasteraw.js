
const fs = require("fs");
const path = require("path");

exports.name = "/paste/raw"; exports.index =  async function (req, res) {
  const id = req.query.id;
  if (!id) {
    return res.status(400).json({ error: "Please provide paste ID" });
  }

  try {
    const pasteFilePath = path.join(__dirname, "data/paste.json");
    const data = JSON.parse(fs.readFileSync(pasteFilePath, "utf8"));
    const paste = data.pastes.find(paste => paste.id === id);
    if (!paste) {
      return res.status(404).json({ error: "Paste not found" });
    }
    res.send(paste.code);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

