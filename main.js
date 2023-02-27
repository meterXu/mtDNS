const request = require('request');
const config = require('./config.json');
const AliCloudClient = require("aliyun-apisign");
let privateIp;
const aliClient = new AliCloudClient({
    AccessKeyId: config.global.AccessKeyId,
    AccessKeySecret: config.global.AccessKeySecret,
    serverUrl: config.global.apiAddress
});
//域名解主程序
const analysisRecords=function (){
    let param=config.param;
    aliClient.get("/", {
        Action: "DescribeDomainRecords",
        DomainName: config.global.DomainName,
        RRKeyWord:param.RRKeyWord
    }).then(function (data) {
        if(data.body.DomainRecords.Record.length>0){
            let record = data.body.DomainRecords.Record[0];
            aliClient.get("/",{
                Action:"UpdateDomainRecord",
                RecordId:record.RecordId,
                RR:record.RR,
                Type:param.Type,
                Value:privateIp,
                Priority:param.Priority
            } ).then(function (data) {
                console.log(new Date()+ ": 域名修改成功");
            }).catch(function (err) {
                console.log(new Date()+"：域名修改失败，"+err.body.Message)
            });
        }else{
            aliClient.get('/',{
                Action:"AddDomainRecord",
                DomainName:config.global.DomainName,
                RR:param.RRKeyWord,
                Type:param.Type,
                Value:privateIp,
                Priority:param.Priority
            });
        }
    }).catch(function (err) {
        console.log(new Date()+ ": 获取解析记录["+param.RRKeyWord+"]失败");
    })
};

//获取ip地址
exports.getIp = function (success) {
    request(config.global.ipaddressUrl, function (error, response, body) {
        privateIp = body;
        success(body);
    });
};
//域名解析
exports.analysisDns = function () {
    analysisRecords();
};