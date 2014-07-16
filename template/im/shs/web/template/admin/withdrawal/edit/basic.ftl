[#-- 金额 --]
<div class="form-group">
	<label for="amount" class="col-sm-2 control-label">
		<span class="required">*</span>
		金额
	</label>
	<div class="input-group col-sm-4">
		<label class="input-group-addon">￥</label>
		<input id="amount" class="form-control" type="text" name="amount" value="${withdrawal.amount}" maxlength="20" autocomplete="off" />
	</div>
</div>

[#-- 服务费 --]
<div class="form-group">
	<label for="fee" class="col-sm-2 control-label">
		<span class="required">*</span>
		服务费
	</label>
	<div class="input-group col-sm-4">
		<label class="input-group-addon">￥</label>
		<input id="fee" class="form-control" type="text" name="fee" value="${withdrawal.fee}" maxlength="20" autocomplete="off" />
	</div>
</div>
		
[#-- 备注 --]
<div class="form-group">
	<label for="memo" class="col-sm-2 control-label">
		备注
	</label>
	<div class="col-sm-4">
		<textarea id="memo" class="form-control" name="memo" cols="10" rows="5">${withdrawal.memo}</textarea>
	</div>
</div>