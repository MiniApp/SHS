/*
 * Copyright 2010-2014 icl-network.com. All rights reserved.
 * Support: http://www.icl-network.com
 *
 * JavaScript - Regist
 * Version: 3.0
 */
$().ready(function() {

	var $registForm = $("#registForm"), $flashMessage = $("#flashMessage"), $submit = $registForm.find(":submit"), rsaKey = new RSAKey(), $captchaButton = $("#captchaButton");
	var $username = $("#username"), $password = $("#password"), $mobile = $("#mobile"), $captcha = $("#captcha");
	$submit.prop("disabled", false);
	rsaKey.setPublic(b64tohex(modulus), b64tohex(exponent));
	
	[#-- 表单验证 --]
	var $validate = $registForm.validate({
		rules: {
			mobile: {
				required: true,
				pattern: /^1[3,5,8]\d{9}$/,
				remote: {
					url: "${base}/regist/check_mobile",
					type: "post",
					cache: false
				}
			},
			username: {
				required: true,
				pattern: /^[0-9a-z_A-Z\u4e00-\u9fa5]+$/,
				minlength: ${setting.security.usernameMinLength},
				maxlength: ${setting.security.usernameMaxLength},
				remote: {
					url: "${base}/regist/check_username",
					type: "post",
					cache: false
				}
			},
			password: {
				required: true,
				pattern: /^[^\s&\"<>]+$/,
				minlength: ${setting.security.passwordMinLength},
				maxlength: ${setting.security.passwordMaxLength}
			},
			rePassword: {
				required: true,
				equalTo: "#password"
			},
			captcha: "required",
			agreement : "required"
		},
		messages: {
			mobile: {
				required: "请输入您的手机号码",
				pattern: "请输入正确的手机号码",
				remote: "手机号码已存在"
			},
			username: {
				required: "请输入${setting.security.usernameMinLength}-${setting.security.usernameMaxLength}位用户名",
				pattern: "用户名只允许包含中文、英文、数字、下划线",
				minlength: "请输入${setting.security.usernameMinLength}-${setting.security.usernameMaxLength}位用户名",
				maxlength: "请输入${setting.security.usernameMinLength}-${setting.security.usernameMaxLength}位用户名",
				remote: "用户名已存在"
			},
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
			captcha: "请输入验证码",
			agreement: "请先阅读《注册协议》并确认同意"
		},
		errorPlacement: function(error, element) {
			element.closest("li").find(".annotate").text(error.text());
		},
		unhighlight: function(element) {
			$(element).closest("li").find(".annotate").text("");
		},
		submitHandler: function(form) {
			$submit.prop("disabled", true);
			
			[#-- AJAX注册 --]
			$.ajax({
				url: "${base}/regist/texting_regist",
				data: {
					mobile: $mobile.val(),
					username: $username.val(),
					password: hex2b64(rsaKey.encrypt($password.val())),
					captcha: $captcha.val()
				},
				type: "post",
				dataType: "json",
				cache: false,
				beforeSend: function(request, settings) {
					request.setRequestHeader("token", $.cookie("token"));
					$submit.val(" 注 册 中 ... ");
				},
				success: function(message) {
					if (message.type == "success") {
						window.location = redirectUrl;
					} else {
						$flashMessage.text(message.cont);
						$captcha.val("");
						$submit.val(" 注 册 ");
						$submit.prop("disabled", false);
					}
				},
				error: function() {
					$flashMessage.text("注册失败，请刷新页面重试");
					$submit.val(" 注 册 失 败 ");
				}
			});
		}
	});
	
	[#-- 发送验证码 --]
	$captchaButton.click(function() {
		$captchaButton.prop("disabled", true);
	
		[#-- 验证用户名、手机号码 --]	
		if(!$validate.element($username) || !$validate.element($mobile)) {
			$captchaButton.prop("disabled", false);
			return false;
		}
		
		[#-- AJAX申请验证码 --]	
		$.ajax({
			url: "${base}/regist/texting_apply",
			data: {
				mobile: $mobile.val(),
				username: $username.val()
			},
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