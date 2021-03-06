/*
 * Copyright 2010-2014 icl-network.com. All rights reserved.
 * Support: http://www.icl-network.com
 *
 * JavaScript - Pers Modif
 * Version: 3.0
 */
[#-- 索引URL --]
[#assign indexUrl = base + "/admin/pers" /]
$().ready(function() {
			
	[#-- 表单验证 --]
	var $inputForm = $("#inputForm");
	$inputForm.find(":submit").prop("disabled", false);
	$inputForm.validate({
		rules: {
			name: {
				pattern: /^[\u4e00-\u9fa5]+$/
			},
			idNo: {
				pattern: /^([1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3})|([1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}(x|X)))$/,
				remote: {
					url: "${indexUrl}/check_id_no",
					data: {"previousIdNo": previousIdNo},
					type: "post",
					cache: false
				}
			},
			email: {
				email: true,
				remote: {
					url: "${indexUrl}/check_email",
					data: {"previousEmail": previousEmail},
					type: "post",
					cache: false
				}
			},
			mobile: {
				pattern: /^1[3,5,8]\d{9}$/,
				remote: {
					url: "${indexUrl}/check_mobile",
					data: {"previousMobile": previousMobile},
					type: "post",
					cache: false
				}
			}
		},
		messages: {
			name: {
				pattern: "格式错误"
			},
			idNo: {
				pattern: "格式错误",
				remote: "已存在"
			},
			email: {
				remote: "已存在"
			},
			mobile: {
				remote: "已存在"
			}
		}
	});
	
	[#-- 地区选择 --]
	$("input.selectSascade").selectSascade({
		url: "${base}/admin/area/jsons",
		choose: "-"
	});
	
});