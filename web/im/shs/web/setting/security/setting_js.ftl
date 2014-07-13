/*
 * Copyright 2010-2013 icl-network.com. All rights reserved.
 * Support: http://www.icl-network.com
 *
 * JavaScript - Security Setting
 * Version: 3.0
 */

$().ready(function() {

	[#-- 表单验证函数 --]
	$.validator.addMethod("compareLength", 
		function(value, element, param) {
			return this.optional(element) || $.trim(value) == "" || $.trim($(param).val()) == "" || parseFloat(value) >= parseFloat($(param).val());
		},
		"必须大于或等于最小长度"
	);
	
	[#-- 表单验证 --]
	var $inputForm = $("#inputForm");
	$inputForm.find(":submit").prop("disabled", false);
	$inputForm.validate({
		rules: {
			usernameMinLength: {
				required: true,
				integer: true,
				min: 1,
				max: 117
			},
			usernameMaxLength: {
				required: true,
				integer: true,
				min: 1,
				max: 117,
				compareLength: "#usernameMinLength"
			},
			passwordMinLength: {
				required: true,
				integer: true,
				min: 1,
				max: 117
			},
			passwordMaxLength: {
				required: true,
				integer: true,
				min: 1,
				max: 117,
				compareLength: "#passwordMinLength"
			},
			accountLockCount: {
				required: true,
				integer: true,
				min: 1
			},
			accountLockTime: {
				required: true,
				integer: true,
				min: 1,
			},
			tokenCodeLength: {
				required: true,
				integer: true,
				min: 1,
			},
			tokenExpiryTime: {
				required: true,
				integer: true,
				min: 1,
			},
			tokenRetryTime: {
				required: true,
				integer: true,
				min: 1,
			},
			currencySign: "required",
			currencyUnit: "required",
			uploadMaxSize: {
				required: true,
				digits: true
			},
			imageUploadPath: "required",
			flashUploadPath: "required",
			mediaUploadPath: "required",
			fileUploadPath: "required"
		}
	});
	
});