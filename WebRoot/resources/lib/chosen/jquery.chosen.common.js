/*
 * Copyright 2010-2014 icl-network.com. All rights reserved.
 * Support: http://www.icl-network.com
 *
 * JavaScript - jQuery Chosen Common
 * Version: 3.0
 */

$().ready(function() {
	var $chosenSelect = $(".chosen-select");
	$chosenSelect.chosen({
	    disable_search_threshold: 10,
	    placeholder_text_multiple: "请选择...",
	    placeholder_text_single: "请选择...",
	    no_results_text: "没有找到匹配的记录",
	    width: "100%"
	});
});