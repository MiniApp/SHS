/**
 * 日期处理工具类
 * 
 * @author WangHua
 * @version 1.0
 * @since 2012-06-25
 * @class DateUtil
 */
ObjectUtil.define("DateUtils", {
			statics : {
				/**
				 * 将字符串型日期数据转换成相应格式的Date对象
				 */
				strToDate : function(strDate, format) {
					return Ext.Date.parse(strDate, format);
				},
				/**
				 * 
				 * 时间格式必须为 yyyy-MM-dd HH:mm:ss
				 * 比较日期的大小
				 * **/
				compareTime:function(startDate,endDate){
					var pattern = /^((\d{2}(([02468][048])|([13579][26]))\-((((0[13578])|(1[02]))\-((0[1-9])|([1-2][0-9])|(3[01])))|(((0[469])|(11))\-((0[1-9])|([1-2][0-9])|(30)))|(02\-((0[1-9])|([1-2][0-9])))))|(\d{2}(([02468][1235679])|([13579][01345789]))\-((((0[13578])|(1[02]))\-((0[1-9])|([1-2][0-9])|(3[01])))|(((0[469])|(11))\-((0[1-9])|([1-2][0-9])|(30)))|(02\-((0[1-9])|(1[0-9])|(2[0-8]))))))(\/(((0[0-9])|(2[0-3])|(1[0-9]))\:([0-5][0-9])))?$/;
					if(DataUtil.isEmpty(startDate)){
						MsgUtil.error('系统提示','传入的开始时间不能为空');
						return false;
					}
					if(DataUtil.isEmpty(endDate)){
						MsgUtil.error('系统提示','传入的结束时间不能为空');
						return false;
					}
					if(!pattern.exec(startDate)){
						MsgUtil.error('系统提示','传入的开始时间格式不正确');
						return false;
					}
					if(!pattern.exec(endDate)){
						MsgUtil.error('系统提示','传入的结束时间格式不正确');
						return false;
					}
					startDate=startDate.replace('-','/').replace('/',' ');
					endDate=endDate.replace('-','/').replace('/',' ');
					var startTime=new Date(startDate).getTime();
					var endTime=new Date(endDate).getTime();
					if(startTime>endTime){
						return false;
					}else if(startTime<endTime){
						return true;
					}else{
						return 0;
					}
				}
				
			}
		});