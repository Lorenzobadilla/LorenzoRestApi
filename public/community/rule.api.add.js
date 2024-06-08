const fs = require("fs");
const path = require("path");

exports.name = "/rules/api/add"; exports.index =  async function (req, res) {
  try {
    const { tid, rule } = req.query;
    const filePath = path.join(__dirname, "cache", "rules.json");
    const fileData = await fs.readFileSync(filePath, "utf8");
    const data = JSON.parse(fileData);

    if (!data[tid]) data[tid] = [];
    data[tid].push(rule);

    await fs.writeFileSync(filePath, JSON.stringify(data, null, 4));

    res.json({
      success: true,
      message: "Rule added successfully",
      content: { tid, rule },
    });
  } catch (error) {
    console.error("Error adding rule:", error);
    res.status(500).json({ success: false, message: "Failed to add rule" });
  }
};
