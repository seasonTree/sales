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