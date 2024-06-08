const fs = require("fs");
const path = require("path");

exports.name = "/paste/create"; exports.index = async function (req, res) {
  const code = req.query.code;
  if (!code) {
    return res.status(400).json({ error: "missing code" });
  }

  const pasteData = {
    id: generateUniqueId(), 
    code: code
  };

  const pasteFilePath = path.join(__dirname, "data/paste.json");

  try {
    let data = fs.readFileSync(pasteFilePath, "utf8");
    data = JSON.parse(data);
    if (!data.pastes) data.pastes = [];
    data.pastes.push(pasteData);
    fs.writeFileSync(pasteFilePath, JSON.stringify(data, null, 2));
    res.json({result: "success", id: pasteData.id})
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

function generateUniqueId() {
  return Math.random().toString(36).substring(2, 10);
}