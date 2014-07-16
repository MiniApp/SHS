/*
 * Copyright 2010-2013 icl-network.com. All rights reserved.
 * Support: http://www.icl-network.com
 *
 * JavaScript - Member Mobile
 * Version: 3.0
 */
$().ready(function() {

	var $mobileForm = $("#mobileForm"), $submit = $mobileForm.find(":submit"), $captchaButton = $mobileForm.find(".captchaButton");
	var $mobile = $mobileForm.find("[name='mobile']");
	$submit.prop("disabled", false);
	
	[#-- 表单验证 --]
	var $validate = $mobileForm.validate({
		rules: {
			mobile: {
				required:true,
				pattern: /^1[3,5,8]\d{9}$/,
				remote: {
					url: "${base}/account/mobile/check",
					type: "post",
					cache: false
				}
			},
			captcha: "required"
		},
		messages: {
			mobile: {
				required:"请输入手机号码",
				pattern:"请输入正确的手机号码",
				remote: "手机号码已存在"
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
	
		[#-- 验证手机号码 --]	
		if(!$validate.element($mobile)) {
			$captchaButton.prop("disabled", false);
			return false;
		}
		
		[#-- AJAX申请验证码 --]
		$.ajax({
			url: "${base}/account/mobile/send_binding",
			data: { mobile: $mobile.val() },
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