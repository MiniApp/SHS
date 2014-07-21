/*
 * Copyright 2010-2014 icl-network.com. All rights reserved.
 * Support: http://www.icl-network.com
 *
 * JavaScript - Article Add
 * Version: 3.0
 */
[#-- 索引URL --]
[#assign indexUrl = base + "/admin/article" /]
$().ready(function() {
			
	[#-- 表单验证 --]
	var $inputForm = $("#inputForm");
	var $categoryId = $("#categoryId");
	$inputForm.find(":submit").prop("disabled", false);
	var $validate = $inputForm.validate({
		rules: {
			categoryId: "required",
			alias: {
				required: true,
				pattern: /^\w+$/,
				remote: {
					url: "${indexUrl}/check_alias",
					data: {categoryId: $categoryId.val()},
					type: "post",
					cache: false
				}
			},
			title: "required"
		},
		messages: {
			alias: {
				pattern: "非法字符",
				remote: "已存在"
			}
		}
	});
	
	[#-- 文章分类选择 --]
	$("input.selectSascade.articleCategory").selectSascade({
		url: "${base}/admin/article_category/jsons",
		choose: "-",
		changed: true
	});
	
	[#-- 文章分类选择 - 修复验证 --]
	var $alias = $("#alias");
	$categoryId.change(function(){
		$validate.element($alias);
		$validate.element(this);
	});
	
});