[#-- 借款用途 --]
<div class="form-group">
	<label for="purpose" class="col-sm-2 control-label">
		[#--
		<span class="required">*</span>
		--]
		借款用途
	</label>
	<div class="col-sm-4">
		<textarea id="purpose" class="form-control" name="purpose" cols="10" rows="5">${borrowing.purpose}</textarea>
	</div>
</div>

[#-- 实地调查 --]
<div class="form-group">
	<label for="fieldInquiry" class="col-sm-2 control-label">
		实地调查
	</label>
	<div class="col-sm-4">
		<textarea id="fieldInquiry" class="form-control" name="fieldInquiry" cols="10" rows="5">${borrowing.fieldInquiry}</textarea>
	</div>
</div>
	
[#-- 信用调查 --]
<div class="form-group">
	<label for="creditInquiry" class="col-sm-2 control-label">
		信用调查
	</label>
	<div class="col-sm-4">
		<textarea id="creditInquiry" class="form-control" name="creditInquiry" cols="10" rows="5">${borrowing.creditInquiry}</textarea>
	</div>
</div>
	
[#-- 还款调查 --]
<div class="form-group">
	<label for="repaymentInquiry" class="col-sm-2 control-label">
		[#--
		<span class="required">*</span>
		--]
		还款调查
	</label>
	<div class="col-sm-4">
		<textarea id="repaymentInquiry" class="form-control" name="repaymentInquiry" cols="10" rows="5">${borrowing.repaymentInquiry}</textarea>
	</div>
</div>