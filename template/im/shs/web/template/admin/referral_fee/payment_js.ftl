/*
 * Copyright 2010-2014 icl-network.com. All rights reserved.
 * Support: http://www.icl-network.com
 *
 * JavaScript - ReferralFee Payment
 * Version: 3.0
 */
[#-- 索引URL --]
[#assign indexUrl = base + "/admin/referral_fee" /]
$().ready(function() {
			
	[#-- 表单验证 --]
	var $inputForm = $("#inputForm");
	$inputForm.find(":submit").prop("disabled", false);
	$inputForm.validate({
		rules: {
			memo: "required"
		}
	});
	
});