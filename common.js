;(function(window,undefine){
    var client = function(){
    	//呈现引擎
    	var engine = {
    		ie: 0,
    		gecko: 0,
    		webkit: 0,
    		khtml: 0,
    		opera: 0,
    		//完整的版本号
    		ver: null
    	};
    	//浏览器
    	var browser = {
    		//主要浏览器
    		ie: 0,
    		firefox: 0,
    		safari: 0,
    		konq: 0,
    		opera: 0,
    		chrome: 0,
    		//具体的版本号
    		ver: null
    	};
    	//平台、设备和操作系统
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
    	}else if(/AppleWebKit\/(\S+)/.test(ua)){
    		engine.ver = RegExp["$1"];
    		engine.webkit = parseFloat(engine.ver);
    		//确定是 Chrome 还是 Safari
    		if(/Chrome\/(\S+)/.test(ua)){
    			browser.ver = RegExp["$1"];
    			browser.chrome = parseFloat(browser.ver);
    		}else if(/Version\/(\S+)/.test(ua)){
    			browser.ver = RegExp["$1"];
    			browser.safari = parseFloat(browser.ver);
    		}else{
    			//近似地确定版本号
    			var safariVersion = 1;
    			if(engine.webkit < 100){
    				safariVersion = 1;
    			}else if(engine.webkit < 312){
    				safariVersion = 1.2;
    			}else if(engine.webkit < 412){
    				safariVersion = 1.3;
    			}else{
    				safariVersion = 2;
    			}
    			browser.safari = browser.ver = safariVersion;
    		}
    	}else if(/KHTML\/(\S+)/.test(ua) || /Konqueror\/([^;]+)/.test(ua)){
    		engine.ver = browser.ver = RegExp["$1"];
    		engine.khtml = browser.konq = parseFloat(engine.ver);
    	}else if(/rv:([^\)]+)\) Gecko\/\d{8}/.test(ua)){
    		engine.ver = RegExp["$1"];
    		engine.gecko = parseFloat(engine.ver);
    		//确定是不是 Firefox
    		if(/Firefox\/(\S+)/.test(ua)){
    			browser.ver = RegExp["$1"];
    			browser.firefox = parseFloat(browser.ver);
    		}
    	}else if(/MSIE ([^;]+)/.test(ua)){
    		engine.ver = browser.ver = RegExp["$1"];
    		engine.ie = browser.ie = parseFloat(engine.ver);
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
    	//检测平台
    	var p = navigator.platform;
    	system.win = p.indexOf("Win") == 0;
    	system.mac = p.indexOf("Mac") == 0;
    	system.x11 = (p == "X11") || (p.indexOf("Linux") == 0);
    	//检测 Windows 操作系统
    	if(system.win){
    		if(/Win(?:dows )?([^do]{2})\s?(\d+\.\d+)?/.test(ua)){
    			if(RegExp["$1"] == "NT"){
    				switch(RegExp["$2"]){
    					case "5.0":
    					system.win = "2000";
    					break;
    					case "5.1":
    					system.win = "XP";
    					break;
    					case "6.0":
    					system.win = "Vista";
    					break;
    					case "6.1":
    					system.win = "7";
    					break;
    					default:
    					system.win = "NT";
    					break;
    				}
    			}else if(RegExp["$1"] == "9x"){
    				system.win = "ME";
    			}else{
    				system.win = RegExp["$1"];
    			}
    		}
    	}
    	//移动设备
    	system.iphone = ua.indexOf("iPhone") > -1;
    	system.ipod = ua.indexOf("iPod") > -1;
    	system.ipad = ua.indexOf("iPad") > -1;
    	system.nokiaN = ua.indexOf("NokiaN") > -1;
    	//windows mobile
    	if (system.win == "CE"){
    		system.winMobile = system.win;
    	}else if(system.win == "Ph"){
    		if(/Windows Phone OS (\d+.\d+)/.test(ua)){;
    			system.win = "Phone";
    			system.winMobile = parseFloat(RegExp["$1"]);
    		}
    	}
    	//检测 iOS 版本
    	if(system.mac && ua.indexOf("Mobile") > -1){
    		if(/CPU (?:iPhone )?OS (\d+_\d+)/.test(ua)){
    			system.ios = parseFloat(RegExp.$1.replace("_", "."));
    		}else{
    			system.ios = 2; //不能真正检测出来，所以只能猜测
    		}
    	}
    	//检测 Android 版本
    	if(/Android (\d+\.\d+)/.test(ua)){
    		system.android = parseFloat(RegExp.$1);
    	}
    	/*	
    		if(client.system.win){
    			if(client.system.win == "XP") {
    				//说明是 XP
    			}else if(client.system.win == "Vista"){
    				//说明是 Vista
    			}
    		}
    		if(client.engine.webkit){
    			if (client.system.iOS){
    				//iOS 手机的内容
    			}else if(client.system.android){
    				//Android 手机的内容
    			}else if(client.system.nokiaN){
    				//诺基亚手机的内容
    			}
    		}
    		//windows mobile
    		if(system.win == "CE"){
    			system.winMobile = system.win;
    		}else if(system.win == "Ph"){
    			if(/Windows Phone OS (\d+.\d+)/.test(ua)){;
    				system.win = "Phone";
    				system.winMobile = parseFloat(RegExp["$1"]);
    			}
    		}
    	*/
    	//游戏系统
    	system.wii = ua.indexOf("Wii") > -1;
    	system.ps = /playstation/i.test(ua);
    	//返回这些对象
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
