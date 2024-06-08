const express = require("express");
const router = require("./eugene");
const config = require("./config.json");
global.config = config;
const path = require("path");
const fs = require("fs");
const chalk = require("chalk");

const app = express();
app.use(express.json());

app.use(router);

const port = config.port;

app.get("/", async function (req, res) {
  res.sendFile(path.join(__dirname, "eurix/contact.html"));
});

app.get("/docs", async function (req, res) {
  res.sendFile(path.join(__dirname, "eurix/docs.html"));
});

app.get("/token/html", async function (req, res) {
  try {
    res.sendFile(path.join(__dirname, "eurix/token/get.html"));
  } catch (error) {
    return res.json({ error: "no router not found" });
  }
});

app.get("/stalk/html", async function (req, res) {
  try {
    res.sendFile(path.join(__dirname, "eurix/docs/stalk.html"));
  } catch (error) {
    return res.json({ error: "router not found" });
  }
});


app.get("/shoti/html", async function (req, res) {
  res.sendFile(path.join(__dirname, "eurix/docs/shoti.html"));
});

app.get("/pastebin/html", async function (req, res) {
  res.sendFile(path.join(__dirname, "eurix/pastebin/paste.html"));
});

app.get("/chatgpt/html", async function (req, res) {
  res.sendFile(path.join(__dirname, "eurix/chatgpt/gpt.html"));
});

app.get("*", async function (req, res) {
  res.sendFile(path.join(__dirname, "eurix/404.html"));
});

app.listen(port, () => {
  console.log(chalk.hex('#ffcc00')(`Your app is listening on port ${port}`));
});