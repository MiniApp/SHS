/*
 * Copyright 2010-2013 icl-network.com. All rights reserved.
 * Support: http://www.icl-network.com
 * 
 * JavaScript - Common
 * Version: 3.0
 */

[#-- 设置属性 --]
var setting = {
	base: "${base}",
	space: "/admin",
	locale: "${locale}",
	currencyScale: "${setting.currencyScale}",
	currencyRoundType: "${setting.currencyRoundType}",
	currencySign: "${setting.currencySign}",
	currencyUnit: "${setting.currencyUnit}",
	uploadImageExtension: "${setting.security.uploadImageExtension}",
	uploadFlashExtension: "${setting.security.uploadFlashExtension}",
	uploadMediaExtension: "${setting.security.uploadMediaExtension}",
	uploadFileExtension: "${setting.security.uploadFileExtension}"
};

[#-- 货币格式化 --]
function currency(value, showSign, showUnit) {
	if (value != null) {
		var currency;
		if (setting.currencyRoundType == "roundHalfUp") {
			currency = (Math.round(value * Math.pow(10, setting.currencyScale)) / Math.pow(10, setting.currencyScale)).toFixed(setting.currencyScale);
		} else if (setting.currencyRoundType == "roundUp") {
			currency = (Math.ceil(value * Math.pow(10, setting.currencyScale)) / Math.pow(10, setting.currencyScale)).toFixed(setting.currencyScale);
		} else {
			currency = (Math.floor(value * Math.pow(10, setting.currencyScale)) / Math.pow(10, setting.currencyScale)).toFixed(setting.currencyScale);
		}
		if (showSign) {
			currency = setting.currencySign + currency;
		}
		if (showUnit) {
			currency += setting.currencyUnit;
		}
		return currency;
	}
}

$().ready(function() {

	[#-- 元素 --]
	var $document = $(document);
	
	[#-- AJAX提交时，绑定令牌 --]
	$document.ajaxSend(function(event, request, settings) {
		[#-- 非跨领域、请求方式非GET时 --]
		if (!settings.crossDomain && settings.type != null && settings.type.toLowerCase() != "get") {
			var token = $.cookie("token");
			if (token != null) {
				[#-- 绑定令牌 --]	
				request.setRequestHeader("token", token);
			}
		}
	});
	
	[#-- AJAX请求完成后，反馈登录状态 --]
	$document.ajaxComplete(function(event, request, settings) {
		var loginStatus = request.getResponseHeader("loginStatus");
		var tokenStatus = request.getResponseHeader("tokenStatus");
		
		[#-- 登录状态: 限制访问 --]
		if (loginStatus == "accessDenied") {
			$messenger.post({type: "error", message: "登录超时，请重新登录", showCloseButton: true});
			setTimeout(function() { location.reload(true); }, 2000);
		}
		[#-- 登录状态: 无权限 --] 
		else if (loginStatus == "unauthorized") {
			$messenger.post({type: "error", message: "对不起，您无此操作权限", showCloseButton: true});
		}
		[#-- 令牌状态: 限制访问 --] 
		else if (tokenStatus == "accessDenied") {
			var token = $.cookie("token");
			if (token != null) {
				[#-- 绑定令牌后重新发送AJAX请求 --]
				$.extend(settings, {global: false, headers: {token: token}});
				$.ajax(settings);
			}
		}
	});
	
	[#-- FORM表单提交时，绑定令牌 --]
	$("form").submit(function() {
		var $this = $(this);
		var method = $this.attr("method");
		[#-- 请求方式非GET、未添加令牌时 --]
		if (method != null && method.toLowerCase() != "get" && $this.find("input[name=token]").size() == 0) {
			var token = $.cookie("token");
			if (token != null) {
				[#-- 绑定令牌 --]
				$this.append("<input type=\"hidden\" name=\"token\" value=\"" + token + "\" \/>");
			}
		}
	});
	
	[#-- 选择图片 --]
	$document.on("change", ".input-file .input-group-btn input:file", function(e) {
		var $this = $(this);
		var $inputFile = $this.closest(".input-file");
		$inputFile.find(".file-name").val($this.val());
	});

});