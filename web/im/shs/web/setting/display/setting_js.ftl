/*
 * Copyright 2010-2013 icl-network.com. All rights reserved.
 * Support: http://www.icl-network.com
 *
 * JavaScript - Display Setting
 * Version: 3.0
 */

$().ready(function() {

	[#-- 表单验证 --]
	var $inputForm = $("#inputForm");
	$inputForm.find(":submit").prop("disabled", false);
	$inputForm.validate({
		rules: {
			thumbnailImageHeight: {
				required: true,
				integer: true,
				min: 1
			},
			thumbnailImageWidth: {
				required: true,
				integer: true,
				min: 1
			},
			smallImageWidth: {
				required: true,
				integer: true,
				min: 1
			},
			smallImageHeight: {
				required: true,
				integer: true,
				min: 1
			},
			mediumImageHeight: {
				required: true,
				integer: true,
				min: 1
			},
			mediumImageWidth: {
				required: true,
				integer: true,
				min: 1
			},
			largeImageHeight: {
				required: true,
				integer: true,
				min: 1
			},
			largeImageWidth: {
				required: true,
				integer: true,
				min: 1
			},
			defaultThumbnailImageFile: {
				extension: "${setting.security.uploadImageExtension}"
			},
			defaultSmallImageFile: {
				extension: "${setting.security.uploadImageExtension}"
			},
			defaultMediumImageFile: {
				extension: "${setting.security.uploadImageExtension}"
			},
			defaultLargeImageFile: {
				extension: "${setting.security.uploadImageExtension}"
			},
			watermarkImageFile: {
				extension: "${setting.security.uploadImageExtension}"
			},
			watermarkAlpha: {
				required: true,
				digits: true,
				max: 100
			}
		}
	});
	
});