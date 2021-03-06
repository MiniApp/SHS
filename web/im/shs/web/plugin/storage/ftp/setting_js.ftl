/*
 * Copyright 2010-2013 icl-network.com. All rights reserved.
 * Support: http://www.icl-network.com
 *
 * JavaScript - FtpStorage Setting
 * Version: 3.0
 */
$().ready(function() {

	[#-- 表单验证 --]
	var $inputForm = $("#inputForm");
	$inputForm.find(":submit").prop("disabled", false);
	$inputForm.validate({
		rules: {
			storageName: "required",
			host: "required",
			port: {
				required: true,
				digits: true
			},
			username: "required",
			urlPrefix: "required",
			order: "digits"
		}
	});
	
});