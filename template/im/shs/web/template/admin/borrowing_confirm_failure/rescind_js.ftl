/*
 * Copyright 2010-2013 icl-network.com. All rights reserved.
 * Support: http://www.icl-network.com
 *
 * JavaScript - Borrowing Confirm Rescind
 * Version: 3.0
 */
$().ready(function() {
    
	[#-- 表单验证 --]
	var $inputForm = $("#inputForm");
	$inputForm.find(":submit").prop("disabled", false);
	var $validate = $inputForm.validate({
		rules: {
			inquired: "required",
			opinion: "required"
		}
	});
	
});