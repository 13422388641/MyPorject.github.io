webpackJsonp([14],{

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
            url     : _mm.getServerUrl('/user/forget_check_answer.do'),
            medth   : 'POST',
            data    : data,
            success : suc,
            error   : err
        })
    },
    //找回密码-用户名验证
    newPass         : function(data , suc , err ){
        _mm.request({
            url     : _mm.getServerUrl('/user/forget_reset_password.do'),
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

/***/ 58:
/***/ (function(module, exports, __webpack_require__) {

/**
 * Created by jasen on 2017/10/10.
 */
__webpack_require__(59);
__webpack_require__(11);

var _mm     = __webpack_require__(0);
var $       = __webpack_require__(1);
var _user   = __webpack_require__(2);

var userLogin = {
    init     : function () {
        this.bindEvent()
    },
    bindEvent : function () {
        var _this = this;
        //阻止按钮按下时鼠标拖动时默认事件
        $('#login-btn').mousedown(function(){
            return false
        });
        //登陆按钮点击事件
        $('#login-btn').click(function () {
            var formValue = _this.getValue( '#username' , '#password' );
            var result = _this.checkValue( formValue );
            _this.checkServer( result , formValue )
        });
        //回车键响应登陆事件
        $('#password').keyup(function( e ){
            if( e.keyCode === 13 ){
                var formValue = _this.getValue( '#username' , '#password' );
                var result = _this.checkValue( formValue );
                _this.checkServer( result , formValue )
            }
        })
    },
    //获取表单提交内容
    getValue : function( element01 , elements02 ){
        var formData = {
            username : $(element01).val(),
            password : $(elements02).val()
        };
        return formData;
    },
    //表单内容非空验证
    checkValue : function ( formValue ) {
        var checkend = {
            status : false,
            msg    : ''
        };
        //用户名为空返回值
        if( !_mm.valueData(formValue.username, "request") ){
            checkend.msg = '用户名不能为空';
            return checkend ;
        }
        //密码名为空返回值
        if( !_mm.valueData(formValue.password, "request") ){
            checkend.msg = '密码不能为空';
            return checkend ;
        }
        //用户名密码都不为空返回值
        checkend.status = true;
        checkend.msg = '提交成功';
        return checkend
    },
    //错误信息处理
    errorMsg : {
        show : function( errMsg ){
            $('#error-item').show().find('.error-msg').text( errMsg )
        },
        hide : function(){
            $('#error-item').hide().find('.error-msg').text( '' )
        }
    },
    //
    checkServer : function( result , formValue ){
        var _this = this;
        //非空验证通过服务器验证结果
        if( result.status ){
            //向服务器检验登陆时用户名及密码
            _user.login(formValue , function( res ){
                //服务器检验通过时回到原来页面或主页
                window.location.href = _mm.getUrlParam( 'redirect' ) || './index.html' ;
            } ,function( errMsg ){
                //服务器检验不通过时
                _this.errorMsg.show( errMsg )
            })
        }else{
            //非空验证不通过时
            _this.errorMsg.show( result.msg )
        }
    }
};
userLogin.init();

/***/ }),

/***/ 59:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })

},[58]);