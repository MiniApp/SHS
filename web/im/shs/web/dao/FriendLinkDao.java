package im.shs.web.dao;

import im.shs.web.entity.FriendLinkEntity;
import im.shs.web.enums.FriendLinkTypeEnum;

/**
 * @class : FriendLinkDao
 * @description: 友情链接
 *
 * @author suhao
 * @date 2014年7月13日 上午2:05:25
 * @version 1.0
 */
public interface FriendLinkDao extends BaseDao<FriendLinkEntity, Long> {

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

}