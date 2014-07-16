[@compress single_line = !systemDevelopment]
[#-- 状态: 借款管理 --]
[#assign state = "borrowing" /]
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
        	<div class="title size-14">我的还款明细</div>
        	<div class="invest">
	            <div class="table">
	                <table>
	                    <tr>
							<td>项目编号</td>
							<td>还款期数</td>
							<td>还款本息</td>
							<td>还款服务费</td>
							<td>还款逾期利息</td>
							<td>应付金额</td>
							<td>已付金额</td>
							<td>计划还款日期</td>
							<td>实际还款日期</td>
							<td>状态</td>
	                    </tr>
						[#list page.cont as repaymentPlan]
							[#assign borrowing = repaymentPlan.borrowing /]
							[#assign repayment = repaymentPlan.repayment /]
		                    <tr>
		                    	<td>${borrowing.id}</td>
		                    	<td>${repaymentPlan.period}/${repayment.period}</td>
		                		<td>${repaymentPlan.paidCapitalInterest?string("currency")}</td>
		                		<td>${repaymentPlan.paidFee?string("currency")}</td>
		                		<td>${repaymentPlan.paidTotalOverdueInterest?string("currency")}[#--（${repaymentPlan.totalOverduePeriod}天）--]</td>
		                		<td>${repaymentPlan.countAmount?string("currency")}</td>
		                		<td>${repaymentPlan.paidAmount?string("currency")}</td>
		                		<td>${repaymentPlan.date?string("yyyy-MM-dd")}</td>
		                		<td>${(repaymentPlan.paidDate?string("yyyy-MM-dd"))!"-"}</td>
		                		<td>${message("RepaymentState." + repaymentPlan.state)}</td>
		                    </tr>
		                [/#list]
		                [#if page.cont?size == 0]
		                    <tr>
		                    	<td colspan="10">没有记录！</td>
		                    </tr>
		                [/#if]
	                </table>
	            
	                [#-- 分页 --]
	            	[@pagination pageNumber = page.pageNumber totalPages = page.totalPages pattern = "?pageNumber={pageNumber}"]
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
<script type="text/javascript" src="${base}/resources/js/YuXinChuangTou.js?version=${setting.basic.siteVersion}"></script>
[#-- Script 底部 --]
[#include "/template/include/script_bottom.ftl" /] 
</body>
</html>
[/@compress]