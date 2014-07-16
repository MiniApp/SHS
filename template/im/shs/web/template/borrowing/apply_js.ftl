/*
 * Copyright 2010-2013 icl-network.com. All rights reserved.
 * Support: http://www.icl-network.com
 *
 * JavaScript - Borrowing
 * Version: 3.0
 */
$().ready(function() {

	var $borrowingFrom = $("#borrowingFrom"), $submit = $borrowingFrom.find(":submit");
	$submit.prop("disabled", false);
	
	[#-- 表单验证 --]
	$borrowingFrom.validate({
		rules: {
			amount: {
				required: true,
				digits: true,
				min: 3000,
				max: 2000000
			},
			period:  {
				required: true,
				digits: true,
				min: 1,
				max: 36
			},
			interestRate:  {
				required :true,
				number: true,
				min: 12,
				max: 24
			},
			description: {
				required: true,
				rangelength: [2,500] 
			},
			agreement: "required"
		},
		messages: {
			amount: {
				required: "请输入3,000元-2,000,000元的借款金额",
				digits: "请输入3,000元-2,000,000元的借款金额",
				min: "请输入3,000元-2,000,000元的借款金额",
				max: "请输入3,000元-2,000,000元的借款金额"
			},
			period:  {
				required: "请输入3月-36月的借款期限",
				digits: "请输入3月-36月的借款期限",
				min: "请输入3月-36月的借款期限",
				max: "请输入3月-36月的借款期限"
			},
			interestRate:  {
				required: "请输入12%-24%的借款利率",
				number: "请输入12%-24%的借款利率",
				min: "请输入12%-24%的借款利率",
				max: "请输入12%-24%的借款利率"
			},
			description: {
				required: "请输入借款描述",
				rangelength: "请输入2-500字的借款描述" 
			},
			agreement: "请先阅读《借款协议》并确认同意"
		},
		errorPlacement: function(error, element) {
			element.closest("li").find(".form-remark").text(error.text());
		},
		unhighlight: function(element) {
			$(element).closest("li").find(".form-remark").text("");
		},
		submitHandler: function(form) {
			$submit.prop("disabled", true);
			form.submit();
		}
	});

});