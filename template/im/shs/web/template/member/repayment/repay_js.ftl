/*
 * Copyright 2010-2013 icl-network.com. All rights reserved.
 * Support: http://www.icl-network.com
 *
 * JavaScript - Repay
 * Version: 3.0
 */
$().ready(function() {
	
	[#-- 还款确认 --]
	var $repaymentConfirmForm = $("#repaymentConfirmForm"), $repaymentPlan = $repaymentConfirmForm.find("[name='repaymentPlan']"), $password = $repaymentConfirmForm.find("[name='password']"), $repaymentConfirmFromSubmit = $repaymentConfirmForm.find(":submit"), rsaKey = new RSAKey();
	$repaymentConfirmFromSubmit.prop("disabled", false);
	rsaKey.setPublic(b64tohex(modulus), b64tohex(exponent));
	$repaymentConfirmForm.validate({
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
			$repaymentConfirmFromSubmit.prop("disabled", true);
			$password.val(hex2b64(rsaKey.encrypt($password.val())));
			form.submit();
		}
	});

	[#-- 还款期数 --]
	var $repaymentPeriods = $repaymentConfirmForm.find(".repaymentPeriod");
	[#-- 还款本息 --]
	var $repaymentCapitalInterests = $repaymentConfirmForm.find(".repaymentCapitalInterest");
	[#-- 还款逾期期限 --]
	var $repaymentOverduePeriods = $repaymentConfirmForm.find(".repaymentOverduePeriod");
	[#-- 还款逾期利息 --]
	var $repaymentOverdueInterests = $repaymentConfirmForm.find(".repaymentOverdueInterest");
	[#-- 还款服务费 --]
	var $repaymentFees = $repaymentConfirmForm.find(".repaymentFee");
	[#-- 还款计算金额 --]
	var $repaymentCountAmounts = $repaymentConfirmForm.find(".repaymentCountAmount");
	[#-- 还款计划日期 --]
	var $repaymentPlanDates = $repaymentConfirmForm.find(".repaymentPlanDate");
	
	[#-- 还款 --]
	$(".repay").click(function(e) {
		e.preventDefault();
		
		var $this = $(this);
		var $repaymentTr = $this.closest("tr");
		[#-- 还款参数 --]
		$repaymentPlan.val($this.attr("repaymentPlan"));
		$password.val("");
		[#-- 还款期数 --]
		$repaymentPeriods.text($repaymentTr.find(".repaymentPeriod").text());
		[#-- 还款本息 --]
		$repaymentCapitalInterests.text($repaymentTr.find(".repaymentCapitalInterest").text());
		[#-- 还款逾期期限 --]
		$repaymentOverduePeriods.text($repaymentTr.find(".repaymentOverduePeriod").text());
		[#-- 还款逾期利息 --]
		$repaymentOverdueInterests.text($repaymentTr.find(".repaymentOverdueInterest").text());
		[#-- 还款服务费 --]
		$repaymentFees.text($repaymentTr.find(".repaymentFee").text());
		[#-- 还款计算金额 --]
		$repaymentCountAmounts.text($repaymentTr.find(".repaymentCountAmount").text());
		[#-- 还款计划日期 --]
		$repaymentPlanDates.text($repaymentTr.find(".repaymentPlanDate").text());
	
		[#-- 还款确认 --]
		$.colorbox({
			href: "#repaymentConfirmForm", 
			inline: true, 
			overlayClose: false
		});
		
	});
	
	[#-- 取消还款确认 --]
	$repaymentConfirmForm.find(".cancel").click(function() {
		$repaymentConfirmForm.colorbox.close();
	});
	
});