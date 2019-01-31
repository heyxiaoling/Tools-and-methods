/**
 * [Msg description]
 * @param {[type]} options [description]
 * 弹窗
 * 
 * type,'confirm' 确认取消弹出框,'alert' 弹出确认框
 * title:'',       //标题文字
 * text :'',       //内容文字
 * btnOkText : '确定',   //按钮文字
 * btnNoText : '取消',   //按钮文字
 * maskbtn : true,     //是否显示遮罩
 * auto_close:false,   //自动消失
 * success:function(){}, //成功回调函数
 * failed:function(){} //失败回调函数
 *
 */

/*css*/

/*
.dialog{}
.dialog .dialog-mask{position:fixed;z-index:1000;width:100%;height:100%;top:0;left:0;background-color:rgba(62,62,62,0.8);}
.dialog .dialog-msg{width:85%;top:50%;left:50%;position:fixed;z-index:5000;overflow:hidden;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%);background-color:#fafafc;text-align:center;border-radius:3px;}
.dialog-msg .dialog-title{padding:1.2em 20px .5em;}
.dialog-msg .dialog-title .dialog-title-content{font-weight:400;font-size:17px;}
.dialog-msg .dialog-msg-content{padding:0 20px;text-align:center;font-size:15px;color:#888;word-wrap:break-word;word-break:break-all;}
.dialog-msg .dialog-bottom{margin-top:20px;position:relative;line-height:42px;font-size:17px;display:-webkit-box;display:-webkit-flex;display:flex;}
.dialog-bottom:after{content:" ";position:absolute;left:0;top:0;width:100%;height:1px;border-top:1px solid #d5d5d6;color:#d5d5d6;-webkit-transform-origin:0 0;transform-origin:0 0;-webkit-transform:scaleY(.5);transform:scaleY(.5);}
.dialog-msg .dialog-bottom span{position:relative;}
.dialog-bottom span{display:block;-webkit-box-flex:1;-webkit-flex:1;flex:1;color:#333;text-decoration:none;-webkit-tap-highlight-color:rgba(0,0,0,0);}

*/

/**
 * msg({
 *     type,'confirm' 确认取消弹出框,'alert' 弹出确认框
 *     title:'',       //标题文字
        text :'',       //内容文字
        btnOkText : '确定',   //按钮文字
        btnNoText : '取消',   //按钮文字
        maskbtn : true,     //是否显示遮罩
        auto_close:false,   //自动消失
        success:function(){}, //成功回调函数
        failed:function(){} //失败回调函数
 * })
 */

class Msg {
    constructor(options) {
        Object.assign(this, {
            type:'confirm',
            title:'',       
            text :'',       
            btnOkText : '确定',   
            btnNoText : '取消',   
            maskbtn : true,     
            auto_close:false,
            autoCloseTime: 500,  
            success:function(){},
            failed:function(){}
        },options);

        this.init();
    }
}

Msg.prototype.init=function(){
    let doc = document,
        bd =  doc.body,
        dialogExist = doc.querySelector('#dialog');

    let dialog = '<div class="dialog" id="dialog">'
                    +'<div class="dialog-mask" id="dialog-mask" name="dialog-mask"></div>'
                    +'<div name="dialog-msg" class="dialog-msg" id="dialog-msg"></div>'
                +'</div>',
                dialogMsgTitle = '<div class="dialog-title"><strong class="dialog-title-content">'+this.title+'</strong></div>',
                dialogMsgContent = '<div class="dialog-msg-content">'+this.text+'</div>';


    if(dialogExist){
        return false;
    }

    bd.insertAdjacentHTML('beforeEnd', dialog);

    this.dialog = doc.querySelector('#dialog');
    this.dialogMsg = this.dialog.querySelector('#dialog-msg');

    this.dialogMsg.insertAdjacentHTML('beforeEnd', dialogMsgTitle);
    this.dialogMsg.insertAdjacentHTML('beforeEnd', dialogMsgContent);

    switch(this.type){
        case "confirm":
            //确认框
            this.confirm();
            break;
        case "alert":
            //警告框
            this.alert();
            break;
        case "autoClose":
            this.autoClose();
            break;
        default:
            //警告框
            this.alert();
            break;
    }
}

Msg.prototype.confirm=function(){
    let dialogMsgBottom = '<div class="dialog-bottom">'
                            +'<a href="javascript:;" class="dialog-bottom-cancel">'+this.btnNoText+'</a>'
                            +'<a href="javascript:;" class="dialog-bottom-sure">'+this.btnOkText+'</a>'
                        +'</div>';

    this.dialogMsg.insertAdjacentHTML('beforeEnd', dialogMsgBottom);
    this.handlerSuccess();
    this.handlerFailed();
}
Msg.prototype.alert=function(){
    let dialogMsgBottom = '<div class="dialog-bottom">'
                            +'<a href="javascript:;" class="dialog-bottom-sure">'+this.btnOkText+'</a>'
                        +'</div>';
    this.dialogMsg.insertAdjacentHTML('beforeEnd', dialogMsgBottom);
    this.handlerSuccess();
}

Msg.prototype.autoClose=function(){
    var _this = this;
    var dialogMsgBottom = '<div class="dialog-bottom">'
                            +'<span href="javascript:;" class="dialog-bottom-sure"></span>'
                        +'</div>';
    _this.dialogMsg.insertAdjacentHTML('beforeEnd', dialogMsgBottom);
    setTimeout(function(){
        _this.hide();
    },_this.autoCloseTime);
}


Msg.prototype.handlerSuccess=function(){
    var _this=this;
    _this.dialogMsg.querySelector('.dialog-bottom-sure').addEventListener('click',function(event){
        var event=event||window.event;

        if(event.stopPropagation){
            event.stopPropagation();
        }else{
            event.cancelBulle=true;
        }

        if(_this.success &&  Object.prototype.toString.call(_this.success) == "[object Function]"){
            _this.success.call(this,_this,dialog);
        }

        setTimeout(function(){
            _this.hide();
        },300);

    },false);
}

Msg.prototype.handlerFailed=function(){
    var _this=this;
    _this.dialogMsg.querySelector('.dialog-bottom-cancel').addEventListener('click',function(event){
        var event=event||window.event;
        if(event.stopPropagation){
            event.stopPropagation();
        }else{
            event.cancelBulle=true;
        }
        if(_this.failed && Object.prototype.toString.call(_this.failed) == "[object Function]"){
            _this.failed.call(this,_this.dialog);
        }
        setTimeout(function(){
            _this.hide();
        },300);
    },false);
}


Msg.prototype.hide=function(){
    var _this = this;
    _this.dialog.parentNode.removeChild(_this.dialog);
    _this.canmove();
}

Msg.prototype.nomove=function(){
    var _this=this;
    document.addEventListener('touchmove',function(event){
        _this.move(event);
    },false);
    document.body.style.overflow = "hidden";
}
Msg.prototype.move=function(evnet){
    var event=event||window.event;
    event.preventDefault();
    event.cancelBubble = true;
}

Msg.prototype.canmove=function(){
    var _this=this;
    document.removeEventListener('touchmove',function(event){
        _this.move(event);
    },false);
    document.body.style.overflow = "auto";
}

const msg = (options = {}) =>{
    let m = new Msg(options);
    return m;
}

export default msg;
