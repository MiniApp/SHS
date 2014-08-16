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
        	<div class="title size-14">我的借款</div>
        	
        	[#-- 已还清的借款 --]
            <div class="invest">
            	<div class="invest-title">
                	<ul>
                    	<li><a href="${base}/account/repayment?state=repaying">还款中的借款</a></li>
                        <li><a href="javascript:void(0);" class="active">已还清的借款</a></li>
                    </ul>
                </div>
                <div id="table-one" class="table">
                    <table>
                        <tr>
			                <td>项目编号</td>
							<td>借款协议</td>
			                <td>借款金额</td>
			                <td>还款期限</td>
			                <td>还款利率</td>
							<td>还款方式</td>
							<td>已还本息</td>
							<td>已付服务费</td>
							<td>已付逾期利息</td>
							[#--
							<td>借款费用</td>
							--]
							<td>还款完成日期</td>
							[#--
							<td>借款日期</td>
							--]
							<td>操作</td>
                        </tr>
						[#list page.cont as repayment]
							[#assign borrowing = repayment.borrowing /]
		                    <tr>
								<td><a href="${base}/investment/${borrowing.id}" target="_blank" title="查看项目">${borrowing.id}</a></td>
								<td>
									<a href="${base}/account/repayment/agreement/${repayment.id}" target="_blank" title="查看协议">查看</a>
									/
									<a href="${base}/account/repayment/agreement/${repayment.id}/download" target="_blank" title="下载协议">下载</a>
								</td>
			                    <td>${repayment.capital?string("currency")}</td>
			                    <td>${borrowing.period}个月</td>
								<td>${borrowing.interestRate}%/年</td>
								<td>${message("RepaymentMethod." + borrowing.repaymentMethod)}</td>
		                        <td>${repayment.paidCapitalInterest?string("currency")}</td>
		                        <td>${repayment.paidFee?string("currency")}</td>
		                        <td>${repayment.paidTotalOverdueInterest?string("currency")}</td>
		                        [#--
		                        <td>${repayment.paidExpenditure?string("currency")}</td>
		                        --]
		                        <td>${repayment.finishDate?string("yyyy-MM-dd")}</td>
		                        [#--
		                        <td>${repayment.createDate?string("yyyy-MM-dd")}</td>
		                        --]
								<td><a href="${base}/account/repayment/${repayment.id}">查看明细</a></td>
		                    </tr>
		                [/#list]
		                [#if page.cont?size == 0]
		                    <tr>
		                    	[#--
		                    	<td colspan="13">没有记录！</td>
		                    	--]
		                    	<td colspan="11">没有记录！</td>
		                    </tr>
		                [/#if]
                    </table>
                    
                    [#-- 分页 --]
                	[@pagination pageNumber = page.pageNumber totalPages = page.totalPages pattern = "?state=repaid&pageNumber={pageNumber}"]
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