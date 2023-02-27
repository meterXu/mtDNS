# mtDNS
![tag](https://img.shields.io/github/tag/meterXu/mtDNS.svg)
![license](https://img.shields.io/github/license/meterXu/mtDNS.svg)  
>动态域名解析服务，适用于阿里云购买的域名

![mtDNS](http://7u.isaacxu.com/mtDns.png)

## 支持项
- [x] 实时监控IP变化
- [x] 解析多个域名
- [x] 解析多条域名记录
- [x] 更新解析记录
- [x] 新增解析记录

## 不支持项
- [ ] 解析泛域名

## 快速开始
1. 克隆项目
```
git clone https://github.com/meterXu/mtDNS.git
```
2. 修改配置文件.env.production
3. 开始运行
```javascript
npm install
npm run start
```
## 配置文件.env.production说明
* AccessKeyId 阿里云平台AccesskeyId [关于AccessKey的获取](https://ak-console.aliyun.com/?spm=5176.7926440.772176.4.78343fb6U1MI7A#/accesskey)
* AccessKeySecret 阿里云平台AccessKeySecret [关于AccessKeySecret的获取](https://ak-console.aliyun.com/?spm=5176.7926440.772176.4.78343fb6U1MI7A#/accesskey)
* param 解析配置，JSON字符串数组，格式如下
```json
[{"RRKeyWord":"your_RR","Type":"your_Type","Priority":1,"DomainName":"your_DomainName"}]
```

### 解析配置
> 可添加多个解析记录
* RRKeyWord **设置需要解析的子域名**
* Type 解析记录类型格式 [参考网站](https://help.aliyun.com/document_detail/29805.html?spm=5176.doc29774.2.1.2IvBqd)
* Priority 解析优先级 **按需修改**
* DomainName 需要解析的域名，支持不同域名一起解析

**⚠️ DomainName设置为自己的域名,格式:example.com；不是这种域名：xxx.example.com**

