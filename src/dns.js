const request = require('request');
const config = require('./config.js');
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
            DomainName: param.DomainName,
            RRKeyWord:param.RRKeyWord
        }).then(function (data) {
            const record = data.body.DomainRecords.Record.find(c=>c.RR===param.RRKeyWord&&c.Type===param.Type)
            if(record){
                if(record.Value!==privateIp){
                    dnsLog(param,"解析存在，IP变化，进行修改")
                    aliClient.get("/",{
                        Action:"UpdateDomainRecord",
                        RecordId:record.RecordId,
                        RR:record.RR,
                        Type:param.Type,
                        Value:privateIp,
                        Priority:param.Priority
                    }).then(function (data) {
                        dnsLog(param,"解析修改成功")
                    }).catch(function (err) {
                        dnsLog(param,"解析修改失败，"+err.body.Message)
                    });
                }else{
                    dnsLog(param,"解析存在，IP未变，无需更新！")
                }
            }else{
                dnsLog(param,"解析不存在，进行添加")
                aliClient.get('/',{
                    Action:"AddDomainRecord",
                    DomainName:param.DomainName,
                    RR:param.RRKeyWord,
                    Type:param.Type,
                    Value:privateIp,
                    Priority:param.Priority
                }).then(function (data){
                    dnsLog(param,"解析添加成功")
                }).catch(function(err){
                    dnsLog(param,"解析添加失败，"+err.body.Message)
                })
            }
        }).catch(function (err) {
            dnsLog(param,`获取域名解析记录失败，${err.body.Message}`)
        })
    })
};

const dnsLog = function(param,msg) {
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