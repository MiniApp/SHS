/*
 * Copyright 2010-2014 icl-network.com. All rights reserved.
 * Support: http://www.icl-network.com
 */
package im.shs.web.service.impl;

import im.shs.web.dao.AdPositionDao;
import im.shs.web.entity.AdPositionEntity;
import im.shs.web.service.AdPositionService;

import java.util.List;

import javax.annotation.Resource;

import org.apache.commons.lang3.StringUtils;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service - 广告位
 * 
 * @author ICLNetwork Team
 * @version 3.0
 */
@Service("adPositionServiceImpl")
public class AdPositionServiceImpl extends BaseServiceImpl<AdPositionEntity, Long> implements AdPositionService {

    @Resource(name = "adPositionDaoImpl")
    private AdPositionDao adPositionDao;

    @Resource(name = "adPositionDaoImpl")
    public void setBaseDao(AdPositionDao adPositionDao) {
        super.setBaseDao(adPositionDao);
    }

    @Override
    @Transactional(readOnly = true)
    public boolean nameExists(String name) {
        return adPositionDao.nameExists(name);
    }

    @Override
    @Transactional(readOnly = true)
    public boolean nameUnique(String previousName, String currentName) {
        if (StringUtils.equalsIgnoreCase(previousName, currentName)) {
            return true;
        } else {
            if (adPositionDao.nameExists(currentName)) {
                return false;
            } else {
                return true;
            }
        }
    }

    @Override
    @Transactional(readOnly = true)
    public boolean identExists(String ident) {
        return adPositionDao.identExists(ident);
    }

    @Override
    @Transactional(readOnly = true)
    public boolean identUnique(String previousIdent, String currentIdent) {
        if (StringUtils.equalsIgnoreCase(previousIdent, currentIdent)) {
            return true;
        } else {
            if (adPositionDao.identExists(currentIdent)) {
                return false;
            } else {
                return true;
            }
        }
    }

    @Override
    @Transactional(readOnly = true)
    public AdPositionEntity findByIdent(String ident) {
        return adPositionDao.findByIdent(ident);
    }

    @Override
    @Transactional(readOnly = true)
    @Cacheable("adPosition")
    public AdPositionEntity findByIdent(String ident, String cacheRegion) {
        return adPositionDao.findByIdent(ident);
    }

    @Override
    @Transactional
    @CacheEvict(value = "adPosition", allEntries = true)
    public AdPositionEntity save(AdPositionEntity adPosition) {
        return super.save(adPosition);
    }

    @Override
    @Transactional
    @CacheEvict(value = "adPosition", allEntries = true)
    public AdPositionEntity update(AdPositionEntity adPosition) {
        return super.update(adPosition);
    }

    @Override
    @Transactional
    @CacheEvict(value = "adPosition", allEntries = true)
    public AdPositionEntity update(AdPositionEntity adPosition, String... ignoreProperties) {
        return super.update(adPosition, ignoreProperties);
    }

    @Override
    @Transactional
    @CacheEvict(value = "adPosition", allEntries = true)
    public void delete(Long id) {
        super.delete(id);
    }

    @Override
    @Transactional
    @CacheEvict(value = "adPosition", allEntries = true)
    public void delete(AdPositionEntity adPosition) {
        super.delete(adPosition);
    }

    @Override
    @Transactional
    @CacheEvict(value = "adPosition", allEntries = true)
    public void deleteList(Long... ids) {
        super.deleteList(ids);
    }

    @Override
    @Transactional
    @CacheEvict(value = "adPosition", allEntries = true)
    public void deleteList(List<AdPositionEntity> adPositions) {
        super.deleteList(adPositions);
    }

}