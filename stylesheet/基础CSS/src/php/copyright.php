<?php
require "convert62.php";

$year = date("Y");
$author = "Joy Kuang";
$license = "MIT";
$key = random_char();
$build = date("Y-m-d H:i:s") ." @ " .convert62(time(), $key);

// @Include: normalize.css v3.0.3 | MIT License | github.com/necolas/normalize.css
echo <<<COPYRIGHT
/*!
  *  Copyright (c) Yueruan Studio, GRK Foundation Co., Ltd 2011-$year
  *  @Author: $author
  *  @License: $license
  *  @Build: $build
  *  @Key: $key
  *  @Include: normalize.css v3.0.3 | MIT License | https://git.io/NJKadg
  */
COPYRIGHT;
?>