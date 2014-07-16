/*
 * Copyright 2010-2013 icl-network.com. All rights reserved.
 * Support: http://www.icl-network.com
 *
 * JavaScript - Assignment Inquiry
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
				positiveInteger: true
			},
			interestRate: {
				required: true,
				positive: true,
				decimal: {
					integer: 2,
					fraction: 3
				}
			},
			description: "required",
			[#--
			borrowingDate: "required",
			borrowingCorp: "required",
			purpose: "required",
			repaymentInquiry: "required",
			--]
			guaranteeCapital: {
				required: true,
				nonnegativeNumber: true,
				decimal: {
					integer: 12,
					fraction: ${setting.security.amountScale}
				}
			},
			[#--
			riskAnalysis: "required",
			--]
			riskDegree: {
				required: true,
				nonnegativeNumber: true,
				decimal: {
					integer: 2,
					fraction: 3
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
				positive: true,
				decimal: {
					integer: 12,
					fraction: ${setting.security.amountScale}
				}
			},
			investmentPeriod: {
				positiveInteger: true
			},
			assignationTime: "required",
			buybackMethod: "required",
			prebuybackFeeRate: {
				required: true,
				nonnegativeNumber: true,
				decimal: {
					integer: 2,
					fraction: 3
				}
			},
			feeRate: {
				required: true,
				nonnegativeNumber: true,
				decimal: {
					integer: 2,
					fraction: 3
				}
			},
			buybackFeeRate: {
				required: true,
				nonnegativeNumber: true,
				decimal: {
					integer: 2,
					fraction: 3
				}
			},
			recoveryFeeRate: {
				required: true,
				nonnegativeNumber: true,
				decimal: {
					integer: 2,
					fraction: 3
				}
			},
			overdueInterestRate: {
				required: true,
				nonnegativeNumber: true,
				decimal: {
					integer: 2,
					fraction: 3
				}
			},
			seriousOverdueStartPeriod: {
				required: true,
				positiveInteger: true
			},
			seriousOverdueInterestRate: {
				required: true,
				nonnegativeNumber: true,
				decimal: {
					integer: 2,
					fraction: 3
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
	[#include "/admin/borrowing_inquiry/inquiry/material_js.ftl" /]
	
});