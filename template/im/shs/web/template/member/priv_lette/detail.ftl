[@compress single_line = !systemDevelopment]
[#-- 状态: 消息管理 --]
[#assign state = "comm" /]
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
        	<div class="title size-14">我的私信</div>

			[#-- 私信会话详情 --]            
            <div class="invest">
                <div class="invest-title">
                	<ul>
                        <li><a href="${base}/account/priv_lette">私信列表</a></li>
                        <li><a href="javascript:void(0);" class="active">私信详情</a></li>
                    </ul>
                </div>
                <div id="table-two">
                    <div class="haveAcon_div_one">
                        <p><a href="${base}/account/priv_lette">返回所有私信</a> > 我和<span>[#if dialog.verifySender(currentMember.id)]${dialog.receiver}[#elseif dialog.verifyReceiver(currentMember.id)]${dialog.sender}[/#if]</span>的对话</p>
                        <form id="privLetteForm" action="${base}/account/priv_lette/send" method="post">
                			<input type="hidden" name="receiver" value="[#if dialog.verifySender(currentMember.id)]${dialog.receiver}[#elseif dialog.verifyReceiver(currentMember.id)]${dialog.sender}[/#if]" />
	                        <div class="haveAcon_me_onE">
	                            <div class="sxEditor"><textarea name="cont"></textarea></div>
	                            <div class="sxArrow"></div>
	                            <div class="rightPhoto"><img src="${base}/resources/images/default-avatar.png?version=${setting.basic.siteVersion}" width="60" height="60"></div>
	                            <div id="sendSXBtBox" class="clearfix margin_top pull-left">
	                            	<p class="annotate" style="color: red; line-height: 14px; height: 14px; margin: 0px 0px 5px;"></p>
	                                <div class="pull-right">
	                                    <input type="submit" class="ui-button ui-button-small ui-button-green" value="发送" />
	                                </div>
	                            </div>
	                        </div>
                		</form>
                        [#list page.cont as privLette]
							[#if privLette.verifySender(currentMember.id)]
								<div class=" haveAcon_me_onE rightList">
		                            <div class="conTxt_one">
		                                <div class="sxTextContent_one">${privLette.cont}</div>
		                                <p class="date">${privLette.createDate}</p>
		                            </div>
		                            <div class="rightArrow_one" ></div>
		                            <div class="rightPhoto"><img src="${base}/resources/images/default-avatar.png?version=${setting.basic.siteVersion}" width="60" height="60"> </div>
		                        </div>
	                		[#elseif privLette.verifyReceiver(currentMember.id)]
		                		<div class="sxlist">
		                            <div class="leftList_a clearfix">
		                                <div class="leftPhoto"> <img src="${base}/resources/images/default-avatar.png?version=${setting.basic.siteVersion}" width="60" height="60"> </div>
		                                <div class="conTxt">
		                                    <div class="sxTextContent">${privLette.cont}</div>
		                                    <p class="date">${privLette.createDate}</p>
		                                </div>
		                                <div class="leftArrow"></div>
		                            </div>
		                        </div>
		                	[/#if]
		                [/#list]
                    </div>
                </div>
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
<script type="text/javascript" src="${base}/resources/member/js/priv_lette.detail.min.js?version=${setting.basic.siteVersion}"></script>
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