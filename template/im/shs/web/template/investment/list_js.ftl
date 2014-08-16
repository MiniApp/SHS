/*
 * Copyright 2010-2013 icl-network.com. All rights reserved.
 * Support: http://www.icl-network.com
 *
 * JavaScript - Project List
 * Version: 3.0
 */
$().ready(function() {

	[#-- 搜索项表单 --]
	var $searchForm = $("#searchForm");
	var $type = $("#type");
	var $rating = $("#rating");
	var $period = $("#period");
	$(".search .type").click(function(e) {
		e.preventDefault();
		$type.val($(this).attr("val"));
		$searchForm.submit();
	});
	$(".search .rating").click(function(e) {
		e.preventDefault();
		$rating.val($(this).attr("val"));
		$searchForm.submit();
	});
	$(".search .period").click(function(e) {
		e.preventDefault();
		$period.val($(this).attr("val"));
		$searchForm.submit();
	});

});