[#-- 转让状态 --]
<div class="form-group">
	<label class="col-sm-2 control-label">
		转让状态
	</label>
	<div class="col-sm-4">
		<p class="form-control-static">
			<strong>${message("AssignmentProgressState." + assignment.progress + "." + assignment.state)}</strong>
		</p>
	</div>
</div>

[#-- 转让标题 --]
<div class="form-group">
	<label class="col-sm-2 control-label">
		转让标题
	</label>
	<div class="col-sm-4">
		<p class="form-control-static">
			<strong>${assignment.title!"-"}</strong>
		</p>
	</div>
</div>

[#-- 转让金额 --]
<div class="form-group">
	<label class="col-sm-2 control-label">
		转让金额
	</label>
	<div class="col-sm-4">
		<p class="form-control-static">
			<strong>
				[#if assignment.amount??]
					${assignment.amount?string("currency")}
				[#else]
					-
				[/#if]
			</strong>
		</p>
	</div>
</div>

[#-- 转让金额范围 --]
<div class="form-group">
	<label class="col-sm-2 control-label">
		转让金额范围
	</label>
	<div class="col-sm-4">
		<p class="form-control-static">
			<strong>${message("AmountScope." + assignment.amountScope)}</strong>
		</p>
	</div>
</div>

[#-- 转让期限 --]
<div class="form-group">
	<label class="col-sm-2 control-label">
		转让期限
	</label>
	<div class="col-sm-4">
		<p class="form-control-static">
			<strong>
				[#if assignment.period??]
					${assignment.period}个月
				[#else]
					-
				[/#if]
			</strong>
		</p>
	</div>
</div>

[#-- 转让期限范围 --]
<div class="form-group">
	<label class="col-sm-2 control-label">
		转让期限范围
	</label>
	<div class="col-sm-4">
		<p class="form-control-static">
			<strong>${message("PeriodScope." + assignment.periodScope)}</strong>
		</p>
	</div>
</div>

[#-- 转让利率 --]
<div class="form-group">
	<label class="col-sm-2 control-label">
		转让利率
	</label>
	<div class="col-sm-4">
		<p class="form-control-static">
			<strong>
				[#if assignment.interestRate??]
					${assignment.interestRate}%/年
				[#else]
					-
				[/#if]
			</strong>
		</p>
	</div>
</div>

[#-- 转让利率范围 --]
<div class="form-group">
	<label class="col-sm-2 control-label">
		转让利率范围
	</label>
	<div class="col-sm-4">
		<p class="form-control-static">
			<strong>${message("InterestRateScope." + assignment.interestRateScope)}</strong>
		</p>
	</div>
</div>

[#-- 转让描述 --]
<div class="form-group">
	<label class="col-sm-2 control-label">
		转让描述
	</label>
	<div class="col-sm-4">
		<p class="form-control-static">
			<strong>${assignment.description!"-"}</strong>
		</p>
	</div>
</div>

[#-- 创建日期 --]
<div class="form-group">
	<label class="col-sm-2 control-label">
		创建日期
	</label>
	<div class="col-sm-4">
		<p class="form-control-static">
			<strong>${assignment.createDate?string("yyyy-MM-dd HH:mm:ss")}</strong>
		</p>
	</div>
</div>

[#-- 创建IP --]
<div class="form-group">
	<label class="col-sm-2 control-label">
		创建IP
	</label>
	<div class="col-sm-4">
		<p class="form-control-static">
			<strong>${assignment.ip!"-"}</strong>
		</p>
	</div>
</div>