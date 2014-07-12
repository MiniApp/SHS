[#-- 银行 --]
<div class="form-group">
	<label for="bank" class="col-sm-2 control-label">
		<span class="required">*</span>
		银行
	</label>
	<div class="col-sm-4">
		<select id="bank" class="form-control chosen-select" name="bankId" data-placeholder="&nbsp;">
			<option value="">-</option>
			[#list banks as bank]
				<option value="${bank.id}"[#if bankCard.bank.id == bank.id] selected="selected"[/#if]>${bank}</option>
			[/#list]
		</select>
	</div>
</div>

[#-- 支行 --]
<div class="form-group">
	<label for="branch" class="col-sm-2 control-label">
		支行
	</label>
	<input id="branch" class="selectBind branch" type="hidden" name="branchId" value="${(bankCard.branch.id)!}" />
</div>

[#-- 所在地 --]
<div class="form-group">
	<label for="locality" class="col-sm-2 control-label">
		所在地
	</label>
	<input id="locality" class="selectSascade area" type="hidden" name="localityId" value="${(bankCard.locality.id)!}" treePath="${(bankCard.locality.treePath)!}" />
</div>

[#-- 卡号 --]
<div class="form-group">
	<label for="card" class="col-sm-2 control-label">
		<span class="required">*</span>
		卡号
	</label>
	<div class="col-sm-4">
		<input id="card" class="form-control" type="text" name="card" value="${bankCard.card}" maxlength="20" />
	</div>
</div>
			
[#-- 是否默认 --]
<div class="form-group">
	<label for="isDefault" class="col-sm-2 control-label">
		是否默认
	</label>
	<div class="col-sm-4">
		<select id="isDefault" class="form-control chosen-select" name="isDefault" data-placeholder="&nbsp;">
			<option value="true"[#if bankCard.isDefault] selected="selected"[/#if]>是</option>
			<option value="false"[#if !bankCard.isDefault] selected="selected"[/#if]>否</option>
		</select>
	</div>
</div>
		
[#-- 备注 --]
<div class="form-group">
	<label for="memo" class="col-sm-2 control-label">
		备注
	</label>
	<div class="col-sm-4">
		<textarea id="memo" class="form-control" name="memo" cols="10" rows="5">${bankCard.memo}</textarea>
	</div>
</div>