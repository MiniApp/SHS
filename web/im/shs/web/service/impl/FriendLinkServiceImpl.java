package im.shs.web.service.impl;

import im.shs.Filter;
import im.shs.Order;
import im.shs.entity.FriendLinkEntity;
import im.shs.enums.FriendLinkTypeEnum;
import im.shs.web.dao.FriendLinkDao;
import im.shs.web.service.FileService;
import im.shs.web.service.FriendLinkService;

import java.util.List;

import javax.annotation.Resource;

import org.apache.commons.lang3.StringUtils;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PathVariable;

/**
 * @class : FriendLinkServiceImpl
 * @description: 友情链接
 *
 * @author suhao
 * @date 2014年7月13日 上午2:03:53
 * @version 1.0
 */
@Service("friendLinkServiceImpl")
public class FriendLinkServiceImpl extends BaseServiceImpl<FriendLinkEntity, Long> implements FriendLinkService {

    @Resource(name = "friendLinkDaoImpl")
    private FriendLinkDao friendLinkDao;

    @Resource(name = "fileServiceImpl")
    private FileService fileService;

    @Resource(name = "friendLinkDaoImpl")
    public void setBaseDao(FriendLinkDao friendLinkDao) {
        super.setBaseDao(friendLinkDao);
    }

    @Override
    @Transactional(readOnly = true)
    public boolean nameExists(FriendLinkTypeEnum friendLinkType, String name) {
        return friendLinkDao.nameExists(friendLinkType, name);
    }

    @Override
    @Transactional(readOnly = true)
    public boolean nameUnique(FriendLinkTypeEnum friendLinkType, String previousName, String currentName) {
        if (StringUtils.equalsIgnoreCase(previousName, currentName)) {
            return true;
        } else {
            if (friendLinkDao.nameExists(friendLinkType, currentName)) {
                return false;
            } else {
                return true;
            }
        }
    }

    @Override
    @Transactional(readOnly = true)
    @Cacheable("friendLink")
    public List<FriendLinkEntity> findListByType(FriendLinkTypeEnum friendLinkType) {
        return findList(Filter.eq("type", friendLinkType));
    }

    @Override
    @Transactional(readOnly = true)
    @Cacheable("friendLink")
    public List<FriendLinkEntity> findList(Integer count, List<Filter> filters, List<Order> orders, String cacheRegion) {
        return findList(null, count, filters, orders);
    }

    @Override
    @Transactional
    @CacheEvict(value = "friendLink", allEntries = true)
    public void delete(@PathVariable FriendLinkTypeEnum friendLinkType, Long[] ids) {
        if (ids != null) {
            for (Long id : ids) {
                FriendLinkEntity pFriendLink = find(id);
                if (pFriendLink != null && pFriendLink.getType() == friendLinkType) {
                    delete(pFriendLink);
                }
            }
        }
    }

    @Override
    @Transactional
    @CacheEvict(value = "friendLink", allEntries = true)
    public void save(FriendLinkEntity friendLink) {
        super.save(friendLink);
    }

    @Override
    @Transactional
    @CacheEvict(value = "friendLink", allEntries = true)
    public FriendLinkEntity update(FriendLinkEntity friendLink) {
        return super.update(friendLink);
    }

    @Override
    @Transactional
    @CacheEvict(value = "friendLink", allEntries = true)
    public FriendLinkEntity update(FriendLinkEntity friendLink, String... ignoreProperties) {
        return super.update(friendLink, ignoreProperties);
    }

    @Override
    @Transactional
    @CacheEvict(value = "friendLink", allEntries = true)
    public void delete(Long id) {
        super.delete(id);
    }

    @Override
    @Transactional
    @CacheEvict(value = "friendLink", allEntries = true)
    public void delete(FriendLinkEntity friendLink) {

        // 友情链接为图片类型时，删除原LOGO图片
        if (friendLink.getType() == FriendLinkTypeEnum.image) {
            fileService.deleteLocal(friendLink.getLogo());
        }

        super.delete(friendLink);
    }

    @Override
    @Transactional
    @CacheEvict(value = "friendLink", allEntries = true)
    public void delete(Long... ids) {
        super.delete(ids);
    }

}