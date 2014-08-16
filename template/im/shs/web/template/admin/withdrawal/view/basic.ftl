[#-- 状态 --]
<div class="form-group">
	<label class="col-sm-2 control-label">
		状态
	</label>
	<div class="col-sm-4">
		<p class="form-control-static">
			<strong>${message("PaymentState." + withdrawal.state)}</strong>
		</p>
	</div>
</div>

[#-- 类型 --]
<div class="form-group">
	<label class="col-sm-2 control-label">
		类型
	</label>
	<div class="col-sm-4">
		<p class="form-control-static">
			<strong>${message("WithdrawalMethod." + withdrawal.paymentMethod)}</strong>
		</p>
	</div>
</div>
		
[#-- 支付方式 --]
<div class="form-group">
	<label class="col-sm-2 control-label">
		支付方式
	</label>
	<div class="col-sm-4">
		<p class="form-control-static">
			<strong>${withdrawal.paymentName!"-"}</strong>
		</p>
	</div>
</div>

[#-- 编号 --]
<div class="form-group">
	<label class="col-sm-2 control-label">
		编号
	</label>
	<div class="col-sm-4">
		<p class="form-control-static">
			<strong>${withdrawal.sn}</strong>
		</p>
	</div>
</div>

[#-- 提现金额 --]
<div class="form-group">
	<label class="col-sm-2 control-label">
		提现金额
	</label>
	<div class="col-sm-4">
		<p class="form-control-static">
			<strong>${withdrawal.effectiveAmount?string("currency")}</strong>
		</p>
	</div>
</div>

[#-- 服务费 --]
<div class="form-group">
	<label class="col-sm-2 control-label">
		服务费
	</label>
	<div class="col-sm-4">
		<p class="form-control-static">
			<strong>${withdrawal.fee?string("currency")}</strong>
		</p>
	</div>
</div>

[#-- 付款金额 --]
<div class="form-group">
	<label class="col-sm-2 control-label">
		付款金额
	</label>
	<div class="col-sm-4">
		<p class="form-control-static">
			<strong>${withdrawal.amount?string("currency")}</strong>
		</p>
	</div>
</div>

[#if withdrawal.paymentMethod == "offline"]
	[#-- 付款银行 --]
	<div class="form-group">
		<label class="col-sm-2 control-label">
			付款银行
		</label>
		<div class="col-sm-4">
			<p class="form-control-static">
				<strong>${withdrawal.bank!"-"}</strong>
			</p>
		</div>
	</div>
			
	[#-- 付款账户 --]
	<div class="form-group">
		<label class="col-sm-2 control-label">
			付款账户
		</label>
		<div class="col-sm-4">
			<p class="form-control-static">
				<strong>${withdrawal.account!"-"}</strong>
			</p>
		</div>
	</div>
			
	[#-- 付款人 --]
	<div class="form-group">
		<label class="col-sm-2 control-label">
			付款人
		</label>
		<div class="col-sm-4">
			<p class="form-control-static">
				<strong>${withdrawal.payer!"-"}</strong>
			</p>
		</div>
	</div>
[/#if]

[#-- 收款时间 --]
<div class="form-group">
	<label class="col-sm-2 control-label">
		收款时间
	</label>
	<div class="col-sm-4">
		<p class="form-control-static">
			<strong>${(withdrawal.time?string("yyyy-MM-dd HH:mm:ss"))!"-"}</strong>
		</p>
	</div>
</div>
		
[#-- 到期时间 --]
[#if withdrawal.expiry??]
	<div class="form-group">
		<label class="col-sm-2 control-label">
			到期时间
		</label>
		<div class="col-sm-4">
			<p class="form-control-static">
				<strong>${withdrawal.expiry?string("yyyy-MM-dd HH:mm:ss")}</strong>
			</p>
		</div>
	</div>
[/#if]

[#-- 备注 --]
<div class="form-group">
	<label class="col-sm-2 control-label">
		备注
	</label>
	<div class="col-sm-4">
		<p class="form-control-static">
			<strong>${withdrawal.memo!"-"}</strong>
		</p>
	</div>
</div>