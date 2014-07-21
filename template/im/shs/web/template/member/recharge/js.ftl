/*
 * Copyright 2010-2014 icl-network.com. All rights reserved.
 * Support: http://www.icl-network.com
 *
 * JavaScript - Member Recharge
 * Version: 3.0
 */
$().ready(function() {
	
	var $rechargeForm = $("#rechargeForm"), $submit = $rechargeForm.find(":submit");
	var $paymentPlugin = $("#paymentPlugin"), $amount = $("#amount");
	$submit.prop("disabled", false);
	$amount.val("");
	
	[#-- 表单验证 --]
	$rechargeForm.validate({
		rules: {
			amount: {
				required: true,
				positive: true,
				decimal: {
					integer: 12,
					fraction: ${setting.security.amountScale}
				}
			},
			paymentPlugin: "required"
		},
		messages: {
			amount: {
				required: "请输入充值金额",
				positive: "充值金额必须为正整数",
				decimal: "充值金额必须为正整数"
			},
			paymentPlugin: "请选择支付方式"
		},
		errorPlacement: function(error, element) {
			element.next().text(error.text());
		},
		unhighlight: function(element) {
			$(element).next().text("");
		},
		submitHandler: function(form) {
			$submit.prop("disabled", true);
			[#-- 充值提示 --]
			$.colorbox({
				href: "#rechargePrompt", 
				inline: true, 
				overlayClose: false
			});
			form.submit();
		}
	});

	[#-- 充值金额 --]
	$amount.bind("input propertychange change", function(event) {
		if (event.type != "propertychange" || event.originalEvent.propertyName == "value") {
			$calculateFee();
		}
	});
	
	[#-- 计算服务费、实际金额 --]
	var $fee = $("#fee");
	var $paymentAmout = $("#paymentAmout");
	var timeout;
	$calculateFee = function() {
		clearTimeout(timeout);
		timeout = setTimeout(function() {
			$.ajax({
				url: "${base}/account/recharge/calculate_fee",
				type: "POST",
				data: {paymentPlugin: $paymentPlugin.val(), amount: $amount.val()},
				dataType: "json",
				cache: false,
				success: function(data) {
					$fee.text(data.fee);
					$paymentAmout.text(data.amount);
				}
			});
		}, 500);
	};
	
	[#-- 检查余额 --]
	$checkBalance = function() {
		setInterval(function() {
			$.ajax({
				url: "${base}/account/recharge/check_balance",
				type: "POST",
				dataType: "json",
				cache: false,
				success: function(data) {
					if (data.balance > available) {
						location.href = "capital";
					}
				}
			});
		}, 10000);
	};
	
	[#-- 检查支付 --]
	$checkPayment = function() {
		setInterval(function() {
			$.ajax({
				url: "${base}/payment/verify",
				type: "POST",
				dataType: "json",
				cache: false,
				success: function(result) {
					if (result) {
						location.href = "capital";
					}
				}
			});
		}, 10000);
	};

});