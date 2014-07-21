/*
 * Copyright 2010-2014 icl-network.com. All rights reserved.
 * Support: http://www.icl-network.com
 *
 * JavaScript - Borrowing Confirm
 * Version: 3.0
 */
$().ready(function() {
    
	[#-- 表单验证 --]
	var $inputForm = $("#inputForm");
	$inputForm.find(":submit").prop("disabled", false);
	var $validate = $inputForm.validate({
		rules: {
			state: "required",
			opinion: "required"
		}
	});
	
	[#-- chosen 选择器 - 修复验证 --]
	var $chosenSelect = $(".chosen-select");
	$chosenSelect.change(function() {
		$validate.element(this);
	});
	
});