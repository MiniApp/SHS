/*
 * Copyright 2010-2014 icl-network.com. All rights reserved.
 * Support: http://www.icl-network.com
 *
 * JavaScript - Member PrivLette Send
 * Version: 3.0
 */
$().ready(function() {

	var $privLetteForm = $("#privLetteForm"), $submit = $privLetteForm.find(":submit");
	$submit.prop("disabled", false);
	
	[#-- 表单验证 --]
	$privLetteForm.validate({
		rules: {
			receiver: "required",
			cont: "required"
		},
		messages: {
			receiver: "请输入收信人昵称",
			cont: "请输入发送内容"
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

});