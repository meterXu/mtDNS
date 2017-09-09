var request = require('request');
var config = require('./config');
let AliCloudClient = require("aliyun-apisign");
var privateIp;
let aliClient = new AliCloudClient({
    AccessKeyId: config.gobal().AccessKeyId,
    AccessKeySecret: config.gobal().AccessKeySecret,
    serverUrl: config.gobal().apiAddress
});
exports.getIp = function (success) {
    request(config.gobal().ipaddressUrl, function (error, response, body) {
        privateIp = body;
        success(body);
    });
}
//域名解析
exports.analysisDns = function () {
    var param=config.param();
    param.Value=privateIp;
    aliClient.get("/",param ).then(function (data) {
        console.log(new Date()+ ": 域名修改成功");
    }).catch(function (err) {
        console.log(new Date()+"：域名修改失败"+err)
    })

}