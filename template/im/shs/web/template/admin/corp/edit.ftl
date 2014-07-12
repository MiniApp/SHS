[#-- 职业状态 --]
<div class="form-group">
	<label for="occup" class="col-sm-2 control-label">
		<span class="required">*</span>
		职业状态
	</label>
	<div class="col-sm-4">
		<select id="occup" class="form-control chosen-select" name="occup" data-placeholder="&nbsp;">
			<option value="">-</option>
			[#list occups as occup]
				<option value="${occup}"[#if corporator.occup == occup] selected="selected"[/#if]>${occup}</option>
			[/#list]
		</select>
	</div>
</div>

[#-- 公司名称 --]
<div class="form-group">
	<label for="name" class="col-sm-2 control-label">
		<span class="required">*</span>
		公司名称
	</label>
	<div class="col-sm-4">
		<input id="name" class="form-control" type="text" name="name" value="${corporator.corpName}" maxlength="200" />
	</div>
</div>

[#-- 公司类别 --]
<div class="form-group">
	<label for="type" class="col-sm-2 control-label">
		公司类别
	</label>
	<div class="col-sm-4">
		<select id="type" class="form-control chosen-select" name="type" data-placeholder="&nbsp;">
			<option value="">-</option>
			[#list types as type]
				<option value="${type}"[#if corporator.corpType == type] selected="selected"[/#if]>${type}</option>
			[/#list]
		</select>
	</div>
</div>

[#-- 公司行业 --]
<div class="form-group">
	<label for="domain" class="col-sm-2 control-label">
		公司行业
	</label>
	<div class="col-sm-4">
		<select id="domain" class="form-control chosen-select" name="domain" data-placeholder="&nbsp;">
			<option value="">-</option>
			[#list domains as domain]
				<option value="${domain}"[#if corporator.corpDomain == domain] selected="selected"[/#if]>${domain}</option>
			[/#list]
		</select>
	</div>
</div>

[#-- 公司人员规模 --]
<div class="form-group">
	<label for="staffSize" class="col-sm-2 control-label">
		公司人员规模
	</label>
	<div class="col-sm-4">
		<select id="staffSize" class="form-control chosen-select" name="staffSize" data-placeholder="&nbsp;">
			<option value="">-</option>
			[#list staffSizes as staffSize]
				<option value="${staffSize}"[#if corporator.corpScale == staffSize] selected="selected"[/#if]>${staffSize}</option>
			[/#list]
		</select>
	</div>
</div>

[#-- 公司资产规模 --]
<div class="form-group">
	<label for="assetSize" class="col-sm-2 control-label">
		公司资产规模
	</label>
	<div class="col-sm-4">
		<select id="assetSize" class="form-control chosen-select" name="assetSize" data-placeholder="&nbsp;">
			<option value="">-</option>
			[#list assetSizes as assetSize]
				<option value="${assetSize}"[#if corpInfo.corpAssetSize == assetSize] selected="selected"[/#if]>${assetSize}</option>
			[/#list]
		</select>
	</div>
</div>

[#-- 公司经营年限 --]
<div class="form-group">
	<label for="operatedPeriod" class="col-sm-2 control-label">
		公司经营年限
	</label>
	<div class="col-sm-4">
		<select id="operatedPeriod" class="form-control chosen-select" name="operatedPeriod" data-placeholder="&nbsp;">
			<option value="">-</option>
			[#list operatedPeriods as operatedPeriod]
				<option value="${operatedPeriod}"[#if corporator.period == operatedPeriod] selected="selected"[/#if]>${operatedPeriod}</option>
			[/#list]
		</select>
	</div>
</div>

[#-- 公司月收入 --]
<div class="form-group">
	<label for="monthlyIncome" class="col-sm-2 control-label">
		公司月收入
	</label>
	<div class="col-sm-4">
		<select id="monthlyIncome" class="form-control chosen-select" name="monthlyIncome" data-placeholder="&nbsp;">
			<option value="">-</option>
			[#list monthlyIncomes as monthlyIncome]
				<option value="${monthlyIncome}"[#if corporator.income == monthlyIncome] selected="selected"[/#if]>${monthlyIncome}</option>
			[/#list]
		</select>
	</div>
</div>

[#-- 公司上年度经营额 --]
<div class="form-group">
	<label for="prevYearOperatedRevenue" class="col-sm-2 control-label">
		公司上年度经营额
	</label>
	<div class="col-sm-4">
		<select id="prevYearOperatedRevenue" class="form-control chosen-select" name="prevYearOperatedRevenue" data-placeholder="&nbsp;">
			<option value="">-</option>
			[#list prevYearOperatedRevenues as prevYearOperatedRevenue]
				<option value="${prevYearOperatedRevenue}"[#if corpInfo.corpPrevYearOperatedRevenue == prevYearOperatedRevenue] selected="selected"[/#if]>${prevYearOperatedRevenue}</option>
			[/#list]
		</select>
	</div>
</div>

[#-- 公司注册资金 --]
<div class="form-group">
	<label for="registeredCapital" class="col-sm-2 control-label">
		公司注册资金
	</label>
	<div class="col-sm-4">
		<select id="registeredCapital" class="form-control chosen-select" name="registeredCapital" data-placeholder="&nbsp;">
			<option value="">-</option>
			[#list registeredCapitals as registeredCapital]
				<option value="${registeredCapital}"[#if corpInfo.corpRegisteredCapital == registeredCapital] selected="selected"[/#if]>${registeredCapital}</option>
			[/#list]
		</select>
	</div>
</div>

[#-- 公司所在地 --]
<div class="form-group">
	<label class="col-sm-2 control-label">
		公司所在地
	</label>
	<input class="selectSascade" type="hidden" name="locality" value="${(corpInfo.corpLocality.id)!}" treePath="${(corpInfo.corpLocality.treePath)!}" />
</div>

[#-- 公司地址 --]
<div class="form-group">
	<label for="addr" class="col-sm-2 control-label">
		公司地址
	</label>
	<div class="col-sm-4">
		<input id="addr" class="form-control" type="text" name="addr" value="${corpInfo.corpAddr}" maxlength="200" />
	</div>
</div>

[#-- 公司邮编 --]
<div class="form-group">
	<label for="zipcode" class="col-sm-2 control-label">
		公司邮编
	</label>
	<div class="col-sm-4">
		<input id="zipcode" class="form-control" type="text" name="zipcode" value="${corpInfo.corpZipcode}" maxlength="200" />
	</div>
</div>

[#-- 公司电话 --]
<div class="form-group">
	<label for="phone" class="col-sm-2 control-label">
		公司电话
	</label>
	<div class="col-sm-4">
		<input id="phone" class="form-control" type="text" name="phone" value="${corpInfo.workPhone}" maxlength="200" />
	</div>
</div>

[#-- 职位 --]
<div class="form-group">
	<label for="post" class="col-sm-2 control-label">
		职位
	</label>
	<div class="col-sm-4">
		<input id="post" class="form-control" type="text" name="post" value="${corporator.post}" maxlength="200" />
	</div>
</div>

[#-- 工作邮箱 --]
<div class="form-group">
	<label for="workEmail" class="col-sm-2 control-label">
		工作邮箱
	</label>
	<div class="col-sm-4">
		<input id="workEmail" class="form-control" type="text" name="workEmail" value="${corpInfo.workEmail}" maxlength="200" />
	</div>
</div>

[#-- 执照编号 --]
<div class="form-group">
	<label for="licenseNo" class="col-sm-2 control-label">
		执照编号
	</label>
	<div class="col-sm-4">
		<input id="licenseNo" class="form-control" type="text" name="licenseNo" value="${corpInfo.corpLicenseNo}" maxlength="200" />
	</div>
</div>

[#-- 执照签发日期 --]
<div class="form-group">
	<label for="licenseIssueDate" class="col-sm-2 control-label">
		执照签发日期
	</label>
	<div class="col-sm-4">
		<input id="licenseIssueDate" class="form-control datetimepicker datetimepicker-yyyy-MM-dd" type="text" name="licenseIssueDate" value="${(corpInfo.corpLicenseIssueDate?string("yyyy-MM-dd"))!}" />
	</div>
</div>

[#-- 执照到期日期 --]
<div class="form-group">
	<label for="licenseExpiryDate" class="col-sm-2 control-label">
		执照到期日期
	</label>
	<div class="col-sm-4">
		<input id="licenseExpiryDate" class="form-control datetimepicker datetimepicker-yyyy-MM-dd" type="text" name="licenseExpiryDate" value="${(corpInfo.corpLicenseExpiryDate?string("yyyy-MM-dd"))!}" />
	</div>
</div>

[#-- 国税登记证编号 --]
<div class="form-group">
	<label for="nationalTaxNo" class="col-sm-2 control-label">
		国税登记证编号
	</label>
	<div class="col-sm-4">
		<input id="nationalTaxNo" class="form-control" type="text" name="nationalTaxNo" value="${corpInfo.corpNationalTaxNo}" maxlength="200" />
	</div>
</div>

[#-- 地税登记证编号 --]
<div class="form-group">
	<label for="landTaxNo" class="col-sm-2 control-label">
		地税登记证编号
	</label>
	<div class="col-sm-4">
		<input id="landTaxNo" class="form-control" type="text" name="landTaxNo" value="${corpInfo.corpLandTaxNo}" maxlength="200" />
	</div>
</div>

[#-- 有无担保资质 --]
<div class="form-group">
	<label for="withGuarantee" class="col-sm-2 control-label">
		<span class="required">*</span>
		有无担保资质
	</label>
	<div class="col-sm-4">
		<select id="withGuarantee" class="form-control chosen-select" name="withGuarantee" data-placeholder="&nbsp;">
			<option value="false"[#if !corporator.corpWithGuarantee] selected="selected"[/#if]>无</option>
			<option value="true"[#if corporator.corpWithGuarantee] selected="selected"[/#if]>有</option>
		</select>
	</div>
</div>