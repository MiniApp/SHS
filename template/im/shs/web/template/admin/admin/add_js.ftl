/*
 * Copyright 2010-2013 icl-network.com. All rights reserved.
 * Support: http://www.icl-network.com
 *
 * JavaScript - Admin Add
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
			username: {
				required: true,
				pattern: /^[0-9a-z_A-Z\u4e00-\u9fa5]+$/,
				minlength: 2,
				maxlength: 20,
				remote: {
					url: "${indexUrl}/check_username",
					type: "post",
					cache: false
				}
			},
			password: {
				required: true,
				pattern: /^[^\s&\"<>]+$/,
				minlength: 4,
				maxlength: 20
			},
			rePassword: {
				required: true,
				equalTo: "#password"
			},
			email: {
				required: true,
				email: true,
				remote: {
					url: "${indexUrl}/check_email",
					type: "post",
					cache: false
				}
			},
			roleIds: "required"
		},
		messages: {
			username: {
				pattern: "非法字符",
				remote: "已存在"
			},
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