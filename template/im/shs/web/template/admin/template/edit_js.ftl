/*
 * Copyright 2010-2013 icl-network.com. All rights reserved.
 * Support: http://www.icl-network.com
 *
 * JavaScript - Friend Link Edit
 * Version: 3.0
 */
[#-- 索引URL --]
[#assign indexUrl = base + "/admin/template" /]
$().ready(function() {
    
	[#-- 表单验证 --]
	var $inputForm = $("#inputForm");
	$inputForm.find(":submit").prop("disabled", false);
	$inputForm.validate({
		rules: {
			cont: "required"
		}
	});
	
});