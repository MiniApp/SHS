[@compress single_line = !systemDevelopment]
[#-- 状态：首页 --]
[#assign state = "homepage"]
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
        	<div class="title size-14">用户基本信息</div>
            
            [#-- 用户基本信息 --]
            <div class="basic_information"> 
                <div class="avatar pull-left"><img src="${base}/resources/images/avatar.gif?version=${setting.basic.siteVersion}" /></div>
                <div class="certification pull-left">
                    <ul>
                        <li class="certification_li pull-left">
                            <label>用户名：</label>
                            <div>${currentMember.username}</div>
                        </li>
                        <li class="certification_li pull-left">
                            <label>安全等级：</label>
                            <div>
                                <div class="user_progress_bar_bg pull-left">
                                    <div class="user_progress_bar" style="width:${currentMember.securityLevel?string("percent")}"></div>
                                </div>
                                <div class="pull-right user_progress_wz">[#--HR--]</div>
                            </div>
                        </li>
                        <li class="certification_li pull-left">
                            <label>认证情况：</label>
                            <ul class="basic_authentication">
                                <li><a href="${base}/account/security" title="邮箱认证"><img src="${base}/resources/images/sacenr_C[#if !currentMember.email??]_hs[/#if].png?version=${setting.basic.siteVersion}" /></a></li>
                                <li><a href="${base}/account/security" title="手机认证"><img src="${base}/resources/images/sacenr_D[#if !currentMember.mobile??]_hs[/#if].png?version=${setting.basic.siteVersion}" /></a></li>
                                <li><a href="${base}/account/security" title="身份认证"><img src="${base}/resources/images/sacenr_B[#if !currentMember.idNo??]_hs[/#if].png?version=${setting.basic.siteVersion}" /></a></li>
                                <li><a href="${base}/account/security" title="提现密码"><img src="${base}/resources/images/sacenr_E[#if !currentMember.payPassword??]_hs[/#if].png?version=${setting.basic.siteVersion}" /></a></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
            
            [#-- 账户基本信息 --]
            <div class="money_div"> 
                <div class="money pull-left">
                    <ul>
                        <li class="accountBalance"><span>账户余额：${currentMember.balance?string("currency")}</span></li>
                        <li class="freezeAmount">冻结金额：${currentMember.frozen?string("currency")}</li>
                        <li class="amountAvailable">可用金额：${currentMember.available?string("currency")}</li>
                    </ul>
                </div>
                <div class="recharge_withdrawals pull-left">
                    <ul>
                        <li><a href="${base}/account/recharge" class="btn-fours">充值</a></li>
                        <li><a href="${base}/account/withdrawal" class="btn-four">提现</a></li>
                    </ul>
                </div>
            </div>
            
            [#-- 账户统计信息 --]
            <div class="account_list">
                <div class="net_assets">
                    <ul>
                        <li class="net_assets_one">
                            <div>账户净资产</div>
                            <div>${currentMember.equity?string("currency")}</div>
                        </li>
                        <li class="net_assets_two size-16">=</li>
                        <li class="net_assets_one">
                            <div>理财资产</div>
                            <div>${currentMember.credit?string("currency")}</div>
                        </li>
                        <li class="net_assets_two size-16">+</li>
                        <li class="net_assets_one">
                            <div>借款负债</div>
                            <div>-${currentMember.debit?string("currency")}</div>
                        </li>
                        <li class="net_assets_two size-16">+</li>
                        <li class="net_assets_one">
                            <div>账户余额</div>
                            <div>${currentMember.balance?string("currency")}</div>
                        </li>
                    </ul>
                </div>
            </div>
            
            [#-- 投资记录 --]
            <div class="account_list">
                <div class="account_title">
                    <div class="pull-left">最近五笔投资</div>
                    <div class="pull-right"> 
                        <span><a href="${base}/account/recovery_plan?state=recovering" class="color-one">待收明细</a></span>
                    </div>
                </div>
                <table class="account_table">
                    <tbody>
                        <tr>
							<td>编号</td>
							<td>协议</td>
							[#--
							<td>类型</td>
							<td>评级</td>
							--]
							<td>投资金额</td>
							<td>期限</td>
							<td>利率</td>
							<td>还款方式</td>
							<td>待收本息</td>
							<td>待付服务费</td>
							<td>期数</td>
							<td>投资时间</td>
							<td>下个回收日</td>
                        </tr>
						[#list recoveringRecoveryPage.cont as recovery]
							[#assign borrowing = recovery.borrowing /]
							<tr>
								<td>${borrowing.id}</td>
								<td>
									<a href="${base}/account/recovery/agreement/${recovery.id}" target="_blank">查看</a>
									/
									<a href="${base}/account/recovery/agreement/${recovery.id}/download" target="_blank">下载</a>
								</td>
								[#--
								<td>${message("InvestmentType." + borrowing.type)}</td>
								<td>${message("CreditRating." + borrowing.creditRating)}</td>
								--]
								<td>${recovery.capital?string("currency")}</td>
								<td>${borrowing.period}个月</td>
								<td>${borrowing.interestRate}%/年</td>
								<td>${message("RepaymentMethod." + borrowing.repaymentMethod)}</td>
								<td>${recovery.surplusCapitalInterest?string("currency")}</td>
								<td>${recovery.surplusFee?string("currency")}</td>
								[#if borrowing.repaymentMethod == "last_period_capital_plus_interest"]
									<td>${recovery.recoveredPeriod}/1</td>
								[#else]
									<td>${recovery.recoveredPeriod}/${borrowing.period}</td>
								[/#if]
								<td>${recovery.createDate?string("yyyy-MM-dd")}</td>
								<td>${(recovery.nextDate?string("yyyy-MM-dd"))!"-"}</td>
							</tr>
						[/#list]
			            [#if recoveringRecoveryPage.cont?size == 0]
		                    <tr>
		                    	<td colspan="11">没有记录！</td>
		                    </tr>
			            [/#if]
                    </tbody>
                </table>
            </div>
            
            [#-- 借款记录 --]
            <div class="account_list">
                <div class="account_title">
                    <div class="pull-left">最近五笔借款</div>
                    <div class="pull-right"> 
                        <span><a href="${base}/account/repayment?state=repaying" class="color-one">待还明细</a></span> 
                    </div>
                </div>
                <table class="account_table">
                    <tbody>
                        <tr>
			                <td>编号</td>
							<td>协议</td>
			                [#--
			                <td>类型</td>
			                --]
			                <td>借款金额</td>
			                <td>期限</td>
			                <td>利率</td>
							<td>还款方式</td>
							<td>待还本息</td>
							<td>待付服务费</td>
							<td>期数</td>
							<td>借款时间</td>
							<td>下个还款日</td>
                        </tr>
                        [#list repayingRepaymentPage.cont as repayment]
							[#assign borrowing = repayment.borrowing /]
		                    <tr>
			                	<td>${borrowing.id}</td>
								<td>
									<a href="${base}/account/repayment/agreement/${repayment.id}" target="_blank">查看</a>
									/
									<a href="${base}/account/repayment/agreement/${repayment.id}/download" target="_blank">下载</a>
								</td>
								[#--
								<td>${message("BorrowingType." + borrowing.type)}</td>
								--]
			                    <td>${repayment.capital?string("currency")}</td>
			                    <td>${borrowing.period}个月</td>
								<td>${borrowing.interestRate}%/年</td>
								<td>${message("RepaymentMethod." + borrowing.repaymentMethod)}</td>
								<td>${repayment.surplusCapitalInterest?string("currency")}</td>
								<td>${repayment.surplusFee?string("currency")}</td>
								[#if borrowing.repaymentMethod == "last_period_capital_plus_interest"]
									<td>${repayment.paidPeriod}/1</td>
								[#else]
									<td>${repayment.paidPeriod}/${borrowing.period}</td>
								[/#if]
								<td>${repayment.createDate?string("yyyy-MM-dd")}</td>
			                    <td>${(repayment.nextDate?string("yyyy-MM-dd"))!"-"}</td>
		                    </tr>
						[/#list]
						[#if repayingRepaymentPage.cont?size == 0]
							<tr>
								<td colspan="11">没有记录！</td>
							</tr>
						[/#if]
                    </tbody>
                </table>
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