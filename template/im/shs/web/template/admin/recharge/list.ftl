[@compress single_line = !systemDevelopment]
[#-- 公共参数 --]
[#include "/template/admin/include/param_common.ftl" /]
[#-- 索引URL --]
[#assign indexUrl = baseUrl + "/recharge" /]
<!DOCTYPE html>
<html lang="en">
	<head>
		[#-- meta 标签 --]
    	[#include "/template/admin/include/meta.ftl" /]
		[#-- 标题 --]
		<title>[#if state??]${message("PaymentState." + state)}[/#if]充值列表[#if systemPowered] - Powered By ICLNetwork[/#if]</title>
		[#-- Link 顶部 --]
    	[#include "/template/admin/include/link_top.ftl" /]
		[#-- jQuery DataTables For Bootstrap 数据表格 --]
	    <link type="text/css" rel="stylesheet" href="${base}/resources/lib/datatables/dataTables.bootstrap.min.css">
		[#-- chosen 选择器 --]
		<link type="text/css" rel="stylesheet" href="${base}/resources/lib/chosen/chosen.min.css" />
		<link type="text/css" rel="stylesheet" href="${base}/resources/lib/chosen/chosen.fix.min.css" />
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
					资金管理
				</li>
				<li>
					充值管理
				</li>
				<li>
					[#if state??]${message("PaymentState." + state)}[/#if]充值列表
				</li>
			</ul>
		</div>
		
		[#-- jQuery DataTables 数据表格 --]
		<table class="table table-striped table-bordered dataTable">
			<thead>
				<tr>
			        <th>编号</th>
			        <th>类型</th>
			        <th>支付方式</th>
			        <th>充值金额</th>
			        <th>付款金额</th>
			        <th>收款人</th>
			        <th>付款时间</th>
			        <th>付款人</th>
			        <th>备注</th>
			        [#if !state??]
		        		<th>状态</th>
		        	[/#if]
			        <th>创建时间</th>
			        <th class="center-left">操作</th>
				</tr>
			</thead>
			<tbody>
				[#list list as recharge]
					[#assign payer = recharge.member /]
				    <tr>
				        <td>${recharge.sn}</td>
				        <td>${message("RechargeMethod." + recharge.paymentMethod)}</td>
				        <td>${recharge.paymentName!"-"}</td>
				        <td>${recharge.effectiveAmount?string("currency")}</td>
				        <td>${recharge.amount?string("currency")}</td>
				        <td>${recharge.payee!"-"}</td>
				        <td>${(recharge.time?string("yyyy-MM-dd HH:mm:ss"))!"-"}</td>
						<td>
							[#if payer != null]
								${payer}
								[#if payer.name??]
									<br/>
									<small>${payer.name}</small>
								[/#if]
								[#if payer.idNo??]
									<br/>
									<small>${payer.idNo}</small>
								[/#if]
							[/#if]
						</td>
				        <td>
							[#if recharge.memo??]
								${abbreviate(recharge.memo, 50, "...")}
							[#else]
								-
							[/#if]
				        </td>
				        [#if !state??]
				        	<td>${message("PaymentState." + recharge.state)}</td>
				        [/#if]
				        <td>${recharge.createDate?string("yyyy-MM-dd HH:mm:ss")}</td>
				        <td class="center-left">
							<a href="${indexUrl}/${recharge.id}[#if state??]?state=${state}[/#if]">
								<i class="icon-eye-open"></i>
								查看
							</a>
							[#if recharge.state == "auditing"]
								<br/>
					        	<a href="${indexUrl}_modif/${recharge.id}?redirectType=list[#if state??]&state=${state}[/#if]">
									<i class="icon-pencil"></i>
									修改
								</a>
								<br/>
								<a href="${indexUrl}_audit/${recharge.id}?redirectType=list[#if state??]&state=${state}[/#if]">
									<i class="icon-legal"></i>
									审核
								</a>
			            	[/#if]
							[#if recharge.state == "transferring"]
								<br/>
								<a href="${indexUrl}_transfer/${recharge.id}?redirectType=list[#if state??]&state=${state}[/#if]">
									<i class="icon-jpy"></i>
									转账
								</a>
			            	[/#if]
			            	[#if recharge.state == "auditing" || recharge.state == "transferring"]
			            		<br/>
								<a href="${indexUrl}_cancel/${recharge.id}?redirectType=list[#if state??]&state=${state}[/#if]">
									<i class="icon-ban-circle"></i>
									取消
								</a>
			            	[/#if]
			            	[#if recharge.state == "cancel" || recharge.state == "failure"]
			            		<br/>
								<a href="${indexUrl}_remedy/${recharge.id}?redirectType=list[#if state??]&state=${state}[/#if]">
									<i class="icon-undo"></i>
									补救
								</a>
			            	[/#if]
				        </td>
				    </tr>
				[/#list]
			</tbody>
		</table>
		
		[#-- hide elements 隐藏元素 --]
		<div class="hide">
		    
		    [#-- actions for jQuery DataTables 数据表格 - 操作 --]
		    <div class="dataTableActions">
		        <div class="btn-group">
					<a href="${indexUrl}[#if state??]?state=${state}[/#if]" class="btn btn-default btn-sm">
		            	<i class="icon-refresh"></i>
		            	刷新
					</a>
				</div>
				<div class="btn-group">
		            <button data-toggle="dropdown" class="btn dropdown-toggle btn-default btn-sm">
		            	<i class="icon-search"></i>
		            	查询
		            	<span class="caret"></span>
		            </button>
		            <ul class="dropdown-menu">
		            	<li><a href="${indexUrl}">所有</a></li>
		            	[#list states as state]
		            		<li><a href="${indexUrl}?state=${state}">${message("PaymentState." + state)}</a></li>	
		            	[/#list]
		            </ul>
		        </div>
		    </div>
		    
		</div>
    </body>
		
	[#-- Script 顶部 --]
	[#include "/template/admin/include/script_top.ftl" /]
    [#-- jQuery DataTables 数据表格 --]
	<script type="text/javascript" src="${base}/resources/lib/datatables/jquery.dataTables.fix.min.js"></script>
	[#-- jQuery DataTables For Bootstrap 数据表格 --]
	<script type="text/javascript" src="${base}/resources/lib/datatables/jquery.dataTables.bootstrap.min.js"></script>
	[#-- jQuery DataTables Common Settings 数据表格 - 公共 - 设置 --]
    <script type="text/javascript">
    	var dataTableSettings = {
	    	"aaSorting": [
	    		[#if !state??]
	    			[10, "asc"]
	    		[#else]
	    			[9, "asc"]
	    		[/#if]
			],
    		"aoColumns": [
				null,
				null,
				null,
				null,
				null,
				null,
				null,
				null,
				null,
				[#if !state??]null,[/#if]
				null,
				{"bSortable": false}
            ]
    	};
    </script>
    [#-- jQuery DataTables Common functions 数据表格 - 公共 - 函数 --]
    <script type="text/javascript" src="${base}/resources/lib/datatables/jquery.dataTables.common.min.js"></script>
	[#-- chosen 选择器 --]
	<script type="text/javascript" src="${base}/resources/lib/chosen/jquery.chosen.min.js"></script>
	<script type="text/javascript" src="${base}/resources/lib/chosen/jquery.chosen.common.min.js"></script>
	[#-- jBreadcrumbs 面包屑 --]
    <script type="text/javascript" src="${base}/resources/lib/breadCrumb/jquery.jBreadCrumb.min.js"></script>
    <script type="text/javascript" src="${base}/resources/lib/breadCrumb/jquery.jBreadCrumb.common.min.js"></script>
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