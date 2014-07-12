[#-- 借款人 --]
<div class="form-group">
	<label for="borrower" class="col-sm-2 control-label">
		<span class="required">*</span>
		借款人
	</label>
	<div class="col-sm-4">
		<select id="borrower" class="form-control chosen-select" name="borrower" data-placeholder="&nbsp;">
			<option value="">-</option>
			[#list borrowers as borrower]
				<option value="${borrower.id}">${borrower}[#if borrower.name??]&nbsp;&nbsp;-&nbsp;&nbsp;${borrower.name}[/#if]</option>
			[/#list]
		</select>
	</div>
</div>
						
[#-- 借款类型 --]
<div class="form-group">
	<label for="type" class="col-sm-2 control-label">
		<span class="required">*</span>
		借款类型
	</label>
	<div class="col-sm-4">
		<select id="type" class="form-control chosen-select" name="type" data-placeholder="&nbsp;">
			<option value="">-</option>
			[#assign types = ["credit", "guarantee", "mortgage"] /]
			[#list types as type]
				<option value="${type}">${message("BorrowingType." + type)}</option>
			[/#list]
		</select>
	</div>
</div>

[#-- 借款标题 --]
<div class="form-group">
	<label for="title" class="col-sm-2 control-label">
		<span class="required">*</span>
		借款标题
	</label>
	<div class="col-sm-4">
		<input id="title" class="form-control" type="text" name="title" maxlength="200" autocomplete="off" />
	</div>
</div>

[#-- 借款金额 --]
<div class="form-group">
	<label for="amount" class="col-sm-2 control-label">
		<span class="required">*</span>
		借款金额
	</label>
	<div class="input-group col-sm-4">
		<label class="input-group-addon">￥</label>
		<input id="amount" class="form-control" type="text" name="amount" maxlength="20" autocomplete="off" />
	</div>
</div>

[#-- 借款期限 --]
<div class="form-group">
	<label for="period" class="col-sm-2 control-label">
		<span class="required">*</span>
		借款期限
	</label>
	<div class="input-group col-sm-4">
		<input id="period" class="form-control" type="text" name="period" maxlength="20" autocomplete="off" />
		<label class="input-group-addon">月</label>
	</div>
</div>

[#-- 借款利率 --]
<div class="form-group">
	<label for="interestRate" class="col-sm-2 control-label">
		<span class="required">*</span>
		借款利率
	</label>
	<div class="input-group col-sm-4">
		<input id="interestRate" class="form-control" type="text" name="interestRate" maxlength="20" autocomplete="off" />
		<label class="input-group-addon">%/年</label>
	</div>
</div>

[#-- 借款描述 --]
<div class="form-group">
	<label for="description" class="col-sm-2 control-label">
		<span class="required">*</span>
		借款描述
	</label>
	<div class="col-sm-4">
		<textarea id="description" class="form-control" name="description" cols="10" rows="5"></textarea>
	</div>
</div>