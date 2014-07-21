/*
 * Copyright 2010-2014 icl-network.com. All rights reserved.
 * Support: http://www.icl-network.com
 *
 * JavaScript - Login
 * Version: 3.0
 */
[#-- 启用验证码 --]
[#assign enabledCaptcha = (setting.security.captchaScopes?? && setting.security.captchaScopes?seq_contains("adminLogin")) /]
$().ready( function() {
		
	[#-- 属性 --]
	var $loginForm = $("#loginForm"), $submit = $loginForm.find(":submit"), $flashMessage = $("#flashMessage"), $remember = $("#remember");
	var $username = $("#username"), $password = $("#password")[#-- 启用验证码时 --][#if enabledCaptcha], $captcha = $("#captcha")[/#if];
	
	$submit.prop("disabled", false);
	
	[#-- 表单验证 --]
	$loginForm.validate({
		errorClass: "errorMessage",
		rules: {
			username: {
				required: true,
				pattern: /^[0-9a-z_A-Z\u4e00-\u9fa5]+$/,
				minlength: 2
			},
			password: {
				required: true,
				minlength: 4
			}
			[#-- 启用验证码时 --]
			[#if enabledCaptcha]
				, captcha: {
					required: true
				}
			[/#if]
		},
		messages: {
			username: {
				required: "请输入用户名",
				pattern: "用户名只允许包含中文、英文、数字、下划线",
				minlength: "用户名最小长度为2"
			},
			password: {
				required: "请输入密码",
				minlength: "密码最小长度为4"
			}
			[#-- 启用验证码时 --]
			[#if enabledCaptcha]
				, captcha: {
					required: "请输入验证码"
				}
			[/#if]
		},
		submitHandler: function(form) {
			$submit.prop("disabled", true);
		
			[#-- RSA加密 --]
			var rsaKey = new RSAKey();
			rsaKey.setPublic(b64tohex(modulus), b64tohex(exponent));
			
			[#-- AJAX登录 --]
			$.ajax({
				url: "${base}/admin/login",
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
					[#-- 绑定令牌 --]	
					request.setRequestHeader("token", $.cookie("token"));
					[#-- 按钮显示操作 --]
					$submit.text(" 登 陆 中 ... ");
				},
				success: function(message) {
					if ($remember.prop("checked")) {
						$.cookie("rememberAdmin", $username.val(), {expires: 7 * 24 * 60 * 60});
					} else {
						$.removeCookie("memberUsername");
					}
					if (message.type == "success") {
						window.location = message.successUrl;
					} else {
						[#-- 显示提示消息 --]
						$flashMessage.text(message.cont);
						[#-- 更新 --]
						modulus = message.modulus, exponent = message.exponent;
						[#-- 启用验证码时 --]
						[#if enabledCaptcha]
							$captcha.val("");
							$captchaImage.click();
						[/#if]
						[#-- 按钮显示操作 --]
						$submit.text(" 登 陆 ");
						$submit.prop("disabled", false);
					}
				},
				error: function() {
					[#-- 显示提示消息 --]
					$flashMessage.text("登陆失败，请刷新页面重试");
					[#-- 按钮显示操作 --]
					$submit.text(" 登 陆 失 败 ");
				}
			});
		}
	});

	[#-- 获取已记住管理员 --]
	var remember = $.cookie("rememberAdmin");
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
			$captchaImage.prop("src", "${base}/admin/captcha?captchaId=" + captchaId + "&timestamp=" + (new Date()).valueOf());
		});
	[/#if]

});