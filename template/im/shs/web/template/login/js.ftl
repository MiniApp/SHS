/*
 * Copyright 2010-2013 icl-network.com. All rights reserved.
 * Support: http://www.icl-network.com
 *
 * JavaScript - Login
 * Version: 3.0
 */
[#-- 启用验证码 --]
[#assign enabledCaptcha = (setting.security.captchaScopes?? && setting.security.captchaScopes?seq_contains("login")) /]
$().ready(function() {
    
	[#-- 表单 --]
	var $loginForm = $("#loginForm"), $flashMessage = $("#flashMessage"), $submit = $loginForm.find(":submit"), rsaKey = new RSAKey(), $remember = $("#remember");
	var $username = $("#username"), $password = $("#password")[#-- 启用验证码时 --][#if enabledCaptcha], $captcha = $("#captcha")[/#if];
	$submit.prop("disabled", false);
	rsaKey.setPublic(b64tohex(modulus), b64tohex(exponent));
	
	[#-- 表单验证 --]
	$loginForm.validate({
		rules: {
			username: "required",
			password: "required"
			[#-- 启用验证码时 --]
			[#if enabledCaptcha]
				, captcha: "required"
			[/#if]
		},
		messages: {
			username: "请输入您的用户名/手机号码/邮箱地址",
			password: "请输入密码"
			[#-- 启用验证码时 --]
			[#if enabledCaptcha]
				, captcha: "请输入验证码"
			[/#if]
		},
		errorPlacement: function(error, element) {
			element.closest("li").find(".annotate").text(error.text());
		},
		unhighlight: function(element) {
			$(element).closest("li").find(".annotate").text("");
		},
		submitHandler: function(form) {
			$submit.prop("disabled", true);
			
			[#-- AJAX登录 --]
			$.ajax({
				url: "${base}/login",
				data: {
					username: $username.val(),
					password: hex2b64(rsaKey.encrypt($password.val()))
					[#-- 启用验证码时 --]
					[#if enabledCaptcha]
						, captchaId: captchaId,
						captcha: $captcha.val()
					[/#if]
				},
				type: "post",
				dataType: "json",
				cache: false,
				beforeSend: function(request, settings) {
					request.setRequestHeader("token", $.cookie("token"));
					$submit.val(" 登 陆 中 ... ");
				},
				success: function(message) {
					if ($remember.prop("checked")) {
						$.cookie("remember", $username.val(), {expires: 7 * 24 * 60 * 60});
					} else {
						$.removeCookie("memberUsername");
					}
					if (message.type == "success") {
						window.location = redirectUrl;
					} else {
						$flashMessage.text(message.cont);
						[#-- 启用验证码时 --]
						[#if enabledCaptcha]
							$captcha.val("");
							$captchaImage.click();
						[/#if]
						$submit.val(" 登 陆 ");
						$submit.prop("disabled", false);
					}
				},
				error: function() {
					$flashMessage.text("登陆失败，请刷新页面重试");
					$submit.val(" 登 陆 失 败 ");
				}
			});
		}
	});
	
	[#-- 获取已记住用户 --]
	var remember = $.cookie("remember");
	if(remember != null) {
		$remember.prop("checked", true);
		$username.val(remember);
		$password.focus();
	} else {
		$remember.prop("checked", false);
		$username.focus();
	}
		
	[#-- 启用验证码时 --]
	[#if enabledCaptcha]
		[#-- 更换验证码 --]
		var $captchaImage = $("#captchaImage");
		$captchaImage.click(function() {
			$captchaImage.prop("src", "${base}/captcha?captchaId=" + captchaId + "&timestamp=" + (new Date()).valueOf());
		});
	[/#if]

});