[#-- 担保方式 --]
<div class="form-group">
	<label class="col-sm-2 control-label">
		担保方式
	</label>
	<div class="col-sm-4">
		<p class="form-control-static">
			<strong>${message("GuaranteeMethod." + borrowing.guaranteeMethod)}</strong>
		</p>
	</div>
</div>

[#--
[#-- 担保金 --\]
<div class="form-group">
	<label class="col-sm-2 control-label">
		担保金
	</label>
	<div class="col-sm-4">
		<p class="form-control-static">
			<strong>
				[#if borrowing.guaranteeCapital??]
					${borrowing.guaranteeCapital?string("currency")}
				[#else]
					-
				[/#if]
			</strong>
		</p>
	</div>
</div>
--]

[#-- 担保公司 --]
<div class="form-group">
	<label class="col-sm-2 control-label">
		担保公司
	</label>
	<div class="col-sm-4">
		<p class="form-control-static">
			<strong>${(borrowing.guaranteeCorp.corpName)!"-"}</strong>
		</p>
	</div>
</div>

[#-- 担保措施 --]
<div class="form-group">
	<label class="col-sm-2 control-label">
		担保措施
	</label>
	<div class="col-sm-4">
		<p class="form-control-static">
			<strong>${borrowing.guarantee!"-"}</strong>
		</p>
	</div>
</div>