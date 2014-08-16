[#-- 存在回收时 --]
[#if borrowing.recoveries?size gt 0]
	[#-- 回收信息 --]
	<div id="borrowing_recovery" class="tab-pane" tab-id="borrowing_recovery_tab">
		[#-- 标签 --]
		<div class="tabbable">
		
			[#-- 选项卡 --]
			<ul class="nav nav-tabs">
				[#--
				[#if borrowing.recoveries?size gt 1]
					<li class="active">
						<a id="borrowing_recoveries_tab" href="#borrowing_recoveries" data-toggle="tab">回收</a>
					</li>
				[/#if]
				--]
				<li class="active">
					<a id="borrowing_recoveries_tab" href="#borrowing_recoveries" data-toggle="tab">回收</a>
				</li>
				<li>
					<a id="borrowing_recovery_plans_tab" href="#borrowing_recovery_plans" data-toggle="tab">回收计划</a>
				</li>
				[#-- 存在回收资金时 --]
				[#if recoveryCapitals?size gt 0]
					<li>
						<a id="borrowing_recovery_capitals_tab" href="#borrowing_recovery_capitals" data-toggle="tab">回收资金</a>
					</li>
				[/#if]
			</ul>
			
			[#-- 选项卡内容 --]
			<div class="tab-content">
				
				[#-- 回收 --]
				[#--
				[#if borrowing.recoveries?size gt 1]
					<div id="borrowing_recoveries" class="tab-pane active" tab-id="borrowing_recoveries_tab">
						[#assign recoveries = borrowing.recoveries /]
				    	[#include "/template/admin/recovery/view_list.ftl" /]
					</div>
				[/#if]
				--]
				<div id="borrowing_recoveries" class="tab-pane active" tab-id="borrowing_recoveries_tab">
					[#assign recoveries = borrowing.recoveries /]
			    	[#include "/template/admin/recovery/view_list.ftl" /]
				</div>
				
				[#-- 回收计划 --]
				<div id="borrowing_recovery_plans" class="tab-pane" tab-id="borrowing_recovery_plans_tab">
					[#assign recoveryPlans = borrowing.recoveryPlans /]
			    	[#include "/template/admin/recovery_plan/view_list.ftl" /]
				</div>
				
				[#-- 存在回收资金时 --]
				[#if recoveryCapitals?size gt 0]
					[#-- 回收资金 --]
					<div id="borrowing_recovery_capitals" class="tab-pane" tab-id="borrowing_recovery_capitals_tab">
						[#assign capitals = recoveryCapitals /]
				    	[#include "/template/admin/capital/view_recovery_list.ftl" /]
					</div>
				[/#if]
		
			</div>
			
		</div>
	</div>
[/#if]