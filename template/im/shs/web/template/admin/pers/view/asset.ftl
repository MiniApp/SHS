[#-- 有无房产 --]
<div class="form-group">
	<label class="col-sm-2 control-label">
		有无房产
	</label>
	<div class="col-sm-4">
		<p class="form-control-static">
			<strong>${(persInfo.ownHouse?string("有", "无"))!"-"}</strong>
		</p>
	</div>
</div>

[#-- 有无房贷 --]
<div class="form-group">
	<label class="col-sm-2 control-label">
		有无房贷
	</label>
	<div class="col-sm-4">
		<p class="form-control-static">
			<strong>${(persInfo.withHouseLoan?string("有", "无"))!"-"}</strong>
		</p>
	</div>
</div>

[#-- 有无车产 --]
<div class="form-group">
	<label class="col-sm-2 control-label">
		有无车产
	</label>
	<div class="col-sm-4">
		<p class="form-control-static">
			<strong>${(persInfo.ownCar?string("有", "无"))!"-"}</strong>
		</p>
	</div>
</div>

[#-- 有无车贷 --]
<div class="form-group">
	<label class="col-sm-2 control-label">
		有无车贷
	</label>
	<div class="col-sm-4">
		<p class="form-control-static">
			<strong>${(persInfo.withCarLoan?string("有", "无"))!"-"}</strong>
		</p>
	</div>
</div>

[#-- 月收入 --]
<div class="form-group">
	<label class="col-sm-2 control-label">
		月收入
	</label>
	<div class="col-sm-4">
		<p class="form-control-static">
			<strong>
				${persInfo.monthlyIncome!"-"}
			</strong>
		</p>
	</div>
</div>

[#-- 每月信用卡账单 --]
<div class="form-group">
	<label class="col-sm-2 control-label">
		每月信用卡账单
	</label>
	<div class="col-sm-4">
		<p class="form-control-static">
			<strong>
				${persInfo.monthlyCreditCardStatement!"-"}
			</strong>
		</p>
	</div>
</div>