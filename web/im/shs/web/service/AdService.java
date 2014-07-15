/*
 * Copyright 2010-2014 icl-network.com. All rights reserved.
 * Support: http://www.icl-network.com
 */
package im.shs.web.service;

import im.shs.web.entity.AdEntity;

import java.util.List;

/**
 * Service - 广告
 * 
 * @author ICLNetwork Team
 * @version 3.0
 */
public interface AdService extends BaseService<AdEntity, Long> {

    /**
     * 查找广告集合
     * 
     * @param positionId
     *            位置ID
     * @return 广告集合
     */
    List<AdEntity> findListByPosition(Long positionId);

}