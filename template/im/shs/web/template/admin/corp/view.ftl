[#-- 公司名称 --]
<div class="form-group">
	<label class="col-sm-2 control-label">
		公司名称
	</label>
	<div class="col-sm-4">
		<p class="form-control-static">
			<strong>
				[#if corp != null]
					${corp.name}
				[#else]
					-
				[/#if]
			</strong>
		</p>
	</div>
</div>

[#-- 公司类别 --]
<div class="form-group">
	<label class="col-sm-2 control-label">
		公司类别
	</label>
	<div class="col-sm-4">
		<p class="form-control-static">
			<strong>
				[#if corp != null]
					${corp.type}
				[#else]
					-
				[/#if]
			</strong>
		</p>
	</div>
</div>

[#-- 公司行业 --]
<div class="form-group">
	<label class="col-sm-2 control-label">
		公司行业
	</label>
	<div class="col-sm-4">
		<p class="form-control-static">
			<strong>
				[#if corp != null]
					${corp.domain}
				[#else]
					-
				[/#if]
			</strong>
		</p>
	</div>
</div>

[#-- 公司人员规模 --]
<div class="form-group">
	<label class="col-sm-2 control-label">
		公司人员规模
	</label>
	<div class="col-sm-4">
		<p class="form-control-static">
			<strong>
				[#if corp != null]
					${corp.staffSize}
				[#else]
					-
				[/#if]
			</strong>
		</p>
	</div>
</div>

[#-- 公司资产规模 --]
<div class="form-group">
	<label class="col-sm-2 control-label">
		公司资产规模
	</label>
	<div class="col-sm-4">
		<p class="form-control-static">
			<strong>
				[#if corp != null]
					${corp.assetSize}
				[#else]
					-
				[/#if]
			</strong>
		</p>
	</div>
</div>

[#-- 公司上年度经营额 --]
<div class="form-group">
	<label class="col-sm-2 control-label">
		公司上年度经营额
	</label>
	<div class="col-sm-4">
		<p class="form-control-static">
			<strong>
				[#if corp != null]
					${corp.prevYearOperatedRevenue}
				[#else]
					-
				[/#if]
			</strong>
		</p>
	</div>
</div>

[#-- 公司注册资金 --]
<div class="form-group">
	<label class="col-sm-2 control-label">
		公司注册资金
	</label>
	<div class="col-sm-4">
		<p class="form-control-static">
			<strong>
				[#if corp != null]
					${corp.registeredCapital}
				[#else]
					-
				[/#if]
			</strong>
		</p>
	</div>
</div>

[#-- 公司所在地 --]
<div class="form-group">
	<label class="col-sm-2 control-label">
		公司所在地
	</label>
	<div class="col-sm-4">
		<p class="form-control-static">
			<strong>
				[#if corpLocality != null]
					${corpLocality}
				[#else]
					-
				[/#if]
			</strong>
		</p>
	</div>
</div>

[#-- 公司地址 --]
<div class="form-group">
	<label class="col-sm-2 control-label">
		公司地址
	</label>
	<div class="col-sm-4">
		<p class="form-control-static">
			<strong>
				[#if corp != null]
					${corp.addr}
				[#else]
					-
				[/#if]
			</strong>
		</p>
	</div>
</div>

[#-- 公司邮编 --]
<div class="form-group">
	<label class="col-sm-2 control-label">
		公司邮编
	</label>
	<div class="col-sm-4">
		<p class="form-control-static">
			<strong>
				[#if corp != null]
					${corp.zipcode}
				[#else]
					-
				[/#if]
			</strong>
		</p>
	</div>
</div>

[#-- 公司执照编号 --]
<div class="form-group">
	<label class="col-sm-2 control-label">
		公司执照编号
	</label>
	<div class="col-sm-4">
		<p class="form-control-static">	
			<strong>
				[#if corp != null]
					${corp.licenseNo}
				[#else]
					-
				[/#if]
			</strong>
		</p>
	</div>
</div>

[#-- 公司执照签发日期 --]
<div class="form-group">
	<label class="col-sm-2 control-label">
		公司执照签发日期
	</label>
	<div class="col-sm-4">
		<p class="form-control-static">
			<strong>
				[#if corp != null]
					${corp.licenseIssueDate?string("yyyy-MM-dd")}
				[#else]
					-
				[/#if]
			</strong>
		</p>
	</div>
</div>

[#-- 公司执照到期日期 --]
<div class="form-group">
	<label class="col-sm-2 control-label">
		公司执照到期日期
	</label>
	<div class="col-sm-4">
		<p class="form-control-static">
			<strong>
				[#if corp != null]
					${corp.licenseExpiryDate?string("yyyy-MM-dd")}
				[#else]
					-
				[/#if]
			</strong>
		</p>
	</div>
</div>

[#-- 公司国税登记证编号 --]
<div class="form-group">
	<label class="col-sm-2 control-label">
		公司国税登记证编号
	</label>
	<div class="col-sm-4">
		<p class="form-control-static">
			<strong>
				[#if corp != null]
					${corp.nationalTaxNo}
				[#else]
					-
				[/#if]
			</strong>
		</p>
	</div>
</div>

[#-- 公司地税登记证编号 --]
<div class="form-group">
	<label class="col-sm-2 control-label">
		公司地税登记证编号
	</label>
	<div class="col-sm-4">
		<p class="form-control-static">
			<strong>
				[#if corp != null]
					${corp.landTaxNo}
				[#else]
					-
				[/#if]
			</strong>
		</p>
	</div>
</div>

[#-- 公司有无担保资质 --]
<div class="form-group">
	<label class="col-sm-2 control-label">
		公司有无担保资质
	</label>
	<div class="col-sm-4">
		<p class="form-control-static">
			<strong>
				[#if corp != null]
					${corp.isGuarantor?string("有", "无")}
				[#else]
					-
				[/#if]
			</strong>
		</p>
	</div>
</div>