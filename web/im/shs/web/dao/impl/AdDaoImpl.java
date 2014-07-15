/*
 * Copyright 2010-2014 icl-network.com. All rights reserved.
 * Support: http://www.icl-network.com
 */
package im.shs.web.dao.impl;

import im.shs.web.dao.AdDao;
import im.shs.web.entity.AdEntity;

import org.springframework.stereotype.Repository;

/**
 * Dao - 广告
 * 
 * @author ICLNetwork Team
 * @version 3.0
 */
@Repository("adDaoImpl")
public class AdDaoImpl extends BaseDaoImpl<AdEntity, Long> implements AdDao {

}