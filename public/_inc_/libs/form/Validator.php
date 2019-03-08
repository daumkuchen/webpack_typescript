<?php

/**
* Validator
*/
class Validator {

	//半角数
	const PAT_NUMBER = "/^[0-9]+$/";
	//メールアドレス
	const PAT_EMAIL = "/^[0-9,A-Z,a-z][0-9,a-z,A-Z,_,\.,\-,\+]+@[0-9,A-Z,a-z][0-9,a-z,A-Z,\.,\-]+\.[a-z]+$/";
	//半角英
	const PAT_ALPHABET = "/^[a-zA-Z]+$/";
	//半角英数
	const PAT_ALPHANUMERIC = "/^[0-9A-Za-z]+$/";
	//全角文字 (半角以外)
	const PAT_ZENKAKU = "/^[ 　]*^[0-9A-Za-z -~｡-ﾟ]*[ 　]*$/";

	//全角カタカナ
	const PAT_KATAKANA = "/^ァ-ン/";
	//全角ひらがな
	const PAT_KANA = "/^ぁ-ん/";
	//電話番号(xxx-xxxx-xxxx)
	const PAT_PHONENUMBER = "/^\d{2,4}\-?\d{2,4}\-?\d{2,4}$/";
	//郵便番号
	const PAT_ZIPCODE = "/^\d{3}-\d{4}$/";

	static public function between($value,$from, $to) {
		$len = mb_strlen($value);
		return ($from <= $len && $len <= $to);
	}

	static public function minLength($value,$min) {
		$len = mb_strlen($value);
		return ($min <= $len);
	}

	static public function maxLength($value,$max) {
		$len = mb_strlen($value);
		return ($len <= $max);
	}

	static public function isEmpty($value) {
		if(is_array($value)){
			return (count($value) == 0);
		}else{
			return ($value == "");
		}
	}

	static public function inArray($value,$array){
		return in_array($value, $array);
	}

	static public function pattern($value, $pattern) {
		return preg_match($pattern,$value);
	}
}
