/*
 * Copyright 2010-2013 icl-network.com. All rights reserved.
 * Support: http://www.icl-network.com
 *
 * JavaScript - Bank Add
 * Version: 3.0
 */
[#-- 索引URL --]
[#assign indexUrl = base + "/admin/bank" /]
$().ready(function() {
			
	[#-- 表单验证 --]
	var $inputForm = $("#inputForm");
	$inputForm.find(":submit").prop("disabled", false);
	$inputForm.validate({
		rules: {
			name: {
				required: true,
				remote: {
					url: "${indexUrl}/check_name",
					type: "post",
					cache: false
				}
			},
			code: {
				required: true,
				pattern: /^\w+$/,
				remote: {
					url: "${indexUrl}/check_code",
					type: "post",
					cache: false
				}
			},
			logoFile: {
				extension: "${setting.security.uploadImageExtension}"
			},
			order: "digits"
		},
		messages: {
			name: {
				remote: "已存在"
			},
			code: {
				pattern: "非法字符",
				remote: "已存在"
			}
		}
	});
	
});