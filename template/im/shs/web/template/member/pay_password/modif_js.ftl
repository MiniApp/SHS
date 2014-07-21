/*
 * Copyright 2010-2014 icl-network.com. All rights reserved.
 * Support: http://www.icl-network.com
 *
 * JavaScript - Member PaymentPassword Modif
 * Version: 3.0
 */
$().ready(function() {

	var $paymentPasswordModifForm = $("#paymentPasswordModifForm"), $submit = $paymentPasswordModifForm.find(":submit"), rsaKey = new RSAKey();
	var $currentPassword = $paymentPasswordModifForm.find("[name='currentPassword']");
	var $password = $paymentPasswordModifForm.find("[name='password']");
	$submit.prop("disabled", false);
	rsaKey.setPublic(b64tohex(modulus), b64tohex(exponent));
	$currentPassword.val("");
	$password.val("");
	
	[#-- 表单验证 --]
	$paymentPasswordModifForm.validate({
		rules: {
			currentPassword: {
				required: true,
				pattern: /^[^\s&\"<>]+$/,
				minlength: ${setting.security.passwordMinLength},
				maxlength: ${setting.security.passwordMaxLength}
			},
			password: {
				required: true,
				pattern: /^[^\s&\"<>]+$/,
				minlength: ${setting.security.passwordMinLength},
				maxlength: ${setting.security.passwordMaxLength},
				notEqualTo: $currentPassword
			},
			rePassword: {
				required: true,
				equalTo: $password
			}
		},
		messages: {
			currentPassword: {
				required: "请输入当前密码",
				pattern: "密码包含非法字符",
				minlength: "请输入${setting.security.passwordMinLength}-${setting.security.passwordMaxLength}位密码",
				maxlength: "请输入${setting.security.passwordMinLength}-${setting.security.passwordMaxLength}位密码"
			},
			password: {
				required: "请输入新密码",
				pattern: "密码包含非法字符",
				minlength: "请输入${setting.security.passwordMinLength}-${setting.security.passwordMaxLength}位密码",
				maxlength: "请输入${setting.security.passwordMinLength}-${setting.security.passwordMaxLength}位密码",
				notEqualTo: "不能与当前密码相同"
			},
			rePassword: {
				required: "请输入确认密码",
				equalTo: "两次密码输入不一致"
			}
		},
		errorPlacement: function(error, element) {
			element.closest("li").find(".form-remark").text(error.text());
		},
		unhighlight: function(element) {
			$(element).closest("li").find(".form-remark").text("");
		},
		submitHandler: function(form) {
			$submit.prop("disabled", true);
			$currentPassword.val(hex2b64(rsaKey.encrypt($currentPassword.val())));
			$password.val(hex2b64(rsaKey.encrypt($password.val())));
			form.submit();
		}
	});

});