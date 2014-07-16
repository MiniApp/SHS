[@compress single_line = !systemDevelopment]
[#--
[#assign investor = (recovery.investor)! /]
[#assign borrowing = (recovery.borrowing)! /]
[#assign borrower = (borrowing.borrower)! /]
[#assign recoveries = (borrowing.recoveries)! /]
[#assign repayment = (recovery.repayment)! /]
[#assign repaymentPlans = (repayment.plans)! /]
--]
[#assign repaymentPlans = (repayment.plans)! /]
[#assign borrowing = (repayment.borrowing)! /]
[#assign borrower = (borrowing.borrower)! /]
[#assign recoveries = (borrowing.recoveries)! /]
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
[#-- meta 标签 --]
[#include "/template/include/meta.ftl" /]
<title>${setting.basic.siteName}-借款协议</title>
<link rel="stylesheet" type="text/css" href="${base}/resources/css/common.css?version=${setting.basic.siteVersion}"/>
<style type="text/css">
body {
	font-family: SimSun;
	font-size: 12px;
	line-height: 24px;
	width: 842px;
	border: 1px solid #ccc;
	padding: 10px;
	margin: 0 auto;
}
</style>
[#-- Link 底部 --]
[#include "/template/include/link_bottom.ftl" /]
</head>
<body>

	<h1 align="center">借款协议</h1>
	[#--
	<div>合同编号：<span>YXCT-${(borrowing.id)!"XXXX"}-${(recovery.id)!"XXXX"}</span></div>
	<div>签约日期：<span>${(recovery.createDate?string("yyyy年MM月dd日"))!"XXXX年XX月XX日"}</span></div>
	<br/>
	<div>协议三方定义：</div>
	<div>投资人：<span>${(investor.username)!"XXX"}</span></div>
	<div>贷款人：<span>${(borrower.username)!"XXX"}</span><label>（${(borrower.idNo)!"XXXXXX XXXXXXXX XXXX"}）</label></div>
	<div>管理方：<span>${setting.basic.siteName}</span>，以下称“管理方”。</div>
	<br/>
	<h3>郑重承诺：</h3>
	<ol>
	    <li>管理方是信钰投资，为借贷双方提供P2P个人借贷信息、信用咨询等交易信息管理服务。</li>
	    <li>贷款人应当将真实有效的信息其提供给管理方，并承诺杜绝发生各种恶意逃避还款义务的情况，包括但不限于借用他人身份信息、双重身份证件等。</li>
	    <li>投资人承诺对本协议涉及的借款具有完全的支配能力，是其自有闲散资金，为其合法所得；并承诺其提供给管理方的信息是真实有效的，承担一切因虚假信息而导致债权不能实现的法律后果。</li>
	    <li>投资人和贷款人同意成立借贷关系，并由管理方提供平台化信息对接服务。各方经协商一致，特签订如下协议，共同遵照履行。</li>
	</ol>
	--]
	<div>合同编号：<span>YXCT-${(borrowing.id)!"XXXX"}-${(repayment.id)!"XXXX"}</span></div>
	<div>签约日期：<span>${(repayment.createDate?string("yyyy年MM月dd日"))!"XXXX年XX月XX日"}</span></div>
	<br/>
	<h3>贷出者：</h3>
	<table width="100%" border="0" cellpadding="0" cellspacing="0" style="font-size: 12px; line-height: 36px;">
	    <tr>
	        <td align="left" style="border: 1px solid #ccc; padding-left: 10px;">出借人</td>
	        <td align="left" style="border-color: #ccc; border-style: solid; padding-left: 10px; border-width: 1px 1px 1px 0px;">出借金额（人民币）</td>
	        <td align="left" style="border-color: #ccc; border-style: solid; padding-left: 10px; border-width: 1px 1px 1px 0px;">借款期限（月）</td>
	        <td align="left" style="border-color: #ccc; border-style: solid; padding-left: 10px; border-width: 1px 1px 1px 0px;">借款利率（年利率）</td>
	        <td align="left" style="border-color: #ccc; border-style: solid; padding-left: 10px; border-width: 1px 1px 1px 0px;">还款开始日期</td>
	        <td align="left" style="border-color: #ccc; border-style: solid; padding-left: 10px; border-width: 1px 1px 1px 0px;">还款到期日期</td>
	        <td align="left" style="border-color: #ccc; border-style: solid; padding-left: 10px; border-width: 1px 1px 1px 0px;">总还款本息（人民币）</td>
	    </tr>
	    [#if recoveries != null && recoveries?size gt 0]
	        [#list recoveries as recovery]
	        	<tr>
	            	<td align="left" style="border-color: #ccc; border-style: solid; padding-left: 10px; border-width: 0px 1px 1px;">${recovery.investor.username}</td>
	                <td align="left" style="border-color: #ccc; border-style: solid; padding-left: 10px; border-width: 0 1px 1px 0;">${recovery.capital?string("currency")}</td>
	                <td align="left" style="border-color: #ccc; border-style: solid; padding-left: 10px; border-width: 0 1px 1px 0;">${borrowing.period}个月</td>
	                <td align="left" style="border-color: #ccc; border-style: solid; padding-left: 10px; border-width: 0 1px 1px 0;">${borrowing.interestRate}%/年</td>
	                <td align="left" style="border-color: #ccc; border-style: solid; padding-left: 10px; border-width: 0 1px 1px 0;">${recovery.createDate?string("yyyy年MM月dd日")}</td>
	                <td align="left" style="border-color: #ccc; border-style: solid; padding-left: 10px; border-width: 0 1px 1px 0;">${recovery.endDate?string("yyyy年MM月dd日")}</td>
	                <td align="left" style="border-color: #ccc; border-style: solid; padding-left: 10px; border-width: 0 1px 1px 0;">${recovery.capitalInterest?string("currency")}</td>
	            </tr>
	        [/#list]
	    [#else]
        	<tr>
            	<td align="left" style="border-color: #ccc; border-style: solid; padding-left: 10px; border-width: 0px 1px 1px;">XXXX</td>
                <td align="left" style="border-color: #ccc; border-style: solid; padding-left: 10px; border-width: 0 1px 1px 0;">￥XXXX.XX</td>
                <td align="left" style="border-color: #ccc; border-style: solid; padding-left: 10px; border-width: 0 1px 1px 0;">XX个月</td>
                <td align="left" style="border-color: #ccc; border-style: solid; padding-left: 10px; border-width: 0 1px 1px 0;">XX.XX%/年</td>
                <td align="left" style="border-color: #ccc; border-style: solid; padding-left: 10px; border-width: 0 1px 1px 0;">XXXX年XX月XX日</td>
                <td align="left" style="border-color: #ccc; border-style: solid; padding-left: 10px; border-width: 0 1px 1px 0;">XXXX年XX月XX日</td>
                <td align="left" style="border-color: #ccc; border-style: solid; padding-left: 10px; border-width: 0 1px 1px 0;">￥XXXX.XX</td>
            </tr>
	    [/#if]
	</table>
	<p>贷款人 ：<span>${(borrower.username)!"XXX"}</span><label>（${(borrower.idNo)!"XXXXXX XXXXXXXX XXXX"}）</label></p>
	<p>管理方：<span>${setting.basic.siteName}</span></p>
	<br/>
	<h3>三方约定：由管理方负责将投资人的款项划转至借款方开立的账户。</h3>
	<h4>第一条 借款基本信息</h4>
	<table width="100%" border="0" cellpadding="0" cellspacing="0" style="font-size: 12px; line-height: 36px;">
	    <tr>
	        <td align="right" width="150px" style="border: 1px solid #ccc; padding-right: 10px;">借款用途：</td>
	        <td align="left" style="border-color: #ccc; border-style: solid; padding-left: 10px; border-width: 1px 1px 1px 0px;"><label>${(borrowing.purpose)!"XXXX"}</label></td>
	    </tr>
	    <tr>
	        <td align="right" style="border-color: #ccc; border-style: solid; padding-right: 10px; border-width: 0px 1px 1px;">借款金额（人民币）：</td>
	        <td align="left" style="border-color: #ccc; border-style: solid; padding-left: 10px; border-width: 0 1px 1px 0;">${(repayment.capital?string("currency"))!"￥XXXX.XX"}</td>
	    </tr>
	    <tr>
	        <td align="right" style="border-color: #ccc; border-style: solid; padding-right: 10px; border-width: 0px 1px 1px;">还款本息（人民币）：</td>
	        <td align="left" style="border-color: #ccc; border-style: solid; padding-left: 10px; border-width: 0 1px 1px 0;">${(repayment.capitalInterest?string("currency"))!"￥XXXX.XX"}</td>
	    </tr>
	    <tr>
	        <td align="right" style="border-color: #ccc; border-style: solid; padding-right: 10px; border-width: 0px 1px 1px;">还款期数（月）：</td>
	        <td align="left" style="border-color: #ccc; border-style: solid; padding-left: 10px; border-width: 0 1px 1px 0;">${(repayment.period)!"XX"}个月</td>
	    </tr>
	    <tr>
	        <td align="right" style="border-color: #ccc; border-style: solid; padding-right: 10px; border-width: 0px 1px 1px;">借款利率（年利率）：</td>
	        <td align="left" style="border-color: #ccc; border-style: solid; padding-left: 10px; border-width: 0 1px 1px 0;">${(borrowing.interestRate)!"XX.XX"}%/年</td>
	    </tr>
	    <tr>
	        <td align="right" style="border-color: #ccc; border-style: solid; padding-right: 10px; border-width: 0px 1px 1px;">还款方式：</td>
	        <td align="left" style="border-color: #ccc; border-style: solid; padding-left: 10px; border-width: 0 1px 1px 0;">
	        	[#if borrowing != null]
	        		${message("RepaymentMethod." + borrowing.repaymentMethod)}
	        	[#else]
	        		XXXX
	        	[/#if]
	        </td>
	    </tr>
	    <tr>
	        <td align="right" style="border-color: #ccc; border-style: solid; padding-right: 10px; border-width: 0px 1px 1px;">借款描述：</td>
	        <td align="left" style="border-color: #ccc; border-style: solid; padding-left: 10px; border-width: 0 1px 1px 0;">${(borrowing.description)!"XXXX"}</td>
	    </tr>
	    <tr>
	        <td align="right" style="border-color: #ccc; border-style: solid; padding-right: 10px; border-width: 0px 1px 1px;">还款日：</td>
	        <td align="left" style="border-color: #ccc; border-style: solid; padding-left: 10px; border-width: 0 1px 1px 0;">每月${(repayment.createDate?string("dd"))!"XX"}日（24：00前，节假日不顺延）</td>
	    </tr>
	    <tr>
	        <td align="right" style="border-color: #ccc; border-style: solid; padding-right: 10px; border-width: 0px 1px 1px;">还款日期：</td>
	        <td align="left" style="border-color: #ccc; border-style: solid; padding-left: 10px; border-width: 0 1px 1px 0;">${(repayment.createDate?string("yyyy年MM月dd日"))!"XXXX年XX月XX日"}至${(repayment.endDate?string("yyyy年MM月dd日"))!"XXXX年XX月XX日"}止</td>
	    </tr>
	</table>
	<br/>
	<h4>分期还款列表</h4>
	<table width="100%" border="0" cellpadding="0" cellspacing="0" style="font-size: 12px; line-height: 36px;">
	    <tr>
	        <td align="right" style="border: 1px solid #ccc; padding-right: 10px;">还款期数</td>
	        <td align="left" style="border-color: #ccc; border-style: solid; padding-left: 10px; border-width: 1px 1px 1px 0px;">还款利率（年利率）</td>
	        <td align="left" style="border-color: #ccc; border-style: solid; padding-left: 10px; border-width: 1px 1px 1px 0px;">还款时间</td>
	        <td align="left" style="border-color: #ccc; border-style: solid; padding-left: 10px; border-width: 1px 1px 1px 0px;">还款本息（人民币）</td>
	        <td align="left" style="border-color: #ccc; border-style: solid; padding-left: 10px; border-width: 1px 1px 1px 0px;">还款本金（人民币）</td>
	        <td align="left" style="border-color: #ccc; border-style: solid; padding-left: 10px; border-width: 1px 1px 1px 0px;">还款利息（人民币）</td>
	    </tr>
	    [#if recoveries != null && recoveries?size gt 0]
	        [#list repaymentPlans as repaymentPlan]
	        	<tr>
	            	<td align="right" style="border-color: #ccc; border-style: solid; padding-right: 10px; border-width: 0px 1px 1px;">第${repaymentPlan.period}期/共${repayment.period}期</td>
	                <td align="left" style="border-color: #ccc; border-style: solid; padding-left: 10px; border-width: 0 1px 1px 0;">${borrowing.interestRate}%/年</td>
	                <td align="left" style="border-color: #ccc; border-style: solid; padding-left: 10px; border-width: 0 1px 1px 0;">${repaymentPlan.date?string("yyyy年MM月dd日")}</td>
	                <td align="left" style="border-color: #ccc; border-style: solid; padding-left: 10px; border-width: 0 1px 1px 0;">${repaymentPlan.capitalInterest?string("currency")}</td>
	                <td align="left" style="border-color: #ccc; border-style: solid; padding-left: 10px; border-width: 0 1px 1px 0;">${repaymentPlan.capital?string("currency")}</td>
	                <td align="left" style="border-color: #ccc; border-style: solid; padding-left: 10px; border-width: 0 1px 1px 0;">${repaymentPlan.interest?string("currency")}</td>
	            </tr>
	        [/#list]
        [#else]
		    <tr>
		        <td align="right" style="border-color: #ccc; border-style: solid; padding-right: 10px; border-width: 0px 1px 1px;">第XX期/共XX期</td>
		        <td align="left" style="border-color: #ccc; border-style: solid; padding-left: 10px; border-width: 0 1px 1px 0;">XX.XX%/年</td>
		        <td align="left" style="border-color: #ccc; border-style: solid; padding-left: 10px; border-width: 0 1px 1px 0;">XXXX-XX-XX</td>
		        <td align="left" style="border-color: #ccc; border-style: solid; padding-left: 10px; border-width: 0 1px 1px 0;">￥XXXX.XX</td>
		        <td align="left" style="border-color: #ccc; border-style: solid; padding-left: 10px; border-width: 0 1px 1px 0;">￥XXXX.XX</td>
		        <td align="left" style="border-color: #ccc; border-style: solid; padding-left: 10px; border-width: 0 1px 1px 0;">￥XXXX.XX</td>
		    </tr>
        [/#if]
	</table>
	<br/>
	<h4>第二条 各方权利和义务</h4>
	<br/>
	<h4>投资人的权利和义务 ：</h4>
	<ol>
	    <li>投资人同意管理方在本合同第一条项下借款审核完毕后将借款划拨给贷款人。 </li>
	    <li>投资人享有其所出借款项所带来的利息收益。</li>
	    <li>如贷款人违约，贷款人同意管理方将已获得的贷款人的信息告知投资人。 </li>
	    <li>投资人可以根据自己的意愿进行本协议下其对贷款人债权的转让。在投资人的债权转让成功后，贷款人需对债权受让人继续履行本协议下各项义务，债权转让通知以电子邮件或手机短信方式送达发布邮件或者短信的第二天视为送达，贷款人不得拒绝履行还款义务。 （详细阅读“债权转让及受让协议”）</li>
	    <li>投资人应主动缴纳由利息所得带来的可能的税费。</li>
	    <li>如贷款人还款不足约定本金、利息、逾期罚息、违约金的，各方同意各自按照其借出款项比例收取还款。</li>
	    <li>投资人可授权管理方代为追缴贷款人逾期未还款项。贷款人权利和义务 。</li>
	</ol>
	<br/>
	<h4>贷款人权利和义务 。</h4>
	<ol>
	    <li>贷款人必须按期足额向投资人支付本金和利息。</li>
	    <li>贷款人必须足额向管理方支付平台成交服务费用。 </li>
	    <li>贷款人承诺所借款项不用于任何违法用途。 </li>
	    <li>贷款人应确保其提供的信息和联系方式的真实性，不得提供虚假信息或隐瞒重要事实。 </li>
	    <li>贷款人有权了解其在管理方的信用评审进度及结果。 </li>
	    <li>贷款人不得将本协议项下的任何权利义务转让给任何其他方。</li>
	</ol>
	<br/>
	<h4>管理方的权利和义务：</h4>
	<ol>
	    <li>投资人和贷款人同意管理方有权代投资人每期收取投资人出借款项所对应的贷款人每期偿还的本息，代收后按照投资人的要求进行处置。</li>
	    <li>投资人同意委托管理方在合同第一条项下借款审核完毕后将此笔借款直接划付至贷款人账户。</li>
	    <li>投资人和贷款人同意管理方有权代投资人在有必要时对贷款人进行催收工作，包括但不限于电话通知、发律师函、登门催讨、对贷款人提起诉讼等。</li>
	    <li>管理方有权向贷款人收取双方约定的平台成交服务费，并在有必要时对贷款人进行催收工作，包括但不限于电话通知、发律师函、登门催讨、对贷款人提起诉讼等。 </li>
	    <li>管理方作为投资人和贷款人双方的居间人，促成双方交易，投资人和贷款人双方行为所产生的法律后果由相应各方承担。如因贷款人或投资人或其他方（包括但不限于技术问题）造成的延误或错误，管理方不承担任何责任。 </li>
	    <li>管理方应对投资人和贷款人的信息及本协议内容保密；如任何一方违约，或因相关权力部门要求（包括但不限于法院、仲裁机构、金融监管机构等），管理方有权披露。</li>
	</ol>
	<br/>
	<h4>第三条 平台成交服务费</h4>
	<ol>
	    <li>在本协议中“平台成交服务费”是指因管理方为贷款人提供信用咨询、评估、还款提醒、账户管理、还款特殊情况沟通等系列信用相关服务而由贷款人支付给管理方的报酬。 </li>
	    <li>贷款人和管理方协商一致可以调整平台成交服务费，无需经过投资人同意。 </li>
	</ol>
	<br/>
	<h4>第四条 违约责任 </h4>
	<ol>
	    <li>合同各方均应严格履行合同义务，非经各方协商一致或依照本协议约定，任何一方不得解除本协议。</li>
	    <li>任何一方违约，违约方应承担因违约使得其他各方产生的费用和损失，包括但不限于调查费、律师代理费、诉讼费、保全费、公证费、差旅费等，应由违约方承担。如违约方为贷款人的，投资人有权立即解除本协议，并要求贷款人立即偿还未偿还的本金、利息、逾期罚息、违约金等。如本协议提前解除时，贷款人在网站的账户里有任何余款，管理方有权按照本协议第四条第3项的清偿顺序将贷款人的余款用于清偿，并要求贷款人支付因此产生的相关费用。 </li>
	    <li>贷款人的每期还款均应按照如下顺序清偿：
	        <ul>
	            <li>逾期罚息以及违约金；</li>
	            <li>平台逾期催收费；</li>
	            <li>拖欠的利息；</li>
	            <li>拖欠的本金；</li>
	            <li>正常的利息；</li>
	            <li>正常的本金；</li>
	            <li>根据本协议产生的其他全部费用；</li>
	        </ul>
	    </li>
	    <li>贷款人应严格履行还款义务，如贷款人违约，则应按照下述条款向投资人支付违约金。违约金= 未付本金 * 0.003 *逾期天数</li>
	    <li>贷款人应严格履行还款义务，如贷款人逾期还款超过3天，管理方将收取平台逾期催收费作为网站电话提醒和催收服务的费用。平台逾期催收费最低50元，最高为借款本金的1%。</li>
	    <li>如果贷款人逾期支付任何一期还款超过60天，本协议项下的全部借款本息提前到期，贷款人应立即清偿本协议下尚未偿付的全部本金、利息、逾期罚息、违约金及根据本协议产生的其他全部费用。 </li>
	    <li>如果贷款人逾期支付任何一期还款超过25天，平台方有权将贷款人的“逾期记录”记入平台方逾期黑名单系统，平台方不承担任何法律责任。 </li>
	    <li>如果贷款人逾期支付任何一期还款超过30天，平台方有权将贷款人违约失信的相关信息在媒体披露，平台方不承担任何责任。 </li>
	    <li>在贷款人还清全部本金、利息、逾期罚息、违约金之前，逾期罚息、违约金的计算不停止。</li>
	</ol>
	<br/>
	<h4>第五条 提前还款 </h4>
	<ol>
	    <li>贷款人可在借款期间任何时候提前偿还剩余借款。 </li>
	    <li>提前清偿全部剩余借款 。贷款人提前清偿全部剩余借款时，应向投资人支付当期应还本息，剩余本金及提前还款补偿金（补偿金额为加收1个月利息）。</li>
	    <li>提前偿还部分借款
	        <ul>
	            <li>贷款人提前偿还部分借款，对贷款的总期限及月偿还本息数额不产生影响。</li>
	            <li>贷款人提前偿还部分借款，仍应向投资人支付全部借款利息。 </li>
	        </ul>
	    </li>
	    <li>任何形式的提前还款不影响平台方向贷款人收取在本协议第三条中说明的借款平台成交服务费。</li>
	</ol>
	<br/>
	<h4>第六条 法律及争议解决 </h4>
	<label>本协议的签订、履行、终止、解释均适用中华人民共和国法律，并由四川信钰投资咨询有限公司所在地人民法院法院管辖。</label>
	<br/>
	<h4>第七条 附则 </h4>
	<ol>
	    <li>本协议采用电子文本形式制成，各方均认可该形式的法律效力。 </li>
	    <li>本协议本合同第一条项下借款提交审核之日生效。 </li>
	    <li>本协议签订之日起至借款全部清偿之日止，贷款人或投资人有义务在下列信息变更三日内提供更新后的信息给平台方：本人、本人的家庭联系人及紧急联系人、工作单位、居住地址、住所电话、手机号码、电子邮箱、银行账户的变更。若因任何一方不及时提供上述变更信息而带来的损失或额外费用应由该方承担。 </li>
	    <li>如果本协议中的任何一条或多条因违反法律法规而被认定无效，该无效条款并不影响本协议其他条款的效力。</li>
	</ol>
	<br/>
	<h4>特别提示：鉴于平台方是为借贷双方提供对接服务，促成双方建立借贷关系的一方，当平台方进行风控审核与财务审核时，发现风控审核与财务审核不符的，为了维护借贷双方的权益，保护借贷双方的资金安全，平台方有权取消该次交易，借贷双方扣缴的费用按照流标处理返还其各自账户，因借贷交易生成的列表予以删除。但借贷双方被第三方收取的费用（包含但不限于身份认证、学历认证、公证等费用）不予返还。附加条款：${setting.basic.siteName}作为平台管理方，为借贷双方提供金融对接管理服务。如贷款人发生逾期，投资人可通过【债权转让功能】将债权进行转让，由${setting.basic.siteName}对债权进行收购，支付投资人逾期利息和剩余本金。${setting.basic.siteName}会在债权转让之日起10日内办理完毕。但以下情况除外：在债权逾期的第20天投资人对债权不进行转让的，视为投资人放弃债权转让的权利，${setting.basic.siteName}配合投资人向贷款人进行诉讼清偿等工作，逾期债权能否收回的风险由投资人自行承担。</h4>
	[#--
	<br/>
	<h4>（以下无正文）</h4>
	<p>贷出者：<span>${(investor.username)!"XXX"}</span></p>
	<p>借入者：<span>${(borrower.username)!"XXX"}</span><label>（${(borrower.idNo)!"XXXXXX XXXXXXXX XXXX"}）</label></p>
	<p>管理方：<span>${setting.basic.siteName}</span></p>
	--]
	
[#-- Script 顶部 --]
[#include "/template/include/script_top.ftl" /]
<script type="text/javascript" src="${base}/resources/js/YuXinChuangTou.js?version=${setting.basic.siteVersion}"></script>
[#-- Script 底部 --]
[#include "/template/include/script_bottom.ftl" /]
</body>
</html>
[/@compress]