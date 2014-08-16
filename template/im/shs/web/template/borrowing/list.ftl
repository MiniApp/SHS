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
    	<div class="loan">
    	
    		[#-- 信用贷 --]
        	<div class="loan-list pull-left">
            	<div class="title-one">信用贷</div>
                <div class="container">
                	<h1>适用范围</h1>
                    <ul>
                    	<li>申请条件</li>
                        <li>22-55周岁的中国公民</li>
                        <li>企业经营时间满1年</li>
                    </ul>
                    [#--
                    <h1>借款方式</h1>
                    <ul>
                    	<li>借款额度：3,000-500,000</li>
                        <li>借款年利率：10%-24%</li>
                        <li>借款期限：3、6、9、12、18、24个月</li>
                        <li>审核时间：10%-24%</li>
                        <li>还款方式：等额本息，每月还款</li>
                    </ul>
                    --]
                    <div class="loan-btn-one"><a href="${base}/borrowing/product/credit/apply">立即申请</a></div>
                    <div class="loan-details"><a href="${base}/borrowing/product/credit">查看详情</a></div>
                </div>
            </div>
            
    		[#-- 担保贷 --]
            <div class="loan-list pull-left">
            	<div class="title-two">担保贷</div>
                <div class="container">
                	<h1>适用范围</h1>
                    <ul>
                    	<li>申请条件</li>
                        <li>22-55周岁的中国公民</li>
                        <li>企业经营时间满1年平台考察通过的企业由平台指定的第三方担保公司担保</li>
                    </ul>
                    [#--
                    <h1>借款方式</h1>
                    <ul>
                    	<li>借款额度：3,000-500,000</li>
                        <li>借款年利率：10%-24%</li>
                        <li>借款期限：3、6、9、12、18、24个月</li>
                        <li>审核时间：10%-24%</li>
                        <li>还款方式：等额本息，每月还款</li>
                    </ul>
                    --]
                    <div class="loan-btn-one"><a href="${base}/borrowing/product/guarantee/apply">立即申请</a></div>
                    <div class="loan-details"><a href="${base}/borrowing/product/guarantee">查看详情</a></div>
                </div>
            </div>
            
    		[#-- 抵押贷 --]
            <div class="loan-list pull-left">
            	<div class="title-three">抵押贷</div>
                <div class="container">
                	<h1>适用范围</h1>
                    <ul>
                    	<li>申请条件</li>
                        <li>22-55周岁的中国公民</li>
                        <li>企业经营时间满1年平台考察通过的企业由平台指定的第三方担保公司担保</li>
                    </ul>
                    [#--
                    <h1>借款方式</h1>
                    <ul>
                    	<li>借款额度：3,000-500,000</li>
                        <li>借款年利率：10%-24%</li>
                        <li>借款期限：3、6、9、12、18、24个月</li>
                        <li>审核时间：10%-24%</li>
                        <li>还款方式：等额本息，每月还款</li>
                    </ul>
                    --]
                    <div class="loan-btn-one"><a href="${base}/borrowing/product/mortgage/apply">立即申请</a></div>
                    <div class="loan-details"><a href="${base}/borrowing/product/mortgage">查看详情</a></div>
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