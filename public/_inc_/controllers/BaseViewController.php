<?php
class BaseViewController {
    static public function get_view($path,$dataForView = array()){
        extract($dataForView);
        ob_start();

        include $path.'.php';

        echo ob_get_clean();
    }

    static public function get_meta($data){
        BaseViewController::get_view(VIEW_DIR.DS.'modules/share/meta',$data);
    }

    static public function get_assets(){
        BaseViewController::get_view(VIEW_DIR.DS.'modules/share/assets');
    }

    static public function get_header(){
        BaseViewController::get_view(VIEW_DIR.DS.'modules/common/header');
    }

    static public function get_footer(){
        BaseViewController::get_view(VIEW_DIR.DS.'modules/common/footer');
    }

    static public function get_side_nav(){
        BaseViewController::get_view(VIEW_DIR.DS.'modules/common/side_nav');
    }

    static public function get_page($path,$data = array()){
        BaseViewController::get_view(PAGE_DIR.DS.$path, $data);
    }

    static public function get_analytics(){
        BaseViewController::get_view(VIEW_DIR.DS.'modules/common/analytics');
    }

    static public function render($content,$data = array()){
        BaseViewController::get_view(VIEW_DIR.DS.'layout',array(
            'content' => $content,
            'data' => $data
        ));
    }

    static public function get_attribute( $current ){
        $map = App::config('site.map');


        if ( isset($map[$current]) ) {
            $this_page = $map[$current];
            return array(
                'title' => $this_page['title'],
                'description' => $this_page['description'],
                'keyword' => $this_page['keyword'],
            );
        } else {
            return array(
                'title' => DEFAULT_TITLE,
                'description' => DEFAULT_DESCRIPTION,
                'keyword' => DEFAULT_KEYWORDS
            );
        }

    }

}