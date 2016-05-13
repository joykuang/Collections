function NinePatchGame(t, e) {
    this.wrapp = t, this.size = 8, this.curShow = 0, this.isWinner = !1, this.tipMsg = "", 
    this.responseCode = null, this.isLogined = !1, this.code = e, this._init();
}

NinePatchGame.prototype._init = function() {
    function t(t) {
        return t.length >= 4 && t.length <= 6 ? t = t.substring(0, 2) + "****" : t.length > 6 && (t = t.substring(0, 2) + "****" + t.substring(6)), 
        t;
    }
    function e(t) {
        var e = $(".close", t)[0], i = {};
        return e && e.addEventListener("click", function() {
            i.hide();
        }), o.getMask().addEventListener("click", function() {
            i.hide();
        }), i.show = function(e) {
            o.show(), e && $(t).find("p").html(e), t.style.display = "block";
        }, i.hide = function() {
            o.hide(), t.style.display = "none";
        }, i.getObj = function() {
            return t;
        }, i;
    }
    function i(t, e) {
        function i() {
            t.setAttribute("style", "-webkit-transform:translate3d(0,0,0); transform:translate3d(0,0,0);"), 
            setTimeout(n, 1e3);
        }
        function n() {
            t.setAttribute("style", "-webkit-transition:-webkit-transform " + s + "s linear; transition: transform " + s + "s linear; -webkit-transform:translate3d(0," + (-r + "") + "px,0); transform:translate3d(0," + (-r + "") + "px,0)"), 
            o = setTimeout(i, 1e3 * s);
        }
        e = e || 1e3;
        var o = 0, r = t.children[0].clientHeight * t.children.length, s = t.children.length * e / 1e3;
        r < t.clientHeight || n();
    }
    setTimeout(function() {
        jshop.mModule.tool.lottery.getlotteryInfo(n.code, function(t) {
            if (t.data) {
                for (var e = t.data.lotteryPrize, i = $(n.wrapp).find("li[priz]"), o = 0; o < e.length && !(o > 7 || o > i.length); o++) {
                    i.eq(o).attr("prizeId", e[o].prizeId).find("img").attr("src", e[o].prizeImg);
                }
            }
        }), jshop.mModule.tool.lottery.getWinnerList(n.code, function(e) {
            var n = e.data, o = "";
            if (n && n.length > 0) {
                for (var r = 0; r < n.length; r++) {
                    o += "<li><span>" + t(n[r].userPin) + "</span><span>" + n[r].prizeName + "</span></li>";
                }
                $("#scrollul").html(o), i($("#scrollul")[0], 2e3);
            }
        });
    }, 1);
    var n = this;
    if (n.btn = $(".choujiang-btn", this.wrapp)[0], !n.btn) {
        throw "btn can not be null";
    }
    n.btn.addEventListener("click", function() {
        n.start();
    });
    var o = (parseInt($("#nowTimes").html()), function() {
        function t() {
            i = document.createElement("div"), i.setAttribute("style", "z-index:10;display:none;position:fixed;left:0;top:0;width:100%;height:100%;background-color:#000;opacity:.75;"), 
            document.body.appendChild(i);
        }
        var e = {}, i = !1;
        return e.show = function() {
            i || t(), i.style.display = "block";
        }, e.hide = function() {
            i.style.display = "none";
        }, e.getMask = function() {
            return i || t(), i;
        }, e;
    }());
    n.successLayer = e($("#showSuccMsg")[0]), n.showErrorMsg = e($("#showErrorMsg")[0]), 
    Base.checkLogin(function(t) {
        t.isLogined && (n.cookieValue = t.enpin, n.isLogined = !0, jshop.mModule.tool.lottery.getLeftCount(n.code, n.cookieValue, function(t) {
            n.responseCode = t.responseCode;
            "0015" !== t.responseCode && t.data && ($("#nowTimes").html(t.data.chances), $("header.head").show());
        }));
    });
}, NinePatchGame.prototype.loop = function() {
    var t = this;
    t.loopTimeout = setTimeout(function() {
        if (t.curShow) {
            var e = $("[priz='" + t.curShow + "']", t.wrapp)[0];
            e.className = e.className.replace("cur", ""), t.curShow++, t.curShow > t.size && (t.curShow = 1), 
            e = $("[priz='" + t.curShow + "']", t.wrapp)[0], e.className = e.className + " cur";
        } else {
            t.curShow = 1, $("[priz='1']", t.wrapp).addClass("cur");
        }
        return t.delay && (t.loopTime += 20, t.delay--, 0 == t.delay) ? (t.showOver(), void (t.onEndAt && t.onEndAt(t.isWinner))) : void t.loop();
    }, t.loopTime);
}, NinePatchGame.prototype.start = function() {
    var t = this;
    if (t.responseCode == "0014") {
        msgAlert("该抽奖需设置了支付密码才能参与哦", 2e3);
        return;
    } else {
        if (t.responseCode == "0016") {
            msgAlert("该抽奖需账号绑定邮箱才能参与哦", 2e3);
            return;
        } else {
            if (t.responseCode == "0017") {
                msgAlert("该抽奖需账号绑定手机号才能参与哦", 2e3);
                return;
            }
        }
    }
    if ("0" === $("#nowTimes").text()) {
        return void msgAlert("别太贪心哦，明天再来吧");
    }
    if (t.isLogined === !0) {
        if ("1" == t.btn.getAttribute("isGoing")) {
            return void msgAlert("抽奖正在进行中，不要太心急哦", 2e3);
        }
        jshop.mModule.tool.lottery.drawing(t.code, t.cookieValue, function(e) {
            if (e.data) {
                var i = e.responseCode, n = e.responseMessage, e = e.data;
                if ("0000" !== i) {
                    msgAlert("0015" === i ? "您的抽奖频率太快了，慢一点儿吧" : n);
                } else {
                    $("#nowTimes").html(e.chances);
                    var o = !1;
                    if (e.winner === !0) {
                        var r = -1;
                        $(".choujiang li[priz]").each(function(i, n) {
                            return e.prizeId == $(n).attr("prizeId") ? (r = $(n).attr("priz"), o = !0, getPrize = e.prizeName, 
                            t.tipMsg = e.promptMsg.replace(/#@@#/g, "<br>"), !1) : void 0;
                        });
                    } else {
                        e.chances > 0 ? t.tipMsg = "太遗憾了，换根手指，再来一次" : t.tipMsg = "您今天的机会已经用完了，明天继续吧", r = 5;
                    }
                    var s = t.onStart && t.onStart();
                    if (s === !1) {
                        return;
                    }
                    t.loopTime = 100, t.btn.innerHTML = "抽奖中", t.btn.setAttribute("isGoing", "1"), t.loop(), 
                    t.isWinner = o, setTimeout(function() {
                        t.endAt(r);
                    }, 2e3);
                }
            }
        });
    } else {
        msgAlert("抽奖需要先登录，火速带您前往登录页面", 3e3), setTimeout(function() {
            window.location.href = "https://passport.m.jd.com/user/login.action?v=t&sid=" + Base.getSid() + "&returnurl=" + encodeURIComponent(location.href) + "&ipChanged=false";
        }, 2e3);
    }
}, NinePatchGame.prototype.end = function() {
    clearTimeout(this.loopTimeout);
    var t = this;
    t.btn.innerHTML = "抽奖", t.btn.setAttribute("isGoing", "0");
}, NinePatchGame.prototype.endAt = function(t) {
    var e = t - this.curShow;
    0 > e && (e += this.size), e += 1 * this.size, this.delay = e;
}, NinePatchGame.prototype.showOver = function() {
    this.end();
}, NinePatchGame.prototype.onStart = function() {}, NinePatchGame.prototype.onEndAt = function(t) {
    var e = this;
    setTimeout(function() {
        t ? ($("#myprize").html(getPrize), e.successLayer.show(e.tipMsg)) : e.showErrorMsg.show(e.tipMsg);
    }, 500);
};