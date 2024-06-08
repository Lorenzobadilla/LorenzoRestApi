const router = require("express").Router();
const { readdirSync } = require('fs-extra');
const path = require('path');
const chalk = require("chalk");
const moment = require("moment-timezone");


const welcomeAnimation = () => {
  const welcomeMessage = "[ WELCOME ] → Welcome to my simple API";
  const currentDate = moment.tz('Asia/Manila').format('dddd, D/MM/YYYY ');
  const currentTime = moment.tz('Asia/Manila').format('h:mm A');
  const category = "\nAnimation";
  const additionalInfo = `\nDate: ${currentDate}\nTime: ${currentTime}`;
  const credits = "\nCredits: Eugene Aguilar"; 
  let i = 0;
  const interval = setInterval(() => {
    if (i < welcomeMessage.length) {
      process.stdout.write(chalk.hex('#ffcc00')(welcomeMessage.charAt(i)));
    } else if (i >= welcomeMessage.length && i < welcomeMessage.length + additionalInfo.length) {
      process.stdout.write(chalk.hex('#ffcc00')(additionalInfo.charAt(i - welcomeMessage.length)));
    } else if (i >= welcomeMessage.length + additionalInfo.length && i < welcomeMessage.length + additionalInfo.length + credits.length) {
      process.stdout.write(chalk.hex('#ffcc00')(credits.charAt(i - welcomeMessage.length - additionalInfo.length))); // Displaying credits
    }
    i++;
    if (i === welcomeMessage.length + additionalInfo.length + credits.length) {
      clearInterval(interval);
      console.log();
    }
  }, 100);
};



try {
  let n = 0;
  const srcPath = path.join(__dirname, "public");
  const srcPathPost = path.join(__dirname, "post");

  welcomeAnimation();

  const hosting = readdirSync(srcPath).filter(file => file.endsWith(".js"));
  for (const file of hosting) {
    const { index, name } = require(path.join(srcPath, file));
    router.get(name, index);
    n++;
    console.log(file);
  }

  const hostingPost = readdirSync(srcPathPost).filter(file => file.endsWith(".js"));
  for (const file of hostingPost) {
    const { index, name } = require(path.join(srcPathPost, file));
    router.post(name, index);
    n++;
    console.log('post/' + file);
  }

  
      var job = ["#FFA500","#FFFF00","#00FF00","#0000FF", "#4B0082","#A020F0"];
    var random = 
job[Math.floor(Math.random() * job.length)]

  const getDirs = readdirSync(srcPath).filter(file => !file.endsWith(".js") && !file.endsWith(".json"));
  for (const dir of getDirs) {
    const fileNames = readdirSync(path.join(srcPath, dir)).filter(file => file.endsWith(".js"));
    for (const file of fileNames) {
      const { index, name } = require(path.join(srcPath, dir, file));
      router.get(name, index);
      n++;
      console.log(chalk.hex(random)('[ LOADING ] → Successfully loaded GET/' + file));
    }
  }

  const getDirsPost = readdirSync(srcPathPost).filter(file => !file.endsWith(".js") && !file.endsWith(".json"));
  for (const dir of getDirsPost) {
    const fileNames = readdirSync(path.join(srcPathPost, dir)).filter(file => file.endsWith(".js"));
    for (const file of fileNames) {
      const { index, name } = require(path.join(srcPathPost, dir, file));
      router.post(name, index);
      n++;
      console.log(chalk.blue('[ LOADING ] → Successfully loaded POST/' + file));
    }
  }

  console.log(chalk.hex('#2500c4')(`[ LOADING ] → Successfully loaded ${n} API files`));
} catch (e) {
  console.log(chalk.red('[ ERROR ] → ' + e));
}

module.exports = router;