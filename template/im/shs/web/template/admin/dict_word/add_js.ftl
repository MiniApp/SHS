/*
 * Copyright 2010-2013 icl-network.com. All rights reserved.
 * Support: http://www.icl-network.com
 *
 * JavaScript - Dict Word Add
 * Version: 3.0
 */
[#-- 索引URL --]
[#assign indexUrl = base + "/admin/dict_word" /]
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
					data: {dictId: typeof(dictId) == "undefined" ? "" : dictId},
					type: "post",
					cache: false
				}
			},
			param: "required",
			order: "digits"
		},
		messages: {
			name: {
				remote: "已存在"
			}
		}
	});
	
});