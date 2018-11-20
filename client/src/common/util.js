import sha1 from './sha1';

/**
 * @param {boolean} separator 是否添加分隔符
 * 
 * @return {string} 生成
 */
export const guid = (separator) => {
    var guid = "";
    for (var i = 1; i <= 32; i++) {
        var n = Math.floor(Math.random() * 16.0).toString(16);
        guid += n;

        if (separator && ((i == 8) || (i == 12) || (i == 16) || (i == 20))) {
            guid += "-";
        }
    }
    return guid.toLocaleLowerCase();
}

/**
 * @param {Object | Array} data 要复制的数据
 * 
 * @return 返回复制后的数据
 */
export const deepClone = (data) => {
    var o,
        ostr = Object.prototype.toString;



    if (ostr.call(data) == '[object String]') {
        o = {};

        for (var i in data) {
            o[i] = deepClone(data[i]);
        }

    } else if (ostr.call(data) == '[object Array]') {

        o = [];
        data.forEach((item) => {
            o.push(deepClone(item));
        });

    } else {
        o = data;
    }

    return o;
}

/**
 * 
 * @param {Array} data 要生成树的数据
 * @param {String} idField 当前id的字段名称
 * @param {String | Number} parentID 父节点的值
 * @param {Function} callBack 每行回调方法
 * 
 * @return Array, 返回树的结构
 */
export const buildTree = (data, parentField, idField, parentID, callBack) => {

    let _data = data,
        rdata = [];

    _data.forEach((item) => {

        if (item[parentField] == parentID) {
            item.children = buildTree(_data, parentField, idField, item[idField], callBack);
            rdata.push(item);

            callBack && callBack(item, parentID);
        }
    });

    return rdata;
}

/**
 * 设置cookie
 * 
 * @param {String} name cookie名称
 * @param {String|Number} value cookie值
 * @param {Number} exp 过期时间
 */
export const setCookie = (name, value, exp) => {

    let now = Date.now;

    if (typeof exp == 'number') {
        exp = now.setTime(now + exp);
    } else {
        exp = now.setTime(now + 30 * 24 * 60 * 60 * 1000);
    }

    document.cookie = name + "=" + escape(value) + ";expires=" + (new Date(exp)).toGMTString();
}

/**
 * 获取cookie
 * 
 * @param {String} name 获取cookie的名字
 * 
 * @returns value
 */
export const getCookie = (name) => {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg)) {
        return unescape(arr[2]);
    } else {
        return null;
    }
}

/**
 * 删除cookie
 * 
 * @param {String} name 要删除cookie的名称
 */
export const delCookie = (name) => {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);

    var cval = getCookie(name);
    if (cval != null)
        document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
}

/**
 * 返回上个月的开始和结束日期，date数据格式
 * @return { Object } 
 *          ex: { ltMonStart: 2018-01-01, ltMonEnd: 2018-01-30 }
 */
export const getLtMonth = () => {
    let now = new Date(),
        year = now.getFullYear(),
        month = now.getMonth();

    if (month == 0) {
        month = 12;
        year = year - 1;
    }
    if (month < 10) {
        month = "0" + month;
    }

    let ltData = new Date(year, month, 0);

    return {
        ltMonStart: year + "-" + month + "-" + "01",
        ltMonEnd: year + "-" + month + "-" + ltData.getDate()
    }
}

/**
 * 返回当前月的开始到当前，date数据格式
 * @return { Object }
 *          ex: { monthDayStart: 2018-01-01, monthDayCur: 2018-01-30 }
 */
export const getCurMonthDay = () => {
    let now = new Date(),
        year = now.getFullYear(),
        month = now.getMonth() + 1;

    return {
        monthDayStart: year + "-" + month + "-" + "01",
        monthDayCur: year + "-" + month + "-" + now.getDate()
    }
}

/**
 * 返回当前url params的值
 * @param {String} key 要获取params的key
 * 
 * @returns {String} value
 */
export const getUrlParams = (key) => {
    let URLParams = new Array(),
        params = document.location.search.substr(1).split('&');

    for (var i = 0; i < params.length; i++) {
        var aParam = params[i].split('=');
        URLParams[aParam[0]] = aParam[1];
    }

    let value = null;
    if (URLParams[key]) {
        value = decodeURIComponent(URLParams[key])
    }

    return value;
}

/**
 * 
 * @param {Date} date 要格式的时间
 * @param {String} format 格式的模式
 * 
 * @returns 格式化后的代码
 */
export const formatDate = (date, format) => {

    //判断是否是日期
    if (isNaN(date) || isNaN(Date.parse(date))) {
        return date;
    }

    var o = {
        "M+": this.getMonth() + 1, //月份   
        "d+": this.getDate(), //日   
        "h+": this.getHours(), //小时   
        "m+": this.getMinutes(), //分   
        "s+": this.getSeconds(), //秒   
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度   
        "S": this.getMilliseconds() //毫秒   
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

/**
 * 
 * @param {Date} date 要格式的时间
 * @param {*} format 格式的模式
 * 
 * @returns 格式化后的代码
 */
export const formatUTCDate = (date, format) => {

    //判断是否是日期
    if (isNaN(date) || isNaN(Date.parse(date))) {
        return date;
    }

    var o = {
        "M+": this.getUTCMonth() + 1, //月份   
        "d+": this.getUTCDate(), //日   
        "h+": this.getUTCHours(), //小时   
        "m+": this.getMinutes(), //分   
        "s+": this.getSeconds(), //秒   
        "q+": Math.floor((this.getUTCMonth() + 3) / 3), //季度   
        "S": this.getMilliseconds() //毫秒   
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getUTCFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));

    return fmt;
}

/**
 * 加密api token
 * 
 * @returns {String} value
 */
export const getToken = () => {

    let myDate = new Date(),
        month = myDate.getUTCMonth() + 1,
        time = myDate.getUTCFullYear() + '' + month + '' + myDate.getUTCDate() + '' + myDate.getUTCHours(),
        key = atob(__akey), //webpack打包提供的
        value = sha1(time + key);

    return value;

}