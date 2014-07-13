/*
 * Copyright 2010-2013 icl-network.com. All rights reserved.
 * Support: http://www.icl-network.com
 *
 * JavaScript - Basic Setting
 * Version: 3.0
 */

$().ready(function() {

	[#-- 表单验证 --]
	var $inputForm = $("#inputForm");
	$inputForm.find(":submit").prop("disabled", false);
	$inputForm.validate({
		rules: {
			siteName: "required",
			siteUrl: "required",
			siteLogoFile: {
				extension: "${setting.security.uploadImageExtension}"
			},
			zipCode: "zipCode",
			email: "email",
			siteVersion: "required",
			siteCloseMessage: "required",
			cookiePath: "required"
		}
	});
	
});