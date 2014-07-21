[@compress single_line = !systemDevelopment]
[#-- 公共参数 --]
[#include "/template/admin/include/param_common.ftl" /]
[#-- 索引URL --]
[#assign indexUrl = baseUrl + "/repayment_plan" /]
<!DOCTYPE html>
<html lang="en">
	<head>
		[#-- meta 标签 --]
    	[#include "/template/admin/include/meta.ftl" /]
		[#-- 标题 --]
		<title>还款计划列表[#if systemPowered] - Powered By ICLNetwork[/#if]</title>
		[#-- Link 顶部 --]
    	[#include "/template/admin/include/link_top.ftl" /]
		[#-- jQuery DataTables For Bootstrap 数据表格 --]
	    <link type="text/css" rel="stylesheet" href="${base}/resources/lib/datatables/dataTables.bootstrap.min.css">
		[#-- chosen 选择器 --]
		<link type="text/css" rel="stylesheet" href="${base}/resources/lib/chosen/chosen.min.css" />
		<link type="text/css" rel="stylesheet" href="${base}/resources/lib/chosen/chosen.fix.min.css" />
		[#-- jQuery iCheck 多选、单选按钮 --]
		<link type="text/css" rel="stylesheet" href="${base}/resources/lib/iCheck/skins/minimal/grey.min.css" />
		<link type="text/css" rel="stylesheet" href="${base}/resources/lib/iCheck/icheck.fix.min.css" />
		[#-- Font Awesome Icon 图标 --]
	    <link type="text/css" rel="stylesheet" href="${base}/resources/lib/font-awesome/css/font-awesome.min.css">
		[#-- jBreadcrumbs 面包屑 --]
		<link type="text/css" rel="stylesheet" href="${base}/resources/lib/breadCrumb/jBreadCrumb.min.css" />
		<link type="text/css" rel="stylesheet" href="${base}/resources/lib/breadCrumb/jBreadCrumb.fix.min.css" />
		[#-- Colorbox 对话框 --]
		<link type="text/css" rel="stylesheet" href="${base}/resources/lib/colorbox/colorbox.min.css" />
		<link type="text/css" rel="stylesheet" href="${base}/resources/lib/colorbox/colorbox.common.min.css" />
		[#-- HubSpot Messenger 弹框（Alert）组件库 --]
		<link type="text/css" rel="stylesheet" href="${base}/resources/lib/messenger/messenger.min.css" />
		<link type="text/css" rel="stylesheet" href="${base}/resources/lib/messenger/messenger.theme.future.min.css" />	
		[#-- Link 底部 --]
    	[#include "/template/admin/include/link_bottom.ftl" /]
    </head>
    <body class="contentwrapper">

		[#-- 面包屑 --]
		<div id="jBreadCrumb" class="breadCrumb module">
			<ul>
				<li>
					<a href="${homepageUrl}"></a>
				</li>
				<li>
					借款管理
				</li>
				<li>
					还款计划列表
				</li>
		        [#if borrowing??]
					<li>
						借款：${borrowing}
					</li>
		        [/#if]
		        [#if repayment??]
					<li>
						还款：${repayment}
					</li>
		        [/#if]
			</ul>
		</div>
		
		[#-- jQuery DataTables 数据表格 --]
		<table class="table table-striped table-bordered dataTable">
			<thead>
				<tr>
					<th class="center tableCheckbox">
						<input class="selectRows" type="checkbox" />
					</th>
					[#if !repayment??]
						<th class="center">
							还款编号
						</th>
					[/#if]
					[#-- 还款计划 List TH --]
					[#include "/template/admin/repayment_plan/list_ths.ftl" /]
					[#--
			        <th class="center">操作</th>
			        --]
				</tr>
			</thead>
			<tbody>
				[#list list as repaymentPlan]
					<tr>
						<td class="center tableCheckbox">
							<input class="selectRow" type="checkbox" name="ids" value="${repaymentPlan.id}"[#if repaymentPlan.state != "repaying"] disabled="disabled"[/#if] />
						</td>
						[#if !repayment??]
							<td class="center">${repaymentPlan.repayment.id}</td>
						[/#if]
						[#-- 还款计划 List TD --]
						[#include "/template/admin/repayment_plan/list_tds.ftl" /]
						[#--
				        <td class="center">
				        	[#if repaymentPlan.state == "repaying"]
					        	<a href="${indexUrl}/${repaymentPlan.id}?[#if repayment?? && borrowing??]repayment=${repayment}[#elseif borrowing??]borrowing=${borrowing}[/#if]">
									<i class="icon-jpy"></i>
									还款
								</a>
							[/#if]
				        </td>
				        --]
					</tr>
				[/#list]
			</tbody>
		</table>
		
		[#-- hide elements 隐藏元素 --]
		<div class="hide">
		    
		    [#-- actions for jQuery DataTables 数据表格 - 操作 --]
		    <div class="dataTableActions">
		    	[#if repayment?? && borrowing??]
					<a href="${baseUrl}/repayment?borrowing=${borrowing}" class="btn btn-default btn-sm">
						<i class="icon-mail-reply-all"></i>
						返回还款列表
					</a>
				[#elseif borrowing??]
					<a href="${baseUrl}/borrowing_repay" class="btn btn-default btn-sm">
						<i class="icon-mail-reply-all"></i>
						返回借款列表
					</a>
				[/#if]
		        <div class="btn-group">
					<a href="${indexUrl}?[#if repayment?? && borrowing??]repayment=${repayment}[#elseif borrowing??]borrowing=${borrowing}[/#if]" class="btn btn-default btn-sm">
		            	<i class="icon-refresh"></i>
		            	刷新
					</a>
					<a href="${indexUrl}/batch_repay?[#if repayment?? && borrowing??]repayment=${repayment}[#elseif borrowing??]borrowing=${borrowing}[/#if]" class="btn btn-default btn-sm operateRows batchRepay">
						<i class="icon-jpy"></i>
			        	还款
					</a>
				</div>
		    </div>
    
		    [#-- batchRepay confirmation box 还款确认对话框 --]
		    <div class="colorbox-content batchRepayConfirmDialog">
		        <div class="colorbox-message">
		        	<strong>确定批量还款所选还款计划吗？</strong>
		    	</div>
		        <div class="colorbox-button">
		            <a href="#" class="btn btn-primary btn-xs confirmYes">&nbsp;确&nbsp;定&nbsp;</a>
		            &nbsp;&nbsp;
		            <a href="#" class="btn btn-default btn-xs confirmNo">&nbsp;取&nbsp;消&nbsp;</a>
		        </div>
		    </div>
		    
		</div>
    </body>
		
	[#-- Script 顶部 --]
	[#include "/template/admin/include/script_top.ftl" /]
    [#-- jQuery DataTables 数据表格 --]
	<script type="text/javascript" src="${base}/resources/lib/datatables/jquery.dataTables.min.js"></script>
	[#-- jQuery DataTables For Bootstrap 数据表格 --]
	<script type="text/javascript" src="${base}/resources/lib/datatables/jquery.dataTables.bootstrap.min.js"></script>
	[#-- jQuery DataTables Common Settings 数据表格 - 公共 - 设置 --]
    <script type="text/javascript">
    	var dataTableSettings = {
	    	"aaSorting": [
	    		[#if repayment??]
					[5, "asc"]
				[#else]
					[6, "asc"]
				[/#if]
			],
    		"aoColumns": [
				{"bSortable": false},
				[#if !repayment??]null,[/#if]
				null,
				null,
				null,
				null,
				null,
				null,
				null,
				null,
				null,
				null,
				null
				[#--, {"bSortable": false}
				--]
            ]
    	};
    </script>
    [#-- jQuery DataTables Common functions 数据表格 - 公共 - 函数 --]
    <script type="text/javascript" src="${base}/resources/lib/datatables/jquery.dataTables.common.js"></script>
	[#-- chosen 选择器 --]
	<script type="text/javascript" src="${base}/resources/lib/chosen/jquery.chosen.min.js"></script>
	<script type="text/javascript" src="${base}/resources/lib/chosen/jquery.chosen.common.min.js"></script>
	[#-- jQuery iCheck 多选、单选按钮 --]
	<script type="text/javascript" src="${base}/resources/lib/iCheck/jquery.icheck.min.js"></script>
	[#-- jBreadcrumbs 面包屑 --]
    <script type="text/javascript" src="${base}/resources/lib/breadCrumb/jquery.jBreadCrumb.min.js"></script>
    <script type="text/javascript" src="${base}/resources/lib/breadCrumb/jquery.jBreadCrumb.common.min.js"></script>
    [#-- repayment_plan.list 还款计划列表 --]
	<script type="text/javascript" src="${base}/resources/admin/js/repayment_plan.list.min.js"></script>
	[#-- Colorbox 对话框 --]
    <script type="text/javascript" src="${base}/resources/lib/colorbox/jquery.colorbox.min.js"></script>
    <script type="text/javascript" src="${base}/resources/lib/colorbox/jquery.colorbox.zh-CN.min.js"></script>
    [#-- HubSpot Messenger 弹框（Alert）组件库 --]
	<script type="text/javascript" src="${base}/resources/lib/messenger/messenger.min.js"></script>
	<script type="text/javascript" src="${base}/resources/lib/messenger/messenger.theme.future.min.js"></script>
	<script type="text/javascript" src="${base}/resources/lib/messenger/messenger.common.min.js"></script>
	[#-- 有瞬时消息时 --]
	[#if flashMessage != null]
		<script type="text/javascript">
			$().ready(function() {
				${flashMessage}
			});
		</script>
	[/#if]
	[#-- Script 底部 --]
	[#include "/template/admin/include/script_bottom.ftl" /]
</html>
[/@compress]