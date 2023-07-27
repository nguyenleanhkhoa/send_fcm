const admin = require("firebase-admin");

// Đường dẫn tới tệp serviceAccountKey.json, chứa thông tin xác thực của Firebase Admin SDK.
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
let token =
  "cayJhRyWY0V2jafcjACicZ:APA91bFWe-0g6ImofLlbM7ocU40qpHToqaq6cTWi51Vjeg6IlOQWhGrtP36vPjDVjSmP3jHdht8Yji_srWj71srCkl1wxau3_-KxmVGOlZrHHKEM8YvC8QdTChTvH5O_luqEztDVMB2l";
// let token = "cbeHACVrRjyGup9nHiQODN:APA91bG6Lqd2qo7dMOak9Gmt_JGID5kyUlMsRdgZlhJrQxnXSFlcngUiDtXvAYc-6PWM4erXe1QsBWz4AT0-1764udtLMsIGE_fjdl3kWkeAY6YRsnBKyiLXy-z_ciYW1AQtSoDk177g";
// Hàm gửi silent notification đến một thiết bị đã đăng ký.
function sendSilentNotification(registrationToken) {
  // {payload: { title: title, description: message, message_type: message_type, object_id: id } }
  const message = {
    "token": registrationToken,
    
    "notification": {
      "title": "Silent Notification",
      "body": "This is a silent notification.",
      "image": 'https://foo.bar.pizza-monster.png'
    },
    // notification: {
    //   silent: true,
    // },
    "apns": {
      
      "payload": {
        "aps": {
         'mutable-content': 1,
          "sound": "mysound",
          "alert": {
            "body": "great match!",
            "title": "Portugal vs. Denmark",
            "image": 'https://foo.bar.pizza-monster.png',
            "silent": true

          },
        },
      },
        "fcm_options": {
        "image": 'https://foo.bar.pizza-monster.png'
        }
    },
    "android": {
      "notification": {
        "color": "#ff0000",
        "sound": "default",
      },
    },
  };

  // Gửi thông báo sử dụng Firebase Admin SDK.
  admin
    .messaging()
    .send(message)
    .then((response) => {
      console.log("Silent notification sent successfully:", response);
    })
    .catch((error) => {
      console.error("Error sending silent notification:", error);
    });
}

// Thay đổi giá trị `device_registration_token` thành token đăng ký của thiết bị cụ thể.
// const deviceRegistrationToken = "device_registration_token";

// Gửi silent notification đến thiết bị đã đăng ký.
sendSilentNotification(token);
