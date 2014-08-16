[@compress single_line = !systemDevelopment]
[#-- 状态: 投资管理 --]
[#assign state = "investment" /]
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
[#-- meta 标签 --]
[#include "/template/include/meta.ftl" /]
<title>${setting.basic.siteName}-账户中心</title>
[#-- Link 顶部 --]
[#include "/template/include/link_top.ftl" /]
[#-- Link 底部 --]
[#include "/template/include/link_bottom.ftl" /]
</head>
<body class="userpage">
[#-- 页眉 --]
[#include "/template/include/header.ftl" /]
<div class="content">
    <div class="rows">
      	
      	[#-- 边导航 --]
      	[#include "/template/member/include/sidebar.ftl" /]
      	
      	[#-- 内容--]
      	<div class="right-content pull-right">
        	<div class="title size-14">我的回账</div>
        	
        	[#-- 待收的回账 --]
            <div class="invest">
            	<div class="invest-title">
                	<ul>
                    	<li><a href="javascript:void(0);" class="active">待收的回账</a></li>
                        <li><a href="${base}/account/recovery_plan?state=recovered">已收的回账</a></li>
                    </ul>
                </div>
                <div id="table-one" class="table">
            		[#--
                    <div class="time">
                        <span class="pull-left margin-right">查询时间</span>
                        <span class="pull-left margin-right"><input type="text" class="text-two" /></span>
                        <span class="pull-left margin-right">到</span>
                        <span class="pull-left margin-right"><input type="text" class="text-two" /></span>
                        <span class="pull-left margin-right"><input type="button" class="btn-one" value="查询" /></span>
                    </div>
                    --]					
                    <table>
                        <tr>
							<th>项目编号</th>
							<th>回收期数</th>
							<th>回收本金</th>
							<th>回收利息</th>
							<th>回收服务费</th>
							<th>投资收益</th>
							<th>回收日期</th>
                        </tr>
						[#list page.cont as recoveryPlan]
							[#assign recovery = recoveryPlan.recovery /]
							[#assign borrowing = recoveryPlan.borrowing /]
							<tr>
								<td><a href="${base}/investment/${borrowing.id}" target="_blank" title="查看项目">${borrowing.id}</a></td>
								<td>${recoveryPlan.period}/${recovery.period}</td>
								<td>${recoveryPlan.capital?string("currency")}</td>
								<td>${recoveryPlan.interest?string("currency")}</td>
								<td>${recoveryPlan.fee?string("currency")}</td>
								<td>${recoveryPlan.income?string("currency")}</td>
								<td>${recoveryPlan.date?string("yyyy-MM-dd")}</td>
							</tr>
						[/#list]
		                [#if page.cont?size == 0]
		                    <tr>
		                    	<td colspan="7">没有记录！</td>
		                    </tr>
		                [/#if]
                    </table>
                    
                    [#-- 分页 --]
                	[@pagination pageNumber = page.pageNumber totalPages = page.totalPages pattern = "?state=recovering&pageNumber={pageNumber}"]
						[#include "/include/pagination.ftl"]
					[/@pagination]
                    
                </div>
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
<script type="text/javascript" src="${base}/resources/js/YuXinChuangTou.js?version=${setting.basic.siteVersion}"></script>
[#-- Script 底部 --]
[#include "/template/include/script_bottom.ftl" /] 
</body>
</html>
[/@compress]