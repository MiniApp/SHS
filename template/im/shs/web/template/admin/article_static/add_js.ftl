/*
 * Copyright 2010-2013 icl-network.com. All rights reserved.
 * Support: http://www.icl-network.com
 *
 * JavaScript - Article Category Add
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
					data: {parentId: typeof(parentId) == "undefined" ? "" : parentId},
					type: "post",
					cache: false
				}
			},
			alias: {
				required: true,
				pattern: /^\w+$/,
				remote: {
					url: "${indexUrl}/check_alias",
					data: {parentId: typeof(parentId) == "undefined" ? "" : parentId},
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