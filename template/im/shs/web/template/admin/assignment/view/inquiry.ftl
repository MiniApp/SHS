[#-- 借款日期 --]
<div class="form-group">
	<label class="col-sm-2 control-label">
		借款日期
	</label>
	<div class="col-sm-4">
		<p class="form-control-static">
			<strong>${(assignment.borrowingDate?string("yyyy-MM-dd"))!"-"}</strong>
		</p>
	</div>
</div>

[#-- 借款公司 --]
<div class="form-group">
	<label class="col-sm-2 control-label">
		借款公司
	</label>
	<div class="col-sm-4">
		<p class="form-control-static">
			<strong>${assignment.borrowingCorp!"-"}</strong>
		</p>
	</div>
</div>

[#-- 借款用途 --]
<div class="form-group">
	<label class="col-sm-2 control-label">
		借款用途
	</label>
	<div class="col-sm-4">
		<p class="form-control-static">
			<strong>${assignment.purpose!"-"}</strong>
		</p>
	</div>
</div>

[#-- 实地调查 --]
<div class="form-group">
	<label class="col-sm-2 control-label">
		实地调查
	</label>
	<div class="col-sm-4">
		<p class="form-control-static">
			<strong>${assignment.fieldInquiry!"-"}</strong>
		</p>
	</div>
</div>
	
[#-- 信用调查 --]
<div class="form-group">
	<label class="col-sm-2 control-label">
		信用调查
	</label>
	<div class="col-sm-4">
		<p class="form-control-static">
			<strong>${assignment.creditInquiry!"-"}</strong>
		</p>
	</div>
</div>
	
[#-- 还款调查 --]
<div class="form-group">
	<label class="col-sm-2 control-label">
		还款调查
	</label>
	<div class="col-sm-4">
		<p class="form-control-static">
			<strong>${assignment.repaymentInquiry!"-"}</strong>
		</p>
	</div>
</div>