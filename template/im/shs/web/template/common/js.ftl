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

	[#-- 检测与切换登录效果 --]
	var $headerUsername = $("#headerUsername");
	var $headerUsernameText = $("#headerUsernameText");
	var $headerLogout = $("#headerLogout");
	var $headerRegister = $("#headerRegister");
	var $headerLogin = $("#headerLogin");
	var username = $.cookie("P2PUsername");
	if (username != null) {
		$headerUsernameText.text(username).show();
		$headerUsername.show();
		$headerLogout.show();
		$headerRegister.hide();
		$headerLogin.hide();
	}

	[#-- 检测登录 --]
	$.checkLogin = function() {
		var result = false;
		$.ajax({
			url: "${base}/login/check",
			type: "get",
			dataType: "json",
			cache: false,
			async: false,
			success: function(data) {
				result = data;
			}
		});
		return result;
	};

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
		
		[#-- 令牌状态: 限制访问 --]
		if (loginStatus == "accessDenied") {
			$.redirectLogin(location.href, "登录超时，请重新登录");
		} else if (tokenStatus == "accessDenied") {
			var token = getCookie("token");
			if (token != null) {
				$.extend(settings, {global: false, headers: {token: token}});
				$.ajax(settings);
			}
		}
		
	});
	
	[#-- FORM表单提交时，绑定令牌 --]
	$("form").submit(function() {
		var $this = $(this);
		var method = $this.prop("method");
		[#-- 请求方式非GET、未添加令牌时 --]
		if (method != null && method.toLowerCase() != "get" && $this.find("input[name=token]").size() == 0) {
			var token = $.cookie("token");
			if (token != null) {
				[#-- 绑定令牌 --]
				$this.append("<input type=\"hidden\" name=\"token\" value=\"" + token + "\" \/>");
			}
		}
	});
	
	[#-- 按钮倒计时禁用 --]
	$disableButton = function(button, seconds) {
		var previousValue = button.val();
		var className = button.attr("disableClassName");
		var promptValueSuffix = button.attr("disablePromptValueSuffix");
		var promptValue = seconds + "秒" + promptValueSuffix;
		button.prop("disabled", true);
		button.addClass(className);
		button.val(promptValue);
		intervalId = window.setInterval(function() {
			seconds -= 1;
			promptValue = seconds + "秒" + promptValueSuffix;
			button.val(promptValue);
			if(seconds == 0) {
				window.clearInterval(intervalId);
				button.prop("disabled", false);
				button.removeClass(className);
				button.val(previousValue);
			}
		}, 1000);
	};

});