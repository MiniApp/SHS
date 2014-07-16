[@compress single_line = !systemDevelopment]
[#-- 状态: 我要借款 --]
[#assign nav = "borrowing"]
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
[#-- meta 标签 --]
[#include "/template/include/meta.ftl" /]
<title>${setting.basic.siteName}-我要借款</title>
[#-- Link 顶部 --]
[#include "/template/include/link_top.ftl" /]
[#-- jQuery Colorbox 弹出层 --]
<link rel="stylesheet" type="text/css" href="${base}/resources/css/colorbox.css?version=${setting.basic.siteVersion}"/>
[#-- Link 底部 --]
[#include "/template/include/link_bottom.ftl" /]
</head>
<body class="loanList">
[#-- 页眉 --]
[#include "/template/include/header.ftl" /]
<div class="content">
    <div class="rows">
    	<div class="loan-detail">
			
			[#-- 申请条件 --]
			<div class="rows">
            	<h1>申请条件</h1>
            	<ul>
                	<li>22-60周岁（20-21岁客户需父母签字）川A/F/M/Z牌照，车辆评估8万以上</li>
                </ul>
            </div>
            
            [#-- 借款方式 --]
            <div class="rows">
            	<h1>借款方式</h1>
            	<ul>
                	<li>借款额度：抵押物评估价的5-7成最高50万</li>
                    <li>借款年利率：12%-18%</li>
                    <li>借款期限：3、6、12、18个月</li>
                    <li>审核时间： 1-3个工作日</li>
                    <li>还款方式： 等额本息，按月还款</li>
                </ul>
            </div>
            
            [#-- 账户管理费 --]
            <div class="rows">
            	<h1>账户管理费</h1>
            	<ul>
                	<li>将按照借款人的借款期限，每月向借款人收取其借款本金的0.3%作为借款管理费。</li>
                    <li>将按照投资人的投资期限，每月向投资人收取其投资利息的10%作为投资服务费。</li>
                </ul>
            </div>
            
            [#-- 必要申请材料 --]
            <div class="rows">
            	<h1>必要申请材料</h1>
            	<ul>
                	<li>身份证</li>
                    <li>个人征信报告（可去当地人民银行打印）</li>
                    <li>经营证明:	</li>
                    <li>a）通过年检且注册满1年的营业执照</li>
                    <li>b）经营场地租赁合同＋90天内的租金发票或水电单据</li>
                    <li>可体现经营情况的近6个月常用银行卡流水（对公账户或个人账户）</li>
                </ul>
            </div>
            
            [#-- 立即申请 --]
            <div class="btn">
            	<div><a href="${base}/borrowing/product/${type}/apply">立即申请</a></div>
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
[#-- jQuery Colorbox 弹出层 --]
<script type="text/javascript" src="${base}/resources/js/jquery.colorbox.js?version=${setting.basic.siteVersion}"></script>
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