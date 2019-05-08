# mtDNS
![tag](https://img.shields.io/github/tag/meterXu/mtDNS.svg) 
定时 **(每一分钟的第30秒)** 获取ip，然后到阿里云去解析dns
# 关于配置文件config.json
## 每个配置节点说明
* apiAddress 阿里云解析api地址，**无需更改**
* ipaddressUrl 获取外网ip的地址，**无需更改**
* AccessKeyId 阿里云平台AccesskeyId [关于AccessKey的获取](https://ak-console.aliyun.com/?spm=5176.7926440.772176.4.78343fb6U1MI7A#/accesskey)
* AccessKeySecret 阿里云平台AccessKeySecret [关于AccessKeySecret的获取](https://ak-console.aliyun.com/?spm=5176.7926440.772176.4.78343fb6U1MI7A#/accesskey)
* DomainName 域名，**设置为自己的域名**
* RRKeyWord **设置需要解析的子域名**
* Type 解析记录类型格式 [参考网站](https://help.aliyun.com/document_detail/29805.html?spm=5176.doc29774.2.1.2IvBqd)
* Priority 解析优先级 **按需修改**
