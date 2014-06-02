/**
 * 新增信息页面 <p/> 功能描述：
 * <li>新增信息</li>
 * 
 * @author 朱凯
 * @since 2012-07-23
 * 
 */
ObjectUtil.define("crm.pages.ocrm.common.systemManage.employeeManage.EmployeeManageUpdate", "base.PageObject", {
			htmlUrl : Constants.CONTEXT_PATH
					+ "/pages/ocrm/common/systemManage/employeeManage/EmployeeManageUpdate.html",// html路径
					/**
					 * 初始化页面数据
					 * 
					 * @param
					 * @return
					 * @程序员：朱凯
					 * @编码日期：2012-07-23
					 * @最后修改日期：
					 */
					initData : function() {
						// 加载并渲染数据
						var owner = this;
//						HtmlUtil.getDom(this.ids.selectPic).onclick = function() {
//							owner.openSelectPic()
//						}
//						//图片显示
//						ImgUtil.getImgFromServer({
//							imgId : this.ids.photoImg,
//							jsonData:{corpersonky:this.corpersonky},
//							imgStrServId : "accountManagerService.getImg",
//							inDataClass:"com.easy.ocrm.corporate.beans.accountmanager.EmployeePhotoBean"
//						});
						ConnectionUtil.ajaxReq({
							strServId : "employeeManageService.employeeManageById",
							jsonData : {
								corpersonky : this.corpersonky
							},
							callback : function(data) {
								DataUtil.populateDataForArea(data,
										owner.ids.employeeManageUpdateContentDiv);// 渲染数据到页面
							}
						});
					},
					/**
					 * 初始化页面组件
					 * 
					 * @param
					 * @return
					 * @程序员：朱凯
					 * @编码日期：2012-07-24
					 * @最后修改日期：
					 */
					initCmp : function() {
						var owner = this;
						//创建机构树
						this.createOrgSelectTree({
							renderTo : this.ids.nodeTree,
							codeDomId : this.ids.node,
							width : 350,
							onlyLeafSelect : false,
							belongPageObject:this
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
						// 面板
						this.panel = this.create('component.Panel', {
									contentEl : this.ids.employeeManageUpdateContentDiv,
									hasBackGroundColor : true,
									height : 570,
									renderTo : this.ids.employeeManageUpdateDiv,
									buttons : [{
												text : '确定',
												iconCls : 'save',
												handler : function() {
													owner.updateEmployeeManageInfo();
												}
											}]
								});
						
					},
					/**
					 * 保存修改信息
					 * 
					 * @param
					 * @return
					 * @程序员：朱凯
					 * @编码日期：2012-07-25
					 * @最后修改日期：
					 */
					updateEmployeeManageInfo : function() {
						var owner = this;
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
						var data = DataUtil.getDataFromArea(owner.ids.employeeManageUpdateContentDiv);// 获取页面输入的信息并自动验证
						if (data != Constants.VALIDATION_FAIL) {// 如果data不等Constants.VALIDATION_FAIL则表示验证通过
							//验证身份证号码
							var idtypeenum = DataUtil.decode(DataUtil.getDataFromArea(owner.ids.employeeManageUpdateContentDiv)).idtypeenum.code;
							var idnumber=HtmlUtil.getDom(this.ids.idnumber).value+'';
							if (CodeStringDefinition.CUSPERIDTYPE_ID_MSGCODE==idtypeenum) {
								if(idnumber.length!=18&&idnumber.length!=15){
									MsgUtil.error('页面验证出错', '身份证号不能为空且只能由15位或18位组成');
									return;
								}
								
							}
							var newData = ObjectUtil.applyIf(DataUtil.decode(data), {
										corpersonky : this.corpersonky
									});// 组装修改信息将客户主键corpersonky添加的修改信息数据中
							ConnectionUtil.ajaxReq({// 发送ajax请求
								strServId : "employeeManageService.updateEmployeeManageInfo",
								jsonData : newData,
								callback : function(msg) {
									MsgUtil.alert("提示", "修改成功！");
									owner.parent.close();// 关闭窗口
								}
							});
						}

					},
					/**
					 * 保存图片修改
					 * 
					 * @param
					 * @return
					 * @程序员：朱凯
					 * @编码日期：2012-07-25
					 * @最后修改日期：
					 */
					openSelectPic : function() {
						var owner= this;
						var corpersonky=this.corpersonky
						// 打开上传组件
						var win = this.create('component.Window', {
							title : '上传照片',
							closable : true,
							draggable : true,
							width : 600,
							height : 245,
							modal : true,
							pageObject : this.create(
									'crm.pages.ocrm.common.systemManage.employeeManage.UploadImg', {
										id : 'UploadEmployeePic',
										corpersonky: this.corpersonky
									})
						});
						win.on('close', function() {
						})

					}
				});