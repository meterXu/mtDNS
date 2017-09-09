/**
 * Created by liuyinglong on 2017/8/5.
 */


let AliCloudClient = require("../aliCloudClient");
let Req = require("../request");
let request = new Req();
let schedule = require("node-schedule");

let aliClient = new AliCloudClient({
    AccessKeyId: "your AccessKeyId",
    AccessKeySecret: "your AccessKeySecret",
    serverUrl: "http://alidns.aliyuncs.com"
});

let domainNameValue = "www";
let recordId,       //记录ID
    ip;


function getMyIp() {
    return request.post("http://ip.taobao.com/service/getIpInfo2.php", {
        ip: "myip"
    }).then(function (data) {
        return data.body.data.ip;
    }).catch(function (err) {
        return Promise.reject(err);
    })
}

function getDomainRecords() {
    return aliClient.get("/", {
        Action: "DescribeSubDomainRecords",
        SubDomain: "www.yourDomain.cn"
    }).then(function (data) {
        let body = data.body;
        let record = body.DomainRecords.Record[0];
        recordId = record.RecordId;
        return record.Value;
    }).catch(function (err) {
        return Promise.reject(err);
    })
}

function upDateRecords() {
    return aliClient.get("/", {
        Action: "UpdateDomainRecord",
        RecordId: recordId,
        RR: domainNameValue,
        Type: "A",
        Value: ip
    }).then(function (data) {
        console.log(new Date() + ip + " 修改成功");
    }).catch(function (err) {
        console.log(err)
    })
}

function watchIpChange() {
    return getMyIp().then(function (tempIp) {
        if (ip === tempIp) {
            return;
        }
        if (!ip) {
            return;
        }
        console.log(new Date()+ ip + "=>"+ tempIp);
        ip = tempIp;
        upDateRecords();
    }).catch(function(err){
        console.log(err);
    })
}


Promise.all([getMyIp(), getDomainRecords()]).then(function (result) {
    ip = result[0];
    let domainValue = result[1];
    if (ip !== domainValue) {
        upDateRecords();
    }
});

schedule.scheduleJob("0 * * * * *", function () {
    watchIpChange();
});