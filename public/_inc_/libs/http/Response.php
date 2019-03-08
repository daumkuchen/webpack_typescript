<?php

/**
* Response
*/
class Response {

	static protected $contents = array();
	static protected $status = 200;
	static protected $headers = array();

	static public function send($content = null, $send_headers = true){
		if($send_headers){
			header('HTTP/1.1 ' . self::$status . ' ' . self::$HTTP_CODES[self::$status]);
			foreach(self::$headers as $name => $value){
				if(is_array($value)){
					switch(count($value)){
						case 2 : header($name . ': ' . $value[0], $value[1]); break;
						case 1 : header($name . ': ' . $value[0]); break;
						case 0 : break;
						default : header($name . ': ' . $value[0], $value[1], $value[3]); break;
					}
				}else{
					header($name . ': ' . $value);
				}
			}
		}
		if($content !== null){
			self::body($content);
		}
		foreach(self::$contents as $content){
			echo $content;
		}
	}

	static public function body($content = null){
		self::$contents[] = $content;
	}

	static public function clear(){
		self::$contents = array();
	}

	static public function status($status = null){
		if(is_null($status)){
			return self::$HTTP_CODES[self::$status];
		}
		if(is_string($status)){
			$codes = array_flip(self::$HTTP_CODES);
			self::$status = $codes[$status];
		}else{
			self::statusCode($status);
		}
	}

	static public function statusCode($code = null){
		if(is_null($code)){
			return self::$status;
		}
		if(is_numeric($code) && isset(self::$HTTP_CODES[$code])){
			self::$status = $code;
		}
	}

	static public function header($name, $value){
		if(is_array($name)){
			self::$headers = array_merge(self::$headers, $headers);
		}else{
			self::$headers[$name] = $value;
		}
	}

	static public function type($ext){
		$type = 'application/octet-stream';
		if(array_key_exists($ext, self::$MIME_CONTENT_TYPES)){
			$type = self::$MIME_CONTENT_TYPES[$ext];
		}

		self::header('Content-type', $type);
	}

	static public function length($len){
		self::header('Content-Length:', $len);
	}

	static public function redirect($loc, $status = 302){
		self::clear();

		self::statusCode($status);
		self::header('Location', $loc);
		self::send();
		exit;
	}


	static public function sendFile($file_name){
		if(headers_sent()){
			return false;
		}

		if( file_exists($file_name) ){
			if(ini_get('zlib.output_compression')){
				ini_set('zlib.output_compression', 'Off');
			}

			$file_size = filesize($file_name);
			$path_parts = pathinfo($file_name);
			$ext = strtolower($path_parts['extension']);

			self::header(array(
				'Pragma' => 'public',// required
				'Expires' => '0',
				'Cache-Control' => 'must-revalidate, post-check=0, pre-check=0',
				'Cache-Control' => array('private', false), // required for certain browsers
			));
			self::type($ext);
			self::header(array(
				'Content-Disposition' => 'attachment; filename="'.basename($file_name).'";',
				'Content-Transfer-Encoding' => 'binary',
				'Content-Length' => $file_size,
			));

			ob_clean();
			flush();
			readfile( $file_name );

			exit();

		} else{
			return false;
		}
	}

	static public $MIME_CONTENT_TYPES = array(
		'txt' => 'text/plain',
		'htm' => 'text/html',
		'html' => 'text/html',
		'php' => 'text/html',
		'css' => 'text/css',
		'js' => 'application/javascript',
		'json' => 'application/json; charset=utf-8',
		'xml' => 'application/xml',
		'swf' => 'application/x-shockwave-flash',
		'flv' => 'video/x-flv',
		// images
		'png' => 'image/png',
		'jpe' => 'image/jpeg',
		'jpeg' => 'image/jpeg',
		'jpg' => 'image/jpeg',
		'gif' => 'image/gif',
		'bmp' => 'image/bmp',
		'ico' => 'image/x-icon',
		'tiff' => 'image/tiff',
		'tif' => 'image/tiff',
		'svg' => 'image/svg+xml',
		'svgz' => 'image/svg+xml',
		// archives
		'zip' => 'application/zip',
		'rar' => 'application/x-rar-compressed',
		'exe' => 'application/x-msdownload',
		'msi' => 'application/x-msdownload',
		'cab' => 'application/vnd.ms-cab-compressed',
		'gzip' => 'multipart/x-gzip',
		// audio/video
		'mp3' => 'audio/mpeg3',
		'wav' => 'audio/wav',
		'aiff' => 'audio/aiff',
		'aif' => 'audio/aiff',
		'qt' => 'video/quicktime',
		'mov' => 'video/quicktime',
		'mpeg' => 'video/mpeg',
		'mpg' => 'video/mpeg',
		'mpe' => 'video/mpeg',
		'avi' => 'video/msvideo',
		'wmv' => 'video/x-ms-wmv',
		// adobe
		'pdf' => 'application/pdf',
		'psd' => 'image/vnd.adobe.photoshop',
		'ai' => 'application/postscript',
		'eps' => 'application/postscript',
		'ps' => 'application/postscript',
		// ms office
		'doc' => 'application/msword',
		'docx' => 'application/msword',
		'rtf' => 'application/rtf',
		'xls' => 'application/vnd.ms-excel',
		'xlt' => 'application/vnd.ms-excel',
		'xlm' => 'application/vnd.ms-excel',
		'xld' => 'application/vnd.ms-excel',
		'xla' => 'application/vnd.ms-excel',
		'xlc' => 'application/vnd.ms-excel',
		'xlw' => 'application/vnd.ms-excel',
		'xll' => 'application/vnd.ms-excel',
		'ppt' => 'application/vnd.ms-powerpoint',
		'pps' => 'application/vnd.ms-powerpoint',
		// open office
		'odt' => 'application/vnd.oasis.opendocument.text',
		'ods' => 'application/vnd.oasis.opendocument.spreadsheet',
	);

	static public $HTTP_CODES = array(
		100 => 'Continue',
		101 => 'Switching Protocols',

		200 => 'OK',
		201 => 'Created',
		202 => 'Accepted',
		203 => 'Non-Authoritative Information',
		204 => 'No Content',
		205 => 'Reset Content',
		206 => 'Partial Content',

		300 => 'Multiple Choices',
		301 => 'Moved Permanently',
		302 => 'Found',
		303 => 'See Other',
		304 => 'Not Modified',
		305 => 'Use Proxy',
		307 => 'Temporary Redirect',

		400 => 'Bad Request',
		401 => 'Unauthorized',
		402 => 'Payment Required',
		403 => 'Forbidden',
		404 => 'Not Found',
		405 => 'Method Not Allowed',
		406 => 'Not Acceptable',
		407 => 'Proxy Authentication Required',
		408 => 'Request Time-out',
		409 => 'Conflict',
		410 => 'Gone',
		411 => 'Length Required',
		412 => 'Precondition Failed',
		413 => 'Request Entity Too Large',
		414 => 'Request-URI Too Large',
		415 => 'Unsupported Media Type',
		416 => 'Requested range not satisfiable',
		417 => 'Expectation Failed',
		422 => 'Unprocessable Entity',

		500 => 'Internal Server Error',
		501 => 'Not Implemented',
		502 => 'Bad Gateway',
		503 => 'Service Unavailable',
		504 => 'Gateway Time-out'
	);
}
?>