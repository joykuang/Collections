/**
  *  http://easybuy.jd.com//address/getProvinces.action
  *  [POST]  provinceId:3
  *  [RETURN] JSON
  */

/**
  *  http://easybuy.jd.com//address/getCitys.action
  *  [POST]  provinceId:3
  *  [RETURN] JSON
  */

/**
*  http://easybuy.jd.com//address/getCountys.action
*  [POST]  cityId:2800
*  [RETURN] JSON
*/

/**
  *  http://easybuy.jd.com//address/getTowns.action
  *  [POST]  countyId:4209
  *  [RETURN] JSON
  */


/*
[POST] http://account.weibo.com/set/aj5/userinfo/getaddrprovince
[POST] http://account.weibo.com/set/aj5/userinfo/getaddrcity@@province:11
[POST] http://account.weibo.com/set/aj5/userinfo/getaddrarea@@province:11&&city:1
*/

var ajax = {
    provinces: 'http://easybuy.jd.com//address/getProvinces.action',
    citys: 'http://easybuy.jd.com//address/getCitys.action',
    countys: 'http://easybuy.jd.com//address/getCountys.action',
    towns: 'http://easybuy.jd.com//address/getTowns.action',
};
$.ajax({
    url: ajax.provinces,
    type: 'post',
    dataType: 'json',
    data: {

    },
    success: function(data, status, xhr) {
        console.debug(data);
    }
});
