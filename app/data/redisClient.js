var redis = require("redis");
var client = redis.createClient(process.env.REDIS_URL);

//woo! redis!
client.on("error", function (err) {
    console.log("Error " + err);
});

module.exports = client;
