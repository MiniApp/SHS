[#-- 工作职业 --]
<div class="form-group">
	<label class="col-sm-2 control-label">
		工作职业
	</label>
	<div class="col-sm-4">
		<p class="form-control-static">
			<strong>
				${occup}
			</strong>
		</p>
	</div>
</div>
[#-- 公司名称 --]
<div class="form-group">
	<label  class="col-sm-2 control-label">
		公司名称
	</label>
	<div class="col-sm-4">
		<p class="form-control-static">
			<strong>
				${pers.corpName!"-"}
			</strong>
		</p>
	</div>
</div>

[#-- 公司类别 --]
<div class="form-group">
	<label class="col-sm-2 control-label">
		公司类别
	</label>
	<div class="col-sm-4">
		<p class="form-control-static">
			<strong>
				${pers.corpType!"-"}
			</strong>
		</p>
	</div>
</div>

[#-- 公司行业 --]
<div class="form-group">
	<label  class="col-sm-2 control-label">
		公司行业
	</label>
	<div class="col-sm-4">
		<p class="form-control-static">
			<strong>
				${pers.corpDomain!"-"}
			</strong>
		</p>
	</div>
</div>

[#-- 公司规模 --]
<div class="form-group">
	<label  class="col-sm-2 control-label">
		公司规模
	</label>
	<div class="col-sm-4">
		<p class="form-control-static">
			<strong>
				${pers.corpScale!"-"}
			</strong>
		</p>
	</div>
</div>

[#-- 公司所在地 --]
<div class="form-group">
	<label class="col-sm-2 control-label">
		公司所在地
	</label>
	<div class="col-sm-4">
		<p class="form-control-static">
			<strong>
				${(persInfo.corpLocality.fullName)!}
			</strong>
		</p>
	</div>
</div>

[#-- 公司地址 --]
<div class="form-group">
	<label  class="col-sm-2 control-label">
		公司地址
	</label>
	<div class="col-sm-4">
		<p class="form-control-static">
			<strong>
				${persInfo.corpAddr}
			</strong>
		</p>
	</div>
</div>

[#-- 公司邮编 --]
<div class="form-group">
	<label  class="col-sm-2 control-label">
		公司邮编
	</label>
	<div class="col-sm-4">
		<p class="form-control-static">
			<strong>
				${persInfo.corpZipcode}
			</strong>
		</p>
	</div>
</div>

[#-- 工作职位 --]
<div class="form-group">
	<label class="col-sm-2 control-label">
		工作职位
	</label>
	<div class="col-sm-4">
		<p class="form-control-static">
			<strong>
				${pers.post}
			</strong>
		</p>
	</div>
</div>

[#-- 工作年限 --]
<div class="form-group">
	<label class="col-sm-2 control-label">
		工作年限
	</label>
	<div class="col-sm-4">
		<p class="form-control-static">
			<strong>
				${workPeriod}
			</strong>
		</p>
	</div>
</div>

[#-- 工作邮箱 --]
<div class="form-group">
	<label class="col-sm-2 control-label">
		工作邮箱
	</label>
	<div class="col-sm-4">
		<p class="form-control-static">
			<strong>
				${pers.email!"-"}
			</strong>
		</p>
	</div>
</div>

[#-- 工作手机 --]
<div class="form-group">
	<label class="col-sm-2 control-label">
		工作手机
	</label>
	<div class="col-sm-4">
		<p class="form-control-static">
			<strong>
				${pers.mobile!"-"}
			</strong>
		</p>
	</div>
</div>

[#-- 工作电话 --]
<div class="form-group">
	<label class="col-sm-2 control-label">
		工作电话
	</label>
	<div class="col-sm-4">
		<p class="form-control-static">
			<strong>
				${pers.phone!"-"}
			</strong>
		</p>
	</div>
</div>

[#-- 工作QQ --]
<div class="form-group">
	<label class="col-sm-2 control-label">
		工作QQ
	</label>
	<div class="col-sm-4">
		<p class="form-control-static">
			<strong>
				${persInfo.workQq}
			</strong>
		</p>
	</div>
</div>