[#list ["admin:member", "admin:member_regist", "admin:member_modif", "admin:pers", "admin:pers_regist", "admin:pers_modif", "admin:corp", "admin:corp_modif"] as permission]
[@shiro.hasPermission name = permission]
	<div class="panel panel-default">
		<div class="panel-heading">
			<a href="#collapse_member" data-parent="#side_accordion" data-toggle="collapse" class="accordion-toggle">
				<i class="glyphicon glyphicon-user"></i>
				会员管理
			</a>
		</div>
		<div class="accordion-body collapse" id="collapse_member">
			<div class="panel-body">
				<ul class="nav nav-pills nav-stacked">
				
					[#-- 会员管理 --]
					[#list ["admin:member", "admin:member_regist", "admin:member_modif"] as permission]
					[@shiro.hasPermission name = permission]
						<li class="nav-header">会员管理</li>
						[@shiro.hasPermission name="admin:member"]
							<li><a href="${base}/admin/member" target="iframe">会员列表</a></li>
						[/@shiro.hasPermission]
						[@shiro.hasPermission name="admin:member_regist"]
							<li><a href="${base}/admin/member_regist" target="iframe">会员注册</a></li>
						[/@shiro.hasPermission]
						[@shiro.hasPermission name="admin:member_modif"]
							<li><a href="${base}/admin/member_modif" target="iframe">会员修改</a></li>
						[/@shiro.hasPermission]
						[#break /]
					[/@shiro.hasPermission]
					[/#list]
				
					[#-- 个人管理 --]
					[#list ["admin:pers", "admin:pers_regist", "admin:pers_modif"] as permission]
					[@shiro.hasPermission name = permission]
						<li class="nav-header">个人管理</li>
						[@shiro.hasPermission name="admin:pers"]
							<li><a href="${base}/admin/pers" target="iframe">个人列表</a></li>
						[/@shiro.hasPermission]
						[@shiro.hasPermission name="admin:pers_regist"]
							<li><a href="${base}/admin/pers_regist" target="iframe">个人登记</a></li>
						[/@shiro.hasPermission]
						[@shiro.hasPermission name="admin:pers_modif"]
							<li><a href="${base}/admin/pers_modif" target="iframe">个人修改</a></li>
						[/@shiro.hasPermission]
						[#break /]
					[/@shiro.hasPermission]
					[/#list]
				
					[#-- 公司管理 --]
					[#list ["admin:corp", "admin:corp_modif"] as permission]
					[@shiro.hasPermission name = permission]
						<li class="nav-header">公司管理</li>
						[@shiro.hasPermission name="admin:corp"]
							<li><a href="${base}/admin/corp" target="iframe">公司列表</a></li>
						[/@shiro.hasPermission]
						[@shiro.hasPermission name="admin:corp_modif"]
							<li><a href="${base}/admin/corp_modif" target="iframe">公司修改</a></li>
						[/@shiro.hasPermission]
						[#break /]
					[/@shiro.hasPermission]
					[/#list]
					
				</ul>
			</div>
		</div>
	</div>
	[#break /]
[/@shiro.hasPermission]
[/#list]