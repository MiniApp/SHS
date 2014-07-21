/*
 * Copyright 2010-2014 icl-network.com. All rights reserved.
 * Support: http://www.icl-network.com
 *
 * JavaScript - Member Withdrawal
 * Version: 3.0
 */
$().ready(function() {
	
	var $withdrawalForm = $("#withdrawalForm"), $submit = $withdrawalForm.find(":submit"), rsaKey = new RSAKey();
	var [#--$paymentPlugin = $("#paymentPlugin"), --]$bankCard = $("#bankCard"), $amount = $("#amount"), $password = $withdrawalForm.find("[name='password']");
	$submit.prop("disabled", false);
	rsaKey.setPublic(b64tohex(modulus), b64tohex(exponent));
	$amount.val("");
	$password.val("");
	
	[#-- 表单验证 --]
	var $validate = $withdrawalForm.validate({
		rules: {
			amount: {
				required: true,
				positive: true,
				decimal: {
					integer: 12,
					fraction: ${setting.security.amountScale}
				},
				remote: {
					url: "${base}/account/withdrawal/check_balance",
					[#--
					data: {paymentPlugin: $paymentPlugin.val()},
					--]
					type: "post",
					cache: false
				}
			},
			[#--
			paymentPlugin: "required",
			--]
			bankCard: "required",
			password: "required"
		},
		messages: {
			amount: {
				required: "请输入提现金额",
				positive: "提现金额必须为正整数",
				decimal: "提现金额必须为正整数",
				remote: "可用余额不足"
			},
			[#--
			paymentPlugin: "请选择支付方式",
			--]
			password: "请输入支付密码"
		},
		errorPlacement: function(error, element) {
			element.closest("td").find(".annotate").text(error.text());
		},
		unhighlight: function(element) {
			$(element).closest("td").find(".annotate").text("");
		},
		submitHandler: function(form) {
			$submit.prop("disabled", true);
			$password.val(hex2b64(rsaKey.encrypt($password.val())));
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
			if ($validate.element($amount)[#-- && $validate.element($paymentPlugin)--]) {
				$.ajax({
					url: "${base}/account/withdrawal/calculate_fee",
					type: "POST",
					data: {[#--paymentPlugin: $paymentPlugin.val(), --]amount: $amount.val()},
					dataType: "json",
					cache: false,
					success: function(data) {
						$fee.text(data.fee);
						$paymentAmout.text(data.amount);
					}
				});
			} else {
				$fee.text("0.00");
				$paymentAmout.text("0.00");
			}
		}, 500);
	};
	
	[#-- 选择银行卡 --]
	$(".bankCards").click(function() {
		$bankCard.val($(this).attr("val"));
	});

});