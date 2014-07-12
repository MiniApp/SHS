/*
 * Copyright 2010-2013 icl-network.com. All rights reserved.
 * Support: http://www.icl-network.com
 *
 * JavaScript - Role Edit
 * Version: 3.0
 */
[#-- 索引URL --]
[#assign indexUrl = base + "/admin/role" /]
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
			}
		},
		messages: {
			name: {
				remote: "已存在"
			}
		}
	});
	
});