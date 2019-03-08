<?php

/**
* Sanitizer
*/
class Sanitizer {

	static private $_invisible_characters = array(
		'/%0[0-8bcef]/',	// url encoded 00-08, 11, 12, 14, 15
		'/%1[0-9a-f]/',		// url encoded 16-31
		'/[\x00-\x08]/',	// 00-08
		'/\x0b/', '/\x0c/',	// 11, 12
		'/[\x0e-\x1f]/'		// 14-31
	);

	static public function sanitize($data, $quote_style = ENT_QUOTES, $charset = 'UTF-8'){
		$data = self::clean($data);
		return self::htmlspecialchars($data);
	}

	static public function htmlspecialchars($data, $quote_style = ENT_QUOTES, $charset = 'UTF-8'){
		if(is_array($data)){
			foreach($data as $key => $value){
				$data[$key] = self::htmlspecialchars($value);
			}
			return $data;
		}else{
			return htmlspecialchars($data, $quote_style, $charset);
		}
	}

	static public function htmlspecialchars_decode($data, $quote_style = ENT_QUOTES){
		if(is_array($data)){
			foreach($data as $key => $value){
				$data[$key] = self::htmlspecialchars_decode($value, $quote_style);
			}
			return $data;
		}else{
			return htmlspecialchars_decode($data, $quote_style);
		}
	}

	static public function clean($data){
		return self::_clean_input_data($data);
	}

	static private function _clean_input_data($str){
		if (is_array($str)){
			$new_array = array();
			foreach ($str as $key => $val){
				$new_array[self::_clean_input_keys($key)] = self::_clean_input_data($val);
			}
			return $new_array;
		}

		if (get_magic_quotes_gpc()){
			$str = stripslashes($str);
		}

		// remove invisible characters
		$str = self::_remove_invisible_characters($str);

		// remove '\r'
		if (strpos($str, '\r') !== false){
			$str = str_replace(array('\r\n', '\r'), '\n', $str);
		}

		// escape '$' with '\$'
		if (strpos($str, "\\\$") !== false){
			$str = str_replace('\\\$', '$', $str);
		}

		return $str;
	}

	static private function _clean_input_keys($str){
		if ( ! preg_match("/^[a-z0-9:_\/-]+$/i", $str)){
			exit('Disallowed Key Characters.');
		}
		return $str;
	}


	static private function _remove_invisible_characters($str){
		$cleaned = '';
		while($cleaned != $str){
			$cleaned = $str;
			$str = preg_replace(self::$_invisible_characters, '', $str);
		}
		return $str;
	}

}