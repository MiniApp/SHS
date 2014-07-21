/*
 * Copyright 2010-2014 icl-network.com. All rights reserved.
 * Support: http://www.icl-network.com
 *
 * JavaScript - jQuery Validate Hint Common
 * Version: 3.0
 */

$().ready(function() {
	
	// 验证消息
	if($.validator != null) {
		
		$.validator.setDefaults({
			highlight: function(element) {
				var $formGroup = $(element).closest("div.form-group");
				$formGroup.addClass("fieldError");
				$tabHint.show($formGroup.closest("div.tab-pane").attr("tab-id"));
			},
			unhighlight: function(element) {
				var $formGroup = $(element).closest("div.form-group");
				$formGroup.removeClass("fieldError");
				var $tabPan = $formGroup.closest("div.tab-pane");
				if(!$tabPan.find("div.form-group.fieldError").length) {
					$tabHint.hide($tabPan.attr("tab-id"));
				}
			}
		});
		
	}
	
});