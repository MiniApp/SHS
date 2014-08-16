[@compress single_line = !systemDevelopment]
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
<title>${setting.basic.siteName}-收益计算</title>
[#-- Link 顶部 --]
[#include "/template/include/link_top.ftl" /]
<link rel="stylesheet" type="text/css" href="${base}/resources/css/AccountCenter.css?version=${setting.basic.siteVersion}"/>
[#-- Link 底部 --]
[#include "/template/include/link_bottom.ftl" /]
</head>

<body>

<!--外框-->
<div class="BorFuds_LordFrame">
  <div class="BorFuds_LordFrames"> 
  
    [#-- 页眉 --]
    [#include "/template/include/header.ftl" /]
    
    <!--中-->
    <div class="ACtHoPage_MOLe">
      <div class="ACtHoPage_MOLes">
      	<div class="js_bg">
       		 <div class="jkjsq">
                <h1>收益计算器</h1>
                <!--计算填表-->
                <div class="tianbiao">
	                    <table class="tianbiao">
	                        <tr>
	                            <td align="right" width="30%"><span>出借金额：</span></td>
	                            <td width="28%"><input type="text" name="amount" id="amount" class="js_ipt_text" value="${amount}"  />&nbsp;元</td>
	                            <td class="asterisk"></td>
	                        </tr>
	                        <tr>
	                            <td align="right"><span>年利率为：</span></td>
	                            <td><input type="text" name="rate" id="rate" class="js_ipt_text" value="${rate}" />&nbsp;%</td>
	                            <td class="asterisk"></td>
	                        </tr>
	                        <tr>
	                            <td align="right"><span>借款期限：</span></td>
	                            <td>
	                            	<input type="text" name="term" id="term" class="js_ipt_text" value="${term}" required min="1" max="24"/>&nbsp;月
	                            </td>
	                            <td class="asterisk"></td>
	                        </tr>
	                        <tr>
	                            <td align="right"><span>还款方式：</span></td>
	                            <td>
	                                <select class="text-one" name="type" id="type">
		                                <option value="1" [#if type="1"]selected="selected"[/#if]>每期等额本息</option>
		                                <option value="2" [#if type="2"]selected="selected"[/#if]>每期付息到期还本</option>
		                                <option value="3" [#if type="3"]selected="selected"[/#if]>当前付息、每期付息、到期还本</option>
		                                <option value="4" [#if type="4"]selected="selected"[/#if]>到期还本付息</option>
                            		</select>
	                            </td>
	                            <td class="asterisk"></td>
	                        </tr>
	                        <tr>
	                            <td>&nbsp;</td>
	                            <td colspan="2"><input type="submit" value="开始计算" class="a_btn_one" onclick="count()" /></td>
	                        </tr>
	                    </table>
                </div>
                <!--本息偿还时间表-->
                <div class="js_bxchsjb">
                    <span class="js_bt">本息偿还时间表</span>
                    <table class="js_table" >
                       <tr>							
                        <th>月份</th>	
                        <th>月还本息</th>
                        <th>月还本金</th>
                        <th>月还利息</th>	
                        <th>待收本金</th>
                		<th>收款时间</th>
                    </tr>
                    <tbody id="tb"></tbody>
                    </table>
                </div>
                <div class="js_zs">
                    <span class="js_bt">注释</span>
                    <p>等额本息，即借款人每月以相等的金额偿还借款本息，也是银行房贷等采用的方法。因计算中存在四舍五入，最后一期还款金额与之前略有不同。</p>
                    <p>每月付息，到期还本，即借款人每月偿还固定利息，最后一期偿还全部本金。</p>
                    <p>使用利息计算器，能帮您计算每月的本息情况；同时，一份完整的本息偿还时间表，让您能更直观地了解还款本息详情。</p>
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
<script type="text/javascript" src="${base}/resources/js/stylejqa.js?version=${setting.basic.siteVersion}"></script>
[@flash_message; flashMessage]
	[#if flashMessage??]
    	<script type="text/javascript">
    		alert("${flashMessage}");
		</script>
	[/#if]
[/@flash_message]

<script type="text/javascript">



    function count(){
        $("#tb").html(""); //清空表格内容，以便下次计算
        var money = $('#amount').val();  //总金额
        var rate = $('#rate').val();
        var lilv = rate/12/100;            //月利率
        var time = $('#term').val();    //总月数
        var type = $('#type').val();    //还款方式

        var myDate = new Date();        //时间对象
        var myyear = myDate.getFullYear(); //获取当前年份
        var mymonth = (myDate.getMonth())*1+1; //获取当前月份
        var myday = myDate.getDate(); //获取当前日


        function denge(){       //等额本息
            var yueshoubenxi = (money)*((lilv*Math.pow((1+lilv),(time)))/((Math.pow((1+lilv),(time)))-1));  //月收本息
            var zongshoukuanshu = (yueshoubenxi*time);   //总收款数
            var daishoubenxi = zongshoukuanshu;  //待收本息
            var meiyuelixi; //每月利息
            var yueshoubenjin;  //月收本金
            var shengyubenjin = money;  //剩余本金
            var daishoubenjin = money;  //待收本金
            var html;            //用于生成表格
            var mytime=1;    //月份计数器1
            var a=1;        //计数器a
            var b = 1;      //计数器b
            var c = 1;      //计数器c
            for(var i=1;i<=time;i++){

                daishoubenxi = daishoubenxi -   yueshoubenxi;
                meiyuelixi = (shengyubenjin * lilv);
                yueshoubenjin = (yueshoubenxi - meiyuelixi);
                daishoubenjin = daishoubenjin-yueshoubenjin;

                var sksj;   //收款时间
                var mytime2 = (mymonth*1)+(mytime*1);    //月份计数器2
                mytime++;
                var xsyuefen;       //用于显示的月份
                var d;
                if(mytime2<=12){
                    xsyuefen = mytime2;
                    sksj = (myyear.toString()+"-"+xsyuefen.toString()+"-"+myday.toString())
                }else{
                    xsyuefen = a++;
                    d=c++;
                    if(xsyuefen>11){
                        a=1;
                    }
                    if(d>12){
                        b++;
                        c=2;
                    }
                    sksj = (((myyear*1)+b).toString()+"-"+xsyuefen.toString()+"-"+myday.toString())
                }

                if(i==1){
                    html+="<tr><td>" + i + "期</td><td>" + yueshoubenxi.toFixed(2) +"</td><td>" + yueshoubenjin.toFixed(2) + "</td><td>" + meiyuelixi.toFixed(2) + "</td><td>" + daishoubenjin.toFixed(2) + "</td><td>" + sksj + "</td>";
                }else if(i>1 && i < time){
                    html+="<tr><td>" + i + "期</td><td>" + yueshoubenxi.toFixed(2) +"</td><td>" + yueshoubenjin.toFixed(2) + "</td><td>" +  meiyuelixi.toFixed(2) + "</td><td>" + daishoubenjin.toFixed(2) + "</td><td>" + sksj + "</td>";
                }else if(i == time){
                    html+="<tr><td>" + i + "期</td><td>" + yueshoubenxi.toFixed(2) +"</td><td>" + yueshoubenjin.toFixed(2) + "</td><td>" +  meiyuelixi.toFixed(2) + "</td><td>" + 0.00 + "</td><td>" + sksj + "</td>";
                }
                shengyubenjin = shengyubenjin - (yueshoubenxi-meiyuelixi);


            }
            $("#tb").append(html);
        }


        function myfxdqhb(){        //每月付息到期还本
            var yueshoubenxi = money*lilv;  //月收本息
            var yslx =money*lilv; //月收利息(用于计算总收款数)
            var html;           //用于生成表格
            var mytime=1;    //月份计数器1
            var a=1;        //计数器a
            var b = 1;      //计数器b
            var c = 1;      //计数器c
            for(var i=1;i<=(time*1+1);i++){
                var sksj;   //收款时间
                var mytime2 = (mymonth*1)+(mytime*1-1);    //月份计数器2
                mytime++;
                var xsyuefen;       //用于显示的月份
                var d;
                if(mytime2<=12){
                    xsyuefen = mytime2;
                    sksj = (myyear.toString()+"-"+xsyuefen.toString()+"-"+myday.toString())
                }else{
                    xsyuefen = a++;
                    d=c++;
                    if(xsyuefen>11){
                        a=1;
                    }
                    if(d>12){
                        b++;
                        c=2;
                    }
                    sksj = (((myyear*1)+b).toString()+"-"+xsyuefen.toString()+"-"+myday.toString())
                }
                if(i==1){
                    sksj = (myyear.toString()+"-"+mymonth.toString()+"-"+myday.toString())
                    html+="<tr><td>" + i + "期</td><td>" + yueshoubenxi.toFixed(2) +"</td><td>" + 0.00 + "</td><td>" + yslx.toFixed(2) + "</td><td>" + money + "</td><td>" + sksj + "</td>";
                }else if(i>1 && i < time){
                    html+="<tr><td>" + i + "期</td><td>" + yueshoubenxi.toFixed(2) +"</td><td>" + 0.00 + "</td><td>" +  yslx.toFixed(2) + "</td><td>" + money + "</td><td>" + sksj + "</td>";
                }else if(i == time){
                    html+="<tr><td>" + i + "期</td><td>" + yueshoubenxi.toFixed(2) +"</td><td>" + 0.00 + "</td><td>" +  yslx.toFixed(2) + "</td><td>" + money + "</td><td>" + sksj + "</td>";
                }else if(i > time){
                    html+="<tr><td>" + i + "期</td><td>" + money +"</td><td>" + money + "</td><td>" +  0.00 + "</td><td>" + 0.00 + "</td><td>" + sksj + "</td>";
                }
            }
            $("#tb").append(html);
        }
        function myfx(){        //每月付息
            var yueshoubenxi = money*lilv;  //月收本息
            var yslx =money*lilv; //月收利息(用于计算总收款数)
            var html;           //用于生成表格
            var mytime=1;    //月份计数器1
            var a=1;        //计数器a
            var b = 1;      //计数器b
            var c = 1;      //计数器c
            for(var i=1;i<=time;i++){
                var sksj;   //收款时间
                var mytime2 = (mymonth*1)+(mytime*1);    //月份计数器2
                mytime++;
                var xsyuefen;       //用于显示的月份
                var d;
                if(mytime2<=12){
                    xsyuefen = mytime2;
                    sksj = (myyear.toString()+"-"+xsyuefen.toString()+"-"+myday.toString())
                }else{
                    xsyuefen = a++;
                    d=c++;
                    if(xsyuefen>11){
                        a=1;
                    }
                    if(d>12){
                        b++;
                        c=2;
                    }
                    sksj = (((myyear*1)+b).toString()+"-"+xsyuefen.toString()+"-"+myday.toString())
                }
                if(i==1){
                    html+="<tr><td>" + i + "期</td><td>" + yueshoubenxi.toFixed(2) +"</td><td>" + 0.00 + "</td><td>" + yslx.toFixed(2) + "</td><td>" + money + "</td><td>" + sksj + "</td>";
                }else if(i>1 && i < time){
                    html+="<tr><td>" + i + "期</td><td>" + yueshoubenxi.toFixed(2) +"</td><td>" + 0.00 + "</td><td>" +  yslx.toFixed(2) + "</td><td>" + money + "</td><td>" + sksj + "</td>";
                }else if(i == time){
                    yueshoubenxi = money*1+yslx;
                    html+="<tr><td>" + i + "期</td><td>" + yueshoubenxi.toFixed(2) +"</td><td>" + money + "</td><td>" +  yslx.toFixed(2) + "</td><td>" + 0.00 + "</td><td>" + sksj + "</td>";
                }
            }
            $("#tb").append(html);
        }
        function dqhbhx(){  //到期还本还息
            var yueshoubenxi = money*lilv;  //月收本息
            var zongshoukuanshu = (yueshoubenxi*time)+(money*1);   //总收款数
            var zslx = yueshoubenxi*time;
            var html;           //用于生成表格
            var sksj;   //收款时间
            var yuecount = (mymonth*1)+(time*1);   //月份统计器
            var xsyf;      //显示的月份
            var xsnf = myyear;  //显示的年份
            if(yuecount>12){
                xsnf =  (myyear*1)+parseInt(yuecount/12);
                if( yuecount%12==0){
                    xsyf = 1;
                }else{
                    xsyf  = yuecount%12 ;
                }
            }else{
                xsyf = yuecount;
            }
            sksj = xsnf.toString()+"-"+xsyf.toString()+"-"+myday.toString();
            html+="<tr><td>" + 1 + "期</td><td>" + zongshoukuanshu.toFixed(2) +"</td><td>" + money + "</td><td>" + zslx.toFixed(2) + "</td><td>" + 0 + "</td><td>" + sksj + "</td>";
            $("#tb").append(html);
        }

        if(type==1){
            denge();
        }else if(type==2){
            myfx();
        }else if(type==3){
            myfxdqhb();
        }else if(type==4){
            dqhbhx();
        }
    }

</script>

[#-- Script 底部 --]
[#include "/template/include/script_bottom.ftl" /]
</body>
</html>
[/@compress]