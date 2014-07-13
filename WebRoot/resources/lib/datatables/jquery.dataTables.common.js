/*
 * Copyright 2010-2013 icl-network.com. All rights reserved.
 * Support: http://www.icl-network.com
 *
 * JavaScript - jQuery DataTables Common
 * Version: 3.0
 */

$().ready(function() {
	// 初始化表格
	galery_table.init();
	// 初始化“全选记录”事件
	select_row.init();
	// 初始化批量“删除记录”事件
	delete_rows.init();
	// 初始化“清空记录”事件
	clear_rows.init();
});

// 参数设置
galery = {
	// icheck 参数设置
	iCheck_setting: {
		checkboxClass: "icheckbox_minimal-grey"
	},
	// 数据表格
	dataTable: null,
	// 数据表格数据
	oTable: null,
	// 单一“删除记录”控件
	deleteRow: null,
	// 单一“删除记录”控件，选择事件
	deleteRow_click: function(e) {
		e.preventDefault();
		
		//选择的单一“删除记录”控件
		galery.deleteRow_selected = $(this);
		
		// colorbox对话框
		$.colorbox({
			initialHeight: "0",
			initialWidth: "0",
			opacity: "0.3",
			href: ".deleteConfirmDialog",
			inline: true,
			closeButton: false
		});
		
	},
	// 选择的单一“删除记录”控件
	deleteRow_selected: null,
	// 批量“删除记录”按钮
	deleteRowsButton: null,
	// 批量操作按钮
	operateRowsButton: null,
	// 批量操作按钮，是否启用
	operateRowsButton_enabled: false,
	// “全选记录”控件
	selectRows: null,
	// “全选记录”控件，选择事件
	selectRows_ifToggled: function(){
		galery.selectRow_enabled.iCheck(this.checked ? "check" : "uncheck");
	},
	// 全部的“选择记录”控件
	selectRow: null,
	// 启用的“选择记录”控件
	selectRow_enabled: null,
	// 启用的“选择记录”控件，选择事件
	selectRow_enabled_ifToggled: function(){
		// 统计已选的“选择记录”个数
		galery.selectRow_selected_size += this.checked ? 1 : -1;
		// 切换“选择记录”控件所在表行（TR）的样式
		$(this).closest("tr").toggleClass("selected");
		// 已选的“选择记录”个数 > 0时
		if(galery.selectRow_selected_size) {
			// 批量操作按钮，禁用时
			if(!galery.operateRowsButton_enabled) {
				// 批量操作按钮，启用（切换按钮样式）
				if(galery.operateRowsButton.length) {
					galery.operateRowsButton.toggleClass("disabled");
				}
				galery.operateRowsButton_enabled = true;
			}
		} 
		// 已选的“选择记录”个数 == 0时
		else {
			// 批量操作按钮，启用时
			if(galery.operateRowsButton_enabled) {
				// 批量操作按钮，禁用（切换按钮样式）
				if(galery.operateRowsButton.length) {
					galery.operateRowsButton.toggleClass("disabled");
				}
				galery.operateRowsButton_enabled = false;
			}
		}
	},
	// 已选的“选择记录”个数
	selectRow_selected_size: 0,
	// 禁用的“选择记录”控件
	selectRow_disabled: null,
	// 禁用的“选择记录”控件，遍历函数
	selectRow_disabled_each: function(index, input) {
		var $input = $(input);
		// 补充hint提示所需属性
		$input.parent().attr("data-hint", $input.prop("title")).addClass("hint--top hint--error");
		// 移除原title属性
		$input.removeAttr("title");
	}
};

// 初始化表格
galery_table = {
	init: function() {
		
		// 新增表格fnDrawCallback事件（重绘事件）
		$.extend(true, $.fn.dataTable.defaults, {
			"fnDrawCallback": function(oSettings) {
				
				// 全部的“选择记录”控件
				galery.selectRow = $("table.dataTable td.tableCheckbox input.selectRow");
				if(galery.selectRow.length) {
					// 添加iCheck效果
					galery.selectRow.iCheck(galery.iCheck_setting);

					// 启用的“选择记录”控件
					galery.selectRow_enabled = galery.selectRow.filter(":enabled");
					if(galery.selectRow_enabled.length) {
						// 选择事件
						galery.selectRow_enabled.unbind("ifToggled");
						galery.selectRow_enabled.on("ifToggled", galery.selectRow_enabled_ifToggled);
					}
					
					// 禁用的“选择记录”控件
					galery.selectRow_disabled = galery.selectRow.filter(":disabled");
					if(galery.selectRow_disabled.length) {
						// 遍历并替换title提示为hint提示
						galery.selectRow_disabled.each(galery.selectRow_disabled_each);
					}
				}
				
				// “全选记录”控件
				galery.deleteRow = $("table.dataTable td a.deleteRow");
				if(galery.deleteRow.length) {
					galery.deleteRow.unbind("click");
					galery.deleteRow.click(galery.deleteRow_click);
				}
				
		    }
		});

		// 表格参数设置
		galery.dataTable = $("table.dataTable");
		if(galery.dataTable.length) {
			galery.dataTable.dataTable(dataTableSettings);
			galery.oTable = galery.dataTable.dataTable();
		}
		
		// 添加表格外置操作
		var $dataTableActions = $("div.dataTableActions");
		if($dataTableActions.length) {
			$("div.dataTables_wrapper .actions").append($("div.dataTableActions"));
		}
		
		// “删除记录”按钮
		galery.deleteRowsButton = $("div.dataTables_wrapper a.deleteRows");
		// 批量操作按钮
		galery.operateRowsButton = $("div.dataTables_wrapper a.operateRows");
		if(galery.operateRowsButton) {
			galery.operateRowsButton.addClass("disabled");
		}
		
	}
};

// 初始化“全选记录”事件
select_row = {
	init: function() {
		
		// “全选记录”控件
		galery.selectRows = $("table.dataTable th.tableCheckbox input.selectRows");
		if(galery.selectRows.length) {
			// 添加iCheck效果
			galery.selectRows.iCheck(galery.iCheck_setting);
			// 选择事件
			galery.selectRows.on("ifToggled", galery.selectRows_ifToggled);
		}
		
	}
};

// 初始化批量“删除记录”事件
delete_rows = {
	init: function() {
		
		// 已选的“选择记录”控件
		var $selectedRows = null;

		// “删除记录”按钮，点击事件
		if(galery.deleteRowsButton.length) {
			galery.deleteRowsButton.click(function(e) {
				e.preventDefault();
				
				// 已选的“选择记录”控件
				$selectedRows = $("table.dataTable td.tableCheckbox input.selectRow:checked");
				// 已选的“选择记录”控件，数量 > 0时
				if ($selectedRows.length) {
					// colorbox对话框
					$.colorbox({
						initialHeight: "0",
						initialWidth: "0",
						opacity: "0.3",
						href: ".deleteConfirmDialog",
						inline: true,
						closeButton: false
					});
				}
				// 已选的“选择记录”控件，数量 == 0时 
				else {
					// HubSpot Messenger 提示
					$.globalMessenger().post({id: "needSelectRows", type: "error", message: "请选择需要删除的记录", showCloseButton: true });
				}
			});
		}
		
		// 删除“确定”按钮，点击事件
		var $confirmYes = $("div.deleteConfirmDialog a.confirmYes");
		if($confirmYes.length) {
			$confirmYes.click(function(e) {
				e.preventDefault();
				
				var $this = $(this);
				// 禁用“确定”按钮
				$this.attr("disabled", true);
				
				// 批量“删除记录”时
				if(galery.deleteRowsButton.length && $selectedRows.length) {

					// AJAX 删除
					$.ajax({
						url: galery.deleteRowsButton.prop("href"),
						type: "post",
						data: "_method=delete&" + $selectedRows.serialize(),
						dataType: "json",
						cache: false,
						success: function(message) {
							// HubSpot Messenger 反馈操作结果信息
							$.globalMessenger().post({type: message.type, message: message.cont, showCloseButton: true });
							// 操作成功时
							if (message.type == "success") {
								// 移除已选的“选择记录”所在的表行（TR），并从表格数据中移除
								$selectedRows.closest("tr").fadeTo(300, 0, function() {
									$(this).remove();
									galery.oTable.fnDeleteRow(this);
								});
								// 还原“全选记录”控件，选择事件
								galery.selectRows.iCheck("uncheck");
							}
							// 启用“确定”按钮
							$this.attr("disabled", false);
							// 关闭colorbox对话框
							$(".deleteConfirmDialog").colorbox.close();
						}
					});
					
				}
				// 单一“删除记录”时
				else if(galery.deleteRow_selected.length) {

					// AJAX 删除
					$.ajax({
						url: galery.deleteRow_selected.prop("href"),
						type: "post",
						data: "_method=delete&id=" + galery.deleteRow_selected.attr("deleteId"),
						dataType: "json",
						cache: false,
						success: function(message) {
							// HubSpot Messenger 反馈操作结果信息
							$.globalMessenger().post({type: message.type, message: message.cont, showCloseButton: true });
							// 操作成功时
							if (message.type == "success") {
								// 移除选择单一“删除记录”控件所在的表行（TR），并从数据表格数据中移除
								galery.deleteRow_selected.closest("tr").fadeTo(300, 0, function() {
									$(this).remove();
									galery.oTable.fnDeleteRow(this);
								});
								// 还原选择的单一“删除记录”控件
								galery.deleteRow_selected = null;
							}
							// 启用“确定”按钮
							$this.attr("disabled", false);
							// 关闭colorbox对话框
							$(".deleteConfirmDialog").colorbox.close();
						}
					});
					
				}
				
			});
		}
		
		// 删除“取消”按钮，点击事件
		var $confirmNo = $("div.deleteConfirmDialog a.confirmNo");
		if($confirmNo.length) {
			$confirmNo.click(function(e) {
				e.preventDefault();
				
				// 关闭colorbox对话框
				$(".deleteConfirmDialog").colorbox.close();
			});
		}
		
	}
};

// 初始化“清空记录”事件
clear_rows = {
	init: function() {
		
		// “清空记录”按钮
		var $clearRows = $("div.dataTables_wrapper a.clearRows");

		// “清空记录”按钮，事件
		if($clearRows.length) {
			$clearRows.click(function(e) {
				e.preventDefault();
				
				// 数据表格数据中行数，数量 > 0时
				if (galery.oTable.fnGetNodes().length) {
					// colorbox对话框
					$.colorbox({
						initialHeight: "0",
						initialWidth: "0",
						opacity: "0.3",
						href: ".clearConfirmDialog",
						inline: true,
						closeButton: false
					});
				}
				// 数据表格数据中行数，数量 == 0时 
				else {
					// HubSpot Messenger 提示
					$.globalMessenger().post({id: "needHasRows", type: "error", message: "记录已清空或没有任何记录", showCloseButton: true });
				}
				
			});
		}
		
		// 清空“确定”按钮，点击事件
		var $confirmYes = $("div.clearConfirmDialog a.confirmYes");
		if($confirmYes.length) {
			$confirmYes.click(function(e) {
				e.preventDefault();
				
				var $this = $(this);
				// 禁用“确定”按钮
				$this.attr("disabled", true);
				
				// AJAX 删除
				$.ajax({
					url: $clearRows.prop("href"),
					type: "post",
					data: "_method=delete",
					dataType: "json",
					cache: false,
					success: function(message) {
						// HubSpot Messenger 反馈操作结果信息
						$.globalMessenger().post({type: message.type, message: message.cont, showCloseButton: true });
						// 操作成功时
						if (message.type == "success") {
							// 数据表格数据清空
							galery.oTable.fnClearTable();
						}
						// 启用“确定”按钮
						$this.attr("disabled", false);
						// 关闭colorbox对话框
						$(".clearConfirmDialog").colorbox.close();
					}
				});
				
			});
		}
		
		// 清空“取消”按钮，点击事件
		var $confirmNo = $("div.clearConfirmDialog a.confirmNo");
		if($confirmNo.length) {
			$confirmNo.click(function(e) {
				e.preventDefault();
				
				// 关闭colorbox对话框
				$(".clearConfirmDialog").colorbox.close();
			});
		}
		
	}
};