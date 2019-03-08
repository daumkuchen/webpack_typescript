<?php


/**
 * HttpException
 */
class HttpException extends RuntimeException { }

/**
 * BadRequestException
 * Represents an HTTP 400 error.
 */
class BadRequestException extends HttpException {

	public function __construct($message = null, $code = 400, Exception $previous = null) {
		if (empty($message)) {
			$message = 'Bad Request';
		}
		parent::__construct($message, $code, $previous);
	}
}

/**
 * UnauthorizedException
 * Represents an HTTP 401 error.
 */
class UnauthorizedException extends HttpException {

	public function __construct($message = null, $code = 401, Exception $previous = null) {
		if (empty($message)) {
			$message = 'Unauthorized';
		}
		parent::__construct($message, $code, $previous);
	}
}

/**
 * ForbiddenException
 * Represents an HTTP 403 error.
 */
class ForbiddenException extends HttpException {

	public function __construct($message = null, $code = 403, Exception $previous = null) {
		if (empty($message)) {
			$message = 'Forbidden';
		}
		parent::__construct($message, $code, $previous);
	}
}

/**
 * NotFoundException
 * Represents an HTTP 404 error.
 */
class NotFoundException extends HttpException {

	public function __construct($message = null, $code = 404, Exception $previous = null) {
		if (empty($message)) {
			$message = 'Not Found';
		}
		parent::__construct($message, $code, $previous);
	}
}

/**
 * MethodNotAllowedException
 * Represents an HTTP 405 error.
 */
class MethodNotAllowedException extends HttpException {

	public function __construct($message = null, $code = 405, Exception $previous = null) {
		if (empty($message)) {
			$message = 'Method Not Allowed';
		}
		parent::__construct($message, $code, $previous);
	}
}

/**
 * InternalErrorException
 * Represents an HTTP 500 error.
 */
class InternalErrorException extends HttpException {

	public function __construct($message = null, $code = 500, Exception $previous = null) {
		if (empty($message)) {
			$message = 'Internal Server Error';
		}
		parent::__construct($message, $code, $previous);
	}
}


/**
* AppException
*/
class AppException extends RuntimeException {
	protected $_messageTemplate = '';

	public function __construct($message, $code = 500, Exception $previous = null) {
		if (is_array($message)) {
			$message = vsprintf($this->_messageTemplate, $message);
		}
		parent::__construct($message, $code, $previous);
	}
}

/**
* MissingViewException
*/
class MissingViewException extends AppException {
	protected $_messageTemplate = 'View file "%s" is missing.';
}

/**
* AppErrorException
*/
class AppErrorException extends ErrorException { }