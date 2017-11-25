webpackJsonp([13],{

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

/***/ 68:
/***/ (function(module, exports, __webpack_require__) {

/**
 * Created by jasen on 2017/10/17.
 */
__webpack_require__(69);
__webpack_require__(11);
__webpack_require__(19);

var _user   = __webpack_require__(2);
var _mm     = __webpack_require__(0);
var $       = __webpack_require__(1);

var userPassReset = {
    init            : function(){
        this.pageInitial();
        this.bindEvent();
    },
    //验证过程保存的数据内容
    passResetData   : {
        username    : '',
        question    : '',
        answer      : '',
        passwordNew : '',
        forgetToken : ''
    },
    bindEvent      : function(){
        var _this = this;
        //密码找回-第一步用户名验证
        $('#username-btn').on('click',function(){
            _this.usernameSubmit()
        });
        //密码找回-第二步问题验证
        $('#question-btn').on('click',function(){
            _this.questionSubmit()
        });
        //密码找回-第三步问题验证
        $('#newpass-btn').on('click',function(){
            _this.newPassSubmit()
        })
    },
    //页面初始化显示内容
    pageInitial    : function(){
        $(function(){
            $('.username-con').show();
        })
    },
    //第一步：用户名验证
    usernameSubmit : function(){
        var _this = this;
        //获取表单填写内容
        var username = $.trim($('#username').val());
        //表单内容为空
        if(!_mm.valueData( username , 'request') ){
            _this.errorTips('用户名不能为空')
        }else{
            //表单内容非空时服务端验证
            var usernameData = {
                username : username
            };
            _user.passResetUsername(usernameData , function( res ){
                //用户名验证成功
                $('.username-con').hide();
                $('.question-con').show().find('#setquestion').text(res);
                _this.errorTips();
                _this.passResetData.username = usernameData.username;
                _this.passResetData.question = res;
            }, function( err ){
                //用户名验证失败
                _this.errorTips(err)
            })
        }
    },
    //第二步：问题答案验证
    questionSubmit : function(){
        var _this = this;
        //获取表单填写内容
        var answer = $.trim($('#answer').val());
        //表单内容为空
        if(!_mm.valueData( answer , 'request') ){
            _this.errorTips('问题答案不能为空')
        }else{
            //表单内容非空时服务端验证
            var questionData = {
                username : _this.passResetData.username,
                question : _this.passResetData.question,
                answer   : $.trim($('#answer').val())
            };
            _user.passResetAnswer(questionData , function( res ){
                //用户名验证成功
                $('.question-con').hide();
                $('.newpass-con').show();
                _this.errorTips();
                _this.passResetData.answer = questionData.answer;
                _this.passResetData.forgetToken = res;
            }, function( err ){
                //用户名验证失败
                _this.errorTips(err)
            })
        }
    },
    //第三步：重置密码
    newPassSubmit  : function(){
        var _this = this;
        //获取表单填写内容
        var newpass = $.trim($('#newpass').val());
        //表单内容为空
        if(!_mm.valueData( newpass , 'request') ){
            _this.errorTips('密码不能为空')
        }else{
            //表单内容非空时服务端验证
            var newPassData = {
                username    : _this.passResetData.username,
                passwordNew : newpass,
                forgetToken : _this.passResetData.forgetToken
            };
            _user.newPass(newPassData , function( res ){
                //用户名验证成功
                _this.errorTips();
                window.location.href = './result.html?type=pass-reset'
            }, function( err ){
                //用户名验证失败
                _this.errorTips(err)
            })
        }
    },
    //页面错误提示渲染
    errorTips      : function(errMsg){
        if(errMsg){
            //出错则显示错误提示
            $('#error-item').show().find('.error-msg').text(errMsg);
        }else{
            //否则隐藏错误提示
            $('#error-item').hide().find('.error-msg').text('');
        }
    }
};

userPassReset.init();

/***/ }),

/***/ 69:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })

},[68]);