/**
 * 修改产品分类页面 <p/> 功能描述：
 * <li>初始化页面组件</li>
 * <li>给页面赋值</li>
 * <li>得到页面值</li>
 * @author tangyingzhen
 * @since 2012-07-18
 * 
 */
ObjectUtil
		.define(
				"crm.pages.ocrm.common.systemManage.productLibrary.productType.ProductTypeUpdate",
				"base.PageObject",
				{
					htmlUrl : Constants.CONTEXT_PATH
							+ "/pages/ocrm/common/systemManage/productLibrary/productType/ProductTypeUpdate.html",

							/**
							 * 初始化页面组件
							 * 
							 * @param
							 * @return
							 * @程序员：tangyingzhen
							 * @编码日期：2012-07-18
							 * @最后修改日期：
							 */	
					initCmp : function() {
						var owner = this;
						
						//页面面板
						this.create('component.Panel', {
							id : 'updateProductTypePanel',
							title : '修改产品分类',
							contentEl : this.ids.productTypeUpdateContentDiv,
							height : 400,
							hasBackGroundColor : false
						});

				},
				
				/**
				 * 给页面赋值
				 * 
				 * @param
				 * @return
				 * @程序员：tangyingzhen
				 * @编码日期：2012-07-18
				 * @最后修改日期：
				 */	
				renderData : function(data){
					var owner = this;
					DataUtil.populateDataForArea(data,
							this.ids.productTypeUpdateContentDiv);// 渲染数据到页面
//					if (this.resourceType) {
//						this.resourceType.setValue(
//								this.ids.prodTypeIsCoreEnum,
//								data.prodTypeIsCore);
//					} else {
//						this.resourceType = this.create('component.EnumSelector', {
//							category : [CodeStringDefinition.FLAG_CATEGORY],
//							renderTo : [this.ids.prodTypeIsCoreEnum],
//							id : [this.ids.prodTypeIsCoreEnum],
//							selectedValue : [data.prodTypeIsCore]
//						});
//					}
				},
				
				/**
				 * 得到当前修改页面数据
				 * 
				 * @param
				 * @return
				 * @程序员：tangyingzhen
				 * @编码日期：2012-07-18
				 * @最后修改日期：
				 */	
				getData : function(){
					return DataUtil.getDataFromArea(this.ids.productTypeUpdateContentDiv);
				}

		});
