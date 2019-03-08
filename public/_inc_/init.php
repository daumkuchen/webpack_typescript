<?php
//define('DEBUG', true);
define('DEBUG', false);
//define('DEBUG_VALIDATE', true);
define('DEBUG_VALIDATE', false);

set_time_limit(-1);

date_default_timezone_set('Asia/Tokyo');

define('ROOT_URL',(empty($_SERVER["HTTPS"]) ? "http://" : "https://") . $_SERVER["HTTP_HOST"]);
define('ROOT', dirname(dirname(__FILE__)));
define('DS', DIRECTORY_SEPARATOR);
define('INC_DIR', ROOT.DS.'_inc_');
define('LIB_DIR', INC_DIR.DS.'libs');
define('CTR_DIR', INC_DIR.DS.'controllers');
define('VIEW_DIR', INC_DIR.DS.'views');
define('PAGE_DIR', VIEW_DIR.DS.'pages');
define('LOG_DIR', INC_DIR.DS.'logs');

require_once INC_DIR.DS.'App.php';
App::boot();
?>