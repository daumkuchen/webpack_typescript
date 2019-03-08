<?php
require_once LIB_DIR.DS.'utils'.DS.'Hash.php';

/**
* Config
*/
class Config {

	protected $values;

	public function __construct($values = array()){
		if(!is_array($values)){
			$values = array($values);
		}
		$this->values = $values;
	}

	public function read($key = null){
		if (empty($key) && $key !== null) {
			return null;
		}
		if ($key === null) {
			return !empty($this->values)? $this->values : null;
		}

		$result = Hash::get($this->values, $key);

		if (isset($result)) {
			return $result;
		}
		return null;
	}

	public function write($key, $value){
		if (empty($key)){
			return false;
		}

		$write = $key;
		if (!is_array($key)) {
			$write = array($key => $value);
		}

		$this->values = Hash::merge($this->values, $write);
		return true;
	}

	public function delete($key){
		if(self::check($key)){
			$this->values = Hash::remove($this->values, $key);
			return !self::check($key);
		}
		return false;
	}

	public function check($key){
		if(empty($key)) return false;
		return Hash::get($this->values, $key) !== null;
	}
}