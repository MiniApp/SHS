[#-- 存在还款时 --]
[#if borrowing.repayments?size gt 0]
	[#-- 回收信息 --]
	<div id="recovery" class="tab-pane" tab-id="recovery_tab">
		[#-- 标签 --]
		<div class="tabbable">
		
			[#-- 选项卡 --]
			<ul class="nav nav-tabs">
				[#--
				[#if borrowing.investments?size gt 1]
					<li class="active">
						<a id="recoverys_tab" href="#recoverys" data-toggle="tab">回收</a>
					</li>
				[/#if]
				--]
				<li class="active">
					<a id="recoverys_tab" href="#recoverys" data-toggle="tab">回收</a>
				</li>
				<li>
					<a id="recovery_records_tab" href="#recovery_records" data-toggle="tab">回收记录</a>
				</li>
				[#-- 存在回收资金时 --]
				[#if recoveryCapitals?size gt 0]
					<li>
						<a id="recovery_capitals_tab" href="#recovery_capitals" data-toggle="tab">回收资金</a>
					</li>
				[/#if]
			</ul>
			
			[#-- 选项卡内容 --]
			<div class="tab-content">
				
				[#-- 回收 --]
				[#--
				[#if borrowing.investments?size gt 1]
					<div id="recoverys" class="tab-pane active" tab-id="recoverys_tab">
						[#assign recoverys = borrowing.investments /]
				    	[#include "/template/admin/recovery/view_list.ftl" /]
					</div>
				[/#if]
				--]
				<div id="recoverys" class="tab-pane active" tab-id="recoverys_tab">
					[#assign recoverys = borrowing.investments /]
			    	[#include "/template/admin/recovery/view_list.ftl" /]
				</div>
				
				[#-- 回收记录 --]
				<div id="recovery_records" class="tab-pane" tab-id="recovery_records_tab">
					[#assign recoveryRecords = borrowing.recoveryRecords /]
			    	[#include "/template/admin/recovery_record/view_list.ftl" /]
				</div>
				
				[#-- 存在回收资金时 --]
				[#if recoveryCapitals?size gt 0]
					[#-- 回收资金 --]
					<div id="recovery_capitals" class="tab-pane" tab-id="recovery_capitals_tab">
						[#assign capitals = recoveryCapitals /]
				    	[#include "/template/admin/capital/view_recovery_list.ftl" /]
					</div>
				[/#if]
		
			</div>
			
		</div>
	</div>
[/#if]