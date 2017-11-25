webpackJsonp([10],{

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

/***/ 36:
/***/ (function(module, exports, __webpack_require__) {

/**
 * Created by jasen on 2017/11/8.
 */
__webpack_require__(37);
__webpack_require__(3);
__webpack_require__(6);

var $               = __webpack_require__(1);
var _mm             = __webpack_require__(0);
var _cart           = __webpack_require__(4);
var cartTemplate    = __webpack_require__(38);
var _nav            = __webpack_require__(3);

var cart = {
    init : function(){
        this.bindEvemt();
    },
    bindEvemt : function(){
        var _this = this;
        this.renderHtml();
        //商品数量加减逻辑
        $(document).on('click','.cart-item-count input',function(){
            var btnType         = $(this).attr('btnType'),
                $thisParent     = $(this).parents('.cart-item-count'),
                count           = $thisParent.attr('quantity'),
                productStock    = $thisParent.attr('productStock'),
                productId       = $thisParent.attr('productId'),
                oldCount        = parseInt($(this).siblings('input[type=text]').val()),
                newCount        = 0,
                data            = {
                "productId" : productId,
                "count"     : newCount
            };
            //当前用户操作为增加商品数量时
            if( btnType === 'add' ){
                //当前商品数量不大于商品存库
                if( count < productStock ){
                    oldCount++;
                    newCount = oldCount;
                    data.count = newCount;
                    _this.updataCart( data );
                //当前商品数量大于商品存库
                }else{
                    _mm.errorTips( '抱歉该商品存库不足' )
                }
            //当前用户操作为减少商品数量时
            }else if( btnType === 'minus' ){
                //当前商品数量大于1时
                if( count > 1 ){
                    oldCount--;
                    newCount = oldCount;
                    data.count = newCount;
                    _this.updataCart( data );
                    //当前商品数量大于商品存库
                }else{
                    //donothing
                }
            }
        });
        //商品全选或商品取消全选
        $(document).on('click','.all-check-btn',function(){
            var isChecked = $(this).attr('allchecked');
            //判断结果当前是全选状态
            if( isChecked === 'true' ){
                _cart.unChecked(function(){
                    _this.renderHtml()
                },function( errMsg ){
                    _mm.errorTips( errMsg )
                });
            //判断结果当前非全选状态
            }else if(isChecked === 'false'){
                _cart.allChecked(function(){
                    _this.renderHtml()
                },function( errMsg ){
                    _mm.errorTips( errMsg )
                })
            }
        });
        //单个商品选中或取消选中
        $(document).on('click','.cart-item-check input',function(){
            var productchecked  = parseInt($(this).attr('productchecked')),
                productId       = $(this).attr('productId');
            //当前商品productchecked值为1
            if( !!productchecked ){
                _cart.unSelect({
                    "productId" : productId
                },function(){
                    //成功
                    _this.renderHtml();
                },function( errMsg ){
                    //失败
                    _mm.errorTips( errMsg )
                });
            //当前商品productchecked值为1
            }else{
                _cart.select({
                    "productId" : productId
                },function(){
                    //成功
                    _this.renderHtml();
                },function( errMsg ){
                    //失败
                    _mm.errorTips( errMsg )
                })
            }
        });
        //单个移除商品
        $(document).on('click','.cart-item-opear span',function(){
            var productId = $(this).attr('productId');
            //确认删除该商品
            if(confirm('是否确认删除该商品？')){
                _cart.deletProduct({
                    "productIds" : productId
                },function(){
                    _this.renderHtml();
                    //调用nav模块重新载入右上角购物车数量信息
                    _nav.init();
                },function( errMsg ){
                    _mm.errorTips( errMsg )
                })
            }
        });
        //多个选中商品移除
        $(document).on('click','.foot-item-delet span',function(){
            var arr =[];
            //循环当前购物车中所有被选中商品
            $('.cart-item-check input').each(function(){
                var productchecked = parseInt($(this).attr('productchecked'));
                var productId = parseInt($(this).attr('productId'));
                if(productchecked){
                    arr.push(productId)
                }
            });
            var productIds = arr.join(',');
            //确认删除该商品
            if(confirm('是否确认删除所选商品？')){
                _cart.deletProduct({
                    "productIds" : productIds
                },function(){
                    //成功
                    _this.renderHtml();
                    //调用nav模块重新载入右上角购物车数量信息
                    _nav.init();
                },function( errMsg ){
                    //失败
                    _mm.errorTips( errMsg )
                });
            }
        });
        //支付按钮逻辑
        $(document).on('click','.foot-item-topay span',function(){
            var money = $('.foot-item-totle .foot-item-totle-money').text();
            money = parseInt(money.substr(1));
            if( !!money ){
                window.location.href='./order-confirm.html';
            }else{
                _mm.errorTips('请选择需要去结算的商品')
            }
        })
    },
    //请求购物车数据渲染页面
    renderHtml : function(){
        _cart.getCartInfo(function( res ){
            //成功
            //返回数据商品列为空时
            if( res.cartProductVoList.length === 0 ){
                $('.cart-wrap').text('抱歉，您还没有添加任何商品到购物车。').addClass('cart-error')
            //返回数据商品列不为空时
            }else{
                var dataList = res;
                var cartHtml = _mm.renderHtml( cartTemplate , dataList);
                $('.cart-wrap').html(cartHtml);
            }
        },function( errMsg ){
            //失败
        });
    },
    //更新购物车商品数量
    updataCart : function( data ){
        var _this = this;
        _cart.updataCart(data,function( res ){
            //成功
            _this.renderHtml();
            //调用nav模块重新载入右上角购物车数量信息
            _nav.init();
        },function( errMsg ){
            //失败
            _mm.errorTips( errMsg )
        })
    }
};

cart.init();

/***/ }),

/***/ 37:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 38:
/***/ (function(module, exports) {

module.exports = "\r\n<table class=\"cart-con\">\r\n    <thead>\r\n    <tr class=\"cart-title\">\r\n        <td class=\"cart-title-check\">\r\n            {{#allChecked}}\r\n            <input type=\"checkbox\" checked=\"checked\" class=\"all-check-btn\" allChecked=\"{{allChecked}}\"/>\r\n            {{/allChecked}}\r\n            {{^allChecked}}\r\n            <input type=\"checkbox\" class=\"all-check-btn\" allChecked=\"{{allChecked}}\"/>\r\n            {{/allChecked}}\r\n            <span>全选</span>\r\n        </td>\r\n        <td class=\"cart-title-info\">\r\n            <span>商品信息</span>\r\n        </td>\r\n        <td class=\"cart-title-price\">\r\n            <span>单价</span>\r\n        </td>\r\n        <td class=\"cart-title-count\">\r\n            <span>数量</span>\r\n        </td>\r\n        <td class=\"cart-title-totle\">\r\n            <span>合计</span>\r\n        </td>\r\n        <td class=\"cart-title-opare\">\r\n            <span>操作</span>\r\n        </td>\r\n    </tr>\r\n    </thead>\r\n    <tbody>\r\n    {{#cartProductVoList}}\r\n    <tr class=\"cart-list\">\r\n        <td class=\"cart-item-check\">\r\n            {{#productChecked}}\r\n            <input type=\"checkbox\" checked productId=\"{{productId}}\" productChecked=\"{{productChecked}}\"/>\r\n            {{/productChecked}}\r\n            {{^productChecked}}\r\n            <input type=\"checkbox\" productId=\"{{productId}}\" productChecked=\"{{productChecked}}\"/>\r\n            {{/productChecked}}\r\n        </td>\r\n        <td class=\"cart-item-info\">\r\n            <a class=\"link-text\" href=\"./detail.html?productId={{productId}}\" target=\"_blank\">\r\n                <img src=\"{{imageHost}}{{productMainImage}}\" alt=\"{{productSubtitle}}\"/>\r\n                <span>\r\n                    {{productName}}\r\n                </span>\r\n            </a>\r\n        </td>\r\n        <td class=\"cart-item-price\">\r\n            <span>{{productPrice}}</span>\r\n        </td>\r\n        <td class=\"cart-item-count\" productId={{productId}} quantity={{quantity}} productStock={{productStock}}>\r\n            <input type=\"button\" value=\"-\" btnType=\"minus\"/>\r\n            <input type=\"text\" value=\"{{quantity}}\" disabled/>\r\n            <input type=\"button\" value=\"+\" btnType=\"add\"/>\r\n        </td>\r\n        <td class=\"cart-item-totle\">\r\n            <span>￥{{productTotalPrice}}</span>\r\n        </td>\r\n        <td class=\"cart-item-opear\">\r\n            <span productId=\"{{productId}}\">删除</span>\r\n        </td>\r\n    </tr>\r\n    {{/cartProductVoList}}\r\n    </tbody>\r\n    <tfoot>\r\n    <tr class=\"foot-item\">\r\n        <td class=\"foot-item-check\" colspan=\"1\">\r\n            {{#allChecked}}\r\n            <input type=\"checkbox\" checked class=\"all-check-btn\" allChecked=\"{{allChecked}}\" />\r\n            {{/allChecked}}\r\n            {{^allChecked}}\r\n            <input type=\"checkbox\" class=\"all-check-btn\" allChecked=\"{{allChecked}}\" />\r\n            {{/allChecked}}\r\n            <span>全选</span>\r\n        </td>\r\n        <td class=\"foot-item-delet\" colspan=\"3\">\r\n                    <span>\r\n                        <i class=\"fa fa-trash\"></i>\r\n                        删除选中\r\n                    </span>\r\n        </td>\r\n        <td class=\"foot-item-totle\" colspan=\"1\">\r\n            <span>总价</span>\r\n            <span class=\"foot-item-totle-money\">￥{{cartTotalPrice}}</span>\r\n        </td>\r\n        <td class=\"foot-item-topay\" colspan=\"1\">\r\n            <span class=\"btn\">去结算</span>\r\n        </td>\r\n    </tr>\r\n    </tfoot>\r\n</table>\r\n";

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

},[36]);