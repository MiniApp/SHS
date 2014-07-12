/*
 * Copyright 2010-2013 icl-network.com. All rights reserved.
 * Support: http://www.icl-network.com
 *
 * JavaScript - Friend Link Edit
 * Version: 3.0
 */
[#-- 索引URL --]
[#assign indexUrl = base + "/admin/friend_link" /]
$().ready(function() {
    
	[#-- 表单验证 --]
	var $inputForm = $("#inputForm");
	$inputForm.find(":submit").prop("disabled", false);
	$inputForm.validate({
		rules: {
			name: {
				required: true,
				remote: {
					url: "${indexUrl}/" + friendLinkType + "/check_name",
					data: {"previousName": previousName},
					type: "post",
					cache: false
				}
			},
			url: {
				required: true,
				url: true
			},
			logoFile: {
				extension: "${setting.security.uploadImageExtension}"
			},
			order: "digits"
		},
		messages: {
			name: {
				remote: "已存在"
			}
		}
	});
	
});