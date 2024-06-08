const axios = require("axios");

exports.name = "/shoti";
exports.index = async (req, res) => {
  try {
    const response = await axios.post(
      `https://shoti-srv1.onrender.com/api/v1/get`,
      { apikey: global.config.shoti },
    );
    const username = response.data.data.user.username;
    const nickname = response.data.data.user.nickname;
    const title = response.data.data.title || "No title";
    const userid = response.data.data.user.userID;
    const url = response.data.data.url;
    const videoid = response.data.data.url.split("/")[6];
const id = videoid.split(".")[0];
    res.json({
      code: "200",
      msg: "success",
      author: "Eugene Aguilar",
      data: {
        url: url,
        username: username,
        nickname: nickname,
        title: title,
        userid: userid,
        videoid: id,
      },
    });
    console.log(response.data);
  } catch (error) {
    console.error("Error:", error.message);
    res.json({ code: "500", msg: "error fet hing shoti", data: error.message });
  }
};
