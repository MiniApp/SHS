[@compress single_line = !systemDevelopment]
[#-- 公共参数 --]
[#include "/template/admin/include/param_common.ftl" /]
[#-- 索引URL --]
[#assign indexUrl = baseUrl + "/admin" /]
<!DOCTYPE html>
<html lang="en">
	<head>
		[#-- meta 标签 --]
    	[#include "/template/admin/include/meta.ftl" /]
		[#-- 标题 --]
		<title>管理员列表[#if systemPowered] - Powered By ICLNetwork[/#if]</title>
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
					系统管理
				</li>
				<li>
					权限管理
				</li>
				<li>
					管理员列表
				</li>
			</ul>
		</div>
		
		[#-- jQuery DataTables 数据表格 --]
		<table class="table table-striped table-bordered dataTable">
			<thead>
				<tr>
					<th class="center tableCheckbox">
						<input class="selectRows" type="checkbox" />
					</th>
			        <th>用户名</th>
			        <th>邮箱地址</th>
			        <th>姓名</th>
			        <th>部门</th>
			        <th>最后登录时间</th>
			        <th>最后登录IP</th>
			        <th>状态</th>
			        <th>创建时间</th>
			        <th class="center">操作</th>
				</tr>
			</thead>
			<tbody>
				[#list list as admin]
				    <tr>
						<td class="center tableCheckbox">
							<input class="selectRow" type="checkbox" name="ids" value="${admin.id}" />
						</td>
				        <td>${admin.username}</td>
				        <td>${admin.email}</td>
				        <td>${admin.name}</td>
				        <td>${admin.department}</td>
				        <td>${(admin.loginDate?string("yyyy-MM-dd HH:mm:ss"))!"-"}</td>
				        <td>${(admin.loginIp)!"-"}</td>
				        <td>
				        	[#if !admin.enabled]
								<span class="label label-danger">禁用</span>
							[#elseif admin.locked]
								<span class="label label-warning">锁定</span>
							[#else]
								<span class="label label-success">正常</span>
							[/#if]
				        </td>
				        <td>${admin.createDate?string("yyyy-MM-dd HH:mm:ss")}</td>
				        <td class="center">
							<a href="${indexUrl}/${admin.id}/edit">
								<i class="icon-pencil"></i>
								编辑
							</a>
				        </td>
				    </tr>
				[/#list]
			</tbody>
		</table>
		
		[#-- hide elements 列表页公共隐藏元素 --]
		[#include "/template/admin/include/list_hide_common.ftl" /]
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
    		"aoColumns": [
				{"bSortable": false},
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
	[#include "/template/admin/include/script_bottom.ftl" /]
</html>
[/@compress]