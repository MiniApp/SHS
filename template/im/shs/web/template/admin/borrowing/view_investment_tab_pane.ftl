[#-- 存在投资时 --]
[#if borrowing.investments?size gt 0]
	[#-- 投资信息 --]
	<div id="investment" class="tab-pane" tab-id="investment_tab">
		[#-- 标签 --]
		<div class="tabbable">
		
			[#-- 选项卡 --]
			<ul class="nav nav-tabs">
				[#--
				[#if borrowing.investments?size gt 1]
					<li class="active">
						<a id="investments_tab" href="#investments" data-toggle="tab">投资</a>
					</li>
				[/#if]
				--]
				<li class="active">
					<a id="investments_tab" href="#investments" data-toggle="tab">投资</a>
				</li>
				<li>
					<a id="investment_records_tab" href="#investment_records" data-toggle="tab">投资记录</a>
				</li>
				<li>
					<a id="investment_capitals_tab" href="#investment_capitals" data-toggle="tab">投资资金</a>
				</li>
			</ul>
			
			[#-- 选项卡内容 --]
			<div class="tab-content">
				
				[#-- 投资 --]
				[#--
				[#if borrowing.investments?size gt 1]
					<div id="investments" class="tab-pane active" tab-id="investments_tab">
						[#assign investments = borrowing.investments /]
				    	[#include "/template/admin/investment/view_list.ftl" /]
					</div>
				[/#if]
				--]
				<div id="investments" class="tab-pane active" tab-id="investments_tab">
					[#assign investments = borrowing.investments /]
			    	[#include "/template/admin/investment/view_list.ftl" /]
				</div>
				
				[#-- 投资记录 --]
				<div id="investment_records" class="tab-pane" tab-id="investment_records_tab">
					[#assign investmentRecords = borrowing.investmentRecords /]
			    	[#include "/template/admin/investment_record/view_list.ftl" /]
				</div>
				
				[#-- 投资资金 --]
				<div id="investment_capitals" class="tab-pane" tab-id="investment_capitals_tab">
					[#assign capitals = investmentCapitals /]
			    	[#include "/template/admin/capital/view_investment_list.ftl" /]
				</div>
		
			</div>
			
		</div>
	</div>
[/#if]