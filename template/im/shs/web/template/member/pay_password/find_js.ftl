/*
 * Copyright 2010-2014 icl-network.com. All rights reserved.
 * Support: http://www.icl-network.com
 *
 * JavaScript - Member PaymentPassword Find
 * Version: 3.0
 */
$().ready(function() {

	var $paymentPasswordFindForm = $("#paymentPasswordFindForm"), $submit = $paymentPasswordFindForm.find(":submit"), $captchaButton = $paymentPasswordFindForm.find(".captchaButton"), rsaKey = new RSAKey();
	var $password = $paymentPasswordFindForm.find("[name='password']");
	$submit.prop("disabled", false);
	rsaKey.setPublic(b64tohex(modulus), b64tohex(exponent));
	$password.val("");
	
	[#-- 表单验证 --]
	$paymentPasswordFindForm.validate({
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
			},
			captcha: "required"
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
			},
			captcha: "请输入验证码"
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
	
	[#-- 发送验证码 --]
	$captchaButton.click(function() {
		$captchaButton.prop("disabled", true);
		
		[#-- AJAX申请验证码 --]
		$.ajax({
			url: "${base}/account/pay_password/send_texting",
			type: "post",
			dataType: "json",
			cache: false,
			success: function(message) {
				if(message.type == "success") {
					$disableButton($captchaButton, ${setting.security.tokenRetryTime});
				} else {
					$captchaButton.prop("disabled", false);
				}
			}
		});
		
	});

});