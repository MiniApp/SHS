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
		<title>编辑管理员[#if systemPowered] - Powered By ICLNetwork[/#if]</title>
		[#-- Link 顶部 --]
    	[#include "/template/admin/include/link_top.ftl" /]
		[#-- validate 验证器 --]
		<link type="text/css" rel="stylesheet" href="${base}/resources/lib/validate/validate.min.css" />
		[#-- chosen 选择器 --]
		<link type="text/css" rel="stylesheet" href="${base}/resources/lib/chosen/chosen.min.css" />
		<link type="text/css" rel="stylesheet" href="${base}/resources/lib/chosen/chosen.fix.min.css" />
		[#-- jBreadcrumbs 面包屑 --]
		<link type="text/css" rel="stylesheet" href="${base}/resources/lib/breadCrumb/jBreadCrumb.min.css" />
		<link type="text/css" rel="stylesheet" href="${base}/resources/lib/breadCrumb/jBreadCrumb.fix.min.css" />
		[#-- hint 提示 --]
		<link type="text/css" rel="stylesheet" href="${base}/resources/lib/hint/hint.min.css" />
		[#-- 有瞬时消息时 --]
		[#if flashMessage != null]
			[#-- HubSpot Messenger 弹框（Alert）组件库 --]
			<link type="text/css" rel="stylesheet" href="${base}/resources/lib/messenger/messenger.min.css" />
			<link type="text/css" rel="stylesheet" href="${base}/resources/lib/messenger/messenger.theme.future.min.css" />
		[/#if]
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
					编辑管理员
				</li>
			</ul>
		</div>
					
		[#-- 表单 --]
		<form id="inputForm" class="form-horizontal" action="${indexUrl}/${admin.id}" method="post">
			<input type="hidden" name="_method" value="put" />
			
			[#-- 标签 --]
			<div class="tabbable">
			
				[#-- 选项卡 --]
				<ul class="nav nav-tabs">
					<li class="active">
						<a id="tab1" href="#tab_pane1" data-toggle="tab">基本信息</a>
					</li>
					<li>
						<a id="tab2" href="#tab_pane2" data-toggle="tab">个人资料</a>
					</li>
				</ul>
				
				[#-- 选项卡内容 --]
				<div class="tab-content">
					[#-- 基本信息 --]
					<div id="tab_pane1" class="tab-pane active" tab-id="tab1">
					
						[#-- 用户名 --]
						<div class="form-group">
							<label class="col-sm-2 control-label">
								用户名
							</label>
							<div class="col-sm-4">
								<p class="form-control-static">
									<strong>${admin.username}</strong>
								</p>
							</div>
						</div>
					
						[#-- 密码 --]
						<div class="form-group">
							<label for="password" class="col-sm-2 control-label">
								密码
							</label>
							<div class="col-sm-4">
								<input id="password" class="form-control" type="password" name="password" maxlength="20" autocomplete="off" />
							</div>
						</div>
					
						[#-- 确认密码 --]
						<div class="form-group">
							<label for="rePassword" class="col-sm-2 control-label">
								确认密码
							</label>
							<div class="col-sm-4">
								<input id="rePassword" class="form-control" type="password" name="rePassword" maxlength="20" autocomplete="off" />
							</div>
						</div>
					
						[#-- 邮箱地址 --]
						<div class="form-group">
							<label for="email" class="col-sm-2 control-label">
								<span class="required">*</span>
								邮箱地址
							</label>
							<div class="col-sm-4">
								<input id="email" class="form-control" type="text" name="email" value="${admin.email}" maxlength="200" />
							</div>
						</div>
					
						[#-- 角色 --]
						<div class="form-group">
							<label for="role" class="col-sm-2 control-label">
								<span class="required">*</span>
								角色
							</label>
							<div class="col-sm-4">
								<select id="role" class="form-control chosen-select" name="roleIds" multiple="true" data-placeholder="请选择角色...">
									[#list roles as role]
										<option value="${role.id}"[#if admin.roles?seq_contains(role)] selected="selected"[/#if]>${role.name}</option>
									[/#list]
								</select>
							</div>
						</div>
						
						[#-- 是否启用 --]
						<div class="form-group">
							<label for="enabled" class="col-sm-2 control-label">
								是否启用
							</label>
							<div class="col-sm-4">
								<select id="enabled" class="form-control chosen-select" name="enabled" data-placeholder="&nbsp;">
									<option value="true"[#if admin.enabled] selected="selected"[/#if]>是</option>
									<option value="false"[#if !admin.enabled] selected="selected"[/#if]>否</option>
								</select>
							</div>
						</div>
						
						[#if admin.locked]
							[#-- 是否解锁 --]
							<div class="form-group">
								<label for="locked" class="col-sm-2 control-label">
									是否解锁
								</label>
								<div class="col-sm-4">
									<select id="locked" class="form-control chosen-select" name="locked" data-placeholder="&nbsp;">
										<option value="false">是</option>
										<option value="true">否</option>
									</select>
								</div>
							</div>
						[/#if]
							
					</div>
					
					[#-- 个人资料 --]
					<div id="tab_pane2" class="tab-pane" tab-id="tab2">
					
						[#-- 部门 --]
						<div class="form-group">
							<label for="department" class="col-sm-2 control-label">
								部门
							</label>
							<div class="col-sm-4">
								<input id="department" class="form-control" type="text" name="department" value="${admin.department}" maxlength="200" />
							</div>
						</div>
						
						[#-- 姓名 --]
						<div class="form-group">
							<label for="name" class="col-sm-2 control-label">
								姓名
							</label>
							<div class="col-sm-4">
								<input id="name" class="form-control" type="text" name="name" value="${admin.name}" maxlength="200" />
							</div>
						</div>
						
					</div>
					
				</div>
			</div>
			
			[#-- 表单按钮 --]
			<div class="form-group">
				<div class="col-sm-offset-2 col-sm-4">
					<button class="btn btn-default btn-sm" type="submit">&nbsp;修&nbsp;改&nbsp;</button>
					<button class="btn btn-link btn-sm" type="button" onclick="location.href='${indexUrl}'">&nbsp;返&nbsp;回&nbsp;</button>
				</div>
			</div>
			
		</form>
    </body>
		
	[#-- Script 顶部 --]
	[#include "/template/admin/include/script_top.ftl" /]
	[#-- validate 验证器 --]
    <script type="text/javascript" src="${base}/resources/lib/validate/jquery.validate.min.js"></script>
    <script type="text/javascript" src="${base}/resources/lib/validate/jquery.validate.method.min.js"></script>
    <script type="text/javascript" src="${base}/resources/lib/validate/jquery.validate.common.min.js"></script>
	[#-- chosen 选择器 --]
	<script type="text/javascript" src="${base}/resources/lib/chosen/jquery.chosen.min.js"></script>
	<script type="text/javascript" src="${base}/resources/lib/chosen/jquery.chosen.common.min.js"></script>
	[#-- jBreadcrumbs 面包屑 --]
    <script type="text/javascript" src="${base}/resources/lib/breadCrumb/jquery.jBreadCrumb.min.js"></script>
    <script type="text/javascript" src="${base}/resources/lib/breadCrumb/jquery.jBreadCrumb.common.min.js"></script>
    [#-- hint 提示 --]
    <script type="text/javascript" src="${base}/resources/lib/hint/hint.common.min.js"></script>
    [#-- validate For Hint 验证器提示 --]
    <script type="text/javascript" src="${base}/resources/lib/hint/hint.validate.min.js"></script>
	[#-- admin.edit 管理员编辑 --]
	<script type="text/javascript">
		var previousEmail = "${admin.email}";
	</script>
	<script type="text/javascript" src="${base}/resources/admin/js/admin.edit.min.js"></script>
    [#-- 有瞬时消息时 --]
	[#if flashMessage != null]
	    [#-- HubSpot Messenger 弹框（Alert）组件库 --]
		<script type="text/javascript" src="${base}/resources/lib/messenger/messenger.min.js"></script>
		<script type="text/javascript" src="${base}/resources/lib/messenger/messenger.theme.future.min.js"></script>
		<script type="text/javascript" src="${base}/resources/lib/messenger/messenger.common.min.js"></script>
		[#-- 瞬时消息 --]
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