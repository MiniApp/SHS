/*
 * Copyright 2010-2014 icl-network.com. All rights reserved.
 * Support: http://www.icl-network.com
 *
 * JavaScript - Withdrawal Modif
 * Version: 3.0
 */
$().ready(function() {
    
	[#-- 表单验证 --]
	var $inputForm = $("#inputForm");
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
			fee: {
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