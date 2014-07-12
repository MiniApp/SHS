/*
 * Copyright 2010-2013 icl-network.com. All rights reserved.
 * Support: http://www.icl-network.com
 *
 * JavaScript - Dict Edit
 * Version: 3.0
 */
[#-- 索引URL --]
[#assign indexUrl = base + "/admin/dict" /]
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
					data: {"previousName": previousName},
					type: "post",
					cache: false
				}
			},
			ident: {
				required: true,
				pattern: /^\w+$/,
				remote: {
					url: "${indexUrl}/check_ident",
					data: {"previousIdent": previousIdent},
					type: "post",
					cache: false
				}
			},
			order: "digits"
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