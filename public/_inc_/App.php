<?php

require_once 'functions.php';

class App {
    static protected $config = array();
    static protected $sourceCache = array();

    static public function boot(){
        $CONFIG_DIR = INC_DIR.DS.'config';

        // load config
        foreach (scandir($CONFIG_DIR) as $config) {
            if($config === '.' || $config === '..') continue;
            $file = $CONFIG_DIR.DS.$config;
            if(file_exists($file)){
                require_once $file;
            }
        }

        require_once CTR_DIR.DS.'BaseViewController.php';
    }

    static public function uses($name, $package = null ){

        if(is_null($package)){
            $path = $name.'.php';
        }else{
            $path = $package.DS.$name.'.php';
        }

        if(isset(self::$sourceCache) && array_key_exists($path, self::$sourceCache)) return true;

        if(file_exists(LIB_DIR.DS.$path)){
            require_once LIB_DIR.DS.$path;
            if(!isset(self::$sourceCache)){
                self::$sourceCache = array();
            }
            self::$sourceCache[] = $path;
            return true;
        }
        return false;
    }

    static public function config($key = null, $value = null){
        App::uses('Hash', 'utils');
        if(is_null($key)){
            return self::$config;
        }elseif(is_null($value)){
            return Hash::get(self::$config, $key);
        }else{
            self::$config = Hash::insert(self::$config, $key, $value);
        }
    }

}


/**
 * View
 */
class View {

    public $Blocks;

    public $viewPath = '';
    public $viewVar;
    public $layout = false;

    protected $parents = array();
    protected $stack = array();
    protected $current;

    public $hasRendered = false;


    public function __construct($view_path, $view_vars = array()){
        $this->viewPath = $view_path;
        $this->viewVars = $view_vars;
        $this->Blocks = new ViewBlock();
    }


    public function render($view = null, $layout = null){
        if ($this->hasRendered) {
            return;
        }
        if($view !== null){
            $this->Blocks->set('content', $this->_render($view));
        }

        if ($layout === null) {
            $layout = $this->layout;
        }
        if ($layout) {
            $this->Blocks->set('content', $this->renderLayout('', $layout));
        }

        $this->hasRendered = true;
        return $this->Blocks->get('content');
    }


    protected function renderLayout($content, $layout = null){
        if(is_null($layout) || $layout === false){
            return $this->Blocks->get('content');
        }

        $this->Blocks->set('content', $this->_render($layout));
        return $this->Blocks->get('content');
    }


    protected function _render($viewFile, $data = array()) {
        if (empty($data)) {
            $data = $this->viewVars;
        }
        $viewFile = $this->getViewFile($viewFile);
        $this->current = $viewFile;
        $initialBlocks = count($this->Blocks->unclosed());

        $content = $this->_evaluate($viewFile, $data);

        if (isset($this->parents[$viewFile])) {
            $this->stack[] = $this->fetch('content');
            $this->assign('content', $content);

            $content = $this->_render($this->parents[$viewFile]);
            $this->assign('content', array_pop($this->stack));
        }

        $remainingBlocks = count($this->Blocks->unclosed());

        if ($initialBlocks !== $remainingBlocks) {
            throw new AppErrorException(sprintf('The "%s" block was left open. Blocks are not allowed to cross files.', $this->Blocks->active()));
        }

        return $content;
    }


    protected function _evaluate($viewFile, $dataForView){
        extract($dataForView);
        ob_start();

        include $viewFile;

        return ob_get_clean();
    }


    public function element($name, $data = array()){

        $current = $this->current;
        $element = $this->_render($name, array_merge($this->viewVars, $data));

        $this->current = $current;

        return $element;
    }


    public function extend($name){
        $parent = $this->getViewFile($name);

        if ($parent == $this->current) {
            throw new AppErrorException('You cannot have views extend themselves.');
        }
        if (isset($this->parents[$parent]) && $this->parents[$parent] == $this->current) {
            throw new AppErrorException('You cannot have views extend in a loop.');
        }

        $this->parents[$this->current] = $name;

    }


    protected function getViewFile($name){
        $path = $this->viewPath.DS.ltrim($name,'/').'.php';
        if(file_exists($path)){
            return $path;
        }

        throw new MissingViewException(array($path));
    }




    public function getVars() {
        return array_keys($this->viewVars);
    }

    public function getVar($var) {
        return $this->get($var);
    }

    public function get($var, $default = null) {
        if (!isset($this->viewVars[$var])) {
            return $default;
        }
        return $this->viewVars[$var];
    }

    public function set($one, $two = null) {
        if (is_array($one)) {
            if (is_array($two)) {
                $data = array_combine($one, $two);
            } else {
                $data = $one;
            }
        } else {
            $data = array($one => $two);
        }

        $this->viewVars = $data + $this->viewVars;
    }


    public function blocks() {
        return $this->Blocks->keys();
    }

    public function start($name) {
        $this->Blocks->start($name);
    }

    public function startIfEmpty($name) {
        $this->Blocks->startIfEmpty($name);
    }

    public function append($name, $value = null) {
        $this->Blocks->concat($name, $value);
    }

    public function prepend($name, $value = null) {
        $this->Blocks->concat($name, $value, ViewBlock::PREPEND);
    }

    public function assign($name, $value) {
        $this->Blocks->set($name, $value);
    }

    public function fetch($name, $default = '') {
        return $this->Blocks->get($name, $default);
    }

    public function end() {
        $this->Blocks->end();
    }
}


/**
 * ViewBlock
 */
class ViewBlock {

    const APPEND = 'append';
    const PREPEND = 'prepend';

    protected $blocks = array();
    protected $active = array();

    protected $_discardActiveBufferOnEnd = false;

    public function start($name){
        if (in_array($name, $this->active)) {
            throw new AppErrorException(sprintf("A view block with the name '%s' is already/still open.", $name));
        }
        $this->active[] = $name;
        ob_start();
    }

    public function startIfEmpty($name) {
        if (empty($this->blocks[$name])) {
            return $this->start($name);
        }
        $this->_discardActiveBufferOnEnd = true;
        ob_start();
    }

    public function end(){
        if ($this->_discardActiveBufferOnEnd) {
            $this->_discardActiveBufferOnEnd = false;
            ob_end_clean();
            return;
        }
        if (!empty($this->active)) {
            $active = end($this->active);
            $content = ob_get_clean();
            if (!isset($this->blocks[$active])) {
                $this->blocks[$active] = '';
            }
            $this->blocks[$active] .= $content;
            array_pop($this->active);
        }
    }


    public function concat($name, $value = null, $mode = ViewBlock::APPEND) {
        if (isset($value)) {
            if (!isset($this->blocks[$name])) {
                $this->blocks[$name] = '';
            }
            if ($mode === ViewBlock::PREPEND) {
                $this->blocks[$name] = $value . $this->blocks[$name];
            } else {
                $this->blocks[$name] .= $value;
            }
        } else {
            $this->start($name);
        }
    }


    public function append($name, $value = null) {
        $this->concat($name, $value);
    }

    public function set($name, $value) {
        $this->blocks[$name] = (string)$value;
    }

    public function get($name, $default = '') {
        if (!isset($this->blocks[$name])) {
            return $default;
        }
        return $this->blocks[$name];
    }

    public function keys() {
        return array_keys($this->blocks);
    }

    public function active() {
        return end($this->active);
    }

    public function unclosed() {
        return $this->active;
    }

}