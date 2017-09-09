var main = require("./main");
var config = require('./config');
let schedule = require("node-schedule");
var saveIp;

/**
 * 循环执行，判断ip是否变化，ip变化则解析域名,默认每分钟的第30秒触发
 */
schedule.scheduleJob("30 * * * * *", function () {
    watchIpChange();
});

function watchIpChange() {
    try {
        //获取ip地址
        main.getIp(function (ip) {

            if (saveIp != ip) {
                saveIp = ip;
                console.log(new Date() + "：开始域名解析")
                main.analysisDns();
            } else {
                console.log(new Date() + "：IP未变化不解析域名")
            }
        });
    }
    catch (e) {
        //ingore
    }
}


