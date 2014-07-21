/*
 * Copyright 2010-2014 icl-network.com. All rights reserved.
 * Support: http://www.icl-network.com
 *
 * JavaScript - Member Bankcard Modify
 * Version: 3.0
 */
$().ready(function() {

	var $bankcardForm = $("#bankcardForm"), $submit = $bankcardForm.find(":submit"), $areaSelect = $("input.areaSelect");
	$submit.prop("disabled", false);
	
	[#-- 表单验证 --]
	$bankcardForm.validate({
		rules: {
			bank: "required",
			branchName: "required",
			locality: "required"
		},
		messages: {
			bank: "请选择开户银行",
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