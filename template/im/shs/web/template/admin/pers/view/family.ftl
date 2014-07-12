[#-- 婚姻状况 --]
<div class="form-group">
	<label class="col-sm-2 control-label">
		婚姻状况
	</label>
	<div class="col-sm-4">
		<p class="form-control-static">
			<strong>
				${message("Marriage." + pers.marriage)}
			</strong>
		</p>
	</div>
</div>
		
[#-- 子女情况 --]
<div class="form-group">
	<label class="col-sm-2 control-label">
		子女情况
	</label>
	<div class="col-sm-4">
		<p class="form-control-static">
			<strong>
				${message("Child." + pers.child)}
			</strong>
		</p>
	</div>
</div>

[#-- 直系亲属姓名 --]
<div class="form-group">
	<label class="col-sm-2 control-label">
		直系亲属姓名
	</label>
	<div class="col-sm-4">
		<p class="form-control-static">
			<strong>
				${persInfo.directRelativeName}
			</strong>
		</p>
	</div>
</div>

[#-- 直系亲属关系 --]
<div class="form-group">
	<label class="col-sm-2 control-label">
		直系亲属关系
	</label>
	<div class="col-sm-4">
		<p class="form-control-static">
			<strong>
				${persInfo.directRelativeRelation!"-"}
			</strong>
		</p>
	</div>
</div>

[#-- 直系亲属手机 --]
<div class="form-group">
	<label class="col-sm-2 control-label">
		直系亲属手机
	</label>
	<div class="col-sm-4">
		<p class="form-control-static">
			<strong>
				${persInfo.directRelativeMobile!"-"}
			</strong>
		</p>
	</div>
</div>

[#-- 其他联系人姓名 --]
<div class="form-group">
	<label class="col-sm-2 control-label">
		其他联系人姓名
	</label>
	<div class="col-sm-4">
		<p class="form-control-static">
			<strong>
				${persInfo.otherContactName!"-"}
			</strong>
		</p>
	</div>
</div>

[#-- 其他联系人关系 --]
<div class="form-group">
	<label class="col-sm-2 control-label">
		其他联系人关系
	</label>
	<div class="col-sm-4">
		<p class="form-control-static">
			<strong>
				${persInfo.otherContactRelation!"-"}
			</strong>
		</p>
	</div>
</div>

[#-- 其他联系人手机 --]
<div class="form-group">
	<label class="col-sm-2 control-label">
		其他联系人手机
	</label>
	<div class="col-sm-4">
		<p class="form-control-static">
			<strong>
				${persInfo.otherContactMobile!"-"}
			</strong>
		</p>
	</div>
</div>

[#-- 更多联系人姓名 --]
<div class="form-group">
	<label class="col-sm-2 control-label">
		更多联系人姓名
	</label>
	<div class="col-sm-4">
		<p class="form-control-static">
			<strong>
				${persInfo.moreContactName!"-"}
			</strong>
		</p>
	</div>
</div>

[#-- 更多联系人关系 --]
<div class="form-group">
	<label class="col-sm-2 control-label">
		更多联系人关系
	</label>
	<div class="col-sm-4">
		<p class="form-control-static">
			<strong>
				${persInfo.moreContactRelation!"-"}
			</strong>
		</p>
	</div>
</div>

[#-- 更多联系人手机 --]
<div class="form-group">
	<label class="col-sm-2 control-label">
		更多联系人手机
	</label>
	<div class="col-sm-4">
		<p class="form-control-static">
			<strong>
				${persInfo.moreContactMobile!"-"}
			</strong>
		</p>
	</div>
</div>