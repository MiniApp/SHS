/**
 * 滚动面板组件 对设置的文本内容等滚动显示，如滚动公共栏
 * 
 * @author WangHua
 * @version 1.0
 * @since 2012-06-25
 * @class component.ScrollPanel
 * @extends base.AbstractComponent
 * @example this .create( "component.ScrollPanel", { renderTo : 'bord', width :
 *          bordWidth, closable : true, loadContent : function(contentObj) {
 *          ConnectionUtil .ajaxReq({ strServId :
 *          'noticeManageService.getHomePageDisplayList', submitWaitMessage :
 *          false, async : false, callback : function( datas) { var content =
 *          ""; DataUtil .each( datas, function( data) { content = content +
 *          data.context + "&nbsp;&nbsp;&nbsp;"; });
 * 
 * contentObj.innerHTML = content; } }); } });
 */
ObjectUtil
		.define(
				"component.ScrollPanel",
				{
					statics : {
						objScroll : function(containerId, contentId,
								widthContainer, loadContent, loadContentFlag) {
							var containerObj = document
									.getElementById(containerId);
							var contentObj = document.getElementById(contentId);
							widthObject = contentObj.offsetWidth;
							if (parseInt(contentObj.style.left) > (widthObject * (-1))) {
								contentObj.style.left = parseInt(contentObj.style.left)
										- containerObj.speed + "px";
							} else {
								if (loadContentFlag == '0') {
									if (DataUtil.isFunction(loadContent)) {
										loadContent(contentObj);
									}
								}
								contentObj.style.left = parseInt(widthContainer)
										+ "px";
							}
						},
						loadContent : function(contentId, loadContentFuc) {
							var contentObj = document.getElementById(contentId);
							if (DataUtil.isFunction(loadContentFuc)) {
								loadContentFuc(contentObj);
							}

						}
					},
					extend : 'base.AbstractComponent',
					type : 'ScrollPanel',
					/**
					 * 要渲染的div容器的id
					 * 
					 * @type String
					 */
					renderTo : null,
					/**
					 * 滚动速度
					 * 
					 * @type Number
					 */
					speed : null,
					/**
					 * 滚动内容
					 * 
					 * @type String
					 */
					content : null,
					/**
					 * 加载滚动数据的方法
					 * 
					 * @type Function
					 */
					loadContent : null,
					/**
					 * 加载滚动数据的间隔时间，如果未提供，则滚动完成后就加载 单位ms
					 * 
					 * @type Number
					 */
					loadTime : null,
					/**
					 * 宽度
					 * 
					 * @type Number
					 */
					width : null,
					/**
					 * 高度
					 * 
					 * @type Number
					 */
					height : null,
					/**
					 * 是否可关闭,默认false
					 * 
					 * @type Boolean
					 */
					closable : null,
					/**
					 * 是否已停止
					 * 
					 * @type Boolean
					 */
					isStop : null,
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
						return true;
					},
					/**
					 * 组件创建前处理
					 * 
					 * @Override
					 */
					beforeBuild : function() {
						var me = this;
						if (DataUtil.isEmpty(this.renderTo)) {
							ExceptionUtil.throwFramworkException({
								msg : '创建ScrollPanel组件，参数：renderTo必须传入值!'
							});
						}
						if (this.width == null) {
							this.width = 250;
						}
						if (DataUtil.isEmpty(this.height)) {
							this.height = 15;
						}
						var tmpObj = document.getElementById(this.renderTo);

						if (DataUtil.isEmpty(tmpObj.id)) {
							ExceptionUtil
									.throwFramworkException({
										msg : '创建ScrollPanel组件，参数：renderTo指定的元素的id属性不能为空!'
									});
						}

						this.contentObjId = tmpObj.id + '_Content';
						this.imgTdId = tmpObj.id + '_imgTD';
						tmpObj.parentNode.innerHTML = "<table style='margin:-0.6em;'><tr><td><div id='"
								+ tmpObj.id
								+ "' style='position:relative;overflow:hidden;width:"
								+ this.width
								+ "px;height:"
								+ this.height
								+ "px'><div id='"
								+ this.contentObjId
								+ "' style='position: absolute;left: 0;top: 0;white-space: nowrap;'>"
								+ this.content
								+ "</div></div></td><td id='"
								+ this.imgTdId + "'></td></tr></table>";

						this.renderToObj = document
								.getElementById(this.renderTo);
						if (this.closable) {
							this.imgTdObj = document
									.getElementById(this.imgTdId);
							this.imgTdObj.onclick = function() {
								if (me.isStop) {
									me.start();
									if (me.closable) {
										this.innerHTML = "<img style='cursor:pointer;' title='关闭' src='"
												+ Constants.CONTEXT_PATH
												+ "/resources/images/icons/feed.png'/>";
									}
								} else {
									me.stop();

									if (me.closable) {
										this.innerHTML = "<img style='cursor:pointer;' title='打开' src='"
												+ Constants.CONTEXT_PATH
												+ "/resources/images/icons/feed_delete.png'/>";
									}
								}
							};

							this.imgTdObj.innerHTML = "<img style='cursor:pointer;' title='关闭' src='"
									+ Constants.CONTEXT_PATH
									+ "/resources/images/icons/feed.png'/>";
						}
						if (this.speed == null) {
							this.speed = 1;
						}
						this.speed = (document.all) ? this.speed : Math.max(1,
								this.speed - 1);

						return true;
					},
					/**
					 * 构建组件
					 * 
					 * @Override
					 */
					build : function() {
						this.start();
					},
					stop : function(imgTdO) {
						clearInterval(this.interval);
						if (this.laodContentInterval != null) {
							clearInterval(this.laodContentInterval);
						}
						document.getElementById(this.contentObjId).innerHTML = '';
						this.isStop = true;
					},
					start : function() {
						var me = this;
						this.isStop = false;
						if (DataUtil.isEmpty(this.content)) {
							this.loadContent(document
									.getElementById(this.contentObjId));
						}
						if (this.renderToObj != null) {
							var contentObj = document
									.getElementById(this.contentObjId);
							this.renderToObj.style.visibility = "visible";
							this.renderToObj.speed = this.speed;
							widthContainer = this.renderToObj.offsetWidth;
							contentObj.style.left = parseInt(widthContainer)
									+ "px";
							widthObject = contentObj.offsetWidth;
							var loadContentFlag = '0';
							if (!DataUtil.isEmpty(this.loadTime)) {
								this.laodContentInterval = setInterval(
										"component.ScrollPanel.loadContent('"
												+ this.contentObjId + "',"
												+ this.loadContent + ")",
										this.loadTime);
								loadContentFlag = '1';
							}
							this.interval = setInterval(
									"component.ScrollPanel.objScroll('"
											+ this.renderTo + "','"
											+ this.contentObjId + "',"
											+ widthContainer + ","
											+ this.loadContent + ",'"
											+ loadContentFlag + "')", 20);
							this.renderToObj.onmouseover = function() {
								me.renderToObj.speed = 0;
							};
							this.renderToObj.onmouseout = function() {
								me.renderToObj.speed = me.speed;
							};
						}
					}
				});
