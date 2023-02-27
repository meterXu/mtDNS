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
    let params=config.param;
    params.forEach(param=>{
        aliClient.get("/", {
            Action: "DescribeDomainRecords",
            DomainName: config.global.DomainName,
            RRKeyWord:param.RRKeyWord
        }).then(function (data) {
            if(data.body.DomainRecords.Record.length>0){
                dnslog(param,"解析存在，进行修改")
                let record = data.body.DomainRecords.Record[0];
                aliClient.get("/",{
                    Action:"UpdateDomainRecord",
                    RecordId:record.RecordId,
                    RR:record.RR,
                    Type:param.Type,
                    Value:privateIp,
                    Priority:param.Priority
                }).then(function (data) {
                    dnslog(param,"解析修改成功")
                }).catch(function (err) {
                    dnslog(param,"解析修改失败，"+err.body.Message)
                });
            }else{
                dnslog(param,"解析不存在，进行添加")
                aliClient.get('/',{
                    Action:"AddDomainRecord",
                    DomainName:config.global.DomainName,
                    RR:param.RRKeyWord,
                    Type:param.Type,
                    Value:privateIp,
                    Priority:param.Priority
                }).then(function (data){
                    dnslog(param,"解析添加成功")
                }).catch(function(err){
                    dnslog(param,"解析添加失败，"+err.body.Message)
                })
            }
        }).catch(function (err) {
            dnslog(param,"获取域名解析记录失败")
        })
    })
};

const dnslog = function(param,msg) {
    console.log(new Date()+"：域名["+param.Type+","+param.RRKeyWord+","+param.Priority+"]，"+msg);
}

//获取ip地址
exports.getIp = function (success) {
    request(config.global.ipaddressUrl, function (error, response, body) {
        body = body.replace('\n','');
        privateIp = body;
        success(body);
    });
};
//域名解析
exports.analysisDns = function () {
    analysisRecords();
};