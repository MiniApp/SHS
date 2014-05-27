/**
 * 图片处理工具类,从后台获取图片,并展示
 * 
 * @author WangHua
 * @version 1.0
 * @since 2012-06-25
 * @class ImgUtil
 */
ObjectUtil
		.define(
				"ImgUtil",
				{
					statics : {
						seed : 0,
						/*
						 * 根据路径获取从后台图片并展示
						 */
						getImgFromServer : function(config) {
							if (DataUtil.isEmpty(config.imgId)) {
								MsgUtil.error("验证错误", "imgId必须传入值");
								return;
							}
							if (DataUtil.isEmpty(config.imgStrServId)) {
								MsgUtil.error("验证错误", "imgStrServId必须传入值!");
								return;
							}
							if (DataUtil.isEmpty(config.inDataClass)) {
								config.inDataClass = "com.easy.common.helper.img.DefaultImgInfoBean";
							}
							var jsonData = "";
							if (DataUtil.isEmpty(config.jsonData)) {
								jsonData = {
									imgStrServId : config.imgStrServId
								};
							} else {
								jsonData = ObjectUtil.apply(config.jsonData, {
									imgStrServId : config.imgStrServId
								});
							}
							HtmlUtil.getDom(config.imgId).src = Constants.AJAX_ACTION
									+ "?strServId=imgHelper.getImg&response=download&inDataClass="
									+ config.inDataClass
									+ "&jsonData="
									+ DataUtil.encode(jsonData)
									+ "&_dc="
									+ ImgUtil.seed;
							ImgUtil.seed = ImgUtil.seed + 1;// 避免缓存
						}
					}
				});