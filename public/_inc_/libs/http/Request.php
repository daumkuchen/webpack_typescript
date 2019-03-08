<?php

/**
* Request
*/
class Request {

	static public function isAjax(){
		return (self::env('HTTP_X_REQUESTED_WITH') === "XMLHttpRequest");
	}


	static public function isPost(){
		return self::is('POST');
	}

	static public function isGet(){
		return self::is('GET');
	}

	static public function is($method = null){
		if(is_null($method)){
			return self::env('REQUEST_METHOD');
		}else{
			return strtoupper(self::env('REQUEST_METHOD','')) === strtoupper($method);
		}
	}

	static public function env($entry = null, $default = null){
		if(is_null($entry)){
			return $_SERVER;
		}elseif(isset($_SERVER[$entry])){
			return $_SERVER[$entry];
		}else{
			return $default;
		}
	}

	static public function getPost($name = null, $default = null){
		if(is_null($name)){
			return $_POST;
		}else{
			return isset($_POST[$name])? $_POST[$name] : $default;
		}
	}

	static public function getGet($name, $default = null){
		if(is_null($name)){
			return $_GET;
		}else{
			return isset($_GET[$name])? $_GET[$name] : $default;
		}
	}

	static public function getHost(){
		return !empty($_SERVER['HTTP_HOST'])? $_SERVER['HTTP_HOST'] : $_SERVER['SERVER_NAME'];
	}

	static public function isSSL(){
		return (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on');
	}

	static public function getRequestURI(){
		return $_SERVER['REQUEST_URI'];
	}

	static public function getURL(){
		$protocol = self::isSSL()? 'https://' : 'http://';
		$host = self::getHost();
		$base_url = self::getBaseURL();
		return $protocol . $host . $base_url;
	}

	static public function getBaseURL(){
		$script_name = $_SERVER['SCRIPT_NAME'];
		$request_uri = self::getRequestURI();

		if(0 === strpos($request_uri, $script_name)){
			return $script_name;
		}else if(0 === strpos($request_uri, dirname($script_name))){
			return rtrim(dirname($script_name), '/');
		}
		return '';
	}

	static public function getPathInfo(){
		$base_url = self::getBaseURL();
		$request_uri = self::getRequestURI();

		if(false !== ($pos = strpos($request_uri,'?'))){
			$request_uri = substr($request_uri,0,$pos);
		}

		return (string)substr($request_uri, strlen($base_url));
	}

}
