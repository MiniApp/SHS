[#-- 待收金额 --]
<div class="form-group">
	<label class="col-sm-2 control-label">
		待收金额
	</label>
	<div class="col-sm-4">
		<p class="form-control-static">
			<strong>${account.credit?string("currency")}</strong>
		</p>
	</div>
</div>

[#-- 待还金额 --]
<div class="form-group">
	<label class="col-sm-2 control-label">
		待还金额
	</label>
	<div class="col-sm-4">
		<p class="form-control-static">
			<strong>${account.debit?string("currency")}</strong>
		</p>
	</div>
</div>

[#-- 冻结资金 --]
<div class="form-group">
	<label class="col-sm-2 control-label">
		冻结资金
	</label>
	<div class="col-sm-4">
		<p class="form-control-static">
			<strong>${account.frozen?string("currency")}</strong>
		</p>
	</div>
</div>

[#-- 余额 --]
<div class="form-group">
	<label class="col-sm-2 control-label">
		余额
	</label>
	<div class="col-sm-4">
		<p class="form-control-static">
			<strong>${account.balance?string("currency")}</strong>
		</p>
	</div>
</div>

[#-- 可用余额 --]
<div class="form-group">
	<label class="col-sm-2 control-label">
		可用余额
	</label>
	<div class="col-sm-4">
		<p class="form-control-static">
			<strong>${account.available?string("currency")}</strong>
		</p>
	</div>
</div>