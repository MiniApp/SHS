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
	space: "/admin",
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

// 获取数字（获取包含格式化字符串中的数字）
function getNumber(arg1) {
	if(typeof arg1 === "string") {
		return arg1.replace(/[^0-9]/g, "") * 1;
	}
	if(typeof arg1 === "number") {
		return arg1;
	}
	return 0;
};

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