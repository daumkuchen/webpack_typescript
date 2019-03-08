<?php
require_once LIB_DIR.DS.'utils'.DS.'Hash.php';
require_once LIB_DIR.DS.'form'.DS.'Validator.php';
require_once LIB_DIR.DS.'form'.DS.'Sanitizer.php';
require_once LIB_DIR.DS.'http'.DS.'Request.php';
require_once LIB_DIR.DS.'http'.DS.'Session.php';

/**
* Form
*/
class Form {

	static public $tokenTimeout = 10800;//3*60*60;
	static protected $forms = array();


	static public function build($name, $setting = array()){
		if(is_array($name)){
			foreach ($name as $key => $setting) {
				self::build($key, $setting);
			}
			return;
		}

		if(isset(self::$forms[$name])){
			return self::$forms[$name];
		}

		$form = new Form($name, $setting);
		$form->_token = self::generateCsrfToken($name);
		self::$forms[$name] = $form;
		return $form;
	}

	static public function get($name){
		if(isset(self::$forms[$name])){
			return self::$forms[$name];
		}
		return null;
	}


	static protected function checkCsrfToken($token, $onetime = true){
		$tokens = Session::read('Form.tokens');
		if($tokens){
			$timeout = time() - self::$tokenTimeout;
			if(isset($tokens[$token])){
				$result = $tokens[$token] > $timeout;
				if($onetime || !$result){
					unset($tokens[$token]);
					Session::write('Form.tokens', $tokens);
				}
				return $result;
			}
		}
		return false;
	}

	static protected function generateCsrfToken($name){
		$tokens = Session::read('Form.tokens');
		if(!$tokens) $tokens = array();
		// check token expire
		$timeout = time() - self::$tokenTimeout;
		foreach ($tokens as $token => $time) {
			if($time < $timeout){
				unset($tokens[$token]);
			}
		}

		$token = md5($name . Session::id() . microtime());
		$tokens[$token] = time();

		Session::write('Form.tokens', $tokens);
		return $token;
	}


	public $name;
	public $settings;
	protected $useUpload = false;

	protected $formError = array();
	protected $files = array();
	public $data = array();

	protected $_token;
	protected $setuped = false;
	protected $processed = false;

	public function __construct($name, $settings){
		$this->name = $name;
		$this->settings = $settings;
		$this->setup();
	}


	protected function hook($type){
		if(isset($this->settings['hooks'][$type])){
			call_user_func_array($this->settings['hooks'][$type], array($this));
		}
	}

	protected function setup(){
		if($this->setuped) return;
		$this->setuped = true;

		if(isset($this->settings['config']['file']) && $this->settings['config']['file'] !== false){
			$this->useUpload = true;
			$default = array(
				'tmp' => TMP_DIR.DS.'uploads',
				'expire' => '10 days ago'
			);
			if($this->settings['config']['file'] === true){
				$this->settings['config']['file'] = $default;
			}elseif(is_array($this->settings['config']['file'])){
				$this->settings['config']['file'] = array_merge($default, $this->settings['config']['file']);
			}


			// cleanup old upload files
			$file_tmp_dir = $this->settings['config']['file']['tmp'];
			$this->checkDir($file_tmp_dir);
			$limit = strtotime($this->settings['config']['file']['expire']);
			if($dh = opendir($file_tmp_dir)){
				while( false !== ($file = readdir($dh))){
					if($file == '.' ||  $file == '..' || $file == '.htaccess') continue;
					if(is_file($file_tmp_dir.DS.$file) && filemtime($file_tmp_dir.DS.$file) < $limit){
						unlink($file_tmp_dir.DS.$file);
					}
				}
				closedir($dh);
				clearstatcache();
			}
		}
		$this->process();
	}

	protected function process(){
		if($this->processed) return;
		$this->processed = true;

		if(Request::isPost()){
			if(null !== ($post = Request::getPost($this->name)) ){
				$this->hook('beforeProcess');
				if(!self::checkCsrfToken($post['token'], isset($this->settings['csrf'])? $this->settings['csrf'] : true)){
					header('Location: '.Request::getRequestURI());
					exit;
					return;
				}
				unset($post['token']);
				$post = Sanitizer::sanitize($post);

				if($this->useUpload && !empty($_FILES) && isset($_FILES[$this->name])){
					foreach ($_FILES[$this->name] as $prop => $values){
						foreach ($values as $key => $val) {
							$this->files[$key][$prop] = $val;
						}
					}
					$post = $this->processUploadFiles($post);
				}
				$this->data = $post;

                $this->hook('beforeValidate');

				if($this->validate()){
					$this->hook('success');
				}else{
					$this->hook('faild');
				}
			}
		}else{
			$this->hook('init');
		}
	}

	protected function checkDir($dir=''){
		if(!file_exists($dir) || !is_dir($dir)){
			mkdir($dir, 0777, true);
			chmod($dir, 0777);
		}
	}

	protected function basename($file){
		if(false !== ($str = mb_strrchr($file, "/"))){
			return mb_substr($str, 1);
		}
		return $file;
	}


	protected function processUploadFiles($post){
		$file_tmp_dir = $this->settings['config']['file']['tmp'];
		$this->checkDir($file_tmp_dir);

		foreach ($this->elements() as $name => $option) {
			if($option['type'] !== 'file') continue;

			if(isset($this->files[$name])){
				unset($post[$name]);
				if($this->files[$name]['error'] === UPLOAD_ERR_NO_FILE) continue;

				if($this->files[$name]['error'] !== UPLOAD_ERR_OK){
					switch ($this->files[$name]['error']) {
						case UPLOAD_ERR_INI_SIZE :
						case UPLOAD_ERR_FORM_SIZE :
							$error = 'アップロードされたファイルが大きすぎます。';
							break;
						case UPLOAD_ERR_PARTIAL :
							$error = 'アップロードに失敗しました。';
							break;
						case UPLOAD_ERR_NO_TMP_DIR :
						case UPLOAD_ERR_CANT_WRITE :
						case UPLOAD_ERR_EXTENSION :
						default:
							$error = 'システムエラーが発生しました。';
							break;
					}

					$this->formError[$name] = $error;
				}else{

					$filename = $this->basename($this->files[$name]['name']);
					$file_id = md5(date('Ymdhis').$name.$filename);

					if(move_uploaded_file($this->files[$name]['tmp_name'], $file_tmp_dir.DS.$file_id)){
						$post[$name] = array(
							'id' => $file_id,
							'name' => $filename,
							'path' => $file_tmp_dir.DS.$file_id,
						);
					}else{
						$this->formError[$name] = 'システムエラーが発生しました。';
					}
				}
			}
		}

		return $post;
	}

	protected function validate(){
        if(DEBUG_VALIDATE){
            return true;
        }
		foreach ($this->elements() as $name => $option) {
			if(empty($option['validate'])){
				continue;
			}
			$validate_rule = $option['validate'];
			$value = isset($this->data[$name])? $this->data[$name] : null;
			if(is_array($value) && ($option['type'] == 'tel' || $option['type'] == 'zip' || $option['type'] == 'date') ){
				$value = implode('-', $value);
				if($value == '--' || $value == '-'){
					$value = null;
				}
			}

			$isValid = true;
			foreach($validate_rule as $rule => $args){
				switch ($rule) {
					case 'required':
						if(Validator::isEmpty($value)){
							$isValid = false;
							$this->formError[$name] = $args;
						}
						break;
					case 'between':
						if(!Validator::between($value, $args[0], $args[1])){
							$isValid = false;
							$this->formError[$name] = sprintf($args[2],$args[0], $args[1]);
						}
						break;
					case 'minLength':
						if(!Validator::minLength($value, $args[0])){
							$isValid = false;
							$this->formError[$name] = sprintf($args[1],$args[0]);
						}
						break;
					case 'maxLength':
						if(!Validator::maxLength($value, $args[0])){
							$isValid = false;
							$this->formError[$name] = sprintf($args[1],$args[0]);
						}
						break;
					case 'in_data_array':
						if(!array_key_exists($value, $this->settings['data'][$name])){
							$isValid = false;
							$this->formError[$name] = $args;
						}
						break;
					case 'mail':
						if(!Validator::pattern($value, Validator::PAT_EMAIL)){
							$isValid = false;
							$this->formError[$name] = $args;
						}
						break;
					case 'tel':
						if(!Validator::pattern($value, Validator::PAT_PHONENUMBER)){
							$isValid = false;
							$this->formError[$name] = $args;
						}
						break;
					case 'zip':
						if(!Validator::pattern($value, Validator::PAT_ZIPCODE)){
							$isValid = false;
							$this->formError[$name] = $args;
						}
						break;
					case 'date':
						if(!Validator::pattern($value, '/^\d{4}-\d{2}-\d{2}/')){
							$isValid = false;
							$this->formError[$name] = $args;
						}
						break;
					case 'equalto':
						$relate = isset($this->data[$args[0]])? $this->data[$args[0]] : null;
						if($relate !== $value){
							$isValid = false;
							$this->formError[$name] = $args[1];
						}
						break;
					case 'custom':
						if(!Validator::pattern($value, $args[0])){
							$isValid = false;
							$this->formError[$name] = $args[1];
						}
						break;
				}

				if(!$isValid) break;
			}
		}
		return count($this->formError) === 0;
	}







	public function create($options = array()){
		if(!isset($options['action'])){
			$options['action'] = Request::getRequestURI();
		}
		if(!isset($options['type'])){
			$options['method'] = 'post';
		}
		if($this->useUpload && !isset($options['enctype'])){
			$options['enctype'] = 'multipart/form-data';
		}

		$attrs = $this->formatAttr($options);
		$hidden = $this->tag('input',array(
			'type' => 'hidden',
			'name' => $this->name('token'),
			'id' => $this->id('token'),
			'value' => $this->_token
		));
		return "<form{$attrs}>".$hidden;
	}

	public function elements(){
		return $this->settings['inputs'];
	}

	public function input($name, $options = null){
		$options = $this->extendOptions($name, $options);

		$out = '';

		$default = null;
		if(isset($options['options']['default'])){
			$default = $options['options']['default'];
			unset($options['options']['default']);
		}
		$value = $this->value($name, $default);
		$error = $this->error($name);

		$options['options']['id'] = isset($options['options']['id'])? $options['options']['id'] : $this->id($name);
		$options['options']['name'] = $this->name($name);
		$options['options']['data-validate'] = $this->createValidate(isset($options['validate'])? $options['validate'] : array());

		switch ($options['type']) {
			case 'select':

				$out = $this->select($name, $value, $options['options']);
				break;

			case 'checkbox':
				$options['options']['name'] = $options['options']['name'].'[]';
			case 'radio':
				$inputs = array();
				foreach ($this->settings['data'][$name] as $key => $val) {
					$attrs = $options['options'];
					$attrs['type'] = $options['type'];
					$attrs['value'] = $key;
					$attrs['id'] = $attrs['id'].$key;
					if(
						($options['type'] == 'radio' && $key == $value) ||
						($options['type'] == 'checkbox' && is_array($value) && in_array($key, $value))
					){
						$attrs['checked'] = 'checked';
					}
					$inputs[$key] = $this->tag('label',array('class' => $options['type'].'-inline'), $this->tag('input',$attrs) . $val);
				}
				if(isset($options['group'])){
					$groups = $options['group'];
					$out = '';
					foreach ($groups as $key => $group) {
						$tmp = array();
						foreach ($group['items'] as $id) {
							if(isset($inputs[$id])){
								$tmp[] = $inputs[$id];
								unset($inputs[$id]);
							}
						}
						if(!empty($tmp)){
							$out .= $this->tag('dl', array('class' => $options['type'].'-group'),
										$this->tag('dt',array(), $group['name']).
										$this->tag('dd',array(), implode('', $tmp))
									);
						}
					}
					if(!empty($inputs)){
						$out .= $this->tag('dl', array('class' => $options['type'].'-group'),
							$this->tag('dd',array(), implode('', $inputs))
						);
					}

				}else{
					$out = implode('',array_values($inputs));
				}

				$out = $this->tag('div',array('class' => $options['type']), $out);
				break;

			//case 'tel':
			//	if(!isset($options['options']['class'])){
			//		$options['options']['class'] = 'form-control text-input tel-input';
			//	}else{
			//		$options['options']['class'] .= 'form-control text-input tel-input';
			//	}
			//	$options['options']['type'] = 'text';
			//	$field_name = $options['options']['name'];
			//	$id = $options['options']['id'];
			//	$placeholder = isset($options['options']['placeholder']) ? explode('-', $options['options']['placeholder']) : null;
            //
			//	$options['options']['name'] = $field_name.'[0]';
			//	$options['options']['value'] = is_array($value)? $value[0] : '';
			//	if(is_array($placeholder)){
			//		$options['options']['placeholder'] = $placeholder[0];
			//	}
			//	$out .= $this->tag('input',$options['options']);
			//	$out .= ' - ';
            //
			//	$options['options']['name'] = $field_name.'[1]';
			//	$options['options']['id'] = $id.'1';
			//	$options['options']['value'] = is_array($value)? $value[1] : '';
			//	if(is_array($placeholder)){
			//		$options['options']['placeholder'] = $placeholder[1];
			//	}
			//	$out .= $this->tag('input',$options['options']);
			//	$out .= ' - ';
            //
			//	$options['options']['name'] = $field_name.'[2]';
			//	$options['options']['id'] = $id.'2';
			//	$options['options']['value'] = is_array($value)? $value[2] : '';
			//	if(is_array($placeholder)){
			//		$options['options']['placeholder'] = $placeholder[2];
			//	}
			//	$out .= $this->tag('input',$options['options']);
            //
			//	break;
			case 'zip':
				if(!isset($options['options']['class'])){
					$options['options']['class'] = 'form-control text-input zip-input';
				}else{
					$options['options']['class'] .= ' form-control text-input zip-input';
				}
				$options['options']['type'] = 'text';
				$field_name = $options['options']['name'];
				$id = $options['options']['id'];
				$placeholder = isset($options['options']['placeholder']) ? explode('-', $options['options']['placeholder']) : null;

				$options['options']['name'] = $field_name.'[0]';
				$options['options']['value'] = is_array($value)? $value[0] : '';
				if(is_array($placeholder)){
					$options['options']['placeholder'] = $placeholder[0];
				}
				$out .= $this->tag('input',$options['options']);
				$out .= ' - ';

				$options['options']['name'] = $field_name.'[1]';
				$options['options']['id'] = $id.'1';
				$options['options']['value'] = is_array($value)? $value[1] : '';
				if(is_array($placeholder)){
					$options['options']['placeholder'] = $placeholder[1];
				}
				$out .= $this->tag('input',$options['options']);
				break;

			case 'date':
				if(!isset($options['options']['class'])){
					$options['options']['class'] = 'date-select';
				}else{
					$options['options']['class'] .= ' date-select';
				}
				$from = isset($options['options']['start_date'])? strtotime($options['options']['start_date']) : strtotime('-1 year -1 day');
				$end = isset($options['options']['end_date'])? strtotime($options['options']['end_date']) : strtotime('+2 years');

				unset($options['options']['start_date']);
				unset($options['options']['end_date']);

				if(!is_null($value) && is_array($value) && preg_match('/^\d{4}-\d{2}-\d{2}$/', implode('-', $value))){
					list($y, $m, $d) = $value;
				}else{
					$y = $m = $d = null;
				}

				$years = array();
				while ($from < $end) {
					$years[] = date('Y', $from);
					$from = strtotime('+1 year', $from);
				}
				$years = array_reverse($years);
				$this->settings['data'][$name.'[0]'] = array_combine($years, $years);

				$month = array();
				for ($i=1; $i < 13; $i++) {
					$month[] = sprintf('%02d', $i);
				}
				$this->settings['data'][$name.'[1]'] = array_combine($month, $month);

				$days = array();
				for ($i=1; $i < 31; $i++) {
					$days[] = sprintf('%02d', $i);
				}
				$this->settings['data'][$name.'[2]'] = array_combine($days, $days);

				$field_name = $options['options']['name'];
				$id = $options['options']['id'];

				$opt = $options['options'];
				$opt['name'] = $field_name.'[0]';
				$opt['id'] = $id.'-year';
				$opt['class'] .= ' date-select-year';
				$out = $this->select($name.'[0]', $y, $opt);

				$opt = $options['options'];
				$opt['name'] = $field_name.'[1]';
				$opt['id'] = $id.'-month';
				$opt['class'] .= ' date-select-month';
				$out .= $this->select($name.'[1]', $m, $opt);

				$opt = $options['options'];
				$opt['name'] = $field_name.'[2]';
				$opt['id'] = $id.'-day';
				$opt['class'] .= ' date-select-day';
				$out .= $this->select($name.'[2]', $d, $opt);
				break;


			case 'password':
				unset($options['value']);
            case 'tel':
			case 'email':
			case 'text':
				if(!isset($options['options']['class'])){
					$options['options']['class'] = 'form-control text-input';
				}else{
					$options['options']['class'] .= ' form-control text-input';
				}
				$options['options']['type'] = $options['type'];
				$options['options']['value'] = $value;

				$out = $this->tag('input',$options['options']);
				break;
			case 'textarea':
				if(!isset($options['options']['class'])){
					$options['options']['class'] = 'form-control text-input';
				}else{
					$options['options']['class'] .= ' form-control text-input';
				}
				$out = $this->tag('textarea',$options['options'],$value);
				break;

			case 'file':
				$options['options']['type'] = $options['type'];
				$out = $this->tag('input',$options['options']);
				$out = $this->tag('div',array('class' => 'file-input'),$out);
				break;
			case 'hidden':
				$options['options']['type'] = $options['type'];
				unset($options['options']['data-validate']);
				if(!isset($options['options']['value'])){
					$options['options']['value'] = $value;
				}
				$out = $this->tag('input',$options['options']);
			default:
				break;
		}

		if(isset($options['help'])){
			$out .= $this->tag('small',array('class' => 'help-inline'), $options['help']);
		}

		if(!is_null($error)){
			$out .= $this->tag('span',array('class' => 'help-block error-msg'),$error);
		}
		return $out;
	}

	protected function select($name, $value, $options){
		if(!isset($options['class'])){
			$options['class'] = 'form-control';
		}else{
			$options['class'] .= ' form-control';
		}
		$opts = array();
		if(isset($options['empty'])){
			if($options['empty'] === false && is_null($value)){
				$value = current($this->settings['data'][$name]);
			}else{
				$opts[] = $this->tag('option',array('value' => ''),$options['empty']);
			}
			unset($options['empty']);
		}
		foreach ($this->settings['data'][$name] as $key => $val) {
			$attrs = array('value' => $key);
			if($key == $value){
				$attrs['selected'] = 'selected';
			}
			$opts[] = $this->tag('option', $attrs, $val);
		}
		return '<div class="select-wrap">'.$this->tag('select', $options, implode(PHP_EOL, $opts)).'</div>';
	}


	public function label($name, $options = array()){
		$options = $this->extendOptions($name,$options);

		if(!isset($options['label'])){
			$options['label'] = array('label' => ucfirst($name));
		}elseif(is_string($options['label'])){
			$options['label'] = array('label' => $options['label']);
		}elseif(is_bool($options['label'])){
			if($options['label']){
				$options['label'] = array('label' => ucfirst($name));
			}else{
				return;
			}
		}

		$label_options = $options['label'];
		$label = $label_options['label'];
		unset($label_options['label']);
		$label_options['for'] = isset($options['options']['id'])? $options['options']['id'] : $this->id($name);
		if(!isset($label_options['class'])){
			$label_options['class'] = 'control-label';
		}else{
			$label_options['class'] .= ' control-label';
		}

		return $this->tag('label', $label_options, $label);
	}

	public function end(){
		return '</form>';
	}

	public function name($name){
		return "{$this->name}[{$name}]";
	}

	public function id($name){
		return "{$this->name}-{$name}";
	}

	public function value($name, $default = null){
		if(isset($this->data[$name])){
			if($this->settings['inputs'][$name]['type'] == 'file' && isset($this->data[$name]['name'])){
				return Sanitizer::htmlspecialchars($this->data[$name]['name']);
			}
			return $this->data[$name];
		}
		return $default;
	}

	public function valueDisplayed($name, $default = null){
		$value = $this->value($name);



		if(!is_null($value)){
			switch ($this->settings['inputs'][$name]['type']) {
				case 'select':
                    if(isset($this->settings['data'][$name]) && isset($this->settings['data'][$name][$value])){

                        return $this->settings['data'][$name][$value];
                    }
                    break;
				case 'radio':
                    if(isset($this->settings['data'][$name]) && isset($this->settings['data'][$name][$value])){

                        return $this->settings['data'][$name][$value];
                    }
                    break;
				case 'checkbox':
                    $result = '';
                    if(isset($this->settings['data'][$name])){
                        foreach ($value as $k => $v) {
                            if(isset($this->settings['data'][$name][$v])) {
                                if(count($value) - 1 == $k) {
                                    $result .= $this->settings['data'][$name][$v];
                                } else {
                                    $result .= $this->settings['data'][$name][$v]."\n";
                                }
                            }
                        }
                    }

                    return $result;

					break;
				case 'tel':
				case 'zip':
					if(is_array($value)){
						$value = implode('-', $value);
						if($value == '-' || $value == '--'){
							return $value;
						}
					}
                    break;
				case 'date':
					if(is_array($value)){
						return date('Y年 m月 d日', strtotime(implode('-', $value)));
					}
					break;
			}
			return $value;
		}
		return $default;
	}

	public function error($name = null){
		if(is_null($name)) return $this->formError;
		if(isset($this->formError[$name])){
			return $this->formError[$name];
		}
		return null;
	}

	public function invalid($name, $msg){
		$this->formError[$name] = $msg;
	}

	public function hasError($name){
		return isset($this->formError[$name]);
	}

	public function isRequired($name){
		if(isset($this->settings['inputs'][$name]) && isset($this->settings['inputs'][$name]['validate']['required'])){
			return true;
		}else{
			return false;
		}
	}

	public function tag($tag,$attrs,$inner = null){
		$attrs = $this->formatAttr($attrs);

		if(in_array($tag,array('input','img','hr'))){
			return "<{$tag}{$attrs}/>";
		}
		return "<{$tag}{$attrs}>{$inner}</{$tag}>";
	}

	protected function formatAttr($attrs){
		$attr = '';
		foreach ($attrs as $key => $value) {
			$attr .= " {$key}=\"{$value}\"";
		}
		return $attr;
	}

	protected function extendOptions($name,$options = null){
		if(is_null($options)){
			return $this->settings['inputs'][$name];
		}

		if(isset($this->settings['inputs'][$name])){
			$options = Hash::merge($this->settings['inputs'][$name], $options);
		}
		return $options;
	}

	protected function createValidate($rules){
		$ret = '';
		foreach ($rules as $rule => $args) {
			if(in_array($rule,array('in_data_array'))) continue;
			if($rule == 'tel'){
				$rule = 'nameric';
			}

			if(is_array($args)){
				if(count($args) == 3){
					$rule = "{$rule}[{$args[0]},{$args[1]}]";
				}elseif(count($args) == 2){
					if($rule == 'equalto'){
						$args[0] = $this->name($args[0]);
					}
					$rule = "{$rule}[{$args[0]}]";
				}
			}
			$ret .= " {$rule}";
		}
		return trim($ret);
	}
}

