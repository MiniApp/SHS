/*
 * Copyright 2010-2014 icl-network.com. All rights reserved.
 * Support: http://www.icl-network.com
 *
 * JavaScript - Article Category Edit
 * Version: 3.0
 */
[#-- 索引URL --]
[#assign indexUrl = base + "/admin/article_category" /]
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
					data: {
						"parentId": typeof(parentId) == "undefined" ? "" : parentId,
						"previousName": previousName
					},
					type: "post",
					cache: false
				}
			},
			alias: {
				required: true,
				remote: {
					url: "${indexUrl}/check_alias",
					data: {
						"parentId": typeof(parentId) == "undefined" ? "" : parentId,
						"previousAlias": previousAlias
					},
					type: "post",
					cache: false
				}
			},
			template: "required",
			order: "digits"
		},
		messages: {
			name: {
				remote: "已存在"
			},
			alias: {
				pattern: "非法字符",
				remote: "已存在"
			}
		}
	});
	
});