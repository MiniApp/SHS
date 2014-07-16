/*
 * Copyright 2010-2013 icl-network.com. All rights reserved.
 * Support: http://www.icl-network.com
 *
 * JavaScript - Project Invest
 * Version: 3.0
 */
$().ready(function() {
	
	[#-- 投资确认 --]
	var $investmentConfirmForm = $("#investmentConfirmForm"), $investmentAmount = $("#investmentAmount"), $amount = $investmentConfirmForm.find("[name='amount']"), $password = $investmentConfirmForm.find("[name='password']"), $investmentConfirmFromSubmit = $investmentConfirmForm.find(":submit"), rsaKey = new RSAKey();
	$investmentConfirmFromSubmit.prop("disabled", false);
	rsaKey.setPublic(b64tohex(modulus), b64tohex(exponent));
	$investmentConfirmForm.validate({
		rules: {
			password: {
				required: true,
				pattern: /^[^\s&\"<>]+$/,
				minlength: ${setting.security.passwordMinLength},
				maxlength: ${setting.security.passwordMaxLength}
			},
			agreement : "required"
		},
		messages: {
			password: {
				required: "请输入支付密码",
				pattern: "密码包含非法字符",
				minlength: "请输入${setting.security.passwordMinLength}-${setting.security.passwordMaxLength}位密码",
				maxlength: "请输入${setting.security.passwordMinLength}-${setting.security.passwordMaxLength}位密码"
			},
			agreement: "请先阅读《借款协议》并确认同意"
		},
		errorPlacement: function(error, element) {
			element.closest("td").find(".annotate").text(error.text());
		},
		unhighlight: function(element) {
			$(element).closest("td").find(".annotate").text("");
		},
		submitHandler: function(form) {
			$investmentConfirmFromSubmit.prop("disabled", true);
			$password.val(hex2b64(rsaKey.encrypt($password.val())));
			form.submit();
		}
	});

	[#-- 投资 --]
	var $investmentFrom = $("#investmentFrom"), $investmentFromSubmit = $investmentFrom.find(":submit");
	$investmentFromSubmit.prop("disabled", false);
	$investmentFrom.validate({
		rules: {
			amount: {
				required: true,
				positiveInteger: true,
				min: multiples,
				max: available,
				multiples: multiples
			}
		},
		messages: {
			amount: {
				required: "请输入投资金额",
				positiveInteger: "请输入正确的投资金额",
				min: "投资金额最小为" + multiples + "元",
				max: "可用余额不足",
				multiples: "投资金额须为" + multiples + "元的整数倍"
			}
		},
		errorPlacement: function(error, element) {
			element.next().text(error.text());
		},
		unhighlight: function(element) {
			$(element).next().text("");
		},
		submitHandler: function(form) {
			[#--
			$investmentFromSubmit.prop("disabled", true);
			--]
			
			[#-- 投资金额 --]
			$amount.val($investmentFrom.find("[name='amount']").val());
			$investmentAmount.text($amount.val());
			$password.val("");
			
			[#-- 确认投资 --]
			$.colorbox({
				href: "#investmentConfirmForm", 
				inline: true, 
				overlayClose: false
			});
			
		}
	});
	
	[#-- 取消投资确认 --]
	$investmentConfirmForm.find(".cancel").click(function() {
		$investmentConfirmForm.colorbox.close();
	});

	[#-- 发表评论 --]
	var $commentForm = $("#commentForm"), $commentFormSubmit = $commentForm.find(":submit");
	$commentFormSubmit.prop("disabled", false);
	$commentForm.validate({
		rules: {
			cont: {
				required: true,
				rangelength: [2,500] 
			}
		},
		messages: {
			cont: {
				required: "请输入评论内容",
				rangelength: "请输入2-500字的评论内容" 
			}
		},
		errorPlacement: function(error, element) {
			element.next().text(error.text());
		},
		unhighlight: function(element) {
			$(element).next().text("");
		},
		submitHandler: function(form) {
			$commentFormSubmit.prop("disabled", true);
			form.submit();
		}
	});
	
	[#-- 回复评论 --]
	var $commentReplyForm = $("#commentReplyForm"), $commentReplyFormSubmit = $commentReplyForm.find(":submit");
	$commentReplyFormSubmit.prop("disabled", false);
	$commentReplyForm.validate({
		rules: {
			cont: {
				required: true,
				rangelength: [2,500] 
			}
		},
		messages: {
			cont: {
				required: "请输入评论内容",
				rangelength: "请输入2-500字的评论内容" 
			}
		},
		errorPlacement: function(error, element) {
			element.next().text(error.text());
		},
		unhighlight: function(element) {
			$(element).next().text("");
		},
		submitHandler: function(form) {
			$commentReplyFormSubmit.prop("disabled", true);
			form.submit();
		}
	});
	
	[#-- 项目材料 --]
	$('#products').slides({
		preload: true,
		preloadImage: '${base}/resources/images/loading.gif?version=${setting.basic.siteVersion}',
		effect: 'slide, fade',
		crossfade: true,
		slideSpeed: 200,
		fadeSpeed: 500,
		generateNextPrev: true,
		generatePagination: false
	});

});