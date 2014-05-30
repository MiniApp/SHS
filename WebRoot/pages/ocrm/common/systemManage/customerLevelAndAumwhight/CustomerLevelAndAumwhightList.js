/**
 * 
 * 系统管理->客户等级列表和AUM权重值列表
 * 
 * <p/> 功能描述：
 * 
 * <li>增加客户等级</li>
 * <li>增加AUM权重值</li>
 * 
 * author:朱凯
 * 
 * date:2012-08-3
 * 
 */
ObjectUtil.define("crm.pages.ocrm.common.systemManage.customerLevelAndAumwhight.CustomerLevelAndAumwhightList", "base.PageObject", {
	htmlUrl : Constants.CONTEXT_PATH + "/pages/ocrm/common/systemManage/customerLevelAndAumwhight/CustomerLevelAndAumwhightList.html",// 页面url地址
	/**
	 * 初始数据
	 * 
	 * @param
	 * @return
	 * @程序员：朱凯
	 * @编码日期：2012-08-10
	 * @最后修改日期：
	 */
	initData:function(){
		
	},
	/**
	 * 初始化页面组件
	 * 
	 * @param
	 * @return
	 * @程序员：朱凯
	 * @编码日期：2012-07-29
	 * @最后修改日期：
	 */
	initCmp : function() {
		this.queryCustomerLevelList();
		this.queryAumHeavywhightList();
	},
	/**
	 * 初始化事件监听
	 * 
	 * @param
	 * @return
	 * @程序员：朱凯
	 * @编码日期：2012-07-19
	 * @最后修改日期：
	 */
	initEvent:function(){
		
		
	},
	/**
	 * 创建客户等级查询
	 * 
	 * @return
	 * @程序员：朱凯
	 * @编码日期：2012-07-23
	 * @最后修改日期：
	 */
	queryCustomerLevelList:function(){
		var owner = this;
		HtmlUtil.overwrite(this.ids.customerLevelListDisplayDiv, "", false);
		//创建列表组件
		var grid = this.create('component.DataGrid', {
			renderTo : this.ids.customerLevelListDisplayDiv,
			strServId : 'customerLevelService.searchCustomerLevel',
			jsonData : {
			},
			mapping : ['customerlevelky','customerlevelcode','customerlevelname','uplevel', 'downlevel', 'loaduplevel','loaddownlevel'],
			collapsible : false,
			widthPercent:1,
			heightPercent :0.45,
			//checkbox : true,
			title : '客户等级查询结果',
			edit:true,
			noPaging:true,
			columns : [{
						header : "客户等级名字",
						sortable : false,
						dataIndex : 'customerlevelname',
						widthPercent:0.2
					},
					{
						header : "下限",
						sortable : false,
						dataIndex : 'downlevel',
						widthPercent:0.2,
						edit:true
					},{
						header : "上限",
						sortable : false,
						dataIndex : 'uplevel',
						widthPercent:0.2,
						edit:true
					},{
						header : "贷款下限",
						sortable : false,
						dataIndex : 'loaddownlevel',
						widthPercent:0.2,
						edit:true
					},{
						header : "贷款上限",
						sortable : false,
						dataIndex : 'loaduplevel',
						widthPercent:0.22,
						edit:true
					}],
					tbar : [{
						text : '提交',
						tooltip : '提交',
						iconCls : 'add',
						handler : function() {
						var rows = grid.getAllRecords();//得到所有的记录
									var ids = [];
									for(var i=0;i<rows.length;i++){
										if(parseInt(rows[i].get('uplevel'))<=parseInt(rows[i].get('downlevel'))){
											ExceptionUtil.throwBusinessException({
												title : '提示信息',
												msg : rows[i].get('customerlevelname')+'上限必须大于下限!'
											});
										}
										if(rows[i].get('uplevel').length>13){
											MsgUtil.error('页面验证出错', rows[i].get('customerlevelname')+'上限的长度不能大于13位');
											return;
										}
										if(rows[i].get('downlevel').length>13){
											MsgUtil.error('页面验证出错', rows[i].get('customerlevelname')+'下限的长度不能大于13位');
											return;
										}
										if(rows[i].get('loaduplevel').length>13){
											MsgUtil.error('页面验证出错', rows[i].get('customerlevelname')+'贷款上限的长度不能大于13位');
											return;
										}
										if(rows[i].get('loaddownlevel').length>13){
											MsgUtil.error('页面验证出错', rows[i].get('customerlevelname')+'贷款下限的长度不能大于13位');
											return;
										}
										/*
										if(i==0){
											if(parseInt(rows[i].get('downlevel'))!=parseInt(rows[rows.length-1].get('uplevel'))){
												ExceptionUtil.throwBusinessException({
													title : '提示信息',
													msg : rows[i].get('customerlevelname')+'的下限必须等于'+parseInt(rows[rows.length-1].get('uplevel'))
												});
										  }
										}else if(0<i<5){
											if(parseInt(rows[i+1].get('downlevel'))!=parseInt(rows[i].get('uplevel'))){
												ExceptionUtil.throwBusinessException({
													title : '提示信息',
													msg : rows[i+1].get('customerlevelname')+'的下限必须等于'+parseInt(rows[i].get('uplevel'))
												});
										  }
										}
										*/
										ids[i]={
												customerlevelname:rows[i].get('customerlevelname'),
												customerlevelcode:rows[i].get('customerlevelcode'),
												uplevel:rows[i].get('uplevel'),
												downlevel:rows[i].get('downlevel'),
												loaduplevel:rows[i].get('loaduplevel'),
												loaddownlevel:rows[i].get('loaddownlevel')
										};
									}
									var customer_loaduplevel=grid.getAt(0).get('loaduplevel');//大众客户贷款上限
									var customer_loaddownlevel=grid.getAt(0).get('loaddownlevel');//大众客户贷款下限
									if(customer_loaduplevel.length>1){
										ExceptionUtil.throwBusinessException({
											title : '提示信息',
											msg : '大众客户不能设置贷款上限和贷款下限,只有金级才能设置贷款上限和贷款下限'
										});
									}else if(customer_loaduplevel.length==1&&parseInt(customer_loaduplevel)!=0){
										ExceptionUtil.throwBusinessException({
											title : '提示信息',
											msg : '大众客户不能设置贷款上限和贷款下限,只有金级才能设置贷款上限和贷款下限'
										});
									}
									if(customer_loaddownlevel.length>1){
										ExceptionUtil.throwBusinessException({
											title : '提示信息',
											msg : '大众客户不能设置贷款上限和贷款下限,只有金级才能设置贷款上限和贷款下限'
										});
									}else if(customer_loaddownlevel.length==1&&parseInt(customer_loaddownlevel)!=0){
										ExceptionUtil.throwBusinessException({
											title : '提示信息',
											msg : '大众客户不能设置贷款上限和贷款下限,只有金级才能设置贷款上限和贷款下限'
										});
									}
									var potentail_loaduplevel=grid.getAt(1).get('loaduplevel');//潜力金级贷款上限
									var potentail_loaddownlevel=grid.getAt(1).get('loaddownlevel');//潜力金级贷款下限
									if(potentail_loaduplevel.length>1){
										ExceptionUtil.throwBusinessException({
											title : '提示信息',
											msg : '潜力金级不能设置贷款上限和贷款下限,只有金级才能设置贷款上限和贷款下限'
										});
									}else if(potentail_loaduplevel.length==1&&parseInt(potentail_loaduplevel)!=0){
										ExceptionUtil.throwBusinessException({
											title : '提示信息',
											msg : '潜力金级不能设置贷款上限和贷款下限,只有金级才能设置贷款上限和贷款下限'
										});
									}
									if(potentail_loaddownlevel.length>1){
										ExceptionUtil.throwBusinessException({
											title : '提示信息',
											msg : '潜力金级不能设置贷款上限和贷款下限,只有金级才能设置贷款上限和贷款下限'
										});
									}else if(potentail_loaddownlevel.length==1&&parseInt(potentail_loaddownlevel)!=0){
										ExceptionUtil.throwBusinessException({
											title : '提示信息',
											msg : '潜力金级不能设置贷款上限和贷款下限,只有金级才能设置贷款上限和贷款下限'
										});
									}
									var whitegold_loaduplevel=grid.getAt(3).get('loaduplevel');//白金级贷款上限
									var whitegold_loaddownlevel=grid.getAt(3).get('loaddownlevel');//白金级贷款下限
									if(whitegold_loaduplevel.length>1){
										ExceptionUtil.throwBusinessException({
											title : '提示信息',
											msg : '白金级不能设置贷款上限和贷款下限,只有金级才能设置贷款上限和贷款下限'
										});
									}else if(whitegold_loaduplevel.length==1&&parseInt(whitegold_loaduplevel)!=0){
										ExceptionUtil.throwBusinessException({
											title : '提示信息',
											msg : '白金级不能设置贷款上限和贷款下限,只有金级才能设置贷款上限和贷款下限'
										});
									}
									if(whitegold_loaddownlevel.length>1){
										ExceptionUtil.throwBusinessException({
											title : '提示信息',
											msg : '白金级不能设置贷款上限和贷款下限,只有金级才能设置贷款上限和贷款下限'
										});
									}else if(whitegold_loaddownlevel.length==1&&parseInt(whitegold_loaddownlevel)!=0){
										ExceptionUtil.throwBusinessException({
											title : '提示信息',
											msg : '白金级不能设置贷款上限和贷款下限,只有金级才能设置贷款上限和贷款下限'
										});
									}
									var diamond_loaduplevel=grid.getAt(4).get('loaduplevel');//钻石级贷款上限
									var diamond_loaddownlevel=grid.getAt(4).get('loaddownlevel');//钻石级贷款下限
									if(diamond_loaduplevel.length>1){
										ExceptionUtil.throwBusinessException({
											title : '提示信息',
											msg : '钻石级不能设置贷款上限和贷款下限,只有金级才能设置贷款上限和贷款下限'
										});
									}else if(diamond_loaduplevel.length==1&&parseInt(diamond_loaduplevel)!=0){
										ExceptionUtil.throwBusinessException({
											title : '提示信息',
											msg : '钻石级不能设置贷款上限和贷款下限,只有金级才能设置贷款上限和贷款下限'
										});
									}
									if(diamond_loaddownlevel.length>1){
										ExceptionUtil.throwBusinessException({
											title : '提示信息',
											msg : '钻石级不能设置贷款上限和贷款下限,只有金级才能设置贷款上限和贷款下限'
										});
									}else if(diamond_loaddownlevel.length==1&&parseInt(diamond_loaddownlevel)!=0){
										ExceptionUtil.throwBusinessException({
											title : '提示信息',
											msg : '钻石级不能设置贷款上限和贷款下限,只有金级才能设置贷款上限和贷款下限'
										});
									}
									var private_loaduplevel=grid.getAt(5).get('loaduplevel');//私人银行级贷款上限
									var private_loaddownlevel=grid.getAt(5).get('loaddownlevel');//私人银行级贷款下限
									if(private_loaduplevel.length>1){
										ExceptionUtil.throwBusinessException({
											title : '提示信息',
											msg : '私人银行级不能设置贷款上限和贷款下限,只有金级才能设置贷款上限和贷款下限'
										});
									}else if(private_loaduplevel.length==1&&parseInt(private_loaduplevel)!=0){
										ExceptionUtil.throwBusinessException({
											title : '提示信息',
											msg : '私人银行级不能设置贷款上限和贷款下限,只有金级才能设置贷款上限和贷款下限'
										});
									}
									if(private_loaddownlevel.length>1){
										ExceptionUtil.throwBusinessException({
											title : '提示信息',
											msg : '私人银行级不能设置贷款上限和贷款下限,只有金级才能设置贷款上限和贷款下限'
										});
									}else if(private_loaddownlevel.length==1&&parseInt(private_loaddownlevel)!=0){
										ExceptionUtil.throwBusinessException({
											title : '提示信息',
											msg : '私人银行级不能设置贷款上限和贷款下限,只有金级才能设置贷款上限和贷款下限'
										});
									}
									var customer_uplevel=parseInt(grid.getAt(0).get('uplevel'));//大众客户上限
									var potentail_uplevel=parseInt(grid.getAt(1).get('uplevel'));//潜力金级上限
									var potentail_downlevel=parseInt(grid.getAt(1).get('downlevel'));//潜力金级下限
									var gold_uplevel=parseInt(grid.getAt(2).get('uplevel'));//金级上限
									var gold_downlevel=parseInt(grid.getAt(2).get('downlevel'));//金级下限
									var gold_loaduplevel=parseInt(grid.getAt(2).get('loaduplevel'));//金级贷款上限
									var gold_loaddownlevel=parseInt(grid.getAt(2).get('loaddownlevel'));//金级贷款下限
									var whitegold_uplevel=parseInt(grid.getAt(3).get('uplevel'));//白金级上限
									var whitegold_downlevel=parseInt(grid.getAt(3).get('downlevel'));//白金级下限
									var diamond_uplevel=parseInt(grid.getAt(4).get('uplevel'));//钻石级上限
									var diamond_downlevel=parseInt(grid.getAt(4).get('downlevel'));//钻石级下限
									var private_downlevel=parseInt(grid.getAt(5).get('downlevel'));//私人银行级下限
									if(gold_loaduplevel<=gold_loaddownlevel){
										ExceptionUtil.throwBusinessException({
											title : '提示信息',
											msg : grid.getAt(2).get('customerlevelname')+'贷款下限必须大于'+grid.getAt(2).get('customerlevelname')+'贷款上限'
										});
									}
									if(potentail_downlevel!=customer_uplevel){
										ExceptionUtil.throwBusinessException({
											title : '提示信息',
											msg : grid.getAt(1).get('customerlevelname')+'下限必须等于'+grid.getAt(0).get('customerlevelname')+'上限'
										});
									}
									if(gold_downlevel!=potentail_uplevel){
										ExceptionUtil.throwBusinessException({
											title : '提示信息',
											msg : grid.getAt(2).get('customerlevelname')+'下限必须等于'+grid.getAt(1).get('customerlevelname')+'上限'
										});
									}
									if(whitegold_downlevel!=gold_uplevel){
										ExceptionUtil.throwBusinessException({
											title : '提示信息',
											msg : grid.getAt(3).get('customerlevelname')+'下限必须等于'+grid.getAt(2).get('customerlevelname')+'上限'
										});
									}
									if(diamond_downlevel!=whitegold_uplevel){
										ExceptionUtil.throwBusinessException({
											title : '提示信息',
											msg : grid.getAt(4).get('customerlevelname')+'下限必须等于'+grid.getAt(3).get('customerlevelname')+'上限'
										});
									}
									if(private_downlevel!=diamond_uplevel){
										ExceptionUtil.throwBusinessException({
											title : '提示信息',
											msg : grid.getAt(5).get('customerlevelname')+'下限必须等于'+grid.getAt(4).get('customerlevelname')+'上限'
										});
									}
									var params = {
										'customerlevelList' : ids
									};
									ConnectionUtil.ajaxReq({
										strServId : "customerLevelService.insertCustomerLevel",
										jsonData : params,
										callback : function(data) {
											owner.initCmp();
										}
									});
					   }
					}]
		
		});//grid 结束
	},
	/**
	 * 创建AUM权重参数查询
	 * 
	 * @return
	 * @程序员：朱凯
	 * @编码日期：2012-07-23
	 * @最后修改日期：
	 */
	queryAumHeavywhightList:function(){
		var owner = this;
		HtmlUtil.overwrite(this.ids.aumHeavywhightListDisplayDiv, "", false);
		//创建列表组件
		var grid = this.create('component.DataGrid', {
			renderTo : this.ids.customerLevelListDisplayDiv,
			strServId : 'aumHeavywhightService.searchAumHeavywhight',
			jsonData : {
			},
			mapping : ['aumheavywhightky','aumheavywhightcode','aumheavywhightname','aumheavywhightvalue'],
			collapsible : false,
			//checkbox : true,
			noPaging:true,
			heightPercent :0.53,
			widthPercent:1,
			title : 'AUM权重值查询结果',
			edit:true,
			columns : [{
						header : "AUM权重值名字",
						sortable : true,
						dataIndex : 'aumheavywhightname',
						widthPercent:0.5
					},
					{
						header : "AUM权重值",
						sortable : true,
						dataIndex : 'aumheavywhightvalue',
						widthPercent:0.52,
						edit:true
					}],
					tbar : [ {
						text : '提交',
						tooltip : '提交',
						iconCls : 'add',
						handler : function() {
						var rows = grid.getAllRecords();//得到所有的记录
							
									var ids = [];
									var sumvalue=0.00;//记录AUM权重值的和
									for (var i = 0; i < rows.length;i++) {
										var value = parseFloat(rows[i].get('aumheavywhightvalue'));
										sumvalue +=value;
										if((rows[i].get('aumheavywhightvalue')+'').length>4){
											ExceptionUtil.throwBusinessException({
           										title : '提示信息',
           										msg : 'AUM权重值小数点后必须为2位或1位'
           									});
                                         }
										ids[i]={
												aumheavywhightcode:rows[i].get('aumheavywhightcode'),
												aumheavywhightname:rows[i].get('aumheavywhightname'),
												aumheavywhightvalue:parseFloat(rows[i].get('aumheavywhightvalue'))
										};
										
									}
                                   if(sumvalue!=1&&sumvalue!=(0.9999999999999999)&&sumvalue!=(1.0000000000000002)){
               							ExceptionUtil.throwBusinessException({
               										title : '提示信息',
               										msg : 'AUM权重值之和必须等于1!'
               									});
                                   }
									var params = {
										'aumheavywhightList' : ids
									};
									ConnectionUtil.ajaxReq({
										strServId : "aumHeavywhightService.insertAumHeavywhight",
										jsonData : params,
										callback : function(data) {
											owner.initCmp();
										}
									});
					   }
					}]
		});//grid 结束
	}
});