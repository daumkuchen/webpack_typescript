<?php
require_once LIB_DIR.DS.'form'.DS.'Form.php';
require_once LIB_DIR.DS.'http'.DS.'Session.php';
/**
* FormController
*/
class FormController {

	public $name = 'form';
	protected $mode = 'input';

	protected $inputForm;
	protected $confirmForm;

	public function __construct(){
		$this->createForm();
	}

	public function getMode(){
		return $this->mode;
	}

	public function valid($form){
		$key = md5($this->name.'-key' . Session::id() . microtime());
		Session::write(camelize($this->name).'.'.$key, $form->data);
		$form->data['key'] = $key;

		$this->mode = 'confirm';
	}

	public function send($form){

		$key = $form->data['key'];
		$data = Session::read(camelize($this->name).'.'.$key);

		if($form->data['mode'] == 'send'){
			// send
			// send mail
			$this->inputForm->data = $data;
			$this->sendMail($this->inputForm);

			App::uses('Response', 'http');
			Response::redirect('./thanks.php');
		}else{
			//back
			$this->mode = 'input';
			$this->inputForm->data = $data;
		}

		Session::delete(camelize($this->name).'.'.$key);
	}

	public function error($form){
	}

	public function sendMail($form){
		App::uses('Mailer', 'form');

		$mailer = new Mailer();
		$from = App::config('site.data.form');
		$mailer->from = $from[0];
		$mailer->fromName = $from[1];

		// mail to user
		$view = new View(VIEW_DIR, array('form' => $form));
		$view->layout = 'email/user';
		$body = $view->render('email/user');
		$mailer->subject = $view->fetch('title');
		$mailer->message = $body;
		$mailer->to = $form->value('mail');
		$mailer->send();
		//debug($mailer);

		// mail to admin
		$view = new View(VIEW_DIR, array('form' => $form));
		$view->layout = 'email/admin';
		$body = $view->render('email/admin');
		$mailer->subject = $view->fetch('title');
		$mailer->message = $body;
		if(DEBUG){
			$mailer->to = $form->value('mail');
			$mailer->send();
			//debug($mailer);
		}else{
            $mailer->to = App::config('site.data.form')[0];
            $mailer->send();


		}

		// logging
		$this->writeMailLog($body);
	}

	protected function writeMailLog($message){
		$path = LOG_DIR.DS.$this->name.DS;
		checkDir($path);
		$cnt = 0;
		$file_name = date('YmdHis');
		if(file_exists($path.$file_name.sprintf('%03d',$cnt).'.txt')){
			while (true) {
				$cnt++;
				if(!file_exists($path.DS.$file_name.sprintf('%03d',$cnt).'.txt')) break;
			}
		}
		$file_name = $file_name.sprintf('%03d',$cnt).'.txt';
		file_put_contents($path.DS.$file_name, $message, FILE_APPEND | LOCK_EX);
	}


	protected function createForm(){
		$this->inputForm = $this->getInputForm();
		$this->confirmForm = $this->getConfirmForm();

		//debug($this->inputForm);

		if($this->mode == 'confirm'){
			if(empty($this->confirmForm->data)){
				$this->confirmForm->data = array();
			}
			$this->confirmForm->data['key'] = $this->inputForm->data['key'];
		}
	}

	public function getConfirmForm(){
		if($this->confirmForm) return $this->confirmForm;
		return Form::build($this->name.'-confirm', array(
			'csrf' => false,
			'file' => false,
			'hooks' => array(
				'success' => array($this, 'send'),
				'faild' => array($this, 'error'),
			),
			'inputs' => array(
				'key' => array(
					'label' => false,
					'type' => 'hidden',
					'options' => array(),
					'validate' => array(
						'required' => '必須項目です',
					),
				)
			)
		));
	}

	public function getInputForm(){
		if($this->inputForm) return $this->inputForm;
		return Form::build($this->name, $this->getInputFormSettings());
	}

	public function check($form){

        //$radio_data = $form->data['business_format'];
        //
        //if($radio_data == '0'){
        //    $form->settings['inputs']['company']['validate']['required'] = '入力してください';
        //}

    }

    protected function getInputFormSettings(){
        return array(
            'csrf' => false,
            'file' => false,
            'hooks' => array(
                'beforeValidate' => array($this, 'check'),
                'success' => array($this, 'valid'),
                'faild' => array($this, 'error'),
            ),
            'inputs' => array(
                'name' => array(
                    'label' => 'お名前<small class="caution">*</small>',
                    'type' => 'text',
                    'options' => array(
                        'autocomplete' => 'name'
                    ),
                    'validate' => array(
                        'required' => '入力してください',
                    ),
                ),
                'mail' => array(
                    'label' => 'メールアドレス<small class="caution">*</small>',
                    'type' => 'email',
                    'options' => array(
                        'autocomplete' => 'email'
                    ),
                    'validate' => array(
                        'required' => '入力してください',
                        'mail' => '形式が違います'
                    ),
                ),
                'address' => array(
                    'label' => 'ご住所',
                    'type' => 'text',
                    'options' => array(
                        //'placeholder' => 'ご住所'
                    ),
                    //'validate' => array(
                    //    'required' => '入力してください',
                    //),
                ),
                'tel' => array(
                    'label' => 'お電話番号<small class="caution">*</small>',
                    'type' => 'tel',
                    'options' => array(
                        'autocomplete'=>"tel"
                    ),
                    'validate' => array(
                        'required' => '入力してください',
                    ),
                ),
                'salon_name' => array(
                    'label' => 'サロン名',
                    'type' => 'text',
                    'options' => array(
                        'autocomplete' => 'name'
                    ),
                    //'validate' => array(
                    //    'required' => '入力してください',
                    //),
                ),
                'message' => array(
                    'label' => 'お問い合わせ内容<small class="caution">*</small>',
                    'type' => 'textarea',
                    'options' => array(
                        'rows' => 10,
                        //'placeholder' => 'お問い合わせ内容'
                    ),
                    'validate' => array(
                        'required' => '入力してください',
                    ),
                ),
            ),
            //'data' => array(
            //    'business_format' => array(
            //        0 => '法人',
            //        1 => '個人',
            //    ),
            //    'state' => array(
            //        1 => '北海道',
            //        2 => '青森県',
            //        3 => '岩手県',
            //        4 => '宮城県',
            //        5 => '秋田県',
            //        6 => '山形県',
            //        7 => '福島県',
            //        8 => '茨城県',
            //        9 => '栃木県',
            //        10 =>'群馬県' ,
            //        11 => '埼玉県',
            //        12 => '千葉県',
            //        13 => '東京都',
            //        14 => '神奈川県',
            //        15 => '新潟県',
            //        16 => '富山県',
            //        17 => '石川県',
            //        18 => '福井県',
            //        19 => '山梨県',
            //        20 => '長野県',
            //        21 => '岐阜県',
            //        22 => '静岡県',
            //        23 => '愛知県',
            //        24 => '三重県',
            //        25 => '滋賀県',
            //        26 => '京都府',
            //        27 => '大阪府',
            //        28 => '兵庫県',
            //        29 => '奈良県',
            //        30 => '和歌山県',
            //        31 => '鳥取県',
            //        32 => '島根県',
            //        33 => '岡山県',
            //        34 => '広島県',
            //        35 => '山口県',
            //        36 => '徳島県',
            //        37 => '香川県',
            //        38 => '愛媛県',
            //        39 => '高知県',
            //        40 => '福岡県',
            //        41 => '佐賀県',
            //        42 => '長崎県',
            //        43 => '熊本県',
            //        44 => '大分県',
            //        45 => '宮崎県',
            //        46 => '鹿児島県',
            //        47 => '沖縄県',
            //    ),
            //),
        );
    }
}