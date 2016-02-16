<?php
    function getProvince($enter){
        $html = file_get_contents($enter);
        $html = iconv('gb2312', 'utf-8', $html);
        preg_match_all( '/<td><a[^>]*>*?(\s\S+)<\/a><\/td>/i', $html, $json);
        $json = $json[0];
        $json = json_encode($json);
        preg_match_all( '/<a href=[\'\"]?([^\'\" ]+).*?>/i', $json, $url);
        $json = $url[1];
        $json = json_encode($json);
        return $json;
    }

    function getProvinceHTML($json) {
        $url = json_decode($json);
        foreach ($url as $value) {
            if ($value !="") {
                $split = explode("/", $value);
                $filename = $split[sizeof($split)-1];
                printf("wget \"%s\" -O %s\n", $value, $filename);
            }
        }
    }

    function getProvinceURL($json, $prefix) {
        # code...
    }

    $url = 'http://www.stats.gov.cn/tjsj/tjbz/tjyqhdmhcxhfdm/2014/index.html';
    $json = getProvince($url);
    $cmd = getProvinceHTML($json);

    echo $json;
    echo $cmd


?>
