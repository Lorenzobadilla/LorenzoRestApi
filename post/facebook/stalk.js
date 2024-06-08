const axios = require("axios");

function convert(time) {
  var date = new Date(time);
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var seconds = date.getSeconds();

  var formattedDate = `${day < 10 ? "0" + day : day}/${month < 10 ? "0" + month : month}/${year}||${hours < 10 ? "0" + hours : hours}:${minutes < 10 ? "0" + minutes : minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
  return formattedDate;
}

const headers = {
  "User-Agent":
    "Mozilla/5.0 (iPhone; CPU iPhone OS 12_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.0 Mobile/15E148 Safari/604.1",
  accept: "application/json, text/plain, */*",
};

exports.name = "/api/stalk";

exports.index = async function (req, res, next) {
  const { uid } = req.query;
  if (!uid) {
    return res.json({ error: 'missing "uid" parameter' });
  }

  var token = global.config.fbstalk;

  try {
    const resp = await axios.get(
      `https://graph.facebook.com/${uid}?fields=id,is_verified,cover,created_time,work,hometown,username,link,name,locale,location,about,website,birthday,gender,relationship_status,significant_other,quotes,first_name,subscribers.limit(0)&access_token=${token}`,
      { headers: headers },
    );

    var name = resp.data.name;
    var link_profile = resp.data.link;
    var id = resp.data.id;
    var first_name = resp.data.first_name;
    var username = resp.data.username || "No data!";
    var created_time = convert(resp.data.created_time);
    var web = resp.data.website || "No data!";
    var gender = resp.data.gender;
    var relationship_status = resp.data.relationship_status || "No data!";
    var love = resp.data.significant_other
      ? resp.data.significant_other.name
      : "No data!";
    var bday = resp.data.birthday || "No data!";
    var follower = resp.data.subscribers
      ? resp.data.subscribers.summary.total_count
      : "No data!";
    var is_verified = resp.data.is_verified;
    var quotes = resp.data.quotes || "No data!";
    var about = resp.data.about || "No data!";
    var locale = resp.data.locale || "No data!";
    var hometown = resp.data.hometown ? resp.data.hometown.name : "No Hometown";
    var cover = resp.data.cover ? resp.data.cover.source : "No Cover photo";
    var avatar = `https://graph.facebook.com/${uid}/picture?width=1500&height=1500&access_token=1174099472704185|0722a7d5b5a4ac06b11450f7114eb2e9`;

    res.json({
      username: username,
      name: name,
      uid: id,
      link_profile: link_profile,
      first_name: first_name,
      created_time: created_time,
      website: web,
      gender: gender,
      relationship_status: relationship_status,
      significant_other: love,
      birthday: bday,
      followers: follower,
      is_verified: is_verified,
      quotes: quotes,
      about: about,
      locale: locale,
      hometown: hometown,
      cover: cover,
      avatar: avatar,
    });
  } catch (error) {
    return res.json({ error: error.message });
  }
};
