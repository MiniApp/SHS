/*
 * Copyright 2010-2013 icl-network.com. All rights reserved.
 * Support: http://www.icl-network.com
 *
 * JavaScript - Bank Card Modif
 * Version: 3.0
 */
[#-- 索引URL --]
[#assign indexUrl = base + "/admin/bank_card_modif" /]
$().ready(function() {
    
	[#-- 表单验证 --]
	var $inputForm = $("#inputForm");
	var $bank = $("#bank");
	$inputForm.find(":submit").prop("disabled", false);
	var $validate = $inputForm.validate({
		rules: {
			bankId: "required",
			card: {
				required: true,
				digits: true,
				remote: {
					url: "${indexUrl}/check_card",
					data: {previousCard: previousCard},
					type: "post",
					cache: false
				}
			},
			opinion: "required"
		},
		messages: {
			card: {
				remote: "已存在"
			}
		}
	});
	
	[#-- 银行绑定支行 --]
	$("#bank").selectBind({
		url: "${base}/admin/bank_branch/jsons",
		choose: "-",
		target: $("#branch")
	});
	
	[#-- 地区选择 --]
	$("input.selectSascade.area").selectSascade({
		url: "${base}/admin/area/jsons",
		choose: "-",
		changed: true
	});
	
	[#-- 银行选择 - 修复验证 --]
	$bank.change(function(){
		$validate.element(this);
	});
	
});