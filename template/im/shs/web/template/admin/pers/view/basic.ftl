
[#-- 身份证号码 --]
<div class="form-group">
	<label class="col-sm-2 control-label">
		身份证号码
	</label>
	<div class="col-sm-4">
		<p class="form-control-static">
			<strong>${pers.idNo!"-"}</strong>
		</p>
	</div>
</div>

[#if pers.idNo??]
	[#-- 身份证签发日期 --]
	<div class="form-group">
		<label class="col-sm-2 control-label">
			身份证签发日期
		</label>
		<div class="col-sm-4">
			<p class="form-control-static">
				<strong>
					${(persInfo.idIssueDate?string("yyyy-MM-dd"))!"-"}
				</strong>
			</p>
		</div>
	</div>
	
	[#-- 身份证到期日期 --]
	<div class="form-group">
		<label class="col-sm-2 control-label">
			身份证到期日期
		</label>
		<div class="col-sm-4">
			<p class="form-control-static">
				<strong>
					${(persInfo.idExpiryDate?string("yyyy-MM-dd"))!"-"}
				</strong>
			</p>
		</div>
	</div>
	
	[#-- 性别 --]
	<div class="form-group">
		<label class="col-sm-2 control-label">
			性别
		</label>
		<div class="col-sm-4">
			<p class="form-control-static">
				<strong>
					<strong>${message("Gender." + pers.gender)}</strong>
				</strong>
			</p>
		</div>
	</div>
	
	[#-- 出生日期 --]
	<div class="form-group">
		<label class="col-sm-2 control-label">
			出生日期
		</label>
		<div class="col-sm-4">
			<p class="form-control-static">
				<strong>
					<strong>${(pers.birth?string("yyyy-MM-dd"))!"-"}</strong>
				</strong>
			</p>
		</div>
	</div>
[/#if]

[#-- 邮箱地址 --]
<div class="form-group">
	<label class="col-sm-2 control-label">
		邮箱地址
	</label>
	<div class="col-sm-4">
		<p class="form-control-static">
			<strong>${pers.email!"-"}</strong>
		</p>
	</div>
</div>

[#-- 手机号码 --]
<div class="form-group">
	<label class="col-sm-2 control-label">
		手机号码
	</label>
	<div class="col-sm-4">
		<p class="form-control-static">
			<strong>
				${pers.mobile!"-"}
			</strong>
		</p>
	</div>
</div>

[#-- 电话号码 --]
<div class="form-group">
	<label class="col-sm-2 control-label">
		电话号码
	</label>
	<div class="col-sm-4">
		<p class="form-control-static">
			<strong>
				${pers.phone!"-"}
			</strong>
		</p>
	</div>
</div>

[#-- QQ号码 --]
<div class="form-group">
	<label class="col-sm-2 control-label">
		QQ号码
	</label>
	<div class="col-sm-4">
		<p class="form-control-static">
			<strong>
				${persInfo.qq}
			</strong>
		</p>
	</div>
</div>

[#-- 学历 --]
<div class="form-group">
	<label class="col-sm-2 control-label">
		学历
	</label>
	<div class="col-sm-4">
		<p class="form-control-static">
			<strong>
				${pers.educ!"-"}
			</strong>
		</p>
	</div>
</div>

[#-- 毕业院校 --]
<div class="form-group">
	<label class="col-sm-2 control-label">
		毕业院校
	</label>
	<div class="col-sm-4">
		<p class="form-control-static">
			<strong>
				${pers.univ!"-"}
			</strong>
		</p>
	</div>
</div>

[#-- 入校日期 --]
<div class="form-group">
	<label class="col-sm-2 control-label">
		入校日期
	</label>
	<div class="col-sm-4">
		<p class="form-control-static">
			<strong>
				${(persInfo.univEnrolDate?string("yyyy"))!}
			</strong>
		</p>
	</div>
</div>

[#-- 籍贯 --]
<div class="form-group">
	<label class="col-sm-2 control-label">
		籍贯
	</label>
	<div class="col-sm-4">
		<p class="form-control-static">
			<strong>
				${(pers.birthplace.fullName)!}
			</strong>
		</p>
	</div>
</div>

[#-- 户籍 --]
<div class="form-group">
	<label class="col-sm-2 control-label">
		户籍
	</label>
	<div class="col-sm-4">
		<p class="form-control-static">
			<strong>
				${(pers.domicilePlace.fullName)!}
			</strong>
		</p>
	</div>
</div>

[#-- 居住地 --]
<div class="form-group">
	<label class="col-sm-2 control-label">
		居住地
	</label>
	<div class="col-sm-4">
		<p class="form-control-static">
			<strong>
				${(pers.abodePlace.fullName)!}
			</strong>
		</p>
	</div>
</div>

[#-- 居住地地址 --]
<div class="form-group">
	<label class="col-sm-2 control-label">
		居住地地址
	</label>
	<div class="col-sm-4">
		<p class="form-control-static">
			<strong>
				${pers.addr}
			</strong>
		</p>
	</div>
</div>

[#-- 居住地邮编 --]
<div class="form-group">
	<label class="col-sm-2 control-label">
		居住地邮编
	</label>
	<div class="col-sm-4">
		<p class="form-control-static">
			<strong>
				${pers.zipcode}
			</strong>
		</p>
	</div>
</div>

[#-- 居住地电话 --]
<div class="form-group">
	<label class="col-sm-2 control-label">
		居住地电话
	</label>
	<div class="col-sm-4">
		<p class="form-control-static">
			<strong>
				${pers.phone}
			</strong>
		</p>
	</div>
</div>

[#-- 所在地 --]
<div class="form-group">
	<label class="col-sm-2 control-label">
		所在地
	</label>
	<div class="col-sm-4">
		<p class="form-control-static">
			<strong>
				${(pers.abodePlace.fullName)!}
			</strong>
		</p>
	</div>
</div>

[#-- 所在地地址 --]
<div class="form-group">
	<label class="col-sm-2 control-label">
		所在地地址
	</label>
	<div class="col-sm-4">
		<p class="form-control-static">
			<strong>
				${pers.addr!"-"}
			</strong>
		</p>
	</div>
</div>

[#-- 所在地邮编 --]
<div class="form-group">
	<label class="col-sm-2 control-label">
		所在地邮编
	</label>
	<div class="col-sm-4">
		<p class="form-control-static">
			<strong>
				${pers.zipcode!"-"}
			</strong>
		</p>
	</div>
</div>

[#-- 所在地电话 --]
<div class="form-group">
	<label class="col-sm-2 control-label">
		所在地电话
	</label>
	<div class="col-sm-4">
		<p class="form-control-static">
			<strong>
				${pers.phone!"-"}
			</strong>
		</p>
	</div>
</div>