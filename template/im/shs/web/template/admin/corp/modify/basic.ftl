[#-- 名称 --]
<div class="form-group">
	<label for="name" class="col-sm-2 control-label">
		<span class="required">*</span>
		名称
	</label>
	<div class="col-sm-4">
		<input id="name" class="form-control" type="text" name="name" value="${corp.name}" maxlength="200" />
	</div>
</div>

[#-- 类别 --]
<div class="form-group">
	<label for="type" class="col-sm-2 control-label">
		类别
	</label>
	<div class="col-sm-4">
		<select id="type" class="form-control chosen-select" name="type" data-placeholder="&nbsp;">
			<option value="">-</option>
			[#list types as type]
				<option value="${type}"[#if corp.type == type] selected="selected"[/#if]>${type}</option>
			[/#list]
		</select>
	</div>
</div>

[#-- 行业 --]
<div class="form-group">
	<label for="domain" class="col-sm-2 control-label">
		行业
	</label>
	<div class="col-sm-4">
		<select id="domain" class="form-control chosen-select" name="domain" data-placeholder="&nbsp;">
			<option value="">-</option>
			[#list domains as domain]
				<option value="${domain}"[#if corp.domain == domain] selected="selected"[/#if]>${domain}</option>
			[/#list]
		</select>
	</div>
</div>

[#-- 人员规模 --]
<div class="form-group">
	<label for="staffSize" class="col-sm-2 control-label">
		人员规模
	</label>
	<div class="col-sm-4">
		<select id="staffSize" class="form-control chosen-select" name="staffSize" data-placeholder="&nbsp;">
			<option value="">-</option>
			[#list staffSizes as staffSize]
				<option value="${staffSize}"[#if corp.staffSize == staffSize] selected="selected"[/#if]>${staffSize}</option>
			[/#list]
		</select>
	</div>
</div>

[#-- 资产规模 --]
<div class="form-group">
	<label for="assetSize" class="col-sm-2 control-label">
		资产规模
	</label>
	<div class="col-sm-4">
		<select id="assetSize" class="form-control chosen-select" name="assetSize" data-placeholder="&nbsp;">
			<option value="">-</option>
			[#list assetSizes as assetSize]
				<option value="${assetSize}"[#if corp.assetSize == assetSize] selected="selected"[/#if]>${assetSize}</option>
			[/#list]
		</select>
	</div>
</div>

[#-- 经营年限 --]
<div class="form-group">
	<label for="operatedPeriod" class="col-sm-2 control-label">
		经营年限
	</label>
	<div class="col-sm-4">
		<select id="operatedPeriod" class="form-control chosen-select" name="operatedPeriod" data-placeholder="&nbsp;">
			<option value="">-</option>
			[#list operatedPeriods as operatedPeriod]
				<option value="${operatedPeriod}"[#if corp.operatedPeriod == operatedPeriod] selected="selected"[/#if]>${operatedPeriod}</option>
			[/#list]
		</select>
	</div>
</div>

[#-- 上年度经营额 --]
<div class="form-group">
	<label for="prevYearOperatedRevenue" class="col-sm-2 control-label">
		上年度经营额
	</label>
	<div class="col-sm-4">
		<select id="prevYearOperatedRevenue" class="form-control chosen-select" name="prevYearOperatedRevenue" data-placeholder="&nbsp;">
			<option value="">-</option>
			[#list prevYearOperatedRevenues as prevYearOperatedRevenue]
				<option value="${prevYearOperatedRevenue}"[#if corp.prevYearOperatedRevenue == prevYearOperatedRevenue] selected="selected"[/#if]>${prevYearOperatedRevenue}</option>
			[/#list]
		</select>
	</div>
</div>

[#-- 注册资金 --]
<div class="form-group">
	<label for="registeredCapital" class="col-sm-2 control-label">
		注册资金
	</label>
	<div class="col-sm-4">
		<select id="registeredCapital" class="form-control chosen-select" name="registeredCapital" data-placeholder="&nbsp;">
			<option value="">-</option>
			[#list registeredCapitals as registeredCapital]
				<option value="${registeredCapital}"[#if corp.registeredCapital == registeredCapital] selected="selected"[/#if]>${registeredCapital}</option>
			[/#list]
		</select>
	</div>
</div>

[#-- 所在地 --]
<div class="form-group">
	<label class="col-sm-2 control-label">
		所在地
	</label>
	<input class="selectSascade" type="hidden" name="locality" value="${(corp.locality.id)!}" treePath="${(corp.locality.treePath)!}" />
</div>

[#-- 地址 --]
<div class="form-group">
	<label for="addr" class="col-sm-2 control-label">
		地址
	</label>
	<div class="col-sm-4">
		<input id="addr" class="form-control" type="text" name="addr" value="${corp.addr}" maxlength="200" />
	</div>
</div>

[#-- 邮编 --]
<div class="form-group">
	<label for="zipcode" class="col-sm-2 control-label">
		邮编
	</label>
	<div class="col-sm-4">
		<input id="zipcode" class="form-control" type="text" name="zipcode" value="${corp.zipcode}" maxlength="200" />
	</div>
</div>

[#-- 执照编号 --]
<div class="form-group">
	<label for="licenseNo" class="col-sm-2 control-label">
		执照编号
	</label>
	<div class="col-sm-4">
		<input id="licenseNo" class="form-control" type="text" name="licenseNo" value="${corp.licenseNo}" maxlength="200" />
	</div>
</div>

[#-- 执照签发日期 --]
<div class="form-group">
	<label for="licenseIssueDate" class="col-sm-2 control-label">
		执照签发日期
	</label>
	<div class="col-sm-4">
		<input id="licenseIssueDate" class="form-control datetimepicker datetimepicker-yyyy-MM-dd" type="text" name="licenseIssueDate" value="${(corp.licenseIssueDate?string("yyyy-MM-dd"))!}" />
	</div>
</div>

[#-- 执照到期日期 --]
<div class="form-group">
	<label for="licenseExpiryDate" class="col-sm-2 control-label">
		执照到期日期
	</label>
	<div class="col-sm-4">
		<input id="licenseExpiryDate" class="form-control datetimepicker datetimepicker-yyyy-MM-dd" type="text" name="licenseExpiryDate" value="${(corp.licenseExpiryDate?string("yyyy-MM-dd"))!}" />
	</div>
</div>

[#-- 国税登记证编号 --]
<div class="form-group">
	<label for="nationalTaxNo" class="col-sm-2 control-label">
		国税登记证编号
	</label>
	<div class="col-sm-4">
		<input id="nationalTaxNo" class="form-control" type="text" name="nationalTaxNo" value="${corp.nationalTaxNo}" maxlength="200" />
	</div>
</div>

[#-- 地税登记证编号 --]
<div class="form-group">
	<label for="landTaxNo" class="col-sm-2 control-label">
		地税登记证编号
	</label>
	<div class="col-sm-4">
		<input id="landTaxNo" class="form-control" type="text" name="landTaxNo" value="${corp.landTaxNo}" maxlength="200" />
	</div>
</div>

[#-- 有无担保资质 --]
<div class="form-group">
	<label for="withGuarantee" class="col-sm-2 control-label">
		有无担保资质
	</label>
	<div class="col-sm-4">
		<select id="withGuarantee" class="form-control chosen-select" name="withGuarantee" data-placeholder="&nbsp;">
			<option value="false"[#if !corp.withGuarantee] selected="selected"[/#if]>无</option>
			<option value="true"[#if corp.withGuarantee] selected="selected"[/#if]>有</option>
		</select>
	</div>
</div>