<?php
    // 数据来源：http://www.stats.gov.cn/tjsj/tjbz/tjyqhdmhcxhfdm/2014/index.html
    $enter = "http://www.stats.gov.cn/tjsj/tjbz/tjyqhdmhcxhfdm/2014/index.html";
    $html = file_get_contents($enter);
    $html = iconv('gb2312', 'utf-8', $html);
    preg_match_all( '/<td><a[^>]*>*?(\s\S+)<\/a><\/td>/i', $html, $json);
    $json = $json[0];

    $temp = [];
    foreach ($json as $index => $value) $temp[$index] = strip_tags($value);
    $json = json_encode($temp);
    echo($json);
?>
