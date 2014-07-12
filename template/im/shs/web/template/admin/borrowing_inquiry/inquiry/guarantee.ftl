[#-- 担保方式 --]
<div class="form-group">
	<label for="guaranteeMethod" class="col-sm-2 control-label">
		担保方式
	</label>
	<div class="col-sm-4">
		<select id="guaranteeMethod" class="form-control chosen-select" name="guaranteeMethod" data-placeholder="&nbsp;">
			<option value="">-</option>
			[#list guaranteeMethods as guaranteeMethod]
				<option value="${guaranteeMethod}"[#if borrowing.guaranteeMethod == guaranteeMethod] selected="selected"[/#if]>${message("GuaranteeMethod." + guaranteeMethod)}</option>
			[/#list]
		</select>
	</div>
</div>

<input type="hidden" name="guaranteeCapital" value="0" />
[#--
[#-- 担保金 --\]
<div class="form-group">
	<label for="guaranteeCapital" class="col-sm-2 control-label">
		担保金
	</label>
	<div class="input-group col-sm-4">
		<label class="input-group-addon">￥</label>
		<input id="guaranteeCapital" class="form-control" type="text" name="guaranteeCapital" value="${borrowing.guaranteeCapital}" maxlength="20" autocomplete="off" />
	</div>
</div>
--]

[#-- 担保公司 --]
<div class="form-group">
	<label for="guaranteeCorpId" class="col-sm-2 control-label">
		担保公司
	</label>
	<div class="col-sm-4">
		<select id="guaranteeCorpId" class="form-control chosen-select" name="guaranteeCorpId" data-placeholder="&nbsp;">
			<option value="">-</option>
			[#list guaranteeCorps as guaranteeCorp]
				<option value="${guaranteeCorp.id}"[#if borrowing.guaranteeCorp.id == guaranteeCorp.id] selected="selected"[/#if]>${guaranteeCorp.corpName}</option>
			[/#list]
		</select>
	</div>
</div>

[#-- 担保措施 --]
<div class="form-group">
	<label for="guarantee" class="col-sm-2 control-label">
		担保措施
	</label>
	<div class="col-sm-4">
		<textarea id="guarantee" class="form-control" name="guarantee" cols="10" rows="5">${borrowing.guarantee}</textarea>
	</div>
</div>