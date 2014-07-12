[#--
[#-- 借款日期 --\]
<div class="form-group">
	<label for="borrowingDate" class="col-sm-2 control-label">
		<span class="required">*</span>
		借款日期
	</label>
	<div class="col-sm-4">
		<input id="borrowingDate" class="form-control datetimepicker datetimepicker-yyyy-MM-dd" type="text" name="borrowingDate" />
	</div>
</div>

[#-- 借款公司 --\]
<div class="form-group">
	<label for="borrowingCorp" class="col-sm-2 control-label">
		<span class="required">*</span>
		借款公司
	</label>
	<div class="col-sm-4">
		<input id="borrowingCorp" class="form-control" type="text" name="borrowingCorp" maxlength="200" autocomplete="off" />
	</div>
</div>
--]

[#-- 借款用途 --]
<div class="form-group">
	<label for="purpose" class="col-sm-2 control-label">
		<span class="required">*</span>
		借款用途
	</label>
	<div class="col-sm-4">
		<textarea id="purpose" class="form-control" name="purpose" cols="10" rows="5"></textarea>
	</div>
</div>

[#-- 实地调查 --]
<div class="form-group">
	<label for="fieldInquiry" class="col-sm-2 control-label">
		实地调查
	</label>
	<div class="col-sm-4">
		<textarea id="fieldInquiry" class="form-control" name="fieldInquiry" cols="10" rows="5"></textarea>
	</div>
</div>
	
[#-- 信用调查 --]
<div class="form-group">
	<label for="creditInquiry" class="col-sm-2 control-label">
		信用调查
	</label>
	<div class="col-sm-4">
		<textarea id="creditInquiry" class="form-control" name="creditInquiry" cols="10" rows="5"></textarea>
	</div>
</div>
	
[#-- 还款调查 --]
<div class="form-group">
	<label for="repaymentInquiry" class="col-sm-2 control-label">
		<span class="required">*</span>
		还款调查
	</label>
	<div class="col-sm-4">
		<textarea id="repaymentInquiry" class="form-control" name="repaymentInquiry" cols="10" rows="5"></textarea>
	</div>
</div>