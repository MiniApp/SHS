/*
 * Copyright 2010-2014 icl-network.com. All rights reserved.
 * Support: http://www.icl-network.com
 *
 * JavaScript - Password Find
 * Version: 3.0
 */
$().ready(function() {
	
	[#-- 选择找回方式 --]
	var findMethod = null;
	$(".findMethod").click(function(e) {
		e.preventDefault();
		
		var $this = $(this);
		if(findMethod != $this.attr("href")) {
		
			[#-- 取消当前找回方式 --]
			if(findMethod) {
				$(findMethod).hide();
			}
			
			[#-- 选择找回方式 --]
			findMethod = $this.attr("href");
			$(findMethod).show();
		
		}
		
	});
	
	[#-- RSA公钥 --]
	var rsaKey = new RSAKey();
	rsaKey.setPublic(b64tohex(modulus), b64tohex(exponent));
	
	[#-- 邮件方式找回 --]
	var $mailFindForm = $("#mailFindForm"), $email = $mailFindForm.find("[name='email']"), $mailResetPassword = $mailFindForm.find("[name='password']"), $mailFindFormSubmit = $mailFindForm.find(":submit");
	$mailResetPassword.val("");
	$mailFindFormSubmit.prop("disabled", false);
	var $mailFindFormValidate = $mailFindForm.validate({
		rules: {
			password: {
				required: true,
				pattern: /^[^\s&\"<>]+$/,
				minlength: ${setting.security.passwordMinLength},
				maxlength: ${setting.security.passwordMaxLength}
			},
			rePassword: {
				required: true,
				equalTo: $mailResetPassword
			},
			email: {
				required: true,
				email: true,
				remote: {
					url: "${base}/password/check_email",
					type: "post",
					cache: false
				}
			},
			captcha: "required"
		},
		messages: {
			password: {
				required: "请输入新密码",
				pattern: "密码包含非法字符",
				minlength: "请输入${setting.security.passwordMinLength}-${setting.security.passwordMaxLength}位密码",
				maxlength: "请输入${setting.security.passwordMinLength}-${setting.security.passwordMaxLength}位密码"
			},
			rePassword: {
				required: "请输入确认密码",
				equalTo: "两次密码输入不一致"
			},
			email: {
				required: "请输入您的邮箱地址",
				email: "请输入正确的邮箱地址",
				remote: "邮箱地址不存在"
			},
			captcha: "请输入验证码"
		},
		errorPlacement: function(error, element) {
			element.closest("tr").find(".annotate").text(error.text());
		},
		unhighlight: function(element) {
			$(element).closest("tr").find(".annotate").text("");
		},
		submitHandler: function(form) {
			$mailFindFormSubmit.prop("disabled", true);
			$mailResetPassword.val(hex2b64(rsaKey.encrypt($mailResetPassword.val())));
			form.submit();
		}
	});
	
	[#-- 发送邮件验证码 --]
	$(".sendMailCaptcha").click(function() {
		var $this = $(this);
		$this.prop("disabled", true);
		
		[#-- 验证邮箱地址 --]	
		if(!$mailFindFormValidate.element($email)) {
			$this.prop("disabled", false);
			return false;
		}
		
		[#-- AJAX申请验证码 --]	
		$.ajax({
			url: "${base}/password/mail_find",
			data: { email: $email.val() },
			type: "post",
			dataType: "json",
			cache: false,
			success: function(message) {
				if(message.type == "success") {
					$disableButton($this, ${setting.security.tokenRetryTime});
				} else {
					$this.prop("disabled", false);
				}
			}
		});
		
	});
	
	[#-- 短信方式找回 --]
	var $textingFindForm = $("#textingFindForm"), $mobile = $textingFindForm.find("[name='mobile']"), $textingResetPassword = $textingFindForm.find("[name='password']"), $textingFindFormSubmit = $textingFindForm.find(":submit");
	$textingResetPassword.val("");
	$textingFindFormSubmit.prop("disabled", false);
	var $textingFindFormValidate = $textingFindForm.validate({
		rules: {
			password: {
				required: true,
				pattern: /^[^\s&\"<>]+$/,
				minlength: ${setting.security.passwordMinLength},
				maxlength: ${setting.security.passwordMaxLength}
			},
			rePassword: {
				required: true,
				equalTo: $textingResetPassword
			},
			mobile: {
				required: true,
				pattern: /^1[3,5,8]\d{9}$/,
				remote: {
					url: "${base}/password/check_mobile",
					type: "post",
					cache: false
				}
			},
			captcha: "required"
		},
		messages: {
			password: {
				required: "请输入新密码",
				pattern: "密码包含非法字符",
				minlength: "请输入${setting.security.passwordMinLength}-${setting.security.passwordMaxLength}位密码",
				maxlength: "请输入${setting.security.passwordMinLength}-${setting.security.passwordMaxLength}位密码"
			},
			rePassword: {
				required: "请输入确认密码",
				equalTo: "两次密码输入不一致"
			},
			mobile: {
				required: "请输入您的手机号码",
				pattern: "请输入正确的手机号码",
				remote: "手机号码不存在"
			},
			captcha: "请输入验证码"
		},
		errorPlacement: function(error, element) {
			element.closest("tr").find(".annotate").text(error.text());
		},
		unhighlight: function(element) {
			$(element).closest("tr").find(".annotate").text("");
		},
		submitHandler: function(form) {
			$textingFindFormSubmit.prop("disabled", true);
			$textingResetPassword.val(hex2b64(rsaKey.encrypt($textingResetPassword.val())));
			form.submit();
		}
	});
	
	[#-- 发送短信验证码 --]
	$(".sendTextingCaptcha").click(function() {
		var $this = $(this);
		$this.prop("disabled", true);
		
		[#-- 验证手机号码 --]	
		if(!$textingFindFormValidate.element($mobile)) {
			$this.prop("disabled", false);
			return false;
		}
		
		[#-- AJAX申请验证码 --]	
		$.ajax({
			url: "${base}/password/texting_find",
			data: { mobile: $mobile.val() },
			type: "post",
			dataType: "json",
			cache: false,
			success: function(message) {
				if(message.type == "success") {
					$disableButton($this, ${setting.security.tokenRetryTime});
				} else {
					$this.prop("disabled", false);
				}
			}
		});
		
	});
	
});