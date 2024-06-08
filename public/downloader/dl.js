
const { aio } = require('betabotz-tools')

exports.name = "/dl"; exports.index = async function (req, res, next) {
try {
let link = req.query.link;
if(!link) {
res.json({error: "/dl?link=https://example.com"})
return;
}

const response = await aio(link)
console.log(response) 
const title = response.result.title;
const video = response.result.medias[1].url;
res.json({url: video, title: title, creator: "Eugene Aguilar"})
} catch(error) {
res.json({error: "error fetching downloader api"})
console.log(error)
}
};
