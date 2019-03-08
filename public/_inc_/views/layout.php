<?php
App::uses( 'Request', 'http' );
$current = Request::getRequestURI();
$this_page = BaseViewController::get_attribute( $current );; ?>

<!DOCTYPE html>
<html lang="ja">
	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=Edge">
		<meta http-equiv="imagetoolbar" content="no">
		<?php if ( UA == 'tablet' ): ?>
			<meta name="viewport" content="width=1024">
		<?php else: ?>
			<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0, shrink-to-fit=no, viewport-fit=cover">
		<?php endif; ?>
		<meta name="author" content="<?php echo ROOT_URL; ?>">
		<meta name="copyright" content="<?php echo App::config('site.name'); ?>">
		<meta name="description" content="<?php echo $this_page[ 'description' ]; ?>">
		<meta name="keywords" content="<?php echo $this_page[ 'keyword' ]; ?>"/>
		<meta name="format-detection" content="telephone=no">
		<title><?php echo $this_page[ 'title' ]; ?></title>
		<link rel="apple-touch-icon" sizes="180x180" href="/assets/img/favicons/apple-touch-icon.png">
		<link rel="icon" type="image/png" sizes="32x32" href="/assets/img/favicons/favicon-32x32.png">
		<link rel="icon" type="image/png" sizes="16x16" href="/assets/img/favicons/favicon-16x16.png">
		<link rel="manifest" href="/assets/img/favicons/site.webmanifest">
		<link rel="mask-icon" href="/assets/img/favicons/safari-pinned-tab.svg" color="#1a1a1a">
		<!-- <link rel="canonical" href=""> -->
		<meta name="msapplication-TileColor" content="#ffffff">
		<meta name="theme-color" content="#1a1a1a">
        <!-- fb info -->
		<meta property="og:title" content="<?php echo $this_page[ 'title' ]; ?>">
		<meta property="og:site_name" content="<?php echo $this_page[ 'title' ]; ?>">
		<meta property="og:description" content="<?php echo $this_page[ 'description' ]; ?>">
		<meta property="og:url" content="<?php echo ROOT_URL; ?>">
		<meta property="og:image" content="<?php echo ROOT_URL; ?>/assets/img/common/og.png">
		<meta property="og:locale" content="ja_JP">
		<meta property="og:type" content="website">
        <!-- /fb info -->
		<!-- twitter info -->
		<meta name="twitter:title" content="<?php echo $this_page[ 'title' ]; ?>">
		<meta name="twitter:description" content="<?php echo $this_page[ 'description' ]; ?>">
		<meta name="twitter:card" content="summary_large_image">
		<meta name="twitter:url" content="<?php echo ROOT_URL; ?>">
		<meta name="twitter:image" content="<?php echo ROOT_URL; ?>/assets/img/common/og.png">
        <!-- /twitter info -->
		<!-- User agent -->
		<script>UA = '<?php echo UA; ?>';</script>
        <!-- /User agent -->
        <script type="application/ld+json">
            {
				"@context": "http://schema.org",
				"@type": "Organization",
				"name":"<?php echo $this_page[ 'title' ]; ?>",
				"url": "<?php echo $current; ?>",
				"description":"<?php echo $this_page[ 'description' ]; ?>",
				"contactPoint": [{
					"@type": "ContactPoint",
					"name":"<?php echo App::config( 'site.name' ); ?>",
					"alternateName" : "<?php echo App::config( 'site.data.alt' ); ?>",
					"description":"<?php echo $this_page[ 'description' ]; ?>",
					"telephone": "<?php echo App::config( 'site.data.tel' ); ?>",
					"contactType": "customer service"
					"logo": "<?php echo ROOT_URL; ?>/assets/img/common/og.png"
				}]
            }
        </script>
		<script type='application/ld+json'>
            {
                "@context":"http://schema.org",
                "@type":"WebSite",
                "@id":"#website",
                "url":"<?php echo ROOT_URL; ?><?php echo $current; ?>",
                "name":"<?php echo $this_page[ 'title' ]; ?>"
            }
        </script>
		<link rel="stylesheet" href="/assets/css/bundle.css">
		<link rel="stylesheet" href="/assets/css/prefix.css">
		<?php BaseViewController::get_analytics(); ?>
	</head>
	<noscript>
		<div id="noscript_message">Your browser either doesn't support Javascript or you have it turned off. Please enable JavaScript to view this content.</div>
	</noscript>
	<body class="page-fixed">

		<div id="wrap">

			<!-- Header -->
			<?php BaseViewController::get_header(); ?>
			<!-- /Header -->

			<!-- Page -->
			<main>
				<?php BaseViewController::get_page( $content, $data ); ?>
			</main>
			<!-- /Page -->

			<!-- Footer -->
			<?php BaseViewController::get_footer(); ?>
			<!-- /Footer -->

		</div>

		<!-- Script -->
		<!-- <script>

			var loadingVar = {},
				loadingArray = [ '0' ];

			for ( var i = loadingArray.length - 1; i > 0; i-- ) {
				var r = Math.floor( Math.random() * (i + 1) );
				var tmp = loadingArray[ i ];
				loadingArray[ i ] = loadingArray[ r ];
				loadingArray[ r ] = tmp;
			}

			if(document.querySelector('.page-content').getAttribute('id') === 'top') {
				document.getElementById( 'loading' ).setAttribute( 'class', 'pattern-'+loadingArray[ 0 ] );
			} else {
				document.getElementById( 'loading' ).setAttribute( 'class', 'pattern-sub' );
			}

			window.sliderStartNum = Number(loadingArray[ 0 ]);

		</script> -->
		<script src="/assets/js/vendor.bundle.js"></script>
		<script src="/assets/js/stage.js"></script>
		<script src="/assets/js/main.bundle.js"></script>
		<!-- /Script -->

	</body>
</html>