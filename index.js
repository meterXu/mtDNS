const main = require("./dns");
const schedule = require("node-schedule");
let saveIp;

/**
 * 循环执行，判断ip是否变化，ip变化则解析域名,默认每分钟的第30秒触发
 */
console.log(new Date() + "：每30秒开始域名解析,请耐心等待...")
schedule.scheduleJob("*/30 * * * * *", function () {
   watchIpChange();
});
const watchIpChange=function() {
    try {
        //获取ip地址
        main.getIp(function (ip) {
            if (saveIp != ip) {
                saveIp = ip;
                console.log(new Date() + "：获取IP成功，IP："+ip);
                console.log(new Date() + "：开始域名解析");
                main.analysisDns();
            } else {
                console.log(new Date() + "：IP未变化不解析域名");
            }
        });
    }
    catch (e) {
        console.log(new Date() + "：获取IP地址失败");
    }
};


