[@compress single_line = !systemDevelopment]
[#-- 状态: 互动管理 --]
[#assign state = "comm" /]
<!doctype html>
<!--[if lt IE 7 ]><html class="ie ie6" lang="en"> <![endif]-->
<!--[if IE 7 ]><html class="ie ie7" lang="en"> <![endif]-->
<!--[if IE 8 ]><html class="ie ie8" lang="en"> <![endif]-->
<!--[if (gte IE 9)|!(IE)]><!-->
<html class="not-ie" lang="en">
<!--<![endif]-->
<head>
[#-- meta 标签 --]
[#include "/template/include/meta.ftl" /]
<title>${setting.basic.siteName}-会员中心</title>
[#-- Link 顶部 --]
[#include "/template/include/link_top.ftl" /]
<link rel="stylesheet" type="text/css" href="${base}/resources/css/AccountCenter.css?version=${setting.siteVersion}"/>
[#-- Link 底部 --]
[#include "/template/include/link_bottom.ftl" /]
</head>

<body>

<!--外框-->
<div class="ACtHoPage_L0Le">
  <div class="ACtHoPage_L0Les">
  
    [#-- 页眉 --]
    [#include "/template/include/header.ftl" /]
    
    <!--中-->
    <div class="ACtHoPage_MOLe">
      <div class="ACtHoPage_MOLes">
      
      	[#-- 边导航 --]
      	[#include "/template/member/include/sidebar.ftl" /]
      	
      	<!--中 > 右边-->
        <div class="ACtHoPage_MedCtsRight">
          <div class="ACtHoPage_MedCtsRhead">
            <p>站内消息</p>
          </div>
          <div class="ThNoMag_K">
            <div class="ThNoMag_HeadK" > 
            	<a href="javascript:void(0);"><div class="ThNoMag_HeadKa">通知</div></a> 
               	<a href="${base}/account/priv_lette"><div class="ThNoMag_HeadKb">私信</div></a>
               	[#-- 
                <a href="${base}/account/notifysetting"><div class="ThNoMag_HeadKc">设置通知提醒</div></a>
                --] 
            </div>
            <div class="ThNoMag_Detaila">
            	[#list page.cont as notice]
            		<div class="ThNoMag_manag_div"><img src="${base}/resources/images/ThNoMag_A.png" />
		                <table class="ThNoMag_manag_a">
		                  <tr class="ThNoMag_manag_b">
		                    <td><a href="${base}/account/notice/${notice.id}/detail">${notice.title}</a></td>
		                  </tr>
		                  <tr class="ThNoMag_manag_c" >
		                    <td><p class="ThNoMag_manag_e">${notice.cont}</p></td>
		                    <td>${notice.createDate}</td>
		                  </tr>
		                </table>
		              </div>
            	[/#list]
                [#if page.cont?size == 0]
                    <div>没有记录！</div>
                [/#if]
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
	
  </div>
</div>
[#-- Script 顶部 --]
[#include "/template/include/script_top.ftl" /]
<script type="text/javascript" src="${base}/resources/js/slider.js?version=${setting.siteVersion}"></script> 
<script type="text/javascript" src="${base}/resources/js/BorrowFunds.js?version=${setting.siteVersion}"></script> 
[#-- Script 底部 --]
[#include "/template/include/script_bottom.ftl" /]
[@flash_message; flashMessage]
	[#if flashMessage??]
		<script type="text/javascript">
			alert("${flashMessage}");
		</script>
	[/#if]
[/@flash_message] 
</body>
</html>
[/@compress]