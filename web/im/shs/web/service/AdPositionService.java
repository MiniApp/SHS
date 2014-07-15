/*
 * Copyright 2010-2014 icl-network.com. All rights reserved.
 * Support: http://www.icl-network.com
 */
package im.shs.web.service;

import im.shs.web.entity.AdPositionEntity;

/**
 * Service - 广告位
 * 
 * @author ICLNetwork Team
 * @version 3.0
 */
public interface AdPositionService extends BaseService<AdPositionEntity, Long> {

    /**
     * 判断名称是否存在（忽略大小写）
     * 
     * @param name
     *            名称
     * @return 名称是否存在
     */
    boolean nameExists(String name);

    /**
     * 判断名称是否唯一（忽略大小写）
     * 
     * @param previousName
     *            修改前名称
     * @param currentName
     *            当前名称
     * @return 名称是否唯一
     */
    boolean nameUnique(String previousName, String currentName);

    /**
     * 判断标识是否存在（忽略大小写）
     * 
     * @param ident
     *            标识
     * @return 标识是否存在
     */
    boolean identExists(String ident);

    /**
     * 判断标识是否唯一（忽略大小写）
     * 
     * @param previousIdent
     *            修改前标识
     * @param currentIdent
     *            当前标识
     * @return 标识是否唯一
     */
    boolean identUnique(String previousIdent, String currentIdent);

    /**
     * 根据标识查找广告位（忽略大小写）
     * 
     * @param ident
     *            标识
     * @return 广告位，不存在时返回NULL
     */
    AdPositionEntity findByIdent(String ident);

    /**
     * 根据标识查找广告位（忽略大小写，缓存）
     * 
     * @param ident
     *            标识
     * @param cacheRegion
     *            缓存区域
     * @return 广告位（缓存）
     */
    AdPositionEntity findByIdent(String ident, String cacheRegion);

}