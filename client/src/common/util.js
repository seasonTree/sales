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
 * 
 * @param {Object | Array} data 要复制的数据
 * 
 * @return 返回复制后的数据
 */
export const deepClone = (data) => {
    var o,
        ostr = Object.prototype.toString;

    if (ostr.call(data) == '[object String]') {
        o = {};

        for(var i in data){
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
 * 
 * @return Array, 返回树的结构
 */
export const buildTree = (data, idField, parentID) => {

    let _data = deepClone(data),
        rdata = [];

    _data.forEach((item) => {
        if(item[idField] == parentID){
            item.children = buildTree(data, idField, item[idField]);            
            rdata.push(item);
        }
    });

    return rdata;
}