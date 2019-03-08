<?php
App::uses( 'Request', 'http' );
$current = Request::getRequestURI();
$map = App::config( 'site.map' );
$site_data = App::config( 'site.data' );

?>

<header class="l-header">
</header>
