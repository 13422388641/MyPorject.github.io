webpackJsonp([9],{

/***/ 14:
/***/ (function(module, exports, __webpack_require__) {

/**
 * Created by jasen on 2017/10/27.
 */
var _mm = __webpack_require__(0);

var _product = {
    //产品搜索
    productSearch : function( data , suc , err ){
        _mm.request({
            url     : _mm.getServerUrl('/product/list.do'),
            data    : data,
            success : suc,
            error   : err
        })
    },
    getDetail : function( data , suc , err ){
        _mm.request({
            url     : _mm.getServerUrl('/product/detail.do'),
            data    : data,
            success : suc,
            error   : err
        })
    }
};

module.exports = _product ;

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

/***/ 33:
/***/ (function(module, exports, __webpack_require__) {

/**
 * Created by jasen on 2017/10/30.
 */
__webpack_require__(34);
__webpack_require__(3);
__webpack_require__(6);

var $               = __webpack_require__(1);
var _mm             = __webpack_require__(0);
var _product        = __webpack_require__(14);
var _cart           = __webpack_require__(4);
var detailTemplate  = __webpack_require__(35);
var _nav            = __webpack_require__(3);

var detail = {
    data : {
        productId   : _mm.getUrlParam('productId'),
        count       : "0"
    },
    init        : function(){
        this.bindEvent()
    },
    bindEvent   : function(){
        var objThis = this;
        //页面初始请求商品信息
        this.load();
        //商品小图片鼠标移入商品大图片切换
        $(document).on('mousemove','.mini-img-item img',function(){
            var _this = this;
            $('.big-img img').attr('src',$(_this).attr('src'))
        });
        //商品大图光标移入
        $(document).on('mousemove','.big-img',function( event ){
            var _left               = parseInt(event.pageX-$(this).offset().left);
            _top                = parseInt(event.pageY-$(this).offset().top),
            _width              = parseInt($('.big-img-block').innerWidth()/2),
            _height             = parseInt($('.big-img-block').innerHeight()/2),
            leftMultiple        = 0,
            topMultiple         = 0,
            bgLeft              = 0,
            bgTop               = 0,
            $left               = '',
            $top                = '',
            _this               = this;
            //鼠标横向距离父元素值大于滑块一半宽度，或少于等于父元素减去滑块一半宽度距离时定位left计算方式
            if( _left>=_width && _left<=$(this).innerWidth()-_width){
                $left = _left - _width;
            }
            //鼠标纵向距离父元素值大于或等于滑块一半高度，或少于等于父元素减去滑块一半高度距离时定位top计算方式
            if( _top>=_height && _top<=$(this).innerHeight()-_height){
                $top = _top - _height;
            }
            //鼠标横向距离父元素值小于或等于滑块一半宽度时定位left值为0
            if( _left <= _width ){
                $left = 0
            }
            //鼠标纵向距离父元素值小于或等于滑块一半高度时定位top值为0
            if( _top <= _height ){
                $top = 0
            }
            //鼠标横向距离父元素值大于或等于滑块一半宽度时定位left值计算方式
            if( _left >= ($(this).innerWidth()-_width) ){
                $left = $(this).innerWidth()-parseInt($('.big-img-block').innerWidth());
            }
            //鼠标纵向距离父元素值大于或等于滑块一半宽度时定位top值计算方式
            if( _top >= ($(this).innerHeight()-_height) ){
                $top = $(this).innerHeight()-parseInt($('.big-img-block').innerHeight());
            }
            //滑块样式控制
            $('.big-img-block').css({
                "display" : "block",
                "left" : $left,
                "top" : $top
            });
            //放大图放大倍数及定位控制计算
            leftMultiple = parseFloat($(this).innerWidth()/ $('.big-img-block').innerWidth());
            topMultiple = parseFloat($(this).innerHeight()/ $('.big-img-block').innerHeight());
            bgLeft = -($left*leftMultiple);
            bgTop = -($top*topMultiple);
            $('.big-img-details').css({
                "display" : "block",
                "background-image" : "url("+$(_this).find('img').attr('src')+")",
                "background-position" : (bgLeft)+"px "+(bgTop)+"px",
                "background-size" : (leftMultiple*100)+"% "+(topMultiple*100)+"%",
                "background-repeat" : "no-repeat"
            });
            });
        //商品大图光标穿出
        $(document).on('mouseleave','.big-img',function(){
            $('.big-img-block').css({
                "display" : "none"
            });
            $('.big-img-details').css({
                "display" : "none"
            })
        });
        //增减商品数量按钮逻辑
        $(document).on('click','#btn-con-add',function(){
            var num = parseInt($('#btn-con-num').val());
            var storck = parseInt($('.detail-stock-con').html());
            //判断当前数量是否大于产品存库
            num >= storck ? num = storck : num++;
            $('#btn-con-num').val(num)
        });
        $(document).on('click','#btn-con-minus',function(){
            var num = parseInt($('#btn-con-num').val());
            //判断当前数量是否大于产品存库
            num <= 0 ? num = 0 : num--;
            $('#btn-con-num').val(num)
        });
        //加入购物车及去支付按钮逻辑
        $(document).on('click','.detail-skip #detail-skip-cart,#detail-skip-topay',function(){
            var num = parseInt($('#btn-con-num').val());
            if( num !== 0 ){
                objThis.data.count = num;
                _cart.addCart(objThis.data,function( res ){
                    //添加成功
                    if( res.allChecked ){
                        //服务端返回验证为true
                        window.location.href = './result.html?type=addcart'
                    }
                },function( errMsg ){
                    //添加失败
                })
            }else{
                _mm.errorTips("请提供需要购买的商品数量")
            }
        })

    },
    //页面数据载入
    load        : function(){
        //刷新页面右上角购物车数量
        _nav.loadCartCount();
        var productId = _mm.getUrlParam('productId');
        //判断是否有productId
        if( productId ){
            _product.getDetail({
                productId : productId
            } , function( res ){
                //成功
                var arry = res.subImages.split(',');
                var subImages = [];
                //整形返回值中subImages
                for(var i=0 ; i<arry.length ; i++){
                    subImages[i] = ({
                        src : arry[i]
                    })
                }
                res.subImages = subImages;
                var detailHtml = _mm.renderHtml( detailTemplate , res );
                $('.detail-wrap').html(detailHtml)
            } , function( errMsg ){
                //失败
                $('.detail-wrap').html(errMsg).addClass('detail-error')
            })
        }else{
            //没有商品ID返回主页
            window.location.href='./index.html'
        }
    }
};

detail.init();

/***/ }),

/***/ 34:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 35:
/***/ (function(module, exports) {

module.exports = "\r\n    <div class=\"img-con\">\r\n    <div class=\"big-img\">\r\n        <img src=\"{{imageHost}}{{mainImage}}\" alt=\"{{name}}\"/>\r\n        <div class=\"big-img-block\"></div>\r\n        <div class=\"big-img-details\"></div>\r\n    </div>\r\n\r\n    <ul class=\"mini-img-list\">\r\n        {{#subImages}}\r\n        <li class=\"mini-img-item\">\r\n            <img src=\"{{imageHost}}{{src}}\"/>\r\n        </li>\r\n        {{/subImages}}\r\n    </ul>\r\n</div>\r\n    <div class=\"detail-con\">\r\n    <h1 class=\"detail-title\">\r\n            <span class=\"detail-title-subtitle\">\r\n                {{name}}\r\n            </span>\r\n    </h1>\r\n    <div class=\"detail-price\">\r\n        <span class=\"detail-p-title\">商品价格：</span>\r\n        <span class=\"detail-price-con\">￥{{price}}</span>\r\n    </div>\r\n    <div class=\"detail-stock\">\r\n        <span class=\"detail-p-title\">剩余件数：</span>\r\n        <span class=\"detail-stock-con\">{{stock}}</span>\r\n    </div>\r\n    <div class=\"detail-btn\">\r\n        <span class=\"detail-p-title\">购买数量：</span>\r\n        <div class=\"detail-btn-con\">\r\n            <input type=\"text\" readonly=\"readonly\" value=\"1\" disabled id=\"btn-con-num\"/>\r\n            <input type=\"button\" id=\"btn-con-add\" value=\"+\"/>\r\n            <input type=\"button\" id=\"btn-con-minus\" value=\"-\"/>\r\n        </div>\r\n    </div>\r\n    <div class=\"detail-skip\">\r\n        <a id=\"detail-skip-topay\" class=\"btn\" href=\"./cart.html\">立即购买</a>\r\n        <span id=\"detail-skip-cart\" class=\"btn\">加入购物车</span>\r\n    </div>\r\n</div>\r\n    <div class=\"main-wrap w\">\r\n    <ul class=\"main-select\">\r\n        <li class=\"main-select-item active\">商品详情</li>\r\n    </ul>\r\n    <div class=\"main-con\">\r\n        {{{detail}}}\r\n    </div>\r\n</div>\r\n";

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

/***/ 7:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })

},[33]);