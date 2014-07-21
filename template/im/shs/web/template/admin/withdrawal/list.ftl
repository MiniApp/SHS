[@compress single_line = !systemDevelopment]
[#-- 公共参数 --]
[#include "/template/admin/include/param_common.ftl" /]
[#-- 索引URL --]
[#assign indexUrl = baseUrl + "/withdrawal" /]
<!DOCTYPE html>
<html lang="en">
	<head>
		[#-- meta 标签 --]
    	[#include "/template/admin/include/meta.ftl" /]
		[#-- 标题 --]
		<title>[#if state??]${message("PaymentState." + state)}[/#if]提现列表[#if systemPowered] - Powered By ICLNetwork[/#if]</title>
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
					提现管理
				</li>
				<li>
					[#if state??]${message("PaymentState." + state)}[/#if]提现列表
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
			        <th>提现金额</th>
			        <th>付款金额</th>
			        <th>付款人</th>
			        <th>付款时间</th>
			        <th>收款人</th>
			        <th>备注</th>
			        [#if !state??]
		        		<th>状态</th>
		        	[/#if]
			        <th>创建时间</th>
			        <th class="center-left">操作</th>
				</tr>
			</thead>
			<tbody>
				[#list list as withdrawal]
					[#assign payee = withdrawal.member /]
					[#assign bankCard = withdrawal.bankCard /]
				    <tr>
				        <td>${withdrawal.sn}</td>
				        <td>${message("WithdrawalMethod." + withdrawal.paymentMethod)}</td>
				        <td>${withdrawal.paymentName!"-"}</td>
				        <td>${withdrawal.effectiveAmount?string("currency")}</td>
				        <td>${withdrawal.amount?string("currency")}</td>
				        <td>
							[#if withdrawal.bank??]
								${withdrawal.bank}
								[#if withdrawal.account??]
									<br/>
									<small>${withdrawal.account}</small>
								[/#if]
								[#if withdrawal.payer??]
									<br/>
									<small>${withdrawal.payer}</small>
								[/#if]
							[/#if]
				        </td>
				        <td>${(withdrawal.time?string("yyyy-MM-dd HH:mm:ss"))!"-"}</td>
						<td>
							[#if payee != null]
								${payee}
								[#if payee.name??]
									<br/>
									<small>${payee.name}</small>
								[/#if]
								[#if payee.idNo??]
									<br/>
									<small>${payee.idNo}</small>
								[/#if]
								[#if bankCard != null]
									<br/>
									<small>${bankCard.bankName!"-"}</small>
									[#if bankCard.branchName??]
										<br/>
										<small>${bankCard.branchName!"-"}</small>
									[/#if]
									[#if bankCard.card??]
										<br/>
										<small>${bankCard.card}</small>
									[/#if]
								[/#if]
							[/#if]
						</td>
				        <td>
							[#if withdrawal.memo??]
								${abbreviate(withdrawal.memo, 50, "...")}
							[#else]
								-
							[/#if]
				        </td>
				        [#if !state??]
				        	<td>${message("PaymentState." + withdrawal.state)}</td>
				        [/#if]
				        <td>${withdrawal.createDate?string("yyyy-MM-dd HH:mm:ss")}</td>
				        <td class="center-left">
							<a href="${indexUrl}/${withdrawal.id}[#if state??]?state=${state}[/#if]">
								<i class="icon-eye-open"></i>
								查看
							</a>
							[#if withdrawal.state == "auditing"]
								<br/>
					        	<a href="${indexUrl}_modif/${withdrawal.id}?redirectType=list[#if state??]&state=${state}[/#if]">
									<i class="icon-pencil"></i>
									修改
								</a>
								<br/>
								<a href="${indexUrl}_audit/${withdrawal.id}?redirectType=list[#if state??]&state=${state}[/#if]">
									<i class="icon-legal"></i>
									审核
								</a>
			            	[/#if]
							[#if withdrawal.state == "transferring"]
								<br/>
								<a href="${indexUrl}_transfer/${withdrawal.id}?redirectType=list[#if state??]&state=${state}[/#if]">
									<i class="icon-jpy"></i>
									转账
								</a>
			            	[/#if]
			            	[#if withdrawal.state == "auditing" || withdrawal.state == "transferring"]
			            		<br/>
								<a href="${indexUrl}_cancel/${withdrawal.id}?redirectType=list[#if state??]&state=${state}[/#if]">
									<i class="icon-ban-circle"></i>
									取消
								</a>
			            	[/#if]
			            	[#if withdrawal.state == "cancel" || withdrawal.state == "failure"]
			            		<br/>
								<a href="${indexUrl}_remedy/${withdrawal.id}?redirectType=list[#if state??]&state=${state}[/#if]">
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
	<script type="text/javascript" src="${base}/resources/lib/datatables/jquery.dataTables.min.js"></script>
	[#-- jQuery DataTables For Bootstrap 数据表格 --]
	<script type="text/javascript" src="${base}/resources/lib/datatables/jquery.dataTables.bootstrap.min.js"></script>
	[#-- jQuery DataTables Common Settings 数据表格 - 公共 - 设置 --]
    <script type="text/javascript">
    	var dataTableSettings = {
	    	"aaSorting": [
	    		[#if !state??]
	    			[10, "desc"]
	    		[#else]
	    			[9, "desc"]
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