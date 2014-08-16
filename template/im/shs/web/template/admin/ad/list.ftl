[@compress single_line = !systemDevelopment]
[#-- 公共参数 --]
[#include "/admin/include/param_common.ftl" /]
[#-- 索引URL --]
[#assign indexUrl = baseUrl + "/ad" /]
<!DOCTYPE html>
<html lang="en">
	<head>
		[#-- meta 标签 --]
    	[#include "/admin/include/meta.ftl" /]
		[#-- 标题 --]
		<title>广告列表[#if systemPowered] - Powered By ICLNetwork[/#if]</title>
		[#-- Link 顶部 --]
    	[#include "/admin/include/link_top.ftl" /]
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
    	[#include "/admin/include/link_bottom.ftl" /]
    </head>
    <body class="contentwrapper">

		[#-- 面包屑 --]
		<div id="jBreadCrumb" class="breadCrumb module">
			<ul>
				<li>
					<a href="${homepageUrl}"></a>
				</li>
				<li>
					内容管理
				</li>
				<li>
					广告管理
				</li>
				<li>
					广告列表
				</li>
		        [#if adPosition??]
					<li>
						广告位：${adPosition}
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
			        <th>标题</th>
			        [#if !adPosition??]
			        	<th>广告位</th>
			        [/#if]
			        <th>类型</th>
			        <th>开始日期</th>
			        <th>结束日期</th>
			        <th>排序</th>
			        <th class="center">操作</th>
				</tr>
			</thead>
			<tbody>
				[#list list as ad]
				    <tr>
						<td class="center tableCheckbox">
							<input class="selectRow" type="checkbox" name="ids" value="${ad.id}" />
						</td>
				        <td>${abbreviate(ad.title, 50, "...")}</td>
				        [#if !adPosition??]
					        <td>${ad.position}</td>
				        [/#if]
				        <td>${message("AdType." + ad.type)}</td>
				        <td>${(ad.startDate?string("yyyy-MM-dd HH:mm:ss"))!"-"}</td>
				        <td>${(ad.endDate?string("yyyy-MM-dd HH:mm:ss"))!"-"}</td>
				        <td>${ad.order}</td>
				        <td class="center">
							<a href="${indexUrl}/${ad.id}/edit[#if adPosition??]?adPositionId=${adPosition.id}[/#if]">
								<i class="icon-pencil"></i>
								编辑
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
		    	[#if adPosition??]
					<a href="${baseUrl}/ad_position" class="btn btn-default btn-sm">
						<i class="icon-mail-reply-all"></i>
						返回广告位
					</a>
				[/#if]
		        <div class="btn-group">
					<a href="${indexUrl}/new[#if adPosition??]?adPositionId=${adPosition.id}[/#if]" class="btn btn-default btn-sm">
						<i class="icon-plus"></i>
						添加
					</a>
					<a href="${indexUrl}[#if adPosition??]?adPositionId=${adPosition.id}[/#if]" class="btn btn-default btn-sm">
		            	<i class="icon-refresh"></i>
		            	刷新
					</a>
					<a href="${indexUrl}/batch_delete" class="btn btn-default btn-sm operateRows deleteRows">
						<i class="icon-remove"></i>
			        	删除
					</a>
				</div>
		    </div>
    
		    [#-- delete confirmation box 删除确认对话框 --]
		    <div class="colorbox-content deleteConfirmDialog">
		        <div class="colorbox-message">
		        	<strong>确定删除所选记录吗？</strong>
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
	[#include "/admin/include/script_top.ftl" /]
    [#-- jQuery DataTables 数据表格 --]
	<script type="text/javascript" src="${base}/resources/lib/datatables/jquery.dataTables.fix.min.js"></script>
	[#-- jQuery DataTables For Bootstrap 数据表格 --]
	<script type="text/javascript" src="${base}/resources/lib/datatables/jquery.dataTables.bootstrap.min.js"></script>
	[#-- jQuery DataTables Common Settings 数据表格 - 公共 - 设置 --]
    <script type="text/javascript">
    	var dataTableSettings = {
    		"aaSorting": [
    			[#if !adPosition??]
					[6, "asc"]
				[#else]
					[5, "asc"]
				[/#if]
			],
    		"aoColumns": [
				{"bSortable": false},
				null,
				[#if !adPosition??]null,[/#if]
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
	[#-- jQuery iCheck 多选、单选按钮 --]
	<script type="text/javascript" src="${base}/resources/lib/iCheck/jquery.icheck.min.js"></script>
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
	[#include "/admin/include/script_bottom.ftl" /]
</html>
[/@compress]