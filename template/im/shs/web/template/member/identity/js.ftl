/*
 * Copyright 2010-2014 icl-network.com. All rights reserved.
 * Support: http://www.icl-network.com
 *
 * JavaScript - Member Identity
 * Version: 3.0
 */
$().ready(function() {

	var $identityForm = $("#identityForm"), $submit = $identityForm.find(":submit");
	$submit.prop("disabled", false);
	
	[#-- 表单验证 --]
	$identityForm.validate({
		rules: {
			name: {
				required:true,
				pattern: /^[\u4e00-\u9fa5]+$/
			},
			idNo: {
				required:true,
				pattern: /^([1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3})|([1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}(x|X)))$/,
				remote: {
					url: "${base}/account/identity/check",
					type: "post",
					cache: false
				}
			}
		},
		messages: {
			name: {
				required: "输入姓名",
				pattern: "格式错误"
			},
			idNo: {
				required:"请输入15-18位身份证号码",
				pattern: "请输入15-18位身份证号码",
				remote: "身份证号码已存在"
			}
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