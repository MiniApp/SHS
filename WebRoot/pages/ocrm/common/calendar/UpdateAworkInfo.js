ObjectUtil.define("crm.pages.ocrm.common.calendar.UpdateAworkInfo", "base.PageObject", {
			htmlUrl : Constants.CONTEXT_PATH + "/pages/ocrm/common/calendar/AworkInfo.html",
			initCmp : function() {
				var owner = this;
				owner.create('component.Panel', {
							renderTo : this.ids.aworkInfoDiv,
							contentEl : this.ids.aworkInfoContentDiv,
							height : 150,
							hasBackGroundColor : true,
							buttons : [{
										text : '确定',
										iconCls : 'save',
										handler : function() {
											owner.updateHandler();
										}
									}]
						});

				HtmlUtil.getDom(this.ids.strAwokeTitle).value = this.record
						.get('strAwokeTitle');
				owner.create("component.Selector", {
							id : this.ids.strScratchpadAwokeType,
							renderTo : this.ids.strScratchpadAwokeType,
							jsonData : [{
										code : '1',
										label : '自定义'
									}],
							selectedValue : this.record
									.get('strScratchpadAwokeType')
						});
				owner.create("component.Selector", {
							id : this.ids.strIterationType,
							renderTo : this.ids.strIterationType,
							jsonData : [{
										code : '1',
										label : '按日'
									}],
							selectedValue : this.record.get('strIterationType')
						});
				owner.create("component.Selector", {
							id : this.ids.strAwokeWay,
							renderTo : this.ids.strAwokeWay,
							jsonData : [{
										code : '1',
										label : '消息'
									}],
							selectedValue : this.record.get('strAwokeWay')
						});
				owner.create("component.Selector", {
							id : this.ids.strAheadType,
							renderTo : this.ids.strAheadType,
							jsonData : [{
										code : '1',
										label : '十分钟'
									}, {
										code : '2',
										label : '半小时'
									}, {
										code : '3',
										label : '一小时'
									}],
							selectedValue : this.record.get('strAheadType')
						});
			},
			/**
			 * 新增函数
			 */
			updateHandler : function(grid) {
				var data = DataUtil
						.getDataFromArea(this.ids.aworkInfoContentDiv);
				if (data != Constants.VALIDATION_FAIL) {
					/**
					 * 调用表格行创建函数
					 */
					this.grid.loadData([DataUtil.decode(data)]);
					this.parent.close();
				}
			}

		})