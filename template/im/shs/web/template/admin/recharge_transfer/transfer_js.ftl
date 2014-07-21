/*
 * Copyright 2010-2014 icl-network.com. All rights reserved.
 * Support: http://www.icl-network.com
 *
 * JavaScript - Recharge Transfer
 * Version: 3.0
 */
$().ready(function() {
    
	[#-- 表单验证 --]
	var $inputForm = $("#inputForm");
	$inputForm.find(":submit").prop("disabled", false);
	var $validate = $inputForm.validate({
		rules: {
			transferTime: "required",
			opinion: "required"
		}
	});
	
	[#-- datetimepicker 日期选择器 - 修复验证 --]
	var $datetimepicker = $(".datetimepicker");
	$datetimepicker.change(function() {
		$validate.element(this);
	});
	
	[#-- 选择转账状态 --]
	var $transferTime = $("#transferTime");
	var $transferTimeFormGroup = $transferTime.closest("div.form-group");
	$("#approved").change(function() {
		var $this = $(this);
		if($this.val() == "false") {
			$transferTime.addClass("ignore");
			$transferTimeFormGroup.removeClass("in");
		} else {
			$transferTime.removeClass("ignore");
			$transferTimeFormGroup.addClass("in");
		}
	});
	
});