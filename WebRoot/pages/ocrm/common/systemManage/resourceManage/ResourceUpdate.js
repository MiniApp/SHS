/**
 * 修改资源页面 <p/> 功能描述：
 * <li>初始化页面组件</li>
 * <li>给页面赋值</li>
 * <li>得到页面值</li>
 * @author tangyingzhen
 * @since 2012-07-18
 * 
 */
ObjectUtil
		.define(
				"crm.pages.ocrm.common.systemManage.resourceManage.ResourceUpdate",
				"base.PageObject",
				{
					htmlUrl : Constants.CONTEXT_PATH
							+ "/pages/ocrm/common/systemManage/resourceManage/ResourceUpdate.html",

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
						// 参数类型选择框
//						this.resourceType =	this.create(
//								'component.EnumSelector',
//								{
//									category : [ CodeStringDefinition.RESOURCETYPE_CATEGORY ],// resourceTypeEnum
//									renderTo : [ this.ids.resourceUpdateContentDiv_resourceTypeEnum ],
//									id : [ this.ids.resourceUpdateContentDiv_resourceTypeEnum ]
//								});
						//页面面板
						this.create('component.Panel', {
							id : 'updateResourcePanel',
							title : '修改资源',
							contentEl : this.ids.resourceUpdateContentDiv,
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
							this.ids.resourceUpdateContentDiv);// 渲染数据到页面
					if (this.resourceType) {
						this.resourceType.setValue(
								this.ids.resourceUpdateContentDiv_resourceTypeEnum,
								data.resourceType);
					} else {
						this.resourceType = this.create('component.EnumSelector', {
							category : [CodeStringDefinition.RESOURCETYPE_CATEGORY],// resourceTypeEnum
							renderTo : [this.ids.resourceUpdateContentDiv_resourceTypeEnum],
							id : [this.ids.resourceUpdateContentDiv_resourceTypeEnum],
							selectedValue : [data.resourceType]
						});
					}
					
					if (this.resourceCategory) {
						this.resourceCategory.setValue(
								this.ids.resourceUpdateContentDiv_resourceCategoryEnum,
								data.resourceCategory);
					} else {
						this.resourceCategory = this.create('component.EnumSelector', {
							category : [CodeStringDefinition.ROLETYPE_CATEGORY],// resourceTypeEnum
							renderTo : [this.ids.resourceUpdateContentDiv_resourceCategoryEnum],
							id : [this.ids.resourceUpdateContentDiv_resourceCategoryEnum],
							selectedValue : [data.resourceCategory]
						});
					}
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
					return DataUtil.getDataFromArea(this.ids.resourceUpdateContentDiv);
				}

		});
