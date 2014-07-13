package im.shs.web.service;

import im.shs.Filter;
import im.shs.Order;
import im.shs.entity.FriendLinkEntity;
import im.shs.enums.FriendLinkTypeEnum;

import java.util.List;

import org.springframework.web.bind.annotation.PathVariable;

/**
 * @class : FriendLinkService
 * @description: 友情链接
 * 
 * @author suhao
 * @date 2014年7月13日 上午1:35:21
 * @version 1.0
 */
public interface FriendLinkService extends BaseService<FriendLinkEntity, Long> {

	/**
	 * 判断名称是否存在（忽略大小写）
	 * 
	 * @param friendLinkType
	 *            友情链接类型
	 * @param name
	 *            名称
	 * @return 名称是否存在
	 */
	boolean nameExists(FriendLinkTypeEnum friendLinkType, String name);

	/**
	 * 判断名称是否唯一（忽略大小写）
	 * 
	 * @param friendLinkType
	 *            友情链接类型
	 * @param previousName
	 *            修改前名称
	 * @param currentName
	 *            当前名称
	 * @return 名称是否唯一
	 */
	boolean nameUnique(FriendLinkTypeEnum friendLinkType, String previousName,
			String currentName);

	/**
	 * 查找友情链接集合
	 * 
	 * @param friendLinkType
	 *            友情链接类型
	 * @return 友情链接集合
	 */
	List<FriendLinkEntity> findListByType(FriendLinkTypeEnum friendLinkType);

	/**
	 * 查找友情链接集合（缓存）
	 * 
	 * @param count
	 *            数量
	 * @param filters
	 *            筛选
	 * @param orders
	 *            排序
	 * @param cacheRegion
	 *            缓存区域
	 * @return 友情链接集合
	 */
	List<FriendLinkEntity> findList(Integer count, List<Filter> filters,
			List<Order> orders, String cacheRegion);

	/**
	 * 删除友情链接
	 * 
	 * @param friendLinkType
	 *            友情链接类型
	 * @param ids
	 *            ID
	 */
	void delete(@PathVariable FriendLinkTypeEnum friendLinkType, Long[] ids);

}