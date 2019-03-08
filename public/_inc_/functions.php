<?php
function debug( $obj, $label = '' )
{

    $label = "[Debug] : {$label}";
    $label .= ' in ';
    $traces = debug_backtrace();
    $count = 0;
    foreach ( $traces as $trace ) {
        if ( isset( $trace[ 'file' ], $trace[ 'line' ] ) && __FILE__ != $trace[ 'file' ] ) {
            $label .= $trace[ 'file' ] . ' (' . $trace[ 'line' ] . ')';
            if ( ++$count >= 5 ) {
                break;
            }
            else {
                $label .= '<br />';
            }
        }
    }

    echo '<div style="font:11px/1.2 Lucida Grande, Verdana, Geneva, Sans-serif; margin: 1em 0; padding: 0.5em; background:#e9e9e9; border:1px solid #D0D0D0;">';

    if ( strlen( $label ) ) {
        echo '<strong>' . $label . '</strong>';
    }

    echo '<pre style="display: block; background:#F4F4F4; border:1px solid #D0D0D0; color: #002166; margin:0.5em 0; padding:1em;">';

    if ( is_bool( $obj ) ) {
        echo (bool)$obj ? 'true' : 'false';
    }
    elseif ( is_array( $obj ) || is_object( $obj ) ) {
        print_r( $obj );
    }
    else {
        echo $obj;
    }

    echo '</pre>';
    echo '</div>';
}

function checkDir( $dir )
{
    if ( !file_exists( $dir ) || !is_dir( $dir ) ) {
        mkdir( $dir, 0777, true );
        chmod( $dir, 0777 );
    }
}

function checkDirEmpty( $dir )
{
    if ( file_exists( $dir ) || is_dir( $dir ) ) {
        return ( count( scandir( $dir ) ) == 2 );
    }
    return false;
}

function glob_recursive( $pattern, $flags = 0 )
{
    $files = glob( $pattern, $flags );

    foreach ( glob( dirname( $pattern ) . '/*', GLOB_ONLYDIR | GLOB_NOSORT ) as $dir ) {
        $files = array_merge( $files, glob_recursive( $dir . '/' . basename( $pattern ), $flags ) );
    }

    return $files;
}


function h( $value )
{
    if ( empty( $value ) || is_array( $value ) )
        return '';
    return htmlspecialchars( $value, ENT_QUOTES, 'UTF-8', true );
}

function camelize( $str )
{
    return str_replace( ' ', '', ucwords( str_replace( array( '_', '-' ), ' ', $str ) ) );
}


/**
 * @param $ID
 * @param string $size
 * @return array|false|string
 */
function get_image( $ID, $size = 'full' )
{
    $thumb_id = get_post_thumbnail_id( $ID );

    $image_url = wp_get_attachment_image_src( $thumb_id, $size );
    $image_url = $image_url[ 0 ];


    if ( !isset( $image_url ) ) {
        $image_url = '/assets/img/common/dummy.jpg';
    }

    return $image_url;
}

class UserAgent
{
    private $ua;
    private $device;

    public function set()
    {
        $this->ua = mb_strtolower( $_SERVER[ 'HTTP_USER_AGENT' ] );
        if ( strpos( $this->ua, 'iphone' ) !== false ) {
            $this->device = 'mobile';
        }
        elseif ( strpos( $this->ua, 'ipod' ) !== false ) {
            $this->device = 'mobile';
        }
        elseif ( ( strpos( $this->ua, 'android' ) !== false ) && ( strpos( $this->ua, 'mobile' ) !== false ) ) {
            $this->device = 'mobile';
        }
        elseif ( ( strpos( $this->ua, 'windows' ) !== false ) && ( strpos( $this->ua, 'phone' ) !== false ) ) {
            $this->device = 'mobile';
        }
        elseif ( ( strpos( $this->ua, 'firefox' ) !== false ) && ( strpos( $this->ua, 'mobile' ) !== false ) ) {
            $this->device = 'mobile';
        }
        elseif ( strpos( $this->ua, 'blackberry' ) !== false ) {
            $this->device = 'mobile';
        }
        elseif ( strpos( $this->ua, 'ipad' ) !== false ) {
            $this->device = 'tablet';
        }
        elseif ( ( strpos( $this->ua, 'windows' ) !== false ) && ( strpos( $this->ua, 'touch' ) !== false && ( strpos( $this->ua, 'tablet pc' ) == false ) ) ) {
            $this->device = 'tablet';
        }
        elseif ( ( strpos( $this->ua, 'android' ) !== false ) && ( strpos( $this->ua, 'mobile' ) === false ) ) {
            $this->device = 'tablet';
        }
        elseif ( ( strpos( $this->ua, 'firefox' ) !== false ) && ( strpos( $this->ua, 'tablet' ) !== false ) ) {
            $this->device = 'tablet';
        }
        elseif ( ( strpos( $this->ua, 'kindle' ) !== false ) || ( strpos( $this->ua, 'silk' ) !== false ) ) {
            $this->device = 'tablet';
        }
        elseif ( ( strpos( $this->ua, 'playbook' ) !== false ) ) {
            $this->device = 'tablet';
        }
        elseif ( ( strpos( $this->ua, 'firefox' ) !== false ) && ( strpos( $this->ua, 'mac' ) !== false ) ) {
            $this->device = 'mac_firefox';
        }
        elseif ( ( strpos( $this->ua, 'mac' ) !== false ) ) {
            $this->device = 'mac';
        }
        elseif ( ( strpos( $this->ua, 'firefox' ) !== false ) ) {
            $this->device = 'firefox';
        }
        elseif ( ( strpos( $this->ua, 'msie' ) !== false ) || ( strpos( $this->ua, 'trident/7' ) !== false ) ) {
            $this->device = 'ie';
        }
        elseif ( ( strpos( $this->ua, 'edge' ) !== false ) ) {
            $this->device = 'edge';
        }
        else {
            $this->device = 'others';
        }
        return $this->device;
    }

    static public function check()
    {
        return new UserAgent();
    }
}

define( 'UA', UserAgent::check()->set() );

class DummyPostObject
{
    var $ID = 1;
    var $post_author = 1;
    var $post_date = null;
    var $post_date_gmt = null;
    var $post_content = '';
    var $post_title = '';
    var $post_excerpt = '';
    var $post_status = 'publish';
    var $comment_status = 'open';
    var $ping_status = 'open';
    var $post_password = null;
    var $post_name = '';
    var $to_ping = null;
    var $pinged = null;
    var $post_modified = null;
    var $post_modified_gmt = null;
    var $post_content_filtered = null;
    var $post_parent = 0;
    var $guid = '';
    var $menu_order = 0;
    var $post_type = 'post';
    var $post_mime_type = null;
    var $comment_count = 1;
    var $filter = 'raw';

    public static function set_post( $dummy_posts )
    {
        $result = array();
        foreach ( $dummy_posts as $key => $dummy_post ) {

            $date = date( "Y-m-d H:i:s", strtotime( "+" . $key . " day" ) );

            $dummyPostObject = new DummyPostObject();
            $dummyPostObject->ID = $key + 1;
            $dummyPostObject->post_date = $date;
            $dummyPostObject->post_date_gmt = $date;
            $dummyPostObject->post_modified = $date;
            $dummyPostObject->post_modified_gmt = $date;

            foreach ( $dummy_post as $post_data_key => $value ) {

                switch ( $post_data_key ) {
                    case 'post_date':
                    case 'post_modified':
                    case 'post_date_gmt':
                    case 'post_modified_gmt':
                        $dummyPostObject->$post_data_key = date( "Y-m-d H:i:s", strtotime( "+" . $key . " day" ) );

                        break;
                    default:
                        $dummyPostObject->$post_data_key = $value;
                        break;
                }
            }
            array_push( $result, $dummyPostObject );
        }

        return $result;
    }
}

/**
 * wp 詳細ページの記事が何番目の記事なのかを確認する関数
 * @param $_posts
 * @param $_post
 * @return int|void
 */
function get_post_number( $_posts, $_post )
{
    //if ( !isSet( $posts ) || !isSet( $post ) ) {
    //    return;
    //}

    $_posts_length = count( $_posts );
    $_post_name = $_post->post_name;
    $_counter = 0;

    for ( ; $_counter < $_posts_length; $_counter++ ) {
        $post_name = $_posts[ $_counter ]->post_name;

        if ( $post_name == $_post_name ):
            break;
        endif;
    }




    return $_counter;
}

/**
 * wp ブログにページネーションを作成する関数
 * @param string $pages
 * @param int $range
 */
function responsive_pagination( $pages = '', $range = 4 )
{
    $showitems = ( $range * 2 ) + 1;

    global $paged;


    //ページ情報の取得
    if ( $pages == '' ) {
        global $paged;
        global $wp_query;

        if ( $pages == '' ) {
            global $paged;
            global $wp_query;
            $pages = $wp_query->max_num_pages;
            if ( !$pages ) {
                $pages = 1;
            }
        }

        $cat = $wp_query->query['category_name'];

        if ( isSet( $cat ) ) {
            $list = new WP_Query( "category_name=$cat&paged=$paged" );
            $pages = $list->max_num_pages;
        }

        if ( !$pages ) {
            $pages = 1;
        }
    }


    if ( empty( $paged ) ) {
        $paged = 1;
    }


    echo '<nav class="page-nav">';

    if ( $paged > 1 ) {
        //1つ戻るボタン
        echo '<a class="link-arrow js-hover" data-hover-in-time="500" data-hover-out-time="400" href="' . get_pagenum_link( $paged - 1 ) . '"><div class="prev arrow"></div></a>';
    }
    else {
        echo '<a class="link-arrow disable" href="' . get_pagenum_link( $paged - 1 ) . '"><div class="prev arrow"></div></a>';
    }

    echo '<ul class="page-nav-list c-fonts-bold">';

    //初めから6ページ目より上のページの場合先頭に戻るを表示
    if ( $paged > 5 &&  $pages - $showitems > 0 ) {
        //先頭戻るボタン
        echo '<li class="page-list"><a class="page-numbers numbers-children js-hover" data-hover-in-time="400" data-hover-out-time="400" data-hover-step="2" href="' . get_pagenum_link( 1 ) . '"><span class="bars"><span></span><span>' . ( 1 ) . '</span></span></a></li>';
        echo '<li class="page-list"><span class="page-numbers dots">...</span></li>';
    }

    if ( 1 == $pages ) {
        echo '<li class="page-list"><a class="page-numbers numbers-children current js-hover" data-hover-in-time="400" data-hover-out-time="400" data-hover-step="2" href="' . get_pagenum_link( 1 ) . '"><span class="bars"><span></span><span>' . ( 1 ) . '</span></span></a></li>';
    }

    for ( $i = 1; $i <= $pages; $i++ ) {
        if ( 1 != $pages && ( !( $i >= $paged + $range + 1 || $i <= $paged - $range - 1 ) || $pages <= $showitems ) ) :
            if($paged == $i) :
                echo '<li class="page-list"><a class="current page-numbers numbers-children">' . $i . '</a></li>';
            else:
                echo '<li class="page-list"><a class="page-numbers numbers-children js-hover" data-hover-in-time="400" data-hover-out-time="400" data-hover-step="2" href="' . get_pagenum_link( $i ) . '" >' . $i . '</a></li>';
            endif;
        endif;
    }

    //終わりから6ページ目より下のページの場合先頭に戻るを表示
    if ( $paged + 4 < $pages && $showitems < $pages ):
        //最後
        echo '<li class="page-list"><span class="page-numbers dots">...</span></li>';
        echo '<li class="page-list"><a class="page-numbers numbers-children js-hover" data-hover-in-time="400" data-hover-out-time="400" data-hover-step="2" href="' . get_pagenum_link( $pages ) . '"><span class="bars"><span></span><span>' . $pages . '</span></span></a></li>';
    endif;

    echo '</ul>';

    if ( $paged < $pages && 1 != $pages ): // 次のページと最後のページ
        //1つ進むボタン
        echo '<a class="link-arrow js-hover" data-hover-in-time="500" data-hover-out-time="400" href="' . get_pagenum_link( $paged + 1 ) . '"><div class="next arrow"></div></a>';
    else:
        //1つ進むボタン
        echo '<a class="link-arrow js-hover disable" href="' . get_pagenum_link( $paged + 1 ) . '"><div class="next arrow"></div></a>';
    endif;

    echo '</nav>';
    //}
}


/**
 * wp
 * @return array
 */
function get_custom_year()
{
    global $wpdb;

    $defaults = array( 'type' => 'yearly', 'limit' => '', 'format' => 'html', 'before' => '', 'after' => '', 'show_post_count' => false, 'echo' => 1, 'order' => 'DESC' );


    $order = strtoupper( $defaults[ 'order' ] );

    $sql_where = $wpdb->prepare( "WHERE post_type = %s AND post_status = 'publish'", 'post' );
    $where = apply_filters( 'getarchives_where', $sql_where, $defaults );
    $join = apply_filters( 'getarchives_join', '', $defaults );

    $output = array();

    $last_changed = wp_cache_get_last_changed( 'posts' );

    $limit = $defaults[ 'limit' ];

    $query = "SELECT YEAR(post_date) AS `year`, count(ID) as posts FROM $wpdb->posts $join $where GROUP BY YEAR(post_date) ORDER BY post_date $order $limit";
    $key = md5( $query );
    $key = "wp_get_archives:$key:$last_changed";
    if ( !$results = wp_cache_get( $key, 'posts' ) ) {
        $results = $wpdb->get_results( $query );
        wp_cache_set( $key, $results, 'posts' );
    }
    if ( $results ) {
        foreach ( (array)$results as $result ) {
            $text = sprintf( '%d', $result->year );
            array_push( $output, $text );
        }
    }

    return $output;
}


/**
 * wp
 * @param string $postType
 * @param string $_type
 * @return array|bool|mixed|null|object
 */
function customPostArchives( $postType = 'post', $_type = 'year' )
{
    global $wpdb;

    $postTypes = is_array( $postType ) ? $postType : array( $postType );
    $lastChanged = wp_cache_get( 'last_changed', 'posts' );
    if ( !$lastChanged ) {
        $lastChanged = microtime();
        wp_cache_set( 'last_changed', $lastChanged, 'posts' );
    }

    $postTypeConds = array();
    foreach ( $postTypes as $type ) {
        $postTypeConds[] = $wpdb->prepare( "post_type = %s", $type );
    }
    $postTypeCondition = '(' . implode( ' OR ', $postTypeConds ) . ')';

    if ( $_type == 'month' ) {
        $query = "SELECT YEAR(post_date) AS `year`, MONTH(post_date) AS `month`, count(ID) as posts FROM {$wpdb->posts} WHERE {$postTypeCondition} AND post_status = 'publish' GROUP BY YEAR(post_date), MONTH(post_date) ORDER BY post_date DESC";
    }
    else {
        $query = "SELECT YEAR(post_date) AS `year`, count(ID) as posts FROM {$wpdb->posts} WHERE {$postTypeCondition} AND post_status = 'publish' GROUP BY YEAR(post_date), YEAR(post_date) ORDER BY post_date DESC";
    }

    $key = md5( $query );
    $key = "customPostArchives:{$key}:{$lastChanged}";
    $results = $wpdb->get_results( $query );
    if ( !$results = wp_cache_get( $key, 'posts' ) ) {
        $results = $wpdb->get_results( $query );
        wp_cache_set( $key, $results, 'posts' );
    }

    return $results;
}


/**
 * 制限数を超える文字を"..."に置換する関数
 * @param $str
 * @param $start
 * @param $length
 * @param string $trimmarker
 * @param bool $encoding
 * @return string
 */
function mb_strimlen( $str, $start, $length, $trimmarker = '', $encoding = false )
{
    $encoding = $encoding ? $encoding : mb_internal_encoding();
    $str = mb_substr( $str, $start, mb_strlen( $str ), $encoding );
    if ( mb_strlen( $str, $encoding ) > $length ) {
        $markerlen = mb_strlen( $trimmarker, $encoding );
        $str = mb_substr( $str, 0, $length - $markerlen, $encoding ) . $trimmarker;
    }
    return $str;
}


/**
 * wp 挿入される画像の元データのwidth/heightの情報を返す関数
 * @param $image_url
 * @return array|null
 */
function get_image_width_and_height( $image_url )
{
    $res = null;
    //wp-contentディレクトリのパス：/var/www/html/example/wp-content
    $wp_content_dir = WP_CONTENT_DIR;
    //wp-contentディレクトリのURL：http://www.example.com/wp-content
    $wp_content_url = content_url();
    //URLをローカルパスに置換
    $image_file = str_replace( $wp_content_url, $wp_content_dir, $image_url );
    //画像サイズを取得
    $imagesize = getimagesize( $image_file );
    if ( $imagesize ) {
        $res = array();
        $res[ 'width' ] = $imagesize[ 0 ];
        $res[ 'height' ] = $imagesize[ 1 ];
        return $res;
    }
}


//add 2017 0916 bq yoshimura
//詳細ページ 何番目の記事かチェック
//function get_post_number( $post_type = 'post', $op = '<=' ){
//    global $wpdb, $post;
//    $post_type = is_array( $post_type ) ? implode( "','", $post_type ) : $post_type;
//    $number = $wpdb->get_var( "
//        SELECT COUNT( * )
//        FROM $wpdb->posts
//        WHERE post_date {$op} '{$post->post_date}'
//        AND post_status = 'publish'
//        AND post_type = ('{$post_type}')
//    " );
//    return $number;
//}

; ?>