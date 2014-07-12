[#-- 标签 --]
<div class="tabbable">

	[#-- 选项卡 --]
	<ul class="nav nav-tabs">
		<li class="active">
			<a id="pers_basic_tab" href="#pers_basic" data-toggle="tab">基本信息</a>
		</li>
		<li>
			<a id="pers_family_tab" href="#pers_family" data-toggle="tab">家庭信息</a>
		</li>
		
		[#-- 非法人代表时 --]
		[#if !pers.corporator && !corporator]
			<li>
				<a id="pers_work_tab" href="#pers_work" data-toggle="tab">工作信息</a>
			</li>
		[/#if]
		
		<li>
			<a id="pers_asset_tab" href="#pers_asset" data-toggle="tab">资产信息</a>
		</li>
		<li>
			<a id="member_tab" href="#member" data-toggle="tab">会员信息</a>
		</li>
	</ul>
	
	[#-- 选项卡内容 --]
	<div class="tab-content">
			
		[#-- 基本信息--]
		<div id="pers_basic" class="tab-pane active" tab-id="pers_basic_tab">
	    	[#include "/template/admin/pers/view/basic.ftl" /]
		</div>

		[#-- 家庭信息--]
		<div id="pers_family" class="tab-pane" tab-id="pers_family_tab">
	    	[#include "/template/admin/pers/view/family.ftl" /]
		</div>

					
		[#-- 非法人代表时--]
		[#if !pers.corporator && !corporator]
			[#-- 工作信息--]
			<div id="pers_work" class="tab-pane" tab-id="pers_work_tab">
		    	[#include "/template/admin/pers/view/work.ftl" /]
			</div>
		[/#if]

		[#-- 资产信息--]
		<div id="pers_asset" class="tab-pane" tab-id="pers_asset_tab">
	    	[#include "/template/admin/pers/view/asset.ftl" /]
		</div>

		[#-- 会员信息 --]
		<div id="member" class="tab-pane" tab-id="member_tab">
	    	[#include "/template/admin/pers/view/member.ftl" /]
		</div>

	</div>
	
</div>