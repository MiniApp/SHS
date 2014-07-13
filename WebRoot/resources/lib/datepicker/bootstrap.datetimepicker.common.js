/*
 * Copyright 2010-2013 icl-network.com. All rights reserved.
 * Support: http://www.icl-network.com
 *
 * JavaScript - Bootstrap DatetimePicker Common
 * Version: 3.0
 */

$().ready(function() {
	
	$(".datetimepicker-yyyy").datetimepicker({
		language: "zh-CN",
		weekStart: 1,
		autoclose: 1,
		startView: 4,
		minView: 4,
		forceParse: 0,
		format: "yyyy"
	});
	
	$(".datetimepicker-yyyy-MM").datetimepicker({
		language: "zh-CN",
		weekStart: 1,
		autoclose: 1,
		startView: 3,
		minView: 3,
		forceParse: 0,
		format: "yyyy-mm"
	});
	
	$(".datetimepicker-yyyy-MM-dd").datetimepicker({
		language: "zh-CN",
		weekStart: 1,
		autoclose: 1,
		startView: 2,
		minView: 2,
		forceParse: 0,
		format: "yyyy-mm-dd",
		todayBtn: true
	});
	
	$(".datetimepicker-yyyy-MM-dd-HH-mm").datetimepicker({
		language: "zh-CN",
		weekStart: 1,
		autoclose: 1,
		startView: 2,
		minView: 0,
		forceParse: 0,
		format: "yyyy-mm-dd hh:ii:ss",
		todayBtn: true
	});
	
});