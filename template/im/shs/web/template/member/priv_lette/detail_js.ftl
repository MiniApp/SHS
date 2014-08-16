/*
 * Copyright 2010-2013 icl-network.com. All rights reserved.
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
			cont: "required"
		},
		messages: {
			cont: "请输入发送内容"
		},
		errorPlacement: function(error, element) {
			element.closest(".haveAcon_me_onE").find(".annotate").text(error.text());
		},
		unhighlight: function(element) {
			$(element).closest(".haveAcon_me_onE").find(".annotate").text("");
		},
		submitHandler: function(form) {
			$submit.prop("disabled", true);
			form.submit();
		}
	});

});