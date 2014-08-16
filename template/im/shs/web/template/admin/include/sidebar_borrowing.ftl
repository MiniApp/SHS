[#list ["admin:borrowing_apply", "admin:borrowing_inquiry", "admin:borrowing_confirm", "admin:borrowing_investing", "admin:borrowing_invest_expired", "admin:borrowing_lend", "admin:borrowing_repaying", "admin:borrowing_repay", "admin:borrowing_finished", "admin:borrowing_inquiry_failure", "admin:borrowing_confirm_failure", "admin:borrowing_invest_failure", "admin:borrowing_lend_failure"] as permission]
[@shiro.hasPermission name = permission]
	<div class="panel panel-default">
		<div class="panel-heading">
			<a href="#collapse_borrowing" data-parent="#side_accordion" data-toggle="collapse" class="accordion-toggle">
				<i class="glyphicon glyphicon-folder-close"></i>
				借款管理
			</a>
		</div>
		<div class="accordion-body collapse" id="collapse_borrowing">
			<div class="panel-body">
				<ul class="nav nav-pills nav-stacked">
				
					[#-- 借款筹备管理 --]
					[#list ["admin:borrowing_apply", "admin:borrowing_inquiry", "admin:borrowing_confirm", "admin:borrowing_investing", "admin:borrowing_invest_expired", "admin:borrowing_lend"] as permission]
					[@shiro.hasPermission name = permission]
						<li class="nav-header">借款筹备管理</li>
						[@shiro.hasPermission name="admin:borrowing_apply"]
							<li><a href="${baseUrl}/borrowing_apply" target="iframe">借款申请</a></li>
						[/@shiro.hasPermission]
						[@shiro.hasPermission name="admin:borrowing_inquiry"]
							<li><a href="${baseUrl}/borrowing_inquiry" target="iframe">借款调查</a></li>
						[/@shiro.hasPermission]
						[@shiro.hasPermission name="admin:borrowing_confirm"]
							<li><a href="${baseUrl}/borrowing_confirm" target="iframe">借款确认</a></li>
						[/@shiro.hasPermission]
						[@shiro.hasPermission name="admin:borrowing_investing"]
							<li><a href="${baseUrl}/borrowing_investing" target="iframe">借款投资中</a></li>
						[/@shiro.hasPermission]
						[@shiro.hasPermission name="admin:borrowing_invest_expired"]
							<li><a href="${baseUrl}/borrowing_invest_expired" target="iframe">借款投资已过期</a></li>
						[/@shiro.hasPermission]
						[@shiro.hasPermission name="admin:borrowing_lend"]
							<li><a href="${baseUrl}/borrowing_lend" target="iframe">借款出借</a></li>
						[/@shiro.hasPermission]
						[#break /]
					[/@shiro.hasPermission]
					[/#list]
					
					[#-- 借款维护管理 --]
					[#list ["admin:borrowing_repaying", "admin:borrowing_repay", "admin:borrowing_finished"] as permission]
					[@shiro.hasPermission name = permission]
						<li class="nav-header">借款维护管理</li>
						[@shiro.hasPermission name="admin:borrowing_repaying"]
							<li><a href="${baseUrl}/borrowing_repaying" target="iframe">借款还款中</a></li>
						[/@shiro.hasPermission]
						[@shiro.hasPermission name="admin:borrowing_repay"]
							<li><a href="${baseUrl}/borrowing_repay" target="iframe">借款还款</a></li>
						[/@shiro.hasPermission]
						[@shiro.hasPermission name="admin:borrowing_finished"]
							<li><a href="${baseUrl}/borrowing_finished" target="iframe">借款已完成</a></li>
						[/@shiro.hasPermission]
						[#break /]
					[/@shiro.hasPermission]
					[/#list]
					
					[#-- 借款失败管理 --]
					[#list ["admin:borrowing_inquiry_failure", "admin:borrowing_confirm_failure", "admin:borrowing_invest_failure", "admin:borrowing_lend_failure"] as permission]
					[@shiro.hasPermission name = permission]
						<li class="nav-header">借款失败管理</li>
						[@shiro.hasPermission name="admin:borrowing_inquiry_failure"]
							<li><a href="${baseUrl}/borrowing_inquiry_failure" target="iframe">借款调查已失败</a></li>
						[/@shiro.hasPermission]
						[@shiro.hasPermission name="admin:borrowing_confirm_failure"]
							<li><a href="${baseUrl}/borrowing_confirm_failure" target="iframe">借款确认已失败</a></li>
						[/@shiro.hasPermission]
						[@shiro.hasPermission name="admin:borrowing_invest_failure"]
							<li><a href="${baseUrl}/borrowing_invest_failure" target="iframe">借款投资已失败</a></li>
						[/@shiro.hasPermission]
						[@shiro.hasPermission name="admin:borrowing_lend_failure"]
							<li><a href="${baseUrl}/borrowing_lend_failure" target="iframe">借款出借已失败</a></li>
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