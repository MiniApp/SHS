[#-- 状态 --]
<div class="form-group">
	<label class="col-sm-2 control-label">
		状态
	</label>
	<div class="col-sm-4">
		<p class="form-control-static">
			<strong>${message("BankCardState." + bankCard.state)}</strong>
		</p>
	</div>
</div>

[#-- 审核状态 --]
<div class="form-group">
	<label class="col-sm-2 control-label">
		审核状态
	</label>
	<div class="col-sm-4">
		<p class="form-control-static">
			<strong>${message("AuditState." + bankCard.auditState)}</strong>
		</p>
	</div>
</div>

[#-- 银行 --]
<div class="form-group">
	<label class="col-sm-2 control-label">
		银行
	</label>
	<div class="col-sm-4">
		<p class="form-control-static">
			<strong>${bankCard.bankName!"-"}</strong>
		</p>
	</div>
</div>

[#-- 支行 --]
<div class="form-group">
	<label class="col-sm-2 control-label">
		支行
	</label>
	<div class="col-sm-4">
		<p class="form-control-static">
			<strong>${bankCard.branchName!"-"}</strong>
		</p>
	</div>
</div>

[#-- 所在地 --]
<div class="form-group">
	<label class="col-sm-2 control-label">
		所在地
	</label>
	<div class="col-sm-4">
		<p class="form-control-static">
			<strong>${bankCard.localityName!"-"}</strong>
		</p>
	</div>
</div>

[#-- 卡号 --]
<div class="form-group">
	<label class="col-sm-2 control-label">
		卡号
	</label>
	<div class="col-sm-4">
		<p class="form-control-static">
			<strong>${bankCard.card!"-"}</strong>
		</p>
	</div>
</div>
			
[#-- 是否默认 --]
<div class="form-group">
	<label class="col-sm-2 control-label">
		是否默认
	</label>
	<div class="col-sm-4">
		<p class="form-control-static">
			<strong>${bankCard.isDefault?string("是", "否")}</strong>
		</p>
	</div>
</div>
		
[#-- 备注 --]
<div class="form-group">
	<label class="col-sm-2 control-label">
		备注
	</label>
	<div class="col-sm-4">
		<p class="form-control-static">
			<strong>${bankCard.memo!"-"}</strong>
		</p>
	</div>
</div>