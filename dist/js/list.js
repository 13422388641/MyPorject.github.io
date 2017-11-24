webpackJsonp([2],[
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
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */
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
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Created by jasen on 2017/10/26.
 */
__webpack_require__(31);
__webpack_require__(3);
__webpack_require__(6);

var $             = __webpack_require__(1);
var _mm           = __webpack_require__(0);
var _product      = __webpack_require__(14);
var listTemplate  = __webpack_require__(32);
var Pagination    = __webpack_require__(15);
var _cart         = __webpack_require__(4);
var _nav            = __webpack_require__(3);

var list = {
    data        : {
        "dataType"     : 'default',
        "productInfo"   : {
                "keyword"       : _mm.getUrlParam('keyword') || '',
                "categoryId"    : _mm.getUrlParam('categoryId') || '',
                "pageNum"       : _mm.getUrlParam('pageNum') || 1,
                "pageSize"      : _mm.getUrlParam('pageSize') || 10,
                "orderBy"       : _mm.getUrlParam('orderBy') || 'default'
        }
    },
    init        : function(){
        this.bindEvent();
    },
    bindEvent   : function(){
        var _this = this;
        //loading图片
        $('.list-con').html("<div class='loading'></div>");
        this.load(this.data.productInfo);
        //阻止默认事件
        $('.sort-list li').mousedown(function(){
            return false;
        });
        //排序功能点击事件
        $('.sort-list li').click(function(){
            var $this = $(this),
                $type = $this.data('type'),
                $desc = $('.fa-sort-desc'),
                $asc  = $('.fa-sort-asc');
            //切换排序方法时页码还原成第一页
            _this.data.productInfo.pageNum = 1;
            //排序逻辑判定
            if( $type != _this.data.dataType ){
                _this.data.dataType = $type;
                $this.addClass('active').siblings().removeClass('active');
                //点击切换不同排序类型
                if( $type === 'default' ){
                    //切换为默认排序请求数据
                    _this.data.productInfo.orderBy = 'default';
                    _this.load(_this.data.productInfo);
                    //改变价格排序样式
                    $this.siblings().find('i').css({
                        color : "black"
                    });
                    $('.sort-list i').attr('current','false');
                }else if( $type === 'money'){
                    //切换为按价格排序请求数据
                    _this.data.productInfo.orderBy = 'price_desc';
                    _this.load(_this.data.productInfo);
                    //改变价格排序样式
                    $desc.css({
                        color : "#c60023"
                    });
                    $desc.attr('current','on');
                }
            }else {
                if( $desc.attr('current') === 'on' ){
                    _this.data.productInfo.orderBy = 'price_asc';
                    _this.load(_this.data.productInfo);
                    //改变价格排序样式
                    $desc.attr('current','off');
                    $asc.attr('current','on');
                    $desc.css({
                        color : "black"
                    });
                    $asc.css({
                        color : "#c60023"
                    });
                }else if( $desc.attr('current') === 'off' ){
                    _this.data.productInfo.orderBy = 'price_desc';
                    _this.load(_this.data.productInfo);
                    //改变价格排序样式
                    $asc.attr('current','off');
                    $desc.attr('current','on');
                    $asc.css({
                        color : "black"
                    });
                    $desc.css({
                        color : "#c60023"
                    });
                }
            }
        });
        //分页列表点击事件
        $(document).on('click','.pagiantion input',function(){
            _this.data.productInfo.pageNum = $(this).attr('pagenum');
            _this.load(_this.data.productInfo)
        });
        //添加商品到购物车
        $(document).on('click','#add-cart',function(){
            var productId = $(this).attr('productId');
            _cart.addCart( {
                "productId" : productId,
                "count"     : 1
            } , function( res ){
                //成功
                //商品库存数量获取
                var quantity = _this.checkQuantity( res.cartProductVoList ,productId );
                if( quantity ){
                    _mm.successTips("购物车成功添加商品");
                    //重新渲染页面右上角购物车数量数据
                    _nav.loadCartCount()
                }else{
                    _mm.errorTips("该商品库存不足");
                }
            } , function( errMsg ){
                //失败
                _mm.errorTips( errMsg )
            })
        })
    },
    //进入页面后加载列表数据
    load        : function(data){
        var _this = this;
        //进入页面没有keyword或categoryId参数值时则自动返回首页
        if( !_mm.getUrlParam('keyword') && !_mm.getUrlParam('categoryId') ){
            window.location.href = './index.html'
        }
        _product.productSearch(data , function( res ){
            if( res.list.length === 0 ){
                $('.list-con').html("<div class='product-error'>该商品尚未上架敬请期待</div>");
                return
            }
            //请求商品列表成功
            var listHtml = _mm.renderHtml(listTemplate,res);
            $('.list-con').html(listHtml);
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
        } , function( errMSg ){
            alert(errMSg)
        });
    },
    //分页数据处理逻辑
    renderPagination : function( pageInfo ) {
        var $pagiantion = $('.pagiantion');
        this.pagination ? '' : this.pagination = new Pagination();
        this.pagination.init( pageInfo , $pagiantion )
    },
    //获取当前点击商品库存数量
    checkQuantity : function( productList , productId ){
        var productId = parseInt(productId);
        for( var i =0 , length = productList.length ; i < length ; i++ ){
            if( productId === productList[i].productId ){
                return productList[i].quantity
            }
        }
    }
};

    list.init();

/***/ }),
/* 31 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 32 */
/***/ (function(module, exports) {

module.exports = "{{#list}}\r\n<li class=\"list-con-item\">\r\n    <a href=\"./detail.html?productId={{id}}\">\r\n        <img class=\"item-pic\" src=\"{{imageHost}}{{mainImage}}\" alt=\"{{name}}\"/>\r\n                    <span class=\"item-des\">\r\n                        <span class=\"item-des-price\">￥{{price}}</span>\r\n                        <span class=\"item-des-subtitle\">{{subtitle}}</span>\r\n                         <span class=\"item-des-name\">{{name}}</span>\r\n                    </span>\r\n    </a>\r\n    <span id=\"add-cart\" productId=\"{{id}}\">\r\n        <i class=\"fa fa-cart-plus\"></i>\r\n        加入购物车\r\n    </span>\r\n</li>\r\n{{/list}}";

/***/ })
],[30]);