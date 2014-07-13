/*
 * Copyright 2010-2013 icl-network.com. All rights reserved.
 * Support: http://www.icl-network.com
 *
 * JavaScript - jQuery Validate Common
 * Version: 3.0
 */

$().ready(function() {
	
	// 验证消息
	if($.validator != null) {
		$.extend($.validator.messages, {
		    required: "必填",
			email: "邮箱格式错误",
			url: "网址格式错误",
			date: "日期格式错误",
			dateISO: "日期格式错误",
			pointcard: "信用卡格式错误",
			number: "只允许输入数字",
			digits: "只允许输入零或正整数",
			minlength: $.validator.format("长度不允许小于{0}"),
			maxlength: $.validator.format("长度不允许大于{0}"),
			rangelength: $.validator.format("长度必须在{0}-{1}之间"),
			min: $.validator.format("不允许小于{0}"),
			max: $.validator.format("不允许大于{0}"),
			range: $.validator.format("必须在{0}-{1}之间"),
			accept: "输入后缀错误",
			equalTo: "两次输入不一致",
			remote: "输入错误",
			integer: "只允许输入整数",
			positive: "只允许输入正数",
			negative: "只允许输入负数",
			decimal: "数值超出了允许范围",
			pattern: "格式错误",
			extension: "文件格式错误"
		});
		
		$.validator.setDefaults({
			errorClass: "col-sm-4 errorMessage",
			ignore: ".ignore",
			ignoreTitle: true,
			errorPlacement: function(error, element) {
				error.appendTo(element.closest("div.form-group"));
			},
			highlight: function(element) {
				$(element).closest("div.form-group").addClass("fieldError");
			},
			unhighlight: function(element) {
				var $element = $(element);
				if(!$element.hasClass("ignore")) {
					$element.closest("div.form-group").removeClass("fieldError");
				}
			},
			submitHandler: function(form) {
				$(form).find(":submit").prop("disabled", true);
				form.submit();
			}
		});
		
	}
	
});