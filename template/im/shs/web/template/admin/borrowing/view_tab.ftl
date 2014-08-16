[#-- 标签 --]
<div class="tabbable">

	[#-- 选项卡 --]
	<ul class="nav nav-tabs">
		<li class="active">
			<a id="borrowing_basic_tab" href="#borrowing_basic" data-toggle="tab">基本信息</a>
		</li>
		<li>
			<a id="borrowing_inquiry_tab" href="#borrowing_inquiry" data-toggle="tab">调查信息</a>
		</li>
		<li>
			<a id="borrowing_guarantee_tab" href="#borrowing_guarantee" data-toggle="tab">担保信息</a>
		</li>
		<li>
			<a id="borrowing_risk_control_tab" href="#borrowing_risk_control" data-toggle="tab">风控信息</a>
		</li>
		[#-- 存在借款材料时 --]
		[#if borrowing.materials]
			<li>
				<a id="borrowing_materials_tab" href="#borrowing_materials" data-toggle="tab">材料信息</a>
			</li>
		[/#if]
		[#-- 存在借款意见时 --]
		[#if borrowing.opinions?size gt 0]
			<li>
				<a id="borrowing_opinions_tab" href="#borrowing_opinions" data-toggle="tab">意见信息</a>
			</li>
		[/#if]
	</ul>
	
	[#-- 选项卡内容 --]
	<div class="tab-content">
			
		[#-- 基本信息 --]
		<div id="borrowing_basic" class="tab-pane active" tab-id="borrowing_basic_tab">
	    	[#include "/template/admin/borrowing/view/basic.ftl" /]
		</div>
		
		[#-- 调查信息 --]
		<div id="borrowing_inquiry" class="tab-pane" tab-id="borrowing_inquiry_tab">
	    	[#include "/template/admin/borrowing/view/inquiry.ftl" /]
		</div>
		
		[#-- 担保信息 --]
		<div id="borrowing_guarantee" class="tab-pane" tab-id="borrowing_guarantee_tab">
	    	[#include "/template/admin/borrowing/view/guarantee.ftl" /]
		</div>
		
		[#-- 风控信息 --]
		<div id="borrowing_risk_control" class="tab-pane" tab-id="borrowing_risk_control_tab">
	    	[#include "/template/admin/borrowing/view/risk_control.ftl" /]
		</div>
		
		[#-- 存在借款材料时 --]
		[#if borrowing.materials]
			[#-- 材料信息 --]
			<div id="borrowing_materials" class="tab-pane" tab-id="borrowing_materials_tab">
		    	[#include "/template/admin/borrowing/view/material.ftl" /]
			</div>
		[/#if]
					
		[#-- 存在借款意见时 --]
		[#if borrowing.opinions?size gt 0]
			[#-- 意见信息 --]
			<div id="borrowing_opinions" class="tab-pane" tab-id="borrowing_opinions_tab">
				[#assign opinions = borrowing.opinions /]
		    	[#include "/template/admin/borrowing_opinion/view_list.ftl" /]
			</div>
		[/#if]

	</div>
	
</div>