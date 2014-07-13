/**
 * 对象注册处理工具类
 * 
 * @author WangHua
 * @version 1.0
 * @since 2012-06-25
 * @class ObjectMgrUtil
 */
ObjectUtil.define("ObjectMgrUtil", {
			statics : {
				/*
				 * 集合对象
				 */
				all : new MixedCollection(),
				/*
				 * 将对象c注册到集合中，c必须包含id属性
				 */
				register : function(c) {
					ObjectMgrUtil.all.add(c);
				},
				/*
				 * 将对象c从集合中删除
				*/
				unregister : function(c) {
					ObjectMgrUtil.all.remove(c);
				},
				
				/*
				 * 根据id获取集合中的对象
				 */
				get : function(id) {
					return ObjectMgrUtil.all.get(id);
				}
			}
		});