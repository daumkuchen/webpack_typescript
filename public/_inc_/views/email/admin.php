============================================
このメッセージは
<?php echo App::config( 'site.name' ) ?> WEBサイトより自動的に送信されています。
============================================

<?php $this->assign( 'title', '[' . App::config( 'site.name' ) . '] WEBサイトよりお問い合わせがありました' ) ?>

只今、<?php echo App::config( 'site.name' ) ?> WEBサイトよりお問い合わせがありました。
ご対応をお願いいたします。


- お問い合わせ内容 -


■ お名前
<?php
if ( $form->value( 'name' ) == '' ):
    echo '未入力';
else:
    echo $form->value( 'name' );
endif;?> 様


■ メールアドレス
<?php
if ( $form->value( 'mail' ) == '' ):
    echo '未入力';
else:
    echo $form->value( 'mail' );
endif; ?>


■ ご住所
<?php
if ( $form->valueDisplayed( 'address' ) == '' ):
    echo '未入力';
else:
    echo $form->valueDisplayed( 'address' );
endif; ?>


■ お電話番号
<?php
if ( $form->valueDisplayed( 'tel' ) == '' ):
    echo '未入力';
else:
    echo $form->valueDisplayed( 'tel' );
endif; ?>


■ サロン名
<?php
if ( $form->valueDisplayed( 'salon_name' ) == '' ):
    echo '未入力';
else:
    echo $form->valueDisplayed( 'salon_name' );
endif; ?>


■ お問い合わせ内容
<?php
if ( $form->valueDisplayed( 'message' ) == '' ):
    echo '未入力';
else:
    echo $form->valueDisplayed( 'message' );
endif; ?>


-------------------------------------------------------

date : <?php echo date( 'Y/m/d H:i:s' ) . PHP_EOL ?>
ip : <?php echo $_SERVER[ 'REMOTE_ADDR' ] . PHP_EOL ?>
host : <?php echo gethostbyaddr( $_SERVER[ 'REMOTE_ADDR' ] ) ?>:<?php echo $_SERVER[ 'REMOTE_PORT' ] . PHP_EOL ?>
ua : <?php echo $_SERVER[ 'HTTP_USER_AGENT' ] . PHP_EOL ?>

-------------------------------------------------------
