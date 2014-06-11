/**
 * 新增信息页面 <p/> 功能描述：
 * <li>新增信息</li>
 * 
 * @author 朱凯
 * @since 2012-07-23
 * 
 */
ObjectUtil.define("crm.pages.ocrm.common.systemManage.employeeManage.EmployeeManageCreate", "base.PageObject", {
			htmlUrl : Constants.CONTEXT_PATH
					+ "/pages/ocrm/common/systemManage/employeeManage/EmployeeManageCreate.html",// html路径
			/**
			 * 初始化页面组件
			 * 
			 * @param
			 * @return
			 * @程序员：朱凯
			 * @编码日期：2012-07-23
			 * @最后修改日期：
			 */
			initCmp : function() {
	           var owner=this;
				//创建机构树
				this.createOrgSelectTree({
					renderTo : this.ids.nodeTree,
					codeDomId : this.ids.node,
					width : 350,
					onlyLeafSelect : false,
					belongPageObject:this
				});
				// 创建下拉框
				//证件类型
				this.create("component.EnumSelector", {
							category : [CodeStringDefinition.CUSPERIDTYPE_CATEGORY],
							renderTo : [this.ids.idtypeenum],
							id : [this.ids.idtypeenum],
							selectedValue:[CodeStringDefinition.CUSPERIDTYPE_ID_MSGCODE]
						});
				//性别
				this.create("component.EnumSelector", {
					category : [CodeStringDefinition.GENDER_CATEGORY,CodeStringDefinition.STATUS_CUSEmpEdu_CATEGORY,
					            CodeStringDefinition.STATUS_NATION_CATEGORY,CodeStringDefinition.TECHNICAL_TITLE_CATEGORY,
					            CodeStringDefinition.PROFESSINAL_LEVEL_CATEGORY,CodeStringDefinition.CONTRACT_CATEGORY,
					            CodeStringDefinition.SKILLPOSITION_CATEGORY,CodeStringDefinition.FULLTIME_CATEGORY,
					            CodeStringDefinition.POLICITAL_CATEGORY,CodeStringDefinition.DEPTBELONG_CATEGORY],
					renderTo : [this.ids.genderenumenum,this.ids.educationenum,this.ids.raceenum,this.ids.technicaltitleenum,
					            this.ids.bussnegopermenum,this.ids.contractenumenum,this.ids.skillpositionenum,this.ids.isfulltimeenum,
					            this.ids.clanbelongtoenum,this.ids.deptbelongenum],
					id : [this.ids.genderenumenum,this.ids.educationenum,this.ids.raceenum,this.ids.technicaltitleenum,
					      this.ids.bussnegopermenum,this.ids.contractenumenum,this.ids.skillpositionenum,this.ids.isfulltimeenum,
					      this.ids.clanbelongtoenum,this.ids.deptbelongenum]
				});
				this.create("component.EnumSelector", {
					category : [CodeStringDefinition.POLICITAL_CATEGORY],
					renderTo : [this.ids.socialrelationenum],
					id : [this.ids.socialrelationenum]
				});
				//创建日期控件
				this.create('component.DateField', {
					renderTo : this.ids.birthday,
					format : 'Y-m-d'
				});
				this.create('component.DateField', {
					renderTo : this.ids.employeetime,
					format : 'Y-m-d'
				});
				// 创建面板
				this.create('component.Panel', {
							contentEl : this.ids.employeeManageCreateContentDiv,
							hasBackGroundColor : true,
							renderTo : this.ids.employeeManageCreateDiv,
							height : 570,
							buttons : [{
										text : '保存',
										iconCls : 'save',
										handler : function() {
											owner.employeeManageCreateInfo();
										}
									}]
						});
			
			},
			/**
			 * 保存添加信息
			 * 
			 * @param
			 * @return
			 * @程序员：朱凯
			 * @编码日期：2012-07-23
			 * @最后修改日期：
			 */
			employeeManageCreateInfo : function() {
				var owner=this;
				// 验证登录ID
				var cardId = HtmlUtil.getDom(this.ids.loginId).value;
				var reg = /^[A-Za-z0-9]*$/;
				if (cardId != "" && !reg.test(cardId)) {
					MsgUtil.error('页面验证出错', '登录ID不合法,只能是数字或者数字和字母组成');
					return;
				}
				if(cardId.length>11){
					MsgUtil.error('页面验证出错', '登录ID的长度过长，请重新输入');
					return;
				}
				//验证姓名
				var name = HtmlUtil.getDom(this.ids.name).value;
				if(name.length>59){
					MsgUtil.error('页面验证出错', '姓名的长度过长，请重新输入');
					return;
				}
				//验证办公电话号码1
				var findphone = HtmlUtil.getDom(this.ids.findphone).value;
				var regfindphone = /^([0-9]|[-])*$/;
				if (findphone != "" && !regfindphone.test(findphone)) {
					MsgUtil.error('页面验证出错', '办公电话1不合法,只能是数字或者数字和-组成');
					return;
				}
				//验证办公电话号码2
				var findphone2 = HtmlUtil.getDom(this.ids.findphone2).value;
				var regfindphone2 = /^([0-9]|[-])*$/;
				if (findphone2 != "" && !regfindphone2.test(findphone2)) {
					MsgUtil.error('页面验证出错', '办公电话2不合法,只能是数字或者数字和-组成');
					return;
				}
		
				var data = DataUtil.getDataFromArea(owner.ids.employeeManageCreateContentDiv);// 获取页面输入的信息并自动验证
				if (data != Constants.VALIDATION_FAIL) {// 如果data不等Constants.VALIDATION_FAIL则表示验证通过
					//验证身份证号码
					var idtypeenum = DataUtil.decode(DataUtil.getDataFromArea(owner.ids.employeeManageCreateContentDiv)).idtypeenum.code;
					var idnumber=HtmlUtil.getDom(this.ids.idnumber).value+'';
					if (CodeStringDefinition.CUSPERIDTYPE_ID_MSGCODE==idtypeenum) {
						if(idnumber.length!=18&&idnumber.length!=15){
							MsgUtil.error('页面验证出错', '身份证号不能为空且只能由15位或18位组成');
							return;
						}
						
					}
					ConnectionUtil.ajaxReq({// 发送ajax请求
						strServId : "employeeManageService.insertEmployeeManageInfo",
						jsonData : data,
						callback : function(msg) {
							MsgUtil.alert("提示", "新增成功！");
							owner.parent.close();// 关闭窗口
						}
					});
				}
			}
		});