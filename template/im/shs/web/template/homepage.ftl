[@compress single_line = !systemDevelopment]
[#-- 导航：首页 --]
[#assign nav = "homepage"]
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
[#-- meta 标签 --]
[#include "/template/include/meta.ftl" /]
<title>${setting.basic.siteName}-首页</title>
[#-- Link 顶部 --]
[#include "/template/include/link_top.ftl" /]
<link rel="stylesheet" type="text/css" href="${base}/resources/css/idangerous.swiper.css?version=${setting.basic.siteVersion}"/>
[#-- Link 底部 --]
[#include "/template/include/link_bottom.ftl" /]
</head>
<body class="homepage">
[#-- 页眉 --]
[#include "/template/include/header.ftl" /]
<div class="content">

    <div class="rows">
    	[#-- 首页轮播幻灯片 --]
    	[@ad_position ident = "HOMEPAGE_CAROUSEL" /]
    </div>
    
    <div class="rows clear">
        <div class="rows">
	    	[#-- 首页平台宣传 --]
	    	[@ad_position ident = "HOMEPAGE_PROPAGANDA" /]
        </div>
    </div>
    
    <div class="rows">
    	<div class="container">
    	
            [#-- 左侧栏 --]
            <div class="left-list pull-left">
                
                <div class="title">
                  <ul>
                  	<li><img src="${base}/resources/images/index_icon_a.png?version=${setting.basic.siteVersion}" /></li>
                    <li>推荐投资列表</li>
                  </ul>
                </div>
                
                [#-- 项目列表 --]
                <div id="mark-list-one" class="list-content">
                    <ul>
                    	[#list newProjects as project]
	                        <li class="mark_list">
	                            
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
	                                    <li>信用评级： (<a>${message("CreditRating." + project.creditRating)}</a>)</li>
	                                    <li>
	                                        <span class="pull-left">投资进度：</span>
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
                    <div class="mark_bom_btn"><a href="${base}/investment" target="_blank" class="btn-three">查看更多</a></div>
                </div>
                
            </div>
            
            [#-- 右侧栏 --]  
       		<div class="right-list pull-right">
            
            	[#-- 首页网站公告 --]
	    		[@ad_position ident = "HOMEPAGE_NOTICE" /]
            
            	[#-- 首页在线客服 --]
	    		[@ad_position ident = "HOMEPAGE_SERVICE" /]
                
            	[#-- 首页新闻动态 --]
	    		[@ad_position ident = "HOMEPAGE_NEWS" /]
                
            	[#-- 首页微信 --]
	    		[@ad_position ident = "HOMEPAGE_WE_CHAT" /]
               
            </div>
            
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
<!--[if IE 6]>
<script type="text/javascript" src="${base}/resources/js/iepngfx.js?version=${setting.basic.siteVersion}"></script>
<![endif]-->
[#-- 幻灯片 --]
<script type="text/javascript" src="${base}/resources/js/idangerous.swiper-2.1.min.js?version=${setting.basic.siteVersion}"></script>
<script type="text/javascript" src="${base}/resources/js/homepage.min.js?version=${setting.basic.siteVersion}"></script>
[#-- 向上滚动效果 --]
<script type="text/javascript" src="${base}/resources/js/scroll.js?version=${setting.basic.siteVersion}"></script>
<script type="text/javascript" src="${base}/resources/js/YuXinChuangTou.js?version=${setting.basic.siteVersion}"></script>
[#-- Script 底部 --]
[#include "/template/include/script_bottom.ftl" /] 
</body>
</html>
[/@compress]