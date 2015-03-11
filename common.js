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
            x11: false
        };
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
