[#-- 存在还款时 --]
[#if borrowing.repayments?size gt 0]
	[#-- 还款信息 --]
	<div id="borrowing_repayment" class="tab-pane" tab-id="borrowing_repayment_tab">
		[#-- 标签 --]
		<div class="tabbable">
		
			[#-- 选项卡 --]
			<ul class="nav nav-tabs">
				[#--
				[#if borrowing.repayments?size gt 1]
					<li class="active">
						<a id="borrowing_repayments_tab" href="#borrowing_repayments" data-toggle="tab">还款</a>
					</li>
				[/#if]
				--]
				<li class="active">
					<a id="borrowing_repayments_tab" href="#borrowing_repayments" data-toggle="tab">还款</a>
				</li>
				<li>
					<a id="borrowing_repayment_plans_tab" href="#borrowing_repayment_plans" data-toggle="tab">还款计划</a>
				</li>
				[#-- 存在还款资金时 --]
				[#if repaymentCapitals?size gt 0]
					<li>
						<a id="borrowing_repayment_capitals_tab" href="#borrowing_repayment_capitals" data-toggle="tab">还款资金</a>
					</li>
				[/#if]
			</ul>
			
			[#-- 选项卡内容 --]
			<div class="tab-content">
				
				[#-- 还款 --]
				[#--
				[#if borrowing.repayments?size gt 1]
					<div id="borrowing_repayments" class="tab-pane active" tab-id="borrowing_repayments_tab">
						[#assign repayments = borrowing.repayments /]
				    	[#include "/template/admin/repayment/view_list.ftl" /]
					</div>
				[/#if]
				--]
				<div id="borrowing_repayments" class="tab-pane active" tab-id="borrowing_repayments_tab">
					[#assign repayments = borrowing.repayments /]
			    	[#include "/template/admin/repayment/view_list.ftl" /]
				</div>
				
				[#-- 还款计划 --]
				<div id="borrowing_repayment_plans" class="tab-pane" tab-id="borrowing_repayment_plans_tab">
					[#assign repaymentPlans = borrowing.repaymentPlans /]
			    	[#include "/template/admin/repayment_plan/view_list.ftl" /]
				</div>
				
				[#-- 存在还款资金时 --]
				[#if repaymentCapitals?size gt 0]
					[#-- 还款资金 --]
					<div id="borrowing_repayment_capitals" class="tab-pane" tab-id="borrowing_repayment_capitals_tab">
						[#assign capitals = repaymentCapitals /]
				    	[#include "/template/admin/capital/view_repayment_list.ftl" /]
					</div>
				[/#if]
		
			</div>
			
		</div>
	</div>
[/#if]