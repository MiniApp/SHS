/*
 * Copyright 2010-2014 icl-network.com. All rights reserved.
 * Support: http://www.icl-network.com
 *
 * JavaScript - Profile Setting
 * Version: 3.0
 */
[#-- 索引URL --]
[#assign indexUrl = base + "/admin/profile" /]
$().ready(function() {
			
	[#-- 表单验证 --]
	var $inputForm = $("#inputForm");
	$inputForm.find(":submit").prop("disabled", false);
	$inputForm.validate({
		rules: {
			currentPassword: {
				required: true,
				pattern: /^[^\s&\"<>]+$/,
				minlength: 4,
				maxlength: 20
			},
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
			}
		},
		messages: {
			currentPassword: {
				pattern: "非法字符"
			},
			password: {
				pattern: "非法字符"
			},
			email: {
				remote: "已存在"
			}
		}
	});
	
});