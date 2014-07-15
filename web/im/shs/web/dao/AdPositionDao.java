/*
 * Copyright 2010-2014 icl-network.com. All rights reserved.
 * Support: http://www.icl-network.com
 */
package im.shs.web.dao;

import im.shs.web.entity.AdPositionEntity;

/**
 * Dao - 广告位
 * 
 * @author ICLNetwork Team
 * @version 3.0
 */
public interface AdPositionDao extends BaseDao<AdPositionEntity, Long> {

    /**
     * 判断名称是否存在（忽略大小写）
     * 
     * @param name
     *            名称
     * @return 名称是否存在
     */
    boolean nameExists(String name);

    /**
     * 判断标识是否存在（忽略大小写）
     * 
     * @param ident
     *            标识
     * @return 标识是否存在
     */
    boolean identExists(String ident);

    /**
     * 根据标识查找广告位（忽略大小写）
     * 
     * @param ident
     *            标识
     * @return 广告位，不存在时返回NULL
     */
    AdPositionEntity findByIdent(String ident);

}