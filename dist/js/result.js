webpackJsonp([15],{

/***/ 11:
/***/ (function(module, exports, __webpack_require__) {

/**
 * Created by jasen on 2017/10/2.
 */
__webpack_require__(12);

/***/ }),

/***/ 12:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 56:
/***/ (function(module, exports, __webpack_require__) {

/**
 * Created by jasen on 2017/10/10.
 */

__webpack_require__(57);
__webpack_require__(11);

var $   = __webpack_require__(1);
var _mm = __webpack_require__(0);

var result = {
    //页面配对数据信息
    data : {
        "register"      : {
            "name" : "s秒后自动跳转到登陆页面",
            "href" : "./user-login.html"
        },
        "addcart"      : {
            "name" : "s秒后自动跳转到首页",
            "href" : "./index.html"
        },
        "deletOrder"      : {
            "name" : "s秒后自动跳转到订单列表页面",
            "href" : "./order-list.html"
        },
        "default"      : {
            "name" : "s秒后自动跳转到首页",
            "href" : "./index.html"
        },
        "pass-reset"      : {
            "name" : "s秒后自动跳转到个人中心页面",
            "href" : "./user-center.html"
        }
    },
    init        : function(){
        this.bindEvent();
    },
    bindEvent   : function(){
        //获取地址type值进行相对显示
        var type     = _mm.getUrlParam( 'type' ) || "default",
            $element = $('.' + type + '-success');

        $element.show();
        //开启定时器根据页面数据跳转指定页面
        this.timer( '.'+type+'-setTimer', type );
    },
    //定时器逻辑
    timer       : function( $element , type ){
        var num = 7;
        var time = '';
        var data = this.pairData(type);
        $($element).text( num+data.name );
        time = setInterval(function(){
            num--;
            $($element).text( num+data.name );
            if( num === 0 ){
                clearInterval(time);
                window.location.href = data.href
            }
        },1000)
    },
    //数据配对逻辑
    pairData    : function( type ){
        var data = this.data;
        for( var i in data ){
            if( type === i ){
                return data[i]
            }
        }
    }
};

$(function(){
    result.init();
});


/***/ }),

/***/ 57:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })

},[56]);