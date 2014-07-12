[#-- 页面标题 --]
<div class="form-group">
	<label for="seoTitle" class="col-sm-2 control-label">
		页面标题
	</label>
	<div class="col-sm-4">
		<input id="seoTitle" class="form-control" type="text" name="seo.title" value="[#if seo != null]${seo.title!}[/#if]" maxlength="200" />
	</div>
</div>

[#-- 页面关键词 --]
<div class="form-group">
	<label for="seoKeywords" class="col-sm-2 control-label">
		页面关键词
	</label>
	<div class="col-sm-4">
		<input id="seoKeywords" class="form-control" type="text" name="seo.keywords" value="[#if seo != null]${seo.keywords!}[/#if]" maxlength="200" />
	</div>
</div>

[#-- 页面描述 --]
<div class="form-group">
	<label for="seoDescription" class="col-sm-2 control-label">
		页面描述
	</label>
	<div class="col-sm-4">
		<input id="seoDescription" class="form-control" type="text" name="seo.description" value="[#if seo != null]${seo.description!}[/#if]" maxlength="200" />
	</div>
</div>