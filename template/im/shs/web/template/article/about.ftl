[@compress single_line = !systemDevelopment]
[#-- 状态: 关于我们 --]
[#assign nav = "about"]
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
[#-- meta 标签 --]
[#include "/template/include/meta.ftl" /]
<title>${setting.basic.siteName}-关于我们</title>
[#-- Link 顶部 --]
[#include "/template/include/link_top.ftl" /]
[#-- Link 底部 --]
[#include "/template/include/link_bottom.ftl" /]
</head>
<body class="articlepage">
[#-- 页眉 --]
[#include "/template/include/header.ftl" /]
<div class="content">
    <div class="rows">
    
    	[#-- 左侧栏 --]
        <div class="left-content pull-left">
            <div class="list size-14">
            	<ul>
               		[#list secondCategories as _secondCategory]
               			<li><a href="${base}/article/${firstCategoryAlias}/${_secondCategory.alias}"[#if _secondCategory.id == secondCategory.id] class="active"[/#if]>${_secondCategory.name}</a></li>	
               		[/#list]
                </ul>
            </div>
        </div>
        
        [#-- 右侧栏 --]
        <div class="right-content pull-right">
        	[#if articles?? && articles?size gt 1]
    			<div class="title">${secondCategory.name}</div>
        		[#list articles as article]
		        	<div class="container">
		            	<ul class="article-ul">
		                	<li>
		                    	<h3><a href="${base}/article/${firstCategoryAlias}/${secondCategoryAlias}/${article.alias}" target="_blank" class="color-one">${article.title}</a></h3>
		                        <p>${abbreviate(article.text, 220, "...")}<a href="${base}/article/${firstCategoryAlias}/${secondCategoryAlias}/${article.alias}" target="_blank" class="pull-right">[查看详情]</a></p>
		                    </li>
		                </ul>
		                
    					[#-- 分页 --]
	                    [@pagination pageNumber = page.pageNumber totalPages = page.totalPages pattern = "?pageNumber={pageNumber}"]
	                		<div class="pull-left">
								[#include "/include/pagination.ftl"]
	                    	</div>
						[/@pagination]
	                    
					</div>
        		[/#list]
        	[#elseif article??]
        		<div class="title">${article.title}</div>
	        	<div class="container">
	            	<div class="details">${article.cont}</div>
	            </div>
        	[/#if]
        </div>
        
    </div>
</div>
[#-- Footer 页脚 --]
[#include "/template/include/footer.ftl" /]
[#-- Script 顶部 --]
[#include "/template/include/script_top.ftl" /]
[#-- jQuery Cookie --]
<script type="text/javascript" src="${base}/resources/lib/cookie/jquery.cookie.min.js?version=${setting.basic.siteVersion}"></script>
[#-- 公共 --]
<script type="text/javascript" src="${base}/resources/js/common.min.js?version=${setting.basic.siteVersion}"></script>
<script type="text/javascript" src="${base}/resources/js/YuXinChuangTou.js?version=${setting.basic.siteVersion}"></script>
[#-- Script 底部 --]
[#include "/template/include/script_bottom.ftl" /] 
</body>
</html>
[/@compress]