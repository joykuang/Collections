<?php
function createToken($length = 8, $encrypt = 4){
    $char[0] = '1234567890';
    $char[1] = 'abcdefghijklmnopgqstuvwxyz';
    $char[2] = strtoupper($char[1] );
    $char[3] = '@#$%*?=+/';

    $ch = '';
    if ($encrypt == 'number' || $encrypt == 1) {
        $ch .= $char[0];
    } else if ($encrypt == 'letter' || $encrypt == 2) {
        $ch .= $char[1];
    } else if ($encrypt == 'mix' || $encrypt == 3) {
        $ch .= $char[0] . $char[1];
    } else if ($encrypt == 'security' || $encrypt == 5) {
        $ch .= $char[3] . $char[0] . $char[1] . $char[2] . $char[3];
    } else {
        $ch .= $char[0] . $char[1] . $char[2] . $char[1] . $char[0];
    }

    $token = '';
    for ($i=1;$i<=$length;$i++){
        $random = rand(0, (int)$char[0]);
        $ch_length = strlen($ch);
        $ch_index = $random%$ch_length;
        $token .= $ch[$ch_index];
    }
    return $token;
}

function createAccessToken($complex = false){
    $token = createToken(32, $complex ? 'security' : 'mix');
    $_SESSION['accessToken'] = $token;
    return $token;
}

function createSecurityToken($complex = false){
    $token = createToken(48, $complex ? 'security' : 'mix');
    $_SESSION['securityToken'] = $token;
    return $token;
}

function verifyToken($accessToken, $securityToken) {
    return (($accessToken == $_SESSION['accessToken']) and ($securityToken == $_SESSION['securityToken']));
}
?>
