[#list ["admin:assignment_apply", "admin:assignment_inquiry", "admin:assignment_confirm", "admin:assignment_investing", "admin:assignment_invest_expired", "admin:assignment_buybacking", "admin:assignment_buyback", "admin:assignment_finished", "admin:assignment_inquiry_failure", "admin:assignment_confirm_failure", "admin:assignment_invest_failure"] as permission]
[@shiro.hasPermission name = permission]
	<div class="panel panel-default">
		<div class="panel-heading">
			<a href="#collapse_assignment" data-parent="#side_accordion" data-toggle="collapse" class="accordion-toggle">
				<i class="glyphicon glyphicon-transfer"></i>
				转让管理
			</a>
		</div>
		<div class="accordion-body collapse" id="collapse_assignment">
			<div class="panel-body">
				<ul class="nav nav-pills nav-stacked">
				
					[#-- 转让筹备管理 --]
					[#list ["admin:assignment_apply", "admin:assignment_inquiry", "admin:assignment_confirm", "admin:assignment_investing", "admin:assignment_invest_expired"] as permission]
					[@shiro.hasPermission name = permission]
						<li class="nav-header">转让筹备管理</li>
						[@shiro.hasPermission name="admin:assignment_apply"]
							<li><a href="${baseUrl}/assignment_apply" target="iframe">转让申请</a></li>
						[/@shiro.hasPermission]
						[@shiro.hasPermission name="admin:assignment_inquiry"]
							<li><a href="${baseUrl}/assignment_inquiry" target="iframe">转让调查</a></li>
						[/@shiro.hasPermission]
						[@shiro.hasPermission name="admin:assignment_confirm"]
							<li><a href="${baseUrl}/assignment_confirm" target="iframe">转让确认</a></li>
						[/@shiro.hasPermission]
						[@shiro.hasPermission name="admin:assignment_investing"]
							<li><a href="${baseUrl}/assignment_investing" target="iframe">转让投资中</a></li>
						[/@shiro.hasPermission]
						[@shiro.hasPermission name="admin:assignment_invest_expired"]
							<li><a href="${baseUrl}/assignment_invest_expired" target="iframe">转让投资已过期</a></li>
						[/@shiro.hasPermission]
						[#break /]
					[/@shiro.hasPermission]
					[/#list]
					
					[#-- 转让维护管理 --]
					[#list ["admin:assignment_buybacking", "admin:assignment_buyback", "admin:assignment_finished"] as permission]
					[@shiro.hasPermission name = permission]
						<li class="nav-header">转让维护管理</li>
						[@shiro.hasPermission name="admin:assignment_buybacking"]
							<li><a href="${baseUrl}/assignment_buybacking" target="iframe">转让回购中</a></li>
						[/@shiro.hasPermission]
						[@shiro.hasPermission name="admin:assignment_buyback"]
							<li><a href="${baseUrl}/assignment_buyback" target="iframe">转让回购</a></li>
						[/@shiro.hasPermission]
						[@shiro.hasPermission name="admin:assignment_finished"]
							<li><a href="${baseUrl}/assignment_finished" target="iframe">转让已完成</a></li>
						[/@shiro.hasPermission]
						[#break /]
					[/@shiro.hasPermission]
					[/#list]
					
					[#-- 转让失败管理 --]
					[#list ["admin:assignment_inquiry_failure", "admin:assignment_confirm_failure", "admin:assignment_invest_failure"] as permission]
					[@shiro.hasPermission name = permission]
						<li class="nav-header">转让失败管理</li>
						[@shiro.hasPermission name="admin:assignment_inquiry_failure"]
							<li><a href="${baseUrl}/assignment_inquiry_failure" target="iframe">转让调查已失败</a></li>
						[/@shiro.hasPermission]
						[@shiro.hasPermission name="admin:assignment_confirm_failure"]
							<li><a href="${baseUrl}/assignment_confirm_failure" target="iframe">转让确认已失败</a></li>
						[/@shiro.hasPermission]
						[@shiro.hasPermission name="admin:assignment_invest_failure"]
							<li><a href="${baseUrl}/assignment_invest_failure" target="iframe">转让投资已失败</a></li>
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