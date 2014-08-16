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
	
    [#-- 借款流程 --]
    <div class="rows">
    	<div class="flow">
        	<ul>
            	<li>
                	<a href="#" class="active">
                    	<div class="number">1</div>
                    	<div class="name">提交申请</div>
                    </a>
                </li>
                <li>
                	<a href="#">
                    	<div class="number">2</div>
                    	<div class="name">平台审核</div>
                    </a>
                </li>
                <li>
                	<a href="#">
                    	<div class="number">3</div>
                    	<div class="name">平台考察与办理手续</div>
                    </a>
                </li>
                <li>
                	<a href="#">
                    	<div class="number">4</div>
                    	<div class="name">发布借款标</div>
                    </a>
                </li>
                <li>
                	<a href="#">
                    	<div class="number">5</div>
                    	<div class="name">借款成功</div>
                    </a>
                </li>
            </ul>
        </div>
    </div>
    
    [#-- 借款申请表单 --]
    <div class="rows">
    	<div class="application-form">
            <div class="form">
                <form id="borrowingFrom" action="${base}/borrowing/product/${type}/apply" method="post">
                    <ul>
                        <li>
                        	<div class="form-title">借款金额</div>
                            <div class="form-content">
                            	<input type="text" name="amount" class="text-one"/>
                                <span class="color-one">元</span>
                                <p class="form-remark"></p>
                            </div>
                        </li>
                        <li>
                        	<div class="form-title">借款期限</div>
                            <div class="form-content">
                            	<input type="text" name="period" class="text-one"/>
                                <span class="color-one">月</span>
                                <p class="form-remark"></p>
                            </div>
                        </li>
                        <li>
                        	<div class="form-title">借款利率</div>
                            <div class="form-content">
                            	<input type="text" name="interestRate" class="text-one pull-left" />
                                <span class="color-one pull-left" style="margin:8px 5px 0 5px;">%</span>
                                <p class="form-remark"></p>
                            </div>
                        </li>
                        <li>
                        	<div class="form-title">借款描述</div>
                            <div class="form-content">
                            	<textarea class="textarea-one" name="description"></textarea>
                                <p class="form-remark"></p>
                            </div>
                        </li>
                        <li>
                        	<div class="form-title">&nbsp;</div>
                            <div class="form-content size-14">
                            	<label><input type="checkbox" name="agreement" value="true" checked="checked" />我已阅读并同意《<a href="${base}/borrowing/product/${type}/agreement" target="_blank" class="color-one">借款协议</a>》</label>
                            	<p class="form-remark"></p>
                            </div>
                        </li>
                         <li>
                        	<div class="form-title">&nbsp;</div>
                            <div class="form-content"><input type="submit" value="提交申请" class="btn-three" /></div>
                        </li>
                    </ul>
                </form>
            </div>
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
[#-- jQuery Colorbox 弹出层 --]
<script type="text/javascript" src="${base}/resources/js/jquery.colorbox.js?version=${setting.basic.siteVersion}"></script>
[#-- borrowing.apply 借款申请 --]
<script type="text/javascript" src="${base}/resources/js/borrowing.apply.min.js?version=${setting.basic.siteVersion}"></script>
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