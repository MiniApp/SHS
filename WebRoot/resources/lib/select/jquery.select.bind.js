/*
 * Copyright 2010-2014 icl-network.com. All rights reserved.
 * Support: http://www.icl-network.com
 * 
 * JavaScript - Select For Bind
 * Version: 3.0
 */

(function($) {
	$.fn.extend({
		selectBind: function(options) {
			var settings = {
				choose: "请选择...",
				emptyValue: "",
				url: null,
				type: "GET",
				target: null,
				changed: false
			};
			$.extend(settings, options);

			var cache = {};
			return this.each(function() {
				var $this = $(this);
				var masterId = $this.val();
				var $input = settings.target;
				var positionName = $input.attr("name") + "_select";
				
				addSelect($input, masterId, $input.val());
				$this.bind("change", function() {
					addSelect($input, $(this).val(), $input.val());
				});
				
				function addSelect($position, masterId, currentId) {
					$position.nextAll("div.col-sm-2." + positionName).remove();
					if ($position.is("div") && (masterId == null || masterId == "")) {
						return false;
					}
					if (cache[masterId] == null) {
						$.ajax({
							url: settings.url,
							type: settings.type,
							data: masterId != null ? {masterId: masterId} : null,
							dataType: "json",
							cache: false,
							async: false,
							success: function(data) {
								cache[masterId] = data;
							}
						});
					}
					var data = cache[masterId];
					var select = '<select>';
					if (settings.emptyValue != null && settings.choose != null) {
						select += '<option value="' + settings.emptyValue + '">' + settings.choose + '</option>';
					}
					$.each(data, function(value, name) {
						if(value == currentId) {
							select += '<option value="' + value + '" selected="selected">' + name + '</option>';
						} else {
							select += '<option value="' + value + '">' + name + '</option>';
						}
					});
					select += '</select>';
					$position = $('<div class="col-sm-2 ' + positionName + '"></div>').insertAfter($position);
					// chosen 选择器
					$(select).appendTo($position).chosen({
					    disable_search_threshold: 10,
					    placeholder_text_multiple: settings.choose,
					    placeholder_text_single: settings.choose,
					    no_results_text: "没有找到匹配的记录",
					    width: "100%"
					})
					// change 事件
					.bind("change", function() {
						var $this = $(this);
						if ($this.val() == "") {
							var $prevPositions = $this.parent().prev("div.col-sm-2." + positionName);
							if ($prevPositions.size() > 0) {
								$input.val($this.val());
							} else {
								$input.val(settings.emptyValue);
							}
						} else {
							$input.val($this.val());
						}
						if(settings.changed) {
							$input.change();							
						}
					});
					return $position;
				}
			});
			
		}
	});
})(jQuery);