<?php
    $file = file_get_contents("provinceURL.json");
    $url = json_decode($file);

    foreach ($url as $value) {
        if ($value !="") {
            $split = explode("/", $value);
            $filename = $split[sizeof($split)-1];
            printf("wget \"%s\" -O %s\n", $value, $filename);
        }
    }

?>
