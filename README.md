# mtDNS
定时 *(每一分钟的第30秒)* 获取ip，然后到阿里云去解析dns
# 关于配置文件config.json
## 每个配置节点说明
* apiAddress 阿里云解析api地址，*无需更改*
* ipaddressUrl 请求外网ip的地址，*无需更改*
* AccessKeyId 阿里云平台AccesskeyId [关于AccessKey的获取](https://ak-console.aliyun.com/?spm=5176.7926440.772176.4.78343fb6U1MI7A#/accesskey)
* AccessKeySecret 阿里云平台AccessKeySecret [关于AccessKeySecret的获取](https://ak-console.aliyun.com/?spm=5176.7926440.772176.4.78343fb6U1MI7A#/accesskey)
* Action 更新域名的方法，默认，*无需更改*
* RecordId 域名记录id，请先在[阿里云域名控制台](https://dc.aliyun.com/tcparse/dns.htm?init=false&dtoken=h4PcCqPaV9GM15DS)中添加一个域名,然后按F12查看该条记录的*rr-id*
* RR 主机名
* Type 解析记录类型格式[参考网站](https://help.aliyun.com/document_detail/29805.html?spm=5176.doc29774.2.1.2IvBqd)
* Priority 解析优先级 *无需更改*
