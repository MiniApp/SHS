[#-- 存在投资时 --]
[#if borrowing.investments?size gt 0]
	[#-- 投资信息 --]
	<div id="borrowing_investment" class="tab-pane" tab-id="borrowing_investment_tab">
		[#-- 标签 --]
		<div class="tabbable">
		
			[#-- 选项卡 --]
			<ul class="nav nav-tabs">
				[#--
				[#if borrowing.investments?size gt 1]
					<li class="active">
						<a id="borrowing_investments_tab" href="#borrowing_investments" data-toggle="tab">投资</a>
					</li>
				[/#if]
				--]
				<li class="active">
					<a id="borrowing_investments_tab" href="#borrowing_investments" data-toggle="tab">投资</a>
				</li>
				<li>
					<a id="borrowing_investment_records_tab" href="#borrowing_investment_records" data-toggle="tab">投资记录</a>
				</li>
				<li>
					<a id="borrowing_investment_capitals_tab" href="#borrowing_investment_capitals" data-toggle="tab">投资资金</a>
				</li>
			</ul>
			
			[#-- 选项卡内容 --]
			<div class="tab-content">
				
				[#-- 投资 --]
				[#--
				[#if borrowing.investments?size gt 1]
					<div id="borrowing_investments" class="tab-pane active" tab-id="borrowing_investments_tab">
						[#assign investments = borrowing.investments /]
				    	[#include "/template/admin/investment/view_list.ftl" /]
					</div>
				[/#if]
				--]
				<div id="borrowing_investments" class="tab-pane active" tab-id="borrowing_investments_tab">
					[#assign investments = borrowing.investments /]
			    	[#include "/template/admin/investment/view_list.ftl" /]
				</div>
				
				[#-- 投资记录 --]
				<div id="borrowing_investment_records" class="tab-pane" tab-id="borrowing_investment_records_tab">
					[#assign investmentRecords = borrowing.investmentRecords /]
			    	[#include "/template/admin/investment_record/view_list.ftl" /]
				</div>
				
				[#-- 投资资金 --]
				<div id="borrowing_investment_capitals" class="tab-pane" tab-id="borrowing_investment_capitals_tab">
					[#assign capitals = investmentCapitals /]
			    	[#include "/template/admin/capital/view_investment_list.ftl" /]
				</div>
		
			</div>
			
		</div>
	</div>
[/#if]