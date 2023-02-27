exports.config = {
    "global": {
        "apiAddress": "https://alidns.aliyuncs.com",
        "ipaddressUrl": "https://ip.isaacxu.com/api/ip",
        "AccessKeyId":process.env.AccessKeyId,
        "AccessKeySecret":process.env.AccessKeySecret,
        "DomainName":process.env.DomainName
    },
    "param":[{
        "RRKeyWord":"server",
        "Type":"A",
        "Priority":1
    },{
        "RRKeyWord":"ngrok",
        "Type":"A",
        "Priority":1
    }]
}