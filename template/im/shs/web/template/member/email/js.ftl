/*
 * Copyright 2010-2014 icl-network.com. All rights reserved.
 * Support: http://www.icl-network.com
 *
 * JavaScript - Member Email
 * Version: 3.0
 */
$().ready(function() {

	var $emailForm = $("#emailForm"), $submit = $emailForm.find(":submit"), $captchaButton = $emailForm.find(".captchaButton");
	var $email = $emailForm.find("[name='email']");
	$submit.prop("disabled", false);
	
	[#-- 表单验证 --]
	var $validate = $emailForm.validate({
		rules: {
			email: {
				required:true,
				email:true,
				remote: {
					url: "${base}/account/email/check",
					type: "post",
					cache: false
				}
			},
			captcha: "required"
		},
		messages: {
			email: {
				required:"请输入邮箱地址",
				email:"请输入正确的邮箱地址",
				remote: "邮箱地址已存在"
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
			form.submit();
		}
	});
	
	[#-- 发送验证码 --]
	$captchaButton.click(function() {
		$captchaButton.prop("disabled", true);
	
		[#-- 验证邮箱地址 --]	
		if(!$validate.element($email)) {
			$captchaButton.prop("disabled", false);
			return false;
		}
		
		[#-- AJAX申请验证码 --]
		$.ajax({
			url: "${base}/account/email/send_binding",
			data: { email: $email.val() },
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