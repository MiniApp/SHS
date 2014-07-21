[#-- 风险分析 --]
<div class="form-group">
	<label for="riskAnalysis" class="col-sm-2 control-label">
		[#--
		<span class="required">*</span>
		--]
		风险分析
	</label>
	<div class="col-sm-4">
		<textarea id="riskAnalysis" class="form-control" name="riskAnalysis" cols="10" rows="5">${assignment.riskAnalysis}</textarea>
	</div>
</div>

[#-- 风险度 --]
<div class="form-group">
	<label for="riskDegree" class="col-sm-2 control-label">
		<span class="required">*</span>
		风险度
	</label>
	<div class="input-group col-sm-4">
		<input id="riskDegree" class="form-control" type="text" name="riskDegree" value="${assignment.riskDegree}" maxlength="20" autocomplete="off" />
		<label class="input-group-addon">%</label>
	</div>
</div>

[#-- 信用评级 --]
<div class="form-group">
	<label for="creditRating" class="col-sm-2 control-label">
		<span class="required">*</span>
		信用评级
	</label>
	<div class="col-sm-4">
		<select id="creditRating" class="form-control chosen-select" name="creditRating" data-placeholder="&nbsp;">
			<option value="">-</option>
			[#list creditRatings as creditRating]
				<option value="${creditRating}"[#if assignment.creditRating == creditRating] selected="selected"[/#if]>${message("CreditRating." + creditRating)}</option>
			[/#list]
		</select>
	</div>
</div>

[#-- 投资方式 --]
<div class="form-group">
	<label for="investmentMethod" class="col-sm-2 control-label">
		[#--
		<span class="required">*</span>
		--]
		投资方式
	</label>
	<div class="input-group col-sm-4">
		<select id="investmentMethod" class="form-control chosen-select" name="investmentMethod" data-placeholder="&nbsp;">
			[#--
			<option value="">-</option>
			[#list investmentMethods as investmentMethod]
				<option value="${investmentMethod}"[#if assignment.investmentMethod == investmentMethod] selected="selected"[/#if]>${message("InvestmentMethod." + investmentMethod)}</option>
			[/#list]
			--]
			[#assign investmentMethod = assignment.investmentMethod!"multiple_of_minimum" /]
			<option value="${investmentMethod}">${message("InvestmentMethod." + investmentMethod)}</option>
		</select>
	</div>
</div>

[#-- 最低投资 --]
<div class="form-group">
	<label for="investmentMinimum" class="col-sm-2 control-label">
		<span class="required">*</span>
		最低投资
	</label>
	<div class="input-group col-sm-4">
		<label class="input-group-addon">￥</label>
		<input id="investmentMinimum" class="form-control" type="text" name="investmentMinimum" value="${assignment.investmentMinimum}" maxlength="20" autocomplete="off" />
	</div>
</div>

[#--
[#-- 最高投资 --\]
<div class="form-group">
	<label for="investmentMaximum" class="col-sm-2 control-label">
		最高投资
	</label>
	<div class="input-group col-sm-4">
		<label class="input-group-addon">￥</label>
		<input id="investmentMaximum" class="form-control" type="text" name="investmentMaximum" value="${assignment.investmentMaximum}" maxlength="20" autocomplete="off" />
	</div>
</div>
--]

[#-- 投资期限 --]
<div class="form-group">
	<label for="investmentPeriod" class="col-sm-2 control-label">
		投资期限
	</label>
	<div class="input-group col-sm-4">
		<input id="investmentPeriod" class="form-control" type="text" name="investmentPeriod" value="${assignment.investmentPeriod}" maxlength="20" autocomplete="off" />
		<label class="input-group-addon">天</label>
	</div>
</div>

[#-- 受让时间 --]
<div class="form-group">
	<label for="assignationTime" class="col-sm-2 control-label">
		[#--
		<span class="required">*</span>
		--]
		受让时间
	</label>
	<div class="col-sm-4">
		<select id="assignationTime" class="form-control chosen-select" name="assignationTime" data-placeholder="&nbsp;">
			[#--
			<option value="">-</option>
			[#list assignationTimes as assignationTime]
				<option value="${assignationTime}"[#if assignment.assignationTime == assignationTime] selected="selected"[/#if]>${message("LendingTime." + assignationTime)}</option>
			[/#list]
			--]
			[#assign assignationTime = assignment.assignationTime!"after_each_investment" /]
			<option value="${assignationTime}"[#if assignment.assignationTime == assignationTime] selected="selected"[/#if]>${message("LendingTime." + assignationTime)}</option>
		</select>
	</div>
</div>

[#-- 回购方式 --]
<div class="form-group">
	<label for="buybackMethod" class="col-sm-2 control-label">
		<span class="required">*</span>
		回购方式
	</label>
	<div class="col-sm-4">
		<select id="buybackMethod" class="form-control chosen-select" name="buybackMethod" data-placeholder="&nbsp;">
			<option value="">-</option>
			[#list buybackMethods as buybackMethod]
				<option value="${buybackMethod}"[#if assignment.repaymentMethod == buybackMethod] selected="selected"[/#if]>${message("RepaymentMethod." + buybackMethod)}</option>
			[/#list]
		</select>
	</div>
</div>

<input type="hidden" name="prebuybackFeeRate" value="0" />
[#--
[#-- 提前还款费率 --\]
<div class="form-group">
	<label for="prebuybackFeeRate" class="col-sm-2 control-label">
		<span class="required">*</span>
		提前还款费率
	</label>
	<div class="input-group col-sm-4">
		<input id="prebuybackFeeRate" class="form-control" type="text" name="prebuybackFeeRate" value="${assignment.prepaymentFeeRate}" maxlength="20" autocomplete="off" />
		<label class="input-group-addon">%</label>
	</div>
</div>
--]

[#-- 转让服务费率 --]
<div class="form-group">
	<label for="feeRate" class="col-sm-2 control-label">
		<span class="required">*</span>
		转让服务费率
	</label>
	<div class="input-group col-sm-4">
		<input id="feeRate" class="form-control" type="text" name="feeRate" value="${assignment.feeRate}" maxlength="20" autocomplete="off" />
		<label class="input-group-addon">%</label>
	</div>
</div>

[#-- 回购服务费率 --]
<div class="form-group">
	<label for="buybackFeeRate" class="col-sm-2 control-label">
		<span class="required">*</span>
		回购服务费率
	</label>
	<div class="input-group col-sm-4">
		<input id="buybackFeeRate" class="form-control" type="text" name="buybackFeeRate" value="${assignment.repaymentFeeRate}" maxlength="20" autocomplete="off" />
		<label class="input-group-addon">%</label>
	</div>
</div>

[#-- 回收服务费率 --]
<div class="form-group">
	<label for="recoveryFeeRate" class="col-sm-2 control-label">
		<span class="required">*</span>
		回收服务费率
	</label>
	<div class="input-group col-sm-4">
		<input id="recoveryFeeRate" class="form-control" type="text" name="recoveryFeeRate" value="${assignment.recoveryFeeRate}" maxlength="20" autocomplete="off" />
		<label class="input-group-addon">%</label>
	</div>
</div>

[#-- 逾期利率 --]
<div class="form-group">
	<label for="overdueInterestRate" class="col-sm-2 control-label">
		<span class="required">*</span>
		逾期利率
	</label>
	<div class="input-group col-sm-4">
		<input id="overdueInterestRate" class="form-control" type="text" name="overdueInterestRate" value="${assignment.overdueInterestRate}" maxlength="20" autocomplete="off" />
		<label class="input-group-addon">%/天</label>
	</div>
</div>

[#-- 严重逾期开始期限 --]
<div class="form-group">
	<label for="seriousOverdueStartPeriod" class="col-sm-2 control-label">
		<span class="required">*</span>
		严重逾期开始期限
	</label>
	<div class="input-group col-sm-4">
		<input id="seriousOverdueStartPeriod" class="form-control" type="text" name="seriousOverdueStartPeriod" value="${assignment.seriousOverdueStartPeriod}" maxlength="20" autocomplete="off" />
		<label class="input-group-addon">天</label>
	</div>
</div>

[#-- 严重逾期利率 --]
<div class="form-group">
	<label for="seriousOverdueInterestRate" class="col-sm-2 control-label">
		<span class="required">*</span>
		严重逾期利率
	</label>
	<div class="input-group col-sm-4">
		<input id="seriousOverdueInterestRate" class="form-control" type="text" name="seriousOverdueInterestRate" value="${assignment.seriousOverdueInterestRate}" maxlength="20" autocomplete="off" />
		<label class="input-group-addon">%/天</label>
	</div>
</div>