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
        	
        	[#-- 投标中的投资 --]
            <div class="invest">
            	<div class="invest-title">
                	<ul>
                    	<li><a href="${base}/account/recovery?state=recovering">回收中的投资</a></li>
                        <li><a href="${base}/account/recovery?state=recovered">已回收的投资</a></li>
                        <li><a href="javascript:void(0);" class="active">投标中的投资</a></li>
                    </ul>
                </div>
                <div id="table-two" class="table">
                    <table>
                        <tr>
							<th>编号</th>
							<th>类型</th>
							<th>评级</th>
							<th>期限</th>
							<th>利率</th>
							<th>投资额度（元）</th>
							<th>筹标进度</th>
                        </tr>
						[#list page.cont as investment]
							[#assign borrowing = investment.borrowing /]
							<tr>
								<td>${borrowing.id}</td>
								<td>${message("InvestmentType." + borrowing.type)}</td>
								<td>${message("CreditRating." + borrowing.creditRating)}</td>
								<td>${borrowing.period}个月</td>
								<td>${borrowing.interestRate}%/年</td>
								<td>${investment.amount?string("currency")}</td>
								<td>${borrowing.investmentProgress?string("percent")}</td>
							</tr>
						[/#list]
		                [#if page.cont?size == 0]
		                    <tr>
		                    	<td colspan="7">没有记录！</td>
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