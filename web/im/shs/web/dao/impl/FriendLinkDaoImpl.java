package im.shs.web.dao.impl;

import im.shs.web.dao.FriendLinkDao;
import im.shs.web.entity.FriendLinkEntity;
import im.shs.web.enums.FriendLinkTypeEnum;

import javax.persistence.FlushModeType;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Repository;

/**
 * @class : FriendLinkDaoImpl
 * @description: 友情链接
 *
 * @author suhao
 * @date 2014年7月13日 上午2:05:57
 * @version 1.0
 */
@Repository("friendLinkDaoImpl")
public class FriendLinkDaoImpl extends BaseDaoImpl<FriendLinkEntity, Long> implements FriendLinkDao {

    @Override
    public boolean nameExists(FriendLinkTypeEnum friendLinkType, String name) {
        if (StringUtils.isBlank(name)) {
            return false;
        }
        String jpql = "select count(*) from FriendLinkEntity friendLinks where friendLinks.type = :friendLinkType and lower(friendLinks.name) = lower(:name)";
        Long count = entityManager.createQuery(jpql, Long.class).setFlushMode(FlushModeType.COMMIT)
                .setParameter("friendLinkType", friendLinkType).setParameter("name", name).getSingleResult();
        return count > 0;
    }

}