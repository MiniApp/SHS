[#-- 姓名 --]
<div class="form-group">
	<label for="name" class="col-sm-2 control-label">
		姓名
	</label>
	<div class="col-sm-4">
		<input id="name" class="form-control" type="text" name="name" maxlength="200" />
	</div>
</div>

[#-- 身份证号码 --]
<div class="form-group">
	<label for="idNo" class="col-sm-2 control-label">
		身份证号码
	</label>
	<div class="col-sm-4">
		<input id="idNo" class="form-control" type="text" name="idNo" maxlength="200" />
	</div>
</div>

[#-- 身份证签发日期 --]
<div class="form-group">
	<label for="idIssueDate" class="col-sm-2 control-label">
		身份证签发日期
	</label>
	<div class="col-sm-4">
		<input id="idIssueDate" class="form-control datetimepicker datetimepicker-yyyy-MM-dd" type="text" name="idIssueDate" />
	</div>
</div>

[#-- 身份证到期日期 --]
<div class="form-group">
	<label for="idExpiryDate" class="col-sm-2 control-label">
		身份证到期日期
	</label>
	<div class="col-sm-4">
		<input id="idExpiryDate" class="form-control datetimepicker datetimepicker-yyyy-MM-dd" type="text" name="idExpiryDate" />
	</div>
</div>

[#-- 性别 --]
<div class="form-group">
	<label for="gender" class="col-sm-2 control-label">
		性别
	</label>
	<div class="col-sm-4">
		<select id="gender" class="form-control chosen-select" name="gender" data-placeholder="&nbsp;">
			<option value="">-</option>
			[#list genders as gender]
				<option value="${gender}">${message("Gender." + gender)}</option>
			[/#list]
		</select>
	</div>
</div>

[#-- 出生日期 --]
<div class="form-group">
	<label for="birth" class="col-sm-2 control-label">
		出生日期
	</label>
	<div class="col-sm-4">
		<input id="birth" class="form-control datetimepicker datetimepicker-yyyy-MM-dd" type="text" name="birth" />
	</div>
</div>

[#-- 邮箱地址 --]
<div class="form-group">
	<label for="email" class="col-sm-2 control-label">
		邮箱地址
	</label>
	<div class="col-sm-4">
		<input id="email" class="form-control" type="text" name="email" maxlength="200" />
	</div>
</div>

[#-- 手机号码 --]
<div class="form-group">
	<label for="mobile" class="col-sm-2 control-label">
		手机号码
	</label>
	<div class="col-sm-4">
		<input id="mobile" class="form-control" type="text" name="mobile" maxlength="200" />
	</div>
</div>

[#-- 电话号码 --]
<div class="form-group">
	<label for="phone" class="col-sm-2 control-label">
		电话号码
	</label>
	<div class="col-sm-4">
		<input id="phone" class="form-control" type="text" name="phone" maxlength="200" />
	</div>
</div>

[#-- QQ号码 --]
<div class="form-group">
	<label for="qq" class="col-sm-2 control-label">
		QQ号码
	</label>
	<div class="col-sm-4">
		<input id="qq" class="form-control" type="text" name="qq" maxlength="200" />
	</div>
</div>

[#-- 最高学历 --]
<div class="form-group">
	<label for="educ" class="col-sm-2 control-label">
		最高学历
	</label>
	<div class="col-sm-4">
		<select id="educ" class="form-control chosen-select" name="educ" data-placeholder="&nbsp;">
			<option value="">-</option>
			[#list educs as educ]
				<option value="${educ}">${educ}</option>
			[/#list]
		</select>
	</div>
</div>

[#-- 毕业院校 --]
<div class="form-group">
	<label for="univ" class="col-sm-2 control-label">
		毕业院校
	</label>
	<div class="col-sm-4">
		<input id="univ" class="form-control" type="text" name="univ" maxlength="200" />
	</div>
</div>

[#-- 入校日期 --]
<div class="form-group">
	<label for="univEnrolDate" class="col-sm-2 control-label">
		入校日期
	</label>
	<div class="col-sm-4">
		<input id="univEnrolDate" class="form-control datetimepicker datetimepicker-yyyy" type="text" name="univEnrolDate" />
	</div>
</div>

[#-- 籍贯 --]
<div class="form-group">
	<label class="col-sm-2 control-label">
		籍贯
	</label>
	<input class="selectSascade" type="hidden" name="birthplace" />
</div>

[#-- 户籍 --]
<div class="form-group">
	<label class="col-sm-2 control-label">
		户籍
	</label>
	<input class="selectSascade" type="hidden" name="domicilePlace" />
</div>

[#-- 居住地 --]
<div class="form-group">
	<label class="col-sm-2 control-label">
		居住地
	</label>
	<input class="selectSascade" type="hidden" name="abodePlace" />
</div>

[#-- 居住地地址 --]
<div class="form-group">
	<label for="abodePlaceAddr" class="col-sm-2 control-label">
		居住地地址
	</label>
	<div class="col-sm-4">
		<input id="abodePlaceAddr" class="form-control" type="text" name="abodePlaceAddr" maxlength="200" />
	</div>
</div>

[#-- 居住地邮编 --]
<div class="form-group">
	<label for="abodePlaceZipcode" class="col-sm-2 control-label">
		居住地邮编
	</label>
	<div class="col-sm-4">
		<input id="abodePlaceZipcode" class="form-control" type="text" name="abodePlaceZipcode" maxlength="200" />
	</div>
</div>

[#-- 居住地电话 --]
<div class="form-group">
	<label for="abodePlacePhone" class="col-sm-2 control-label">
		居住地电话
	</label>
	<div class="col-sm-4">
		<input id="abodePlacePhone" class="form-control" type="text" name="abodePlacePhone" maxlength="200" />
	</div>
</div>