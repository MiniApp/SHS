/*
 * Copyright 2010-2014 icl-network.com. All rights reserved.
 * Support: http://www.icl-network.com
 * 
 * JavaScript - Common
 * Version: 3.0
 */

[#-- 设置属性 --]
var setting = {
	base: "${base}",
	locale: "${locale}",
	currencyScale: "${setting.security.amountScale}",
	currencyRoundType: "${setting.security.amountRoundMethod}",
	currencySign: "${setting.security.currencySign}",
	currencyUnit: "${setting.security.currencyUnit}",
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

[#-- 添加收藏夹 --]
function addFavorite(url, title) {
	if (document.all) {
		window.external.addFavorite(url, title);
	} else if (window.sidebar) {
		window.sidebar.addPanel(title, url, "");
	}
}

[#-- html字符串转义 --]
function htmlEscape(htmlString) {
    htmlString = htmlString.replace(/&/g, '&amp;');
    htmlString = htmlString.replace(/'/g, '&acute;');
    htmlString = htmlString.replace(/"/g, '&quot;');
    htmlString = htmlString.replace(/\|/g, '&brvbar;');
    htmlString = htmlString.replace(/</g, '&lt;');
    htmlString = htmlString.replace('script', '&#x73;cript');
    htmlString = htmlString.replace(/>/g, '&gt;');
    return htmlString;
}

[#-- 设置Cookie --]
function setCookie(name, value) {
	var expires = (arguments.length > 2) ? arguments[2] : null;
	document.cookie = name + "=" + encodeURIComponent(value) + ((expires == null) ? "" : ("; expires=" + expires.toGMTString())) + ";path=" + setting.base;
}

[#-- 获取Cookie --]
function getCookie(name) {
	var value = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
	if (value != null) {
		return decodeURIComponent(value[2]);
 	} else {
		return null;
	}
}

[#-- 删除cookie --]
function removeCookie(name) {
	var expires = new Date();
	expires.setTime(expires.getTime() - 1000 * 60);
	setCookie(name, "", expires);
}

[#-- 浮点数加法运算 --]
function floatAdd(arg1, arg2) {
	var r1, r2, m;
	try{
		r1 = arg1.toString().split(".")[1].length;
	} catch(e) {
		r1 = 0;
	}
	try {
		r2 = arg2.toString().split(".")[1].length;
	} catch(e) {
		r2 = 0;
	}
	m = Math.pow(10, Math.max(r1, r2));
	return (arg1 * m + arg2 * m) / m;
}

[#-- 浮点数减法运算 --]
function floatSub(arg1, arg2) {
	var r1, r2, m, n;
	try {
		r1 = arg1.toString().split(".")[1].length;
	} catch(e) {
		r1 = 0;
	}
	try {
		r2 = arg2.toString().split(".")[1].length;
	} catch(e) {
		r2 = 0;
	}
	m = Math.pow(10, Math.max(r1, r2));
	n = (r1 >= r2) ? r1 : r2;
	return ((arg1 * m - arg2 * m) / m).toFixed(n);
}

[#-- 浮点数乘法运算 --]
function floatMul(arg1, arg2) {    
	var m = 0, s1 = arg1.toString(), s2 = arg2.toString();
	try {
		m += s1.split(".")[1].length;
	} catch(e) {}
	try {
		m += s2.split(".")[1].length;
	} catch(e) {}
	return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
}

[#-- 浮点数除法运算 --]
function floatDiv(arg1, arg2) {
	var t1 = 0, t2 = 0, r1, r2;    
	try {
		t1 = arg1.toString().split(".")[1].length;
	} catch(e) {}
	try {
		t2 = arg2.toString().split(".")[1].length;
	} catch(e) {}
	with(Math) {
		r1 = Number(arg1.toString().replace(".", ""));
		r2 = Number(arg2.toString().replace(".", ""));
		return (r1 / r2) * pow(10, t2 - t1);
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