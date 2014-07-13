/*
 * Copyright 2010-2013 icl-network.com. All rights reserved.
 * Support: http://www.icl-network.com
 * 
 * JavaScript - jQuery DataTables For Bootstrap Integration
 * Version: 3.0
 */

/* Set the defaults for DataTables initialisation */
$.extend(true, $.fn.dataTable.defaults, {
	"sDom": "<'row header'<'col-sm-7'<'actions pull-left'>l><'col-sm-5'f>r>t<'row footer'<'col-sm-5'i><'col-sm-7'p>>",
	"sPaginationType": "bootstrap_normal",
	"aaSorting": [
		[1, "asc"]
	],
	"oLanguage": {
		"oPaginate": {
			"sFirst": "首页",
			"sLast": "末页",
			"sNext": "下一页",
			"sPrevious": "上一页"
		},
		"sEmptyTable": "没有任何记录",
		"sInfo": "当前显示 _START_ 到 _END_ 条，共 _TOTAL_ 条记录",
		"sInfoEmpty": "共 0 条记录",
		"sInfoFiltered": "（从 _MAX_ 条记录中搜索）",
		"sLengthMenu": "每页显示 _MENU_ 条记录",
		"sLoadingRecords": "加载中...",
		"sProcessing": "处理中...",
		"sSearch": "搜索",
		"sZeroRecords": "没有找到匹配的记录"
	}
});

/* Default class modification */
$.extend($.fn.dataTableExt.oStdClasses, {
	"sWrapper": "dataTables_wrapper form-inline"
});

/* API method to get paging information */
$.fn.dataTableExt.oApi.fnPagingInfo = function(oSettings) {
	return {
		"iStart": oSettings._iDisplayStart,
		"iEnd": oSettings.fnDisplayEnd(),
		"iLength": oSettings._iDisplayLength,
		"iTotal": oSettings.fnRecordsTotal(),
		"iFilteredTotal": oSettings.fnRecordsDisplay(),
		"iPage": oSettings._iDisplayLength === -1 ? 0 : Math.ceil(oSettings._iDisplayStart / oSettings._iDisplayLength),
		"iTotalPages": oSettings._iDisplayLength === -1 ? 0 : Math.ceil(oSettings.fnRecordsDisplay() / oSettings._iDisplayLength)
	};
};

/* Bootstrap style pagination control */
$.extend($.fn.dataTableExt.oPagination, {
	"bootstrap_normal": {
		"fnInit": function(oSettings, nPaging, fnCallbackDraw) {
			var oLang = oSettings.oLanguage.oPaginate;
			var fnClickHandler = function(e) {
				e.preventDefault();
				if (oSettings.oApi._fnPageChange(oSettings, e.data.action)) {
					fnCallbackDraw(oSettings);
				}
			};
			$(nPaging).append(
				'<ul class="pagination pagination-sm">' +
					'<li class="prev disabled">' + 
						'<a href="#">' +
							oLang.sPrevious + 
						'</a>' +
					'</li>' +
					'<li class="next disabled">' +
						'<a href="#">' +
							oLang.sNext +
						'</a>' +
					'</li>' +
				'</ul>'
			);
			var els = $('a', nPaging);
			$(els[0]).bind('click.DT', {
				action: "previous"
			}, fnClickHandler);
			$(els[1]).bind('click.DT', {
				action: "next"
			}, fnClickHandler);
		},
		"fnUpdate": function(oSettings, fnCallbackDraw) {
			var iListLength = 5;
			var oPaging = oSettings.oInstance.fnPagingInfo();
			var an = oSettings.aanFeatures.p;
			var i, j, sClass, iStart, iEnd, iHalf = Math.floor(iListLength / 2);
			if (oPaging.iTotalPages < iListLength) {
				iStart = 1;
				iEnd = oPaging.iTotalPages;
			} else if (oPaging.iPage <= iHalf) {
				iStart = 1;
				iEnd = iListLength;
			} else if (oPaging.iPage >= (oPaging.iTotalPages - iHalf)) {
				iStart = oPaging.iTotalPages - iListLength + 1;
				iEnd = oPaging.iTotalPages;
			} else {
				iStart = oPaging.iPage - iHalf + 1;
				iEnd = iStart + iListLength - 1;
			}
			for (i = 0, iLen = an.length; i < iLen; i++) {
				// Remove the middle elements
				$('li:gt(0)', an[i]).filter(':not(:last)').remove();

				// Add the new list items and their event handlers
				for (j = iStart; j <= iEnd; j++) {
					sClass = (j == oPaging.iPage + 1) ? 'class="active"' : '';
					$('<li ' + sClass + '><a href="#">' + j + '</a></li>').insertBefore($('li:last', an[i])[0]).bind('click', function(e) {
						e.preventDefault();
						oSettings._iDisplayStart = (parseInt($('a', this).text(), 10) - 1) * oPaging.iLength;
						fnCallbackDraw(oSettings);
					});
				}

				// Add / remove disabled classes from the static elements
				if (oPaging.iPage === 0) {
					$('li:first', an[i]).addClass('disabled');
				} else {
					$('li:first', an[i]).removeClass('disabled');
				}

				if (oPaging.iPage === oPaging.iTotalPages - 1 || oPaging.iTotalPages === 0) {
					$('li:last', an[i]).addClass('disabled');
				} else {
					$('li:last', an[i]).removeClass('disabled');
				}
			}
		}
	},
	"bootstrap_two_button": {
		"fnInit": function(oSettings, nPaging, fnCallbackDraw) {
			var oLang = oSettings.oLanguage.oPaginate;
			var fnClickHandler = function(e) {
				e.preventDefault();
				if (oSettings.oApi._fnPageChange(oSettings, e.data.action)) {
					fnCallbackDraw(oSettings);
				}
			};
			$(nPaging).append(
				'<ul class="pagination pagination-sm">' + 
					'<li class="prev disabled">' + 
						'<a href="#" class="' + oSettings.oClasses.sPagePrevDisabled + '" tabindex="' + oSettings.iTabIndex + '" role="button">' + 
							oLang.sPrevious + 
						'</a>' +
					'</li>' +
					'<li class="next disabled">' +
						'<a href="#" class="' + oSettings.oClasses.sPageNextDisabled + '" tabindex="' + oSettings.iTabIndex + '" role="button">' + 
							oLang.sNext + 
						'</a>' +
					'</li>' +
				'</ul>'
			);
			var els = $('a', nPaging);
			var nPrevious = els[0],
				nNext = els[1];
			oSettings.oApi._fnBindAction(nPrevious, {
				action: "previous"
			}, fnClickHandler);
			oSettings.oApi._fnBindAction(nNext, {
				action: "next"
			}, fnClickHandler);
			if (!oSettings.aanFeatures.p) {
				nPaging.id = oSettings.sTableId + '_paginate';
				nPrevious.id = oSettings.sTableId + '_previous';
				nNext.id = oSettings.sTableId + '_next';
				nPrevious.setAttribute('aria-controls', oSettings.sTableId);
				nNext.setAttribute('aria-controls', oSettings.sTableId);
			}
		},
		"fnUpdate": function(oSettings, fnCallbackDraw) {
			if (!oSettings.aanFeatures.p) {
				return;
			}
			var oPaging = oSettings.oInstance.fnPagingInfo();
			var an = oSettings.aanFeatures.p;
			for (var i = 0, iLen = an.length; i < iLen; i++) {
				if (oPaging.iPage === 0) {
					$('li:first', an[i]).addClass('disabled');
				} else {
					$('li:first', an[i]).removeClass('disabled');
				}

				if (oPaging.iPage === oPaging.iTotalPages - 1 || oPaging.iTotalPages === 0) {
					$('li:last', an[i]).addClass('disabled');
				} else {
					$('li:last', an[i]).removeClass('disabled');
				}
			}
		}
	},
	"bootstrap_four_button": {
		"fnInit": function(oSettings, nPaging, fnCallbackDraw) {
			var oLang = oSettings.oLanguage.oPaginate;
			var oClasses = oSettings.oClasses;
			var fnClickHandler = function(e) {
				e.preventDefault();
				if (oSettings.oApi._fnPageChange(oSettings, e.data.action)) {
					fnCallbackDraw(oSettings);
				}
			};
			$(nPaging).append(
				'<ul class="pagination pagination-sm">' +
					'<li class="first disabled">' +
						'<a href="#" tabindex="' + oSettings.iTabIndex + '" class="' + oClasses.sPageButton + " " + oClasses.sPageFirst + '">' +
							oLang.sFirst +
						'</a>' +
					'</li>' +
					'<li class="prev disabled">' +
						'<a href="#" tabindex="' + oSettings.iTabIndex + '" class="' + oClasses.sPageButton + " " + oClasses.sPagePrevious + '">' +
							oLang.sPrevious +
						'</a>' +
					'</li>' +
					'<li class="next disabled">' +
						'<a href="#" tabindex="' + oSettings.iTabIndex + '" class="' + oClasses.sPageButton + " " + oClasses.sPageNext + '">' +
							oLang.sNext +
						'</a>' +
					'</li>' +
					'<li class="last disabled">' +
						'<a href="#" tabindex="' + oSettings.iTabIndex + '" class="' + oClasses.sPageButton + " " + oClasses.sPageLast + '">' +
							oLang.sLast + 
						'</a>' +
					'</li>' + 
				'</ul>'
			);
			var els = $('a', nPaging);
			var nFirst = els[0],
				nPrev = els[1],
				nNext = els[2],
				nLast = els[3];
			oSettings.oApi._fnBindAction(nFirst, {
				action: "first"
			}, fnClickHandler);
			oSettings.oApi._fnBindAction(nPrev, {
				action: "previous"
			}, fnClickHandler);
			oSettings.oApi._fnBindAction(nNext, {
				action: "next"
			}, fnClickHandler);
			oSettings.oApi._fnBindAction(nLast, {
				action: "last"
			}, fnClickHandler);
			if (!oSettings.aanFeatures.p) {
				nPaging.id = oSettings.sTableId + '_paginate';
				nFirst.id = oSettings.sTableId + '_first';
				nPrev.id = oSettings.sTableId + '_previous';
				nNext.id = oSettings.sTableId + '_next';
				nLast.id = oSettings.sTableId + '_last';
			}
		},
		"fnUpdate": function(oSettings, fnCallbackDraw) {
			if (!oSettings.aanFeatures.p) {
				return;
			}
			var oPaging = oSettings.oInstance.fnPagingInfo();
			var an = oSettings.aanFeatures.p;
			for (var i = 0, iLen = an.length; i < iLen; i++) {
				if (oPaging.iPage === 0) {
					$('li:eq(0)', an[i]).addClass('disabled');
					$('li:eq(1)', an[i]).addClass('disabled');
				} else {
					$('li:eq(0)', an[i]).removeClass('disabled');
					$('li:eq(1)', an[i]).removeClass('disabled');
				}

				if (oPaging.iPage === oPaging.iTotalPages - 1 || oPaging.iTotalPages === 0) {
					$('li:eq(2)', an[i]).addClass('disabled');
					$('li:eq(3)', an[i]).addClass('disabled');
				} else {
					$('li:eq(2)', an[i]).removeClass('disabled');
					$('li:eq(3)', an[i]).removeClass('disabled');
				}
			}
		}
	},
	"bootstrap_full": {
		"fnInit": function(oSettings, nPaging, fnCallbackDraw) {
			var oLang = oSettings.oLanguage.oPaginate;
			var fnClickHandler = function(e) {
				e.preventDefault();
				if (oSettings.oApi._fnPageChange(oSettings, e.data.action)) {
					fnCallbackDraw(oSettings);
				}
			};

			$(nPaging).append(
				'<ul class="pagination pagination-sm">' +
					'<li class="first disabled">' +
						'<a href="#">' + 
							oLang.sFirst + '</a>' +
						'</li>' + 
					'<li class="prev disabled">' +
						'<a href="#">' + 
							oLang.sPrevious + '</a>' +
						'</li>' + 
					'<li class="next disabled">' +
						'<a href="#">' + 
							oLang.sNext + 
						'</a>' +
					'</li>' + 
					'<li class="last disabled">' +
						'<a href="#">' + 
							oLang.sLast + 
						'</a>' +
					'</li>' + 
				'</ul>'
			);
			var els = $('a', nPaging);
			$(els[0]).bind('click.DT', {
				action: "first"
			}, fnClickHandler);
			$(els[1]).bind('click.DT', {
				action: "previous"
			}, fnClickHandler);
			$(els[2]).bind('click.DT', {
				action: "next"
			}, fnClickHandler);
			$(els[3]).bind('click.DT', {
				action: "last"
			}, fnClickHandler);
		},

		"fnUpdate": function(oSettings, fnCallbackDraw) {
			var iListLength = 5;
			var oPaging = oSettings.oInstance.fnPagingInfo();
			var an = oSettings.aanFeatures.p;
			var i, j, sClass, iStart, iEnd, iHalf = Math.floor(iListLength / 2);

			if (oPaging.iTotalPages < iListLength) {
				iStart = 1;
				iEnd = oPaging.iTotalPages;
			} else if (oPaging.iPage <= iHalf) {
				iStart = 1;
				iEnd = iListLength;
			} else if (oPaging.iPage >= (oPaging.iTotalPages - iHalf)) {
				iStart = oPaging.iTotalPages - iListLength + 1;
				iEnd = oPaging.iTotalPages;
			} else {
				iStart = oPaging.iPage - iHalf + 1;
				iEnd = iStart + iListLength - 1;
			}

			for (i = 0, iLen = an.length; i < iLen; i++) {
				// Remove the middle elements
				$('li', an[i]).filter(":not(.first)").filter(":not(.last)").filter(":not(.prev)").filter(":not(.next)").remove();

				// Add the new list items and their event handlers
				for (j = iStart; j <= iEnd; j++) {
					sClass = (j == oPaging.iPage + 1) ? 'class="active"' : '';
					$('<li ' + sClass + '><a href="#">' + j + '</a></li>').insertBefore($('li.next', an[i])[0]).bind('click', function(e) {
						e.preventDefault();
						oSettings._iDisplayStart = (parseInt($('a', this).text(), 10) - 1) * oPaging.iLength;
						fnCallbackDraw(oSettings);
					});
				}

				// Add / remove disabled classes from the static elements
				if (oPaging.iPage === 0) {
					$('li.first', an[i]).addClass('disabled');
					$('li.prev', an[i]).addClass('disabled');
				} else {
					$('li.prev', an[i]).removeClass('disabled');
					$('li.first', an[i]).removeClass('disabled');
				}

				if (oPaging.iPage === oPaging.iTotalPages - 1 || oPaging.iTotalPages === 0) {
					$('li.last', an[i]).addClass('disabled');
					$('li.next', an[i]).addClass('disabled');
				} else {
					$('li.next', an[i]).removeClass('disabled');
					$('li.last', an[i]).removeClass('disabled');
				}
			}
		}
	}
});


/*
 * TableTools Bootstrap compatibility
 * Required TableTools 2.1+
 */
if ($.fn.DataTable.TableTools) {
	// Set the classes that TableTools uses to something suitable for Bootstrap
	$.extend(true, $.fn.DataTable.TableTools.classes, {
		"container": "DTTT btn-group",
		"buttons": {
			"normal": "btn",
			"disabled": "disabled"
		},
		"collection": {
			"container": "DTTT_dropdown dropdown-menu",
			"buttons": {
				"normal": "",
				"disabled": "disabled"
			}
		},
		"print": {
			"info": "DTTT_print_info modal"
		},
		"select": {
			"row": "active"
		}
	});

	// Have the collection use a bootstrap compatible dropdown
	$.extend(true, $.fn.DataTable.TableTools.DEFAULTS.oTags, {
		"collection": {
			"container": "ul",
			"button": "li",
			"liner": "a"
		}
	});
}