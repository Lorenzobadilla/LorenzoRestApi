const axios = require("axios");

exports.name = "/appstate"; exports.index = async function (req, res) {
  try {
const {email, password} = req.query;
if(!email || !password) {
return res.json({"/appstate?email=email&password=password": "Invalid query"})
}

const response = await axios.get(`https://fbstate-getter.vercel.app/api?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`);
const data = response.data;

res.json({result: data});
} catch (error) {
res.json({error: error.message });
console.log(error);
}
};