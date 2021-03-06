/*
 * Copyright 2010-2014 icl-network.com. All rights reserved.
 * Support: http://www.icl-network.com
 * 
 * JavaScript - Select For Sascade
 * Version: 3.0
 */

(function($) {
	$.fn.extend({
		selectSascade: function(options) {
			var settings = {
				choose: "请选择...",
				emptyValue: "",
				url: null,
				type: "GET",
				changed: false
			};
			$.extend(settings, options);

			var cache = {};
			return this.each(function() {
				var $input = $(this);
				var id = $input.val();
				var treePath = $input.attr("treePath");
				var positionName = $input.attr("name") + "_select";
				
				if (treePath != null && treePath != "") {
					var ids = (treePath + id + ",").split(",");
					var $position = $input;
					for (var i = 1; i < ids.length; i ++) {
						$position = addSelect($position, ids[i - 1], ids[i]);
					}
				} else {
					addSelect($input, null, null);
				}
				
				function addSelect($position, parentId, currentId) {
					$position.nextAll("div.col-sm-2." + positionName).remove();
					if ($position.is("div") && (parentId == null || parentId == "")) {
						return false;
					}
					if (cache[parentId] == null) {
						$.ajax({
							url: settings.url,
							type: settings.type,
							data: parentId != null ? {parentId: parentId} : null,
							dataType: "json",
							cache: false,
							async: false,
							success: function(data) {
								cache[parentId] = data;
							}
						});
					}
					var data = cache[parentId];
					if ($.isEmptyObject(data)) {
						return false;
					}
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
						addSelect($position, $this.val(), null);
					});
					return $position;
				}
			});
			
		}
	});
})(jQuery);