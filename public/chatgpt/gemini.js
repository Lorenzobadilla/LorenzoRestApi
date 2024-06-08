const axios = require("axios")

exports.name = "/api/gemini"; exports.index = async function (req, res) {
const { ask } = req.query;
if(!ask) {
return res.json({error: "exp: /api/gemini?ask=your_question"})
}

  
const googlekey = "AIzaSyD-WKBfKdZb5GnnKIoqEAkbVx-FtBWsq7Q"
  try {
    const url =
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=" +
      googlekey;
    const headers = {
      "Content-Type": "routerlication/json",
    };
    const data = {
      contents: [
        {
          parts: [
            {
              text: ask,
            },
          ],
        },
      ],
    };

    const response = await axios.post(url, data, { headers });
  
    return res.json({code: "200", msg: "success", data: { gemini:  response.data.candidates[0].content.parts[0].text, model: "gemini-pro"} })
  } catch (e) {
    console.log(e.message);
    return res.json({error: e.message })
  }
};