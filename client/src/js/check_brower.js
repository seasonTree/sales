// 获取当前浏览器名 及 版本号
function appInfo() {
    var browser = {
            appname: 'unknown',
            version: 0
        },
        userAgent = window.navigator.userAgent.toLowerCase(); // 使用navigator.userAgent来判断浏览器类型
    //msie,firefox,opera,chrome,netscape  
    if (/(msie|firefox|opera|chrome|netscape)\D+(\d[\d.]*)/.test(userAgent)) {
        browser.appname = RegExp.$1;
        browser.version = RegExp.$2;
    } else if (/version\D+(\d[\d.]*).*safari/.test(userAgent)) { // safari  
        browser.appname = 'safari';
        browser.version = RegExp.$2;
    }
    return browser;
}

console.log('aaa');

let browser = appInfo(),
    name = browser.appname,
    isIE = browser.indexOf('msie');

if(isIE){
    window.location.replace('index/browserChoose');
}