<?php
App::uses( 'Request', 'http' );
$current = Request::getRequestURI();
$map = App::config( 'site.map' );
$site_data = App::config( 'site.data' );; ?>

<div id="top" class="page-content">
    <div id="stage"></div>
</div>