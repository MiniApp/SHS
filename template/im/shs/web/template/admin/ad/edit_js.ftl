/*
 * Copyright 2010-2013 icl-network.com. All rights reserved.
 * Support: http://www.icl-network.com
 *
 * JavaScript - Ad Edit
 * Version: 3.0
 */
[#-- 索引URL --]
[#assign indexUrl = base + "/admin/ad" /]
$().ready(function() {
	
	[#-- 表单验证 --]
	var $inputForm = $("#inputForm");
	$inputForm.find(":submit").prop("disabled", false);
	$inputForm.validate({
		rules: {
			title: "required",
			positionId: "required",
			imageFile: {
				required: true,
				extension: "${setting.security.uploadImageExtension}"
			},
			flashFile: {
				required: true,
				extension: "${setting.security.uploadFlashExtension}"
			},
			url: "url",
			order: "digits"
		}
	});

	[#-- 类型选择 --]
	var $type = $("#type");
	
	[#--
	var $cont = $("#cont");
	var $contFormGroup = $cont.closest("div.form-group");
	--]
	
	var $image = $("#image");
	var $image_temp;
	var $imageFileName = $image.closest("div.input-file").find("span.file-name");
	var $imageFormGroup = $image.closest("div.form-group");
	
	var $flash = $("#flash");
	var $flash_temp;
	var $flashFileName = $flash.closest("div.input-file").find("span.file-name");
	var $flashFormGroup = $flash.closest("div.form-group");
	
	$type.change(function() {
	
		[#-- 选择文本 --]
		if ($(this).val() == "text") {
			
			[#--
			$cont.removeClass("ignore");
			$contFormGroup.addClass("in");
			--]
			
			$imageFormGroup.removeClass("in");
			[#-- 移除fileName --]
			$imageFileName.text("");
			[#-- 移除file --]
			$image_temp = $image.clone().val("").addClass("ignore");
			$image.after($image_temp);
			$image.remove();
			$image = $image_temp;
			
			$flashFormGroup.removeClass("in");
			[#-- 移除fileName --]
			$flashFileName.text("");
			[#-- 移除file --]
			$flash_temp = $flash.clone().val("").addClass("ignore");
			$flash.after($flash_temp);
			$flash.remove();
			$flash = $flash_temp;
			
		}
		[#-- 选择图片 --]
		else if ($(this).val() == "image") {
			
			$image.removeClass("ignore");
			$imageFormGroup.addClass("in");
			
			[#--
			$cont.addClass("ignore");
			$contFormGroup.removeClass("in");
			--]
			
			$flashFormGroup.removeClass("in");
			[#-- 移除fileName --]
			$flashFileName.text("");
			[#-- 移除file --]
			$flash_temp = $flash.clone().val("").addClass("ignore");
			$flash.after($flash_temp);
			$flash.remove();
			$flash = $flash_temp;
			
		}
		[#-- 选择Flash --]
		else if ($(this).val() == "flash") {
		
			$flash.removeClass("ignore");
			$flashFormGroup.addClass("in");
			
			[#--
			$cont.addClass("ignore");
			$contFormGroup.removeClass("in");
			--]
			
			$imageFormGroup.removeClass("in");
			[#-- 移除fileName --]
			$imageFileName.text("");
			[#-- 移除file --]
			$image_temp = $image.clone().val("").addClass("ignore");
			$image.after($image_temp);
			$image.remove();
			$image = $image_temp;
		}
	});
	$type.change();
	
});