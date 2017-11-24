webpackJsonp([3],[
/* 0 */,
/* 1 */,
/* 2 */
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
            url     : _mm.getServerUrl('test.happymmall.com/user/forget_check_answer.do'),
            medth   : 'POST',
            data    : data,
            success : suc,
            error   : err
        })
    },
    //找回密码-用户名验证
    newPass         : function(data , suc , err ){
        _mm.request({
            url     : _mm.getServerUrl('test.happymmall.com/user/forget_reset_password.do'),
            medth   : 'POST',
            data    : data,
            success : suc,
            error   : err
        })
    },
    //获取用户信息
    getUserInfo     : function( suc , err ){
        _mm.request({
            url     : _mm.getServerUrl('test.happymmall.com/user/get_information.do'),
            medth   : 'POST',
            success : suc,
            error   : err
        })
    },
    //登陆
    login : function(formValue , suc , err ){
        _mm.request({
            url     : _mm.getServerUrl('test.happymmall.com/user/login.do'),
            medth   : 'POST',
            data    : formValue,
            success : suc,
            error   : err
        })
    },
    //登出
    logout : function( suc , err ){
        _mm.request({
            url     : _mm.getServerUrl('test.happymmall.com/user/logout.do'),
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
/* 3 */
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
/* 4 */
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
/* 5 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 6 */
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
/* 7 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Created by jasen on 2017/8/27.
 */

__webpack_require__(3);

__webpack_require__(6);

__webpack_require__(24);



var $           = __webpack_require__(1);
var _mm         = __webpack_require__(0);
var template    = __webpack_require__(25);

var homePage = {
    //list列表数据
    listInfo : {
        item1 : [{name : '手机'},{name : '数码'}],
        item2 : [{name : '电脑'},{name : '办公配件'}],
        item3 : [{name : '电视'},{name : '空调'},{name : '冰箱'},{name : '洗衣机'}],
        item4 : [{name : '厨卫家电'},{name : '小家电'}],
        item5 : [{name : '家具'},{name : '灯饰'}],
        item6 : [{name : '厨卫家电'},{name : '家纺'},{name : '家装'}],
        item7 : [{name : '个人化妆'},{name : '洁肤'},{name : '护肤品'}],
        item8 : [{name : '婴儿用品'},{name : '玩具'},{name : '幼儿早教'}],
        item9 : [{name : '珠宝'},{name : '银饰'},{name : '手镯'}],
        item10 :[{name : '鞋'},{name : '钱包'},{name : '皮带'},{name : '帽子'}]
    },
    init : function(){
        this.listLoad();
        this.bingEvent();
    },
    bingEvent : function(){
        this.pageAnimate.init()
    },
    //渲染list模板
    listLoad : function(){
        var list = _mm.renderHtml(template , this.listInfo);
        $('.list-con').html(list);
    },
    //页面元素动画
    pageAnimate : {
        init : function(){
            this.bindEvent();
        },
        bindEvent : function(){
            this.bannerMove();
            this.floorListMove();
            this.floorSideMove();
            this.topBtn();
        },
        //banner图片静态资源引入
        bannerPic : function(){
            var picAttr     = [];
            picAttr.length  = 4;
            picAttr[0]      = __webpack_require__(26);
            picAttr[1]      = __webpack_require__(27);
            picAttr[2]      = __webpack_require__(28);
            picAttr[3]      = __webpack_require__(29);
            return picAttr;
        },
        bannerHref : {
            categoryid : ["categoryId=100012","categoryId=100013","categoryId=100014","categoryId=100015"]
        },
        //大banner轮播动画效果
        bannerMove : function(){
            var _this = this;
            var bannerPic = _this.bannerPic();
            var bannerPage = {
                "pic" : 0
            };
            var timer = null;
            //轮播动画逻辑
            var move = function(bannerPage){
                if( bannerPage.pic > bannerPic.length-1 ){
                    bannerPage.pic = 0;
                }else if(bannerPage.pic < 0){
                    bannerPage.pic = bannerPic.length-1;
                }
                //图片切换fadeToggle
                $('#banner-pic').fadeOut('100',function(){
                    $('#banner-list .pic-item').eq(bannerPage.pic).css({
                        "background" : "#7CFC00"
                    });
                    $('#banner-list .pic-item').not($('#banner-list .pic-item').eq(bannerPage.pic)).css({
                        "background" : " #fff"
                    });
                    //图片地址路径切换
                    $('#banner-pic').find('img')[0].src = bannerPic[bannerPage.pic];
                    $('.banner-href')[0].href = './list.html?'+ _this.bannerHref.categoryid[bannerPage.pic];
                }).fadeIn('100');
            };
            //初始化动画状态
            $('#banner-pic').find('img')[0].src = bannerPic[bannerPage.pic];
            $('.banner-href')[0].href = './list.html?'+ _this.bannerHref.categoryid[bannerPage.pic];
            $('#banner-list .pic-item').eq(0).css({
                "background" : " #7CFC00"
            });
            //左右按钮点击事件
            $('#left-btn').on('click',function(){
                bannerPage.pic=bannerPage.pic-1;
                move(bannerPage)
            });
            $('#right-btn').on('click',function(){
                bannerPage.pic=bannerPage.pic+1;
                move(bannerPage)
            });
            //阻止按钮鼠标按下拖动时默认事件
            $('#left-btn').mousedown(function(){
                return false;
            });
            $('#right-btn').mousedown(function(){
                return false;
            });
            //banner自动轮播
            timer = setInterval(function(){
                bannerPage.pic=bannerPage.pic+1;
                move(bannerPage)
            },3000);
            //banner区域光标移入移出事件
            $('.banner-con').mouseover(function(){
                clearInterval(timer)
            });
            $('.banner-con').mouseout(function(){
                timer = setInterval(function(){
                    bannerPage.pic=bannerPage.pic+1;
                    move(bannerPage)
                },3000);
            });
        },
        //商品列表光标指向时动画效果
        floorListMove : function(){
            $('.floor .floor-list img').on('mouseover',function(){
                $(this).animate({
                    "right" : "30px"
                },"fast",function(){
                    $(this).animate({
                        "right" : "20px"
                    })
                })
            })
        },
        //窗口滚动时floor-side样式变化
        floorSideMove : function(){
            var floorTop = {
                "f1" : {top : $('#1f').offset().top + $('#1f').outerHeight() },
                "f2" : {top : $('#2f').offset().top + $('#2f').outerHeight()},
                "f3" : {top : $('#3f').offset().top + $('#3f').outerHeight()},
                "f4" : {top : $('#4f').offset().top + $('#4f').outerHeight()},
                "f5" : {top : $('#5f').offset().top + $('#5f').outerHeight()}
            };
            $(window).on("scroll",function(){
                var i =0;
                var $scrollTop = $(window).scrollTop() + $(window).height();
                if( Math.ceil($scrollTop) > Math.ceil(floorTop.f1.top) ){
                    $('.floor-side').animate({
                        "opacity" : "1"
                    },100)
                }else{
                    $('.floor-side').animate({
                        "opacity" : "0"
                    },100)
                }
                for( var attr in floorTop ){
                    if( $scrollTop >= floorTop[attr].top ){
                        i++;
                    }
                }
                $('.floor-side-item').css({background : "#888"});
                $("#"+i+"f-btn").css({
                        background : "#ff5577"
                });
            })
        },
        //则边回到顶部按钮
        topBtn : function(){
            $('.floor-side #top-btn').on("click",function(){
                $(window).scrollTop(0)
            })
        }
    }

};

homePage.init();

/***/ }),
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 25 */
/***/ (function(module, exports) {

module.exports = "<li class=\"list-item\">\r\n    {{#item1}}\r\n    <a class=\"link\" target=\"_blank\" href=\"./list.html?keyword={{name}}\">{{name}}</a>\r\n    {{/item1}}\r\n</li>\r\n<li class=\"list-item\">\r\n    {{#item2}}\r\n    <a class=\"link\" target=\"_blank\" href=\"./list.html?keyword={{name}}\">{{name}}</a>\r\n    {{/item2}}\r\n</li>\r\n<li class=\"list-item\">\r\n    {{#item3}}\r\n    <a class=\"link\" target=\"_blank\" href=\"./list.html?keyword={{name}}\">{{name}}</a>\r\n    {{/item3}}\r\n</li>\r\n<li class=\"list-item\">\r\n    {{#item4}}\r\n    <a class=\"link\" target=\"_blank\" href=\"./list.html?keyword={{name}}\">{{name}}</a>\r\n    {{/item4}}\r\n</li>\r\n<li class=\"list-item\">\r\n    {{#item5}}\r\n    <a class=\"link\" target=\"_blank\" href=\"./list.html?keyword={{name}}\">{{name}}</a>\r\n    {{/item5}}\r\n</li>\r\n<li class=\"list-item\">\r\n    {{#item6}}\r\n    <a class=\"link\" target=\"_blank\" href=\"./list.html?keyword={{name}}\">{{name}}</a>\r\n    {{/item6}}\r\n</li>\r\n<li class=\"list-item\">\r\n    {{#item7}}\r\n    <a class=\"link\" target=\"_blank\" href=\"./list.html?keyword={{name}}\">{{name}}</a>\r\n    {{/item7}}\r\n</li>\r\n<li class=\"list-item\">\r\n    {{#item8}}\r\n    <a class=\"link\" target=\"_blank\" href=\"./list.html?keyword={{name}}\">{{name}}</a>\r\n    {{/item8}}\r\n</li>\r\n<li class=\"list-item\">\r\n    {{#item9}}\r\n    <a class=\"link\" target=\"_blank\" href=\"./list.html?keyword={{name}}\">{{name}}</a>\r\n    {{/item9}}\r\n</li>\r\n<li class=\"list-item\">\r\n    {{#item10}}\r\n    <a class=\"link\" target=\"_blank\" href=\"./list.html?keyword={{name}}\">{{name}}</a>\r\n    {{/item10}}\r\n</li>";

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "resource/banner01.jpg";

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "resource/banner02.jpg";

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "resource/banner03.jpg";

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "resource/banner04.jpg";

/***/ })
],[20]);