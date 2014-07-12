[#-- 用户名 --]
<div class="form-group">
	<label class="col-sm-2 control-label">
		用户名
	</label>
	<div class="col-sm-4">
		<p class="form-control-static">
			<strong>${pers.username}</strong>
		</p>
	</div>
</div>

[#-- 借款总金额 --]
<div class="form-group">
	<label class="col-sm-2 control-label">
		借款总金额
	</label>
	<div class="col-sm-4">
		<p class="form-control-static">
			<strong>${pers.borrowingAmts?string("currency")}</strong>
		</p>
	</div>
</div>

[#-- 投资总金额 --]
<div class="form-group">
	<label class="col-sm-2 control-label">
		投资总金额
	</label>
	<div class="col-sm-4">
		<p class="form-control-static">
			<strong>${pers.investmentAmts?string("currency")}</strong>
		</p>
	</div>
</div>

[#-- 充值总金额 --]
<div class="form-group">
	<label class="col-sm-2 control-label">
		充值总金额
	</label>
	<div class="col-sm-4">
		<p class="form-control-static">
			<strong>${pers.rechargeAmts?string("currency")}</strong>
		</p>
	</div>
</div>

[#-- 提现总金额 --]
<div class="form-group">
	<label class="col-sm-2 control-label">
		提现总金额
	</label>
	<div class="col-sm-4">
		<p class="form-control-static">
			<strong>${pers.withdrawalAmts?string("currency")}</strong>
		</p>
	</div>
</div>
			
[#-- 是否启用 --]
<div class="form-group">
	<label class="col-sm-2 control-label">
		是否启用
	</label>
	<div class="col-sm-4">
		<p class="form-control-static">
			[#if pers.enabled]
				<strong>${pers.enabled?string("是", "否")}</strong>
			[/#if]
		</p>
	</div>
</div>
			
[#-- 是否锁定 --]
<div class="form-group">
	<label class="col-sm-2 control-label">
		是否锁定
	</label>
	<div class="col-sm-4">
		<p class="form-control-static">
			<strong>${pers.locked?string("是", "否")}</strong>
		</p>
	</div>
</div>

[#if pers.locked]
	[#-- 锁定日期 --]
	<div class="form-group">
		<label class="col-sm-2 control-label">
			锁定日期
		</label>
		<div class="col-sm-4">
			<p class="form-control-static">
				<strong>${pers.lockedDate?string("yyyy-MM-dd HH:mm:ss")}</strong>
			</p>
		</div>
	</div>
[/#if]
			
[#-- 注册IP --]
<div class="form-group">
	<label class="col-sm-2 control-label">
		注册IP
	</label>
	<div class="col-sm-4">
		<p class="form-control-static">
			<strong>${pers.registIp!"-"}</strong>
		</p>
	</div>
</div>
			
[#-- 最后登录IP --]
<div class="form-group">
	<label class="col-sm-2 control-label">
		最后登录IP
	</label>
	<div class="col-sm-4">
		<p class="form-control-static">
			<strong>${pers.loginIp!"-"}</strong>
		</p>
	</div>
</div>

[#-- 最后登录日期 --]
<div class="form-group">
	<label class="col-sm-2 control-label">
		最后登录日期
	</label>
	<div class="col-sm-4">
		<p class="form-control-static">
			<strong>${(pers.loginDate?string("yyyy-MM-dd HH:mm:ss"))!"-"}</strong>
		</p>
	</div>
</div>