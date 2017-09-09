# mtDNS
定时获取ip，然后到阿里云去解析dns
# 关于配置文件config.json
`{
    "gobal": {
        "apiAddress": "https://alidns.aliyuncs.com",
        "ipaddressUrl": "http://www.yxxrui.cn/yxxrui_cabangs_api/myip.ashx",
        "AccessKeyId":"wmyAKvF6abTlx9Co",
        "AccessKeySecret":"zhKrHEfuUzvdN3xoBTc0bNZUg06SjF"
},
    "param":{
        "Action":"UpdateDomainRecord",
        "RecordId":"3541041362684928",
        "RR":"www",
        "Type":"A",
        "Value":"",
        "Priority":1
    }
}
`
