webpackJsonp([0],[
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
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Created by jasen on 2017/11/11.
 */
var _mm     = __webpack_require__(0);

var _address   = {
    //获取购物车数量
    getAddressList : function( data, suc , err ){
        _mm.request({
            url     : _mm.getServerUrl('test.happymmall.com/shipping/list.do'),
            data    : data,
            success : suc,
            error   : err
        })
    },
    addAddress : function( data , suc , err ){
        _mm.request({
            url     : _mm.getServerUrl('/shipping/add.do'),
            data    : data,
            success : suc,
            error   : err
        })
    },
    getAddressInfo : function( data , suc , err ){
        _mm.request({
            url     : _mm.getServerUrl('/shipping/select.do'),
            data    : data,
            success : suc,
            error   : err
        })
    },
    updataAddress   : function( data , suc , err ){
        _mm.request({
            url     : _mm.getServerUrl('/shipping/update.do'),
            data    : data,
            success : suc,
            error   : err
        })
    },
    deletAddress   : function( data , suc , err ){
        _mm.request({
            url     : _mm.getServerUrl('/shipping/del.do'),
            data    : data,
            success : suc,
            error   : err
        })
    }
};

module.exports = _address;

/***/ }),
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
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Created by jasen on 2017/11/11.
 */
__webpack_require__(40);
__webpack_require__(3);
__webpack_require__(6);

var $                  = __webpack_require__(1);
var _mm                = __webpack_require__(0);
var _addressInfo       = __webpack_require__(41);
var _address           = __webpack_require__(18);
var _order             = __webpack_require__(13);
var addressTemplate    = __webpack_require__(45);
var productTemplate    = __webpack_require__(46);

var order = {
    data : {
        shippingId : {
            "shippingId" : null
        }
    },
    init : function(){
        this.bindEvemt();
    },
    bindEvemt : function(){
        var _this = this;
        this.renderAddressListHtml();
        this.renderProductListHtml();
        //已有地址选中时样式变化
        $(document).on('click','.addressList-item',function(){
           $(this).addClass('active')
               .siblings('.addressList-item')
               .removeClass('active');
            //存储当前被选中地址ID信息
            _this.data.shippingId.shippingId = $(this).data('id');
        });
        //提交订单按钮逻辑
        $(document).on('click','.productList-submit #topay',function(){
            var shippingId = _this.data.shippingId.shippingId;
            if( shippingId ){
                _order.creatOrder(_this.shippingId, function( res ){
                    //成功
                    window.location.href = './payment.html?orderNo='+res.orderNo;
                }, function( errMsg ){
                    //失败
                    _mm.errorTips( errMsg )
                })
            }else{
                _mm.errorTips("请选择收货地址")
            }
        });
        //增加邮寄地址按钮逻辑
        $(document).on('click','.addressList-add',function(){
            var option = {
                "update"        : false,
                "addressData"   : null
            };
            _addressInfo.show( option )
        });
        //弹出框省份变化时二级联动逻辑
        $(document).on('change','#form-item-province',function(){
            var provincesName = $(this).val();
            _addressInfo.getCities( provincesName )
        });
        //关闭弹出框按钮逻辑
        $(document).on('click','.pop-title .pop-close',function(){
            _addressInfo.hide()
        });
        //点击蒙版层关闭弹出框
        $(document).on('click','.pop-box',function(){
            _addressInfo.hide()
        });
        //弹出框区域禁止点击事件冒泡
        $(document).on('click','.pop-con',function( e ){
            var e = e || event;
            e.stopPropagation();
        });
        //保存地址修改信息
        $(document).on('click','.newAddress-submit span,.updateAddress-submit span',function(){
            var addressNew   = _addressInfo.testFormData(),
                $type        = $(this).attr('type');
            $('.form-item-errTips').hide();
            //收货人名有误
            if( addressNew.errMsg.receiverName ){
                $('#errTips-username').show().text(addressNew.errMsg.receiverName);
            //地址有误
            }else if( addressNew.errMsg.provinc ){
                $('#errTips-addressInfo').show().text(addressNew.errMsg.provinc);
            //详细地址有误
            }else if( addressNew.errMsg.receiverAddress ){
                $('#errTips-detialInfo').show().text(addressNew.errMsg.receiverAddress);
            //电话号码有误
            }else if( addressNew.errMsg.receiverPhone ){
                $('#errTips-tel').show().text(addressNew.errMsg.receiverPhone);
            //填写信息均正确
            }else{
                //当前操作为新增地址
                if( $type === 'newAddress' ){
                    //接口请求添加新地址
                    _address.addAddress(addressNew.addressNew, function(){
                        //成功
                        _addressInfo.hide();
                        //重新渲染地址信息模板
                        _this.renderAddressListHtml()
                    }, function( errMsg ){
                        //失败
                        _mm.errorTips( errMsg )
                    })
                //当前操作为更新地址
                }else if( $type === 'update' ){
                    //接口请求更新地址
                    addressNew.addressNew.id = _this.data.shippingId.shippingId;
                    _address.updataAddress(addressNew.addressNew, function(){
                        //成功
                        _addressInfo.hide();
                        //重新渲染地址信息模板
                        _this.renderAddressListHtml()
                    }, function( errMsg ){
                        //失败
                        _mm.errorTips( errMsg )
                    })
                }

            }
        });
        //已有收货地址点击修改时逻辑
        $(document).on('click','.address-opera .reviseAddress',function(){
            var shippingId = $(this).data('id');
            _address.getAddressInfo({
                "shippingId" : shippingId
            }, function( res ){
                //成功
                _addressInfo.show({
                    "update"        : true,
                    "addressData"   : res
                })
            }, function( errMsg ){
                //失败
                _mm.errorTips( errMsg )
            })
        });
        //删除已有地址
        $(document).on('click','.address-opera .deletAddress',function(){
            var shippingId = $(this).data('id');
            _address.deletAddress({
                "shippingId" : shippingId
            }, function( res ){
                //成功
                _mm.successTips( res );
                //重新渲染HTML模板数据
                _this.renderAddressListHtml()
            }, function( errMsg ){
                //失败
                _mm.errorTips( errMsg )
            })
        });
    },
    //请求地址数据渲染页面
    renderAddressListHtml   : function(){
        var _this = this;
        $('.address-wrap').html("<div class='loading'></div>");
        _address.getAddressList({
            "pageSize" : 10
        },function( res ){
            //成功
            var dataList = res;
            var dataListNew = _this.getDateTime( dataList );
            var addressHtml = _mm.renderHtml( addressTemplate , dataListNew);
            $('.address-wrap').html(addressHtml);
        },function( errMsg ){
            //失败
            _mm.errorTips( errMsg )
        });
    },
    //请求商品列表数据渲染页面
    renderProductListHtml   : function(){
        $('.productList-con').html("<div class='loading'></div>");
        _order.getOrderCartList(function( res ){
            //成功
            var dataList = res;
            var orderListHtml = _mm.renderHtml( productTemplate , dataList);
            $('.productList-con').html(orderListHtml);
        },function( errMsg ){
            //失败
            $('.productList-con').html( errMsg ).addClass('order-error')
        });
    },
    //时间戳格式转换
    getDateTime             : function( dataList ){
        for(var i=0 , length = dataList.list.length ; i < length ; i++){
            var dateNew = new Date( dataList.list[i].updateTime );
            dateNew = dateNew.toLocaleDateString( dataList.list[i].updateTime );
            dataList.list[i].updateTime = dateNew;
        }
        return dataList;
    }
};

order.init();

/***/ }),
/* 40 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Created by jasen on 2017/11/12.
 */
var $                       = __webpack_require__(1);
var _mm                     = __webpack_require__(0);
var _citiesInfo             = __webpack_require__(42);
var _address                = __webpack_require__(18);
var _order                  = __webpack_require__(13);
var addAddressTemplate      = __webpack_require__(43);
var reviseAddressTemplate   = __webpack_require__(44);

var addressInfo = {
    show : function( option ){
        this.renderAddAddressHtml( option )
    },
    hide : function(){
        $('.pop-wrap').html('');
    },
    testFormData : function(){
        var result = {
            "addressNew"    : {
            },
            "errMsg"        : {
            }
        },
            receiverName            = $.trim($('#form-item-username').val()),
            receiverProvince        = $('#form-item-province').val(),
            receiverCity            = $.trim($('#form-item-city').val()),
            receiverAddress         = $('#form-item-detialInfo').val(),
            receiverPhone           = $.trim($('#form-item-tel').val()),
            receiverMobile          = $.trim($('#form-item-zipCode').val());
        if(receiverName == ''){
            result.errMsg.receiverName = '请正确填写收件人'
        }else{
            result.addressNew.receiverName = receiverName;
        }

        if(receiverProvince=='请选择' || receiverCity=='请选择' ){
            result.errMsg.provinc = '请选择省份信息'
        }else{
            result.addressNew.receiverProvince = receiverProvince;
            result.addressNew.receiverCity = receiverCity;
        }

        if(receiverAddress==''){
            result.errMsg.receiverAddress = '请填写详细收件地址'
        }else{
            result.addressNew.receiverAddress = receiverAddress;
        }

        if( !_mm.valueData(receiverPhone,'tel' )){
            result.errMsg.receiverPhone = '手机格式不正确'
        }else{
            result.addressNew.receiverPhone = receiverPhone;
            result.addressNew.receiverMobile = receiverMobile;
        }
        return result
    },
    //根据增加/更新地址渲染弹出框
    renderAddAddressHtml : function( option ){
        //全国省份信息数组
        var provinces = _citiesInfo.getProvinces();
        //是修改信息按钮触发弹窗
        if( option.update ){
            var addressData = option.addressData;
            var reviseAddressHtml = _mm.renderHtml(reviseAddressTemplate,addressData);
            var receiverProvince = addressData.receiverProvince;
            var receiverCity = addressData.receiverCity;
            var provincesHtml = this.creatHtml(provinces);
            //渲染模板数据
            $('.pop-wrap').html(reviseAddressHtml);
            //对应回填接口数据省份信息
            $('#form-item-province')
                .html(provincesHtml)
                .find("option[value="+receiverProvince+"]")
                .attr('selected','true');
            //对应回填接口数据市信息
            this.getCities( receiverProvince );
            $('#form-item-city')
                .find("option[value="+receiverCity+"]")
                .attr('selected','true');
        //不是修改信息按钮触发弹窗
        }else{
            $('.pop-wrap').html(addAddressTemplate);
            var selectHtml = $('#form-item-province').html();
            selectHtml += this.creatHtml( provinces );
            $('#form-item-province').html(selectHtml)
        }
    },
    //弹出框二级联动变化逻辑
    getCities : function( provincesName ){
        var cities = _citiesInfo.getCities( provincesName ),
            selectHtml = "<option value=请选择>请选择</option>";
        selectHtml += this.creatHtml( cities );
        $('#form-item-city').html( selectHtml );
    },
    //select选项HTML内容渲染
    creatHtml : function( dataList ){
        var selectHtml = '';
        for(var i = 0 ,length=dataList.length; i<length ; i++){
            selectHtml += "<option value="+dataList[i]+">"+dataList[i]+"</option>"
        }
        return selectHtml;
    }
};
module.exports = addressInfo;

/***/ }),
/* 42 */
/***/ (function(module, exports) {

/**
 * Created by jasen on 2017/11/12.
 */

var cities = {
    "data": [
        {
            "name": "北京",
            "citys": [
                "东城区",
                "西城区",
                "崇文区",
                "宣武区",
                "朝阳区",
                "海淀区",
                "丰台区",
                "石景山区",
                "房山区",
                "通州区",
                "顺义区",
                "昌平区",
                "大兴区",
                "怀柔区",
                "平谷区",
                "门头沟区",
                "密云区",
                "延庆区",
                "其他"
            ]
        },
        {
            "name": "广东",
            "citys": [
                "广州",
                "深圳",
                "珠海",
                "汕头",
                "韶关",
                "佛山",
                "江门",
                "湛江",
                "茂名",
                "肇庆",
                "惠州",
                "梅州",
                "汕尾",
                "河源",
                "阳江",
                "清远",
                "东莞",
                "中山",
                "潮州",
                "揭阳",
                "云浮",
                "其他"
            ]
        },
        {
            "name": "上海",
            "citys": [
                "黄浦区",
                "卢湾区",
                "徐汇区",
                "长宁区",
                "静安区",
                "普陀区",
                "闸北区",
                "虹口区",
                "杨浦区",
                "宝山区",
                "闵行区",
                "嘉定区",
                "松江区",
                "金山区",
                "青浦区",
                "南汇区",
                "奉贤区",
                "浦东新区",
                "崇明区",
                "其他"
            ]
        },
        {
            "name": "天津",
            "citys": [
                "和平区",
                "河东区",
                "河西区",
                "南开区",
                "河北区",
                "红桥区",
                "塘沽区",
                "汉沽区",
                "大港区",
                "东丽区",
                "西青区",
                "北辰区",
                "津南区",
                "武清区",
                "宝坻区",
                "静海县",
                "宁河县",
                "蓟县",
                "其他"
            ]
        },
        {
            "name": "重庆",
            "citys": [
                "渝中区",
                "大渡口区",
                "江北区",
                "南岸区",
                "北碚区",
                "渝北区",
                "巴南区",
                "长寿区",
                "双桥区",
                "沙坪坝区",
                "万盛区",
                "万州区",
                "涪陵区",
                "黔江区",
                "永川区",
                "合川区",
                "江津区",
                "九龙坡区",
                "南川区",
                "綦江县",
                "潼南区",
                "荣昌区",
                "璧山区",
                "大足区",
                "铜梁县",
                "梁平县",
                "开县",
                "忠县",
                "城口县",
                "垫江区",
                "武隆县",
                "丰都县",
                "奉节县",
                "云阳县",
                "巫溪县",
                "巫山县",
                "其他"
            ]
        },
        {
            "name": "辽宁",
            "citys": [
                "沈阳",
                "大连",
                "鞍山",
                "抚顺",
                "本溪",
                "丹东",
                "锦州",
                "营口",
                "阜新",
                "辽阳",
                "盘锦",
                "铁岭",
                "朝阳",
                "葫芦岛",
                "其他"
            ]
        },
        {
            "name": "江苏",
            "citys": [
                "南京",
                "苏州",
                "无锡",
                "常州",
                "镇江",
                "南通",
                "泰州",
                "扬州",
                "盐城",
                "连云港",
                "徐州",
                "淮安",
                "宿州",
                "其他"
            ]
        },
        {
            "name": "湖北",
            "citys": [
                "武汉",
                "黄石",
                "十堰",
                "荆州",
                "宜昌",
                "襄樊",
                "鄂州",
                "荆门",
                "孝感",
                "黄冈",
                "咸宁",
                "随州",
                "仙桃",
                "天门",
                "潜江",
                "神农架",
                "其他"
            ]
        },
        {
            "name": "四川",
            "citys": [
                "成都",
                "自贡",
                "攀枝花",
                "泸州",
                "德阳",
                "绵阳",
                "广元",
                "遂宁",
                "内江",
                "乐山",
                "南充",
                "眉山",
                "宜宾",
                "广安",
                "达州",
                "雅安",
                "巴中",
                "资阳",
                "其他"
            ]
        },
        {
            "name": "陕西",
            "citys": [
                "西安",
                "铜川",
                "宝鸡",
                "咸阳",
                "渭南",
                "延安",
                "汉中",
                "榆林",
                "安康",
                "商洛",
                "其他"
            ]
        },
        {
            "name": "河北",
            "citys": [
                "石家庄",
                "唐山",
                "秦皇岛",
                "邯郸",
                "邢台",
                "保定",
                "张家口",
                "承德",
                "沧州",
                "廊坊",
                "衡水",
                "其他"
            ]
        },
        {
            "name": "山西",
            "citys": [
                "太原",
                "大同",
                "阳泉",
                "长治",
                "晋城",
                "朔州",
                "晋中",
                "运城",
                "忻州",
                "临汾",
                "吕梁",
                "其他"
            ]
        },
        {
            "name": "河南",
            "citys": [
                "郑州",
                "开封",
                "洛阳",
                "平顶山",
                "安阳",
                "鹤壁",
                "新乡",
                "焦作",
                "濮阳",
                "许昌",
                "漯河",
                "三门峡",
                "南阳",
                "商丘",
                "信阳",
                "周口",
                "驻马店",
                "焦作",
                "其他"
            ]
        },
        {
            "name": "吉林",
            "citys": [
                "吉林",
                "四平",
                "辽源",
                "通化",
                "白山",
                "松原",
                "白城",
                "延边朝鲜自治区",
                "其他"
            ]
        },
        {
            "name": "黑龙江",
            "citys": [
                "哈尔滨",
                "齐齐哈尔",
                "鹤岗",
                "双鸭山",
                "鸡西",
                "大庆",
                "伊春",
                "牡丹江",
                "佳木斯",
                "七台河",
                "黑河",
                "绥远",
                "大兴安岭地区",
                "其他"
            ]
        },
        {
            "name": "内蒙古",
            "citys": [
                "呼和浩特",
                "包头",
                "乌海",
                "赤峰",
                "通辽",
                "鄂尔多斯",
                "呼伦贝尔",
                "巴彦淖尔",
                "乌兰察布",
                "锡林郭勒盟",
                "兴安盟",
                "阿拉善盟"
            ]
        },
        {
            "name": "山东",
            "citys": [
                "济南",
                "青岛",
                "淄博",
                "枣庄",
                "东营",
                "烟台",
                "潍坊",
                "济宁",
                "泰安",
                "威海",
                "日照",
                "莱芜",
                "临沂",
                "德州",
                "聊城",
                "滨州",
                "菏泽",
                "其他"
            ]
        },
        {
            "name": "安徽",
            "citys": [
                "合肥",
                "芜湖",
                "蚌埠",
                "淮南",
                "马鞍山",
                "淮北",
                "铜陵",
                "安庆",
                "黄山",
                "滁州",
                "阜阳",
                "宿州",
                "巢湖",
                "六安",
                "亳州",
                "池州",
                "宣城"
            ]
        },
        {
            "name": "浙江",
            "citys": [
                "杭州",
                "宁波",
                "温州",
                "嘉兴",
                "湖州",
                "绍兴",
                "金华",
                "衢州",
                "舟山",
                "台州",
                "丽水",
                "其他"
            ]
        },
        {
            "name": "福建",
            "citys": [
                "福州",
                "厦门",
                "莆田",
                "三明",
                "泉州",
                "漳州",
                "南平",
                "龙岩",
                "宁德",
                "其他"
            ]
        },
        {
            "name": "湖南",
            "citys": [
                "长沙",
                "株洲",
                "湘潭",
                "衡阳",
                "邵阳",
                "岳阳",
                "常德",
                "张家界",
                "益阳",
                "滨州",
                "永州",
                "怀化",
                "娄底",
                "其他"
            ]
        },
        {
            "name": "广西",
            "citys": [
                "南宁",
                "柳州",
                "桂林",
                "梧州",
                "北海",
                "防城港",
                "钦州",
                "贵港",
                "玉林",
                "百色",
                "贺州",
                "河池",
                "来宾",
                "崇左",
                "其他"
            ]
        },
        {
            "name": "江西",
            "citys": [
                "南昌",
                "景德镇",
                "萍乡",
                "九江",
                "新余",
                "鹰潭",
                "赣州",
                "吉安",
                "宜春",
                "抚州",
                "上饶",
                "其他"
            ]
        },
        {
            "name": "贵州",
            "citys": [
                "贵阳",
                "六盘水",
                "遵义",
                "安顺",
                "铜仁",
                "毕节",
                "其他"
            ]
        },
        {
            "name": "云南",
            "citys": [
                "昆明",
                "曲靖",
                "玉溪",
                "保山",
                "邵通",
                "丽江",
                "普洱",
                "临沧",
                "其他"
            ]
        },
        {
            "name": "西藏",
            "citys": [
                "拉萨",
                "那曲地区",
                "昌都地区",
                "林芝地区",
                "山南区",
                "阿里区",
                "日喀则",
                "其他"
            ]
        },
        {
            "name": "海南",
            "citys": [
                "海口",
                "三亚",
                "五指山",
                "琼海",
                "儋州",
                "文昌",
                "万宁",
                "东方",
                "澄迈县",
                "定安县",
                "屯昌县",
                "临高县",
                "其他"
            ]
        },
        {
            "name": "甘肃",
            "citys": [
                "兰州",
                "嘉峪关",
                "金昌",
                "白银",
                "天水",
                "武威",
                "酒泉",
                "张掖",
                "庆阳",
                "平凉",
                "定西",
                "陇南",
                "临夏",
                "甘南",
                "其他"
            ]
        },
        {
            "name": "宁夏",
            "citys": [
                "银川",
                "石嘴山",
                "吴忠",
                "固原",
                "中卫",
                "其他"
            ]
        },
        {
            "name": "青海",
            "citys": [
                "西宁",
                "海东地区",
                "海北藏族自治区",
                "海南藏族自治区",
                "黄南藏族自治区",
                "果洛藏族自治区",
                "玉树藏族自治州",
                "还西藏族自治区",
                "其他"
            ]
        },
        {
            "name": "新疆",
            "citys": [
                "乌鲁木齐",
                "克拉玛依",
                "吐鲁番地区",
                "哈密地区",
                "和田地区",
                "阿克苏地区",
                "喀什地区",
                "克孜勒苏柯尔克孜",
                "巴音郭楞蒙古自治区",
                "昌吉回族自治州",
                "博尔塔拉蒙古自治区",
                "石河子",
                "阿拉尔",
                "图木舒克",
                "五家渠",
                "伊犁哈萨克自治区",
                "其他"
            ]
        }
    ],
    getProvinces : function(){
        var provinces = [];
        for(var i = 0 ,length = this.data.length ; i < length ; i++){
            provinces.push(this.data[i].name)
        }
        return provinces
    },
    getCities : function( citiesName ){
        for(var i = 0 , length = this.data.length ; i< length ; i++){
            if( citiesName === this.data[i].name ){
                return this.data[i].citys
            }
        }
    }
};

module.exports = cities;

/***/ }),
/* 43 */
/***/ (function(module, exports) {

module.exports = "<div class=\"pop-box\">\r\n    <div class=\"pop-con\">\r\n        <h1 class=\"pop-title\">\r\n            添加新地址\r\n            <i class=\"pop-close fa fa-close\"></i>\r\n        </h1>\r\n        <div class=\"pop-form-username\">\r\n            <label for=\"form-item-username\">\r\n                <span class=\"pop-form-required\">*</span>\r\n                收件人姓名：\r\n            </label>\r\n            <input id=\"form-item-username\" type=\"text\" placeholder=\"请输入收件人姓名\"/>\r\n            <span class=\"form-item-errTips\" id=\"errTips-username\"></span>\r\n        </div>\r\n        <div class=\"pop-form-addressInfo\">\r\n            <label for=\"form-item-province\">\r\n                <span class=\"pop-form-required\">*</span>\r\n                所在城市：\r\n            </label>\r\n            <select id=\"form-item-province\">\r\n                <option value=\"请选择\">请选择</option>\r\n            </select>\r\n            <select id=\"form-item-city\">\r\n                <option value=\"请选择\">请选择</option>\r\n            </select>\r\n            <span class=\"form-item-errTips\" id=\"errTips-addressInfo\"></span>\r\n        </div>\r\n        <div class=\"pop-form-detialInfo\">\r\n            <label for=\"form-item-detialInfo\">\r\n                <span class=\"pop-form-required\">*</span>\r\n                详细地址：\r\n            </label>\r\n            <input id=\"form-item-detialInfo\" type=\"text\" placeholder=\"请精准到门牌号\"/>\r\n            <span class=\"form-item-errTips\" id=\"errTips-detialInfo\"></span>\r\n        </div>\r\n        <div class=\"pop-form-tel\">\r\n            <label for=\"form-item-tel\">\r\n                <span class=\"pop-form-required\">*</span>\r\n                收件人手机：\r\n            </label>\r\n            <input id=\"form-item-tel\" type=\"text\" placeholder=\"请输入11位手机号\"/>\r\n            <span class=\"form-item-errTips\" id=\"errTips-tel\"></span>\r\n        </div>\r\n        <div class=\"pop-form-zipCode\">\r\n            <label for=\"form-item-zipCode\">邮政编码：</label>\r\n            <input id=\"form-item-zipCode\" type=\"text\" placeholder=\"如：511400\"/>\r\n        </div>\r\n        <div class=\"newAddress-submit\">\r\n            <span class=\"btn\" type=\"newAddress\">保存添加信息</span>\r\n        </div>\r\n    </div>\r\n</div>";

/***/ }),
/* 44 */
/***/ (function(module, exports) {

module.exports = "<div class=\"pop-box\">\r\n    <div class=\"pop-con\">\r\n        <h1 class=\"pop-title\">\r\n            更改地址\r\n            <i class=\"pop-close fa fa-close\"></i>\r\n        </h1>\r\n        <div class=\"pop-form-username\">\r\n            <label for=\"form-item-username\">\r\n                <span class=\"pop-form-required\">*</span>\r\n                收件人姓名：\r\n            </label>\r\n            <input id=\"form-item-username\" type=\"text\" placeholder=\"请输入收件人姓名\" value=\"{{receiverName}}\"/>\r\n            <span class=\"form-item-errTips\" id=\"errTips-username\"></span>\r\n        </div>\r\n        <div class=\"pop-form-addressInfo\">\r\n            <label for=\"form-item-province\">\r\n                <span class=\"pop-form-required\">*</span>\r\n                所在城市：\r\n            </label>\r\n            <select id=\"form-item-province\">\r\n                <option value=\"请选择\">请选择</option>\r\n            </select>\r\n            <select id=\"form-item-city\">\r\n                <option value=\"请选择\">请选择</option>\r\n            </select>\r\n            <span class=\"form-item-errTips\" id=\"errTips-addressInfo\"></span>\r\n        </div>\r\n        <div class=\"pop-form-detialInfo\">\r\n            <label for=\"form-item-detialInfo\">\r\n                <span class=\"pop-form-required\">*</span>\r\n                详细地址：\r\n            </label>\r\n            <input id=\"form-item-detialInfo\" type=\"text\" placeholder=\"请精准到门牌号\" value=\"{{receiverAddress}}\"/>\r\n            <span class=\"form-item-errTips\" id=\"errTips-detialInfo\"></span>\r\n        </div>\r\n        <div class=\"pop-form-tel\">\r\n            <label for=\"form-item-tel\">\r\n                <span class=\"pop-form-required\">*</span>\r\n                收件人手机：\r\n            </label>\r\n            <input id=\"form-item-tel\" type=\"text\" placeholder=\"请输入11位手机号\" value=\"{{receiverPhone}}{{receiverMobile}}\"/>\r\n            <span class=\"form-item-errTips\" id=\"errTips-tel\"></span>\r\n        </div>\r\n        <div class=\"pop-form-zipCode\">\r\n            <label for=\"form-item-zipCode\">邮政编码：</label>\r\n            <input id=\"form-item-zipCode\" type=\"text\" placeholder=\"如：511400\" value=\"{{receiverZip}}\"/>\r\n        </div>\r\n        <div class=\"updateAddress-submit\">\r\n            <span class=\"btn\" type=\"update\">保存添加信息</span>\r\n        </div>\r\n    </div>\r\n</div>";

/***/ }),
/* 45 */
/***/ (function(module, exports) {

module.exports = "<h1>收货地址</h1>\r\n<ul class=\"addressList-con\">\r\n    {{#list}}\r\n    <li class=\"addressList-item\" data-id=\"{{id}}\">\r\n        <div class=\"address-info\">\r\n            <span class=\"address-province\">{{receiverProvince}}</span>\r\n            <span class=\"address-city\">{{receiverCity}}</span>\r\n            <span class=\"address-username\">（收： {{receiverName}}）</span>\r\n        </div>\r\n        <div class=\"address-userInfo\">\r\n            <span class=\"address-cityDetial\">{{receiverAddress}}</span>\r\n            <span class=\"address-userTel\">{{receiverPhone}}</span>\r\n        </div>\r\n        <div class=\"update-time\">\r\n            <span>创建时间：{{updateTime}}</span>\r\n        </div>\r\n        <div class=\"address-opera\">\r\n            <span class=\"deletAddress\" data-id=\"{{id}}\">删除</span>\r\n            <span class=\"reviseAddress\" data-id=\"{{id}}\">修改</span>\r\n        </div>\r\n    </li>\r\n    {{/list}}\r\n    <li class=\"addressList-add\">\r\n        <i class=\"fa fa-plus addressList-pic\"></i>\r\n        <div class=\"addressList-add-p\">增加新地址</div>\r\n    </li>\r\n</ul>";

/***/ }),
/* 46 */
/***/ (function(module, exports) {

module.exports = "<h1>商品清单</h1>\r\n<table>\r\n    <thead>\r\n    <tr class=\"productList-title\">\r\n        <th class=\"item-title-productDetial\">商品描述</th>\r\n        <th class=\"item-title-productPrice\">价格</th>\r\n        <th class=\"item-title-productCount\">数量</th>\r\n        <th class=\"item-title-productTotle\">小计</th>\r\n    </tr>\r\n    </thead>\r\n    <tbody>\r\n    {{#orderItemVoList}}\r\n    <tr  class=\"productList-item-detial\">\r\n        <td class=\"item-info-productDetial\">\r\n            <a href=\"\">\r\n                <img src=\"{{imageHost}}{{productImage}}\" alt=\"{{productName}}\">\r\n                <span>{{productName}}</span>\r\n            </a>\r\n        </td>\r\n        <td class=\"item-info-productPrice\">￥{{currentUnitPrice}}</td>\r\n        <td class=\"item-info-productCount\">{{quantity}}</td>\r\n        <td class=\"item-info-productTotle\">￥{{totalPrice}}</td>\r\n    </tr>\r\n    {{/orderItemVoList}}\r\n    </tbody>\r\n    <tfoot></tfoot>\r\n</table>\r\n<div class=\"productList-submit\">\r\n    <span>订单总价：</span>\r\n    <span class=\"totle-money\">￥{{productTotalPrice}}</span>\r\n    <span class=\"btn topay-btn\" id=\"topay\">提交订单</span>\r\n</div>";

/***/ })
],[39]);