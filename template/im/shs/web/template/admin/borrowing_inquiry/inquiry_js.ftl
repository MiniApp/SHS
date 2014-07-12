/*
 * Copyright 2010-2013 icl-network.com. All rights reserved.
 * Support: http://www.icl-network.com
 *
 * JavaScript - Borrowing Inquiry
 * Version: 3.0
 */
$().ready(function() {
    
	[#-- 表单验证 --]
	var $inputForm = $("#inputForm");
	$inputForm.find(":submit").prop("disabled", false);
	var $validate = $inputForm.validate({
		rules: {
			type: "required",
			title: "required",
			amount: {
				required: true,
				positive: true,
				decimal: {
					integer: 12,
					fraction: ${setting.security.amountScale}
				}
			},
			period: {
				required: true,
				integer: true,
				min: 1
			},
			interestRate: {
				required: true,
				positive: true,
				decimal: {
					integer: 2,
					fraction: 2
				}
			},
			description: "required",
			[#--
			borrowingDate: "required",
			borrowingCorp: "required",
			--]
			purpose: "required",
			repaymentInquiry: "required",
			guaranteeCapital: {
				required: true,
				number: true,
				min: 0,
				decimal: {
					integer: 12,
					fraction: ${setting.security.amountScale}
				}
			},
			riskAnalysis: "required",
			riskDegree: {
				required: true,
				number: true,
				min: 0,
				decimal: {
					integer: 2,
					fraction: 2
				}
			},
			creditRating: "required",
			investmentMethod: "required",
			investmentMinimum: {
				required: true,
				positive: true,
				decimal: {
					integer: 12,
					fraction: ${setting.security.amountScale}
				}
			},
			investmentMaximum: {
				number: true,
				min: 0,
				decimal: {
					integer: 12,
					fraction: ${setting.security.amountScale}
				}
			},
			investmentPeriod: {
				digits: true
			},
			lendingTime: "required",
			repaymentMethod: "required",
			prepaymentDefaultPeriod: {
				required: true,
				digits: true
			},
			prepaymentFeeRate: {
				required: true,
				number: true,
				min: 0,
				decimal: {
					integer: 2,
					fraction: 2
				}
			},
			feeRate: {
				required: true,
				number: true,
				min: 0,
				decimal: {
					integer: 2,
					fraction: 2
				}
			},
			repaymentFeeRate: {
				required: true,
				number: true,
				min: 0,
				decimal: {
					integer: 2,
					fraction: 2
				}
			},
			recoveryFeeRate: {
				required: true,
				number: true,
				min: 0,
				decimal: {
					integer: 2,
					fraction: 2
				}
			},
			overdueInterestRate: {
				required: true,
				number: true,
				min: 0,
				decimal: {
					integer: 2,
					fraction: 2
				}
			},
			overdueFeeRate: {
				required: true,
				number: true,
				min: 0,
				decimal: {
					integer: 2,
					fraction: 2
				}
			},
			seriousOverdueStartPeriod: {
				required: true,
				digits: true
			},
			seriousOverdueInterestRate: {
				required: true,
				number: true,
				min: 0,
				decimal: {
					integer: 2,
					fraction: 2
				}
			},
			seriousOverdueFeeRate: {
				required: true,
				number: true,
				min: 0,
				decimal: {
					integer: 2,
					fraction: 2
				}
			},
			state: "required",
			opinion: "required"
		}
	});
	
	[#-- chosen 选择器 - 修复验证 --]
	var $chosenSelect = $(".chosen-select");
	$chosenSelect.change(function() {
		$validate.element(this);
	});
	
	[#-- datetimepicker 日期选择器 - 修复验证 --]
	var $datetimepicker = $(".datetimepicker");
	$datetimepicker.change(function() {
		$validate.element(this);
	});
	
	[#-- 借款材料 --]
	[#include "/template/admin/borrowing_inquiry/inquiry/material_js.ftl" /]
	
});