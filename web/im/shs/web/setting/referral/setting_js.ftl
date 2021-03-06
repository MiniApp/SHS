/*
 * Copyright 2010-2013 icl-network.com. All rights reserved.
 * Support: http://www.icl-network.com
 *
 * JavaScript - Referral Setting
 * Version: 3.0
 */

$().ready(function() {

	[#-- 表单验证 --]
	var $inputForm = $("#inputForm");
	$inputForm.find(":submit").prop("disabled", false);
	$inputForm.validate({
		rules: {
			enabled: "required",
			feeRate: {
				required: true,
				positive: true,
				decimal: {
					integer: 2,
					fraction: 2
				}
			},
			paymentTime: {
				required: true,
				integer: true
			},
			expiryTime: {
				required: true,
				integer: true
			}
		}
	});
	
});