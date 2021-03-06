/*
 * Copyright 2010-2014 icl-network.com. All rights reserved.
 * Support: http://www.icl-network.com
 *
 * JavaScript - Member PaymentPassword Setting
 * Version: 3.0
 */
$().ready(function() {

	var $paymentPasswordSettingForm = $("#paymentPasswordSettingForm"), $submit = $paymentPasswordSettingForm.find(":submit"), rsaKey = new RSAKey();
	var $password = $paymentPasswordSettingForm.find("[name='password']");
	$submit.prop("disabled", false);
	rsaKey.setPublic(b64tohex(modulus), b64tohex(exponent));
	$password.val("");
	
	[#-- 表单验证 --]
	$paymentPasswordSettingForm.validate({
		rules: {
			password: {
				required: true,
				pattern: /^[^\s&\"<>]+$/,
				minlength: ${setting.security.passwordMinLength},
				maxlength: ${setting.security.passwordMaxLength}
			},
			rePassword: {
				required: true,
				equalTo: $password
			}
		},
		messages: {
			password: {
				required: "请输入${setting.security.passwordMinLength}-${setting.security.passwordMaxLength}位密码",
				pattern: "密码包含非法字符",
				minlength: "请输入${setting.security.passwordMinLength}-${setting.security.passwordMaxLength}位密码",
				maxlength: "请输入${setting.security.passwordMinLength}-${setting.security.passwordMaxLength}位密码"
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
			$password.val(hex2b64(rsaKey.encrypt($password.val())));
			form.submit();
		}
	});

});