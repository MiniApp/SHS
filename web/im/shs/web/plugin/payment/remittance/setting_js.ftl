/*
 * Copyright 2010-2013 icl-network.com. All rights reserved.
 * Support: http://www.icl-network.com
 *
 * JavaScript - RemittancePayment Setting
 * Version: 3.0
 */
$().ready(function() {

	[#-- 表单验证函数 --]
	$.validator.addMethod("compareAmount", 
		function(value, element, param) {
			return this.optional(element) || $.trim(value) == "" || $.trim($(param).val()) == "" || parseFloat(value) >= parseFloat($(param).val());
		},
		"必须大于或等于最低额度"
	);

	[#-- 表单验证 --]
	var $inputForm = $("#inputForm");
	$inputForm.find(":submit").prop("disabled", false);
	$inputForm.validate({
		rules: {
			paymentName: "required",
			logoFile: {
				extension: "${setting.security.uploadImageExtension}"
			},
			bankName: "required",
			bankBranchName: "required",
			bankCardNo: {
				required: true,
				digits: true,
				minlength: 12,
				maxlength: 19
			},
			bankCardHolderName: "required",
			minimum: {
				positive: true,
				decimal: {
					integer: 12,
					fraction: ${setting.security.amountScale}
				}
			},
			maximum: {
				positive: true,
				decimal: {
					integer: 12,
					fraction: ${setting.security.amountScale}
				},
				compareAmount: "#minimum"
			},
			fee: {
				required: true,
				nonnegativeNumber: true,
				decimal: {
					integer: 19,
					fraction: 3
				}
			},
			handleTime: "required",
			order: "digits"
		}
	});
	
});