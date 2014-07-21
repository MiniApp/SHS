[@compress single_line = !systemDevelopment]
[#-- 状态: 我要投资 --]
[#assign nav = "investment"]
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
[#-- meta 标签 --]
[#include "/template/include/meta.ftl" /]
<title>${setting.basic.siteName}-我要投资</title>
[#-- Link 顶部 --]
[#include "/template/include/link_top.ftl" /]
[#-- jQuery Colorbox 弹出层 --]
<link rel="stylesheet" type="text/css" href="${base}/resources/css/colorbox.css?version=${setting.basic.siteVersion}"/>
[#-- Link 底部 --]
[#include "/template/include/link_bottom.ftl" /]
</head>
<body class="standardList">
[#-- 页眉 --]
[#include "/template/include/header.ftl" /]
<div class="content">
	
    <div class="rows">
    	<div class="mark-search">
            
            [#-- 搜索项 --]
            <div class="search pull-left">
				<form id="searchForm" action="${base}/investment" method="get">
					<input id="type" type="hidden" name="type" value="${type}" />
					<input id="rating" type="hidden" name="rating" value="${rating}" />
					<input id="period" type="hidden" name="period" value="${period}" />
				</form>
                <h3>搜索条件选择</h3>
                <dl class="dl-horizontal">             	    	       
                    <dt class="pull-left">项目类型：</dt>
                	<dd><a href="#all" class="type[#if type == null] active[/#if]" val="">全部</a></dd>
                	[#list types as type_]
                		<dd><a href="#${type_}" class="type[#if type_ == type] active[/#if]" val="${type_}">${message("BorrowingType." + type_)}</a></dd>	
                	[/#list]
                </dl>
                <dl class="dl-horizontal">
                    <dt class="pull-left">信用评级：</dt>
                    <dd><a href="#all" class="rating[#if rating == null] active[/#if]" val="">全部</a></dd>
                    [#list ratings as rating_]
                		<dd><a href="#${rating_}" class="rating[#if rating_ == rating] active[/#if]" val="${rating_}">${message("CreditRating." + rating_)}</a></dd>	
                	[/#list]
                </dl> 
                <dl class="dl-horizontal">            
                    <dt class="pull-left">借款期限：</dt>
                    <dd><a href="#all" class="period[#if period == null] active[/#if]" val="">全部</a></dd>
                    [#list periods as period_]
                		<dd><a href="#${period_}" class="period[#if period_ == period] active[/#if]" val="${period_}">${message("PeriodScope." + period_)}</a></dd>	
                	[/#list]
                 </dl>
            </div>
            
	    	[#-- 投资列表新手引导 --]
	    	[@ad_position ident = "INVESTMENTS_GUIDE" /]
	    	
        </div>
    </div>
    
    [#-- 项目列表 --]
    <div class="rows">
    	<div class="container">
        	<div class="mark-title">
            	<span class="pull-left">搜索结果</span>
                <span class="pull-right"><a href="${base}/investment/calculator" target="_blank">收益计算</a></span>
            </div>
            <div class="mark-list">
                <ul>
					[#list page.cont as project]
						<li class="mark-list-li" id="border-no">
	                            
                            [#-- 类型图标 --]
	                        <div class="mark_list_img pull-left"><img src="${base}/resources/images/mark_iconb.png?version=${setting.basic.siteVersion}" /></div>
	                        
                            [#-- 基本信息 --]
	                        <div class="mark_list_content pull-left">
	                            <div>
	                                <span class="pull-left"><img src="${base}/resources/images/borrowing_${project.type}.gif?version=${setting.basic.siteVersion}" /></span>
	                                <span class="mark_list_title pull-left"><a href="${base}/investment/${project.id}" target="_blank" title="${project.title}">${abbreviate(project.title, 40, "...")}</a></span>
	                            </div>
	                            <ul class="mark_field">
                                    <li>借款金额：${project.amount?string("currency")}</li>
                                    <li>借款利率： ${project.interestRate}%/年</li>
                                    <li>借款期限：${project.period}个月</li>
	                                <li>信用等级： (<a>${message("CreditRating." + project.creditRating)}</a>)</li>
	                                <li>
	                                    <span class="pull-left">借款进度：</span>
	                                    <div class="progress_bar_bg pull-left">
	                                        <div class="progress_bar" style="width:${project.investmentProgress?string("percent")};"></div>
	                                    </div>
	                                    <div class="pull-left">${project.investmentProgress?string("percent")}</div>
	                                </li>
	                                <li>已完成${project.investedQuantity}笔投标</li>
	                            </ul>
	                        </div>
	                            
                            [#-- 操作按钮&状态 --]
                            [#if project.isFailure]
                            	<div class="status_button pull-left"><a href="${base}/investment/${project.id}" target="_blank" class="btn-two-a">已流标</a></div>
                            [#else]
	                            [#if project.progress == "investing"]
	                            	<div class="status_button pull-left"><a href="${base}/investment/${project.id}" target="_blank" class="btn-one">投标</a></div>
								[#elseif project.progress == "lending"]
									<div class="status_button pull-left"><a href="${base}/investment/${project.id}" target="_blank" class="btn-two">已满标</a></div>
								[#elseif project.progress == "repaying"]
			                        <div class="status_button pull-left"><a href="${base}/investment/${project.id}" target="_blank" class="btn-two-b">还款中</a></div>
								[#elseif project.progress == null && project.state == "success"]
			                        <div class="status_button pull-left"><a href="${base}/investment/${project.id}" target="_blank" class="btn-two-c">已完成</a></div>
								[/#if]
                            [/#if]
                            
	                    </li>
					[/#list]
                </ul>
            </div>
        </div>
        
    	[#-- 分页 --]
    	[@pagination pageNumber = page.pageNumber totalPages = page.totalPages pattern = "?type=${type}&credit=${credit}&term=${term}&pageNumber={pageNumber}"]
        	<div class="mark-Page">
				[#include "/include/pagination.ftl"]
        	</div>
		[/@pagination]
        
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
[#-- jQuery Colorbox 弹出层 --]
<script type="text/javascript" src="${base}/resources/js/jquery.colorbox.js?version=${setting.basic.siteVersion}"></script>
[#-- project.list 项目列表 --]
<script type="text/javascript" src="${base}/resources/js/project.list.min.js?version=${setting.basic.siteVersion}"></script>
[#-- 瞬时消息 --]
[@flash_message; flashMessage]
[#if flashMessage??]
<script type="text/javascript">
$().ready(function() {
	$.colorbox({ html: "<div style='color: rgb(0, 125, 181); font-size: 20px; padding: 10px 30px; overflow: hidden; margin: 5px; text-align: center; height: 60px; width: 300px; line-height: 60px;'>${flashMessage}</div>" });
});
</script>
[/#if]
[/@flash_message]
<script type="text/javascript" src="${base}/resources/js/YuXinChuangTou.js?version=${setting.basic.siteVersion}"></script>
[#-- Script 底部 --]
[#include "/template/include/script_bottom.ftl" /]
</body>
</html>
[/@compress]