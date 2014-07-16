[#-- 存在回购时 --]
[#if assignment.repayments?size gt 0]
	[#-- 回购信息 --]
	<div id="assignment_buyback" class="tab-pane" tab-id="assignment_buyback_tab">
		[#-- 标签 --]
		<div class="tabbable">
		
			[#-- 选项卡 --]
			<ul class="nav nav-tabs">
				[#--
				[#if assignment.repayments?size gt 1]
					<li class="active">
						<a id="assignment_buybacks_tab" href="#assignment_buybacks" data-toggle="tab">回购</a>
					</li>
				[/#if]
				--]
				<li class="active">
					<a id="assignment_buybacks_tab" href="#assignment_buybacks" data-toggle="tab">回购</a>
				</li>
				<li>
					<a id="assignment_buyback_plans_tab" href="#assignment_buyback_plans" data-toggle="tab">回购计划</a>
				</li>
				[#-- 存在回购资金时 --]
				[#if buybackCapitals?size gt 0]
					<li>
						<a id="assignment_buyback_capitals_tab" href="#assignment_buyback_capitals" data-toggle="tab">回购资金</a>
					</li>
				[/#if]
			</ul>
			
			[#-- 选项卡内容 --]
			<div class="tab-content">
				
				[#-- 回购 --]
				[#--
				[#if assignment.repayments?size gt 1]
					<div id="assignment_buybacks" class="tab-pane active" tab-id="assignment_buybacks_tab">
						[#assign buybacks = assignment.repayments /]
				    	[#include "/template/admin/buyback/view_list.ftl" /]
					</div>
				[/#if]
				--]
				<div id="assignment_buybacks" class="tab-pane active" tab-id="assignment_buybacks_tab">
					[#assign buybacks = assignment.repayments /]
			    	[#include "/template/admin/buyback/view_list.ftl" /]
				</div>
				
				[#-- 回购计划 --]
				<div id="assignment_buyback_plans" class="tab-pane" tab-id="assignment_buyback_plans_tab">
					[#assign buybackPlans = assignment.repaymentPlans /]
			    	[#include "/template/admin/buyback_plan/view_list.ftl" /]
				</div>
				
				[#-- 存在回购资金时 --]
				[#if buybackCapitals?size gt 0]
					[#-- 回购资金 --]
					<div id="assignment_buyback_capitals" class="tab-pane" tab-id="assignment_buyback_capitals_tab">
						[#assign capitals = buybackCapitals /]
				    	[#include "/template/admin/capital/view_buyback_list.ftl" /]
					</div>
				[/#if]
		
			</div>
			
		</div>
	</div>
[/#if]