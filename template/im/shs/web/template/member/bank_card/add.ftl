[@compress single_line = !systemDevelopment]
[#-- 状态: 资金管理 --]
[#assign state = "capital" /]
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
	    	<div class="title size-14">我的银行卡</div>
	    	
	    	[#-- 添加银行卡 --]
			<div class="drawcash">
				<div class="drawcash-bank-new">
					<form id="bankcardForm" action="${base}/account/bank_card/create" method="post">
						<table class="letter_table" style="margin-top: 0px; line-height: 31px;">
							<tr>
								<td align="right" valign="top">开户名：&nbsp;&nbsp;</td>
								<td style="color: red;">
									${currentMember.name}（请添加相同开户名的银行卡）
									<p class="annotate" style="color: red; line-height: 14px; height: 14px; margin: 5px 0;"></p>
								</td>
							</tr>
							<tr>
								<td align="right" valign="top">开户银行：&nbsp;&nbsp;</td>
								<td>
									<select name="bank">
		                        		<option value="">请选择...</option>
		                        		[#list banks as bank]
		                        			<option value="${bank.id}">${bank}</option>
		                        		[/#list]
		                        	</select>
									<p class="annotate" style="color: red; line-height: 14px; height: 14px; margin: 5px 0;"></p>
								</td>
							</tr>
							<tr>
								<td align="right" valign="top">银行卡号：&nbsp;&nbsp;</td>
								<td>
									<input type="text" name="card" class="text-one" placeholder="请输入卡号" />
									<p class="annotate" style="color: red; line-height: 14px; height: 14px; margin: 5px 0;"></p>
								</td>
							</tr>
							<tr>
								<td align="right" valign="top">开户支行：&nbsp;&nbsp;</td>
								<td>
									<input type="text" name="branchName" class="text-one" placeholder="请输入开户行" />
									<p class="annotate" style="color: red; line-height: 14px; height: 14px; margin: 5px 0;"></p>
								</td>
							</tr>
							<tr>
								<td align="right" valign="top">支行地区：&nbsp;&nbsp;</td>
								<td>
									<input type="hidden" name="locality" class="text-one areaSelect" />
									<p class="annotate" style="color: red; line-height: 14px; height: 14px; margin: 5px 0;"></p>
								</td>
							</tr>
							<tr>
								<td align="right" valign="top">设为主卡：&nbsp;&nbsp;</td>
								<td>
									<input type="checkbox" name="isDefault" value="true" />
									<input type="hidden" name="_isDefault" value="false" />
								</td>
							</tr>
							<tr>
								<td align="right" valign="top">&nbsp;&nbsp;</td>
								<td>&nbsp;</td>
							</tr>
							<tr>
								<td align="right" valign="top">&nbsp;&nbsp;</td>
								<td>
									<span class="pull-left"><input type="submit" value="添加" class="btn-one" /></span>
									<span class="pull-left" style="margin-left:20px;"><input type="button" value="取消" class="btn-one" onclick="location.href='${base}/account/bank_card'" /></span>
								</td>
							</tr>
						</table>
					</form>
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
[#-- 联级下拉选项 --]
<script type="text/javascript" src="${base}/resources/js/jquery.lSelect.js?version=${setting.basic.siteVersion}"></script>
<script type="text/javascript" src="${base}/resources/member/js/bank_card.add.min.js?version=${setting.basic.siteVersion}"></script>
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