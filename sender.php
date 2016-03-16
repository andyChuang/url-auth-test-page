<?php

$type = $_REQUEST["type"];
$url = $_REQUEST["url"];
$request = $_REQUEST["data"];

$ch = curl_init();
if($type=="auth"){
	curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query( array( "AuthData"=>$request) )); 
}else{
	curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query( array( "QueryData"=>$request) )); 
}
curl_setopt($ch, CURLOPT_URL, $url );
curl_setopt($ch, CURLOPT_POST, true); // 啟用POST
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$result = curl_exec($ch); 

echo $result;

curl_close($ch);
?>