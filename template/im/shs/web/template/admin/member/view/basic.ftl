[#-- 用户名 --]
<div class="form-group">
	<label class="col-sm-2 control-label">
		用户名
	</label>
	<div class="col-sm-4">
		<p class="form-control-static">
			<strong>${member.username}</strong>
		</p>
	</div>
</div>

[#-- 姓名 --]
<div class="form-group">
	<label class="col-sm-2 control-label">
		姓名
	</label>
	<div class="col-sm-4">
		<p class="form-control-static">
			<strong>${(member.name)!"-"}</strong>
		</p>
	</div>
</div>
			
[#-- 身份证号码 --]
<div class="form-group">
	<label class="col-sm-2 control-label">
		身份证号码
	</label>
	<div class="col-sm-4">
		<p class="form-control-static">
			<strong>${(member.idNo)!"-"}</strong>
		</p>
	</div>
</div>

[#-- 邮箱地址 --]
<div class="form-group">
	<label class="col-sm-2 control-label">
		邮箱地址
	</label>
	<div class="col-sm-4">
		<p class="form-control-static">
			<strong>${(member.email)!"-"}</strong>
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
			<strong>${(member.mobile)!"-"}</strong>
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
			<strong>${member.enabled?string("是", "否")}</strong>
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
			<strong>${member.locked?string("是", "否")}</strong>
		</p>
	</div>
</div>

[#if member.locked]
	[#-- 锁定日期 --]
	<div class="form-group">
		<label class="col-sm-2 control-label">
			锁定日期
		</label>
		<div class="col-sm-4">
			<p class="form-control-static">
				<strong>${member.lockedDate?string("yyyy-MM-dd HH:mm:ss")}</strong>
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
			<strong>${member.registIp!"-"}</strong>
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
			<strong>${member.loginIp!"-"}</strong>
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
			<strong>${(member.loginDate?string("yyyy-MM-dd HH:mm:ss"))!"-"}</strong>
		</p>
	</div>
</div>