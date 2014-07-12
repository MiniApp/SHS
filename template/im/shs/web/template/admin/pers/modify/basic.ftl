[#-- 用户名 --]
<div class="form-group">
	<label class="col-sm-2 control-label">
		用户名
	</label>
	<div class="col-sm-4">
		<p class="form-control-static">
			<strong>${pers.username!"-"}</strong>
		</p>
	</div>
</div>

[#-- 姓名 --]
<div class="form-group">
	<label for="name" class="col-sm-2 control-label">
		姓名
	</label>
	<div class="col-sm-4">
		<input id="name" class="form-control" type="text" name="name" value="${pers.name}" maxlength="200" />
	</div>
</div>

[#-- 身份证号码 --]
<div class="form-group">
	<label for="idNo" class="col-sm-2 control-label">
		身份证号码
	</label>
	<div class="col-sm-4">
		<input id="idNo" class="form-control" type="text" name="idNo" value="${pers.idNo}" maxlength="200" />
	</div>
</div>

[#-- 身份证签发日期 --]
<div class="form-group">
	<label for="idIssueDate" class="col-sm-2 control-label">
		身份证签发日期
	</label>
	<div class="col-sm-4">
		<input id="idIssueDate" class="form-control datetimepicker datetimepicker-yyyy-MM-dd" type="text" name="idIssueDate" value="${(persInfo.idIssueDate?string("yyyy-MM-dd"))!}" />
	</div>
</div>

[#-- 身份证到期日期 --]
<div class="form-group">
	<label for="idExpiryDate" class="col-sm-2 control-label">
		身份证到期日期
	</label>
	<div class="col-sm-4">
		<input id="idExpiryDate" class="form-control datetimepicker datetimepicker-yyyy-MM-dd" type="text" name="idExpiryDate" value="${(persInfo.idExpiryDate?string("yyyy-MM-dd"))!}" />
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
				<option value="${gender}"[#if pers.gender == gender] selected="selected"[/#if]>${message("Gender." + gender)}</option>
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
		<input id="birth" class="form-control datetimepicker datetimepicker-yyyy-MM-dd" type="text" name="birth" value="${(pers.birth?string("yyyy-MM-dd"))!}" />
	</div>
</div>

[#-- 邮箱地址 --]
<div class="form-group">
	<label for="email" class="col-sm-2 control-label">
		邮箱地址
	</label>
	<div class="col-sm-4">
		<input id="email" class="form-control" type="text" name="email" value="${pers.email}" maxlength="200" />
	</div>
</div>

[#-- 手机号码 --]
<div class="form-group">
	<label for="mobile" class="col-sm-2 control-label">
		手机号码
	</label>
	<div class="col-sm-4">
		<input id="mobile" class="form-control" type="text" name="mobile" value="${pers.mobile}" maxlength="200" />
	</div>
</div>

[#-- 电话号码 --]
<div class="form-group">
	<label for="phone" class="col-sm-2 control-label">
		电话号码
	</label>
	<div class="col-sm-4">
		<input id="phone" class="form-control" type="text" name="phone" value="${persInfo.phone}" maxlength="200" />
	</div>
</div>

[#-- QQ号码 --]
<div class="form-group">
	<label for="qq" class="col-sm-2 control-label">
		QQ号码
	</label>
	<div class="col-sm-4">
		<input id="qq" class="form-control" type="text" name="qq" value="${persInfo.qq}" maxlength="200" />
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
				<option value="${educ}"[#if pers.educ == educ] selected="selected"[/#if]>${educ}</option>
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
		<input id="univ" class="form-control" type="text" name="univ" value="${pers.univ}" maxlength="200" />
	</div>
</div>

[#-- 入校日期 --]
<div class="form-group">
	<label for="univEnrolDate" class="col-sm-2 control-label">
		入校日期
	</label>
	<div class="col-sm-4">
		<input id="univEnrolDate" class="form-control datetimepicker datetimepicker-yyyy" type="text" name="univEnrolDate" value="${(persInfo.univEnrolDate?string("yyyy"))!}" />
	</div>
</div>

[#-- 籍贯 --]
<div class="form-group">
	<label class="col-sm-2 control-label">
		籍贯
	</label>
	<input class="selectSascade" type="hidden" name="birthplace" value="${(pers.birthplace.id)!}" treePath="${(pers.birthplace.treePath)!}" />
</div>

[#-- 户籍 --]
<div class="form-group">
	<label class="col-sm-2 control-label">
		户籍
	</label>
	<input class="selectSascade" type="hidden" name="domicilePlace" value="${(pers.domicilePlace.id)!}" treePath="${(pers.domicilePlace.treePath)!}" />
</div>

[#-- 居住地 --]
<div class="form-group">
	<label class="col-sm-2 control-label">
		居住地
	</label>
	<input class="selectSascade" type="hidden" name="abodePlace" value="${(pers.abodePlace.id)!}" treePath="${(pers.abodePlace.treePath)!}" />
</div>

[#-- 居住地地址 --]
<div class="form-group">
	<label for="abodePlaceAddr" class="col-sm-2 control-label">
		居住地地址
	</label>
	<div class="col-sm-4">
		<input id="abodePlaceAddr" class="form-control" type="text" name="abodePlaceAddr" value="${pers.addr}" maxlength="200" />
	</div>
</div>

[#-- 居住地邮编 --]
<div class="form-group">
	<label for="abodePlaceZipcode" class="col-sm-2 control-label">
		居住地邮编
	</label>
	<div class="col-sm-4">
		<input id="abodePlaceZipcode" class="form-control" type="text" name="abodePlaceZipcode" value="${pers.zipcode}" maxlength="200" />
	</div>
</div>

[#-- 居住地电话 --]
<div class="form-group">
	<label for="abodePlacePhone" class="col-sm-2 control-label">
		居住地电话
	</label>
	<div class="col-sm-4">
		<input id="abodePlacePhone" class="form-control" type="text" name="abodePlacePhone" value="${pers.phone}" maxlength="200" />
	</div>
</div>