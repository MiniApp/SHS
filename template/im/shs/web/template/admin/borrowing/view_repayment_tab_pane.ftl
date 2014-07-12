[#-- 存在还款时 --]
[#if borrowing.repayments?size gt 0]
	[#-- 还款信息 --]
	<div id="repayment" class="tab-pane" tab-id="repayment_tab">
		[#-- 标签 --]
		<div class="tabbable">
		
			[#-- 选项卡 --]
			<ul class="nav nav-tabs">
				[#--
				[#if borrowing.repayments?size gt 1]
					<li class="active">
						<a id="repayments_tab" href="#repayments" data-toggle="tab">还款</a>
					</li>
				[/#if]
				--]
				<li class="active">
					<a id="repayments_tab" href="#repayments" data-toggle="tab">还款</a>
				</li>
				<li>
					<a id="repayment_records_tab" href="#repayment_records" data-toggle="tab">还款记录</a>
				</li>
				[#-- 存在还款资金时 --]
				[#if repaymentCapitals?size gt 0]
					<li>
						<a id="repayment_capitals_tab" href="#repayment_capitals" data-toggle="tab">还款资金</a>
					</li>
				[/#if]
			</ul>
			
			[#-- 选项卡内容 --]
			<div class="tab-content">
				
				[#-- 还款 --]
				[#--
				[#if borrowing.repayments?size gt 1]
					<div id="repayments" class="tab-pane active" tab-id="repayments_tab">
						[#assign repayments = borrowing.repayments /]
				    	[#include "/template/admin/repayment/view_list.ftl" /]
					</div>
				[/#if]
				--]
				<div id="repayments" class="tab-pane active" tab-id="repayments_tab">
					[#assign repayments = borrowing.repayments /]
			    	[#include "/template/admin/repayment/view_list.ftl" /]
				</div>
				
				[#-- 还款记录 --]
				<div id="repayment_records" class="tab-pane" tab-id="repayment_records_tab">
					[#assign repaymentRecords = borrowing.repaymentRecords /]
			    	[#include "/template/admin/repayment_record/view_list.ftl" /]
				</div>
				
				[#-- 存在还款资金时 --]
				[#if repaymentCapitals?size gt 0]
					[#-- 还款资金 --]
					<div id="repayment_capitals" class="tab-pane" tab-id="repayment_capitals_tab">
						[#assign capitals = repaymentCapitals /]
				    	[#include "/template/admin/capital/view_repayment_list.ftl" /]
					</div>
				[/#if]
		
			</div>
			
		</div>
	</div>
[/#if]