[#-- 用户名 --]
<div class="form-group">
	<label for="username" class="col-sm-2 control-label">
		<span class="required">*</span>
		用户名
	</label>
	<div class="col-sm-4">
		<input id="username" class="form-control" type="text" name="username" maxlength="20" autocomplete="off" />
	</div>
</div>
		
[#-- 密码 --]
<div class="form-group">
	<label for="password" class="col-sm-2 control-label">
		<span class="required">*</span>
		密码
	</label>
	<div class="col-sm-4">
		<input id="password" class="form-control" type="password" name="password" maxlength="20" autocomplete="off" />
	</div>
</div>

[#-- 确认密码 --]
<div class="form-group">
	<label for="rePassword" class="col-sm-2 control-label">
		<span class="required">*</span>
		确认密码
	</label>
	<div class="col-sm-4">
		<input id="rePassword" class="form-control" type="password" name="rePassword" maxlength="20" autocomplete="off" />
	</div>
</div>

[#-- 是否启用 --]
<div class="form-group">
	<label for="enabled" class="col-sm-2 control-label">
		是否启用
	</label>
	<div class="col-sm-4">
		<select id="enabled" class="form-control chosen-select" name="enabled" data-placeholder="&nbsp;">
			<option value="true">是</option>
			<option value="false">否</option>
		</select>
	</div>
</div>