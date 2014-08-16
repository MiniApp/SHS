[#-- 转让人 --]
<div class="form-group">
	<label for="assignor" class="col-sm-2 control-label">
		<span class="required">*</span>
		转让人
	</label>
	<div class="col-sm-4">
		<select id="assignor" class="form-control chosen-select" name="assignor" data-placeholder="&nbsp;">
			<option value="">-</option>
			[#list assignors as assignor]
				<option value="${assignor.id}">${assignor}[#if assignor.name??]&nbsp;&nbsp;-&nbsp;&nbsp;${assignor.name}[/#if]</option>
			[/#list]
		</select>
	</div>
</div>

[#-- 转让标题 --]
<div class="form-group">
	<label for="title" class="col-sm-2 control-label">
		<span class="required">*</span>
		转让标题
	</label>
	<div class="col-sm-4">
		<input id="title" class="form-control" type="text" name="title" maxlength="200" autocomplete="off" />
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
		<input id="amount" class="form-control" type="text" name="amount" maxlength="20" autocomplete="off" />
	</div>
</div>

[#-- 转让期限 --]
<div class="form-group">
	<label for="period" class="col-sm-2 control-label">
		<span class="required">*</span>
		转让期限
	</label>
	<div class="input-group col-sm-4">
		<input id="period" class="form-control" type="text" name="period" maxlength="20" autocomplete="off" />
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
		<input id="interestRate" class="form-control" type="text" name="interestRate" maxlength="20" autocomplete="off" />
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
		<textarea id="description" class="form-control" name="description" cols="10" rows="5"></textarea>
	</div>
</div>