/**

 * 图形组件
 * 
 * @author WangHua
 * @version 1.0
 * @since 2012-06-25
 * @class component.Chart
 * @extends base.AbstractComponent
 * @constructor
 * @param{Object} config
 * @example this.create("component.Chart", { chartType : 'pie', renderTo :
 *          this.ids.chart, data : [{ name : 'xx1', data : '10', tip : 'xx1:10%' }, {
 *          name : 'xx2', data : '55', tip : 'xx1:55%' }, { name : 'xx3', data :
 *          '20', tip : 'xx1:20%' }, { name : 'xx4', data : '15', tip :
 *          'xx1:15%' }] });
 */
ObjectUtil
		.define(
				"component.Chart",
				{
					extend : 'base.AbstractComponent',
					type : 'Chart',
					/**
					 * 图形类型
					 * 
					 * @type String
					 */
					chartType : null,
					/**
					 * 是否显示标签
					 * 
					 * @type Boolean
					 */
					showLabel : false,
					/**
					 * 是否显示饼图标题
					 * 
					 * @type Boolean
					 */
					showPipTitle : false,
					/**
					 * 高度
					 * 
					 * @type Number
					 */
					height : null,
					/**
					 *间隔距离
					 * 
					 * @type Number
					 */
					margin:'5 5 5 5',
					/**
					 * 宽度
					 * 
					 * @type Number
					 */
					width : null,
					/**
					 * 渲染到的Dom的id
					 * 
					 * @type String
					 */
					renderTo : null,
					/**
					 * chart接收的json数据包含的属性名组成的数组，必须包含name,data,tip属性，默认为['name','data','tip']
					 * 
					 * @type Array
					 */
					fields : null,
					/**
					 * 图形要展示的json格式数组数据
					 * 
					 * @type String
					 */
					data : null,
					/**
					 * 线型图表y轴标题
					 * 
					 * @type String
					 */
					yTitle : null,
					/**
					 * 线型图表x轴标题
					 * 
					 * @type String
					 */
					xTitle : null,
					/**
					 * 线型图表x轴用于划分刻度的字段数组
					 * 
					 * @type String
					 */
					xFields : null,

					/**
					 * 饼图图表上用于展示name的字段名
					 * 
					 * @type String
					 */
					nameField : null,
					/**
					 * 饼图图表用于渲染数据的字段名
					 * 
					 * @type String
					 */
					dataField : null,
					/**
					 * 饼图图表用于展示鼠标移动到图表上时的提示信息的字段名
					 * 
					 * @type String
					 */
					tipField : null,
					/**
					 * 线型图表y轴用于划分刻度的字段数组
					 * 
					 * @type String
					 */
					yFields : null,
					/**
					 * 线型图表y轴大刻度之间的小刻度数
					 * 
					 * @type String
					 */
					minorTickSteps : null,
					/**
					 * 线型图表显示的折线的配置
					 * 
					 * @type String
					 */
					lines : null,
					/**
					 * 定时刷新数据的时间
					 * 
					 * @type Number
					 */
					refreshTime : null,
					/**
					 * 定时刷新数据获取数据的方法
					 * 
					 * @type Function
					 */
					refreshGetDataFunc : null,

					constructor : function(config) {
						Ext.apply(this, config);
						this.callParent();
					},
					/**
					 * 参数校验
					 * 
					 * @Override
					 * @return {Boolean}
					 */
					checkConfig : function() {
						if (DataUtil.isEmpty(this.chartType)) {
							ExceptionUtil.throwFramworkException({
								title : '图表组件构建异常',
								msg : '必须传入参数chartType!'
							});
						} else {
							if ('pie' != this.chartType
									&& 'line' != this.chartType
									&& 'column' != this.chartType) {
								ExceptionUtil
										.throwFramworkException({
											title : '图表组件构建异常',
											msg : '目前chartType只支持pie饼图，line线型图,column柱状图!'
										});
							}
						}
						if (DataUtil.isEmpty(this.renderTo)) {
							ExceptionUtil.throwFramworkException({
								title : '图表组件构建异常',
								msg : '必须传入参数renderTo!'
							});
						}
						if (DataUtil.isEmpty(this.data)) {
							
							ExceptionUtil.throwFramworkException({
								title : '图表组件构建异常',
								msg : '必须传入参数data!'
							});
						}
						return true;
					},
					/**
					 * 组件创建前处理
					 * 
					 * @Override
					 */
					beforeBuild : function() {
						this.store = Ext.create('Ext.data.Store', {
							fields : this.fields || [ 'name', 'data', 'tip' ],
							autoLoad : false,
							buffered : false,
							data : this.data,
							proxy : {
								type : 'memory',
								reader : {
									type : 'json'
								}
							}
						});
						return true;
					},
					/**
					 * 构建组件
					 * 
					 * @Override
					 */
					build : function() {
						var me = this;
						if ('pie' == this.chartType) {
							var seriesConfig = {
								type : this.chartType,
								field : this.dataField || 'data',
								showInLegend : this.showLabel,
								tips : {
									trackMouse : true,
									renderer : function(record, item) {
										if (Ext.isEmpty(record
												.get(this.tipField || 'tip'))) {
											this.setTitle(" ");
											this.setHeight(28);
										} else {
											if (record.get(this.tipField
													|| 'tip').length > 20) {
												this.setWidth(150);
												var i = 28;
												while (record.get(this.tipField
														|| 'tip').length > i) {// 根据字符串长度设置高度
													i = i + 28;
												}
												this.setHeight(i);
												this.setTitle(record.get(this.tipField
													|| 'tip'));
											} else {
												this.setWidth(record.get(this.tipField
													|| 'tip').length * 10);

												this.setTitle(record.get(this.tipField
																|| 'tip'));
												this.setHeight(28);
											}
										}
									}
								},
								highlight : {
									segment : {
										margin : 20
									}
								}
							};
							if (this.showPipTitle) {
								seriesConfig = ObjectUtil.apply(seriesConfig, {
									label : {
										field : this.nameField || 'name',
										display : 'rotate',
										contrast : true,
										font : '12px Arial'
									}
								});
							}
							this.series = [ seriesConfig ];
						} else if ('line' == this.chartType) {
							this.axes = [ {
								type : 'Numeric',
								// minimum : this.yMinimum,
								maximum : this.maximum,
								position : 'left',
								fields : this.yFields,
								title : this.yTitle,
								minorTickSteps : this.minorTickSteps || 9,
								majorTickSteps : this.majorTickSteps || 10,
								grid : {
									odd : {
										opacity : 1,
										fill : '#ddd',
										stroke : '#bbb',
										'stroke-width' : 0.5
									}
								}
							}, {
								type : 'Category',
								position : 'bottom',
								fields : this.xFields,
								title : this.xTitle
							} ];
							this.series = [];
							if (this.lines) {
								DataUtil.each(this.lines,function(line) {
									var newLine = {};
									newLine.type = 'line';
									newLine.tips = {
										trackMouse : true,
										width : 110,
										height : 20,
										renderer : function(
												record, item) {
											if (me.scale) {
												this.setTitle(Ext.util.Format.number(
													record.get(line.yField),
													me.scale));
											} else {
												this.setTitle(record.get(line.yField));
											}
										}
									};
									newLine.highlight = {
										size : 4,
										radius : 4
									};
									newLine.axis = 'left';
									newLine.markerConfig = {
										type : 'circle',
										size : 4,
										radius : 4,
										'stroke-width' : 0
									};
									newLine.smooth = true;
									newLine.showInLegend = me.showLabel;
									newLine.xField = line.xField;
									newLine.yField = line.yField;
									me.series.push(newLine);
								});
							}
						} else if ('column' == this.chartType) {
							this.axes = [
									{
										type : 'Numeric',
										position : 'left',
										fields : this.yFields,
										label : {
											renderer : Ext.util.Format
													.numberRenderer('0,0')
										},
										title : this.yTitle,
										grid : true,
										minimum : 0

									}, {
										type : 'Category',
										position : 'bottom',
										fields : this.xFields,
										title : this.xTitle
									} ];
							me.colors = [ 'rgb(255, 183, 221)','rgb(255, 204, 204)',
											'rgb(255, 187, 102)', 'rgb(255, 255, 187)',
											'rgb(153, 255, 51)', 'rgb(119, 255, 238)',
											'rgb(204, 238, 255)', 'rgb(153, 153, 255)',
											'rgb(209, 153, 255)', 'rgb(227, 142, 255)',
											'rgb(249, 153, 146)', 'rgb(255, 179, 257)',
											'rgb(187, 184, 214)', 'rgb(236, 216, 242)',
											'rgb(208, 221, 230)', 'rgb(180, 256, 217)',
											'rgb(200, 170, 121)', 'rgb(240, 149, 204)',
											'rgb(180, 153, 211)', 'rgb(245, 166, 157)' ];
							
							this.series = [{
								type : 'column',
								axis : 'left',
								showInLegend : me.showLabel,
								highlight : true,
								renderer : function(sprite, storeItem, barAttr,
										i, store) {
									if (me.colors) {
										barAttr.fill = me.colors[i
												% me.colors.length];
									}
									return barAttr;
								},
								tips : {
									trackMouse : true,
									width : 140,
									height : 28,
									renderer : function(storeItem, item) {
										this.setTitle(storeItem.get(me.xFields)
												+ ': '
												+ storeItem.get(item.yField));
									}
								},
								style: {
				                    opacity: 0.95
				                },
								xField : me.xFields,
								yField : me.yFields
							} ];
						} else {
							ExceptionUtil.throwFramworkException({
								title : '图表组件构建异常',
								msg : '传入的图形类型不正确!'
							});
						}

						this.extObject = Ext.create('Ext.chart.Chart', {
							renderTo : this.renderTo,
							animate : true,
							background: {
					           fill: 'rgb(218, 224, 225)'
					        },
							store : this.store,
							theme : 'CustomCharTheme',
							margin : this.margin,
							shadow : true,
							width : this.width || 200,
							height : this.height || 200,
							legend : {
								position : 'right'// 图例显示的位置
							},
							insetPadding : 10,
							axes : this.axes,
							series : this.series
						});
						this.extObject.show();
						if (this.parentObj) {
							var parent = this.getFirstParent(this.parentObj);
							if (parent) {
								if (this.refreshGetDataFunc && this.refreshTime) {
									var intr = setInterval(function() {
										var data = me.refreshGetDataFunc();
										me.store.loadData(data);
									}, this.refreshTime);
									parent.on('close', function(e) {
										clearInterval(intr);
									});
								}
							}
						}
					},
					/**
					 * 产生随机颜色
					 */
					getRandomColor:function(){
						var color="rgb(" +Math.random()*255+ ","+Math.random()*255+","+Math.random()*255+ ")";
					    return color; 
					 } 
				});
