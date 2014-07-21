/*
 * Copyright 2010-2014 icl-network.com. All rights reserved.
 * Support: http://www.icl-network.com
 *
 * JavaScript - Investment Calculator
 * Version: 3.0
 */
$().ready(function() {
	
	[#-- 计算回收 --]
	var $statisticsPanel = $("#statisticsPanel"), $capitalInterests = $statisticsPanel.find(".capitalInterests"), $months = $statisticsPanel.find(".months"), $monthlyRate = $statisticsPanel.find(".monthlyRate"), $interests = $statisticsPanel.find(".interests"), $fees = $statisticsPanel.find(".fees"), $incomes = $statisticsPanel.find(".incomes");
	var $planPanel = $("#planPanel"), $planTable = $planPanel.find(".planTable");
	var monthlyRate = 0, feeRate = 0;

	[#-- 表单验证 --]
	var $calculatorForm = $("#calculatorForm"), $amount = $calculatorForm.find("[name='amount']"), $period = $calculatorForm.find("[name='period']"), $rate = $calculatorForm.find("[name='rate']"), $interestMethod = $calculatorForm.find("[name='interestMethod']"), $feeRate = $calculatorForm.find("[name='feeRate']");
	$calculatorForm.validate({
		rules: {
			amount: {
				required: true,
				digits: true,
				min: 3000,
				max: 2000000
			},
			period : {
				required: true,
				digits: true,
				min: 1,
				max: 36
			},
			rate : {
				required :true,
				number: true,
				min: 12,
				max: 24
			},
			interestMethod : "required",
			feeRate : {
				required :true,
				number: true,
				min: 0,
				max: 100
			}
		},
		messages: {
			amount: {
				required: "请输入3,000元-2,000,000元的投资金额",
				digits: "请输入3,000元-2,000,000元的投资金额",
				min: "请输入3,000元-2,000,000元的投资金额",
				max: "请输入3,000元-2,000,000元的投资金额"
			},
			period : {
				required: "请输入3月-36月的投资期限",
				digits: "请输入3月-36月的投资期限",
				min: "请输入3月-36月的投资期限",
				max: "请输入3月-36月的投资期限"
			},
			rate : {
				required: "请输入12%-24%的投资利率",
				number: "请输入12%-24%的投资利率",
				min: "请输入12%-24%的投资利率",
				max: "请输入12%-24%的投资利率"
			},
			interestMethod : "请选择回收方式",
			feeRate : {
				required: "请输入0%-100%的回收管理费率",
				number: "请输入0%-100%的回收管理费率",
				min: "请输入0%-100%的回收管理费率",
				max: "请输入0%-100%的回收管理费率"
			}
		},
		errorPlacement: function(error, element) {
			element.closest("tr").find(".color-one").text(error.text());
		},
		unhighlight: function(element) {
			$(element).closest("tr").find(".color-one").text("");
		},
		submitHandler: function(form) {
			
			[#-- 初始回收计划 --]
			$statisticsPanel.show();
			$planPanel.show();
			$planTable.find(".plan").remove();
			monthlyRate = $rate.val() / 12 / 100;
			feeRate = $feeRate.val() / 100;
			
			[#-- *** 计算回收 *** --]
			[#-- 每期等额本息 --]
			if($interestMethod.val() == "each_period_avg_capital_plus_interest") {
				$each_period_avg_capital_plus_interest($amount.val(), $period.val(), monthlyRate, feeRate);
			}
			[#-- 每期付息到期还本 --]
			else if($interestMethod.val() == "each_period_interest_and_last_period_plus_capital") {
				$each_period_interest_and_last_period_plus_capital($amount.val(), $period.val(), monthlyRate, feeRate);
			}
			[#-- 当期付息、每期付息、到期还本 --]
			else if($interestMethod.val() == "current_and_each_period_interest_and_last_period_capital") {
				$current_and_each_period_interest_and_last_period_capital($amount.val(), $period.val(), monthlyRate, feeRate);
			}
			[#-- 到期还本付息 --]
			else if($interestMethod.val() == "last_period_capital_plus_interest") {
				$last_period_capital_plus_interest($amount.val(), $period.val(), monthlyRate, feeRate);
			}
			
		}
	});
	
	[#-- 每期等额本息 --]
	$each_period_avg_capital_plus_interest = function(amount, period, rate, feeRate) {

        [#-- 月利率倍数 --]
        [#-- 1+i = 1+月利率 --]		
        var monthlyRateMultiples = 1 + rate;

        [#-- 每期本息 --]
        [#-- BX = a*i*(1+i)^N/[(1+i)^N-1] --]
        [#-- 每期本息 = [金额*月利率*(1+月利率)^总期数]/[(1+月利率)^总期数－1] --]
        var periodCapitalInterest = (amount * rate * Math.pow(monthlyRateMultiples, period)) / (Math.pow(monthlyRateMultiples, period) - 1);
		
		var remainingPrincipal = amount;
		var remainingInterest = floatSub(periodCapitalInterest * period, amount);
		var remainingFee = remainingInterest * feeRate;
		
		[#-- 回收统计 --]
		$capitalInterests.text(currency(floatAdd(remainingPrincipal, remainingInterest), true, true));
		$months.text(period);
		$monthlyRate.text(rate * 100);
		$interests.text(currency(remainingInterest, true, true));
		$fees.text(currency(remainingFee, true, true));
		$incomes.text(currency(floatSub(remainingInterest, remainingFee), true, true));
		
		for(var i = 1; i <= period; i++) {
		
	        [#-- 当期本金 --]
	        [#-- B = a*i*(1+i)^(n-1)/[(1+i)^N-1] --]
	        [#-- 当期本金 = 金额*月利率*(1+月利率)^(当期数-1)/[(1+月利率)^总期数-1] --]
	        var currentPrincipal = currency((i == period ? remainingPrincipal : amount * rate * Math.pow(monthlyRateMultiples, i - 1) / (Math.pow(monthlyRateMultiples, period) - 1)), false, false);
	        
            [#-- 当期利息 --]
            [#-- X = BX-B = a*i*(1+i)^N/[(1+i)^N-1] - a*i(1+i)^(n-1)/[(1+i)^N-1] --]
            [#-- 当期利息 = 每期本息 - 当期本金 --]
            var currentInterest = currency((i == period ? remainingInterest : floatSub(periodCapitalInterest, currentPrincipal)), false, false);
            
			var currentFee = currency((i == period ? remainingFee : currentInterest * feeRate), false, false);
			
			remainingPrincipal = floatSub(remainingPrincipal, currentPrincipal);
			remainingInterest = floatSub(remainingInterest, currentInterest);
			remainingFee = floatSub(remainingFee, currentFee);
			
			[@compress single_line = true]
				$planTable.append("<tr class=\"plan\">
					<td>" + i + "/" + period + "</td>
					<td>" + currency(floatAdd(currentPrincipal, currentInterest), true, true) + "</td>
					<td>" + currency(currentPrincipal, true, true) + "</td>
					<td>" + currency(currentInterest, true, true) + "</td>
					<td>" + currency(currentFee, true, true) + "</td>
					<td>" + currency(floatSub(currentInterest, currentFee), true, true) + "</td>
					<td>" + currency(remainingPrincipal, true, true) + "</td>
					<td>" + currency(remainingInterest, true, true) + "</td>
					<td>" + currency(remainingFee, true, true) + "</td>
				</tr>");
			[/@compress]
		}
	};
	
	[#-- 每期付息到期还本 --]
	$each_period_interest_and_last_period_plus_capital = function(amount, period, rate, feeRate) {
		var remainingPrincipal = amount;
		var remainingInterest = amount * rate * period;
		var remainingFee = remainingInterest * feeRate;
		
		[#-- 回收统计 --]
		$capitalInterests.text(currency(floatAdd(remainingPrincipal, remainingInterest), true, true));
		$months.text(period);
		$monthlyRate.text(rate * 100);
		$interests.text(currency(remainingInterest, true, true));
		$fees.text(currency(remainingFee, true, true));
		$incomes.text(currency(floatSub(remainingInterest, remainingFee), true, true));
		
		for(var i = 1; i <= period; i++) {
			var currentPrincipal = currency((i == period ? remainingPrincipal : 0), false, false);
			var currentInterest = currency((i == period ? remainingInterest : amount * rate), false, false);
			var currentFee = currency((i == period ? remainingFee : currentInterest * feeRate), false, false);

			remainingPrincipal = floatSub(remainingPrincipal, currentPrincipal);
			remainingInterest = floatSub(remainingInterest, currentInterest);
			remainingFee = floatSub(remainingFee, currentFee);			

			[@compress single_line = true]
				$planTable.append("<tr class=\"plan\">
					<td>" + i + "/" + period + "</td>
					<td>" + currency(floatAdd(currentPrincipal, currentInterest), true, true) + "</td>
					<td>" + currency(currentPrincipal, true, true) + "</td>
					<td>" + currency(currentInterest, true, true) + "</td>
					<td>" + currency(currentFee, true, true) + "</td>
					<td>" + currency(floatSub(currentInterest, currentFee), true, true) + "</td>
					<td>" + currency(remainingPrincipal, true, true) + "</td>
					<td>" + currency(remainingInterest, true, true) + "</td>
					<td>" + currency(remainingFee, true, true) + "</td>
				</tr>");
			[/@compress]
		}
	};
	
	[#-- 当期付息、每期付息、到期还本 --]
	$current_and_each_period_interest_and_last_period_capital = function(amount, period, rate, feeRate) {
		var remainingPrincipal = amount;
		var remainingInterest = amount * rate * period;
		var remainingFee = remainingInterest * feeRate;
		
		[#-- 回收统计 --]
		$capitalInterests.text(currency(floatAdd(remainingPrincipal, remainingInterest), true, true));
		$months.text(period);
		$monthlyRate.text(rate * 100);
		$interests.text(currency(remainingInterest, true, true));
		$fees.text(currency(remainingFee, true, true));
		$incomes.text(currency(floatSub(remainingInterest, remainingFee), true, true));
		
		period++;
		for(var i = 1; i <= period; i++) {
			var currentPrincipal = currency((i == period ? remainingPrincipal : 0), false, false);
			var currentInterest = currency((i < period - 1 ? amount * rate : remainingInterest), false, false);
			var currentFee = currency((i == period ? remainingFee : currentInterest * feeRate), false, false);
			
			remainingPrincipal = floatSub(remainingPrincipal, currentPrincipal);
			remainingInterest = floatSub(remainingInterest, currentInterest);
			remainingFee = floatSub(remainingFee, currentFee);
			
			[@compress single_line = true]
				$planTable.append("<tr class=\"plan\">
					<td>" + i + "/" + period + "</td>
					<td>" + currency(floatAdd(currentPrincipal, currentInterest), true, true) + "</td>
					<td>" + currency(currentPrincipal, true, true) + "</td>
					<td>" + currency(currentInterest, true, true) + "</td>
					<td>" + currency(currentFee, true, true) + "</td>
					<td>" + currency(floatSub(currentInterest, currentFee), true, true) + "</td>
					<td>" + currency(remainingPrincipal, true, true) + "</td>
					<td>" + currency(remainingInterest, true, true) + "</td>
					<td>" + currency(remainingFee, true, true) + "</td>
				</tr>");
			[/@compress]
		}
	};
	
	[#-- 到期还本付息 --]
	$last_period_capital_plus_interest = function(amount, period, rate, feeRate) {
		var remainingPrincipal = amount;
		var remainingInterest = amount * rate * period;
		var remainingFee = remainingInterest * feeRate;
		
		[#-- 回收统计 --]
		$capitalInterests.text(currency(floatAdd(remainingPrincipal, remainingInterest), true, true));
		$months.text(period);
		$monthlyRate.text(rate * 100);
		$interests.text(currency(remainingInterest, true, true));
		$fees.text(currency(remainingFee, true, true));
		$incomes.text(currency(floatSub(remainingInterest, remainingFee), true, true));
		
		period = 1;
		for(var i = 1; i <= period; i++) {
			var currentPrincipal = currency((i == period ? remainingPrincipal : 0), false, false);
			var currentInterest = currency((i == period ? remainingInterest : amount * rate), false, false);
			var currentFee = currency((i == period ? remainingFee : currentInterest * feeRate), false, false);
			
			remainingPrincipal = floatSub(remainingPrincipal, currentPrincipal);
			remainingInterest = floatSub(remainingInterest, currentInterest);
			remainingFee = floatSub(remainingFee, currentFee);
			
			[@compress single_line = true]
				$planTable.append("<tr class=\"plan\">
					<td>" + i + "/" + period + "</td>
					<td>" + currency(floatAdd(currentPrincipal, currentInterest), true, true) + "</td>
					<td>" + currency(currentPrincipal, true, true) + "</td>
					<td>" + currency(currentInterest, true, true) + "</td>
					<td>" + currency(currentFee, true, true) + "</td>
					<td>" + currency(floatSub(currentInterest, currentFee), true, true) + "</td>
					<td>" + currency(remainingPrincipal, true, true) + "</td>
					<td>" + currency(remainingInterest, true, true) + "</td>
					<td>" + currency(remainingFee, true, true) + "</td>
				</tr>");
			[/@compress]
		}
	};

});