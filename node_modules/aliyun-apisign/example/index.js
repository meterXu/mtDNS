let AliCloudClient = require("../aliCloudClient");


let aliClient=new AliCloudClient({
    AccessKeyId:"your AccessKeyId",
    AccessKeySecret:"your AccessKeySecret",
    serverUrl:"http://alidns.aliyuncs.com"
});

//获取解析列表
aliClient.get("/",{
    Action:"DescribeDomainRecords",
    DomainName:"yourDomain.cn"
}).then(function(data){
    console.log(data.body)
}).catch(function(err){
    console.log(err);
});


