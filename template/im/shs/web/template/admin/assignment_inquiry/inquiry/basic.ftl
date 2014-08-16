[#-- 转让标题 --]
<div class="form-group">
	<label for="title" class="col-sm-2 control-label">
		<span class="required">*</span>
		转让标题
	</label>
	<div class="col-sm-4">
		<input id="title" class="form-control" type="text" name="title" value="${assignment.title}" maxlength="200" autocomplete="off" />
	</div>
</div>

[#-- 转让金额 --]
<div class="form-group">
	<label for="amount" class="col-sm-2 control-label">
		<span class="required">*</span>
		转让金额
	</label>
	<div class="input-group col-sm-4">
		<label class="input-group-addon">￥</label>
		<input id="amount" class="form-control" type="text" name="amount" value="${assignment.amount}" maxlength="20" autocomplete="off" />
	</div>
</div>

[#-- 转让期限 --]
<div class="form-group">
	<label for="period" class="col-sm-2 control-label">
		<span class="required">*</span>
		转让期限
	</label>
	<div class="input-group col-sm-4">
		<input id="period" class="form-control" type="text" name="period" value="${assignment.period}" maxlength="20" autocomplete="off" />
		<label class="input-group-addon">月</label>
	</div>
</div>

[#-- 转让利率 --]
<div class="form-group">
	<label for="interestRate" class="col-sm-2 control-label">
		<span class="required">*</span>
		转让利率
	</label>
	<div class="input-group col-sm-4">
		<input id="interestRate" class="form-control" type="text" name="interestRate" value="${assignment.interestRate}" maxlength="20" autocomplete="off" />
		<label class="input-group-addon">%/年</label>
	</div>
</div>

[#-- 转让描述 --]
<div class="form-group">
	<label for="description" class="col-sm-2 control-label">
		<span class="required">*</span>
		转让描述
	</label>
	<div class="col-sm-4">
		<textarea id="description" class="form-control" name="description" cols="10" rows="5">${assignment.description}</textarea>
	</div>
</div>