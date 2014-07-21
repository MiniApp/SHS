/*
 * Copyright 2010-2014 icl-network.com. All rights reserved.
 * Support: http://www.icl-network.com
 *
 * JavaScript - Bank Branch Edit
 * Version: 3.0
 */
[#-- 索引URL --]
[#assign indexUrl = base + "/admin/bank_branch" /]
$().ready(function() {
    
	[#-- 表单验证 --]
	var $inputForm = $("#inputForm");
	var $locality = $("#locality");
	$inputForm.find(":submit").prop("disabled", false);
	var $validate = $inputForm.validate({
		rules: {
			name: {
				required: true,
				remote: {
					url: "${indexUrl}/check_name",
					data: {
						"bankId": typeof(bankId) == "undefined" ? "" : bankId,
						"previousName": previousName
					},
					type: "post",
					cache: false
				}
			},
			localityId: "required",
			order: "digits"
		},
		messages: {
			name: {
				remote: "已存在"
			}
		}
	});
	
	[#-- 地区选择 --]
	$("input.selectSascade.area").selectSascade({
		url: "${base}/admin/area/jsons",
		choose: "-",
		changed: true
	});
	
	[#-- 地区选择 - 修复验证 --]
	$locality.change(function(){
		$validate.element(this);
	});
	
});