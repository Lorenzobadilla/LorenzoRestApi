const path = require("path");
const fs = require("fs");

exports.name = "/teach"; 
exports.index = async (req, res) => {
  let ask = req.query.ask;
  let ans = req.query.ans;

  if (!ask || !ans) return res.json({ err: "Missing ans or ask query!" });

  let filePath = path.join(__dirname, "data", "sim.json");

  if (!fs.existsSync(filePath)) fs.writeFileSync(filePath, JSON.stringify({}));

  let data = JSON.parse(fs.readFileSync(filePath));

  if (!data[ask]) data[ask] = [];

  data[ask].push(ans);

  fs.writeFileSync(filePath, JSON.stringify(data, null, 4));

  res.json({
    ask: ask,
    ans: ans,
  });
};