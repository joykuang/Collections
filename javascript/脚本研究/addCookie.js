function addCookie(c, e, a, f, d) {
    var g = c + "=" + escape(e);
    if (a != "") {
        var b = new Date();
        b.setTime(b.getTime() + a * 24 * 3600 * 1000);
        g += ";expires=" + b.toGMTString()
    }
    if (f != "") {
        g += ";path=" + f
    }
    if (d != "") {
        g += ";domain=" + d
    }
    document.cookie = g
}