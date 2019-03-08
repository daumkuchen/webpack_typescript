<?php
require_once LIB_DIR.DS.'utils'.DS.'Hash.php';

/**
* Session
*/
class Session {

	static protected $inited = false;
	static protected $time = false;
	static protected $sessionTime = null;
	static protected $requestCountdown = 10;
	static protected $_userAgent = '';
	static protected $path = '/';
	static protected $id = null;
	static protected $valid = false;
	static protected $_cookieName;
	static protected $regenerated = false;

	static public $config = array(
		'timeout' => 1209600,//14*24*60*60,
		'cookie' => 'session',
		'ini' => array(
			'session.use_trans_sid' => 0,
		)
	);

	static public function init(){
		self::$time = time();
		if(isset($_SERVER['HTTP_USER_AGENT'])){
			self::$_userAgent = md5($_SERVER['HTTP_USER_AGENT']);
		}
		if(!self::$inited){
			register_shutdown_function('session_write_close');
		}

		self::$inited = true;
	}

	static public function start(){
		if(self::started()) return true;

		$id = self::id();
		self::_startSession();

		if (!$id && self::started()) {
			self::_checkValid();
		}

		self::$valid = true;
		return self::started();
	}

	static public function started(){
		return isset($_SESSION) && session_id();
	}

	static public function id($id = null) {
		if ($id) {
			self::$id = $id;
			session_id(self::$id);
		}
		if (self::started()) {
			return session_id();
		}
		return self::$id;
	}

	static public function check($key){
		if(empty($key) || !self::_hasSession() || !self::started()) return false;
		return Hash::get($_SESSION, $key) !== null;
	}

	static public function read($key = null){
		if (empty($key) && $key !== null) {
			return null;
		}
		if (!self::_hasSession() || !self::start()) {
			return null;
		}
		if ($key === null) {
			return !empty($_SESSION)? $_SESSION : null;
		}
		$result = Hash::get($_SESSION, $key);

		if (isset($result)) {
			return $result;
		}
		return null;
	}

	static public function write($key, $value){
		if (empty($key) || !self::start()) {
			return false;
		}

		$write = $key;
		if (!is_array($key)) {
			$write = array($key => $value);
		}
		foreach ($write as $k => $val) {
			self::_overwrite($_SESSION, Hash::insert($_SESSION, $k, $val));
			if (Hash::get($_SESSION, $k) !== $val) {
				return false;
			}
		}
		return true;
	}

	static public function delete($key){
		if(self::check($key)){
			self::_overwrite($_SESSION, Hash::remove($_SESSION, $key));
			return !self::check($key);
		}
		return false;
	}

	static public function setFlash($type, $data){
		return self::write('Flash.'.$type, $data);
	}

	static public function getFlash($type = null, $delete = true){
		if(is_null($type)){
			$res = self::read('Flash');
			if($delete){
				self::write('Flash', array());
			}
			$res = is_null($res)? array() : $res;
		}else{
			$res = self::read('Flash.'.$type);
			if($delete){
				self::delete('Flash.'.$type);
			}
		}
		return $res;
	}



	static protected function _overwrite(&$old, $new) {
		if (!empty($old)) {
			foreach ($old as $key => $var) {
				if (!isset($new[$key])) {
					unset($old[$key]);
				}
			}
		}
		foreach ($new as $key => $var) {
			$old[$key] = $var;
		}
	}


	static public function renew($destory = true){
		if (!session_id()) {
			return;
		}
		if (isset($_COOKIE[session_name()])) {
			setcookie(self::$config['cookie'], '', time() - 42000, self::$path);
		}
		session_regenerate_id(true);
	}

	static public function destroy() {
		if (!self::started()) {
			self::_startSession();
		}

		session_destroy();

		$_SESSION = null;
		self::$id = null;
		self::$_cookieName = null;
	}

	static public function clear(){
		$_SESSION = null;
		self::$id = null;
		self::renew();
	}

	static public function valid(){
		$config = self::read('Config');
		if(self::start() && $config){
			$validAgent = (isset($config['userAgent']) && self::$_userAgent === $config['userAgent']);
			if($validAgent && self::$time <= $config['time']){
				self::$valid = true;
			}else{
				self::$valid = false;
			}
		}
		return self::$valid;
	}



	static protected function _hasSession(){
		return self::started() || isset($_COOKIE[self::_cookieName()]);
	}

	static protected function _cookieName(){
		if (self::$_cookieName !== null) {
			return self::$_cookieName;
		}
		self::init();
		self::_configureSession();

		return self::$_cookieName = session_name();
	}

	static protected function _startSession() {
		self::init();
		self::_configureSession();
		session_write_close();

		if (headers_sent()) {
			if (empty($_SESSION)) {
				$_SESSION = array();
			}
		} else {
			// For IE<=8
			session_cache_limiter("must-revalidate");
			session_start();
		}
		return true;
	}

	static protected function _checkValid(){
		$config = self::read('Config');
		if($config){
			if(self::valid()){
				self::write('Config.time', self::$sessionTime);
				$check = $config['countdown'];
				$check -= 1;
				self::write('Config.countdown', $check);
				if($check < 1){
					self::renew();
					self::write('Config.countdown', self::$requestCountdown);
				}
			}else{
				$_SESSION = array();
				self::destroy();
				self::_startSession();
				self::_writeConfig();
			}
		}else{
			self::_writeConfig();
		}
	}

	protected static function _writeConfig(){
		self::write('Config.userAgent', self::$_userAgent);
		self::write('Config.time', self::$sessionTime);
		self::write('Config.countdown', self::$requestCountdown);
	}

	static protected function _configureSession(){
		$config = self::$config;
		if (!isset($config['ini']['session.cookie_secure']) && (isset($_SERVER['HTTPS']) && strtolower($_SERVER['HTTPS']) === 'on')) {
			$config['ini']['session.cookie_secure'] = 1;
		}
		if (!isset($config['ini']['session.cookie_lifetime'])) {
			$config['ini']['session.cookie_lifetime'] = $config['timeout'];
		}
		if (!isset($config['ini']['session.name'])) {
			$config['ini']['session.name'] = $config['cookie'];
		}
		self::$_cookieName = $config['ini']['session.name'];

		if (!isset($config['ini']['session.cookie_path'])) {
			$config['ini']['session.cookie_path'] = self::$path;
		}
		self::$path = $config['ini']['session.cookie_path'];

		if (!isset($config['ini']['session.gc_maxlifetime'])) {
			$config['ini']['session.gc_maxlifetime'] = $config['timeout'] * 60;
		}
		if (!isset($config['ini']['session.cookie_httponly'])) {
			$config['ini']['session.cookie_httponly'] = 1;
		}

		if (empty($_SESSION)) {
			if (!empty($config['ini']) && is_array($config['ini'])) {
				foreach ($config['ini'] as $setting => $value) {
					if (ini_set($setting, $value) === false) {
						throw new Exception(__d('Unable to configure the session, setting %s failed.', $setting));
					}
				}
			}
		}
		self::$config = $config;
		self::$sessionTime = self::$time + $config['timeout'];
	}
}

