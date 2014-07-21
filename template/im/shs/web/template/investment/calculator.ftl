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
[#-- Link 底部 --]
[#include "/template/include/link_bottom.ftl" /]
</head>
<body class="loginpage">
[#-- 页眉 --]
[#include "/template/include/header.ftl" /]
<div class="content">
	
    <div class="rows">
        <div class="jkjsq">
            <h1>收益计算器</h1>
            
            [#-- 投资设置 --]
            <div class="tianbiao">
                <span class="js_bt">投资设置</span>
                <form id="calculatorForm">
	                <table class="tianbiao">
	                    <tr>
	                        <td align="right" width="30%"><span>投资金额：</span></td>
	                        <td width="30%"><input type="text" class="text-one" name="amount" value="10000" />&nbsp;元</td>
	                        <td class="color-one"></td>
	                    </tr>
	                    <tr>
	                        <td align="right"><span>投资期限：</span></td>
	                        <td><input type="text" class="text-one" name="period" value="12" />&nbsp;月</td>
	                        <td class="color-one"></td>
	                    </tr>
	                    <tr>
	                        <td align="right"><span>投资利率：</span></td>
	                        <td><input type="text" class="text-one" name="rate" value="12" />&nbsp;%/年</td>
	                        <td class="color-one"></td>
	                    </tr>
	                    <tr>
	                        <td align="right"><span>回收方式：</span></td>
	                        <td>
	                            <select class="text-one" name="interestMethod">
	                                [#assign repaymentMethods = ["each_period_avg_capital_plus_interest", "each_period_interest_and_last_period_plus_capital", "last_period_capital_plus_interest"] /]
									[#list repaymentMethods as repaymentMethod]
										<option value="${repaymentMethod}">${message("RepaymentMethod." + repaymentMethod)}</option>
									[/#list]
	                            </select>
	                        </td>
	                        <td class="color-one"></td>
	                    </tr>
	                    <tr>
	                        <td align="right"><span>回收管理费率：</span></td>
	                        <td><input type="text" class="text-one" name="feeRate" value="0" />&nbsp;%/期</td>
	                        <td class="color-one"></td>
	                    </tr>
	                    <tr>
	                        <td>&nbsp;</td>
	                        <td colspan="2"><input type="submit" value="开始计算" class="btn-one" /></td>
	                    </tr>
	                </table>
				</form>
            </div>
            
            [#--
            [#-- 服务费情况 --\]
            <div class="js_fwfqk">
                <span class="js_bt">服务费情况</span>
                <table class="js_table">
                    <tr>
                        <th>信用等级</th>
                        <td>AA</td>
                        <td>A</td>
                        <td>B</td>
                        <td>c</td>
                        <td>D</td>
                        <td>E</td>
                        <td>HR</td>
                    </tr>
                    <tr>
                        <th>费率</th>
                        <td>0%</td>
                        <td>1%</td>
                        <td>1.5%</td>
                        <td>2%</td>
                        <td>2.5%</td>
                        <td>3%</td>
                        <td>5%</td>
                    </tr>
                    <tr>
                        <th>实际费用</th>
                        <td>10</td>
                        <td>10</td>
                        <td>10</td>
                        <td>10</td>
                        <td>10</td>
                        <td>10</td>
                        <td>10</td>
                    </tr>
                </table>
            </div>
            --]
            
            [#-- 回收统计 --]
            <div id="statisticsPanel" class="js_jkms" style="display: none;">
                <span class="js_bt">回收统计</span>
                <table class="js_table">
                    <tr>
                        <td>回收总金额</td>
                        <td class="capitalInterests"></td>
                        <td>您将在<label class="months"></label>个月后回收完毕</td>
                    </tr>
                    <tr>
                        <td>月利率</td>
                        <td><label class="monthlyRate"></label>%</td>
                        <td>回收总利息<label class="interests"></label></td>
                    </tr>
                    <tr>
                        <td>回收总管理费</td>
                        <td class="fees"></td>
                        <td>回收总收益<label class="incomes"></label></td>
                    </tr>
                </table>
            </div>
            
            [#-- 回收计划列表 --]
            <div id="planPanel" class="js_bxchsjb" style="display: none;">
                <span class="js_bt">回收计划列表</span>
                <table class="js_table planTable">
                    <tr>
                        <th>期数</th>
                        <th>本息</th>
                        <th>本金</th>
                        <th>利息</th>
                        <th>管理费</th>
                        <th>收益</th>
                        <th>剩余本金</th>
                        <th>剩余利息</th>
                        <th>剩余管理费</th>
                    </tr>
                </table>
            </div>
            
            [#--
            [#-- 回收利息法介绍 --\]
            <div class="js_zs">
                <span class="js_bt">注释</span>
                <p>等额本息，即借款人每月以相等的金额偿还借款本息，也是银行房贷等采用的方法。因计算中存在四舍五入，最后一期还款金额与之前略有不同。</p>
                <p>每月付息，到期还本，即借款人每月偿还固定利息，最后一期偿还全部本金。</p>
                <p>使用利息计算器，能帮您计算每月的本息情况；同时，一份完整的本息偿还时间表，让您能更直观地了解还款本息详情。</p>
            </div>
            --]
            
        </div>
    </div>
    
</div>
[#-- Footer 页脚 --]
[#include "/template/include/footer.ftl" /]
[#-- Script 顶部 --]
[#include "/template/include/script_top.ftl" /]
[#-- validate 验证器 --]
<script type="text/javascript" src="${base}/resources/lib/validate/jquery.validate.min.js?version=${setting.basic.siteVersion}"></script>
<script type="text/javascript" src="${base}/resources/lib/validate/jquery.validate.method.min.js?version=${setting.basic.siteVersion}"></script>
[#-- jQuery Cookie --]
<script type="text/javascript" src="${base}/resources/lib/cookie/jquery.cookie.min.js?version=${setting.basic.siteVersion}"></script>
[#-- 公共 --]
<script type="text/javascript" src="${base}/resources/js/common.min.js?version=${setting.basic.siteVersion}"></script>
[#-- investment.calculator 投资计算器 --]
<script type="text/javascript" src="${base}/resources/js/investment.calculator.min.js?version=${setting.basic.siteVersion}"></script>
<script type="text/javascript" src="${base}/resources/js/YuXinChuangTou.js?version=${setting.basic.siteVersion}"></script>
[#-- Script 底部 --]
[#include "/template/include/script_bottom.ftl" /]
</body>
</html>
[/@compress]