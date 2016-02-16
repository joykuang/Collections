<?php
    function random_char(){
        $char = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
        $return = "";
        for ($i=strlen($char);$i>=1;$i--) {
            $length = strlen($char);
            $choose = $char[rand(100, 10000)%$length];
            $char = str_replace($choose, "", $char);
            $return .= $choose;
        }
        return $return;
    }
    
    function get_script_var($javascript, $array = true){
        preg_match_all("/\w+(-\r?\n?\w+)?/", $javascript, $result);
        $result = array_unique($result[0]);
        sort($result);
        $variable_split = "";
        $variable_split_array = array();
        foreach($result as $variable) { 
            //$variable_split .= $variable ."|";
            $variable_split_array[ $variable] = strlen($variable);
        }
        arsort($variable_split_array);
        
        foreach($variable_split_array as $variable2 => $count) { 
            $variable_split .= $variable2 ."|";
            //$variable_split_array[ $variable] = strlen($variable);
        }
        return $array ? $variable_split_array : $variable_split;
    }
    
    function convert62($integer, $ch){
        $char = "";
        $return = "";
        $bit = strlen($ch);
        while(1) {
            $number = $integer % $bit;
            $integer = ($integer - $number) / $bit;
            $char .= $ch[$number];
            if (!$integer) break;
        }
        for($i=strlen($char)-1;$i>=0;$i--){
            $return .= $char[$i];
        }
        return $return;
    }
?>