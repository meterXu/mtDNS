const request = require('request');
const config = require('./config.js');
const Alidns20150109 = require('@alicloud/alidns20150109');
const OpenApi = require('@alicloud/openapi-client');
const Util = require('@alicloud/tea-util');
const Tea = require('@alicloud/tea-typescript');
let privateIp;
let _config = new OpenApi.Config({
    accessKeyId: config.global.AccessKeyId,
    accessKeySecret: config.global.AccessKeySecret,
});
_config.endpoint = `alidns.cn-beijing.aliyuncs.com`;
const aliClient = new Alidns20150109.default(_config);
let runtime = new Util.RuntimeOptions({});
//域名解主程序
const analysisRecords = async function () {
    let params = config.param;
    for (let param of params) {
        try {
            let describeDomainRecordsRequest = new Alidns20150109.DescribeDomainRecordsRequest({
                keyWord: param.RRKeyWord,
                domainName: param.DomainName,
            });
            let res = await aliClient.describeDomainRecordsWithOptions(describeDomainRecordsRequest, runtime)
            const record = res.body.domainRecords.record[0]
            if (record) {
                if (privateIp&&record.value !== privateIp) {
                    dnsLog(param, "解析存在，IP变化，进行修改")
                    let updateDomainRecordRequest = new Alidns20150109.UpdateDomainRecordRequest({
                        recordId: record.recordId,
                        RR: record.RR,
                        type: param.Type,
                        value: privateIp,
                        priority: param.Priority
                    });
                    await aliClient.updateDomainRecordWithOptions(updateDomainRecordRequest, runtime)
                    dnsLog(param, "解析修改成功")
                } else {
                    dnsLog(param, "解析存在，IP未变，无需更新！")
                }
            } else if(privateIp){
                dnsLog(param, "解析不存在，进行添加")
                let addDomainRecordRequest = new Alidns20150109.AddDomainRecordRequest({
                    domainName: param.DomainName,
                    RR: param.RRKeyWord,
                    type: param.Type,
                    value: privateIp,
                    priority: param.Priority
                });
                await aliClient.addDomainRecordWithOptions(addDomainRecordRequest, runtime)
                dnsLog(param, "解析添加成功")
            }
        } catch (err) {
            dnsLog(param, `解析失败，${err.message}`)
        }
    }
};

const dnsLog = function (param, msg) {
    console.log(`${new Date()}：域名[${param.Type},${param.RRKeyWord},${param.Priority},${param.DomainName}]，${msg}`);
}

//获取ip地址
exports.getIp = function (success) {
    request(config.global.ipaddressUrl, async function (error, response, body) {
        body = body?.replace('\n', '');
        privateIp = body;
        success && await success(body);
    });
};
//域名解析
exports.analysisDns = async function () {
    await analysisRecords();
};