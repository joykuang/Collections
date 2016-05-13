/*
 * author: luxingyuan@jd.com
 * date: 2015-7-30
 * version: 1.2.0
 */

/*
 * 解决地址中的乱码字符,通过<、>识别，防止xss攻击  2016-01-28  tanhongzhao
 * 注意：如果存在，就会把地址后面所有的参数强制删除
 */
(function() {
    var h = document.location.hash;
    var s = document.location.search;
    var href = document.location.href;
    href = href.substring(0, href.indexOf("?"));
    var a = [h, s];
    for (var i = 0, len = a.length; i < len; i++) {
        var item = a[i];
        if (item.indexOf('<') !=-1 || item.indexOf('>') !=-1) {
            document.location.href = href;
        }
    }
})();


/*
 * 二级域名以及接口梳理
 */
var SLD = {
    actJshop : '//act-jshop.jd.com', //JSHOP提供的act接口,
    sale : '//'+ window.location.hostname,//以前固定为sale.jd.com，现在改为根据域名自动识别
    m : '//m.jd.com', //m端公共接口
    wq : '//wq.jd.com', //wq域名
    p : '//p.3.cn', //京东价
    pm : '//pm.3.cn',//手机价
    pe : '//pe.3.cn',//微信手Q价
    clever : '//clever.jd.com', //分群商品推荐的选品接口
    portal : '//portal.m.jd.com',    //促销商品（无线下拉）
    passport : '//passport.m.jd.com', // 登录
    paimai : '//paimai.jd.com', //拍卖
    mpaimai:'//mpaimai.jd.com', //m拍卖
    ls : '//ls-activity.jd.com',  //中奖信息
    l : '//l-activity.jd.com',//抽奖及次数
    item : '//item.m.jd.com',  //商品详情页
    rank : '//rank.m.jd.com',    //调用二级分类类目的地址及商品列表地址（热门排行榜）
    activity : '//activity.jd.com',  //投票
    daojia : '//daojia.jd.com'  //京东到家
};
var INTERFACE = {
    actJshop:{
        isLogin : SLD.actJshop + '/m/islogin.html',    //是否登录
        serverTime : SLD.actJshop + '/serverTime.html', //获取服务器时间
        ad : SLD.actJshop + '/ad.html',  //获取广告位
        ms : SLD.actJshop + '/ms.html',  //获取促销推荐商品状态
        promo : SLD.actJshop + '/mobPromo.html', //获取促销接龙商品信息
        follow : SLD.actJshop + '/mobShopFollow.html',  //获取关注店铺信息
        exchCoupon: SLD.actJshop + '/couponExchange.html',   //使用京豆去换券
        beanNum : SLD.actJshop + '/jbn.html'            //获取京豆数量
    },
    clever: SLD.clever + '/rule/mgets.action',         //分群商品推荐选品接口
    mCommon:{
        header : SLD.m + '/app/header.action', //获取京东公共头部
        footer : SLD.m + '/app/footer.action',  //获取京东公共尾部
        product : SLD.m + '/product/',   //获取商品详情
        addCart : SLD.m + '/cart/add.json'  //加入购物车
    },
    wqCommon:{
        detail: SLD.wq + '/item/view',     //微信手Q商详页地址
        addCart: SLD.wq + '/deal/mshopcart/addcmdy'  //微信手Q加入购物车
    },
    price:{
        jd : SLD.p + '/prices/mgets', //获取商品京东价
        jdMobile : SLD.pm + '/prices/mgets', //获取商品App专享价（手机）
        jdMpcp: SLD.pm + '/prices/pcpmgets', //m版获取商品的app价，京东价（如果有返回则一起返回）
        jdWXQQ: SLD.pe + '/prices/pcpmgets'     //m版获取微信手Q价格
    },
    portal : SLD.portal + '/client.action', //获取促销商品信息（无线下拉）
    paimai : SLD.paimai + '/services/currentList.action', //获取拍卖商品实时数据
    mpaimai : SLD.mpaimai + '/json/current/queryProAccess', //获取m拍卖商品围观次数
    lottery : {
        getWinnerList : SLD.ls + '/lotteryApi/getWinnerList.action', //获取中奖信息查询
        getLotteryInfo : SLD.ls + '/lotteryApi/getLotteryInfo.action', //获取抽奖基本信息
        lotteryStart : SLD.l + '/mobile/lottery_start.action', //获取抽奖
        lotteryChance : SLD.l + '/mobile/lottery_chance.action' //获取剩余抽奖次数
    },
    linkItem : SLD.item + '/ware/view.action',  //商品详情页
    rankData : SLD.rank + '/rankData' , //获取热门排行榜商品列表信息
    saleModule : SLD.sale + '/module/', //获取活动模块
    activety : {
        vote : SLD.activity + '/vote/vote.action', //根据传传入投票id、投票项id，用户pin等获取回传状态，提示内容，得票数
        getCount : SLD.activity + '/vote/getCount.action' //根据传入的投票项id串，批量获取投票数
    },
    passport : {
        login : SLD.passport + '/user/login.action' // 前往登录
    },
    daojiaActivity:{
        actInfo : SLD.daojia +'/client?functionId=jshopAct/getActivityFLoor', //京东到家获取活动信息
        actPreviewInfo : SLD.daojia + '/client?functionId=jshopAct/getOfflineActivityFLoor', //京东到家装修预发获取活动信息
        pageSkip : SLD.daojia + '/html/index.html', //京东到家页面跳转
        pageSkipMarket : SLD.daojia + '/html/marketindex.html', //京东到家营销页面跳转
        gpsPos : SLD.daojia + '/client?functionId=local/getAddressN',//根据gps坐标转换为相应的地址信息
        userPosList : SLD.daojia + '/client?functionId=addresspdj/getAddressList',//根据用户信息获取相应的地址信息列表
        gpsPosDistance : SLD.daojia + '/client?functionId=local/getLineDistance'//根据gps坐标计算直线距离
    }
};
/*
 * global extention for window
 */

(function(w){
    //根据业务需要当在app内部访问m端页面的时候强制转换地址为app地址，即将/m/替换为/app/
    //新增规则限制  京东微联APP中活动不做跳转（ua参数为jdsmart）  2016-3-3
    var userAgentType = w.navigator.userAgent.toLowerCase(),
        _beforeUrl = w.location.href,
        _nowUrl;
    if(userAgentType.indexOf("jdapp") != -1 && userAgentType.indexOf("jdsmart") == -1 && _beforeUrl.indexOf("/m/") != -1){
        _nowUrl = _beforeUrl.replace(/\/m\//,"/app/");
        w.location.href = _nowUrl;
    }
    //如果url中为微信手q频道则强制隐藏京东主站头部下载条
    else if(_beforeUrl.indexOf("/wq/") != -1){
        $("#m_common_header").hide();
        $("#m_common_tip").hide();
    }


    //根据页面宽度重新设置模块高度
    var winWidth = window.innerWidth;
    $(".outer-container > div").each(function(){
        var height = parseFloat($(this).css("height")),
            coefficient = $(this).attr("coefficient") || 0;
        height += (winWidth - 320) * coefficient;
        if(~~height){
            $(this).css("height", ~~height);
        }
    });

    //给全局添加base对象，里面封装了一些基本api
    if(typeof jshop == 'undefined'){
        w.jshop = {};
    }

    jshop.mModule = typeof jshop.mModule === "undefined"? {}: jshop.mModule;
    jshop.slideTimer = typeof jshop.slideTimer === "undefined"? {}: jshop.slideTimer;
    jshop.countDownTimer = typeof jshop.countDownTimer === "undefined"? {}: jshop.countDownTimer;


    var Base = {

        css3Prefix: (function(){
            var divTemp = document.createElement("div"),
                arrCss = ["","webkit","moz","ms"],
                obj = {TRANSFORM: "", TRANSITION: "",TRANSITIONEND:""};
            for(var i = 0; i < arrCss.length; i++){
                var test = arrCss[i]? (arrCss[i] + "Transform"): "transform";
                if(test in divTemp.style){
                    obj.TRANSFORM = test;
                    break;
                }
            }
            for(i = 0; i < arrCss.length; i++){
                test = arrCss[i]? (arrCss[i] + "Transition"): "transition";
                if(test in divTemp.style){
                    obj.TRANSITION = test;
                    var temp =  obj.TRANSITION === "transition" ? "end" :"End";
                    obj.TRANSITIONEND = test + temp;
                    break;
                }
            }
            return obj;
        })(),

        /**
         * 获取sid。优先从url中获取，再从cookie中获取
         * @return string
         */
        getSid: function(){
            var urlParam = this.getURLParams();
            if(urlParam.sid) return urlParam.sid;
            var cookies = document.cookie,
                arrCookie = cookies.split(';'),
                ele = null;
            for(var i=0; i<arrCookie.length; i++){
                ele = arrCookie[i].split('=');
                if(ele[0] == ' sid' || ele[0] == 'sid'){
                    return ele[1];
                }
            }
            return "";
        },

        /**
         * 判断是否登录
         * @param successFun
         * @param failFun
         */
        checkLogin: function(successFun, failFun){
            var sid = this.getSid();
            $.ajax({
                url : INTERFACE.actJshop.isLogin,
                dataType: "jsonp",
                data : {"sid": sid},
                success : function(data){
                    if(data.isLogined){
                        window.isLogined = true;
                        typeof successFun === "function" && successFun(data);
                    }else{
                        typeof failFun === "function" && failFun(data);
                    }
                },
                error: function(){
                    console.error("FUN[checkLogin]请求检测是否登录，后台未成功响应");
                }
            });
        },

        /**
         * 获取url传参
         * @return {{}}
         */
        getURLParams : function(){
            var args = {},
                qry = location.search.substring(1),
                pairs = qry.split("&");
            for(var i = 0; i < pairs.length; i++){
                var pos = pairs[i].indexOf('=');
                if(pos==-1)  continue;
                var argname = pairs[i].substring(0, pos),
                    val = pairs[i].substring(pos + 1);
                args[argname] = decodeURIComponent(val);
            }
            return args;
        },
        /**
         * 获取cookie参数
         * @return {{}}
         */
        getCookieParams : function(){
            var args = {},
                qry = document.cookie,
                pairs = qry.split(";");
            for(var i = 0; i < pairs.length; i++){
                var pos = pairs[i].indexOf('=');
                if(pos==-1)  continue;
                var argname = pairs[i].substring(0, pos).trim(),
                    val = pairs[i].substring(pos + 1);
                args[argname] = val;
            }
            return args;
        },
        mouseCoords : function(ev){
            if(ev.pageX){
                return {x:ev.pageX,y:ev.pageY};
            }
            return {
                x : ev.clientX + document.body.scrollLeft - document.body.clientLeft,
                y : ev.clientY + document.body.scrollTop - document.body.clientTop
            };
        },

        /**
         * 判断是否是微信手Q活动地址
         * @return true/false
         */
        isWXQQAddress: function(){
            return !!location.pathname.match(/^\/wq\//);
        },

        /**
         * 判断微信/手Q环境类型。微信返回5，手Q返回4。其他则返回空字符串
         * @return false/5/4
         */
        isWXOrQQ : function(){
            var is = this.isWXQQAddress();
            if(is){
                var ua = navigator.userAgent;
                if(/MicroMessenger/i.test(ua)){
                    return 5;
                }else if(/QQ/i.test(ua)){
                    return 4;
                }else{
                    //如果访问的wq活动地址，但是并不是QQ或者微信浏览器，那么也默认请求手Q的价格
                    return 4;
                }
            }else{
                return '';
            }
        }
    };
    //新增除去pc判断windows和mac
    if(w.navigator.platform != "Win32" && w.navigator.platform != "Win64" && w.navigator.platform != "MacIntel"){
        //新增规则，如果打开为wp手机(无论是app还是浏览器)或者为ios和Android非客户端，并且为app型活动/app/,同时不带参数accessType=intact，则强制替换为m型活动  2016-3-16
        //新增京东app标识符配置
        var jdAppType = $("#jdAppType").val().split(","),noAppState = true;
        for(var i = 0; i < jdAppType.length;i++){
            if(userAgentType.indexOf(jdAppType[i]) != -1){
                noAppState =  false;
                break;
            }
        }
        if((userAgentType.indexOf("Window Phone") != -1 || noAppState) && Base.getURLParams()["accessType"] != "intact" && _beforeUrl.indexOf("/app/") != -1){
            _nowUrl = _beforeUrl.replace(/\/app\//,"/m/");
            w.location.href = _nowUrl;
        }
    }


    jshop.getPageTime = {};
    var _mobAppId = "jshopPageTimeObj";
    //判断是装修态还是浏览态，设置jshop.serverTimeCallback每个page标识符
    if(!$("#mobAppId").length){
        var _urlArr = window.location.href.split("&");
        _urlArr.forEach(function(item, index){
            if(item.indexOf("veBean.appId") != -1){
                _mobAppId = item.split("#")[0].split("=")[1];
            }
        })
    }else{
        _mobAppId = $("#mobAppId").length ? $("#mobAppId").val():"jshopPageTimeObj";
    }
    jshop.getPageTime[_mobAppId] = {
        getServerTime:0,
        getLocalTime:0,
        serverTimeCallback:[]
    }
    //get service time
    w.getServerTime = function(callback){
        //判断是否已经请求过服务器时间，没有就请求，有就根据时间戳得到当前服务器时间
        if(jshop.getPageTime[_mobAppId].getServerTime === 0){
            jshop.getPageTime[_mobAppId].serverTimeCallback.push(callback);
            if(jshop.getPageTime[_mobAppId].serverTimeCallback.length === 1){
                var _serverTimeUrl = INTERFACE.actJshop.serverTime;
                $.ajax({
                    url: _serverTimeUrl,
                    dataType: "jsonp",
                    success: function(data) {
                        var serverDate = data.nowTime ? new Date(data.nowTime) : new Date();
                        jshop.getPageTime[_mobAppId].getServerTime = serverDate.getTime();
                        jshop.getPageTime[_mobAppId].getLocalTime = (new Date()).getTime();
                        jshop.getPageTime[_mobAppId].serverTimeCallback.forEach(function(itmeFn, index) {
                            if (itmeFn) {
                                itmeFn(serverDate);
                            }
                        });
                        jshop.getPageTime[_mobAppId].serverTimeCallback = [];
                    }
                });
            }
        }else{
            var _nowLocalTime = (new Date()).getTime();
            var _nowServerTime = jshop.getPageTime[_mobAppId].getServerTime + (_nowLocalTime - jshop.getPageTime[_mobAppId].getLocalTime);
            var _nowDate = new Date(_nowServerTime);
            callback(_nowDate);
        }
    };
//    //get service time
//    w.getServerTime = function(callback){
//        var url = 'http://act.jshop.jd.com/serverTime.html';
//        $.ajax({
//            url : url,
//            dataType: "jsonp",
//            success: function(data){
//                callback(data.nowTime? new Date(data.nowTime): new Date());
//            }
//        });
//    };

    w.Base = Base;
})(window);

(function(w){
    var userAgentType = w.navigator.userAgent.toLowerCase();
    function WXShareBox(options){
        var defaultOptions = {
            "appid":"",    //appid 默认为空。
            "img_url":"",  //分享时所带的图片路径
            "img_width": "120", //图片宽度
            "img_height":"120", //图片高度
            "link":window.location.href, //分享附带链接地址
            "desc":document.title, //分享内容介绍
            "title":document.title //分享标题介绍
        },_this = this;
        var nowOptions = $.extend(defaultOptions,options);
        if(nowOptions.img_url.substring(0,2) == "//"){
            nowOptions.img_url = "http:" + nowOptions.img_url;
        }
        // 当微信内置浏览器初始化后会触发WeixinJSBridgeReady事件。
        document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
            // 发送给好友
            WeixinJSBridge.on('menu:share:appmessage', function (argv) {
                _this.shareFriend(nowOptions);
            });
            // 分享到朋友圈
            WeixinJSBridge.on('menu:share:timeline', function (argv) {
                _this.shareTL(nowOptions);
            });
            // 分享到微博
            WeixinJSBridge.on('menu:share:weibo', function (argv) {
                _this.shareWB(nowOptions);
            });
        }, false);
    }
    WXShareBox.prototype.shareFriend = function(options){
        WeixinJSBridge.invoke('sendAppMessage', options, function (res) {
            _report('send_msg', res.err_msg);
        });
    };
    WXShareBox.prototype.shareTL = function(options){
        WeixinJSBridge.invoke('shareTimeline',options, function (res) {
            _report('timeline', res.err_msg);
        });
    };
    WXShareBox.prototype.shareWB = function(options){
        WeixinJSBridge.invoke('shareWeibo',options, function (res) {
            _report('weibo', res.err_msg);
        });
    };
    function jshopWXShare(options){
        if(typeof options == "object"){
            return new WXShareBox(options);
        }
    }
    w.jshop.jshopWXShare = jshopWXShare;
})(window);

/*
 * 京东到家版本参数及全局变量设置
 */
(function(win){
    var _userAgentType = win.navigator.userAgent.toLowerCase(),_platCode = "h5",_appVersion = "",_userAgentWhole,_appType,
        urlPara = win.Base.getURLParams(),_clearUrl = win.location.origin + win.location.pathname,_fullUlrEncode,_isMarket,
        _totalModuleNum;
    win.jshop.jdHome = typeof win.jshop.jdHome === "undefined"? {}: win.jshop.jdHome;
    if(_userAgentType.indexOf("jdlocal") != -1){
        _userAgentWhole = _userAgentType.split("________")[1].split("&");
        for(var i = 0; i < _userAgentWhole.length;i++){
            if(_userAgentWhole[i].indexOf("platform") != -1){
                _platCode = _userAgentWhole[i].split("=")[1];
            }
            if(_userAgentWhole[i].indexOf("djappversion") != -1){
                _appVersion = _userAgentWhole[i].split("=")[1];
            }
        }
        _appType = "app";
    }else{
        _appVersion = urlPara["appVersion"] ?  urlPara["appVersion"] : "";
        _appType = "m";
    }
    //是否是京东到家营销平台
    _isMarket = urlPara["isMarket"] == "true" ? true : false;
    //头部地址控制，除去经纬度和title
    for(var i in urlPara){
        if( i != "latitude" && i != "longitude" && i != "title"){
            _clearUrl = _clearUrl.indexOf("?") != -1 ? _clearUrl + "&"+ i + "=" + urlPara[i] : _clearUrl + "?" + i + "=" + urlPara[i];
        }
    }
    //获取京东到家总模块数量（如果有倒计时则略去）
    _totalModuleNum = $(".jdlocal-content div[module-name]").length - $(".jdlocal-content div[module-name='Jshop_CountDown']").length;
    _fullUlrEncode = encodeURIComponent(_clearUrl);
    win.jshop.jdHome = {
        lng:"",
        lat:"",
        title:"",
        city: "",
        cityId: -1, //城市id默认为-1表示未开通
        address: "",
        district: "",
        totalModuleNum: _totalModuleNum,//总模块数
        requestDataNum: 0,//模块请求数量
        isMarket: _isMarket,
        platCode:_platCode,
        appVersion:_appVersion,
        jdHomeActiveType:_appType,
        headEncodeURI:_fullUlrEncode,
        headUrl:_clearUrl
    };
})(window);
/*
 //Sale工程不需要这段

 $(function(){

 //只有在预览页面才进行功能框架模块处理
 if(window !== window.top){
 //功能框架模块页面结构预处理，需要放在价格、图片懒加载之前
 $(".j-categoryLayout").each(function(index, module){

 var param = {};
 try {
 param = eval('(' + $(module).attr('module-param') + ')');
 }
 catch (e) {
 }

 var jContainer = $(module),
 jTabs = jContainer.find(param.categoryModuleIdsSelector);

 if(!param.categoryModuleIdsSelector || jTabs.length === 0){
 return true;
 }

 jTabs.each(function(index, dom){
 var moduleIds = $(dom).attr("data-moduleIds");
 if(moduleIds){
 var arr = moduleIds.split(",");
 for(var i = 0; i < arr.length; i++){
 var id = arr[i];
 if(id){
 var jTemp = $(".outer-container > div[instanceid='" + id + "']");
 jTemp.attr("data-width", jTemp.width()).attr("data-height", jTemp.height());
 $(dom).append(jTemp);
 jTemp.removeClass("abs-invisible");
 }
 };
 }
 });

 });
 }

 });
 *//**
 * Created by luxingyuan on 2015/4/8.
 */

$.extend(jshop.mModule, {

        /**
         * 自定义内容区模块
         * @param param
         */
        zoom: function (param) {
            if (param.needZoom === false) return;
            jTarget = $(this);        //自定义内容区的选择器

            /**
             * 对自定义内容区缩放至和最外层容器一样的宽度
             */
            function scale() {
                if(jTarget[0].getAttribute("style") !== null){
                    jTarget.removeAttr("style");
                }
                var prefix = Base.css3Prefix.TRANSFORM,
                    jModule = jTarget.closest("[module-name]"),
                    innerWidth = jTarget.css("position", "absolute").width(),
                    scale = jTarget.css("position", "static") && $(".outer-container").width() / innerWidth;
                scale = scale > 1? $(".outer-container").width() / 640: scale;
                var height = (jModule.attr("data-height") || jTarget.parent().height()) * scale;
                if(height === 0){
                    jTarget.removeAttr("funcompleted");
                    return;
                }
                jTarget[0].style[prefix + "Origin"] = "0 0";
                jTarget[0].style[prefix] = "scale(" + scale + ")";
                jTarget.height(height);
            }

            /**
             * 初始化
             */
            !function init() {
                scale();
            }();
        }
    }
);/**
 * Created by luxingyuan on 2015/4/17.
 */

$.extend(jshop.mModule, {

        /**
         * 抽奖模块（默认会new一个抽奖玩法类）
         * @param param.lotteryCode     抽奖编码
         * @param param.lotteryClass    抽奖玩法实现类名
         */
        lottery: function (param) {

            var jTarget = $(this),
                param = $.extend({
                    lotteryCode: "",
                    lotteryClass: ""
                }, param);

            /**
             * 初始化
             */
            !function init() {
                //没有设置抽奖编码以及定义抽奖玩法实现类，则直接返回
                if(!param.lotteryCode || !param.lotteryClass) return;
                try{
                    var lotteryClass = eval("(" + param.lotteryClass + ")");
                    typeof lotteryClass === "function" && new lotteryClass(jTarget, param.lotteryCode);
                }catch(e){
                }
            }();

        }

    }
);

//抽奖模块工具类
jshop.mModule.tool = {};
jshop.mModule.tool.lottery = {};
$.extend(jshop.mModule.tool.lottery, {

    /**
     * 获取抽奖基本信息
     * @param lotteryCode     抽奖编号
     * @param successCallback    成功后的回调
     * @param failCallback       失败后的回调
     */
    getlotteryInfo: function (lotteryCode, successCallback, failCallback) {
        var url = INTERFACE.lottery.getLotteryInfo + "?lotteryCode=" + lotteryCode;
        $.ajax({
            url: url,
            cache: false,
            dataType: "jsonp",
            success: function (data) {
                typeof successCallback === "function" && successCallback(data);
            },
            error: function (data) {
                typeof failCallback === "function" && failCallback(data);
            }
        });
    },
    /**
     * 获取剩余抽奖次数
     * @param lotteryCode   抽奖编号
     * @param enpin         用户pin，登录过的用户，可以通过调用Base.checkLogin()方法获取
     * @param successCallback    成功后的回调
     * @param failCallback       失败后的回调
     */
    getLeftCount: function (lotteryCode, enpin, successCallback, failCallback) {
        var url = INTERFACE.lottery.lotteryChance + "?authType=2&lotteryCode=" + lotteryCode + "&cookieValue=" + enpin;
        $.ajax({
            url: url,
            cache: false,
            dataType: 'jsonp',
            success: function (data) {
                typeof successCallback === "function" && successCallback(data);
            },
            error: function () {
                typeof failCallback === "function" && failCallback(data);
            }
        });
    },
    /**
     * 抽奖操作
     * @param lotteryCode   抽奖编号
     * @param enpin         用户pin
     * @param successCallback    成功后的回调
     * @param failCallback       失败后的回调
     */
    drawing: function (lotteryCode, enpin, successCallback, failCallback) {
        var url = INTERFACE.lottery.lotteryStart + "?authType=2&lotteryCode=" + lotteryCode + "&cookieValue=" + enpin;
        $.ajax({
            url: url,
            cache: false,
            dataType: 'jsonp',
            success: function (data) {
                typeof successCallback === "function" && successCallback(data);
            },
            error: function (data) {
                typeof failCallback === "function" && failCallback(data);
            }
        });
        //发送抽奖的埋点统计
        try{
				    var eventId = "Jshop_Lottery";			 						// 必选参数，事件id
				    var click = new MPing.inputs.Click(eventId);    // 构造click 请求
				    click.event_param = "";		 											// 设置click的参数  
				    click.updateEventSeries();                      // 更新事件串
				    
				    var mping = new MPing();				 		// 构造上报实例
				    mping.send(click); 					 				// 上报click
				} catch (e){}
    },
    /**
     * 获取中奖信息列表
     * @param lotteryCode   抽奖编号
     * @param successCallback    成功后的回调
     * @param failCallback       失败后的回调
     */
    getWinnerList: function (lotteryCode, successCallback, failCallback) {
        var url = INTERFACE.lottery.getWinnerList + "?lotteryCode=" + lotteryCode;
        $.ajax({
            url: url,
            cache: false,
            dataType: "jsonp",
            success: function (data) {
                typeof successCallback === "function" && successCallback(data);
            },
            error: function (data) {
                typeof failCallback === "function" && failCallback(data);
            }
        });
    }

});﻿
/*
 * global initialization for modules who needs special logics and local refresh
 */
(function(w){

    function excute(module){
        var func = module.attr('module-function'),
            para = {};
        if(!func) return;

        try{
            para = eval('(' + module.attr('module-param') + ')');
        } catch(e){
        }

        var funcs = func.split(',');
        funcs.forEach(function(n, index){
            if(jshop.mModule[n]){
                jshop.mModule[n].call(module,para);
            }
        });
    }

    /**
     * 刷新单个模块
     */
    function localRefresh(){
        var that = $(this).find('.j-module');
        if(!that.length) return;

        that.each(function () {
            excute($(this));
        });
    }

    /**
     * 刷新所有模块
     */
    function moduleRefresh(){
        //jshop.slideTimer = [];
        //jshop.countDownTimer = [];

        //浏览态——为避免局部刷新导致jshop.slideTimer和jshop.countDownTimer清空造成的计时器无法清除,在这做是否首次初始化的判断
        if(jshop.slideTimer && Object.prototype.toString.call(jshop.slideTimer) != '[object Array]'){
            jshop.slideTimer = [];
        }
        if(jshop.countDownTimer && Object.prototype.toString.call(jshop.countDownTimer) != '[object Array]'){
            jshop.countDownTimer = [];
        }
        $('.j-module[module-function]:not([funcompleted])').each(function(index,n){
            n.setAttribute("funcompleted","");
            excute($(n));
        });
    }

    w.moduleRefresh = moduleRefresh;
    w.localRefresh = localRefresh;

    moduleRefresh();

})(window);

(function(){
    $(function(){
        var width = $(window).width(),
            timer = null;

        function resizeHandle(){
            jshop.widget.instance.imgLoad.reCheck();
            jshop.widget.instance.priceLoad.check();
            moduleRefresh();
            clearTimeout(timer);
            timer = null;
        }
        if(typeof Config == 'undefined'){
            $(window).resize(function(){
                if(timer) return;
                var currentWidth = $(this).width();
                if(width !== currentWidth){
                    width = currentWidth;
                    timer = setTimeout(function(){
                        resizeHandle();
                    },500);
                }
            });
        }
    });
})();/**
 * Created by luxingyuan on 2015/9/1.
 */

(function(win, $){

    jshop = typeof jshop === "undefined"? {}: jshop;
    jshop.widget = typeof jshop.widget === "undefined"? {}: jshop.widget;

    //通用工具方法
    var tool = {
            getScrollTop: function(){
                return document.documentElement.scrollTop||document.body.scrollTop;
            },
            getClientHeight: function(){
                return document.documentElement.clientHeight || document.body.clientHeight;
            },
            /**
             * 微信手Q环境适配，将商品详情页链接处理为微信手Q的商详页
             * @param jDom  范围
             */
            handleWXQQLink: function(jDom){
                $('a[href^="http://item.m.jd.com/ware/view.action"],a[href^="//item.m.jd.com/ware/view.action"]', jDom).each(function(index, dom){
                    var href = $(dom).attr('href');
                    $(dom).attr('href', href.replace('//item.m.jd.com/ware/view.action?wareId=', INTERFACE.wqCommon.detail + '?sku=')); 
                });
                $('a[href^="http://m.jd.com/product/"],a[href^="//m.jd.com/product/"]', jDom).each(function(index, dom){
                    var href = $(dom).attr('href'),
                        mark1 = href.indexOf('?') === -1? '': '\\?',
                        mark2 = href.indexOf('?') === -1? '': '&',
                        reg = new RegExp('\/\/m\.jd\.com\/product\/(\\d+)\.html' + mark1, 'i'),
                        arr = href.match(reg);
                    $(dom).attr('href', href.replace(reg, INTERFACE.wqCommon.detail + '?sku=' + RegExp.$1 + mark2));
                });
            }
        },
        isWXOrQQ = Base.isWXOrQQ(),
        isWXQQAddress = Base.isWXQQAddress(),
        screenHeight = tool.getClientHeight(),
        moduleDependence = JSON.parse(decodeURIComponent($("#moduleDependence").val() || "{}")),        //存放模块间的依赖关系
        pureStyleModules = JSON.parse(decodeURIComponent($("#pureStyleModules").val() || "[]")),        //纯粹只存放了style的自定义内容区实例id
        moduleCssId = {};       //记录页面模块用到的cssId

    //模块懒加载
    jshop.widget.moduleLazyLoad = function(){

        var MODULE_CLASS = "j-placeholder",
            FIRST_VIEW_CLASS = "j-first-view",          //需要显示在首屏的模块css标示
            PAGE_INSTANCEID = $("#mobPageInstanceId").val(),
            $style = $("style").eq(0);

        //初始化
        !!function init(){
            //对默认渲染模块里的内容框架模块进行处理，把包含的内嵌模块的结构请求回来
            actionFrameModule($(".j-categoryLayout"));
            //加载和默认屏展示模块有关联的模块
            loadRelativeModule($(".outer-container > div[module-name]").map(
                function(i, dom){
                    if(i < 2){
                        moduleCssId[dom.classList[0]] = "in";
                        return $(dom).attr("instanceid");
                    }
                }
            ).toArray());
            loadRelativeModule(pureStyleModules, true);
        }();

        //暴露对外调用的接口
        this.check = function () {
            check();
        };

        /**
         *  检查是否需要加载模块，默认是加载当前可视区域再额外多加载一屏幕的内容。请求完成后清掉代表未渲染的模块class标示
         */
        function check(){

            var arrModule = [];

            $("." + MODULE_CLASS + ",." + FIRST_VIEW_CLASS).each(function(){
                var jItem = $(this),
                    top = jItem.offset().top;
                if((top <= tool.getScrollTop() + screenHeight * 2) || jItem.hasClass(FIRST_VIEW_CLASS)){
                    handle(jItem.attr("instanceid"));
                    jItem.removeClass(MODULE_CLASS + " " + FIRST_VIEW_CLASS);
                }
            });
        }

        //处理功能框架模块的模块加载
        function actionFrameModule(jModule){
            if(jModule.length === 0){
                return;
            }
            var param = {};
            try {
                param = eval('(' + jModule.attr('module-param') + ')');
            }
            catch (e) {
            }

            var jTabs = jModule.find(param.categoryModuleIdsSelector);

            if(!param.categoryModuleIdsSelector || jTabs.length === 0){
                return;
            }

            jTabs.each(function(index, dom){
                var moduleIds = $(dom).attr("data-moduleIds");
                if(moduleIds){
                    var arr = moduleIds.split(",");
                    for(i = 0; i < arr.length; i++){
                        $(dom).append("<div class='funcDivide-" + arr[i] + "'></div>");
                        loadData(arr[i], function(data){
                            //如果之前没有写如果这个模块CSS，则写入模块依赖的CSS
                            if(!(data.cssid in moduleCssId)){
                                $style.append(data.css);
                                moduleCssId[data.cssid] = "in";
                            }
                            //然后再插入对应的模块内容
                            var winWidth = window.innerWidth,
                                minHeight = parseFloat((data.minHeight || 0)) + parseFloat((data.coefficient || 0)) * (winWidth - 320),
                                innerHTML = '<div class="' + data.cssid + '" style="height:' + minHeight + 'px;" instanceid="' + data.instanceId + '" module-name="'+ data.moduleName +'">' + data.html + '</div>';
                            $(dom).find(".funcDivide-" + data.instanceId).html(innerHTML);
                        });
                    }
                }
            });
        }

        //根据实例id，加载一个模块
        function handle(moduleId){
            loadData(moduleId, function(data){
                //如果之前没有写如果这个模块CSS，则写入模块依赖的CSS
                if(!(data.cssid in moduleCssId)){
                    $style.append(data.css);
                    moduleCssId[data.cssid] = "in";
                }
                //然后再插入对应的模块内容
                var $module = $(".outer-container > div[instanceid='" + data.instanceId + "']");
                //判断模块里面是否有内容，避免模块内容重复加载显示
                if(!$.trim($module.html())){
                    $module.addClass(data.cssid).html(data.html);
                }
                //如果是功能框架模块，则需要把其包含的其他模块也一并请求过来
                if(data.html.indexOf("j-categoryLayout") !== -1){
                    actionFrameModule($module.find(".j-module"));
                }
            });
        }

        /**
         *  发送模块请求以及处理渲染
         */
        function loadData(moduleId, callback){
            var type = /^\/app/.test(location.pathname)? "app-": "m-",
                url = INTERFACE.saleModule + type + PAGE_INSTANCEID + "-" + moduleId + ".html";
            $.ajax({
                url: url,
                dataType: "json",
                success: function(data){
                    if(data.status === "success"){
                        callback(data);
                        //触发模块公共方法加载
                        moduleRefresh();
                        //触发价格、图片懒加载
                        jshop.widget.instance.imgLoad.reCheck();
                        jshop.widget.instance.priceLoad.check();
                        //加载了模块内部结构以及各种懒加载后，就可以把最小站位高度给去掉了
                        var jModule = $(".outer-container div[instanceid='" + moduleId + "']").css("height", "");
                        //如果是微信手Q环境，还要同时处理链接
                        isWXQQAddress && tool.handleWXQQLink(jModule);
                        //模块埋点
                        try{
                            jshop.mStatistic[jModule.attr("module-name")](jModule);
                        }catch(e){
                        }
                        //数据加载完成后触发给页面里的链接都加上本页面的url参数
                        commonLoder.initActPageParams(jModule);
                        //加载和本模块关联的模块
                        loadRelativeModule(moduleId);
                    }else{
                        console.error("请求接口[" + url + "]失败, pageInstanceId=" + PAGE_INSTANCEID + ", instanceId=" + moduleId);
                    }
                }
            });
        }

        //加载和本模块关联的模块（目前针对锚点发生的关联关系）
        function loadRelativeModule(moduleIds, needLoad){
            var arrModule = [];
            if(typeof moduleIds === "string"){
                arrModule.push(moduleIds);
            }else{
                arrModule = moduleIds;
            }
            for(var i = 0; i < arrModule.length; i++){
                var moduleId = arrModule[i];
                if(needLoad || moduleId in moduleDependence){
                    var arr = needLoad? moduleIds: moduleDependence[moduleId];
                    for(var j = 0; j < arr.length; j++){
                        var relativeModuleId = arr[j];
                        var jRelativeModule = $(".outer-container > div[instanceid='" + relativeModuleId + "']");
                        //没有加载过的模块才进行加载
                        if(needLoad || arrModule.length > 1 || jRelativeModule.hasClass(MODULE_CLASS) || jRelativeModule.hasClass(FIRST_VIEW_CLASS)){
                            handle(relativeModuleId);
                            jRelativeModule.removeClass(MODULE_CLASS + " " + FIRST_VIEW_CLASS);
                        }
                    }
                }
            }
        }

    };

    //价格懒加载
    jshop.widget.priceLazyLoad = function () {

        var CONFIG = {
                prefixUrl: (isWXQQAddress? INTERFACE.price.jdWXQQ: INTERFACE.price.jdMobile),        //根据访问环境，来确定请求何种价格
                noSalePriceTag: '<span class="jsNumNo">暂无价格</span>',
                noJdPriceTag: '<span class="jdNumNo">暂无价格</span>'
            };

        /**
         * 初始化
         */
        function init() {
            /*修复在android4.3及以下版本webview物理返回键返回时滚动条位置定位会在dom树ready之后的问题*/
            setTimeout(function(){
                check();
            }, 100);
        }

        /**
         * 请求价格并替换价格标签内容，每次至多请求20个sku
         * @param arrSku    skuId组成的数组
         */
        function loadPrice(arrSku) {
            if (arrSku && arrSku.length) {
                for (var i = 0; i < arrSku.length; i+=20) {
                    jsonpPrice(arrSku.slice(i, i+20));
                }
            }
        }

        /**
         * 使用jsonp方式请求价格
         * @param arr
         */
        function jsonpPrice(arr) {
            var data = {skuids: arr.join(",")};
            if(isWXOrQQ){
                data.origin = isWXOrQQ;
            }else{
                data.origin = 2;
            }
            $.ajax({
                url: CONFIG.prefixUrl,
                data: data,
                dataType: "jsonp",
                success: function(data) {
                    if (data && data.constructor === Array) {
                        for (var i = 0; i < data.length; i++) {
                            var price = data[i],
                                id = price.id,
                                salePrice = ~~price.m === -1 ? CONFIG.noSalePriceTag : price.m,
                                jdPrice = ~~price.p === -1 ? CONFIG.noJdPriceTag : price.p;
                            $(".jdNum[jdprice='" + id + "']").html(jdPrice);
                            $(".jsNum[jsprice='" + id + "']").html(salePrice);
                        }
                    }
                }
            });
        }

        /**
         * 检测并请求价格
         * @private
         */
        function check() {
            var arrSkuId = [],i = 0;
            $(".jdNum[jshop='price']").each(function(){
                var jItem = $(this),
                    top = jItem.offset().top;
                //if((jItem.height() !== 0 || top !== 0) && top <= tool.getScrollTop() + screenHeight * 2){
                //解决价格懒加载请求频率过快，默认先判断后两屏是否已超过20个价格，如果没有超过则继续向下寻找补充
                if(jItem.height() !== 0 || top !== 0){
                    if(top <= tool.getScrollTop() + screenHeight * 2){
                        //根据加载标示来加载
                        arrSkuId.push(jItem.attr("jdprice"));
                        jItem.removeAttr("jshop");
                    }
                    else if((top > tool.getScrollTop() + screenHeight * 2) && i < 20){
                        //根据加载标示来加载
                        arrSkuId.push(jItem.attr("jdprice"));
                        jItem.removeAttr("jshop");
                    }
                    i++;
                }
            });
            i = 0;
            arrSkuId.length && loadPrice(arrSkuId);
        }

        this.check = check;

        init();

    };

    //图片懒加载
    jshop.widget.imgLazyLoad = function () {

        var config = {
                scale: 1,       //图片实际放大比例
                quality: 100,    //图片压缩比例
                needWebp: false    //是否需要webp格式
            },
            IMG_CLASS = "J_imgLazyload",
            timer = 0,
            isReady = false;        //默认占位图是否加载完毕

        //暴露对外调用的接口，目前是轮播图中的纵向轮播需要触发图片懒加载的check方法
        this.reCheck = function () {
            check();
        };

        /**
         * 初始化入口
         */
        function init(){

            settingInit();

            /*修复在android4.3及以下版本webview物理返回键返回时滚动条位置定位会在dom树ready之后的问题*/
            setTimeout(function(){
                check();
            }, 100);
        }

        /**
         * 每100毫秒检测默认占位图片是否已经加载好了，加载好了则再调用check
         */
        function judgeImgLoad(){
            if($("." + IMG_CLASS)[0].complete === false){
                clearTimeout(timer);
                timer = setTimeout(function(){
                    judgeImgLoad();
                }, 100);
            }else{
                isReady = true;
                clearTimeout(timer);
                check();
            }
        }

        /**
         * 检测是否需要加载图片。加载可见区域及预加载一屏幕图片
         */
        function check(){
            if($("." + IMG_CLASS).length === 0){
                return;
            }
            if(isReady === false){
                judgeImgLoad();
            }else{
                $("." + IMG_CLASS).each(function(){
                    var jTarget = $(this);
                    if(jTarget.width() !== 0 && jTarget.height() !== 0 && jTarget.offset().top <= tool.getScrollTop() + screenHeight * 2){
                        if(!jTarget.attr("data-src")){
                            setApplySrc(jTarget);
                        }
                        jTarget[0].onload = function(){
                            check();
                        };
                        jTarget.attr("src", jTarget.attr("data-src")).removeClass(IMG_CLASS);
                    }
                });
            }

        }

        /**
         * 获取图片实际应用地址
         * @param jImg  需要设置的图片的包装对象
         */
        function setApplySrc(jImg){

            var width = jImg.width(),
                height = jImg.height(),
                originalSrc = jImg.attr("data-srcset"),
                applySize = "s" + ~~(width * config.scale) + "x" + ~~(height * config.scale) + "_",
                applySrc = originalSrc;

            //storage.jd.com域名下的图片不处理

            if(originalSrc && originalSrc.indexOf('storage.jd.com') === -1){
                //只对有resize属性，并且非gif图片进行动态size请求。图片服务器不支持gif缩放
                if(jImg.attr("resize") !== null && !~originalSrc.indexOf(".gif")){
                    /(http\:|https\:)?(\/\/img\d{2}\.360buyimg\.com\/\w+\/)(.*)/.test(originalSrc);
                    applySrc = RegExp.$1 + RegExp.$2 + applySize + RegExp.$3;
                }
                //只对jpg\png进行降至或者应用webp
                if(!~originalSrc.indexOf(".gif")){
                    applySrc = applySrc + (config.quality === 100? "": "!q" + config.quality + ".jpg") + (config.needWebp? ".webp": "");
                }
            }

            jImg.attr("data-src", applySrc);
        }

        /**
         * 根据UA以及URL，初始化图片生成的设定
         */
        function settingInit(){
            //根据UA环境，确定图片生成规则
            var ua = win.navigator.userAgent,
                isMobile = /mobile|jdapp/i.test(ua);
            if(isMobile){
                var dp = win.devicePixelRatio || 2,
                    network = win.Base.getURLParams().networkType;
                config.scale = dp > 3? 3: dp;

                if(/Android\s(\d+\.\d+)/i.test(ua) && !/Windows Phone/.test(ua) && !/IEMobile/i.test(ua) && parseFloat(RegExp.$1) >= 4.0){     //安卓系统4.0及以上才支持webp
                    config.needWebp = true;
                    if(network !== "wifi"){
                        config.quality = 50;
                    }else{
                        config.quality = 70;
                    }
                }else{
                    if(network === "wifi"){
                        config.quality = 80;
                    }else{
                        config.quality = 70;
                    }
                }
            }
        }

        init();

    };

    /*alert提示框*/
    jshop.widget.alert = function (){

        var _duration = 3000,
            _box = null,
            _timer = 0;

        /**
         * 显示一条信息
         * @private
         */
        function _messageShow(msg, duration){
            clearTimeout(_timer);
            _box.find(".d-inner").html(msg);
            _box.hasClass('d-alert-hide') && _box.removeClass('d-alert-hide') && setTimeout(function(){_box.show()}, 400);
            _timer = setTimeout(function(){
                _box.addClass('d-alert-hide');
                setTimeout(function(){
                    _box.hide();
                }, 400)
            }, duration || _duration);
        };

        /**
         * 对外暴露的alert接口
         * @param msg   需要alert的文本内容
         * @param duration 持续时间
         */
        win.msgAlert = function(msg, duration){
            if(!_box){
                _box = $('<div class="d-msg-alert-box d-alert-hide"><div class="d-inner">' + msg + '</div></div>').appendTo("body");
            }
            _messageShow(msg, duration);
        };
    }

    /*确认提示框，包含有确认、取消两个按钮*/
    jshop.widget.confirm = function (){

        var jBox,
            yesCallback,
            noCallback;

        /**
         * 绑定事件
         * @private
         */
        function bind(){
            jBox.find('.d-msg-confirm-cancel').bind('click', function(){
                reset();
                typeof noCallback === 'function' && noCallback();
            });
            jBox.find('.d-msg-confirm-ok').bind('click', function(){
                reset();
                typeof yesCallback === 'function' && yesCallback();
            });
        };

        /**
         * 重置弹框的状态为隐藏
         * @private
         */
        function reset(){
            jBox.addClass('hidden');
            jBox.find('.d-msg-confirm-content').html('');
        }

        /**
         * 更新弹框相关信息
         * @param content       新的确认框按钮以上的展示内容
         * @param yesCB         新的点击确定后的回调函数
         * @param noCB          新的点击取消后的回调函数
         * @param className     新的弹框附带的css类名
         * @private
         */
        function update(content, yesCB, noCB, className){
            yesCallback = yesCB || null;
            noCallback = noCB || null;
            jBox.find('.d-msg-confirm-box').attr('class', 'd-msg-confirm-box ' + (className || ''));
            jBox.find('.d-msg-confirm-content').html(content);
            jBox.removeClass('hidden');
        }

        /**
         * 对外暴露的弹框接口
         * @param content       确认框按钮以上的展示内容
         * @param yesCallback   点击确定后的回调函数
         * @param noCallback    点击取消后的回调函数
         * @param className     弹框附带的css类名
         */
        win.msgConfirm = function(content, yesCallback, noCallback, className){
            if(!jBox){
                var html = '<div class="d-msg-confirm-bg flex-center">'
                        + '    <div class="d-msg-confirm-box {{className}}">'
                        + '        <div class="d-msg-confirm-content flex-center flex-vertical">'
                        + '            {{content}}'
                        + '        </div>'
                        + '        <div class="d-msg-confirm-btn">'
                        + '            <button class="d-msg-confirm-cancel" type="button">取消</button><button class="d-msg-confirm-ok" type="button">确定</button>'
                        + '        </div>'
                        + '    </div>'
                        + '</div>';
                jBox = $(html).appendTo("body");
                bind();
            }
            update(content, yesCallback, noCallback, className);
        };
    }

    /**
     * 无限下拉
     * param.target 目标元素(请求数据的放置区),如： .reco-wrap .goods-list
     * param.loadTag 加载图片元素（请求过程中用于改变background-image为load图片）,如：.reco-wrap .title
     * param.listenEle 侦听元素(用于判断scoll是否到底部)  如：.reco-wrap .title-wrap
     *
     */
    jshop.widget.gragPull = function(param){

        var _arg = param ||{},
            _target = _arg.target,
            _page = 1,
            _loadImg = "url(//img11.360buyimg.com/cms/jfs/t490/282/1327111733/2166/b74c372a/54c9cd79N04238576.png)",
            _activityId = $("#mobAppId").val(),
            _resourceValue = Base.getURLParams.resourceValue,
            _CONFIG = {
                maxPage:20,
                //新网关地址迁移，验签白名单
                url:INTERFACE.portal + '?client=wjshop&clientVersion=1.0.0&functionId=indexRecommendForJshop&body={"activityId":"{{activityId}}","category":"{{categoryId}}","page":"{{page}}","pin":"{{pin}}","logId":"{{resourceValue}}"}&callback=callbackJsonp',
                imgTemp:"",
                req:false,
                tips:"<div style='text-align:center;display:none;' class='load-tips'><span class='loading' style='padding-left:25px;position: relative;color:#999;'>加载中</span></div>",
                url_reg:INTERFACE.portal + '?client=wjshop&clientVersion=1.0.0&functionId=indexRecommendForJshop&body={"activityId":"{{activityId}}","category":"{{categoryId}}","page":"{{page}}","pin":"{{pin}}","logId":"{{resourceValue}}"}&callback=callbackJsonp'
            },
            _targetDom = $(_arg.target),
            tips_parent = _targetDom.parent();

        /**
         * 初始化
         * @private
         */
        function _init(){
            var _listenEle = _arg.listenEle;
            $(_listenEle).attr("report-eventparam",_resourceValue+"_"+_activityId);
            if($(_listenEle) && $(_listenEle).length > 0){
                if(_arg.loadTag){
                    _CONFIG.imgTemp = $(_arg.loadTag).css("background-image");
                }
                tips_parent.append(_CONFIG.tips);
                _bandEvent();

            }
        }

        function _bandEvent(){

            window.addEventListener("scroll",function(){
                var _scrollTop = document.documentElement.scrollTop || document.body.scrollTop,
                    _scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
                //向底部滚动
                if(window.innerHeight + _scrollTop +10>= _scrollHeight){
                    _ajaxHandle();
                }
            },false);

        }
        function _ajaxHandle(){
            if(_CONFIG.req){return;}
            _CONFIG.req =  _arg.moveDownflag = true;
            _CONFIG.url = _CONFIG.url_reg; //将url模板赋值给url
            //当请求页数大于最大请求页数时，不允许请求
            if(_page > _CONFIG.maxPage){
                return;
            }
            //获取pin,activityId,categoryId
            var pin = "",
                categoryId = $("#categoryParam").val();
            //显示加载中
            if(_page == 1){
                // $(_arg.loadTag).css("background-image",_loadImg);
                $(_arg.loadTag).addClass("loading");
            }else{
                tips_parent.find(".load-tips").show();
            }
            if (typeof(_resourceValue) == "undefined")
            {
                _resourceValue="";
            }
            _CONFIG.url = _CONFIG.url.replace(/{{activityId}}/g,_activityId).replace(/{{categoryId}}/g,categoryId).replace(/{{resourceValue}}/g,_resourceValue);

            //处理登录与未登录pin赋值情况
            Base.checkLogin(function(data){
                _check(data.enpin);
            },function(){
                _check("");
            });
        }
        /** 发送请求
         * @private
         */
        function _check(pin){
            pin = pin?pin:"";
            _CONFIG.url=_CONFIG.url.replace(/{{pin}}/g,pin).replace(/{{page}}/g,_page);
            var script = document.createElement("script");
            script.src = _CONFIG.url;
            document.getElementsByTagName("head")[0].appendChild(script);
        }

        function _callbackFunc(data){
            _CONFIG.req = false;
            if(_page == 1){
                // $(_arg.loadTag).css("background-image",_CONFIG.imgTemp);
                $(_arg.loadTag).removeClass("loading");
            }
            _page++;
            setTimeout(function(){
                _callback(data);
                tips_parent.find(".load-tips").hide();
            },100);

        }
        /**
         * 数据处理
         * @private
         */
        function _callback(data){
            var li_arr = [],
                wareList = data.recommendList;
            if(wareList && wareList.length>0){
                for(var i =0;i < wareList.length;i++){
                    var _item = wareList[i];
                    //兼容[null]情况
                    if(!_item){
                        //msgAlert("请求无数据");
                        return;
                    }
                    li_arr.push('<li>'+
                        '<a href='+_detailUrl(_item.wareId,_item.sourcevalue)+' class="J_ping" report-eventid="Jshop_PullDown_ProductID" report-eventparam='+_item.sourcevalue+'>'+
                        '<div class="goods-pic"><img src=' + (_item.warePic? _item.warePic.replace(/http:|https:/g,''): '') +'></div>'+
                        '<div class="goods-name"><span title='+_item.wareName+'>'+_item.wareName+'</span></div>'+
                        '<div class="goods-price">￥<span class="jdNum" jshop="price" jdprice='+_item.wareId+'></span></div>'+
                        '</li>');
                }
                $(_arg.target).append(li_arr.join(''));
                //新增无线下拉url参数sourceType和sourceValue修改
                commonLoder.initActPageParams($(_arg.target));
            }
            /*else{
             msgAlert("请求无数据");
             }*/
        }

        /**
         * 根据app或m指定不同的url
         */
        function _detailUrl(skuId,sourcevalue){
            var url = location.href;
            //app
            if(/\/app\//.test(url)){
                //修改sourceType和sourceValue默认参数值
                return 'openApp.jdMobile://virtual?params={"category":"jump","des":"productDetail","skuId":"' + skuId + '","sourceType":"JSHOP_SOURCE_TYPE","sourceValue":"JSHOP_SOURCE_VALUE","landPageId":"jshop.cx.mobile"}';
//                return 'openapp.jdmobile://virtual?params={"category":"jump","des":"productDetail","skuId":"'+skuId+'","sourceType":"","sourceValue":"'+sourcevalue+'","landPageId":"jshop.cx.mobile"}';
            }
            //m
            else{
                return isWXQQAddress? (INTERFACE.wqCommon.detail + '?sku=' + skuId) : (INTERFACE.mCommon.product + skuId + '.html')
                // return INTERFACE.mCommon.product + skuId + '.html';
            }
        }
        window.callbackJsonp=_callbackFunc;
        _init();
    }

    //懒加载检测
    function checkAll(){
        jshop.widget.instance.moduleLoad.check();
        jshop.widget.instance.imgLoad.reCheck();
        jshop.widget.instance.priceLoad.check();
    }

    //初始化
    !!function init(){
        //声明
        win.jshop = jshop;
        jshop.widget.instance = typeof jshop.widget.instance === "undefined"? {}: jshop.widget.instance;
        jshop.widget.instance.moduleLoad = new jshop.widget.moduleLazyLoad();
        jshop.widget.instance.imgLoad = new jshop.widget.imgLazyLoad();
        jshop.widget.instance.priceLoad = new jshop.widget.priceLazyLoad();
        jshop.widget.alert();
        jshop.widget.confirm();

        //滚动的时候绑定懒加载检测机制
        $(window).on('scroll.lazyLoad', checkAll);

        //如果是微信手Q环境，则执行微信手Q的初始化
        if(isWXQQAddress){
            tool.handleWXQQLink();
        }

        /*修复在android4.3及以下版本webview物理返回键返回时滚动条位置定位会在dom树ready之后的问题*/
        setTimeout(function(){
            checkAll();
            $(".outer-container > div[module-name]").each(function(i, dom){
                if(i < 2){
                    //第一次图片、价格懒加载结束后，就把首屏默认输出的2个模块的最小站位高度给去掉
                    $(dom).css("height", "");
                }
            });
        }, 50);
    }();

})(window, $);

/**
 * 公共函数
 * @author bjlein
 */

;(function(win){

    win.commonLoder = {
        /**
         * 获取京东公共footer部分
         */
        footer : function(){
            $.ajax({
                url : INTERFACE.mCommon.footer + "?v=t",
                type : "post",
                data : {"sid": Base.getSid()},
                dataType : "html",
                success : function(html){
                    var _jLogin = $('body').append(html).find(".new-f-login a").eq(0);
                    _jLogin.attr("href", _jLogin.attr("href") + "&v=t&returnurl=" + encodeURIComponent(location.href));
                },
                error : function(XMLHttpRequest,textStatus,errorThrow){
                }
            });
        },
        /**
         * 获取京东公共header部分。装修不需要出现工具条
         */
        header : function(title, noNeedAppDownload){
            if(location.host === "jshop.jd.com"){
                noNeedAppDownload = "";
            }else{
                noNeedAppDownload = typeof noNeedAppDownload === "undefined"? "?downloadApp=true": "";
            }
            $.ajax({
                url : INTERFACE.mCommon.header + noNeedAppDownload,
                type : "post",
                data : {"title": title, "sid": Base.getSid()},
                dataType : "html",
                success : function(html){
                    $('body').prepend('<header>' + html + '</header>');
                },
                error : function(XMLHttpRequest,textStatus,errorThrow){
                }
            });
        },

        /**
         * 自动给页面里的链接都加上本页面的url参数
         */
		initActPageParams: function(moduleObj) {
            //新增判断app，参数配置
            var _url = window.location.href;
            var _search = window.location.search;
            var _pathName = window.location.origin + window.location.pathname;
            var _hrefParamArr = _search.split("?")[1] ? _search.split("?")[1].split("&") : [];
            //京东到家不做app参数替换以及参数下传
            if($(".jdHomeBrowse").length) return;
            if(_url.indexOf("/app/") != -1){
                var _search_arr = _search.split("&"),
                    _resourceType = "default",
                    _resourceValue = "default",
                    _sourceType,_sourceValue,
                    _search_arr_len = _search_arr.length;
                if(moduleObj){
                    var openAppHref = moduleObj.find("a[href^='openApp.jdMobile']");
                    var openHref = moduleObj.find("a[href^='http://'],a[href^='https://'],a[href^='//']");
                }else{
                    var openAppHref = $("a[href^='openApp.jdMobile']");
                    var openHref = $("a[href^='http://'],a[href^='https://'],a[href^='//']");
                }
                if(_search_arr_len != 1){
                    $.map(_search_arr,function(item){
                        if(_resourceType == "default" && item.indexOf("resourceType") != -1){
                            _resourceType = item.split("=")[1] ? item.split("=")[1] : "JSHOP_SOURCE_TYPE";
                        }else if(_resourceValue == "default" && item.indexOf("resourceValue") != -1){
                            _resourceValue = item.split("=")[1] ? item.split("=")[1] : "JSHOP_SOURCE_VALUE";
                        }
                    });
                }
                //如果url中不含resourceType与resourceValue值则重新赋值为默认值
                _resourceType = _resourceType == "default" ? "JSHOP_SOURCE_TYPE" : _resourceType;
                _resourceValue = _resourceValue == "default" ? "JSHOP_SOURCE_VALUE" : _resourceValue;
                _sourceType = '"sourceType":"'+_resourceType+'"';
                _sourceValue = '"sourceValue":"'+_resourceValue+'"';
                openAppHref.each(function(){
                    var _beforeHref = $(this).attr("href"),_nowHref,
                        _beforeHrefArr = _beforeHref.split("="),
                        _refurlParams = JSON.parse(_beforeHrefArr[1]);
                    _refurlParams.refurl = _pathName;
                    _beforeHref = _beforeHrefArr[0]+"="+JSON.stringify(_refurlParams);
                    _nowHref = _beforeHref.replace(/"sourceType":"JSHOP_SOURCE_TYPE"/, _sourceType).replace(/"sourceValue":"JSHOP_SOURCE_VALUE"/,_sourceValue);
                    $(this).attr("href",_nowHref);
                });
                openHref.each(function(){
                    var _beforeHref = $(this).attr("href"),
                        _hrefParam = _beforeHref.split("?"),
                        _lastParam = "";
                    //新增jshop焦点图配置支持文章id配置与跳转  2016-4-13  thz
                    if(_beforeHref.indexOf("h5.m.jd.com/active/faxian/html/innerpage.html?id") != -1){
                         var _faxianSourceType =  _resourceType == "JSHOP_SOURCE_TYPE" ? "" : ','+_sourceType,
                             _faxianSourceValue =  _resourceValue == "JSHOP_SOURCE_VALUE" ? "" : ','+_sourceValue,
                             _id = _hrefParam[1].split("=")[1],
                             _faxianAppHref = 'openApp.jdMobile://virtual?params={"category":"jump","des":"faxian_article"'+ _faxianSourceType + _faxianSourceValue + ',"id":"'+_id+'"}';
                        $(this).attr("href", _faxianAppHref);
                    }else{
                        if(_hrefParam.length === 1){
                            $(this).attr("href", _beforeHref + _search);
                        }else{
                            $.map(_hrefParamArr,function(item){
                                if(_beforeHref.indexOf(item) == -1){
                                    _lastParam = _lastParam + "&"+item.toLowerCase();
                                }
                            });
                            $(this).attr("href", _beforeHref + (_lastParam != "" ? _lastParam : ""));
                        }
                    }
                });
            }else{
                if(moduleObj){
                    var jHref = moduleObj.find("a[href^='http://'],a[href^='https://'],a[href^='//'],area[href^='http://'],area[href^='https://'],area[href^='//']");
                }else{
                    var jHref = $("a[href^='http://'],a[href^='https://'],a[href^='//'],area[href^='http://'],area[href^='https://'],area[href^='//']");
                }
                jHref.each(function(){
                    var href = $(this).attr("href"),_nowHref,
                        arrUrl = href.split("?");
                    //微信手Q
                    if(_url.indexOf("/wq/") != -1){
                        //新增微信手Q如果活动链接为m或app强制转换为wq
                        if(href.indexOf("/m/") != -1 || href.indexOf("/app/") != -1){
                            _nowHref = href.replace(/\/m\//, "/wq/").replace(/\/app\//, "/wq/");
                            href = _nowHref;
                            $(this).attr("href",_nowHref);
                        }
                        //新增微信手Q如果活动商祥如果为京东主站的则强制替换为微信手Q商祥
                        else if(href.indexOf("//item.m.jd.com/ware/view.action?wareId=") != -1){
                            _nowHref = href.replace(/\/\/item.m.jd.com\/ware\/view.action\?wareId=/, "//wq.jd.com/item/view?sku=");
                            $(this).attr("href",_nowHref);
                        }else if(href.indexOf("//item.m.jd.com/product") != -1){
                            _nowHref = href.replace(/\/\/item.m.jd.com\/product\//, "//wq.jd.com/item/view?sku=").split(".html")[0];
                            $(this).attr("href",_nowHref);
                        }
                    }else{
                        if(arrUrl.length === 1){
                            $(this).attr("href", href + _search);
                        }else{
                            //$(this).attr("href", href + "&" + _search.substring(1));
                            //解决安卓部分机子微信异步加载导致参数下传传递两次问题
                            var _urlParamStr = _search.substring(1);
                            if(href.indexOf(_urlParamStr) == -1){
                                $(this).attr("href", href + "&" + _urlParamStr);
                            }
                        }
                    }

                });
            }
		},
		//广告预览
		getAdByUrl: function() {
            var g = $("#mobAppId").val(),suffix="mob_adv_",
                f = window.location.href, e = f.split("/"),
                appUrl = e[e.length - 1], appUrl = appUrl.split(".")[0], url = INTERFACE.actJshop.ad + "?id=" + g + "&type=2&appUrl=" + appUrl + "";
            $.ajax({url: url,dataType: "jsonp",jsonp: "callback",contentType: "application/jsonp; charset=utf-8",type: "post",success: function(m) {
                    for (var l = 0; l < m.length; l++) {
                        for (var k in m[l]) {
							$("#"+suffix+k).append(m[l][k]);
                            break;
                        }
                    }
                }});
        }
    };

    _init();

    function _init(){
        _bindTopBar();
        var userAgentType = window.navigator.userAgent.toLowerCase();
        //新增如果是闪购app，则屏蔽m请求，保留open原生协议请求
        if(userAgentType.indexOf("jdsg") != -1) return;
        //accessType的值为intact，则认为是在app环境下访问
        if(Base.getURLParams().accessType !== 'intact'){
            _bindDetailPage();
        }
        _bindShowAppGoodsPage();
    }


    function _getUrlQueryString(name){
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if(r!=null)return encodeURIComponent(r[2]); return null;
    }


    function _bindShowAppGoodsPage(){
        if(window.location.href.indexOf("/app/act/") == -1){
            return;
        }
        if(_getUrlQueryString("cid")!="true"){
            return;
        }
        if(_getUrlQueryString("activityId")== null || _getUrlQueryString("activityId")== ""){
            return;
        }
        if(_getUrlQueryString("tip")== null || _getUrlQueryString("tip")== ""){
            return;
        }
        var openDestUrl = 'openApp.jdMobile://virtual?params={"category":"jump","des":"productList","from":"promotion","activityId":"'
            +_getUrlQueryString("activityId")+'","tip":"' + decodeURIComponent(_getUrlQueryString("tip"))+'"}';

        var barHtml = "<div style='position: fixed; top: 100px; right: 5px;  width: 60px; height: 60px; z-index: 10001'>" +
            "<a href='"+openDestUrl+"'>" +
            "<img style='width: 100%;' src='//img13.360buyimg.com/cms/jfs/t2356/193/440784357/12385/cac286f4/560b3d70Nb39edd58.png'/>" +
            "</a>" +
            "</div>";

        $("body").append(barHtml);
    }

    //返回顶部按钮
    function _bindTopBar(){
        $(function(){
            if($(".j-to-top").length === 0){
                var barHtml = "<div class='j-to-top' style='display: none; position: fixed; bottom: 59px; right: 0; width: 42px; height: 42px; z-index: 10001'><img style='width: 100%;' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFUAAABUCAYAAADzqXv/AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MzU1OTUxOTAzMzRBMTFFNEEwMEVEMkNDRjYzQ0NGREMiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MzU1OTUxOTEzMzRBMTFFNEEwMEVEMkNDRjYzQ0NGREMiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDozNTU5NTE4RTMzNEExMUU0QTAwRUQyQ0NGNjNDQ0ZEQyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDozNTU5NTE4RjMzNEExMUU0QTAwRUQyQ0NGNjNDQ0ZEQyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PrHprYYAAAt+SURBVHja7J19TBNp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'/></div>";
                $("body").append(barHtml);
            }

            var jTopBar = $(".j-to-top"),
                height = $(window).height() * 3;
            $(window).bind("scroll", function(){
                var _top = document.documentElement.scrollTop || document.body.scrollTop;
                if(_top > height){
                    jTopBar.show();
                }else{
                    jTopBar.hide();
                }
            });
            jTopBar.bind("click", function(){
                $(this).hide();
                document.documentElement.scrollTop = 0;
                document.body.scrollTop = 0;
            });
        });
    }

    //处理M活动app地址在没有安装app情况下会打不开的问题
    function _bindDetailPage(){
        $("body").bind("click", function(e){
        	var g_sUA = navigator.userAgent.toLowerCase();
        	var jdApp = g_sUA.indexOf('jdapp');
        	if(jdApp == -1){
        		 var dom = e.target;
                 while(dom.tagName.toLowerCase() !== "body"){
                     if(dom.tagName.toLowerCase() === "a"){
                         var href = dom.getAttribute("href");
                         if(/^openApp\.jdMobile:\/\/virtual\?params=\{\"category\":\"jump\",\"des\":\"productDetail\"\,\"skuId\":\"(\d+)"/i.test(href)){
                             window.open(href,"_blank");
                             window.open(INTERFACE.mCommon.product + RegExp.$1 + ".html","_blank");
                             e.preventDefault();
                         }
                         break;
                     }else{
                         dom = dom.parentNode;
                     }
                 }
        	}
        });
    }

})(window);﻿/*
 * author: luxingyuan@jd.com
 * date: 2015-9-15 10:30:08
 * version: 1.0.1
*/

/*
  handle for goods-recommend module
*/
(function(){

    jshop = typeof jshop === "undefined"? {}: jshop;
    var funs = jshop.mStatistic = {};

    //商品推荐模块预处理
    funs.Jshop_ProductID = function(jRange){
        (jRange || $('[module-name="Jshop_ProductID"]')).each(function(index,n){
            var jTarget = $(n),
                name = jTarget.attr('module-name'),
                instanceid = jTarget.attr('instanceid');

            jTarget.find('a').each(function(){
                var jItem = $(this),
                    href = jItem.attr("href");
                //商品详情页的埋点
                if (/^http:\/\/item\.m\.jd\.com\/ware\/|^https:\/\/item\.m\.jd\.com\/ware\/|^\/\/item\.m\.jd\.com\/ware\/|^openApp\.jdMobile:\/\/virtual\?params=\{\"category\":\"jump\",\"des\":\"productDetail\"/i.test(href)) {
                    jItem.addClass('J_ping').attr('report-eventid', name).attr('report-eventparam', jItem.attr('href').match(/\d+/g)[0] + '_' + instanceid);
                }
            });

        });
    }

    //轮播图模块预处理
    funs.Jshop_FocusPic = function(jRange) {
        (jRange || $('[module-name="Jshop_FocusPic"]')).each(function(index,n){
            var target = $(n),
                name = target.attr('module-name'),
                instanceid = target.attr('instanceid');

            target.find('li a').each(function (i, m) {
                var item = $(m),
                    ind = i + 1;

                item.addClass('J_ping');
                item.attr('report-eventid', name);
                item.attr('report-eventparam', ind + '_' + item.attr('href').split('?')[0] + '_' + instanceid);
            });
        });
    }
    
    //导航模块预处理
    funs.Jshop_Navigation = function(jRange) {
        (jRange || $('[module-name="Jshop_Navigation"]')).each(function(index,n){
            var target = $(n),
                name = target.attr('module-name'),
                instanceid = target.attr('instanceid');

            target.find('a').each(function (i, m) {
                var item = $(m),
                    href = item.attr('href').replace(/^\s*/g, '');
                if (href.match(/^(http|https|\/\/)/)) {
                    item.addClass('J_ping');
                    item.attr('report-eventid', name);
                    item.attr('report-eventparam', href.split('?')[0] + '_' + instanceid);
                }
            });
        });
    }
    
    //图文推荐模块预处理
    funs.Jshop_ImgWord = function(jRange) {
        (jRange || $('[module-name="Jshop_ImgWord"]')).each(function(index,n){
            var target = $(n),
                name = target.attr('module-name'),
                instanceid = target.attr('instanceid');

            target.find('a').each(function(i,m){
                var item = $(m),
                    href = item.attr('href').replace(/^\s*/g,'');
                if(href.match(/^(http|https|\/\/)/)){
                    item.addClass('J_ping');
                    item.attr('report-eventid',name);
                    item.attr('report-eventparam',href.split('?')[0] + '_' + instanceid);
                }
            });
        });
    }
    
    //商品分类推荐模块预处理
    funs.Jshop_CategoryTab = function(jRange) {
        (jRange || $('[module-name="Jshop_CategoryTab"]')).each(function(index,n){
            var target = $(n),
                name = target.attr('module-name'),
                instanceid = target.attr('instanceid'), param;
            try {
                param = eval('(' + target.find('.j-module[module-function^="tab"]').attr('module-param') + ')');
            } catch (e) {
                param = {}
            }
            if (param === undefined || param.firstMenuSelector === undefined) return false;
            target.find(param.firstMenuSelector).each(function (i, m) {
                var item = $(m);

                item.addClass('J_ping');
                item.attr('report-eventid', name);
                item.attr('report-eventparam', item.text() + '_' + instanceid);
            });

            if (!param.secondMenuSelector) return false;

            target.find(param.secondMenuSelector).each(function (j) {
                var tabName = target.find(param.firstMenuSelector).eq(j).text();

                $(this).find('a').each(function(){
                    var jItem = $(this),
                        href = jItem.attr("href");
                    //商品详情页的埋点
                    if (/^http:\/\/item\.m\.jd\.com\/ware\/|^https:\/\/item\.m\.jd\.com\/ware\/|^\/\/item\.m\.jd\.com\/ware\/|^openApp\.jdMobile:\/\/virtual\?params=\{\"category\":\"jump\",\"des\":\"productDetail\"/i.test(href)) {
                        jItem.addClass('J_ping').attr('report-eventid', 'Jshop_ProductID_Category').attr('report-eventparam', jItem.attr('href').match(/\d+/g)[0] + '_' + tabName + '_' + instanceid);
                    }
                });

            });
        });
    }
    
    //倒计时模块预处理
    funs.Jshop_CountDown = function(jRange) {
        (jRange || $('[module-name="Jshop_CountDown"]')).each(function(index,n){
            var jTarget = $(n),
                name = jTarget.attr('module-name'),
                instanceid = jTarget.attr('instanceid');

            jTarget.find('a').each(function(){
                var jItem = $(this),
                    href = jItem.attr("href");
                //商品详情页的埋点
                if (/^http:\/\/item\.m\.jd\.com\/ware\/|^https:\/\/item\.m\.jd\.com\/ware\/|^\/\/item\.m\.jd\.com\/ware\/|^openApp\.jdMobile:\/\/virtual\?params=\{\"category\":\"jump\",\"des\":\"productDetail\"/i.test(href)) {
                    jItem.addClass('J_ping').attr('report-eventid', name).attr('report-eventparam', jItem.attr('href').match(/\d+/g)[0] + '_' + instanceid);
                }
            });

        });
    }
    
    //团购模块预处理
    funs.Jshop_GroupBuy = function(jRange) {
        (jRange || $('[module-name="Jshop_GroupBuy"]')).each(function(index,n){
            var jTarget = $(n),
                name = jTarget.attr('module-name'),
                instanceid = jTarget.attr('instanceid');

            jTarget.find('[href*="teamId"]').each(function (i, m) {

                var item = $(m);

                item.addClass('J_ping');
                item.attr('report-eventid', name);
                item.attr('report-eventparam', item.attr('href').match(/\d+/g)[0] + '_' + instanceid);
            });
        });
    }
    
    //店铺推荐模块预处理
    funs.Jshop_ShopRec = function(jRange) {
        (jRange || $('[module-name="Jshop_ShopRec"]')).each(function(index,n){
            var jTarget = $(n),
                name = jTarget.attr('module-name'),
                instanceid = jTarget.attr('instanceid');

            jTarget.find('a[href*="m/index"]').each(function (i, m) {
                var item = $(m);

                item.addClass('J_ping');
                item.attr('report-eventid', name);
                item.attr('report-eventparam', item.attr('href') + '_' + instanceid);
            });
        });
    }
    
    //促销推荐模块预处理
    funs.Jshop_PromoRec = function(jRange) {
        (jRange || $('[module-name="Jshop_PromoRec"]')).each(function(index,n){
            var jTarget = $(n),
                name = jTarget.attr('module-name'),
                instanceid = jTarget.attr('instanceid');

            jTarget.find('a').each(function(){
                var jItem = $(this),
                    href = jItem.attr("href");
                //商品详情页的埋点
                if (/^http:\/\/item\.m\.jd\.com\/ware\/|^https:\/\/item\.m\.jd\.com\/ware\/|^\/\/item\.m\.jd\.com\/ware\/|^openApp\.jdMobile:\/\/virtual\?params=\{\"category\":\"jump\",\"des\":\"productDetail\"/i.test(href)) {
                    jItem.addClass('J_ping').attr('report-eventid', name).attr('report-eventparam', jItem.attr('href').match(/\d+/g)[0] + '_' + instanceid);
                }
            });

        });
    }
    
    //促销接龙模块预处理
    funs.Jshop_PromoTurns = function(jRange) {
        (jRange || $('[module-name="Jshop_PromoTurns"]')).each(function(index,n){
            var jTarget = $(n),
                name = jTarget.attr('module-name'),
                instanceid = jTarget.attr('instanceid');

            jTarget.find('a').each(function(){
                var jItem = $(this),
                    href = jItem.attr("href");
                //商品详情页的埋点
                if (/^http:\/\/item\.m\.jd\.com\/ware\/|^https:\/\/item\.m\.jd\.com\/ware\/|^\/\/item\.m\.jd\.com\/ware\/|^openApp\.jdMobile:\/\/virtual\?params=\{\"category\":\"jump\",\"des\":\"productDetail\"/i.test(href)) {
                    jItem.addClass('J_ping').attr('report-eventid', name).attr('report-eventparam', jItem.attr('href').match(/\d+/g)[0] + '_' + instanceid);
                }
            });

        });
    }
    
    //预售模块预处理
    funs.Jshop_PreSale = function(jRange) {
        (jRange || $('[module-name="Jshop_PreSale"]')).each(function(index,n){
            var jTarget = $(n),
                name = jTarget.attr('module-name'),
                instanceid = jTarget.attr('instanceid');

            jTarget.find('a').each(function(){
                var jItem = $(this),
                    href = jItem.attr("href");
                //商品详情页的埋点
                if (/^http:\/\/item\.m\.jd\.com\/ware\/|^https:\/\/item\.m\.jd\.com\/ware\/|^\/\/item\.m\.jd\.com\/ware\/|^openApp\.jdMobile:\/\/virtual\?params=\{\"category\":\"jump\",\"des\":\"productDetail\"/i.test(href)) {
                    jItem.addClass('J_ping').attr('report-eventid', name).attr('report-eventparam', jItem.attr('href').match(/\d+/g)[0] + '_' + instanceid);
                }
            });

        });
    }

    //店铺活动推荐处理
    //埋点位置：商品、更多商品、宣传图片、宣传语
    funs.Jshop_Commended = function(jRange){
        (jRange || $('[module-name="Jshop_Commended"]')).each(function(index,n){
            var jTarget = $(n),
                name = jTarget.attr('module-name'),
                instanceid = jTarget.attr('instanceid'),
                countGood = 1,
                countPic = 1;

            jTarget.find('a').each(function (i, m) {
                var jItem = $(m),
                    href = jItem.attr("href");

                //商品详情页的埋点
                if (/^http:\/\/item\.m\.jd\.com\/ware\/|^https:\/\/item\.m\.jd\.com\/ware\/|^\/\/item\.m\.jd\.com\/ware\/|^openApp\.jdMobile:\/\/virtual\?params=\{\"category\":\"jump\",\"des\":\"productDetail\"/i.test(href)) {
                    jItem.addClass('J_ping').attr('report-eventid', name + '_ProductID').attr('report-eventparam', countGood++ + '_' + href.match(/\d+/g)[0] + '_' + instanceid);
                }
                //宣传图片埋点
                else if(jItem.hasClass("j-ad-pic")){
                    jItem.addClass('J_ping').attr('report-eventid', name + '_Pic').attr('report-eventparam', countPic++ + "_" + instanceid + "_" + href);
                }
                //宣传语埋点
                else if(jItem.hasClass("j-ad-word")){
                    jItem.addClass('J_ping').attr('report-eventid', name + '_Url').attr('report-eventparam', instanceid + "_" + href);
                }
                //更多商品埋点
                else if(jItem.hasClass("j-more-goods")){
                    jItem.addClass('J_ping').attr('report-eventid', name + '_GotoShop').attr('report-eventparam', instanceid);
                }

            });

        });
    }

    //热门排行模块埋点
    //埋点位置：tab标签、商品位
    funs.Jshop_Hot = function(jRange){
        (jRange || $('[module-name="Jshop_Hot"]')).each(function(index,n){
            var jTarget = $(n),
                name = jTarget.attr('module-name'),
                instanceid = jTarget.attr('instanceid');

            //商品位埋点
            jTarget.find('a').each(function (i, m) {
                var jItem = $(m),
                    href = jItem.attr("href");

                //商品位埋点
                if (/^http:\/\/item\.m\.jd\.com\/ware\/|^https:\/\/item\.m\.jd\.com\/ware\/|^\/\/item\.m\.jd\.com\/ware\/|^openApp\.jdMobile:\/\/virtual\?params=\{\"category\":\"jump\",\"des\":\"productDetail\"/i.test(href)) {
                    jItem.addClass('J_ping').attr('report-eventid', name + '_ProductID').attr('report-eventparam', (i + 1) + '_' + href.match(/\d+/g)[0] + '_' + instanceid);
                }

            });

            //tab埋点
            jTarget.find(".j-hot-nav").each(function(i, m){
                $(m).addClass('J_ping').attr('report-eventid', name + '_Tab').attr('report-eventparam', (i + 1) + "_" + $(m).text() + "_" + instanceid);
            });

        });
    }

    //自定义内容区处理
    funs.Jshop_Html_Content = function(jRange) {
        (jRange || $('[module-name="Jshop_Html_Content"]')).each(function(index,n){
            var target = $(n),
                name = target.attr('module-name'),
                instanceid = target.attr('instanceid');

            var len = target.find('a').each(function (i, m) {

                var item = $(m),
                    href = item.attr("href"),
                    ind = i + 1;

                //单品页
                if (/^http:\/\/item\.m\.jd\.com\/ware\/|^https:\/\/item\.m\.jd\.com\/ware\/|^\/\/item\.m\.jd\.com\/ware\/|^openApp\.jdMobile:\/\/virtual\?params=\{\"category\":\"jump\",\"des\":\"productDetail\"/i.test(href)) {
                    item.addClass('J_ping');
                    item.attr('report-eventid', name);
                    item.attr('report-eventparam', ind + '_' + href.match(/\d+/g)[0] + '_' + instanceid);
                } else if (/^http:\/\/|^https:\/\/|^\/\/|^openApp/i.test(href)) {        //其他有效链接页
                    item.addClass('J_ping');
                    item.attr('report-eventid', name);
                    item.attr('report-eventparam', ind + '_' + href + '_' + instanceid);
                }

            }).length;

            //针对热区
            target.find("area").each(function () {
                var item = $(this),
                    href = item.attr("href");
                item.addClass('J_ping');
                item.attr('report-eventid', name);
                item.attr('report-eventparam', ++len + '_' + href + '_' + instanceid);
            });
        });
    }

    //初始化的时候默认各个模块都执行一次埋点伪属性添加操作
    for(var fun in funs){
        funs[fun]();
    }

})();