exports.name = "/anonymous";
exports.index = async function (req, res) {
  try {
    const { uid, enable } = req.body;

    if (enable === undefined) {
      return res.status(400).json({ error: "Missing 'enable' parameter" });
    }

    if (enable) {
      if (!uid) {
        return res.status(400).json({ error: "Missing id" });
      }

      const ids = [];
      const id =
        uid.substring(0, Math.min(5, uid.length)) +
        "*".repeat(Math.max(0, uid.length - 5));
      ids.push(id);

      res.json({ anonymous: ids, name: "\nAnonymous" });
    } else {
      res.json({ anonymous: uid });
    }
  } catch (error) {
    res.status(500).json({ error: "Error handling anonymous API" });
    console.error(error);
  }
};
