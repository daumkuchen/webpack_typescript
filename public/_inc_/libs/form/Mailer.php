<?php

class Mailer {

	public $from = '';
	public $fromName = null;
	public $to = null;
	public $replyto = null;
	public $replytoName = null;
	public $subject = '';
	public $message = '';
	public $headers = array();
	public $type = 'plain';
	public $charset = 'UTF-8';
	public $headerCharset = 'UTF-8';
	//public $headerCharset = 'ISO-2022-JP';

	public function __construct(){
	}

	public function send(){
		if(!$this->message || !$this->to){
			return false;
		}

		$subject = $this->_convert_mime_encode($this->subject);

		$message = $this->_encode(str_replace(array("\r\n","\r"), "\n", $this->message."\n"));

		$header = $this->headers;
		if(!is_null($this->from)){
			if(!is_null($this->fromName)){
				$header[] = 'From: ' . $this->_convert_mime_encode($this->fromName) .' <'.$this->from.'>';
			}else{
				$header[] = 'From: ' . $this->from;
			}
		}
		if(!is_null($this->replyto)){
			if(!is_null($this->replytoName)){
				$header[] = 'Reply-To: ' . $this->_convert_mime_encode($this->replytoName) . ' <'.$this->replyto.'>';
			}else{
				$header[] = 'Reply-To: ' . $this->replyto;
			}
		}

		//$header[] = 'X-Mailer: PHP/'.phpversion();
		$header[] = 'Content-Type: text/' . $this->type . '; charset="'.$this->headerCharset.'"';
		$header[] = 'Content-Transfer-Encoding: '.(in_array(strtoupper($this->headerCharset), array('UTF-8','SHIFT_JIS'))? '8bit' : '7bit');

		$to = str_replace(array("\r", "\n"), '', $this->to);
		$subject = str_replace(array("\r", "\n"), '', $subject);
		foreach ($header as $key => $value) {
			$header[$key] = str_replace(array("\r", "\n"), '', $value);
		}

		return mail($to, $subject, $message, implode("\r\n", $header)."\r\n");

	}

	private function _encode($str){
		return mb_convert_encoding($str, $this->headerCharset, $this->charset);
	}

	private function _convert_mime_encode($str, $LFC = "\r\n"){
		$internalEncoding = function_exists('mb_internal_encoding');
		
		// for prefix
		mb_language("ja");
		
		if ($internalEncoding) {
			$restore = mb_internal_encoding();
			mb_internal_encoding($this->charset);
		}
		$return = mb_encode_mimeheader($str, $this->headerCharset, 'B', $LFC);
		if ($internalEncoding) {
			mb_internal_encoding($restore);
		}
		return $return;
	}
}
