[#-- 存在回收时 --]
[#if assignment.recoveries?size gt 0]
	[#-- 回收信息 --]
	<div id="assignment_recovery" class="tab-pane" tab-id="assignment_recovery_tab">
		[#-- 标签 --]
		<div class="tabbable">
		
			[#-- 选项卡 --]
			<ul class="nav nav-tabs">
				[#--
				[#if assignment.recoveries?size gt 1]
					<li class="active">
						<a id="assignment_recoveries_tab" href="#assignment_recoveries" data-toggle="tab">回收</a>
					</li>
				[/#if]
				--]
				<li class="active">
					<a id="assignment_recoveries_tab" href="#assignment_recoveries" data-toggle="tab">回收</a>
				</li>
				<li>
					<a id="assignment_recovery_plans_tab" href="#assignment_recovery_plans" data-toggle="tab">回收计划</a>
				</li>
				[#-- 存在回收资金时 --]
				[#if recoveryCapitals?size gt 0]
					<li>
						<a id="assignment_recovery_capitals_tab" href="#assignment_recovery_capitals" data-toggle="tab">回收资金</a>
					</li>
				[/#if]
			</ul>
			
			[#-- 选项卡内容 --]
			<div class="tab-content">
				
				[#-- 回收 --]
				[#--
				[#if assignment.recoveries?size gt 1]
					<div id="assignment_recoveries" class="tab-pane active" tab-id="assignment_recoveries_tab">
						[#assign recoveries = assignment.recoveries /]
				    	[#include "/admin/recovery/view_list.ftl" /]
					</div>
				[/#if]
				--]
				<div id="assignment_recoveries" class="tab-pane active" tab-id="assignment_recoveries_tab">
					[#assign recoveries = assignment.recoveries /]
			    	[#include "/admin/recovery/view_list.ftl" /]
				</div>
				
				[#-- 回收计划 --]
				<div id="assignment_recovery_plans" class="tab-pane" tab-id="assignment_recovery_plans_tab">
					[#assign recoveryPlans = assignment.recoveryPlans /]
			    	[#include "/admin/recovery_plan/view_list.ftl" /]
				</div>
				
				[#-- 存在回收资金时 --]
				[#if recoveryCapitals?size gt 0]
					[#-- 回收资金 --]
					<div id="assignment_recovery_capitals" class="tab-pane" tab-id="assignment_recovery_capitals_tab">
						[#assign capitals = recoveryCapitals /]
				    	[#include "/admin/capital/view_recovery_list.ftl" /]
					</div>
				[/#if]
		
			</div>
			
		</div>
	</div>
[/#if]