/*
 * Copyright 2010-2014 icl-network.com. All rights reserved.
 * Support: http://www.icl-network.com
 */
package im.shs.web.service.impl;

import im.shs.web.Filter;
import im.shs.web.dao.AdDao;
import im.shs.web.entity.AdEntity;
import im.shs.web.service.AdService;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service - 广告
 * 
 * @author ICLNetwork Team
 * @version 3.0
 */
@Service("adServiceImpl")
public class AdServiceImpl extends BaseServiceImpl<AdEntity, Long> implements AdService {

    @Resource(name = "adDaoImpl")
    public void setBaseDao(AdDao adDao) {
        super.setBaseDao(adDao);
    }

    @Override
    @Transactional(readOnly = true)
    @Cacheable("ad")
    public List<AdEntity> findListByPosition(Long positionId) {
        return findList(Filter.eq("position", positionId));
    }

    @Override
    @Transactional
    @CacheEvict(value = "ad", allEntries = true)
    public AdEntity save(AdEntity ad) {
        return super.save(ad);
    }

    @Override
    @Transactional
    @CacheEvict(value = "ad", allEntries = true)
    public AdEntity update(AdEntity ad) {
        return super.update(ad);
    }

    @Override
    @Transactional
    @CacheEvict(value = "ad", allEntries = true)
    public AdEntity update(AdEntity ad, String... ignoreProperties) {
        return super.update(ad, ignoreProperties);
    }

    @Override
    @Transactional
    @CacheEvict(value = "ad", allEntries = true)
    public void delete(Long id) {
        super.delete(id);
    }

    @Override
    @Transactional
    @CacheEvict(value = "ad", allEntries = true)
    public void delete(AdEntity ad) {
        super.delete(ad);
    }

    @Override
    @Transactional
    @CacheEvict(value = "ad", allEntries = true)
    public void deleteList(Long... ids) {
        super.deleteList(ids);
    }

    @Override
    @Transactional
    @CacheEvict(value = "ad", allEntries = true)
    public void deleteList(List<AdEntity> ads) {
        super.deleteList(ads);
    }

}