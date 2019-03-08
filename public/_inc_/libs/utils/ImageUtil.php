<?php
/**
 * Description of ImageUtil
 *
 * @author takaaki.koyama
 */
class ImageUtil {

	const MODE_AUTO = 0;
	const MODE_SMART = 1;
	const MODE_FIXWIDTH = 2;
	const MODE_FIXHEIGHT = 3;
	const MODE_TRIM = 4;
	const MODE_CROP = 5;

	static public $CROP_BG_COLOR = 0xFFFFFF;
	static public $JPEG_QUALITY = 90;

	static private $IMAGE_TYPES = array(
		1 => 'GIF',
		2 => 'JPG',
		3 => 'PNG',
		4 => 'SWF',
		5 => 'PSD',
		6 => 'BMP',
		7 => 'TIFF(intel byte order)',
		8 => 'TIFF(motorola byte order)',
		9 => 'JPC',
		10 => 'JP2',
		11 => 'JPX',
		12 => 'JB2',
		13 => 'SWC',
		14 => 'IFF',
		15 => 'WBMP',
		16 => 'XBM',
	);

	static private $REDEFINE_KEYS = array(
		'width',
		'height',
		'type',
		'attr',
		'bits',
		'channels',
		'mime',
	);


	static public function resize($src, $dist, $width, $height, $mode = self::MODE_AUTO){
		if(false === ($info = self::getImageInfo($src))){
			throw new Exception("Can't get Image info.");
		}

		$sw = $info['width'];
		$sh = $info['height'];
		$type = strtolower($info['type']);
		if(!in_array($type, array('jpg','png','gif'))){
			throw new Exception("Can't process Image type: {$type}.");
		}elseif($type === 'jpg'){
			$type = 'jpeg';
		}


		list($dw, $dh, $dx, $dy, $sx, $sy) = self::getResizeSetting($width, $height, $sw, $sh, $mode);
		$data = compact('src', 'dist', 'width', 'height', 'type', 'sw', 'sh', 'dw', 'dh', 'dx', 'dy', 'sx', 'sy');
		return self::_resize($data);
	}


	static public function crop($src, $dist, $data){
		if(false === ($info = self::getImageInfo($src))){
			throw new Exception("Can't get Image info.");
		}

		$sw = $info['width'];
		$sh = $info['height'];
		$type = strtolower($info['type']);
		if(!in_array($type, array('jpg','png','gif'))){
			throw new Exception("Can't process Image type: {$type}.");
		}elseif($type === 'jpg'){
			$type = 'jpeg';
		}

		$width = $data['width'];
		$height = $data['height'];
		$dw = $sw;
		$dh = $sh;
		$dx = $dy = 0;
		$sx = $data['x'];
		$sy = $data['y'];

		if ($sx <= -$width || $sx > $sw) {
			$sx = $sw = $dx = $dw = 0;
		} else if ($sx <= 0) {
			$dx = - $sx;
			$sx = 0;
		} else if ($sx <= $sw) {
			$dx = 0;
		}

		if ($sw <= 0 || $sy <= -$height || $sy > $sh) {
			$sy = $sh = $dy = $dh = 0;
		} else if ($sy <= 0) {
			$dy = -$sy;
			$sy = 0;
		} else if ($sy <= $sh) {
			$dy = 0;
		}

		$data = compact('src', 'dist', 'width', 'height', 'type', 'sw', 'sh', 'dw', 'dh', 'dx', 'dy', 'sx', 'sy');
		return self::_resize($data);
	}


	static private function _resize($data){
		extract($data);

		$image = false;
		$temp = false;
		if($sw !== $width || $sh != $height){
			if(false !== ($image = call_user_func('imagecreatefrom' . $type, $src))){
				if (function_exists("imagecreatetruecolor") && ($temp = imagecreatetruecolor($width, $height))) {
					imagefill($temp,0,0, self::$CROP_BG_COLOR);
					imagecopyresampled($temp, $image, $dx, $dy, $sx, $sy, $dw, $dh, $sw, $sh);
				} else {
					$temp = imagecreate($width, $height);
					imagefill($temp,0,0, self::$CROP_BG_COLOR);
					imagecopyresampled($temp, $image, $dx, $dy, $sx, $sy, $dw, $dh, $sw, $sh);
				}
			}
		}else{
			$temp = call_user_func('imagecreatefrom' . $type, $src);
		}

		if($image) imagedestroy($image);

		if($temp){
			$result = false;
			switch ($type){
				case 'gif' :
					$result = imagegif($temp, $dist);
				break;
				case 'jpeg' :
					$result = imagejpeg($temp, $dist, self::$JPEG_QUALITY);
				break;
				case 'png' :
					$result = imagepng($temp, $dist);
				break;
			}

			imagedestroy($temp);
			return $result;
		}

		return false;
	}

	static private function getResizeSetting(&$width, &$height, $image_width, $image_height, &$mode = self::MODE_AUTO){
		$new_width = 0;
		$new_height = 0;
		$dx = 0;
		$dy = 0;
		$sx = 0;
		$sy = 0;

		switch ($mode) {
			case self::MODE_AUTO :
				// ##### 長辺を基準にリサイズ #####
				if ($image_width > $image_height) {
					// 横長時処理
					$new_width = $width;
					$new_height = $height = round($image_height * ($width / $image_width));
					$dy = round(($height - $new_height) * 0.5);
				} else {
					// 縦長時処理
					$new_height = $height;
					$new_width = $width = round($image_width * ($height / $image_height));
					$dx = round(($width - $new_width) * 0.5);
				}
				break;
			case self::MODE_SMART :
				// ##### 規定範囲内にリサイズ #####
				$resize_ratio = max(($width / $image_width), ($height / $image_height));
				$new_width = round($image_width * $resize_ratio);
				$new_height = round($image_height * $resize_ratio);
				$dx = round(($width - $new_width) * 0.5);
				$dy = round(($height - $new_height) * 0.5);
				break;
			case self::MODE_FIXWIDTH :
				// ##### 規定幅を基準にリサイズ #####
				$new_width = $width;
				$new_height = round($image_height * ($width / $image_width));
				$height = $new_height;
				break;
			case self::MODE_FIXHEIGHT :
				// ##### 規定高を基準にリサイズ #####
				$new_height = $height;
				$new_width = round($image_width * ($height / $image_height));
				$width = $new_width;
				break;
			case self::MODE_TRIM :
				// ##### 規定サイズを超える範囲をトリム #####
				$new_width = $image_width;
				$new_height = $image_height;
				$dx = round(($width - $new_width) * 0.5);
				$dy = round(($height - $new_height) * 0.5);

				break;
			case self::MODE_CROP :
				// ##### 規定サイズ未満の範囲にクロップを入れる #####
				$resize_ratio = min(($width / $image_width), ($height / $image_height),1);
				$new_width = round($image_width * $resize_ratio);
				$new_height = round($image_height * $resize_ratio);
				$dx = round(($width - $new_width) * 0.5);
				$dy = round(($height - $new_height) * 0.5);
				break;
			default:
				break;
		}

		return array($new_width, $new_height, $dx, $dy, $sx, $sy);
	}


	static public function filter($src, $save_to, $filter, $args = array()){
		if(false === ($image_info = self::getImageInfo($src))){
			throw new Exception("Can't get Image info.");
		}

		$image_width = $image_info['width'];
		$image_height = $image_info['height'];
		$image_type = strtolower($image_info['type']);
		if(!in_array($image_type, array('jpg','png','gif'))){
			throw new Exception("Can't process Image type: {$image_type}.");
		}elseif($image_type === 'jpg'){
			$image_type = 'jpeg';
		}

		$image = call_user_func('imagecreatefrom' . $image_type, $src);
		if($image){
			if(call_user_func_array('imagefilter', array($image, $filter)+$args)){
				return self::save($image, $image_type, $save_to);
			}
		}

		return false;

	}

	static public function blur($src, $save_to, $raduis){
		if(false === ($image_info = self::getImageInfo($src))){
			throw new Exception("Can't get Image info.");
		}
		$image_type = strtolower($image_info['type']);
		if(!in_array($image_type, array('jpg','png','gif'))){
			throw new Exception("Can't process Image type: {$image_type}.");
		}elseif($image_type === 'jpg'){
			$image_type = 'jpeg';
		}

		$image = call_user_func('imagecreatefrom' . $image_type, $src);
		if($image){


			$e = 2.718281828459;

			$raduis *=2;
			$rows = ceil($raduis)*2+1;
			$sigma2 = pow($raduis/2, 2);

			$mid = floor($rows/2);

			$kernel = array();
			$sum = 0;
			for($x = 0; $x < $rows; $x++){
				$kernel[$x] = array();
				for($y = 0; $y < $rows; $y++){
					$g;
					if($x > $mid && $y < $mid) {
						$g = $kernel[$rows-$x-1][$y];
					}elseif($x < $mid && $y > $mid) {
						$g = $kernel[$x][$rows-$y-1];
					}elseif($x > $mid && $y > $mid) {
						$g = $kernel[$rows-$x-1][$rows-$y-1];
					}else{
						$g = ( 1/ ( sqrt(2*M_PI*$sigma2) ) ) * ( pow($e, -( (($x-$mid)*($x-$mid)+($y-$mid)*($y-$mid)) / (2*$sigma2) )));
					}
					$kernel[$x][$y] = $g;
					$sum += $g;
				}
			}
			for($x = 0; $x < $rows; $x++){
				for($y = 0; $y < $rows; $y++){
					$kernel[$x][$y] /= $sum;
				}
			}


			$width = $image_info['width'];
			$height = $image_info['height'];

			$time = microtime(true);
			$im = imagecreatetruecolor($width, $height);
			imagefill($im, 0, 0, imagecolorallocate($im,0xFF,0xFF,0xFF));

			$x = $width;
			while($x--){
				$y = $height;
				while($y--){
					$r = $g = $b = 0;
					$i = $rows;
					while($i--){
						$tx = min(max($x - ceil($rows/2) + $i, 0), $width - 1);
						$j = $rows;
						while($j--){
							$ty = min(max($y - ceil($rows/2) + $j, 0), $height - 1);

							$rgba = imagecolorat($image, $tx, $ty);
							$filter = $kernel[$i][$j];
							$r += (($rgba >> 16) & 0xFF) * $filter;
							$g += (($rgba >> 8) & 0xFF) * $filter;
							$b += ($rgba & 0xFF) * $filter;
						}
					}

					$r = min(max(intval($r + 0.5), 0), 255);
					$g = min(max(intval($g + 0.5), 0), 255);
					$b = min(max(intval($b + 0.5), 0), 255);
					imagesetpixel($im, $x, $y, imagecolorallocate($im,$r,$g,$b));
				}
			}
			imagedestroy($image);
			self::save($im, $image_type, $save_to);
			return true;
		}
		return false;
	}

	static private function save($image, $type, $save_to){
		$result = false;
		switch ($type){
			case 'gif' :
				$result = imagegif($image, $save_to);
			break;
			case 'jpeg' :
				$result = imagejpeg($image, $save_to, self::$JPEG_QUALITY);
			break;
			case 'png' :
				$result = imagepng($image, $save_to);
			break;
		}

		imagedestroy($image);
		return false;
	}




	static public  function createImgTag($root_dir, $src, $alt = ''){
		$root_dir = rtrim($root_dir,"/");
		$src = '/' . ltrim($src, "/");
		if(false === ($attr = self::getImageInfo($root_dir . $src, 'attr'))){
			return '';
		}
		return '<img src="'. $src .'" ' . $attr . ' alt="' . $alt . '" />';
	}


	static public function getImageInfo($file, $out = null){
		clearstatcache(true);
		if (is_null($file) || !is_file($file)) return false;
		if (!is_null($out) && !in_array($out, self::$REDEFINE_KEYS)) $out = null;

		$tmp = array();

		if (false === ($tmp = getimagesize($file))){
			return false;
		}

		if(is_null($out)){
			$info = array();
			$tmp = array_values($tmp);
			foreach ($tmp as $key => $value) {
				$info[self::$REDEFINE_KEYS[$key]] = $value;
			}
			$info['type'] = self::$IMAGE_TYPES[$info['type']];
			return $info;
		}elseif($out === 'type'){
			return self::$IMAGE_TYPES[array_search($out,self::$REDEFINE_KEYS)];
		}else{

			return $tmp[array_search($out,self::$REDEFINE_KEYS)];
		}
		return false;
	}

}
?>