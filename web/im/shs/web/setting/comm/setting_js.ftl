/*
 * Copyright 2010-2013 icl-network.com. All rights reserved.
 * Support: http://www.icl-network.com
 *
 * JavaScript - Comm Setting
 * Version: 3.0
 */

$().ready(function() {

	[#-- 表单验证 --]
	var $inputForm = $("#inputForm");
	$inputForm.find(":submit").prop("disabled", false);
	$inputForm.validate({
		rules: {
			smtpFromMail: {
				required: true,
				email: true
			},
			smtpHost: "required",
			smtpPort: {
				required: true,
				digits: true
			},
			smtpUsername: "required",
			smsURL: "required",
			smsUsername: "required"
		}
	});
	
});