/*
 * Copyright 2010-2013 icl-network.com. All rights reserved.
 * Support: http://www.icl-network.com
 *
 * JavaScript - Account Recharge
 * Version: 3.0
 */
$().ready(function() {
    
	[#-- 表单验证 --]
	var $inputForm = $("#inputForm");
	var $bank = $("#bank");
	$inputForm.find(":submit").prop("disabled", false);
	$inputForm.validate({
		rules: {
			amount: {
				required: true,
				min: 0,
				decimal: {
					integer: 19,
					fraction: 2
				}
			},
			opinion: "required"
		}
	});
	
});