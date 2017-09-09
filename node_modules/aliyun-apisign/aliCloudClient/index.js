/**
 * Created by liuyinglong on 2017/8/5.
 */

let Request = require("./../request");
let AliCloudSign = require("./aliCloudSign");


function aliCloudClient(options) {

    this.AccessKeyId = options.AccessKeyId;
    this.AccessKeySecret = options.AccessKeySecret;
    this.request = new Request({
        serverUrl: options.serverUrl
    });

    this.aliCloudSign=new AliCloudSign({
        AccessKeyId:this.AccessKeyId,
        AccessKeySecret:this.AccessKeySecret
    });

}

aliCloudClient.prototype = {
    get: function (url = "/", query) {
        return this.request.get(url, this.aliCloudSign.sign("GET", query))
    }
};

module.exports = aliCloudClient;