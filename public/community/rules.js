const express = require("express");
const fs = require("fs");
const path = require("path");


exports.name = "/rules"; exports.index =  async function (req, res) {
  try {
    const tid = req.query.tid;
    const filePath = path.join(__dirname, "cache", "rules.json");
    const rules = await fs.readFileSync(filePath, "utf8");

    const content = JSON.parse(rules);
    const rule = content[tid];


    res.json({
      success: true,
      message: "Rules fetched successfully",
      content: rule, 
    });
  } catch (error) {
    console.error("Error fetching rules:", error);
    res.status(500).json({ success: false, message: "Failed to fetch rules" });
  }
};
