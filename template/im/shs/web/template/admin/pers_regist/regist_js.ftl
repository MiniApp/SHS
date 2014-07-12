/*
 * Copyright 2010-2013 icl-network.com. All rights reserved.
 * Support: http://www.icl-network.com
 *
 * JavaScript - Pers Regist
 * Version: 3.0
 */
[#-- 索引URL --]
[#assign indexUrl = base + "/admin/pers_regist" /]
$().ready(function() {
			
	[#-- 表单验证 --]
	var $inputForm = $("#inputForm");
	$inputForm.find(":submit").prop("disabled", false);
	$inputForm.validate({
		rules: {
			username: {
				required: true,
				pattern: /^[0-9a-z_A-Z\u4e00-\u9fa5]+$/,
				minlength: ${setting.security.usernameMinLength},
				maxlength: ${setting.security.usernameMaxLength},
				remote: {
					url: "${indexUrl}/check_username",
					type: "post",
					cache: false
				}
			},
			password: {
				required: true,
				pattern: /^[^\s&\"<>]+$/,
				minlength: ${setting.security.passwordMinLength},
				maxlength: ${setting.security.passwordMaxLength}
			},
			rePassword: {
				required: true,
				equalTo: "#password"
			},
			name: {
				pattern: /^[\u4e00-\u9fa5]+$/
			},
			idNo: {
				pattern: /^([1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3})|([1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}(x|X)))$/,
				remote: {
					url: "${indexUrl}/check_id_no",
					type: "post",
					cache: false
				}
			},
			email: {
				email: true,
				remote: {
					url: "${indexUrl}/check_email",
					type: "post",
					cache: false
				}
			},
			mobile: {
				pattern: /^1[3,5,8]\d{9}$/,
				remote: {
					url: "${indexUrl}/check_mobile",
					type: "post",
					cache: false
				}
			},
			opinion: "required"
		},
		messages: {
			username: {
				pattern: "非法字符",
				remote: "已存在"
			},
			password: {
				pattern: "非法字符"
			},
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