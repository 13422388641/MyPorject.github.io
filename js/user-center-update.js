webpackJsonp([6],{

/***/ 10:
/***/ (function(module, exports) {

module.exports = "{{#navList}}\r\n<li class=\"navside-item\">\r\n    {{#isActive}}\r\n    <a class=\"link active\" href=''>{{disc}}</a>\r\n    {{/isActive}}\r\n    {{^isActive}}\r\n    <a class=\"link\" href=\"{{href}}\">{{disc}}</a>\r\n    {{/isActive}}\r\n</li>\r\n{{/navList}}";

/***/ }),

/***/ 2:
/***/ (function(module, exports, __webpack_require__) {

/**
 * Created by jasen on 2017/10/2.
 */
var _mm = __webpack_require__(0);

var _user = {
    //注册表单内容提交
    register : function( formData , suc , err ){
        _mm.request({
            url     : _mm.getServerUrl('/user/register.do'),
            medth   : 'POST',
            data    : formData,
            success : suc,
            error   : err
        })
    },
    //用户名注册验证
    checkUsername : function( checkData , suc , err ){
        _mm.request({
            url     : _mm.getServerUrl('/user/check_valid.do'),
            medth   : 'POST',
            data    : checkData,
            success : suc,
            error   : err
        })
    },
    //找回密码-用户名验证
    passResetUsername : function(data , suc , err ){
        _mm.request({
            url     : _mm.getServerUrl('/user/forget_get_question.do'),
            medth   : 'POST',
            data    : data,
            success : suc,
            error   : err
        })
    },
    //找回密码-用户名验证
    passResetAnswer : function(data , suc , err ){
        _mm.request({
            url     : _mm.getServerUrl(' /user/forget_check_answer.do'),
            medth   : 'POST',
            data    : data,
            success : suc,
            error   : err
        })
    },
    //找回密码-用户名验证
    newPass         : function(data , suc , err ){
        _mm.request({
            url     : _mm.getServerUrl(' /user/forget_reset_password.do'),
            medth   : 'POST',
            data    : data,
            success : suc,
            error   : err
        })
    },
    //获取用户信息
    getUserInfo     : function( suc , err ){
        _mm.request({
            url     : _mm.getServerUrl('/user/get_information.do'),
            medth   : 'POST',
            success : suc,
            error   : err
        })
    },
    //登陆
    login : function(formValue , suc , err ){
        _mm.request({
            url     : _mm.getServerUrl('/user/login.do'),
            medth   : 'POST',
            data    : formValue,
            success : suc,
            error   : err
        })
    },
    //登出
    logout : function( suc , err ){
        _mm.request({
            url     : _mm.getServerUrl('/user/logout.do'),
            medth   : 'POST',
            success : suc,
            error   : err
        })
    },
    //检查登陆状态
    checkLogin : function( suc , err ){
        _mm.request({
            url     : _mm.getServerUrl('/user/get_user_info.do'),
            medth   : 'POST',
            success : suc,
            error   : err
        })
    },
    //登陆
    userUpdate : function(data , suc , err ){
        _mm.request({
            url     : _mm.getServerUrl('/user/update_information.do'),
            medth   : 'POST',
            data    : data,
            success : suc,
            error   : err
        })
    },
    //登陆
    userPassUpdate : function(data , suc , err ){
        _mm.request({
            url     : _mm.getServerUrl('/user/reset_password.do'),
            medth   : 'POST',
            data    : data,
            success : suc,
            error   : err
        })
    }
};

module.exports = _user ;

/***/ }),

/***/ 3:
/***/ (function(module, exports, __webpack_require__) {

/**
 * Created by jasen on 2017/10/2.
 */
__webpack_require__(5);

var $       = __webpack_require__(1);
var _mm     = __webpack_require__(0);
var _user   = __webpack_require__(2);
var _cart   = __webpack_require__(4);

//导航
var nav = {
    init        : function(){
        this.bindEvent();
        this.loadUserInfo();
        this.loadCartCount();
        return this;
    },
    bindEvent   : function(){
        //点击登陆事件
        $('.js-login').click(function(){
            _mm.dologin();
        });
        //点击注册事件
        $('.js-register').click(function(){
            window.location.href = './user-register.html';
        });
        //退出点击事件
        $('.js-logout').click(function(){
            _user.logout(function( res ){
                //成功时刷新页面
                window.location.reload();
            },function( errMsg ){
                //失败时弹出失败提示
                _mm.errorTips( errMsg );
            })
        })
    },
    //加载用户信息
    loadUserInfo : function(){
        _user.checkLogin(function( res ){
            $('.not-login').hide();
            $('.not-login').siblings('.login').show()
                .find('.username').text(res.username)
                .css({
                    "color" : "red",
                    "font-weight" : "bold"
            });
        },function( err ){
            //donothing
        });
    },
    //加载购物车数量
    loadCartCount : function(){
        _cart.getCartCont(function( res ){
            $('.nav .nav-list .cart-cont').text( res||'0' );
        },function( err ){
            $('.nav .nav-list .cart-cont').text( '0' );
        })
    }
};

module.exports = nav.init();

/***/ }),

/***/ 4:
/***/ (function(module, exports, __webpack_require__) {

/**
 * Created by jasen on 2017/10/7.
 */
var _mm     = __webpack_require__(0);

var _cart   = {
    //获取购物车数量
    getCartCont : function( suc , err ){
        _mm.request({
            url     : _mm.getServerUrl('/cart/get_cart_product_count.do'),
            success : suc,
            error   : err
        })
    },
    addCart : function( data , suc , err ){
        _mm.request({
            url     : _mm.getServerUrl('/cart/add.do'),
            data    : data,
            success : suc,
            error   : err
        })
    },
    getCartInfo : function( suc , err ){
        _mm.request({
            url     : _mm.getServerUrl('/cart/list.do'),
            success : suc,
            error   : err
        })
    },
    updataCart : function( data , suc , err ){
        _mm.request({
            url     : _mm.getServerUrl('/cart/update.do'),
            data    : data,
            success : suc,
            error   : err
        })
    },
    unChecked : function(  suc , err ){
        _mm.request({
            url     : _mm.getServerUrl('/cart/un_select_all.do'),
            success : suc,
            error   : err
        })
    },
    allChecked : function(  suc , err ){
        _mm.request({
            url     : _mm.getServerUrl('/cart/select_all.do'),
            success : suc,
            error   : err
        })
    },
    select : function( data , suc , err ){
        _mm.request({
            url     : _mm.getServerUrl('/cart/select.do'),
            data    : data,
            success : suc,
            error   : err
        })
    },
    unSelect : function( data , suc , err ){
        _mm.request({
            url     : _mm.getServerUrl('/cart/un_select.do'),
            data    : data,
            success : suc,
            error   : err
        })
    },
    deletProduct : function( data , suc , err ){
        _mm.request({
            url     : _mm.getServerUrl('/cart/delete_product.do'),
            data    : data,
            success : suc,
            error   : err
        })
    }
};

module.exports = _cart;

/***/ }),

/***/ 5:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 6:
/***/ (function(module, exports, __webpack_require__) {

/**
 * Created by jasen on 2017/10/7.
 */
__webpack_require__(7);

var $       = __webpack_require__(1);
var _mm     = __webpack_require__(0);

var _search = {
    init        : function(){
        this.bindEvent();
    },
    bindEvent   : function(){
        var _this = this,
            keyword = _mm.getUrlParam('keyword');
        //关键词回填
        if( keyword ){
            $('#search-cont').val( keyword )
        }
        //logo点击事件
        $('#logo').click(function(){
            _mm.toHome();
        });
        //搜索框获取焦点时
        $('#search-cont').focus(function(){
            if( $('#search-cont').val() === '请输入商品名称' ){
                $('#search-cont').val('')
            }
        });
        //搜索框失去焦点时
        $('#search-cont').blur(function(){
            if( $('#search-cont').val() === '' ){
                $('#search-cont').val('请输入商品名称')
            }
        });
        //搜索按钮点击事件
        $('#search-btn').click(function(){
                _this.goToList();
        });
        //回车键事件
        $('#search-cont').keyup(function(e){
            if( e.keyCode === 13 ){
                _this.goToList();
            }
        });
    },
    //检验用户输入内容
    checkKeyword    : function( obj ){
        var reg = /^[ a-zA-Z0-9\u4e00-\u9fa5]{1,10}$/g;
        if( obj ==='' || obj==='请输入商品名称' ){
            return false
        }else{
            return reg.test(obj)
        }
    },
    //验证通过跳转LIST页面
    goToList        : function(){
        var check                   =this.checkKeyword( $( '#search-cont' ).val() );
        console.log(check);
        var keyword                 = 'keyword';
            if( check ){
            window.location.href    = './list.html?' + keyword + '=' + $.trim($( '#search-cont' ).val());
        }else{
            _mm.errorTips('搜索内容有误')
        }
        }
    };

_search.init();

/***/ }),

/***/ 63:
/***/ (function(module, exports, __webpack_require__) {

/**
 * Created by jasen on 2017/10/18.
 */
__webpack_require__(64);
__webpack_require__(3);
__webpack_require__(6);
__webpack_require__(8);

var $            = __webpack_require__(1);
var _mm          = __webpack_require__(0);
var _user        = __webpack_require__(2);
var _navSide     = __webpack_require__(8);
var htmlTemplate = __webpack_require__(65);

var userCenter = {
    init      : function(){
        this.bindEvent()
    },
    bindEvent : function(){
        var _this = this;
        this.load();
        $(document).on('click','#update-btn',function(){
            var userInfo = {
                email       : $.trim($('#newEmail').val()),
                phone       : $.trim($('#newPhone').val()),
                question    : $.trim($('#newQuestion').val()),
                answer      : $.trim($('#newAnswer').val())
            };
            if( _this.formValue() ){
                $('#errorTips').hide();
                //客户端提交更新信息
                _user.userUpdate( userInfo , function( res , successMsg ){
                    //成功
                    _mm.successTips(successMsg);
                    window.location.href = './user-center.html'
                } ,function(errMeg){
                    //失败
                    _mm.errorTips( errMeg );
                })
            }
        })

    },
    //进入页面时数据加载及模板渲染
    load : function(){
        var option = {
            "name" : "user-center"
        };
        _navSide.init(option);
        //页面请求数据前用户信息部分显示loading动画
        $('.cont-userdata').addClass('loading');
        //服务端请求用户信息
        _user.getUserInfo(function( res ){
            //登陆状态请求成功
            var htmlRender = _mm.renderHtml( htmlTemplate , res );
            $('.cont-userdata').removeClass('loading');
            $('.cont-userdata').html(htmlRender);
        },function(errMsg){
            //请求失败
            $('.cont-userdata').addClass('loading');
            _mm.errorTips(errMsg)
        })
    },
    //用户信息字段验证，非空\邮箱\电话格式
    formValue : function(){
        var newInfo = {
            email       : _mm.valueData($.trim($('#newEmail').val()),'request'),
            phone       : _mm.valueData($.trim($('#newPhone').val()),'request'),
            question    : _mm.valueData($.trim($('#newQuestion').val()),'request'),
            answer      : _mm.valueData($.trim($('#newAnswer').val()),'request')
        };
        for(var arrt in newInfo){
            if(newInfo[arrt] === false){
                $('#errorTips').show().text('请填写完整的个人信息')
                return false
            }

        }
        if(!_mm.valueData($.trim($('#newEmail').val()),'email')){
            $('#errorTips').show().text('邮箱格式不正确')
            return false
        }
        if(!_mm.valueData($.trim($('#newPhone').val()),'tel')){
            $('#errorTips').show().text('手机格式不正确')
            return false
        }
        return true;
    }
};

userCenter.init();


/***/ }),

/***/ 64:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 65:
/***/ (function(module, exports) {

module.exports = "<div id=\"errorTips\">请填写完整信息再进行提交</div>\r\n<div class=\"cont-userinfo\">\r\n    <div class=\"cont-userinfo-item\">\r\n        <div class=\"cont-userinfo-title\">用户名</div>\r\n        <div class=\"cont-userinfo-data\">{{username}}</div>\r\n    </div>\r\n    <div class=\"cont-userinfo-item\">\r\n        <div class=\"cont-userinfo-title\">邮  箱</div>\r\n        <input value=\"{{email}}\" class=\"cont-userinfo-data\" id=\"newEmail\">\r\n    </div>\r\n    <div class=\"cont-userinfo-item\">\r\n        <div class=\"cont-userinfo-title\">电  话</div>\r\n        <input value=\"{{phone}}\" class=\"cont-userinfo-data\"  id=\"newPhone\"/>\r\n    </div>\r\n    <div class=\"cont-userinfo-item\">\r\n        <div class=\"cont-userinfo-title\">问  题</div>\r\n        <input value=\"{{question}}\" class=\"cont-userinfo-data\" id=\"newQuestion\">\r\n    </div>\r\n    <div class=\"cont-userinfo-item\">\r\n        <div class=\"cont-userinfo-title\">答  案</div>\r\n        <input value=\"{{answer}}\" class=\"cont-userinfo-data\" id=\"newAnswer\">\r\n    </div>\r\n</div>\r\n<div class=\"btn userinfo-btn\" id=\"update-btn\">提交</div>\r\n";

/***/ }),

/***/ 7:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 8:
/***/ (function(module, exports, __webpack_require__) {

/**
 * Created by jasen on 2017/10/8.
 */
__webpack_require__(9);

var _mm             = __webpack_require__(0);
var $               = __webpack_require__(1);
var navsadeTemplate = __webpack_require__(10);

var _navSide = {
    option : {
        name : '',
        navList : [
            { name : 'user-center' ,        disc : '个人中心' , href : './user-center.html'},
            { name : 'order-list' ,         disc : '我的订单' , href : './order-list.html'},
            { name : 'user-pass-update' ,   disc : '修改密码' , href : './user-pass-update.html'},
            { name : 'about' ,              disc : '关于我们' , href : './about.html'}
        ]
    },
    init    : function( ooption ){
        $.extend( this.option,ooption );
        this.reader();
    },
    reader : function(){
        //匹配navList对象中的值为其增加active属性值并为true
        for(var i = 0 , ilength = this.option.navList.length ; i < ilength ; i++){
            if( this.option.navList[i].name === this.option.name ){
                this.option.navList[i].isActive = true ;
            }
        }
        //渲染nav-side的HTML模板
        var navSideHtml = _mm.renderHtml(navsadeTemplate,{
            navList : this.option.navList
        });
        //把渲染后模板放到
        $('.nav-side').html(navSideHtml);
    }
};

_navSide.init();
module.exports = _navSide;

/***/ }),

/***/ 9:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })

},[63]);