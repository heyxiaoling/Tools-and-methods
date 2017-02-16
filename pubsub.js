'use strict';
/**
 * 发布/订阅公共函数库
 * @datetime 2015-12-02
 * subscribe('start_drag_widget', (x) => console.log('一个方法' + x ));
 * publish('start_drag_widget', 10); // 发布消息：开始拖放
 * 
 */

const _SUBSCRIBER_STORE_ = {lastID:0};  // 消息订阅仓储

/**
 * 订阅消息
 * @param    {string}   topic 所订阅消息名称
 * @param    {function} func  当所订阅消息发布时callback
 * @return   {integer}        返回唯一的订阅号，可用于取消订阅
 */
export const subscribe = (topic, func) => {
    let id = ++_SUBSCRIBER_STORE_.lastID;
    if (topic==='lastID') {
        throw new Error('"lastID" is a reserved word!');
    }
    if (typeof func!=='function') {
        --_SUBSCRIBER_STORE_.lastID;
        return 0;
    }
    if (!Array.isArray(_SUBSCRIBER_STORE_[topic])) {
        _SUBSCRIBER_STORE_[topic] = [];
    }
    _SUBSCRIBER_STORE_[topic].push({id:id, func:func});
    return id;
};

/**
 * 取消订阅
 * @param    {integer} id   订阅id，在订阅时获得
 * @return   {boolean}      成功返回true，失败返回false
 */
export const unsubscribe = (id) => {
    for (let t in _SUBSCRIBER_STORE_) {
        if (t==='lastID' || !Array.isArray(_SUBSCRIBER_STORE_[t])) {
            continue;
        }
        for (let i in _SUBSCRIBER_STORE_[t]) {
            if (_SUBSCRIBER_STORE_[t][i].id === id) {
                _SUBSCRIBER_STORE_[t].splice(i, 1);
                return true;
            }
        }
    }
    return false;
};

/**
 * 发布消息
 * @param    {string}   topic   消息名称
 * @param    {rest}     ...args 参数列表，可根据需要传入无限个参数
 * @return   {integer}          返回该消息的订阅数量（送达数量）
 */
export const publish = (topic, ...args) => {
    if (Array.isArray(_SUBSCRIBER_STORE_[topic])) {
        console.log(topic);
        _SUBSCRIBER_STORE_[topic].forEach(function(sub){
            sub.func(...args);
        });
        return _SUBSCRIBER_STORE_[topic].length;
    } else {
        return 0;
    }
};