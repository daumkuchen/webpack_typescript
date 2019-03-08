<?php
define('META_SEPARATOR',' │ ');
define('DEFAULT_TITLE','');
define('DEFAULT_DESCRIPTION','');
define('DEFAULT_KEYWORDS','');

App::config('site',array(
    'name' => 'Sofirah',
    'data' => array(
        'name' => '',
        'company_name' => '',
        'zip_code' => '〒',
        'address' => array(
            '',
        ),
        'mail' => '',
        'tel' => '',
        //'fax' => '',
        'url' => 'https://',
        'map_url' => 'https://',
        'copy' => '&copy; ',
        'form' => array(
            '', ''
        ),
    ),
    'map' => array(
        '/' => array(
            'name' => '',
            'title' => DEFAULT_TITLE,
            'description' => DEFAULT_DESCRIPTION,
            'keyword' => DEFAULT_KEYWORDS,
        ),
        '/contact/' => array(
            'name' => '',
            'title' => 'お問い合わせ'.META_SEPARATOR.'',
            'description' => DEFAULT_DESCRIPTION,
            'keyword' => DEFAULT_KEYWORDS,
        )
    ),
));

?>
