/*
 * Copyright 2010-2013 icl-network.com. All rights reserved.
 * Support: http://www.icl-network.com
 *
 * JavaScript - Admin Edit
 * Version: 3.0
 */
[#-- 索引URL --]
[#assign indexUrl = base + "/admin/admin" /]
$().ready(function() {
			
	[#-- 表单验证 --]
	var $inputForm = $("#inputForm");
	$inputForm.find(":submit").prop("disabled", false);
	var $validate = $inputForm.validate({
		rules: {
			password: {
				pattern: /^[^\s&\"<>]+$/,
				minlength: 4,
				maxlength: 20
			},
			rePassword: {
				equalTo: "#password"
			},
			email: {
				required: true,
				email: true,
				remote: {
					url: "${indexUrl}/check_email",
					data: {"previousEmail": previousEmail},
					type: "post",
					cache: false
				}
			},
			roleIds: "required"
		},
		messages: {
			password: {
				pattern: "非法字符"
			},
			email: {
				remote: "已存在"
			}
		}
	});
	
	[#-- chosen 选择器 - 修复验证 --]
	var $chosenSelect = $(".chosen-select");
	$chosenSelect.change(function() {
		$validate.element(this);
	});
	
});