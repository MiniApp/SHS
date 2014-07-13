/*
 * Copyright 2010-2013 icl-network.com. All rights reserved.
 * Support: http://www.icl-network.com
 *
 * JavaScript - Oss Setting
 * Version: 3.0
 */

$().ready(function() {

	[#-- 表单验证 --]
	var $inputForm = $("#inputForm");
	$inputForm.find(":submit").prop("disabled", false);
	$inputForm.validate({
		rules: {
			storageName: "required",
			accessId: "required",
			accessKey: "required",
			bucketName: "required",
			urlPrefix: "required",
			order: "digits"
		}
	});
	
});