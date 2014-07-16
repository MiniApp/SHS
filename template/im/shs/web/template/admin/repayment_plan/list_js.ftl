/*
 * Copyright 2010-2013 icl-network.com. All rights reserved.
 * Support: http://www.icl-network.com
 *
 * JavaScript - RepaymentPlan List
 * Version: 3.0
 */
$().ready(function() {
    
	[#-- 批量还款 --]
	var $batchRepayButton = $("a.batchRepay");
	var $selectedRows = null;
	$batchRepayButton.click(function(e) {
		e.preventDefault();
	
		[#-- 已选的“选择记录”控件 --]
		$selectedRows = $("table.dataTable td.tableCheckbox input.selectRow:checked");
		
		[#-- 已选的“选择记录”控件，数量 > 0时 --]
		if ($selectedRows.length) {
			[#-- colorbox对话框 --]
			$.colorbox({
				initialHeight: "0",
				initialWidth: "0",
				opacity: "0.3",
				href: ".batchRepayConfirmDialog",
				inline: true,
				closeButton: false
			});
		}
		[#-- 已选的“选择记录”控件，数量 == 0时 --] 
		else {
			[#-- HubSpot Messenger 提示 --]
			$.globalMessenger().post({id: "needSelectRows", type: "error", message: "请选择需要批量还款的还款计划", showCloseButton: true });
		}
		
	});
	
	[#-- 删除“确定”按钮，点击事件 --]
	var $confirmYes = $("div.batchRepayConfirmDialog a.confirmYes");
	if($confirmYes.length) {
		$confirmYes.click(function(e) {
			e.preventDefault();
			
			var $this = $(this);
			[#-- 禁用“确定”按钮 --]
			$this.attr("disabled", true);
			
			[#-- 批量还款时 --]
			if($selectedRows.length) {
				window.location.href = $batchRepayButton.prop("href") + "&" + $selectedRows.serialize();
			}
			
		});
	}

	[#-- 删除“取消”按钮，点击事件 --]
	var $confirmNo = $("div.batchRepayConfirmDialog a.confirmNo");
	if($confirmNo.length) {
		$confirmNo.click(function(e) {
			e.preventDefault();
			
			[#-- 关闭colorbox对话框 --]
			$(".deleteConfirmDialog").colorbox.close();
		});
	}
	
});