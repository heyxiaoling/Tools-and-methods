/**
 * [setCookie 设置cookie]
 * @param {[type]} cName  [key值]
 * @param {[type]} value  [value值]
 * @param {[type]} expire [过期时间(天)]
 */
window.setCookie = function(cName,value,expire){
    var expireDate = new Date();
    expireDate.setTime(expireDate.getTime()+expire*24*60*60*1000);
    document.cookie = cName + "=" + escape(value) + ((expire==null) ? "" : ";expires="+expireDate.toGMTString());
}


/**
 * [getCookie 获取cookie]
 * @param  {[type]} cName [key值]
 */
window.getCookie = function(cName){
    var arr = document.cookie.match(new RegExp(["(^| )" , cName , "=([^;]*)(;|$)"].join('')));
    if(arr != null) return unescape(arr[2]); return null;
}


/**
 * [MgSessionSet sessionStorage set]
 * @param  {[type]} key [key值]
 * @param  {[type]} value  [value值]
 */
window.MgSessionSet = function(key, value) {
    window.sessionStorage.setItem(key, value);
}


/**
 * [MgSessionGet sessionStorage get]
 * @param {[type]} key [key值]
 */
window.MgSessionGet = function(key) {
    var result = window.sessionStorage.getItem(key);
    if (result == '' || result == "undefined" || result == "null" || result == null || result == undefined) {
        return '';
    };
    return result;
}


/**
 * [MgLocalSet localStorage set]
 * @param {[type]} key   [key值]
 * @param {[type]} value [value值]
 */
window.MgLocalSet = function(key, value) {
    window.localStorage.setItem(key, value);
}


/**
 * [MgLocalGet localStorage get]
 * @param {[type]} key [key值]
 */
window.MgLocalGet = function(key) {
    var result = window.localStorage.getItem(key);
    if (result == '' || result == "undefined" || result == "null" || result == null || result == undefined) {
        return '';
    };
    return result;
}


/**
 * 获取url参数
 */
function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)","i");
    var r = window.location.search.substr(1).match(reg);
    if (r!=null) {
        return decodeURI(r[2]);
    }
    return null;
}

/**
 * 地图位置定位
 * callback 回调函数，取位置
 * 如：getLocation(function(data){
 *          alert(data);
 *     });
 * 
 */
export const getLocation = (obj) => {
    let locationOBJ=obj || {};

    if (navigator.geolocation){   
        navigator.geolocation.getCurrentPosition(showPosition,showError);   
    }else{     
        Tips({
            'message':'浏览器不支持地理定位。',
        }); 
        locationOBJ.callback('深圳');
    }

    function showError(error){ 
        switch(error.code) {   
            case error.PERMISSION_DENIED:   
                Tips({
                    'message':'定位失败,用户拒绝请求地理定位',
                }); 
                    
                break;   
            case error.POSITION_UNAVAILABLE:   
                Tips({
                    'message':'定位失败,位置信息是不可用',
                });   
                break;   
            case error.TIMEOUT:  
                Tips({
                    'message':'定位失败,请求获取用户位置超时',
                });    
                break;   
            case error.UNKNOWN_ERROR: 
                Tips({
                    'message':'定位失败,定位系统失效',
                });    
                break;   
        }
        locationOBJ.callback('深圳');
    } 
    function showPosition(position){   
        var latlon = position.coords.latitude+','+position.coords.longitude;
        //baidu百度接口  
        var url = "http://api.map.baidu.com/geocoder/v2/?ak=C93b5178d7a8ebdb830b9b557abce78b&callback=renderReverse&location="+latlon+"&output=json&pois=0";
        $.ajax({    
            type: "GET",    
            dataType: "jsonp",    
            url: url,  
            async: false, 
            beforeSend: function(){    
                Tips({
                    'message':'正在定位...',
                }); 
                locationOBJ.callback('深圳');
            },   
            success: function (json) {    
                if(json.status==0){ 
                    locationOBJ.callback(json.result.addressComponent.city.replace("市","")); 
                }else{
                    Tips({
                        'message':'地址位置获取失败',
                    }); 
                    locationOBJ.callback('深圳');
                } 
            },   
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                Tips({
                    'message':'地址位置获取失败',
                }); 
                locationOBJ.callback('深圳');  
            }   
        });    
    }  
}