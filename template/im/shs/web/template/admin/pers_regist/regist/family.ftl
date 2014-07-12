[#-- 婚姻状况 --]
<div class="form-group">
	<label for="marriage" class="col-sm-2 control-label">
		婚姻状况
	</label>
	<div class="col-sm-4">
		<select id="marriage" class="form-control chosen-select" name="marriage" data-placeholder="&nbsp;">
			<option value="">-</option>
			[#list marriages as marriage]
				<option value="${marriage}">${message("Marriage." + marriage)}</option>
			[/#list]
		</select>
	</div>
</div>
		
[#-- 子女情况 --]
<div class="form-group">
	<label for="child" class="col-sm-2 control-label">
		子女情况
	</label>
	<div class="col-sm-4">
		<select id="child" class="form-control chosen-select" name="child" data-placeholder="&nbsp;">
			<option value="">-</option>
			[#list childs as child]
				<option value="${child}">${message("Child." + child)}</option>
			[/#list]
		</select>
	</div>
</div>

[#-- 直系亲属姓名 --]
<div class="form-group">
	<label for="directRelativeName" class="col-sm-2 control-label">
		直系亲属姓名
	</label>
	<div class="col-sm-4">
		<input id="directRelativeName" class="form-control" type="text" name="directRelativeName" maxlength="200" />
	</div>
</div>

[#-- 直系亲属关系 --]
<div class="form-group">
	<label for="directRelativeRelation" class="col-sm-2 control-label">
		直系亲属关系
	</label>
	<div class="col-sm-4">
		<input id="directRelativeRelation" class="form-control" type="text" name="directRelativeRelation" maxlength="200" />
	</div>
</div>

[#-- 直系亲属手机 --]
<div class="form-group">
	<label for="directRelativeMobile" class="col-sm-2 control-label">
		直系亲属手机
	</label>
	<div class="col-sm-4">
		<input id="directRelativeMobile" class="form-control" type="text" name="directRelativeMobile" maxlength="200" />
	</div>
</div>

[#-- 其他联系人姓名 --]
<div class="form-group">
	<label for="otherContactName" class="col-sm-2 control-label">
		其他联系人姓名
	</label>
	<div class="col-sm-4">
		<input id="otherContactName" class="form-control" type="text" name="otherContactName" maxlength="200" />
	</div>
</div>

[#-- 其他联系人关系 --]
<div class="form-group">
	<label for="otherContactRelation" class="col-sm-2 control-label">
		其他联系人关系
	</label>
	<div class="col-sm-4">
		<input id="otherContactRelation" class="form-control" type="text" name="otherContactRelation" maxlength="200" />
	</div>
</div>

[#-- 其他联系人手机 --]
<div class="form-group">
	<label for="otherContactMobile" class="col-sm-2 control-label">
		其他联系人手机
	</label>
	<div class="col-sm-4">
		<input id="otherContactMobile" class="form-control" type="text" name="otherContactMobile" maxlength="200" />
	</div>
</div>

[#-- 更多联系人姓名 --]
<div class="form-group">
	<label for="moreContactName" class="col-sm-2 control-label">
		更多联系人姓名
	</label>
	<div class="col-sm-4">
		<input id="moreContactName" class="form-control" type="text" name="moreContactName" maxlength="200" />
	</div>
</div>

[#-- 更多联系人关系 --]
<div class="form-group">
	<label for="moreContactRelation" class="col-sm-2 control-label">
		更多联系人关系
	</label>
	<div class="col-sm-4">
		<input id="moreContactRelation" class="form-control" type="text" name="moreContactRelation" maxlength="200" />
	</div>
</div>

[#-- 更多联系人手机 --]
<div class="form-group">
	<label for="moreContactMobile" class="col-sm-2 control-label">
		更多联系人手机
	</label>
	<div class="col-sm-4">
		<input id="moreContactMobile" class="form-control" type="text" name="moreContactMobile" maxlength="200" />
	</div>
</div>