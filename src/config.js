const path = require('path');
const rootPath = path.resolve(__dirname, '..');

require('dotenv').config({path: `${rootPath}/.env.${process.env.NODE_ENV}`});
module.exports={
    global: {
        "apiAddress": "https://alidns.aliyuncs.com",
        "ipaddressUrl": "https://ipinfo.io/ip",
        "AccessKeyId":process.env.AccessKeyId,
        "AccessKeySecret":process.env.AccessKeySecret,
    },
    param:JSON.parse(process.env.param)
}