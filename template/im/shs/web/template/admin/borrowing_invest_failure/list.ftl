[@compress single_line = !systemDevelopment]
[#-- 公共参数 --]
[#include "/template/admin/include/param_common.ftl" /]
[#-- 索引URL --]
[#assign indexUrl = baseUrl + "/borrowing_invest_failure" /]
<!DOCTYPE html>
<html lang="en">
	<head>
		[#-- meta 标签 --]
    	[#include "/template/admin/include/meta.ftl" /]
		[#-- 标题 --]
		<title>投资已失败的借款列表[#if systemPowered] - Powered By ICLNetwork[/#if]</title>
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
					借款失败管理
				</li>
				<li>
					投资已失败的借款列表
				</li>
			</ul>
		</div>
		
		[#-- jQuery DataTables 数据表格 --]
		<table class="table table-striped table-bordered dataTable">
			<thead>
				<tr>
					[#-- 借款 List TH --]
					[#include "/template/admin/borrowing/list_ths.ftl" /]
			        <th class="center">操作</th>
				</tr>
			</thead>
			<tbody>
				[#list list as borrowing]
				    <tr>
						[#-- 借款 List TD --]
						[#include "/template/admin/borrowing/list_tds.ftl" /]
				        <td class="center">
				        	<a href="${indexUrl}/${borrowing.id}">
								<i class="icon-eye-open"></i>
								查看
							</a>
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
					<a href="${indexUrl}" class="btn btn-default btn-sm">
		            	<i class="icon-refresh"></i>
		            	刷新
					</a>
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
				[9, "desc"]
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