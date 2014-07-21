/*
 * Copyright 2010-2014 icl-network.com. All rights reserved.
 * Support: http://www.icl-network.com
 *
 * JavaScript - Member Bankcard Add
 * Version: 3.0
 */
$().ready(function() {

	var $bankcardForm = $("#bankcardForm"), $submit = $bankcardForm.find(":submit"), $areaSelect = $("input.areaSelect");
	$submit.prop("disabled", false);
	
	[#-- 表单验证 --]
	$bankcardForm.validate({
		rules: {
			bank: "required",
			card: {
				required: true,
				minlength: 12,
				maxlength: 19,
				remote: {
					url: "${base}/account/bank_card/check_card",
					type: "post",
					cache: false
				}
			},
			branchName: "required",
			locality: "required"
		},
		messages: {
			bank: "请选择开户银行",
			card: {
				required: "请输入12-19位银行卡号",
				minlength: "请输入12-19位银行卡号",
				maxlength: "请输入12-19位银行卡号",
				remote: "银行卡号已存在"
			},
			branchName: "请输入开户支行",
			locality: "请选择支行地区"
		},
		errorPlacement: function(error, element) {
			element.closest("td").find(".annotate").text(error.text());
		},
		unhighlight: function(element) {
			$(element).closest("td").find(".annotate").text("");
		},
		submitHandler: function(form) {
			$submit.prop("disabled", true);
			form.submit();
		}
	});
	
	[#-- 地区选择菜单 --]
	$areaSelect.lSelect({
		url: "${base}/area/jsons"
	});

});