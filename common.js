(function(window,undefine){
    var client = function () {//检测各种版本
        var engine = {
            //呈现引擎
            ie: 0,
            gecko: 0,
            webkit: 0,
            khtml: 0,
            opera: 0,
            //具体版本号
            ver: null
        };
        var browser = {
            //浏览器
            ie: 0,
            firefox: 0,
            konq: 0,
            opera: 0,
            chrome: 0,
            safari: 0,
            //具体版本号
            ver: null
        };
        var system = {
            win: false,
            mac: false,
            x11: false,
            //移动设备
            iphone: false,
            ipod: false,
            ipad: false,
            ios: false,
            android: false,
            nokiaN: false,
            winMobile: false,
            //游戏系统
            wii: false,
            ps: false
        };
        //检测呈现引擎和浏览器
        var ua = navigator.userAgent;
        if(window.opera){
            engine.ver = browser.ver = window.opera.version();
            engine.opera = browser.opera = parseFloat(engine.ver);
        }else if(/AppleWebKit\/(\s+)/.test(ua)){
            engine.ver = RegExp["$1"];
            engine.webkit = parseFloat(engine.ver);
            //确定是chrome还是safari
            if(/Chrome\/(\s+)/.test(ua)){
                browser.ver = RegExp["$1"];
                browser.chrome = parseFloat(engine.ver);
            }else if(/Version\/(\s+)/.test(ua)){
                browser.ver = RegExp["$1"];
                browser.safari = parseFloat(engine.ver);
            }else{
                //近似的确定版本号
                var safariVersion = 1;
                if(engine.webkit<100){
                    safariVersion = 1;
                }else if(engine.webkit<312){
                    safariVersion = 1.2;
                }else if(engine.webkit<412){
                    safariVersion = 1.3;
                }else{
                    safariVersion = 2;
                }
                browser.safari = browser.ver = safariVersion;
            }
        }else if(/KHTML\/(\s+)/.test(ua)||/Konqueror\/([^;]+)/.test(ua)){
            engine.ver = browser.ver = RegExp(["$1"]);
            engine.khtml = browser.konq = parseFloat(engin.ver);
        }else if(/rv:([^\)]+)\) Gecko\/\d{8}/.test(ua)){
            engine.ver = RegExp(["$1"]);
            engine.khtml = parseFloat(engin.ver);
            //确定是不是火狐
            if(/Firefox\/(\s+)/.test(ua)){
                browser.ver= RegExp(["$1"]);
                browser.firefox = parseFloat(browser.ver);
            }
        }else if(/MSIE ([^;]+)/.test(ua)){
            engine.ver = browser.ver = RegExp(["$1"]);
            engine.ie = browser.ie = parseFloat(engin.ver);
        }
        /*
            使用方法
            if(client.engine.webkit){
                if(client.browser.chrome){
                    //执行针对chrome的代码
                }else if(client.browser.safari){
                    //执行针对safari的代码
                }
            }else if(client.engine.gecko){
                if(client.browser.firefox){
                    //执行针对firefox的代码
                }else{
                    //执行针对其他Gecko浏览器的的代码
                }
            }
        
        */
        //检测浏览器
        browser.ie = engine.ie;
        browser.opera = engine.opera;
        //在此检测呈现引擎、平台设备
        return {
            engine: engine,
            browser: browser,
            system: system
        };
    }();
    var EventUtil = {
        addHandler: function(element,type,handler){
          if(element.addEventListener){
            //firefox
            element.addEventListener(type,handler,false);
          }else if(element.attachEvent){
            //ie
            element.attachEvent('on'+type,handler);
          }else{
            element['on'+type] = handler;
          }
        },
        removeHandler: function(element,type,handler){
          if(element.removeEventListener){
            //firefox
            element.removeEventListener(type,handler,false);
          }else if(element.detachEvent){
            //ie
            element.detachEvent('on'+type,handler);
          }else{
            element['on'+type] =null;
          }
        },
        getEvent: function(event){
          return event?event:window.event;
        },
        getTarget: function(event){
          return event.target||event.srcElement;
        },
        preventDefault: function(event){//取消默认行为
          if(event.preventDefault){
            event.preventDefault();
          }else{
            event.returnValue=false;
          }
        },
        stopPropagation: function(event){//阻止冒泡
          if(event.stopPropagation){
            event.stopPropagation();
          }else{
            event.cancelBulle=true;
          }
        },
        getWheelDelta: function(event){//鼠标滚轮
          if(event.wheelDelta){
            /*
              ie,opera,chrome,safrari,支持mousewheel,当用户向前滚动时，wheelDelta是120的倍数，乡侯滚动时是-120的倍数。
              在Opera9.5之前的版本，wheelDelta值得正负号是相反的。
              firefox支持DOMMouseScroll,用户向前滚动时，detail的值是-3的倍数，用户向后滚动时，这个值是3的倍数。
              
              使用方法：
                function handleMouseWheel(event){
                  event=EventUtil.getEvent(event);
                  var delta=EeventUtil.getWheelDelta(event);
                  alert(delta);
                }
                
                EventUtil.addHandler(document,'mousewheel',handleMouseWheel);
                EventUtil.addHandler(document,'DOMMouseScroll',handleMouseWheel);
              
            */
            return (client.engine.opera&&client.engine.opera<9.5?-event.wheelDelta:event.wheelDelta);
          }else{
            return -event.detail*40;
          }
        }
    }

 window.EventUtil=EventUtil;
})(window)
