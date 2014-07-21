/*
 * Copyright 2010-2014 icl-network.com. All rights reserved.
 * Support: http://www.icl-network.com
 *
 * JavaScript - Ad Position Add
 * Version: 3.0
 */
[#-- 索引URL --]
[#assign indexUrl = base + "/admin/ad_position" /]
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
			ident: {
				required: true,
				pattern: /^\w+$/,
				remote: {
					url: "${indexUrl}/check_ident",
					type: "post",
					cache: false
				}
			},
			width: {
				required: true,
				min: 0
			},
			height: {
				required: true,
				min: 0
			},
			template: "required"
		},
		messages: {
			name: {
				remote: "已存在"
			},
			ident: {
				pattern: "非法字符",
				remote: "已存在"
			}
		}
	});
	
});