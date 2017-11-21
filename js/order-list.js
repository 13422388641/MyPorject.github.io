webpackJsonp([1],[
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
/* 8 */
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
/* 9 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = "{{#navList}}\r\n<li class=\"navside-item\">\r\n    {{#isActive}}\r\n    <a class=\"link active\" href=''>{{disc}}</a>\r\n    {{/isActive}}\r\n    {{^isActive}}\r\n    <a class=\"link\" href=\"{{href}}\">{{disc}}</a>\r\n    {{/isActive}}\r\n</li>\r\n{{/navList}}";

/***/ }),
/* 11 */,
/* 12 */,
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Created by jasen on 2017/11/12.
 */
var _mm = __webpack_require__(0);

var _order = {
    //产品搜索
    getOrderCartList : function(  suc , err ){
        _mm.request({
            url     : _mm.getServerUrl('/order/get_order_cart_product.do'),
            success : suc,
            error   : err
        })
    },
    creatOrder : function( data , suc , err ){
        _mm.request({
            url     : _mm.getServerUrl('/order/create.do'),
            data    : data,
            success : suc,
            error   : err
        })
    },
    getOrderList : function( data , suc , err ){
        _mm.request({
            url     : _mm.getServerUrl('/order/list.do'),
            data    : data,
            success : suc,
            error   : err
        })
    },
    getOrderDetail : function( data , suc , err ){
        _mm.request({
            url     : _mm.getServerUrl('/order/detail.do'),
            data    : data,
            success : suc,
            error   : err
        })
     },
    deletOrder      : function( data , suc , err ){
        _mm.request({
            url     : _mm.getServerUrl('/order/cancel.do'),
            data    : data,
            success : suc,
            error   : err
        })
    }
};

module.exports = _order ;

/***/ }),
/* 14 */,
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Created by jasen on 2017/11/18.
 */
__webpack_require__(16);
var _mm         = __webpack_require__(0);
var template    = __webpack_require__(17);

/*
    参数说明
 option.interval控制分页最右两则区间取值范围

*/
var  Pagination = function(){
    this.option = {
        "interval" : 3
    };
    this.pageInfo = '';
    this.data = {
        "list" : ''
    }
};
/* 外部实例化对象后执行脚本主方法 */
Pagination.prototype.init = function( pageInfo , $element ){
    /* 缓存接口数据及提取页码跟尾页保存对象中 */
    this.pageInfo = pageInfo;
    this.data.pageNum   = this.pageInfo.pageNum;
    this.data.lastPage  = this.pageInfo.lastPage;
    this.setData();
    this.renderHtml( $element )
};
/* 计算分页数据 */
Pagination.prototype.setData = function(){
    var arrayData   = [],
         pageInfo    = this.pageInfo,
         interval    = this.option.interval,
         star        = pageInfo.pageNum - interval > 0 ? (pageInfo.pageNum - 3) : 1 ,
         end         = pageInfo.pageNum + interval < pageInfo.pages ? (pageInfo.pageNum + interval) : pageInfo.pages ;

    arrayData.push({
        "name"      : "上一页",
        "disabled"  : !pageInfo.hasPreviousPage,
        "pageNum"   : pageInfo.prePage
    });

    for( var i = star ; i <= end ; i++ ){
        arrayData.push({
            "name"      : i,
            "pageNum"   : i,
            "active"    : i === pageInfo.pageNum ? "active" : '',
            "disabled"  : i === pageInfo.pageNum ? true : false
        })
    }

    arrayData.push({
        "name"      : "下一页",
        "disabled"  : !pageInfo.hasNextPage,
        "pageNum"   : pageInfo.nextPage
    });
    //计算后结果保存到对象中
    this.data.list = arrayData;
};
/* 调用工具类渲染页面数据并插入到DOM元素中 */
Pagination.prototype.renderHtml = function( $element ){
    var paginationHtml = _mm.renderHtml( template , this.data );
    $element.html(paginationHtml);
};


module.exports = Pagination;

/***/ }),
/* 16 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = "{{#list}}\r\n    {{#disabled}}\r\n        <input class=\"pagiantion-btn {{active}}\" type=\"button\" disabled=\"{{disabled}}\"  value=\"{{name}}\" pageNum=\"{{pageNum}}\">\r\n    {{/disabled}}\r\n    {{^disabled}}\r\n        <input class=\"pagiantion-btn\" type=\"button\"  value=\"{{name}}\" pageNum=\"{{pageNum}}\">\r\n    {{/disabled}}\r\n{{/list}}\r\n    <span class=\"pagiantion-pageNum\">{{pageNum}}</span>/<span class=\"pagiantion-lastPage\">{{lastPage}}</span>";

/***/ }),
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */,
/* 32 */,
/* 33 */,
/* 34 */,
/* 35 */,
/* 36 */,
/* 37 */,
/* 38 */,
/* 39 */,
/* 40 */,
/* 41 */,
/* 42 */,
/* 43 */,
/* 44 */,
/* 45 */,
/* 46 */,
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Created by jasen on 2017/11/17.
 */
__webpack_require__(48);
__webpack_require__(3);
__webpack_require__(6);
__webpack_require__(8);

var $                   = __webpack_require__(1);
var _mm                 = __webpack_require__(0);
var _order              = __webpack_require__(13);
var _navSide            = __webpack_require__(8);
var orderListTemplate   = __webpack_require__(49);
var Pagination          = __webpack_require__(15);

var orderList = {
    data      : {
        getOrderListData : {
            "pageSize" : 2,
            "pageNum"  : 1
        }
    },
    init      : function(){
        this.bindEvent()
    },
    bindEvent : function(){
        var _this = this;
        var option = {
            "name" : "order-list"
        };
        //传递参数到侧边栏页面渲染HTML
        _navSide.init(option);
        //执行页面模板渲染逻辑
        this.renderHtml();
        //分页按钮点击事件
        $(document).on('click','.pagiantion .pagiantion-btn',function(){
            _this.data.getOrderListData.pageNum = $(this).attr('pageNum');
            //再执行渲染页面模板逻辑
            _this.renderHtml()
        })
    },
    //渲染页面模板逻辑
    renderHtml : function(){
        var  _this = this;
        var  data = this.data.getOrderListData;
        //请求订单列表数据
        _order.getOrderList( data , function( res ){
            //成功
            //渲染订单列表数据
            var orderListHtml = _mm.renderHtml( orderListTemplate , res );
            $('.cont-orderList').html( orderListHtml );
            //执行分页数据处理逻辑，提取接口返回部分数据传入
            _this.renderPagination({
                "hasPreviousPage"   : res.hasPreviousPage,
                "prePage"           : res.prePage,
                "hasNextPage"       : res.hasNextPage,
                "nextPage"          : res.nextPage,
                "pageNum"           : res.pageNum,
                "pages"             : res.pages,
                "lastPage"          : res.lastPage
            })
        },function( errMsg ){
            //失败
        })
    },
    //分页数据处理逻辑
    renderPagination : function( pageInfo ) {
        var $pagiantion = $('.pagiantion');
        this.pagination ? '' : this.pagination = new Pagination();
        this.pagination.init( pageInfo , $pagiantion )
    }
};

orderList.init();

/***/ }),
/* 48 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 49 */
/***/ (function(module, exports) {

module.exports = "\r\n    <table class=\"order-list-title\">\r\n        <thead>\r\n            <tr class=\"list-title-cell\">\r\n                <td class=\"list-title-productInfo\">商品信息</td>\r\n                <td class=\"list-title-price\">单价</td>\r\n                <td class=\"list-title-count\">数量</td>\r\n                <td class=\"list-title-total\">合计</td>\r\n            </tr>\r\n        </thead>\r\n        <tbody></tbody>\r\n        <tfoot></tfoot>\r\n    </table>\r\n    {{#list}}\r\n    <table class=\"order-list-con\">\r\n        <thead></thead>\r\n        <tbody>\r\n            <tr class=\"orderInfo-con\">\r\n                <td class=\"orderInfo-cell\" colspan=\"5\">\r\n                    <span class=\"orderInfo-cell-orderNum\">\r\n                        <span>订单号：</span>\r\n                        <a href=\"./order-detail.html?orderNo={{orderNo}}\" class=\"link\" target=\"_blank\">\r\n                            {{orderNo}}\r\n                        </a>\r\n                    </span>\r\n                    <span class=\"orderInfo-cell-orderTime\">\r\n                        <span>{{createTime}}</span>\r\n                    </span>\r\n                    <span class=\"orderInfo-cell-userName\">\r\n                        <span>收件人：</span>\r\n                        <span>{{receiverName}}</span>\r\n                    </span>\r\n                    <span class=\"orderInfo-cell-orderStatus\">\r\n                        <span>订单状态</span>\r\n\r\n                        <span class=\"notpay\">{{statusDesc}}</span>\r\n\r\n                    </span>\r\n                    <span class=\"orderInfo-cell-total\">\r\n                        <span>订单总价</span>\r\n                        <span class=\"orderInfo-cell-total-money\">￥{{payment}}</span>\r\n                    </span>\r\n                    <span class=\"orderInfo-cell-opare\">\r\n                        <a class=\"link\" href=\"./order-detail.html?orderNo={{orderNo}}\" target=\"_blank\">\r\n                            查看详情>\r\n                        </a>\r\n                    </span>\r\n                </td>\r\n            </tr>\r\n            {{#orderItemVoList}}\r\n            <tr class=\"orderInfo-productInfo\">\r\n                <td class=\"orderInfo-productInfo-p\">\r\n                    <a class=\"link\" href=\"./detail.html?productId={{productId}}\" target=\"_blank\">\r\n                        <img src=\"{{imageHost}}{{productImage}}\" alt=\"{{productName}}\"/>\r\n                        <span>{{productName}}</span>\r\n                    </a>\r\n                </td>\r\n                <td class=\"orderInfo-productInfo-price\">\r\n                    <span>￥{{currentUnitPrice}}</span>\r\n                </td>\r\n                <td class=\"orderInfo-productInfo-count\">\r\n                    <span>{{quantity}}</span>\r\n                </td>\r\n                <td class=\"orderInfo-productInfo-totale\">\r\n                    <span>￥{{totalPrice}}</span>\r\n                </td>\r\n            </tr>\r\n            {{/orderItemVoList}}\r\n        </tbody>\r\n        <tfoot></tfoot>\r\n    </table>\r\n    {{/list}}";

/***/ })
],[47]);