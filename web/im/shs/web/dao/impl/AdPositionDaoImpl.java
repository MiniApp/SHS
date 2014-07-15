/*
 * Copyright 2010-2014 icl-network.com. All rights reserved.
 * Support: http://www.icl-network.com
 */
package im.shs.web.dao.impl;

import im.shs.web.dao.AdPositionDao;
import im.shs.web.entity.AdPositionEntity;

import javax.persistence.FlushModeType;
import javax.persistence.NoResultException;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Repository;

/**
 * Dao - 广告位
 * 
 * @author ICLNetwork Team
 * @version 3.0
 */
@Repository("adPositionDaoImpl")
public class AdPositionDaoImpl extends BaseDaoImpl<AdPositionEntity, Long> implements AdPositionDao {

    @Override
    public boolean nameExists(String name) {
        if (StringUtils.isBlank(name)) {
            return false;
        }
        String jpql = "select count(*) from AdPositionEntity adPositions where lower(adPositions.name) = lower(:name)";
        Long count = entityManager.createQuery(jpql, Long.class).setFlushMode(FlushModeType.COMMIT)
                .setParameter("name", name).getSingleResult();
        return count > 0;
    }

    @Override
    public boolean identExists(String ident) {
        if (StringUtils.isBlank(ident)) {
            return false;
        }
        String jpql = "select count(*) from AdPositionEntity adPositions where lower(adPositions.ident) = lower(:ident)";
        Long count = entityManager.createQuery(jpql, Long.class).setFlushMode(FlushModeType.COMMIT)
                .setParameter("ident", ident).getSingleResult();
        return count > 0;
    }

    @Override
    public AdPositionEntity findByIdent(String ident) {
        if (StringUtils.isBlank(ident)) {
            return null;
        }
        try {
            String jpql = "select adPositions from AdPositionEntity adPositions where lower(adPositions.ident) = lower(:ident)";
            return entityManager.createQuery(jpql, AdPositionEntity.class).setFlushMode(FlushModeType.COMMIT)
                    .setParameter("ident", ident).getSingleResult();
        } catch (NoResultException e) {
            return null;
        }
    }

}