============================================
このメッセージは <?php echo App::config('site.name') ?> WEBサイトより自動的に送信されています。
心当たりのない場合やご不明な点がある場合は、
「<?php echo App::config('site.data.mail') ?>」までご連絡ください。
============================================

<?php $this->assign('title','['.App::config('site.name').'] お問い合わせありがとうございます。' ) ?>

<?php echo $form->value('name') ?> 様

この度は <?php echo App::config('site.name') ?> WEBサイトよりお問い合わせいただき、誠にありがとうございます。
早速ご連絡を差し上げますので、今しばらくお待ちください。

お送りいただいた内容は以下の通りです。

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
endif;?>


■ ご住所
<?php
if ( $form->valueDisplayed( 'address' ) == '' ):
    echo '未入力';
else:
    echo $form->valueDisplayed( 'address' );
endif;?>


■ お電話番号
<?php
if ( $form->value( 'tel' ) == '' ):
    echo '未入力';
else:
    echo $form->value( 'tel' );
endif;?>


■ サロン名
<?php
if ( $form->value( 'salon_name' ) == '' ):
    echo '未入力';
else:
    echo $form->value( 'salon_name' );
endif;?>


■ お問い合わせ内容
<?php
if ( $form->value( 'message' ) == '' ):
    echo '未入力';
else:
    echo $form->value( 'message' );
endif;?>



-- 
/////////////////////////////////////////////////// 

<?php
$form = App::config('site.data.form');
$address = App::config('site.data.address');
;?>
<?php echo App::config('site.data.company_name').PHP_EOL ?>
TEL : <?php echo App::config('site.data.tel').PHP_EOL ?>
URL : <?php echo App::config('site.data.url').PHP_EOL ?>
E-MAIL : <?php echo $form[0].PHP_EOL ?>

/////////////////////////////////////////////////// 






