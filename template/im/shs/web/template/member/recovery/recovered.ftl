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
        	<div class="title size-14">我的投资</div>
        	
        	[#-- 已回收的投资 --]
            <div class="invest">
            	<div class="invest-title">
                	<ul>
                    	<li><a href="${base}/account/recovery?state=recovering">回收中的投资</a></li>
                        <li><a href="javascript:void(0);" class="active">已回收的投资</a></li>
                        <li><a href="${base}/account/investment/investing">投标中的投资</a></li>
                    </ul>
                </div>
                <div id="table-two" class="table">
                    <table>
                        <tr>
							<td>项目编号</td>
							<td>借款协议</td>
							<td>投资金额</td>
							<td>回收期限</td>
							<td>回收利率</td>
							<td>回收方式</td>
							<td>已收本息</td>
							<td>已付服务费</td>
							[#--
							<th>投资收益</th>
							--]
							<td>回收完成日期</td>
							[#--
							<td>投资日期</td>
							--]
                        </tr>
						[#list page.cont as recovery]
							[#assign borrowing = recovery.borrowing /]
							<tr>
								<td><a href="${base}/investment/${borrowing.id}" target="_blank" title="查看项目">${borrowing.id}</a></td>
								<td>
									<a href="${base}/account/recovery/agreement/${recovery.id}" target="_blank" title="查看协议">查看</a>
									/
									<a href="${base}/account/recovery/agreement/${recovery.id}/download" target="_blank" title="下载协议">下载</a>
								</td>
								<td>${recovery.capital?string("currency")}</td>
								<td>${borrowing.period}个月</td>
								<td>${borrowing.interestRate}%/年</td>
								<td>${message("RepaymentMethod." + borrowing.repaymentMethod)}</td>
								<td>${recovery.recoveredCapitalInterest?string("currency")}</td>
								<td>${recovery.paidFee?string("currency")}</td>
								[#--
								<td>${recovery.recoveredIncome?string("currency")}</td>
								--]
								<td>${recovery.finishDate?string("yyyy-MM-dd")}</td>
								[#--
								<td>${recovery.createDate?string("yyyy-MM-dd")}</td>
								--]
							</tr>
						[/#list]
		                [#if page.cont?size == 0]
		                    <tr>
			                	[#--
		                    	<td colspan="11">没有记录！</td>
			                    --]
		                    	<td colspan="9">没有记录！</td>
		                    </tr>
		                [/#if]
                    </table>
                    
                    [#-- 分页 --]
                	[@pagination pageNumber = page.pageNumber totalPages = page.totalPages pattern = "?state=recovered&pageNumber={pageNumber}"]
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