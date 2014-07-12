[#-- 职业状态 --]
<div class="form-group">
	<label for="occup" class="col-sm-2 control-label">
		职业状态
	</label>
	<div class="col-sm-4">
		<select id="occup" class="form-control chosen-select" name="occup" data-placeholder="&nbsp;">
			<option value="">-</option>
			[#list occups as occup]
				<option value="${occup}">${occup}</option>
			[/#list]
		</select>
	</div>
</div>

[#-- 公司名称 --]
<div class="form-group">
	<label for="corpName" class="col-sm-2 control-label">
		公司名称
	</label>
	<div class="col-sm-4">
		<input id="corpName" class="form-control" type="text" name="corpName" maxlength="200" />
	</div>
</div>

[#-- 公司类别 --]
<div class="form-group">
	<label for="corpType" class="col-sm-2 control-label">
		公司类别
	</label>
	<div class="col-sm-4">
		<select id="corpType" class="form-control chosen-select" name="corpType" data-placeholder="&nbsp;">
			<option value="">-</option>
			[#list corpTypes as corpType]
				<option value="${corpType}">${corpType}</option>
			[/#list]
		</select>
	</div>
</div>

[#-- 公司行业 --]
<div class="form-group">
	<label for="corpDomain" class="col-sm-2 control-label">
		公司行业
	</label>
	<div class="col-sm-4">
		<select id="corpDomain" class="form-control chosen-select" name="corpDomain" data-placeholder="&nbsp;">
			<option value="">-</option>
			[#list corpDomains as corpDomain]
				<option value="${corpDomain}">${corpDomain}</option>
			[/#list]
		</select>
	</div>
</div>

[#-- 公司规模 --]
<div class="form-group">
	<label for="corpScale" class="col-sm-2 control-label">
		公司规模
	</label>
	<div class="col-sm-4">
		<select id="corpScale" class="form-control chosen-select" name="corpScale" data-placeholder="&nbsp;">
			<option value="">-</option>
			[#list corpScales as corpScale]
				<option value="${corpScale}">${corpScale}</option>
			[/#list]
		</select>
	</div>
</div>

[#-- 公司所在地 --]
<div class="form-group">
	<label class="col-sm-2 control-label">
		公司所在地
	</label>
	<input class="selectSascade" type="hidden" name="corpLocality" />
</div>

[#-- 公司地址 --]
<div class="form-group">
	<label for="corpAddr" class="col-sm-2 control-label">
		公司地址
	</label>
	<div class="col-sm-4">
		<input id="corpAddr" class="form-control" type="text" name="corpAddr" maxlength="200" />
	</div>
</div>

[#-- 公司邮编 --]
<div class="form-group">
	<label for="corpZipcode" class="col-sm-2 control-label">
		公司邮编
	</label>
	<div class="col-sm-4">
		<input id="corpZipcode" class="form-control" type="text" name="corpZipcode" maxlength="200" />
	</div>
</div>

[#-- 职位 --]
<div class="form-group">
	<label for="post" class="col-sm-2 control-label">
		职位
	</label>
	<div class="col-sm-4">
		<input id="post" class="form-control" type="text" name="post" maxlength="200" />
	</div>
</div>

[#-- 工作年限 --]
<div class="form-group">
	<label for="workPeriod" class="col-sm-2 control-label">
		工作年限
	</label>
	<div class="col-sm-4">
		<select id="workPeriod" class="form-control chosen-select" name="workPeriod" data-placeholder="&nbsp;">
			<option value="">-</option>
			[#list workPeriods as workPeriod]
				<option value="${workPeriod}">${workPeriod}</option>
			[/#list]
		</select>
	</div>
</div>

[#-- 月收入 --]
<div class="form-group">
	<label for="monthlyIncome" class="col-sm-2 control-label">
		月收入
	</label>
	<div class="col-sm-4">
		<select id="monthlyIncome" class="form-control chosen-select" name="monthlyIncome" data-placeholder="&nbsp;">
			<option value="">-</option>
			[#list monthlyIncomes as monthlyIncome]
				<option value="${monthlyIncome}">${monthlyIncome}</option>
			[/#list]
		</select>
	</div>
</div>

[#-- 工作邮箱 --]
<div class="form-group">
	<label for="workEmail" class="col-sm-2 control-label">
		工作邮箱
	</label>
	<div class="col-sm-4">
		<input id="workEmail" class="form-control" type="text" name="workEmail" maxlength="200" />
	</div>
</div>

[#-- 工作手机 --]
<div class="form-group">
	<label for="workMobile" class="col-sm-2 control-label">
		工作手机
	</label>
	<div class="col-sm-4">
		<input id="workMobile" class="form-control" type="text" name="workMobile" maxlength="200" />
	</div>
</div>

[#-- 工作电话 --]
<div class="form-group">
	<label for="workPhone" class="col-sm-2 control-label">
		工作电话
	</label>
	<div class="col-sm-4">
		<input id="workPhone" class="form-control" type="text" name="workPhone" maxlength="200" />
	</div>
</div>

[#-- 工作QQ --]
<div class="form-group">
	<label for="workQq" class="col-sm-2 control-label">
		工作QQ
	</label>
	<div class="col-sm-4">
		<input id="workQq" class="form-control" type="text" name="workQq" maxlength="200" />
	</div>
</div>