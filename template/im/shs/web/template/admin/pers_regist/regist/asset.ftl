[#-- 有无房产 --]
<div class="form-group">
	<label for="ownHouse" class="col-sm-2 control-label">
		有无房产
	</label>
	<div class="col-sm-4">
		<select id="ownHouse" class="form-control chosen-select" name="ownHouse" data-placeholder="&nbsp;">
			<option value="">-</option>
			<option value="true">有</option>
			<option value="false">无</option>
		</select>
	</div>
</div>

[#-- 有无房贷 --]
<div class="form-group">
	<label for="withHouseLoan" class="col-sm-2 control-label">
		有无房贷
	</label>
	<div class="col-sm-4">
		<select id="withHouseLoan" class="form-control chosen-select" name="withHouseLoan" data-placeholder="&nbsp;">
			<option value="">-</option>
			<option value="true">有</option>
			<option value="false">无</option>
		</select>
	</div>
</div>

[#-- 有无车产 --]
<div class="form-group">
	<label for="ownCar" class="col-sm-2 control-label">
		有无车产
	</label>
	<div class="col-sm-4">
		<select id="ownCar" class="form-control chosen-select" name="ownCar" data-placeholder="&nbsp;">
			<option value="">-</option>
			<option value="true">有</option>
			<option value="false">无</option>
		</select>
	</div>
</div>

[#-- 有无车贷 --]
<div class="form-group">
	<label for="withCarLoan" class="col-sm-2 control-label">
		有无车贷
	</label>
	<div class="col-sm-4">
		<select id="withCarLoan" class="form-control chosen-select" name="withCarLoan" data-placeholder="&nbsp;">
			<option value="">-</option>
			<option value="true">有</option>
			<option value="false">无</option>
		</select>
	</div>
</div>

[#-- 每月信用卡账单 --]
<div class="form-group">
	<label for="monthlyCreditCardStatement" class="col-sm-2 control-label">
		每月信用卡账单
	</label>
	<div class="col-sm-4">
		<select id="monthlyCreditCardStatement" class="form-control chosen-select" name="monthlyCreditCardStatement" data-placeholder="&nbsp;">
			<option value="">-</option>
			[#list monthlyCreditCardStatements as monthlyCreditCardStatement]
				<option value="${monthlyCreditCardStatement}">${monthlyCreditCardStatement}</option>
			[/#list]
		</select>
	</div>
</div>