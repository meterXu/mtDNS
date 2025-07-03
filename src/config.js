const config = require('../dns.config.js');

module.exports={
    global: {
        "apiAddress": "https://alidns.aliyuncs.com",
        "ipaddressUrl": "https://ipinfo.io/ip",
        "AccessKeyId":config.AccessKeyId,
        "AccessKeySecret":config.AccessKeySecret,
    },
    param:config.param
}