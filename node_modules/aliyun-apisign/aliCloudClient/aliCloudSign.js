/**
 * Created by liuyinglong on 2017/8/5.
 */




let request = require("./../request");
let crypto = require("crypto");


function randomNumbers(count) {
    let num = '';
    for (let i = 0; i < count; i++) {
        num += Math.floor(Math.random() * 10);
    }
    return num;
}


function HmacSHA1(str, key) {
    const hmac = crypto.createHmac('sha1', key);
    hmac.update(str);
    return hmac.digest('base64');
}


function AliCloudSign(options) {
    this.AccessKeyId = options.AccessKeyId;
    this.AccessKeySecret = options.AccessKeySecret;
};


AliCloudSign.prototype = {
    sign: function (method = "GET", query = {}, body = {}) {
        let date = new Date();
        let commonQuery = {
            Format: "json",
            RegionId: "cn-hangzhou",
            Version: "2015-01-09",
            AccessKeyId: this.AccessKeyId,
            SignatureMethod: "HMAC-SHA1",
            SignatureNonce: String(date.getTime()) + randomNumbers(4),	//随机字符串
            SignatureVersion: "1.0",
            Timestamp: date.toISOString().replace(/\.\d{3}/, '')
        };
        let tempQuery = Object.assign(commonQuery, query, body);
        let signQuery = {};
        Object.keys(tempQuery).sort().forEach(function (k) {
            signQuery[k] = tempQuery[k];
        });

        let str = method + "&" + encodeURIComponent("/") + "&" + encodeURIComponent(request.objToUrl(signQuery, true));
        let signature = HmacSHA1(str, this.AccessKeySecret + "&");
        signQuery.Signature = encodeURIComponent(signature);
        return signQuery;
    }
};

module.exports = AliCloudSign;