[#-- 存在投资时 --]
[#if assignment.investments?size gt 0]
	[#-- 投资信息 --]
	<div id="assignment_investment" class="tab-pane" tab-id="assignment_investment_tab">
		[#-- 标签 --]
		<div class="tabbable">
		
			[#-- 选项卡 --]
			<ul class="nav nav-tabs">
				[#--
				[#if assignment.investments?size gt 1]
					<li class="active">
						<a id="assignment_investments_tab" href="#assignment_investments" data-toggle="tab">投资</a>
					</li>
				[/#if]
				--]
				<li class="active">
					<a id="assignment_investments_tab" href="#assignment_investments" data-toggle="tab">投资</a>
				</li>
				<li>
					<a id="assignment_investment_records_tab" href="#assignment_investment_records" data-toggle="tab">投资记录</a>
				</li>
				<li>
					<a id="assignment_investment_capitals_tab" href="#assignment_investment_capitals" data-toggle="tab">投资资金</a>
				</li>
			</ul>
			
			[#-- 选项卡内容 --]
			<div class="tab-content">
				
				[#-- 投资 --]
				[#--
				[#if assignment.investments?size gt 1]
					<div id="assignment_investments" class="tab-pane active" tab-id="assignment_investments_tab">
						[#assign investments = assignment.investments /]
				    	[#include "/admin/investment/view_list.ftl" /]
					</div>
				[/#if]
				--]
				<div id="assignment_investments" class="tab-pane active" tab-id="assignment_investments_tab">
					[#assign investments = assignment.investments /]
			    	[#include "/admin/investment/view_list.ftl" /]
				</div>
				
				[#-- 投资记录 --]
				<div id="assignment_investment_records" class="tab-pane" tab-id="assignment_investment_records_tab">
					[#assign investmentRecords = assignment.investmentRecords /]
			    	[#include "/admin/investment_record/view_list.ftl" /]
				</div>
				
				[#-- 投资资金 --]
				<div id="assignment_investment_capitals" class="tab-pane" tab-id="assignment_investment_capitals_tab">
					[#assign capitals = investmentCapitals /]
			    	[#include "/admin/capital/view_investment_list.ftl" /]
				</div>
		
			</div>
			
		</div>
	</div>
[/#if]