/**
 * Created by focus on 2017/4/26.
 */

let fetch = require('node-fetch');

function Req(config) {
    this.serverUrl = (config && config.serverUrl) || ""
}

Req.objToUrl=function (obj,encode=false) {
    let strAry = [];
    for (let k in obj) {
        if(encode){
            strAry.push(encodeURIComponent(k) + "=" + encodeURIComponent(obj[k]));
        }else{
            strAry.push(k+"="+obj[k])
        }
    }
    return strAry.join("&");
},

Req.prototype = {
    //完整地址正则
    urlReg: /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/,

    /**
     * Obj转为param
     * @param obj
     * @returns {string}
     */

    objToUrl: function (obj,encode=false) {

        let strAry = [];
        for (let k in obj) {
            if(encode){
                strAry.push(encodeURIComponent(k) + "=" + encodeURIComponent(obj[k]));
            }else{
                strAry.push(k+"="+obj[k])
            }
        }
        return strAry.join("&");
    },

    /**
     * 构建Url
     * 如果为完整地址 则返回完整地址
     * 如果为非完整地址 则返回serverUrl+传入的地址
     * @param url
     * @returns {*}
     */
    constructUrl: function (url) {
        if (this.urlReg.test(url)) {
            return url;
        }
        return this.serverUrl + url;
    },

    /**
     * 获取传入url的query信息
     * @param url
     * @param query
     * @returns {null}
     */
    getQuery: function (url, query) {
        let reg = new RegExp("(^|&)" + query + "=([^&]*)(&|$)");
        let r = url.split("?").splice(1).join("").match(reg);
        if (r != null)return unescape(r[2]);
        return null;
    },

    /**
     * 获取返回的所有头部信息
     * @param resHeaders
     * @returns {{}}
     */
    getHeaders: function (resHeaders) {
        let headers = {};
        resHeaders.forEach(function (value, name) {
            headers[name] = value;
        });
        return headers;
    },


    /**
     * 处理后台返回的数据
     * 非字符串 直接返回
     * 字符串序列化之后返回
     * 如果序列化失败,返回原数据
     * @param str
     * @returns {*}
     */
    parse: function (str) {
        let temObj;
        if (typeof str === "string") {
            try {
                temObj = JSON.parse(str);
            } catch (err) {
                temObj = str;
            }
            return temObj;
        } else {
            return str;
        }
    },

    /**
     * 发起请求
     * @param reqUrl
     * @param init
     * @returns {*|Promise.<TResult>}
     */
    req: function (reqUrl, init) {
        let self = this;
        return fetch(reqUrl, init).then(function (res) {
            let headers = self.getHeaders(res.headers);
            return res.text().then(function (body) {
                if (200 <= res.status && res.status <= 299) {
                    return Promise.resolve({
                        status: res.status,
                        statusText: res.statusText,
                        body: self.parse(body),
                        headers: headers
                    })
                } else {
                    return Promise.reject({
                        status: res.status,
                        statusText: res.statusText,
                        body: self.parse(body),
                        headers: headers
                    })
                }
            })
        })
    },


    /**
     * fetch reqOption 返回请求配置信息
     * @param method
     * @param body
     * @returns {{method: (*|string), headers: {Content-Type: string}, credentials: string, body: *}}
     */
    reqInit: function (method, body) {
        return {
            method: method || "POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            },
            credentials: 'same-origin',
            body: body ? this.objToUrl(body) : ""
        }
    },


    /**
     * fetch 发起Post请求
     * @param url
     * @param body
     */
    post: function (url, body) {
        url = this.constructUrl(url);
        return this.req(url, this.reqInit("POST", body));
    },

    /**
     * fetch发起get请求
     * @param url
     * @param body
     */
    get: function (url, body) {
        url = this.constructUrl(url);
        let bodyStr = this.objToUrl(body);
        if (url.indexOf("?") > -1) {
            url = url + bodyStr;
        } else {
            url = url + "?" + bodyStr;
        }
        return this.req(url, this.reqInit("GET", body));
    },


};

module.exports=Req;
