webpackJsonp([12],{

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

/***/ 66:
/***/ (function(module, exports, __webpack_require__) {

/**
 * Created by jasen on 2017/10/12.
 */
__webpack_require__(67);
__webpack_require__(11);

var _mm     = __webpack_require__(0);
var $       = __webpack_require__(1);
var _user   = __webpack_require__(2);
var formSubmit = {
    "username"          : false,
    "password"          : false,
    "repeatPassword"    : false,
    "userTel"           : false,
    "userEmail"         : false,
    "userQuestion"      : false,
    "userAnswer"        : false

};

var userLogin = {
    init     : function () {
            this.bindEvent()
    },
    bindEvent : function () {
        var _this = this;
        var oldUsername = $.trim($('#username').val());
        //阻止按钮按下时鼠标拖动时默认事件
        $('#register-btn').mousedown(function(){
            return false
        });
        //表单焦点切换样式
        $('input').on('focus',function(){
            $(this).css({
                "border" : "1px solid #EE3A8C"
            });
        });
        $('input').on('blur',function(){
            $(this).css({
                "border" : "1px solid rgb(102, 102, 102)"
            })
        });
        //服务端验证用户名是否可用
        $('#username').on('blur',function(){
            var elThis = this;
            var getUsername =_this.getFormVal('#username');
            //异步请求参数
            var checkData = {
                str     : getUsername,
                type    : 'username'
            };
            //用户名为空时错误提示不会向服务器请求验证
            if( !_mm.valueData( getUsername , 'request' ) ){
                _this.checkTips.errorTips( '用户名不能为空' , elThis );
                return ;
            }
            //用户名不为空时向服务端验证
            if( oldUsername !== getUsername && _this.regExpTest('#username')){
                //用户名与上一次输入不一致并且通过正则验证
                oldUsername = getUsername;
                _user.checkUsername( checkData ,function(){
                    //用户名验证成功
                    _this.checkTips.successTips( '可用' , elThis );
                    formSubmit.username = true;
                } , function(){
                    //用户名验证失败
                    _this.checkTips.errorTips( '用户名已被注册' , elThis );
                    formSubmit.username = false;
                })
            }
        });
        //用户名输入栏失去焦点样式
        $('#username').on( 'focus' , function(){
            var elThis = this;
            if( !_mm.valueData($.trim($(this).val()),'request' ) ){
                _this.checkTips.defaultTips( '必须为纯数字英文或下划线' , elThis );
                formSubmit.username = false;
            }
        } );
        //表单项客户端验证逻辑调用
        this.formCheck( _this );
        //登陆按钮点击事件逻辑
        $('#register-btn').click(function () {
            _this.formSubmited()
        });
        //回车键响应登陆事件
        $('input').keyup(function( e ){
            if(e.keyCode === 13 ){
                _this.formSubmited()
            }
        })
    },
    //表单项客户端验证逻辑
    formCheck   : function( _this ){
        //用户名客户端验证
        $('#username').on('change',function(){
            if(!_this.regExpTest('#username')){
                _this.checkTips.errorTips( '格式错误' ,this);
                formSubmit.username = false;
            }
        });
        //密码客户端验证
        $('#password').on('change',function(){
            if(!_this.regExpTest('#password')){
                _this.checkTips.errorTips( '格式错误' ,this);
                formSubmit.password = false;
            }else{
                _this.checkTips.successTips( '正确' ,this);
                formSubmit.password = true;
            }
        });
        $('#password').on('blur',function(){
            if(_mm.valueData( _this.getFormVal('#password') , 'request' )){
                //donothing
            }else{
                _this.checkTips.errorTips( '密码不能为空' ,this);
                formSubmit.password = false;
            }
        });
        //重复密码客户端验证
        $('#repeat-password').on('blur',function(){
            if( _this.getFormVal('#repeat-password') !== _this.getFormVal('#password') ){
                _this.checkTips.errorTips( '两次输入密码不一致' ,this);
                formSubmit.repeatPassword = false;
            }else{
                if( _mm.valueData(_this.getFormVal('#repeat-password') , 'request')){
                    _this.checkTips.successTips( '正确' ,this);
                    formSubmit.repeatPassword = true;
                }else{
                    _this.checkTips.errorTips( '输入内容不能为空' ,this);
                    formSubmit.repeatPassword = false;
                }
            }
        });
        //手机号客户端验证
        $('#user-tel').on('blur',function(){
           if(_mm.valueData(_this.getFormVal('#user-tel'),'tel')){
               _this.checkTips.successTips( '正确' ,this);
               formSubmit.userTel = true;
           }else{
               _this.checkTips.errorTips( '手机格式错误' ,this);
               formSubmit.userTel = false;
           }
        });
        //邮箱客户端验证
        $('#user-email').on('blur',function(){
            if(_mm.valueData(_this.getFormVal('#user-email'),'email')){
                _this.checkTips.successTips( '正确' ,this);
                formSubmit.userEmail = true;
            }else{
                _this.checkTips.errorTips( '邮箱格式错误' ,this);
                formSubmit.userEmail = false;
            }
        });
        //验证问题客户端验证
        $('#user-question').on('blur',function(){
            if(_mm.valueData(_this.getFormVal('#user-question'),'request')){
                _this.checkTips.errorTips( '' ,this);
                formSubmit.userQuestion = true;
            }else{
                _this.checkTips.errorTips( '验证问题不能为空' ,this);
                formSubmit.userQuestion = false;
            }
        });
        //验证答案客户端验证
        $('#user-answer').on('blur',function(){
            if(_mm.valueData(_this.getFormVal('#user-answer'),'request')){
                _this.checkTips.successTips( '填写正确' ,$('#user-answer'));
                formSubmit.userAnswer = true;
            }else{
                _this.checkTips.errorTips( '问题答案不能为空' ,this);
                formSubmit.userAnswer = false;
            }
        });
    },
    //表单提交逻辑
    formSubmited : function(){
        var formCheck = true;
        $('input').focus();
        for(var attr in formSubmit){
            //表单内容不符合通过客户端格式验证
            if(formSubmit[attr] === false){
                formCheck = false;
                break;
            }
        }
        if(formCheck){
            _user.register(this.getFormData() , function(){
                window.location.href = './result.html?type=register'
            } , function( errMsg ){
                _mm.errorTips(errMsg)
            })
        }
    },
    //表单用户名及密码正则验证
    regExpTest  : function( elements ){
        var reg =/^[0-9a-zA-Z]+$/g;
        return reg.test($.trim($(elements).val()));

    },
    //提取整个表单提交内容
    getFormData   : function(){
        var formData ={
            username    : this.getFormVal('#username'),
            password    : this.getFormVal('#password'),
            email       : this.getFormVal('#user-email'),
            phone       : this.getFormVal('#user-tel'),
            question    : this.getFormVal('#user-question'),
            answer      : this.getFormVal('#user-answer')
        };
        return formData;
    },
    //提取单项表单内容
    getFormVal    : function( element ){
        var $element = $.trim($(element).val());
        return $element;
    },
    //客户端表单输入格式验证结果提示
    checkTips   : {
        //默认提示
        defaultTips    : function( msg , elThis ){
                this.tipsStyle( "#999" , "none" , msg , elThis );
        },
        //成功提示
        successTips : function( sucMsg , elThis ){
            this.tipsStyle( "green" , "700" , sucMsg , elThis );
        },
        //错误提示
        errorTips : function( errMsg , elThis ){
            this.tipsStyle( "red" , "700" , errMsg , elThis );
        },
        //提示样式
        tipsStyle : function( color , fontStyle ,mssige , elThis ){
            $(elThis).parent('.user-item').find('.user-login-tips')
                .text(mssige)
                .css({
                    "color" : color,
                    "fong-weight" : fontStyle
                });
        }
    }
};
userLogin.init();


/***/ }),

/***/ 67:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })

},[66]);