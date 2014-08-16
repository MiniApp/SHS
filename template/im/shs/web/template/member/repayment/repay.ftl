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
[#-- jQuery Colorbox 弹出层 --]
<link rel="stylesheet" type="text/css" href="${base}/resources/css/colorbox.css?version=${setting.basic.siteVersion}"/>
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
							<td>操作</td>
	                    </tr>
	                    [#assign repayable = false /]
						[#list page.cont as repaymentPlan]
							[#assign borrowing = repaymentPlan.borrowing /]
							[#assign repayment = repaymentPlan.repayment /]
							[#-- 判断是否可还款 --]
							[#if !repayable && repaymentPlan.state == "repaying" && (repaymentPlan.prev == null || repaymentPlan.prev.state == "repaid")]
								[#assign repayable = true /]
							[#else]
								[#assign repayable = false /]		
							[/#if]
		                    <tr>
		                    	<td>${borrowing.id}</td>
		                    	<td>
		                    		<label class="repaymentPeriod">${repaymentPlan.period}</label>
		                    		/
		                    		${repayment.period}
		                    	</td>
		                		<td class="repaymentCapitalInterest">${repaymentPlan.capitalInterest?string("currency")}</td>
		                		<td class="repaymentFee">${repaymentPlan.fee?string("currency")}</td>
		                		<td>
		                			<label class="repaymentOverdueInterest">${repaymentPlan.totalOverdueInterest?string("currency")}</label>
		                			[#--
		                			（<label class="repaymentOverduePeriod">${repaymentPlan.totalOverduePeriod}天</label>）
		                			--]
		                		</td>
		                		<td class="repaymentCountAmount">${repaymentPlan.countAmount?string("currency")}</td>
		                		<td>${repaymentPlan.paidAmount?string("currency")}</td>
		                		<td class="repaymentPlanDate">${repaymentPlan.date?string("yyyy-MM-dd")}</td>
		                		<td>${(repaymentPlan.paidDate?string("yyyy-MM-dd"))!"-"}</td>
		                		<td>${message("RepaymentState." + repaymentPlan.state)}</td>
								<td>
									[#if repayable]
										<a href="#" class="color-one repay" repaymentPlan="${repaymentPlan.id}">还款</a>
									[#else]
										-
									[/#if]
								</td>
		                    </tr>
		                [/#list]
		                [#if page.cont?size == 0]
		                    <tr>
		                    	<td colspan="11">没有记录！</td>
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
    
    [#-- 隐藏元素 --]
    <div style="display:none;">
        [#-- 还款确认会话 --]
        <form id="repaymentConfirmForm" class="repayment" action="${base}/account/repayment/repay" method="post">
        	<input type="hidden" name="repaymentPlan" value="" />
            <div class="title">确认还款</div>
            <div class="table" style="width:480px">
                <table>
					<tr>
						<td width="20%" align="right">借款编号：</td>
						<td>
							${borrowing.id}
							<a href="${base}/investment/${borrowing.id}" class="color-one" target="_blank">查看项目</a>
						</td>
					</tr>
					[#--
					<tr>
						<td align="right">借款标题：</td>
						<td>${abbreviate(borrowing.title, 20, "...")}</td>
					</tr>
                    <tr>
                        <td align="right">借款金额：</td>
                        <td>${borrowing.amount?string("currency")}</td>
                    </tr>
                    <tr>
                        <td align="right">借款利率：</td>
                        <td>${borrowing.interestRate}%/年</td>
                    </tr>
                    <tr>
                        <td align="right">借款期限：</td>
                        <td>${borrowing.period}个月</td>
                    </tr>
                    <tr>
                        <td align="right">还款方式：</td>
                        <td>${message("RepaymentMethod." + borrowing.repaymentMethod)}</td>
                    </tr>
					--]
                    <tr>
                        <td align="right">还款期数：</td>
                        <td>
                        	第<label class="repaymentPeriod"></label>期
                        	（共${repayment.period}期）
                        </td>
                    </tr>
                    <tr>
                        <td align="right">还款本息：</td>
                        <td><label class="repaymentCapitalInterest"></label></td>
                    </tr>
                    <tr>
                        <td align="right">还款服务费：</td>
                        <td><label class="repaymentFee"></label></td>
                    </tr>
                    <tr>
                        <td align="right">还款逾期罚息：</td>
                        <td>
                        	<label class="repaymentOverdueInterest"></label>
                        	（逾期罚息${borrowing.overdueInterestRate}%/天[#--，已逾期<label class="repaymentOverduePeriod"></label>--]，逾期${borrowing.seriousOverdueStartPeriod}天后${borrowing.seriousOverdueInterestRate}%/天）
                        </td>
                    </tr>
                    <tr>
                        <td align="right">还款应付金额：</td>
                        <td><label class="repaymentCountAmount"></label></td>
                    </tr>
                    <tr>
                        <td align="right">计划还款日期：</td>
                        <td><label class="repaymentPlanDate"></label></td>
                    </tr>
                    <tr>
                        <td align="right" valign="top">支付密码：</td>
                        <td>
                        	<input type="password" class="text-one" name="password" value="" placeholder="请输入支付密码" />
							<a href="${base}/account/security" class="color-one" target="_blank">忘记密码？</a>
                        	<p class="annotate" style="color: red; line-height: 14px; height: 14px; margin: 5px 0;"></p>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2">如计划还款日期以前进行还款，将属于正常还款行为，并按合同本息对出借人进行还款。</td>
                    </tr>
                    <tr>
                        <td>&nbsp;</td>
                        <td>
                        	<label><input type="checkbox" name="agreement" value="true" checked="checked" />我已阅读并同意《<a href="${base}/account/repayment/agreement/${repayment.id}" target="_blank" class="color-one">借款协议</a>》</label>
                        	<p class="annotate" style="color: red; line-height: 14px; height: 14px; margin: 0px 0px 15px;"></p>
                        </td>
                    </tr>
                    <tr>
                        <td>&nbsp;</td>
                        <td>
			                <div class="pull-left" style="margin-right: 100px"><input type="submit" value="确定" class="btn-one" /></div>
			                <div class="pull-left"><input type="button" value="取消" class="btn-two cancel" /></div>
                        </td>
                    </tr>
				</table>
            </div>
        </form>
    </div>
    
</div>
[#-- Footer 页脚 --]
[#include "/template/include/footer.ftl" /]
[#-- RSA加密 --]
<script type="text/javascript" src="${base}/resources/lib/tools/rsa/jsbn.min.js?version=${setting.basic.siteVersion}"></script>
<script type="text/javascript" src="${base}/resources/lib/tools/rsa/prng4.min.js?version=${setting.basic.siteVersion}"></script>
<script type="text/javascript" src="${base}/resources/lib/tools/rsa/rng.min.js?version=${setting.basic.siteVersion}"></script>
<script type="text/javascript" src="${base}/resources/lib/tools/rsa/rsa.min.js?version=${setting.basic.siteVersion}"></script>
<script type="text/javascript" src="${base}/resources/lib/tools/base/base64.min.js?version=${setting.basic.siteVersion}"></script>
[#-- Script 顶部 --]
[#include "/template/include/script_top.ftl" /]
[#-- validate 验证器 --]
<script type="text/javascript" src="${base}/resources/lib/validate/jquery.validate.min.js?version=${setting.basic.siteVersion}"></script>
<script type="text/javascript" src="${base}/resources/lib/validate/jquery.validate.method.min.js?version=${setting.basic.siteVersion}"></script>
[#-- jQuery Cookie --]
<script type="text/javascript" src="${base}/resources/lib/cookie/jquery.cookie.min.js?version=${setting.basic.siteVersion}"></script>
[#-- 公共 --]
<script type="text/javascript" src="${base}/resources/js/common.min.js?version=${setting.basic.siteVersion}"></script>
[#-- jQuery Colorbox 弹出层 --]
<script type="text/javascript" src="${base}/resources/js/jquery.colorbox.js?version=${setting.basic.siteVersion}"></script>
[#-- repayment.repay 借款还款 --]
<script type="text/javascript">var modulus = "${modulus}", exponent = "${exponent}", available = ${currentMember.available};</script>
<script type="text/javascript" src="${base}/resources/member/js/repayment.repay.min.js?version=${setting.basic.siteVersion}"></script>
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